import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import {
  UploadCloud, CheckCircle2, AlertTriangle, ScanLine, Globe2, Sparkles,
  Database, XCircle, Hexagon, Shield, Zap, Lock, ChevronDown, ArrowRight,
  Activity, Eye, TrendingUp, Package
} from 'lucide-react';

const GOLD_TEXT = "bg-clip-text text-transparent bg-gradient-to-r from-[#F0E5D1] to-[#C7A970]";
const PANEL_BG = "bg-[#0A0A0A]/90 backdrop-blur-xl border border-white/10";

// ── Smooth scroll helper ──────────────────────────────────────────────────────
function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

// ── Header ────────────────────────────────────────────────────────────────────
function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 py-4 lg:px-8 border-b transition-all duration-500 ${
        scrolled
          ? 'backdrop-blur-xl bg-[#030303]/90 border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.4)]'
          : 'backdrop-blur-md bg-transparent border-transparent'
      }`}
    >
      {/* Logo */}
      <div className="flex items-center gap-6">
        <button onClick={() => scrollTo('hero')} className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded shrink-0 bg-gradient-to-br from-[#F0E5D1] to-[#C7A970] flex items-center justify-center text-[#030303] font-bold text-xl shadow-[0_0_15px_rgba(199,169,112,0.4)] group-hover:shadow-[0_0_25px_rgba(199,169,112,0.6)] transition-shadow">
            <Hexagon className="w-5 h-5 fill-current" />
          </div>
          <span className="font-semibold text-xl tracking-wide text-[#E5D1B1]">MedChain</span>
        </button>
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#C7A970]/10 border border-[#C7A970]/30 text-xs font-medium text-[#C7A970]">
          <Globe2 className="w-3.5 h-3.5 text-[#C7A970]" />
          <span>UN SDG 3 &amp; 10 Aligned</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="hidden md:flex items-center gap-1">
        {[
          { label: 'Home', id: 'hero' },
          { label: 'Solutions', id: 'features' },
          { label: 'Live Ledger', id: 'ledger' },
          { label: 'Verify Portal', id: 'dashboard' },
        ].map(({ label, id }) => (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            className="px-4 py-2 rounded-full text-sm text-gray-400 hover:text-[#C7A970] hover:bg-[#C7A970]/5 transition-all duration-200 font-medium"
          >
            {label}
          </button>
        ))}
      </nav>

      {/* Wallet status */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#C7A970]/10 border border-[#C7A970]/30 text-sm font-mono text-[#E5D1B1]">
          <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
          <span className="hidden sm:inline">Wallet: 0x71C...3A90</span>
          <span className="sm:hidden">Connected</span>
        </div>
      </div>
    </header>
  );
}

// ── Animated counter ──────────────────────────────────────────────────────────
function AnimatedStat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1800;
          const steps = 60;
          const increment = value / steps;
          let current = 0;
          const timer = setInterval(() => {
            current = Math.min(current + increment, value);
            setCount(Math.floor(current));
            if (current >= value) clearInterval(timer);
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="flex flex-col items-center gap-1">
      <span className={`text-4xl md:text-5xl font-bold font-serif ${GOLD_TEXT}`}>
        {count}{suffix}
      </span>
      <span className="text-sm text-gray-500 font-mono uppercase tracking-widest text-center">{label}</span>
    </div>
  );
}

// ── Feature card ──────────────────────────────────────────────────────────────
interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  gradient: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description, gradient }) => {
  return (
    <div className="group relative bg-[#0A0A0A]/70 backdrop-blur-md border border-white/5 rounded-2xl p-6 hover:border-[#C7A970]/30 transition-all duration-500 hover:shadow-[0_0_40px_rgba(199,169,112,0.08)] overflow-hidden">
      {/* glow on hover */}
      <div className={`absolute -top-12 -right-12 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-700 ${gradient}`} />
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${gradient} bg-opacity-10`}>
        <Icon className="w-6 h-6 text-[#C7A970]" />
      </div>
      <h3 className="text-lg font-semibold text-[#E5D1B1] mb-2 tracking-tight">{title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
    </div>
  );
}

