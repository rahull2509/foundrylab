// Detailed project data for sub-pages

export const projectDetails = {
  fyndkaro: {
    slug: "fyndkaro",
    name: "FyndKaro",
    subtitle: "India's First All-in-One Broker-Free Student & Professional Co-living Platform",
    website: "https://fyndkaro.com/",
    tags: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Socket.io", "Redis"],
    role: "Lead Full-Stack Engineers & Product Design",
    duration: "6 Weeks (Concept to Production)",
    client: "Prabhakar Kumar & Ved Prakash",
    accent: "#0047FF",
    meta: "Full Stack Build • 6 Weeks",
    metrics: [
      { label: "Brokerage Saved", value: "100%" },
      { label: "Active Student Cities", value: "10+" },
      { label: "Verified Listings", value: "15,000+" },
      { label: "Search-to-Onboard Time", value: "-50%" }
    ],
    overview: "FyndKaro was created to resolve the fragmented, high-brokerage student and professional housing market in India. Instead of dividing stays, roommate search, mess subscriptions, and cooks across multiple apps and local brokers, we built a single, unified, broker-free platform. The challenge was building a high-speed, localized search engine and a real-time messaging flow that allows instant negotiation between owners and seekers.",
    ourWork: "Our team built the application from the ground up. We designed the high-fidelity UI in Figma, developed the frontend using Next.js (with Server-Side Rendering for SEO optimization in student areas), and developed a highly optimized modular TypeScript monolithic backend. We integrated real-time chat via Socket.io and built a secure property and service provider verification portal for the admin team.",
    techStack: {
      frontend: [
        { name: "Next.js", role: "Framework with SSR & App Router" },
        { name: "TailwindCSS", role: "Utility-first clean styling" },
        { name: "Framer Motion", role: "Smooth micro-animations & route transitions" },
        { name: "Context API", role: "Global state management" }
      ],
      backend: [
        { name: "Node.js & Express", role: "Modular monolithic API layer" },
        { name: "TypeScript", role: "Robust type safety across routes & models" },
        { name: "Prisma ORM", role: "Database schema modeling and migrations" },
        { name: "PostgreSQL", role: "Relational data store for properties & users" }
      ],
      infrastructure: [
        { name: "Redis", role: "Session cache and OTP rate-limiting" },
        { name: "Socket.io", role: "Real-time communication for direct chat" },
        { name: "Docker", role: "Containerized deployment workflow" }
      ]
    },
    features: [
      {
        title: "Unified Multi-Vertical Search",
        desc: "Unified interface to browse Rooms/PGs, Roommates, Mess/Tiffin subscriptions, and verified Home Cooks, filtered by city and local area."
      },
      {
        title: "Lifestyle-Based Roommate Matching",
        desc: "An algorithmic quiz mapping habits (budget, clean habits, timings) and calculating compatibility scores to match flatmates."
      },
      {
        title: "Admin Moderation Portal",
        desc: "A custom admin backend to verify properties via geolocated images, approve cook profiles with background checks, and prevent spam listings."
      },
      {
        title: "Real-Time Direct Chat",
        desc: "Integrated chat sockets enabling direct communication between renters, roommates, and cooks without exposing private phone numbers."
      }
    ],
    architecture: {
      type: "Modular Monolith",
      description: "FyndKaro uses a modular monolithic architecture, allowing rapid feature development while keeping clear logical boundaries between the different services.",
      diagram: [
        { name: "Next.js Frontend", details: "Server-side rendered for local SEO, targeting pages like 'PGs in Bhopal' or 'Cooks in Kota'." },
        { name: "Nginx Gateway", details: "Handles SSL, gzip compression, and static asset caching." },
        { name: "Express API Core", details: "Contains decoupled modules: AuthModule, PropertyModule, RoommateModule, SubscriptionModule, ChatModule." },
        { name: "PostgreSQL Database", details: "Prisma schema with clear relationships. Separate tables for users, properties, roommates, cooks, and messages." },
        { name: "Redis & Sockets", details: "Handles active user sessions, rate limits, and real-time chat events." }
      ]
    }
  },
  verifydev: {
    slug: "verifydev",
    name: "VerifyDev",
    subtitle: "AI-Powered Developer Verification & Recruitment Platform",
    website: "https://verifydev.me/",
    tags: ["Next.js", "Go", "gRPC", "RabbitMQ", "Gemini API", "MongoDB", "Redis", "Nginx"],
    role: "Core Backend Architects & DevOps Engineers",
    duration: "8 Weeks (System Architecture & Build)",
    client: "VerifyDev Inc.",
    accent: "#0047FF",
    meta: "Microservices Architecture • 8 Weeks",
    metrics: [
      { label: "Internal Latency", value: "<15ms" },
      { label: "Payload Reduction", value: "30%" },
      { label: "Parallel Scans", value: "50/node" },
      { label: "Gateway Uptime", value: "99.99%" }
    ],
    overview: "VerifyDev automatically verifies developer skills by checking their GitHub repositories using AI, assigns Aura scores, and connects verified candidates with recruiters. The challenge was building an architecture that scales with high disk-I/O requirements (cloning whole git repositories), handles Gemini AI API limits, and returns recruiter searches with minimal delay.",
    ourWork: "We designed and engineered the hybrid HTTP + gRPC microservices architecture. Nginx acts as the API Gateway, handling authentication verification and forwarding public REST traffic. Internal microservices communicate via binary gRPC protocols, eliminating JSON serialization overhead. Repository analysis is fully asynchronous: a Node.js service triggers tasks into a RabbitMQ queue, which Go workers consume to clone repositories, parse file systems, and execute Gemini AI analysis pipelines.",
    techStack: {
      frontend: [
        { name: "Next.js & React Native", role: "Multi-platform recruitment portal and candidate dashboard" },
        { name: "TailwindCSS", role: "Sleek and professional dark mode UI" }
      ],
      backend: [
        { name: "TypeScript & Express", role: "High-cohesion REST services (Auth, User, Job)" },
        { name: "Go (Golang)", role: "High-performance services: Repository Analyzer & Resume PDF Generator" },
        { name: "gRPC", role: "Binary Protocol Buffers for fast inter-service calls" },
        { name: "Prisma & MongoDB Atlas", role: "NoSQL document store for nested developer profiles and projects" }
      ],
      infrastructure: [
        { name: "Nginx Gateway", role: "Central routing, SSL, CORS, rate limiting, and compression" },
        { name: "RabbitMQ", role: "Message queue coordinating async analysis tasks and event-driven worker updates" },
        { name: "Redis", role: "Session store, rate limiting, and lookup caching" },
        { name: "Docker Compose & Azure", role: "Containerized deployments via GitHub Actions to Azure VMs" }
      ]
    },
    features: [
      {
        title: "Nginx API Gateway",
        desc: "Centralized port entry (Port 8000) that manages routing, rate limiting, and security headers before proxying backend traffic."
      },
      {
        title: "gRPC Service-to-Service Flow",
        desc: "Recruiter service requests batch developer profiles from User Service using binary Protobuf files. Achieves sub-15ms response times."
      },
      {
        title: "Async Project Analyzer (Go)",
        desc: "Clones target GitHub repositories, scans tree structure to identify tech stack, and sends source files to Gemini AI to verify skill levels."
      },
      {
        title: "Aura Score Engine",
        desc: "Consumes finished analyzer payloads via RabbitMQ, calculates a weighted rating based on repo complexity and skill levels, and updates user profile."
      }
    ],
    architecture: {
      title: "VerifyDev Backend Architecture Map",
      description: "Interactive layout of VerifyDev's high-performance hybrid backend system.",
      nodes: [
        {
          id: "frontend",
          name: "Frontend",
          type: "Client",
          tech: "Next.js / React Native",
          description: "User & Recruiter web applications and mobile apps.",
          x: 50, y: 8,
          port: "N/A"
        },
        {
          id: "gateway",
          name: "Nginx API Gateway",
          type: "Gateway",
          tech: "Nginx (Reverse Proxy)",
          description: "Handles SSL termination, CORS, rate limiting, and route proxying.",
          x: 50, y: 22,
          port: "Port 8000"
        },
        {
          id: "auth-service",
          name: "Auth Service",
          type: "Service",
          tech: "TypeScript, Express",
          description: "Manages GitHub OAuth, session caching, and JWT issuing.",
          x: 10, y: 42,
          port: "Port 3001 (HTTP)"
        },
        {
          id: "user-service",
          name: "User Service",
          type: "Service",
          tech: "TypeScript, Express + gRPC",
          description: "Core profile management, skills CRUD, and experiences database.",
          x: 50, y: 42,
          port: "Port 3002 (HTTP) / Port 50051 (gRPC)"
        },
        {
          id: "job-service",
          name: "Job Service",
          type: "Service",
          tech: "TypeScript, Express",
          description: "Handles job listings, applications, recruiter APIs, and messaging.",
          x: 90, y: 42,
          port: "Port 3004 (HTTP)"
        },
        {
          id: "recruiter-service",
          name: "Recruiter Service",
          type: "Service",
          tech: "TypeScript + gRPC Client",
          description: "Candidate search indexer, list management, and gRPC profile fetcher.",
          x: 50, y: 60,
          port: "Port 3005 (HTTP) / Port 50054 (gRPC)"
        },
        {
          id: "project-analyzer",
          name: "Project Analyzer",
          type: "Worker",
          tech: "Go (Golang)",
          description: "Clones repositories, extracts structure, and runs Gemini AI skill analysis.",
          x: 10, y: 78,
          port: "Port 8001 (HTTP)"
        },
        {
          id: "aura-processor",
          name: "Aura Processor",
          type: "Worker",
          tech: "TypeScript (Worker)",
          description: "Consumes completed analysis and calculates candidate Aura scores.",
          x: 50, y: 78,
          port: "N/A (RabbitMQ consumer)"
        },
        {
          id: "resume-service",
          name: "Resume Service",
          type: "Service",
          tech: "Go (Golang)",
          description: "Generates high-quality PDF resumes dynamically.",
          x: 90, y: 78,
          port: "Port 8003 (HTTP)"
        },
        {
          id: "redis",
          name: "Redis Cache",
          type: "Database",
          tech: "Redis",
          description: "Caches sessions, API rate limits, and temporary developer lookups.",
          x: 10, y: 94,
          port: "Port 6379"
        },
        {
          id: "rabbitmq",
          name: "RabbitMQ Broker",
          type: "Queue",
          tech: "RabbitMQ",
          description: "Asynchronous message broker handling event-driven tasks.",
          x: 50, y: 94,
          port: "Port 5672 (AMQP)"
        },
        {
          id: "mongodb",
          name: "MongoDB Atlas",
          type: "Database",
          tech: "MongoDB Atlas",
          description: "Stores document collections for users, projects, and jobs.",
          x: 90, y: 94,
          port: "Cloud (Prisma)"
        }
      ],
      connections: [
        { "from": "frontend", "to": "gateway", "type": "JSON/HTTP", "label": "Client requests" },
        { "from": "gateway", "to": "auth-service", "type": "HTTP Proxy", "label": "/api/v1/auth" },
        { "from": "gateway", "to": "user-service", "type": "HTTP Proxy", "label": "/api/v1/users" },
        { "from": "gateway", "to": "job-service", "type": "HTTP Proxy", "label": "/api/v1/jobs" },
        { "from": "gateway", "to": "recruiter-service", "type": "HTTP Proxy", "label": "/api/v1/recruiters" },
        { "from": "gateway", "to": "resume-service", "type": "HTTP Proxy", "label": "/api/v1/resumes" },
        { "from": "recruiter-service", "to": "user-service", "type": "⚡ gRPC", "label": "BatchGetUsers (Binary Protobuf)" },
        { "from": "user-service", "to": "rabbitmq", "type": "RabbitMQ Publish", "label": "project.analyze.request" },
        { "from": "rabbitmq", "to": "project-analyzer", "type": "RabbitMQ Consume", "label": "Trigger clone & scan" },
        { "from": "project-analyzer", "to": "rabbitmq", "type": "RabbitMQ Publish", "label": "project.analyzed" },
        { "from": "rabbitmq", "to": "aura-processor", "type": "RabbitMQ Consume", "label": "Compute Aura rating" },
        { "from": "auth-service", "to": "redis", "type": "TCP/Cache", "label": "Session sync" },
        { "from": "user-service", "to": "mongodb", "type": "TCP/Prisma", "label": "Profiles data" },
        { "from": "job-service", "to": "mongodb", "type": "TCP/Prisma", "label": "Job Listings data" },
        { "from": "recruiter-service", "to": "mongodb", "type": "TCP/Prisma", "label": "Shortlists data" }
      ]
    }
  },
  analyticspulse: {
    slug: "analyticspulse",
    name: "AnalyticsPulse",
    subtitle: "Real-Time Customer Analytics Platform for D2C Brands",
    website: "https://analyticspulse.example.com",
    tags: ["Next.js", "ClickHouse", "Express.js", "Redis", "Stripe"],
    role: "Full-Stack Development & Data Pipeline Setup",
    duration: "3 Weeks",
    client: "AnalyticsPulse LLC",
    accent: "#0047FF",
    meta: "MVP built in 3 weeks",
    metrics: [
      { label: "Page Loads", value: "<150ms" },
      { label: "Active Users", value: "1,200+" },
      { label: "Conversion Rate", value: "+28%" },
      { label: "Deployment Time", value: "3 Weeks" }
    ],
    overview: "AnalyticsPulse is a dashboard giving D2C brand managers real-time visibility into customer cohorts, product page drop-offs, and payment funnel conversion. We optimized standard queries to load in sub-150ms, helping marketers optimize campaigns instantly without waiting for daily report compilations.",
    ourWork: "We built the dashboard client using Next.js and Tailwind, integrating Stripe billing, and connected a high-speed ingestion API. Real-time metrics are buffered via Redis streams and committed to a analytical database (ClickHouse), ensuring large data sets are aggregated in milliseconds.",
    techStack: {
      frontend: [
        { name: "Next.js", role: "Interactive dashboard UI" },
        { name: "TailwindCSS", role: "Utility styling" },
        { name: "Recharts", role: "Real-time charting library" }
      ],
      backend: [
        { name: "Express.js", role: "REST APIs and Webhook endpoints" },
        { name: "ClickHouse", role: "High-speed analytical database for click events" }
      ],
      infrastructure: [
        { name: "Redis", role: "Event streaming and query caching" },
        { name: "Stripe", role: "Billing, checkout flows, and sub management" }
      ]
    },
    features: [
      {
        title: "Sub-Second Cohort Reporting",
        desc: "Create dynamic user retention cohorts on the fly with responsive queries returning in under 200ms."
      },
      {
        title: "Visual Checkout Funnels",
        desc: "Tracks users step-by-step from listing page to final checkout, highlighting dropping spots."
      }
    ],
    architecture: {
      type: "Analytical Pipeline",
      description: "AnalyticsPulse processes click streams asynchronously using memory queues and a columnar database.",
      diagram: [
        { name: "Client SDK", details: "Sends click streams to the backend server." },
        { name: "Redis Stream Buffer", details: "Ingests and logs events, preventing database choking during high traffic." },
        { name: "ClickHouse Ingester", details: "Worker that pulls events in batches and writes to columnar storage." },
        { name: "Analytics Dashboard", details: "Queries ClickHouse directly using optimized SQL queries." }
      ]
    }
  }
};
