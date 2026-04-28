// Mock data for FoundryLab clone

export const stats = [
  { value: "10+", label: "Projects Delivered" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "3 wks", label: "Avg MVP Time" },
  { value: "\u20B96L+", label: "Raised by Clients" },
];

export const trustedLogos = [
  { name: "NexaFlow", symbol: "\u26A1" },
  { name: "Orbitly", symbol: "\u25CE" },
  { name: "PitchDeck", symbol: "\u25B2" },
  { name: "Stackrift", symbol: "\u25C8" },
  { name: "Luminary", symbol: "\u2B21" },
  { name: "Vaultora", symbol: "\u25C7" },
  { name: "Kairo", symbol: "\u2726" },
  { name: "Novexa", symbol: "\u25C6" },
];

export const services = [
  {
    id: 1,
    title: "MVP Development",
    desc: "Launch a working MVP in 2\u20134 weeks. Test your idea in the market before burning runway on a full build.",
    badge: "Most Popular",
    icon: "Rocket",
  },
  {
    id: 2,
    title: "Full-Stack Web Apps",
    desc: "Scalable, production-grade applications \u2014 Next.js, Node.js, PostgreSQL, cloud-native architecture.",
    icon: "Layers",
  },
  {
    id: 3,
    title: "UI/UX Design",
    desc: "Premium interface design that converts. Figma-first workflow, design systems, and pixel-perfect delivery.",
    icon: "Palette",
  },
  {
    id: 4,
    title: "Startup Consulting",
    desc: "Tech stack selection, architecture planning, product roadmapping, and go-to-market strategy sessions.",
    icon: "Compass",
  },
];

export const processSteps = [
  { num: "01", title: "Idea", desc: "We dig into your vision, market, and goals." },
  { num: "02", title: "Planning", desc: "Scope, roadmap, stack, and sprint structure." },
  { num: "03", title: "Design", desc: "Wireframes to high-fidelity UI in Figma." },
  { num: "04", title: "Build", desc: "Rapid, clean development with daily updates." },
  { num: "05", title: "Launch", desc: "Deploy, monitor, and scale with confidence." },
];

export const projects = [
  {
    id: 1,
    tags: ["SaaS", "Next.js", "Stripe"],
    name: "AnalyticsPulse",
    desc: "Real-time analytics dashboard for D2C brands. 0 \u2192 1,200 users in 3 months post-launch.",
    meta: "MVP built in 3 weeks",
    accent: "#D6C9B0",
  },
  {
    id: 2,
    tags: ["Marketplace", "React", "Node.js"],
    name: "FreelanceForge",
    desc: "B2B freelancer-client marketplace with escrow payments. Raised \u20B980L pre-seed.",
    meta: "Full build in 6 weeks",
    accent: "#C9B897",
  },
  {
    id: 3,
    tags: ["AI Tool", "OpenAI", "Python"],
    name: "DocuMind AI",
    desc: "AI-powered document intelligence for legal teams. 500+ enterprise signups at launch.",
    meta: "MVP built in 4 weeks",
    accent: "#B8A67D",
  },
];

export const whyUs = [
  { title: "Fast Delivery", desc: "MVP in 2\u20134 weeks guaranteed. We move at startup speed, not agency speed.", icon: "Zap" },
  { title: "Scalable Architecture", desc: "Code written to grow. From 10 users to 10M \u2014 the foundation is solid from day one.", icon: "Layers3" },
  { title: "Startup-Focused", desc: "We've been in the trenches. We know how to prioritize, cut scope, and ship what matters.", icon: "Target" },
  { title: "Clean Code + Security", desc: "Production-ready code, documented, tested, and secured. No spaghetti. No shortcuts.", icon: "ShieldCheck" },
];

export const pricing = [
  {
    name: "Starter",
    price: "\u20B910k \u2013 \u20B920k",
    tagline: "Perfect for landing pages, portfolios, or simple single-feature apps.",
    features: [
      "1\u20133 page web app or landing page",
      "Mobile-responsive UI",
      "Basic CMS integration",
      "1 week delivery",
      "2 revision rounds",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "MVP Build",
    price: "\u20B925k \u2013 \u20B960k",
    tagline: "Full-featured MVP to validate your startup idea with real users.",
    features: [
      "Full-stack web application",
      "Auth, payments, dashboard",
      "Custom UI/UX design",
      "3\u20134 weeks delivery",
      "Unlimited revisions during build",
      "1 month post-launch support",
    ],
    cta: "Start MVP",
    popular: true,
  },
  {
    name: "Full Build",
    price: "\u20B970k+",
    tagline: "Scalable production product for funded startups ready to grow.",
    features: [
      "Complete product development",
      "Advanced features + integrations",
      "Admin panel + analytics",
      "CI/CD pipeline + DevOps",
      "3 months support & maintenance",
      "Dedicated project manager",
    ],
    cta: "Let's Talk",
    popular: false,
  },
];

export const testimonials = [
  {
    quote: "FoundryLab didn't just build our product \u2014 they shaped our vision. The MVP launched in 3 weeks and we got our first 100 users before the sprint ended. Absolutely unreal execution.",
    initials: "RK",
    name: "Rahul Khandelwal",
    role: "Founder, AnalyticsPulse",
  },
  {
    quote: "I came with a Figma file and a dream. They turned it into a funded product. The code quality, the architecture decisions, the speed \u2014 it felt like working with a co-founder who also knew how to code.",
    initials: "PS",
    name: "Priya Sharma",
    role: "CEO, FreelanceForge",
  },
  {
    quote: "Every agency I spoke to wanted 3 months and \u20B95 lakh. FoundryLab delivered more in 4 weeks for a fraction of that. They get what early-stage founders actually need.",
    initials: "AV",
    name: "Arjun Verma",
    role: "Founder, DocuMind AI",
  },
];

export const footerLinks = {
  Services: ["MVP Development", "Full Stack Apps", "UI/UX Design", "Consulting"],
  Company: ["About Us", "Our Work", "Pricing", "Blog"],
  Connect: ["LinkedIn", "Twitter / X", "GitHub", "Instagram"],
};

export const navLinks = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];