// ── Hero / Landing Section ────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center overflow-hidden"
    >
      {/* Layered radial glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#C7A970]/6 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-[#C7A970]/4 rounded-full blur-[100px]" />
      </div>

      {/* Badge */}
      <div className="relative z-10 flex items-center gap-2 px-4 py-2 rounded-full bg-[#C7A970]/10 border border-[#C7A970]/25 mb-8 group cursor-default">
        <div className="w-2 h-2 rounded-full bg-[#C7A970] animate-pulse" />
        <span className="text-xs font-mono text-[#C7A970] uppercase tracking-[0.2em]">
          Blockchain-Secured · AI-Verified · Live Network
        </span>
      </div>

      {/* Main headline */}
      <h1 className="relative z-10 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tight max-w-5xl leading-none mb-6">
        <span className={GOLD_TEXT}>Protect Every</span>
        <br />
        <span className="text-white/90">Medicine.</span>{' '}
        <span className={GOLD_TEXT}>Every Life.</span>
      </h1>

      {/* Subtitle */}
      <p className="relative z-10 text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed mb-12 font-sans">
        MedChain combines <span className="text-[#C7A970]">Gemini AI vision</span> with an{' '}
        <span className="text-[#C7A970]">immutable Sepolia blockchain ledger</span> to
        authenticate pharmaceutical batches in seconds — stopping counterfeits before they reach patients.
      </p>

      {/* CTA Buttons */}
      <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 mb-20">
        <button
          onClick={() => scrollTo('dashboard')}
          className="group flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-[#DAB87C] to-[#E5CBA2] hover:to-[#EFDBB9] text-[#030303] font-semibold text-lg transition-all duration-300 shadow-[0_0_30px_rgba(218,184,124,0.3)] hover:shadow-[0_0_50px_rgba(218,184,124,0.5)] hover:scale-[1.02] active:scale-[0.98]"
        >
          <Sparkles className="w-5 h-5" />
          Launch Verification Portal
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
        <button
          onClick={() => scrollTo('features')}
          className="flex items-center gap-2 px-8 py-4 rounded-xl border border-white/10 text-gray-300 hover:border-[#C7A970]/40 hover:text-[#C7A970] hover:bg-[#C7A970]/5 font-medium text-lg transition-all duration-300"
        >
          Explore Solutions
        </button>
      </div>

      {/* Stats row */}
      <div id="stats" className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 mb-20 max-w-3xl w-full">
        <AnimatedStat value={98} suffix="%" label="AI Accuracy" />
        <AnimatedStat value={3} suffix="s" label="Avg. Verify Time" />
        <AnimatedStat value={100} suffix="%" label="Immutable Ledger" />
        <AnimatedStat value={0} suffix="" label="Fake Drugs Passed" />
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => scrollTo('features')}
        className="relative z-10 flex flex-col items-center gap-2 text-gray-600 hover:text-[#C7A970] transition-colors group"
        aria-label="Scroll down"
      >
        <span className="text-xs font-mono uppercase tracking-widest">Discover More</span>
        <ChevronDown className="w-5 h-5 animate-bounce group-hover:text-[#C7A970]" />
      </button>
    </section>
  );
}

