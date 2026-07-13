import React, { useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  ExternalLink, 
  Globe, 
  Cpu, 
  Layers, 
  Activity, 
  Database, 
  Play, 
  CheckCircle, 
  Server, 
  Terminal, 
  Settings, 
  HelpCircle,
  Zap,
  ArrowRight,
  RefreshCw
} from "lucide-react";
import { projectDetails } from "../projectDetails";

export default function ProjectDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const [project, setProject] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [animationPath, setAnimationPath] = useState([]);
  const [animatingStep, setAnimatingStep] = useState(-1);
  const [simulationActive, setSimulationActive] = useState(false);

  useEffect(() => {
    // Scroll to top on load
    window.scrollTo(0, 0);
    
    if (projectDetails[slug]) {
      setProject(projectDetails[slug]);
      // Select first node by default for verifydev
      if (slug === "verifydev" && projectDetails[slug].architecture?.nodes) {
        setSelectedNode(projectDetails[slug].architecture.nodes.find(n => n.id === "gateway"));
      }
    } else {
      // Redirect to home if project not found
      navigate("/");
    }
  }, [slug, navigate]);

  if (!project) {
    return (
      <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center">
        <div className="flex items-center gap-3">
          <RefreshCw className="animate-spin text-[var(--blue)]" size={24} />
          <span className="serif text-xl">Loading project details...</span>
        </div>
      </div>
    );
  }

  // Animation simulator for VerifyDev repository scanning flow
  const runSimulation = () => {
    if (simulationActive) return;
    setSimulationActive(true);
    
    // Path: frontend -> gateway -> user-service -> rabbitmq -> project-analyzer -> rabbitmq -> aura-processor -> mongodb
    const path = [
      "frontend",
      "gateway",
      "user-service",
      "rabbitmq",
      "project-analyzer",
      "rabbitmq",
      "aura-processor",
      "mongodb"
    ];
    
    setAnimationPath(path);
    
    let step = 0;
    setAnimatingStep(0);
    
    const interval = setInterval(() => {
      step++;
      if (step < path.length) {
        setAnimatingStep(step);
        // Auto-select the currently active node in simulation to show its details
        const node = project.architecture.nodes.find(n => n.id === path[step]);
        if (node) setSelectedNode(node);
      } else {
        clearInterval(interval);
        setAnimatingStep(-1);
        setAnimationPath([]);
        setSimulationActive(false);
      }
    }, 1200);
  };

  const getIconForType = (type) => {
    switch (type?.toLowerCase()) {
      case "client": return <Globe className="text-amber-500" size={16} />;
      case "gateway": return <Settings className="text-purple-500" size={16} />;
      case "service": return <Server className="text-blue-500" size={16} />;
      case "worker": return <Cpu className="text-emerald-500" size={16} />;
      case "database": return <Database className="text-rose-500" size={16} />;
      case "queue": return <Activity className="text-sky-500" size={16} />;
      default: return <Cpu size={16} />;
    }
  };

  const getNodeCoords = (node) => {
    // Render coordinates in percentage terms
    return {
      left: `${node.x}%`,
      top: `${node.y}%`
    };
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)] pb-24 relative overflow-hidden noise">
      {/* Grid background decoration */}
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      
      {/* Dynamic top header accent */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full opacity-20 blur-[100px] pointer-events-none transition-all duration-1000"
        style={{ backgroundColor: project.accent || "var(--blue)" }}
      />

      <div className="max-w-[1400px] mx-auto px-6 md:px-8 pt-28 md:pt-36 relative z-10">
        {/* Back Link */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--blue)] transition-colors mb-8 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Portfolio</span>
        </Link>

        {/* Project Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          <div className="lg:col-span-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((t) => (
                <span key={t} className="mono text-[10px] uppercase tracking-widest border hairline rounded-full px-3 py-1 bg-[var(--surface)] text-[var(--muted)]">
                  {t}
                </span>
              ))}
            </div>
            <h1 className="serif text-5xl md:text-7xl tracking-tight leading-[1.05] mb-6">
              {project.name}
            </h1>
            <p className="text-xl md:text-2xl text-[var(--muted-2)] font-light leading-relaxed max-w-3xl">
              {project.subtitle}
            </p>
          </div>

          <div className="lg:col-span-4 bg-[var(--surface)] border hairline rounded-3xl p-6 md:p-8 flex flex-col gap-5 w-full">
            <div>
              <span className="mono text-[10px] text-[var(--muted)] block mb-1 uppercase tracking-widest">// Agency Role</span>
              <span className="text-base font-medium">{project.role}</span>
            </div>
            <div className="border-t hairline pt-4">
              <span className="mono text-[10px] text-[var(--muted)] block mb-1 uppercase tracking-widest">// Project Duration</span>
              <span className="text-base font-medium">{project.duration}</span>
            </div>
            <div className="border-t hairline pt-4 flex justify-between items-center">
              <div>
                <span className="mono text-[10px] text-[var(--muted)] block mb-1 uppercase tracking-widest">// Direct Link</span>
                <a 
                  href={project.website} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-base font-medium text-[var(--blue)] hover:underline inline-flex items-center gap-1.5"
                >
                  {project.website.replace("https://", "").replace("/", "")}
                  <ExternalLink size={14} />
                </a>
              </div>
              <a 
                href={project.website} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-12 h-12 rounded-full bg-[var(--ink)] text-[var(--bg)] hover:bg-[var(--blue)] hover:text-white transition-all duration-300 grid place-items-center"
              >
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Project Key Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-16">
          {project.metrics.map((m, idx) => (
            <div key={idx} className="bg-[var(--surface)] border hairline rounded-2xl p-6 relative overflow-hidden group hover:border-[var(--blue)] transition-colors duration-300">
              <div 
                className="absolute top-0 right-0 w-24 h-24 rounded-full bg-[var(--blue-soft)]/20 translate-x-8 -translate-y-8 group-hover:scale-125 transition-transform duration-500" 
                style={{ backgroundColor: `${project.accent}15` }}
              />
              <span className="mono text-[11px] text-[var(--muted)] uppercase tracking-wider block mb-2">{m.label}</span>
              <span className="serif text-3xl md:text-5xl font-semibold tracking-tight text-[var(--ink)]">
                {m.value}
              </span>
            </div>
          ))}
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b hairline mb-10 overflow-x-auto gap-8">
          <button 
            onClick={() => setActiveTab("overview")}
            className={`pb-4 text-base font-medium transition-colors border-b-2 whitespace-nowrap ${
              activeTab === "overview" 
                ? "border-[var(--blue)] text-[var(--blue)] font-semibold" 
                : "border-transparent text-[var(--muted)] hover:text-[var(--ink)]"
            }`}
          >
            Case Study Overview
          </button>
          <button 
            onClick={() => setActiveTab("tech")}
            className={`pb-4 text-base font-medium transition-colors border-b-2 whitespace-nowrap ${
              activeTab === "tech" 
                ? "border-[var(--blue)] text-[var(--blue)] font-semibold" 
                : "border-transparent text-[var(--muted)] hover:text-[var(--ink)]"
            }`}
          >
            Tech Stack Details
          </button>
          <button 
            onClick={() => setActiveTab("architecture")}
            className={`pb-4 text-base font-medium transition-colors border-b-2 whitespace-nowrap ${
              activeTab === "architecture" 
                ? "border-[var(--blue)] text-[var(--blue)] font-semibold" 
                : "border-transparent text-[var(--muted)] hover:text-[var(--ink)]"
            }`}
          >
            {slug === "verifydev" ? "⚡ Interactive System Map" : "System Architecture"}
          </button>
        </div>

        {/* Tab Contents */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
            <div className="lg:col-span-8 flex flex-col gap-8">
              <div className="bg-[var(--surface)] border hairline rounded-3xl p-8">
                <h3 className="serif text-2xl md:text-3xl mb-4 font-medium">The Challenge</h3>
                <p className="text-base md:text-lg text-[var(--muted-2)] leading-relaxed font-light">
                  {project.overview}
                </p>
              </div>

              <div className="bg-[var(--surface)] border hairline rounded-3xl p-8">
                <h3 className="serif text-2xl md:text-3xl mb-4 font-medium">Our Implementation</h3>
                <p className="text-base md:text-lg text-[var(--muted-2)] leading-relaxed font-light">
                  {project.ourWork}
                </p>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-6">
              <h3 className="serif text-2xl md:text-3xl mb-2 font-medium">Key Shipped Features</h3>
              <div className="flex flex-col gap-4">
                {project.features.map((f, i) => (
                  <div key={i} className="bg-[var(--surface)] border hairline rounded-2xl p-5 flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-[var(--blue-soft)] text-[var(--blue)] flex items-center justify-center shrink-0 mt-0.5" style={{ backgroundColor: `${project.accent}15`, color: project.accent }}>
                      <CheckCircle size={16} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm mb-1">{f.title}</h4>
                      <p className="text-xs text-[var(--muted)] leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "tech" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-[var(--surface)] border hairline rounded-3xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                  <Globe size={20} />
                </div>
                <h3 className="serif text-xl md:text-2xl font-medium">Frontend</h3>
              </div>
              <div className="flex flex-col gap-4">
                {project.techStack.frontend.map((t, i) => (
                  <div key={i} className="border-b hairline pb-3 last:border-b-0 last:pb-0">
                    <span className="font-semibold text-sm text-[var(--ink)] block mb-0.5">{t.name}</span>
                    <span className="text-xs text-[var(--muted)]">{t.role}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[var(--surface)] border hairline rounded-3xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
                  <Server size={20} />
                </div>
                <h3 className="serif text-xl md:text-2xl font-medium">Backend Layer</h3>
              </div>
              <div className="flex flex-col gap-4">
                {project.techStack.backend.map((t, i) => (
                  <div key={i} className="border-b hairline pb-3 last:border-b-0 last:pb-0">
                    <span className="font-semibold text-sm text-[var(--ink)] block mb-0.5">{t.name}</span>
                    <span className="text-xs text-[var(--muted)]">{t.role}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[var(--surface)] border hairline rounded-3xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center">
                  <Cpu size={20} />
                </div>
                <h3 className="serif text-xl md:text-2xl font-medium">Infrastructure</h3>
              </div>
              <div className="flex flex-col gap-4">
                {project.techStack.infrastructure.map((t, i) => (
                  <div key={i} className="border-b hairline pb-3 last:border-b-0 last:pb-0">
                    <span className="font-semibold text-sm text-[var(--ink)] block mb-0.5">{t.name}</span>
                    <span className="text-xs text-[var(--muted)]">{t.role}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "architecture" && (
          <div className="flex flex-col gap-8">
            {slug === "verifydev" ? (
              /* High-fidelity interactive System Map for VerifyDev based on JSON */
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-8">
                  <div className="bg-[var(--surface)] border hairline rounded-3xl p-6 relative">
                    <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
                      <div>
                        <h3 className="serif text-xl md:text-2xl font-medium">VerifyDev Hybrid Architecture Canvas</h3>
                        <p className="text-xs text-[var(--muted)] mt-1">
                          JSON-driven layout mapping physical nodes, protocols, and microservice connections.
                        </p>
                      </div>
                      
                      <button
                        onClick={runSimulation}
                        disabled={simulationActive}
                        className={`px-4 py-2 rounded-full inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                          simulationActive 
                            ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 cursor-not-allowed" 
                            : "bg-[var(--ink)] text-[var(--bg)] hover:bg-[var(--blue)] hover:text-white"
                        }`}
                      >
                        <Play size={12} className={simulationActive ? "animate-pulse" : ""} />
                        {simulationActive ? "Analyzing Repo..." : "Simulate Code Scan Flow"}
                      </button>
                    </div>

                    {/* Interactive Node Graph Canvas */}
                    <div 
                      ref={containerRef}
                      className="w-full h-[620px] bg-slate-900/5 dark:bg-slate-900/40 rounded-2xl relative overflow-hidden border border-slate-200 dark:border-slate-800"
                    >
                      {/* Grid background for canvas */}
                      <div className="absolute inset-0 opacity-15 pointer-events-none" 
                        style={{
                          backgroundImage: "radial-gradient(#1e293b 1px, transparent 1px)",
                          backgroundSize: "20px 20px"
                        }} 
                      />

                      {/* SVG connections overlay */}
                      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                        <defs>
                          <marker id="arrow" viewBox="0 0 10 10" refX="28" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                            <path d="M 0 1 L 10 5 L 0 9 z" fill="#64748b" />
                          </marker>
                          <marker id="arrow-grpc" viewBox="0 0 10 10" refX="28" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                            <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--blue)" />
                          </marker>
                          <marker id="arrow-rabbitmq" viewBox="0 0 10 10" refX="28" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                            <path d="M 0 1 L 10 5 L 0 9 z" fill="#f97316" />
                          </marker>
                        </defs>

                        {project.architecture.connections.map((c, idx) => {
                          const fromNode = project.architecture.nodes.find(n => n.id === c.from);
                          const toNode = project.architecture.nodes.find(n => n.id === c.to);
                          if (!fromNode || !toNode) return null;

                          // Coordinates as absolute values based on percentage
                          const x1 = `${fromNode.x}%`;
                          const y1 = `${fromNode.y}%`;
                          const x2 = `${toNode.x}%`;
                          const y2 = `${toNode.y}%`;

                          // Check if this connection is currently active in the simulation path
                          const pathIndexFrom = animationPath.indexOf(c.from);
                          const pathIndexTo = animationPath.indexOf(c.to);
                          const isActive = animatingStep !== -1 && 
                                           pathIndexFrom !== -1 && 
                                           pathIndexTo !== -1 && 
                                           pathIndexTo === pathIndexFrom + 1 && 
                                           animatingStep === pathIndexTo;

                          let strokeColor = "#64748b"; // default slate
                          let strokeWidth = "1.5";
                          let strokeDash = "none";
                          let marker = "url(#arrow)";

                          if (c.type === "⚡ gRPC") {
                            strokeColor = "var(--blue)";
                            strokeWidth = "2";
                            marker = "url(#arrow-grpc)";
                          } else if (c.type.includes("RabbitMQ")) {
                            strokeColor = "#f97316"; // orange
                            strokeDash = "4 4";
                            marker = "url(#arrow-rabbitmq)";
                          }

                          if (isActive) {
                            strokeColor = "#10b981"; // active green
                            strokeWidth = "3";
                            strokeDash = "none";
                          }

                          return (
                            <g key={idx}>
                              <line
                                x1={x1}
                                y1={y1}
                                x2={x2}
                                y2={y2}
                                stroke={strokeColor}
                                strokeWidth={strokeWidth}
                                strokeDasharray={strokeDash}
                                markerEnd={marker}
                                className="transition-all duration-500"
                              />
                            </g>
                          );
                        })}
                      </svg>

                      {/* Render Nodes as Interactive Buttons */}
                      {project.architecture.nodes.map((n) => {
                        const isSelected = selectedNode?.id === n.id;
                        const isSimulationActive = animationPath[animatingStep] === n.id;
                        
                        let borderStyle = "border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200";
                        if (isSelected) {
                          borderStyle = "border-[var(--blue)] ring-2 ring-[var(--blue)]/30 bg-[var(--blue-soft)] dark:bg-slate-800 text-[var(--blue)]";
                        }
                        if (isSimulationActive) {
                          borderStyle = "border-emerald-500 ring-4 ring-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold";
                        }

                        return (
                          <button
                            key={n.id}
                            onClick={() => setSelectedNode(n)}
                            className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-xl border p-2.5 shadow-sm text-left transition-all duration-300 flex items-center gap-2 max-w-[170px] z-10 hover:scale-105 hover:shadow-md ${borderStyle}`}
                            style={getNodeCoords(n)}
                          >
                            <div className="p-1 rounded bg-slate-100 dark:bg-slate-700 shrink-0">
                              {getIconForType(n.type)}
                            </div>
                            <div className="overflow-hidden">
                              <h4 className="text-[10px] md:text-xs font-semibold truncate leading-tight">{n.name}</h4>
                              <p className="text-[8px] text-slate-400 truncate mt-0.5">{n.tech.split(",")[0]}</p>
                            </div>
                            
                            {/* Blinking health/status dot */}
                            <span className="absolute top-1 right-1 flex h-1.5 w-1.5">
                              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                                isSimulationActive ? "bg-emerald-400" : isSelected ? "bg-[var(--blue)]" : "bg-green-400"
                              }`} />
                              <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${
                                isSimulationActive ? "bg-emerald-500" : isSelected ? "bg-[var(--blue)]" : "bg-green-500"
                              }`} />
                            </span>
                          </button>
                        );
                      })}

                      {/* Simulation flow legend */}
                      {simulationActive && (
                        <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-slate-900/90 border border-emerald-500/30 rounded-lg p-2.5 max-w-xs text-[10px] text-slate-700 dark:text-slate-300 z-20 flex items-center gap-2.5 animate-pulse">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                          <span>
                            <strong>Step {animatingStep + 1}/8:</strong>{" "}
                            {animatingStep === 0 && "Frontend fires code analyze request."}
                            {animatingStep === 1 && "Nginx Gateway forwards request to User Service."}
                            {animatingStep === 2 && "User Service inserts pending project and posts event."}
                            {animatingStep === 3 && "RabbitMQ buffers event and queues job queue."}
                            {animatingStep === 4 && "Go Project Analyzer worker clones repo and calls Gemini AI."}
                            {animatingStep === 5 && "Go Analyzer publishes structured skill metrics back."}
                            {animatingStep === 6 && "Aura Processor updates developer score in DB."}
                            {animatingStep === 7 && "Completed status & Aura score saved in MongoDB Atlas."}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Node Metadata Inspector Panel */}
                <div className="lg:col-span-4 flex flex-col gap-5">
                  <h3 className="serif text-xl md:text-2xl font-medium block">// Node Inspector</h3>
                  
                  {selectedNode ? (
                    <div className="bg-[var(--surface)] border hairline rounded-3xl p-6 flex flex-col gap-4 relative overflow-hidden">
                      <div className="flex justify-between items-start">
                        <span className="mono text-[10px] uppercase tracking-wider bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-[var(--muted)]">
                          {selectedNode.type} Node
                        </span>
                        <span className="mono text-[10px] text-[var(--blue)] font-semibold">{selectedNode.port}</span>
                      </div>
                      
                      <div>
                        <h4 className="serif text-2xl font-semibold mb-1">{selectedNode.name}</h4>
                        <span className="mono text-[10px] text-[var(--muted)]">{selectedNode.tech}</span>
                      </div>

                      <p className="text-sm text-[var(--muted-2)] leading-relaxed mt-2 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                        {selectedNode.description}
                      </p>

                      <div className="mt-2 flex flex-col gap-3">
                        <span className="mono text-[10px] text-[var(--muted)] uppercase tracking-widest">// Connection Contracts</span>
                        <div className="flex flex-col gap-2">
                          {project.architecture.connections
                            .filter(c => c.from === selectedNode.id || c.to === selectedNode.id)
                            .map((c, i) => {
                              const isFrom = c.from === selectedNode.id;
                              const targetNode = project.architecture.nodes.find(n => n.id === (isFrom ? c.to : c.from));
                              return (
                                <div key={i} className="flex items-center justify-between text-xs border-b hairline pb-2 last:border-b-0">
                                  <span className="text-slate-400">
                                    {isFrom ? "→ to " : "← from "}<strong>{targetNode?.name}</strong>
                                  </span>
                                  <span className={`mono text-[9px] px-2 py-0.5 rounded ${
                                    c.type === "⚡ gRPC" 
                                      ? "bg-[var(--blue-soft)] text-[var(--blue)]" 
                                      : c.type.includes("RabbitMQ") 
                                        ? "bg-orange-500/10 text-orange-500" 
                                        : "bg-slate-100 dark:bg-slate-800 text-[var(--muted)]"
                                  }`}>
                                    {c.type}
                                  </span>
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-[var(--surface)] border hairline rounded-3xl p-6 text-center text-[var(--muted)] py-12">
                      <HelpCircle className="mx-auto mb-3 opacity-40" size={32} />
                      <p className="text-sm">Click on any node in the canvas map to inspect its details and endpoints.</p>
                    </div>
                  )}

                  <div className="bg-[var(--surface)] border hairline rounded-3xl p-6 flex flex-col gap-3">
                    <span className="mono text-[10px] text-[var(--muted)] uppercase tracking-wider block">// Protocol Legend</span>
                    <div className="flex flex-col gap-2 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-0.5 bg-slate-500" />
                        <span><strong>JSON/HTTP:</strong> Public REST client endpoints</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-0.5 bg-[var(--blue)]" />
                        <span><strong>⚡ gRPC:</strong> Inter-service binary communication</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-0.5 border-t border-dashed border-orange-500" />
                        <span><strong>RabbitMQ:</strong> Event-driven asynchronous worker tasks</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Simplified System Architecture list for FyndKaro and others */
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-8 bg-[var(--surface)] border hairline rounded-3xl p-6 md:p-8">
                  <h3 className="serif text-2xl mb-2 font-medium">{project.architecture.type} Model</h3>
                  <p className="text-base text-[var(--muted-2)] mb-8 font-light">
                    {project.architecture.description}
                  </p>

                  <div className="flex flex-col gap-5">
                    {project.architecture.diagram.map((item, idx) => (
                      <div key={idx} className="flex gap-4 items-start border-l-2 border-[var(--blue)] pl-5 py-1">
                        <div className="mono text-xs text-[var(--blue)] font-semibold mt-0.5">
                          0{idx + 1}
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm mb-1">{item.name}</h4>
                          <p className="text-xs text-[var(--muted)] leading-relaxed">{item.details}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-4 bg-[var(--surface)] border hairline rounded-3xl p-6">
                  <h3 className="serif text-xl font-semibold mb-4">Architecture Rationale</h3>
                  <p className="text-xs text-[var(--muted-2)] leading-relaxed mb-4">
                    Choosing the right backend model was crucial. By bundling services into a modular configuration for FyndKaro, we kept deployment costs low and code execution unified, while ensuring logical modules are ready to be split into separate services as scaling demands.
                  </p>
                  <div className="p-4 bg-[var(--blue-soft)]/20 text-[var(--blue)] rounded-2xl flex items-start gap-3" style={{ backgroundColor: `${project.accent}10`, color: project.accent }}>
                    <Zap size={18} className="shrink-0 mt-0.5 animate-bounce" />
                    <div>
                      <h4 className="font-semibold text-xs mb-0.5">Rapid Deployment</h4>
                      <p className="text-[10px] leading-relaxed opacity-85">Single database connection pool and shared memory caches optimize latency to under 30ms.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Project Contact CTA */}
        <div className="mt-20 border-t border-[var(--ink)]/10 pt-16 flex flex-col items-center text-center">
          <h3 className="serif text-4xl md:text-5xl tracking-tight mb-4">
            Need a similar system for <span className="italic-serif text-[var(--blue)]">your project</span>?
          </h3>
          <p className="max-w-md text-[var(--muted)] mb-8 text-sm md:text-base">
            We deliver modular backends, microservices architecture, and clean high-fidelity Next.js web applications in record time.
          </p>
          <a href="#contact" className="btn-blue rounded-full px-6 py-3 text-sm inline-flex items-center gap-2">
            Let's Talk Architecture <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}
