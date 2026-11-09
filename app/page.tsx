'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Code, Smartphone, Layout, Cpu, Server, Layers, 
  ArrowRight, ShieldCheck, Calculator, X, Pause, Play, Eye, 
  CheckCircle2, ArrowUpRight, Menu
} from 'lucide-react';

// Custom Recreated Vcrown Orbit Vector SVG Logo
function VcrownLogo({ className = "w-9 h-9" }) {
  return (
    <div className={`relative ${className} flex items-center justify-center`}>
      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full transform group-hover:scale-105 transition-transform duration-300">
        <defs>
          <linearGradient id="v_grad_react" x1="40" y1="40" x2="160" y2="180" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF"/>
            <stop offset="50%" stopColor="#8B5CF6"/>
            <stop offset="100%" stopColor="#6366F1"/>
          </linearGradient>
          <linearGradient id="orbit_grad_react" x1="20" y1="80" x2="180" y2="120" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#A855F7"/>
            <stop offset="100%" stopColor="#3B82F6"/>
          </linearGradient>
        </defs>
        {/* Stylized V */}
        <path d="M 35 60 L 95 160 C 97 163, 103 163, 105 160 L 165 60 C 167 56, 163 50, 155 50 L 125 50 C 122 50, 119 52, 117 55 L 100 95 L 83 55 C 81 52, 78 50, 75 50 L 45 50 C 37 50, 33 56, 35 60 Z" fill="url(#v_grad_react)"/>
        {/* Cosmic Orbit Ring */}
        <path d="M 25 125 C 20 100, 50 65, 110 50 C 160 38, 185 55, 175 75 C 165 95, 125 130, 60 145 C 40 150, 28 140, 25 125 Z" stroke="url(#orbit_grad_react)" strokeWidth="10" strokeLinecap="round" fill="none" opacity="0.95"/>
        {/* Star Flare */}
        <path d="M 100 22 L 104 36 L 118 40 L 104 44 L 100 58 L 96 44 L 82 40 L 96 36 Z" fill="#FFFFFF"/>
      </svg>
    </div>
  );
}

// Case Study Data
const CASE_STUDIES = {
  apex: {
    title: "Apex Cloud Desk",
    category: "Fintech Platform",
    metric: "+340% Revenue Scaled",
    description: "Enterprise treasury management platform processing real-time WebSocket banking API feeds with sub-50ms sync latency.",
    stack: ["Next.js", "TypeScript", "Node.js", "Redis", "Tailwind CSS"],
    deliverables: ["Micro-frontend Architecture", "SOC2 Data Compliance", "Custom Financial Analytics Dashboard"]
  },
  pulse: {
    title: "Pulse Fitness AI",
    category: "iOS & Android App",
    metric: "120k Active Daily Users",
    description: "Cross-platform biometric tracking app with instant Bluetooth device sync and dynamic AI personal trainer feedback.",
    stack: ["React Native", "FastAPI", "Python", "PyTorch", "GraphQL"],
    deliverables: ["Native iOS/Android Builds", "Real-Time Biometric Engine", "Offline-First Sync Engine"]
  },
  vault: {
    title: "Vault Intelligence",
    category: "AI Microservice",
    metric: "Sub-100ms Query Time",
    description: "AI-powered legal contract analysis engine utilizing vector database search, automated parsing, and smart risk flag scoring.",
    stack: ["Python", "Pinecone", "OpenAI API", "Docker", "AWS Lambda"],
    deliverables: ["Custom Vector Indexing", "Enterprise SLA Architecture", "Automated Compliance Auditing"]
  }
};

type CaseKey = keyof typeof CASE_STUDIES;