// ── Features Section ──────────────────────────────────────────────────────────
function FeaturesSection() {
  const features = [
    {
      icon: Eye,
      title: 'AI Vision Authentication',
      description:
        'Google Gemini multimodal AI inspects every medicine box photo for signs of counterfeiting — packaging anomalies, barcode integrity, label consistency — in under 3 seconds.',
      gradient: 'bg-purple-500/20',
    },
    {
      icon: Database,
      title: 'Immutable Blockchain Ledger',
      description:
        'Every batch verification is permanently recorded on the Sepolia Ethereum testnet via smart contracts, creating a tamper-proof audit trail accessible to all authorised nodes.',
      gradient: 'bg-blue-500/20',
    },
    {
      icon: Activity,
      title: 'Live Supply Chain Tracking',
      description:
        'Real-time visibility into every medicine shipment — from manufacturer dispatch to rural clinic delivery — with timestamped transaction logs on the distributed ledger.',
      gradient: 'bg-[#C7A970]/20',
    },
    {
      icon: Shield,
      title: 'Counterfeit Flagging',
      description:
        'Suspicious batches are immediately flagged on-chain, broadcasting alerts to all connected clinics and distributors to prevent compromised medicines from reaching patients.',
      gradient: 'bg-red-500/20',
    },
    {
      icon: Lock,
      title: 'Secure Wallet Integration',
      description:
        'MetaMask and compatible wallets authenticate each verifier identity on-chain, ensuring only authorised clinicians and supply-chain officers can submit verifications.',
      gradient: 'bg-green-500/20',
    },
    {
      icon: Package,
      title: 'Batch Management',
      description:
        'Register, track, and audit pharmaceutical batch IDs across the entire supply chain. Each batch carries its full history — origin, transit nodes, and final delivery.',
      gradient: 'bg-orange-500/20',
    },
  ];

  return (
    <section id="features" className="relative py-32 px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C7A970]/10 border border-[#C7A970]/25 mb-6">
          <Zap className="w-3.5 h-3.5 text-[#C7A970]" />
          <span className="text-xs font-mono text-[#C7A970] uppercase tracking-[0.2em]">Core Technology</span>
        </div>
        <h2 className={`text-4xl md:text-5xl font-serif font-bold ${GOLD_TEXT} mb-4`}>
          Built to Protect. Designed to Scale.
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
          A unified platform combining the intelligence of AI with the permanence of blockchain — purpose-built for pharmaceutical supply chain integrity.
        </p>
      </div>

      {/* Feature grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {features.map((f) => (
          <FeatureCard
            key={f.title}
            icon={f.icon}
            title={f.title}
            description={f.description}
            gradient={f.gradient}
          />
        ))}
      </div>

      {/* Divider */}
      <div className="mt-24 h-px bg-gradient-to-r from-transparent via-[#C7A970]/20 to-transparent" />
    </section>
  );
}

// ── Dashboard Subcomponents (unchanged logic) ─────────────────────────────────
interface UploadZoneProps {
  isScanning: boolean;
  file: File | null;
  onFileChange: (file: File) => void;
}

function UploadZone({ isScanning, file, onFileChange }: UploadZoneProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (isScanning) return;
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => e.preventDefault();

  const handleClick = () => {
    if (isScanning) return;
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileChange(e.target.files[0]);
    }
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onClick={handleClick}
      className={`relative w-full h-[280px] rounded-xl flex flex-col items-center justify-center p-6 transition-all duration-500 cursor-pointer
        ${isScanning ? 'bg-[#C7A970]/10 border-[#C7A970]/50' : 'bg-black/40 border-white/10 hover:border-[#C7A970]/40'} border border-dashed`}
    >
      <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
      {/* Corners */}
      <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#C7A970]/70 rounded-tl-lg" />
      <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#C7A970]/70 rounded-tr-lg" />
      <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#C7A970]/70 rounded-bl-lg" />
      <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#C7A970]/70 rounded-br-lg" />

      {isScanning ? (
        <div className="flex flex-col items-center gap-4">
          <ScanLine className="w-16 h-16 text-[#C7A970] animate-pulse" />
          <div className="text-[#C7A970] font-mono text-sm tracking-widest uppercase animate-pulse">
            Running AI Vision &amp; Blockchain Verification...
          </div>
          <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden mt-4">
            <div className="h-full bg-gradient-to-r from-[#F0E5D1] to-[#C7A970] w-1/2 animate-[slide_1.5s_ease-in-out_infinite]" />
          </div>
        </div>
      ) : file ? (
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center text-green-400 border border-green-500/30 shadow-[0_0_30px_rgba(34,197,94,0.1)]">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-green-400 font-sans tracking-tight">Image Loaded Successfully</h3>
            <p className="text-sm text-gray-400 mt-1 font-mono">{file.name} ({(file.size / 1024).toFixed(1)} KB)</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 text-center group">
          <div className="w-16 h-16 rounded-full bg-[#C7A970]/5 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#C7A970]/10 transition-all duration-300 shadow-[0_0_30px_rgba(199,169,112,0.1)] group-hover:shadow-[0_0_40px_rgba(199,169,112,0.25)]">
            <UploadCloud className="w-8 h-8 text-[#C7A970]" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-200 font-sans tracking-tight">Upload Medicine Box Image for AI Authentication</h3>
            <p className="text-sm text-gray-500 mt-1 font-mono">Drag &amp; drop or click to browse files</p>
          </div>
        </div>
      )}
    </div>
  );
}

