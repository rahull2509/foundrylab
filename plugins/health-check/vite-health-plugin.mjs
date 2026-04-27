import os from "os";

const SERVER_START_TIME = Date.now();

export function createViteHealthPlugin() {
  const status = {
    state: "idle",
    errors: [],
    warnings: [],
    lastCompileTime: null,
    lastSuccessTime: null,
    compileDuration: 0,
    totalCompiles: 0,
    firstCompileTime: null,
  };

  const beginCompile = () => {
    const now = Date.now();
    status.state = "compiling";
    status.lastCompileTime = now;
    if (!status.firstCompileTime) status.firstCompileTime = now;
  };

  const markSuccess = () => {
    if (!status.lastCompileTime) status.lastCompileTime = Date.now();
    status.state = "success";
    status.lastSuccessTime = Date.now();
    status.compileDuration = status.lastSuccessTime - status.lastCompileTime;
    status.totalCompiles += 1;
    status.errors = [];
  };

  return {
    name: "vite-health-plugin",
    configureServer(server) {
      if (server.httpServer) {
        server.httpServer.once("listening", () => {
          beginCompile();
          markSuccess();
        });
      }

      const onFsChange = () => beginCompile();
      server.watcher.on("change", onFsChange);
      server.watcher.on("add", onFsChange);
      server.watcher.on("unlink", onFsChange);

      server.middlewares.use((req, res, next) => {
        if (!req.url || !req.url.startsWith("/health")) return next();

        const uptime = Date.now() - SERVER_START_TIME;
        const healthStatus = getStatus(status);
        const memUsage = process.memoryUsage();

        if (req.url === "/health") {
          return sendJson(res, 200, {
            status: healthStatus.isHealthy ? "healthy" : "unhealthy",
            timestamp: new Date().toISOString(),
            uptime: { seconds: Math.floor(uptime / 1000), formatted: formatDuration(uptime) },
            vite: {
              state: healthStatus.state,
              isHealthy: healthStatus.isHealthy,
              hasCompiled: healthStatus.hasCompiled,
              errors: healthStatus.errorCount,
              warnings: healthStatus.warningCount,
              lastCompileTime: healthStatus.lastCompileTime ? new Date(healthStatus.lastCompileTime).toISOString() : null,
              lastSuccessTime: healthStatus.lastSuccessTime ? new Date(healthStatus.lastSuccessTime).toISOString() : null,
              compileDuration: healthStatus.compileDuration ? `${healthStatus.compileDuration}ms` : null,
              totalCompiles: healthStatus.totalCompiles,
              firstCompileTime: healthStatus.firstCompileTime ? new Date(healthStatus.firstCompileTime).toISOString() : null,
            },
            server: {
              nodeVersion: process.version,
              platform: os.platform(),
              arch: os.arch(),
              cpus: os.cpus().length,
              memory: {
                heapUsed: formatBytes(memUsage.heapUsed),
                heapTotal: formatBytes(memUsage.heapTotal),
                rss: formatBytes(memUsage.rss),
                external: formatBytes(memUsage.external),
              },
              systemMemory: {
                total: formatBytes(os.totalmem()),
                free: formatBytes(os.freemem()),
                used: formatBytes(os.totalmem() - os.freemem()),
              },
            },
            environment: process.env.NODE_ENV || "development",
          });
        }

        if (req.url === "/health/simple") {
          if (healthStatus.state === "success") return sendText(res, 200, "OK");
          if (healthStatus.state === "compiling") return sendText(res, 200, "COMPILING");
          if (healthStatus.state === "idle") return sendText(res, 200, "IDLE");
          return sendText(res, 503, "ERROR");
        }

        if (req.url === "/health/ready") {
          if (healthStatus.state === "success") return sendJson(res, 200, { ready: true, state: healthStatus.state });
          return sendJson(res, 503, {
            ready: false,
            state: healthStatus.state,
            reason: healthStatus.state === "compiling" ? "Compilation in progress" : "Compilation failed",
          });
        }

        if (req.url === "/health/live") return sendJson(res, 200, { alive: true, timestamp: new Date().toISOString() });

        if (req.url === "/health/errors") {
          return sendJson(res, 200, {
            errorCount: healthStatus.errorCount,
            warningCount: healthStatus.warningCount,
            errors: healthStatus.errors,
            warnings: healthStatus.warnings,
            state: healthStatus.state,
          });
        }

        if (req.url === "/health/stats") {
          return sendJson(res, 200, {
            totalCompiles: healthStatus.totalCompiles,
            averageCompileTime: healthStatus.totalCompiles > 0 ? `${Math.round(uptime / healthStatus.totalCompiles)}ms` : null,
            lastCompileDuration: healthStatus.compileDuration ? `${healthStatus.compileDuration}ms` : null,
            firstCompileTime: healthStatus.firstCompileTime ? new Date(healthStatus.firstCompileTime).toISOString() : null,
            serverUptime: formatDuration(uptime),
          });
        }

        return next();
      });
    },
    handleHotUpdate() {
      beginCompile();
      markSuccess();
    },
  };
}

function getStatus(status) {
  return {
    ...status,
    isHealthy: status.state === "success",
    errorCount: status.errors.length,
    warningCount: status.warnings.length,
    hasCompiled: status.totalCompiles > 0,
  };
}

function sendJson(res, code, payload) {
  res.statusCode = code;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(payload));
}

function sendText(res, code, payload) {
  res.statusCode = code;
  res.setHeader("Content-Type", "text/plain");
  res.end(payload);
}

function formatBytes(bytes) {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${Math.round((bytes / Math.pow(k, i)) * 100) / 100} ${sizes[i]}`;
}

function formatDuration(ms) {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  if (hours > 0) return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
  if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
  return `${seconds}s`;
}