export default function VcrownApp() {
  // Preloader State
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Video Background Controls State
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isVideoDimmed, setIsVideoDimmed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Mobile Menu State
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // Case Study Modal State
  const [activeModal, setActiveModal] = useState<CaseKey | null>(null);

  // Work Filter State
  const [workFilter, setWorkFilter] = useState('all');

  // Estimator Form State
  const [scopeCost, setScopeCost] = useState(3500);
  const [selectedAddons, setSelectedAddons] = useState<number[]>([]);
  const [speedMultiplier, setSpeedMultiplier] = useState(2);
  const [briefText, setBriefText] = useState('');

  // Contact Form State
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Footer year (set after mount so the prerender doesn't freeze the date)
  const [year, setYear] = useState(2026);
  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  // Simulated Preloader Progress
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 10;
      });
    }, 60);
    return () => clearInterval(interval);
  }, []);

  // Video Controls Handler
  const toggleVideoPlay = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  // Addon Toggle Handler
  const toggleAddon = (cost: number) => {
    setSelectedAddons((prev) =>
      prev.includes(cost) ? prev.filter((item) => item !== cost) : [...prev, cost]
    );
  };

  // Compute Total Estimate
  const addonsTotal = selectedAddons.reduce((acc, curr) => acc + curr, 0);
  const baseEstimate = scopeCost + addonsTotal;
  const timeEstimate = speedMultiplier === 1 ? '3 - 4 Weeks (Rush)' : speedMultiplier === 2 ? '6 - 8 Weeks (Standard)' : '10 - 12 Weeks (Phased)';
  const totalEstimate = speedMultiplier === 1 ? Math.round(baseEstimate * 1.3) : baseEstimate;

  const applyEstimateToForm = () => {
    setBriefText(`[Estimated Budget: $${totalEstimate.toLocaleString()} | Timeline: ${timeEstimate}] - Describe additional requirements here...`);
    const contactElem = document.getElementById('contact');
    if (contactElem) contactElem.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  return (
    <div className="bg-[#08090E] text-slate-50 font-sans min-h-screen relative overflow-x-hidden selection:bg-purple-600 selection:text-white">
      
      {/* 1. DYNAMIC PRELOADER OVERLAY */}
      {isLoading && (
        <div className={`fixed inset-0 z-[100] bg-[#08090E] flex flex-col items-center justify-center transition-opacity duration-700 ease-out ${loadingProgress === 100 ? 'opacity-0' : 'opacity-100'}`}>
          <div className="relative w-24 h-24 flex items-center justify-center mb-6">
            <div className="absolute inset-0 rounded-full border border-purple-500/30 animate-ping"></div>
            <div className="absolute inset-2 rounded-full border border-purple-400/20 animate-spin" style={{ animationDuration: '4s' }}></div>
            <VcrownLogo className="w-12 h-12 relative z-10 animate-pulse" />
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs font-mono tracking-widest text-purple-400 uppercase">Vcrown Technologies</span>
            <div className="flex items-center gap-3">
              <div className="w-32 h-1 bg-[#1E202E] rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-600 to-purple-400 transition-all duration-200" style={{ width: `${loadingProgress}%` }}></div>
              </div>
              <span className="text-xs font-mono text-white font-bold w-9 text-right">{loadingProgress}%</span>
            </div>
          </div>
        </div>
      )}

      {/* 2. FULLSCREEN CINEMATIC VIDEO BACKGROUND */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <video 
          ref={videoRef}
          autoPlay 
          loop 
          muted 
          playsInline 
          className={`w-full h-full object-cover transition-opacity duration-1000 ${isVideoDimmed ? 'opacity-15' : 'opacity-40'}`}
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-screens-with-data-41563-large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[#08090E]/90 via-[#08090E]/80 to-[#08090E] backdrop-blur-[2px]"></div>
      </div>

      {/* 3. FLOATING VIDEO CONTROL BADGE */}
      <div className="fixed bottom-6 right-6 z-40 bg-[#0F111A]/90 backdrop-blur-md border border-[#1E202E] px-3.5 py-2 rounded-full flex items-center gap-3 shadow-2xl">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></span>
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider hidden sm:inline">Motion BG</span>
        </div>
        <button onClick={toggleVideoPlay} title="Pause / Play Video" className="text-slate-300 hover:text-white transition-colors p-1">
          {isVideoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
        </button>
        <button onClick={() => setIsVideoDimmed(!isVideoDimmed)} title="Toggle Dimming" className="text-slate-300 hover:text-white transition-colors p-1 border-l border-[#1E202E] pl-2.5">
          <Eye className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 4. NAVBAR */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[#08090E]/80 border-b border-[#1E202E]/60">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3.5 group">
            <VcrownLogo />
            <div className="flex flex-col">
              <span className="font-extrabold text-lg tracking-tight text-white group-hover:text-purple-400 transition-colors leading-none">Vcrown</span>
              <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400 mt-1">Technologies</span>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-wider font-semibold text-slate-400">
            <a href="#services" className="hover:text-white transition-colors">Capabilities</a>
            <a href="#work" className="hover:text-white transition-colors">Selected Work</a>
            <a href="#estimator" className="hover:text-white transition-colors">Estimator</a>
            <a href="#process" className="hover:text-white transition-colors">Methodology</a>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <a href="#contact" className="px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-bold text-white bg-purple-600 hover:bg-purple-500 transition-all duration-300 shadow-lg shadow-purple-600/20">
              Start a Project
            </a>
          </div>

          <button onClick={() => setMobileNavOpen(!mobileNavOpen)} className="md:hidden text-slate-400 hover:text-white">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* MOBILE NAV DRAWER */}
      {mobileNavOpen && (
        <div className="fixed inset-x-0 top-20 bg-[#08090E]/95 backdrop-blur-xl border-b border-[#1E202E] p-6 space-y-4 z-40 md:hidden">
          <a href="#services" onClick={() => setMobileNavOpen(false)} className="block text-sm font-semibold text-slate-300 hover:text-white">Capabilities</a>
          <a href="#work" onClick={() => setMobileNavOpen(false)} className="block text-sm font-semibold text-slate-300 hover:text-white">Selected Work</a>
          <a href="#estimator" onClick={() => setMobileNavOpen(false)} className="block text-sm font-semibold text-slate-300 hover:text-white">Estimator</a>
          <a href="#process" onClick={() => setMobileNavOpen(false)} className="block text-sm font-semibold text-slate-300 hover:text-white">Methodology</a>
          <a href="#contact" onClick={() => setMobileNavOpen(false)} className="block text-center py-3 rounded-full text-xs font-bold bg-purple-600 text-white">Start a Project</a>
        </div>
      )}

      {/* 5. HERO SECTION */}
      <section className="relative pt-36 pb-24 md:pt-48 md:pb-36 z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#0F111A] border border-[#1E202E] mb-8">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Accepting Q3 / Q4 Projects</span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.08] mb-8">
              We build digital products that scale, delight, and win.
            </h1>

            <p className="text-lg sm:text-xl text-slate-400 max-w-2xl font-normal leading-relaxed mb-10">
              An independent software engineering &amp; design studio. We transform complex engineering requirements into fast web platforms, mobile apps, and scalable digital ecosystems.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a href="#contact" className="px-8 py-4 rounded-full text-sm font-bold text-white bg-purple-600 hover:bg-purple-500 transition-all duration-300 flex items-center justify-center gap-3 group shadow-xl shadow-purple-600/25">
                <span>Book Strategy Call</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#estimator" className="px-8 py-4 rounded-full text-sm font-semibold text-slate-300 bg-[#0F111A] border border-[#1E202E] hover:border-purple-500/40 hover:text-white transition-all flex items-center justify-center gap-2">
                <Calculator className="w-4 h-4 text-purple-400" />
                <span>Calculate Investment</span>
              </a>
            </div>
          </div>

          {/* Interactive Dashboard Demo Component */}
          <div className="mt-16 rounded-2xl bg-[#0F111A] p-4 sm:p-6 border border-[#1E202E] relative overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#1E202E]/60">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
                <span className="w-3 h-3 rounded-full bg-green-500/80"></span>
                <span className="text-xs font-mono text-slate-400 ml-3 hidden sm:inline">vcrown-orchestrator-v2.4.app</span>
              </div>
              <div className="flex items-center gap-3 font-mono text-xs text-slate-400">
                <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> SOC2 Compliant</span>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-purple-500/20 text-purple-300">Latency: 14ms</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <div className="p-4 rounded-xl bg-[#08090E] border border-[#1E202E]/80">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h4 className="text-xs font-mono text-slate-400 uppercase">Active Microservices</h4>
                      <p className="text-lg font-bold text-white">Production Cluster Alpha</p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Operational</span>
                  </div>
                  <div className="h-32 flex items-end gap-2 pt-4">
                    {[40, 65, 55, 80, 95, 70, 88].map((val, idx) => (
                      <div key={idx} style={{ height: `${val}%` }} className="w-full bg-purple-600/20 hover:bg-purple-600 transition-all rounded-t"></div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="p-4 rounded-xl bg-[#08090E] border border-[#1E202E]/80 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-mono text-slate-400 uppercase mb-3">Engineering Telemetry</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-300">API Speed</span>
                        <span className="font-mono text-purple-400 font-bold">99.4%</span>
                      </div>
                      <div className="w-full h-1.5 bg-[#1E202E] rounded-full overflow-hidden">
                        <div className="w-[99%] h-full bg-purple-500"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-300">Test Coverage</span>
                        <span className="font-mono text-purple-400 font-bold">98.2%</span>
                      </div>
                      <div className="w-full h-1.5 bg-[#1E202E] rounded-full overflow-hidden">
                        <div className="w-[98%] h-full bg-purple-400"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pt-4 border-t border-[#1E202E]/60 flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span>Engine Build</span>
                  <span className="text-white font-bold">v3.10.2</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 6. CAPABILITIES */}
      <section id="services" className="py-24 border-t border-[#1E202E]/50 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <span className="text-xs font-mono text-purple-400 uppercase tracking-widest block mb-2">// Capabilities</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Full-Stack Digital Engineering</h2>
            </div>
            <p className="text-slate-400 text-sm max-w-md mt-4 md:mt-0">
              We replace slow agency handoffs with unified product teams that design, architect, and ship software at startup speeds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Code, title: 'Custom Web Applications', desc: 'Modern web platforms built using Next.js, React, and TypeScript. Optimized for ultra-fast rendering, SEO, and enterprise security.', tags: ['SaaS Platforms', 'Real-time Dashboards'] },
              { icon: Smartphone, title: 'Mobile App Development', desc: 'High-performance iOS and Android applications created natively or with React Native/Flutter for smooth 60fps user experiences.', tags: ['iOS & Android Native', 'Offline-first Architectures'] },
              { icon: Layout, title: 'UI/UX & Design Systems', desc: 'Distinct visual design languages and Figma design systems built to turn visitors into buyers with modern aesthetic rigor.', tags: ['Wireframing & Research', 'Scalable Design Systems'] },
              { icon: Cpu, title: 'AI Integrations & Microservices', desc: 'Custom LLM integrations, vector database pipelines, and intelligent automated workflows built into your core products.', tags: ['OpenAI / Claude APIs', 'RAG Pipelines'] },
              { icon: Server, title: 'Cloud Engineering & DevOps', desc: 'Resilient AWS and Vercel infrastructure setup with automated continuous integration (CI/CD) and monitoring.', tags: ['Serverless & Docker', 'Zero-Downtime Deploys'] },
              { icon: Layers, title: 'MVP Velocity Sprint', desc: 'Rapid 6-week turnaround for funded founders needing a market-ready product built with clean, scalable code.', tags: ['6-Week Delivery', 'Investor Ready'] },
            ].map((srv, idx) => (
              <div key={idx} className="bg-[#0F111A] border border-[#1E202E] hover:border-purple-500/40 p-8 rounded-2xl flex flex-col justify-between transition-all">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-6">
                    <srv.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{srv.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">{srv.desc}</p>
                </div>
                <ul className="text-xs font-mono text-slate-400 space-y-2 border-t border-[#1E202E]/60 pt-4">
                  {srv.tags.map((tag, tIdx) => (
                    <li key={tIdx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                      <span>{tag}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. PORTFOLIO WORK */}
      <section id="work" className="py-24 border-t border-[#1E202E]/50 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-mono text-purple-400 uppercase tracking-widest block mb-2">// Portfolio</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Selected Engineering Work</h2>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-6 md:mt-0">
              {['all', 'web', 'mobile', 'ai'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setWorkFilter(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold capitalize transition-all ${
                    workFilter === cat
                      ? 'bg-purple-600 text-white'
                      : 'text-slate-400 bg-[#0F111A] border border-[#1E202E] hover:text-white'
                  }`}
                >
                  {cat === 'all' ? 'All Projects' : cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(CASE_STUDIES)
              .filter(([_, data]) => workFilter === 'all' || data.category.toLowerCase().includes(workFilter))
              .map(([key, item]) => (
                <div
                  key={key}
                  onClick={() => setActiveModal(key as CaseKey)}
                  className="bg-[#0F111A] border border-[#1E202E] hover:border-purple-500/40 rounded-2xl overflow-hidden group cursor-pointer transition-all"
                >
                  <div className="h-60 bg-gradient-to-tr from-[#08090E] to-[#0F111A] p-6 flex flex-col justify-between border-b border-[#1E202E]/60">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-purple-400 font-bold px-2.5 py-1 rounded bg-purple-500/10 w-max border border-purple-500/20">
                      {item.category}
                    </span>
                    <div>
                      <span className="text-xs font-mono text-emerald-400 font-bold block mb-1">{item.metric}</span>
                      <h3 className="text-2xl font-bold text-white group-hover:text-purple-400 transition-colors">{item.title}</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-slate-400 text-sm mb-4">{item.description}</p>
                    <div className="flex items-center justify-between font-mono text-xs text-slate-400 pt-4 border-t border-[#1E202E]/40">
                      <span>{item.stack.slice(0, 2).join(' • ')}</span>
                      <span className="flex items-center gap-1 text-purple-400 font-semibold">View Details <ArrowUpRight className="w-4 h-4" /></span>
                    </div>
                  </div>
                </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. INTERACTIVE ESTIMATOR */}
      <section id="estimator" className="py-24 border-t border-[#1E202E]/50 relative z-10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono text-purple-400 uppercase tracking-widest block mb-2">// Investment Calculator</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Project Scope &amp; Cost Estimator</h2>
            <p className="text-slate-400 text-sm mt-3">Configure your build options below for an instant budget calculation and delivery estimate.</p>
          </div>

          <div className="bg-[#0F111A] border border-[#1E202E] p-6 sm:p-10 rounded-3xl relative shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              <div className="lg:col-span-2 space-y-8">
                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-3">1. Primary Product Scope</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { label: 'Web SaaS / App', cost: 3500 },
                      { label: 'Mobile App (iOS/Android)', cost: 4500 },
                      { label: 'Full Enterprise Suite', cost: 7500 },
                    ].map((scope) => (
                      <button 
                        key={scope.cost}
                        type="button"
                        onClick={() => setScopeCost(scope.cost)}
                        className={`p-4 rounded-xl border text-xs font-semibold text-center transition-all ${
                          scopeCost === scope.cost 
                            ? 'border-purple-500 bg-purple-500/10 text-white' 
                            : 'border-[#1E202E] bg-[#08090E] text-slate-400 hover:text-white'
                        }`}
                      >
                        {scope.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-3">2. Architecture &amp; Modules</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { label: 'Auth & RBAC Security', cost: 1200 },
                      { label: 'Stripe Payment Engine', cost: 1800 },
                      { label: 'Custom AI Vector Model', cost: 2500 },
                      { label: 'Figma Design System', cost: 1500 },
                    ].map((addon) => (
                      <label 
                        key={addon.cost}
                        className={`flex items-center gap-3 p-3.5 rounded-xl border text-xs text-slate-300 cursor-pointer transition-all ${
                          selectedAddons.includes(addon.cost) ? 'border-purple-500 bg-purple-500/5' : 'border-[#1E202E] bg-[#08090E]'
                        }`}
                      >
                        <input 
                          type="checkbox" 
                          checked={selectedAddons.includes(addon.cost)}
                          onChange={() => toggleAddon(addon.cost)}
                          className="accent-purple-500 w-4 h-4 rounded"
                        />
                        <span>{addon.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-mono text-slate-400 uppercase tracking-wider">3. Timeline Speed</label>
                    <span className="text-xs font-mono text-purple-400 font-bold">{timeEstimate}</span>
                  </div>
                  <input 
                    type="range" 
                    min="1" 
                    max="3" 
                    value={speedMultiplier} 
                    onChange={(e) => setSpeedMultiplier(Number(e.target.value))}
                    className="w-full h-2 bg-[#1E202E] rounded-lg appearance-none cursor-pointer accent-purple-500"
                  />
                </div>
              </div>

              <div className="p-6 rounded-2xl border border-[#1E202E] bg-gradient-to-b from-[#08090E] to-[#0F111A] flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono uppercase text-slate-400 tracking-wider">Estimated Investment</span>
                  <div className="mt-4 mb-2">
                    <span className="text-4xl font-extrabold text-white">${totalEstimate.toLocaleString()}</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-2">
                    Estimated Timeline: <span className="text-white font-mono font-bold">{timeEstimate}</span>
                  </p>
                </div>

                <div className="mt-8">
                  <button 
                    onClick={applyEstimateToForm}
                    className="w-full py-3.5 rounded-xl text-xs uppercase tracking-wider font-bold text-white bg-purple-600 hover:bg-purple-500 transition-all duration-300 shadow-lg shadow-purple-600/20 flex items-center justify-center gap-2"
                  >
                    <span>Apply to Brief</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 9. METHODOLOGY / PROCESS */}
      <section id="process" className="py-24 border-t border-[#1E202E]/50 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono text-purple-400 uppercase tracking-widest block mb-2">// Our Workflow</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Engineering Process</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '01 / DISCOVERY', title: 'Technical Spec', desc: 'Defining database schemas, user stories, API contracts, and milestone timelines.' },
              { step: '02 / ARCHITECTURE', title: 'Design & Specs', desc: 'Figma design system creation alongside scalable cloud infrastructure mapping.' },
              { step: '03 / SPRINT BUILD', title: 'Agile Sprints', desc: 'Two-week code releases with automated testing and staging environments.' },
              { step: '04 / DEPLOYMENT', title: 'Launch & Scale', desc: 'Production cloud deployment, monitoring setup, and post-launch optimization.' }
            ].map((p, idx) => (
              <div key={idx} className="bg-[#0F111A] border border-[#1E202E] p-6 rounded-2xl relative">
                <span className="text-xs font-mono text-purple-400 font-bold block mb-4">{p.step}</span>
                <h3 className="text-lg font-bold text-white mb-2">{p.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. CONTACT FORM */}
      <section id="contact" className="py-24 border-t border-[#1E202E]/50 relative z-10">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-mono text-purple-400 uppercase tracking-widest block mb-2">// Contact Studio</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white">Let&apos;s build your product.</h2>
            <p className="text-slate-400 text-sm mt-3">Direct engineer responses within 24 hours.</p>
          </div>

          <div className="bg-[#0F111A] border border-[#1E202E] p-8 sm:p-12 rounded-3xl">
            {formSubmitted && (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm text-center mb-6">
                Inquiry received! A partner engineer from Vcrown Technologies will reach out shortly.
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase mb-2">Name</label>
                  <input type="text" required placeholder="Alex Rivera" className="w-full px-4 py-3.5 rounded-xl bg-[#08090E] border border-[#1E202E] text-white text-sm focus:outline-none focus:border-purple-500 transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase mb-2">Email Address</label>
                  <input type="email" required placeholder="alex@company.com" className="w-full px-4 py-3.5 rounded-xl bg-[#08090E] border border-[#1E202E] text-white text-sm focus:outline-none focus:border-purple-500 transition-colors" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase mb-2">Project Brief</label>
                <textarea 
                  rows={4} 
                  required 
                  value={briefText} 
                  onChange={(e) => setBriefText(e.target.value)} 
                  placeholder="Tell us about the project goals, tech requirements, or vision..." 
                  className="w-full px-4 py-3.5 rounded-xl bg-[#08090E] border border-[#1E202E] text-white text-sm focus:outline-none focus:border-purple-500 transition-colors"
                ></textarea>
              </div>

              <button type="submit" className="w-full py-4 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-purple-600 hover:bg-purple-500 transition-all duration-300 shadow-xl shadow-purple-600/20">
                Submit Project Inquiry
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* 11. CASE STUDY MODAL */}
      {activeModal && CASE_STUDIES[activeModal] && (
        <div className="fixed inset-0 bg-[#08090E]/90 backdrop-blur-xl z-50 flex items-center justify-center p-4">
          <div className="bg-[#0F111A] border border-[#1E202E] rounded-2xl max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl space-y-6">
            <button onClick={() => setActiveModal(null)} className="absolute top-6 right-6 text-slate-400 hover:text-white">
              <X className="w-6 h-6" />
            </button>
            <span className="text-xs font-mono text-purple-400 uppercase tracking-widest block">{CASE_STUDIES[activeModal].category}</span>
            <h3 className="text-2xl font-bold text-white">{CASE_STUDIES[activeModal].title}</h3>
            <p className="text-slate-300 text-sm leading-relaxed">{CASE_STUDIES[activeModal].description}</p>
            <div>
              <h4 className="text-xs font-mono text-slate-400 uppercase mb-2">Tech Stack</h4>
              <div className="flex flex-wrap gap-2">
                {CASE_STUDIES[activeModal].stack.map((s, i) => (
                  <span key={i} className="px-3 py-1 rounded-full text-xs font-mono bg-[#08090E] border border-[#1E202E] text-slate-300">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 12. FOOTER */}
      <footer className="border-t border-[#1E202E]/60 py-12 bg-[#08090E] text-slate-400 text-xs font-mono relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <VcrownLogo className="w-6 h-6" />
            <span className="text-white font-sans font-bold">Vcrown Technologies</span>
          </div>
          <p>© {year} Vcrown Technologies. Designed for scale.</p>
        </div>
      </footer>

    </div>
  );
}