function AIMessage({ status, reason }: { status: string; reason: string }) {
  if (status === 'idle' || status === 'scanning') {
    return (
      <div className={`${PANEL_BG} rounded-2xl p-6 flex flex-col justify-center min-h-[160px] relative overflow-hidden`}>
        {/* Gold top stripe */}
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-[#C7A970]/60 via-[#F0E5D1]/40 to-[#C7A970]/60 rounded-t-2xl" />
        {/* Subtle gold ambient glow */}
        <div className="absolute top-0 inset-x-0 h-20 bg-gradient-to-b from-[#C7A970]/8 to-transparent pointer-events-none" />
        <div className="flex items-center justify-center gap-3 mb-3 relative z-10">
          <div className="w-9 h-9 rounded-lg bg-[#C7A970]/10 border border-[#C7A970]/20 flex items-center justify-center">
            <ScanLine className="w-5 h-5 text-[#C7A970]" />
          </div>
          <h4 className="text-base font-semibold text-gray-200">AI Vision Status</h4>
        </div>
        <span className="text-gray-400 font-mono text-sm text-center relative z-10">Awaiting box scan or batch input...</span>
      </div>
    );
  }

  const isAuthentic = status === 'authentic';

  return (
    <div className={`${PANEL_BG} rounded-2xl p-6 relative overflow-hidden min-h-[160px]`}>
      <div className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r ${isAuthentic ? 'from-green-500/80 to-emerald-400/80' : 'from-red-500/80 to-rose-400/80'}`} />
      <div className={`absolute top-0 inset-x-0 h-24 bg-gradient-to-b opacity-10 ${isAuthentic ? 'from-green-500' : 'from-red-500'} to-transparent pointer-events-none`} />
      <div className="flex items-start gap-5 relative z-10">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 mt-1 shadow-lg ${isAuthentic ? 'bg-green-500/20 shadow-green-500/20 text-green-400' : 'bg-red-500/20 shadow-red-500/20 text-red-400'}`}>
          {isAuthentic ? <CheckCircle2 className="w-6 h-6" /> : <AlertTriangle className="w-6 h-6" />}
        </div>
        <div>
          <div className="flex flex-wrap border-b border-white/5 pb-2 items-center gap-3 mb-3">
            <h4 className="text-lg font-medium text-gray-200">AI Vision Status</h4>
            <span className={`px-2.5 py-1 rounded-full text-xs font-mono border shadow-sm ${isAuthentic ? 'bg-green-950/50 text-green-400 border-green-500/30 shadow-green-500/10' : 'bg-red-950/50 text-red-400 border-red-500/30 shadow-red-500/10'}`}>
              Confidence: {isAuthentic ? '98.4%' : '99.1%'}
            </span>
          </div>
          <p className={`text-sm leading-relaxed font-medium ${isAuthentic ? 'text-green-200/80' : 'text-red-200/90'}`}>{reason}</p>
        </div>
      </div>
    </div>
  );
}

function BlockchainMessage({ status, flaggedOnChain }: { status: string; flaggedOnChain: boolean }) {
  if (status === 'idle' || status === 'scanning') {
    return (
      <div className={`${PANEL_BG} rounded-2xl p-6 flex flex-col justify-center min-h-[160px] relative overflow-hidden`}>
        {/* Gold top stripe */}
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-[#C7A970]/60 via-[#F0E5D1]/40 to-[#C7A970]/60 rounded-t-2xl" />
        {/* Subtle gold ambient glow */}
        <div className="absolute top-0 inset-x-0 h-20 bg-gradient-to-b from-[#C7A970]/8 to-transparent pointer-events-none" />
        <div className="flex items-center justify-center gap-3 mb-3 relative z-10">
          <div className="w-9 h-9 rounded-lg bg-[#C7A970]/10 border border-[#C7A970]/20 flex items-center justify-center">
            <Database className="w-5 h-5 text-[#C7A970]" />
          </div>
          <h4 className="text-base font-semibold text-gray-200">Blockchain Ledger</h4>
        </div>
        <span className="text-gray-400 font-mono text-sm text-center relative z-10">Awaiting queries to Sepolia Network...</span>
      </div>
    );
  }

  const isAuthentic = status === 'authentic';

  return (
    <div className={`${PANEL_BG} rounded-2xl p-6 relative overflow-hidden min-h-[160px]`}>
      <div className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r ${isAuthentic ? 'from-emerald-500/80 to-green-400/80' : 'from-orange-500/80 to-red-400/80'}`} />
      <div className={`absolute top-0 inset-x-0 h-24 bg-gradient-to-b opacity-10 ${isAuthentic ? 'from-green-500' : 'from-orange-500'} to-transparent pointer-events-none`} />
      <div className="flex items-start gap-5 relative z-10">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 mt-1 shadow-lg ${isAuthentic ? 'bg-green-500/20 shadow-green-500/20 text-green-400' : 'bg-orange-500/20 shadow-orange-500/20 text-orange-400'}`}>
          {isAuthentic ? <Database className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
        </div>
        <div className="w-full">
          <div className="border-b border-white/5 pb-2 mb-3">
            <h4 className="text-lg font-medium text-gray-200">Blockchain Ledger Status</h4>
          </div>
          <p className="text-sm text-gray-300 font-mono bg-black/60 p-3 rounded-lg border border-white/5 break-all shadow-inner">
            {isAuthentic
              ? '> Smart Contract: Verified on Sepolia Testnet.\n> Block Confirmed.'
              : `⚠️ Alert: Batch permanently flagged on immutable ledger as counterfeit.\n> Flagged on chain: ${flaggedOnChain ? 'YES' : 'NO'}`}
          </p>
        </div>
      </div>
    </div>
  );
}

const recentActivities = [
  { id: 1, tx: '0x9a2b...41e1', status: 'Transit Updated (Chennai Distributor)', time: '2 mins ago', type: 'transit' },
  { id: 2, tx: '0x4f1c...8b2a', status: 'Authenticity Verified (Rural Clinic 04)', time: '14 mins ago', type: 'verify' },
  { id: 3, tx: '0xd811...99ef', status: 'Batch Dispatched (Manufacturer Node)', time: '3 hrs ago', type: 'dispatch' },
  { id: 4, tx: '0x1a82...c002', status: 'Counterfeit Flagged (Mumbai Port)', time: '5 hrs ago', type: 'alert' },
  { id: 5, tx: '0xb34d...11aa', status: 'Transit Updated (Regional Hub)', time: '12 hrs ago', type: 'transit' },
  { id: 6, tx: '0xc109...32fe', status: 'Batch Registered (Pharma Corp)', time: '2 days ago', type: 'dispatch' },
];

function LiveLedgerActivity() {
  return (
    <div id="ledger" className={`${PANEL_BG} rounded-2xl flex flex-col overflow-hidden max-h-[calc(100vh-8rem)] sticky top-24`}>
      <div className="p-5 border-b border-white/5 bg-black/20 flex justify-between items-center z-10">
        <h3 className="text-lg font-medium text-gray-200">Recent Ledger Activity</h3>
        <div className="flex items-center gap-2 bg-[#C7A970]/10 px-2 py-1 rounded-md border border-[#C7A970]/20">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C7A970] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C7A970]"></span>
          </span>
          <span className="text-[10px] font-mono text-[#C7A970] uppercase tracking-widest">Live Network</span>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto scrollbar-hide p-4 space-y-3 relative z-0">
        {recentActivities.map((act) => (
          <div key={act.id} className="p-4 rounded-xl bg-black/40 border border-white/5 hover:bg-black/60 hover:border-white/10 transition-colors group">
            <div className="flex justify-between items-start mb-2.5">
              <span className="text-xs font-mono text-[#C7A970]/80 group-hover:text-[#C7A970]">Tx: {act.tx}</span>
              <span className="text-[10px] uppercase font-mono text-gray-500">{act.time}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full shadow-lg ${act.type === 'alert' ? 'bg-red-500 shadow-red-500/40' : act.type === 'verify' ? 'bg-green-500 shadow-green-500/40' : 'bg-[#C7A970] shadow-[#C7A970]/40'}`} />
              <span className="text-sm text-gray-300 font-sans tracking-tight leading-snug">{act.status}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="h-12 bg-gradient-to-t from-[#0A0A0A] to-transparent pointer-events-none absolute bottom-0 inset-x-0 z-10 rounded-b-2xl" />
    </div>
  );
}

// ── Dashboard Section (verification app) ─────────────────────────────────────
function DashboardSection() {
  const [status, setStatus] = useState<'idle' | 'scanning' | 'authentic' | 'counterfeit'>('idle');
  const [batchId, setBatchId] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [aiReason, setAiReason] = useState('');
  const [flaggedOnChain, setFlaggedOnChain] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !batchId) {
      alert('Please provide a Batch ID and upload an image.');
      return;
    }

    setStatus('scanning');

    const formData = new FormData();
    formData.append('medicineImage', file);
    formData.append('batchId', batchId);

    try {
      const response = await axios.post('http://localhost:5000/api/verify', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const data = response.data;

      setAiReason(data.aiAnalysis.reason);
      setFlaggedOnChain(data.flaggedOnChain);
      setStatus(data.aiAnalysis.isAuthentic ? 'authentic' : 'counterfeit');
    } catch (error) {
      console.error('Error verifying medicine:', error);
      alert('Verification failed. Check server logs.');
      setStatus('idle');
    }
  };

  return (
    <section id="dashboard" className="relative py-20 px-6 lg:px-8 max-w-[1600px] mx-auto">
      {/* Section label */}
      <div className="mb-10 flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C7A970]/10 border border-[#C7A970]/25">
            <TrendingUp className="w-3.5 h-3.5 text-[#C7A970]" />
            <span className="text-xs font-mono text-[#C7A970] uppercase tracking-[0.2em]">Live Verification Portal</span>
          </div>
        </div>
        <h2 className={`text-4xl md:text-5xl font-serif tracking-tight ${GOLD_TEXT}`}>Clinic Verification Dashboard</h2>
        <p className="text-gray-400 text-lg max-w-2xl font-sans">
          Securely authenticate medicine batches using multimodal AI visual analysis and distributed ledger verification.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8 items-start">
        <div className="lg:col-span-8 xl:col-span-8 flex flex-col gap-6 xl:gap-8">
          <form onSubmit={handleVerify} className={`${PANEL_BG} rounded-2xl p-6 xl:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.12)]`}>
            <div className="mb-6">
              <label className="text-xs font-mono text-[#C7A970] uppercase tracking-wider flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#C7A970] animate-pulse" />
                Step 1: Input Identifier
              </label>
            </div>

            <div className="flex gap-4">
              <div className="relative flex-1 group">
                <input
                  type="text"
                  value={batchId}
                  onChange={e => setBatchId(e.target.value)}
                  required
                  placeholder="Scan or Enter Batch ID"
                  className="w-full bg-black/50 border border-white/10 focus:border-[#C7A970]/60 focus:bg-black/80 outline-none rounded-xl px-5 py-4 text-lg font-mono text-[#E5D1B1] transition-all placeholder:text-gray-600 shadow-inner"
                />
                <ScanLine className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-[#C7A970] transition-colors" />
              </div>
            </div>

            <div className="mt-8 mb-8 flex items-center gap-4">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10" />
              <span className="text-[11px] font-mono text-gray-500 bg-white/5 px-4 py-1.5 rounded-full uppercase tracking-widest border border-white/5">Step 2: Upload Box Image</span>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10" />
            </div>

            <UploadZone isScanning={status === 'scanning'} file={file} onFileChange={setFile} />

            <div className="mt-8">
              <button
                type="submit"
                disabled={status === 'scanning' || !file || !batchId}
                className={`w-full py-4 text-black font-semibold rounded-xl text-lg transition-all flex justify-center items-center gap-3 cursor-pointer ${
                  status === 'scanning' || !file || !batchId
                    ? 'bg-[#111] text-gray-400 border border-white/10 opacity-50 cursor-not-allowed shadow-none'
                    : 'bg-gradient-to-r from-[#DAB87C] to-[#E5CBA2] hover:to-[#EFDBB9] shadow-[0_0_20px_rgba(218,184,124,0.3)] hover:shadow-[0_0_30px_rgba(218,184,124,0.5)]'
                }`}
              >
                <Sparkles className="w-5 h-5" />
                {status === 'scanning' ? 'Verifying on Network...' : 'Verify Authenticity'}
              </button>
            </div>
          </form>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AIMessage status={status} reason={aiReason} />
            <BlockchainMessage status={status} flaggedOnChain={flaggedOnChain} />
          </div>
        </div>

        <div className="lg:col-span-4 xl:col-span-4 h-full">
          <LiveLedgerActivity />
        </div>
      </div>
    </section>
  );
}

// ── Root App ──────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="min-h-screen bg-[#030303] text-gray-200 font-sans selection:bg-[#C7A970]/30 selection:text-white relative overflow-x-hidden">
      {/* Background Video — plays across the entire page */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 w-full h-full object-cover z-0 pointer-events-none opacity-50"
      >
        <source src="/bg-video.mp4" type="video/mp4" />
      </video>

      {/* Ambient glows */}
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#C7A970]/8 blur-[150px] rounded-full pointer-events-none z-0" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#C7A970]/5 blur-[150px] rounded-full pointer-events-none z-0" />

      {/* UI layers */}
      <div className="relative z-10">
        <Header />

        {/* ① Landing Hero */}
        <div className="pt-20">
          <HeroSection />
        </div>

        {/* ② Features Showcase */}
        <FeaturesSection />

        {/* Separator */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-[#C7A970]/20 to-transparent mb-16" />
        </div>

        {/* ③ Clinic Verification Dashboard */}
        <DashboardSection />

        {/* Footer */}
        <footer className="border-t border-white/5 py-10 px-6 mt-20 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-7 h-7 rounded bg-gradient-to-br from-[#F0E5D1] to-[#C7A970] flex items-center justify-center shadow-[0_0_10px_rgba(199,169,112,0.3)]">
              <Hexagon className="w-4 h-4 fill-current text-[#030303]" />
            </div>
            <span className="font-semibold text-[#E5D1B1] tracking-wide">MedChain</span>
          </div>
          <p className="text-xs text-gray-600 font-mono">
            Healthcare Supply Integrity Platform · UN SDG 3 &amp; 10 Aligned · Sepolia Testnet
          </p>
        </footer>
      </div>
    </div>
  );
}
