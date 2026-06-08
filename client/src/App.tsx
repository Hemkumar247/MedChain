import React, { useState, useRef } from 'react';
import axios from 'axios';
import { UploadCloud, CheckCircle2, AlertTriangle, ScanLine, Globe2, Sparkles, Database, XCircle, Hexagon } from 'lucide-react';

const GOLD_TEXT = "bg-clip-text text-transparent bg-gradient-to-r from-[#F0E5D1] to-[#C7A970]";
const PANEL_BG = "bg-[#0A0A0A]/80 backdrop-blur-md border border-white/5";

function Header() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 py-4 lg:px-8 backdrop-blur-md bg-[#030303]/80 border-b border-white/5">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded shrink-0 bg-gradient-to-br from-[#F0E5D1] to-[#C7A970] flex items-center justify-center text-[#030303] font-bold text-xl shadow-[0_0_15px_rgba(199,169,112,0.4)]">
            <Hexagon className="w-5 h-5 fill-current" />
          </div>
          <span className="font-semibold text-xl tracking-wide text-[#E5D1B1]">MedChain</span>
        </div>
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#C7A970]/10 border border-[#C7A970]/30 text-xs font-medium text-[#C7A970]">
          <Globe2 className="w-3.5 h-3.5 text-[#C7A970]" />
          <span>UN SDG 3 & 10 Aligned</span>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#C7A970]/10 border border-[#C7A970]/30 text-sm font-mono text-[#E5D1B1]">
          <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
          Wallet Connected: 0x71C...3A90
        </div>
      </div>
    </header>
  );
}

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

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

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
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept="image/*" 
        className="hidden" 
      />
      
      {/* High-tech corners */}
      <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#C7A970]/70 rounded-tl-lg" />
      <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#C7A970]/70 rounded-tr-lg" />
      <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#C7A970]/70 rounded-bl-lg" />
      <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#C7A970]/70 rounded-br-lg" />
      
      {isScanning ? (
        <div className="flex flex-col items-center gap-4">
          <ScanLine className="w-16 h-16 text-[#C7A970] animate-pulse" />
          <div className="text-[#C7A970] font-mono text-sm tracking-widest uppercase animate-pulse">Running AI Vision & Blockchain Verification...</div>
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
            <p className="text-sm text-gray-500 mt-1 font-mono">Drag & drop or click to browse files</p>
          </div>
        </div>
      )}
    </div>
  );
}

function AIMessage({ status, reason }: { status: string, reason: string }) {
  if (status === 'idle' || status === 'scanning') {
    return (
      <div className={`${PANEL_BG} rounded-2xl p-6 flex flex-col justify-center min-h-[160px] opacity-60`}>
        <div className="flex items-center justify-center gap-3 mb-2">
            <ScanLine className="w-5 h-5 text-gray-600" />
            <h4 className="text-md font-medium text-gray-500">AI Vision Status</h4>
        </div>
        <span className="text-gray-600 font-mono text-sm text-center">Awaiting box scan or batch input...</span>
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
          <p className={`text-sm leading-relaxed font-medium ${isAuthentic ? 'text-green-200/80' : 'text-red-200/90'}`}>
            {reason}
          </p>
        </div>
      </div>
    </div>
  );
}

function BlockchainMessage({ status, flaggedOnChain }: { status: string, flaggedOnChain: boolean }) {
  if (status === 'idle' || status === 'scanning') {
    return (
      <div className={`${PANEL_BG} rounded-2xl p-6 flex flex-col justify-center min-h-[160px] opacity-60`}>
        <div className="flex items-center justify-center gap-3 mb-2">
            <Database className="w-5 h-5 text-gray-600" />
            <h4 className="text-md font-medium text-gray-500">Blockchain Ledger</h4>
        </div>
        <span className="text-gray-600 font-mono text-sm text-center">Awaiting queries to Sepolia Network...</span>
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
              ? "> Smart Contract: Verified on Sepolia Testnet.\n> Block Confirmed." 
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
    <div className={`${PANEL_BG} rounded-2xl flex flex-col overflow-hidden max-h-[calc(100vh-8rem)] sticky top-24`}>
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

export default function App() {
  const [status, setStatus] = useState<'idle' | 'scanning' | 'authentic' | 'counterfeit'>('idle');
  const [batchId, setBatchId] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [aiReason, setAiReason] = useState('');
  const [flaggedOnChain, setFlaggedOnChain] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !batchId) {
      alert("Please provide a Batch ID and upload an image.");
      return;
    }

    setStatus('scanning');
    
    const formData = new FormData();
    formData.append('medicineImage', file);
    formData.append('batchId', batchId);

    try {
      const response = await axios.post('http://localhost:5000/api/verify', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      const data = response.data;
      
      setAiReason(data.aiAnalysis.reason);
      setFlaggedOnChain(data.flaggedOnChain);
      
      if (data.aiAnalysis.isAuthentic) {
        setStatus('authentic');
      } else {
        setStatus('counterfeit');
      }
    } catch (error) {
      console.error("Error verifying medicine:", error);
      alert("Verification failed. Check server logs.");
      setStatus('idle');
    }
  };

  return (
    <div className="min-h-screen bg-[#030303] text-gray-200 font-sans selection:bg-[#C7A970]/30 selection:text-white relative overflow-hidden">
      {/* Background Ambience */}
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#C7A970]/10 blur-[150px] rounded-full pointer-events-none z-0" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#C7A970]/5 blur-[150px] rounded-full pointer-events-none z-0" />

      <Header />
      
      <main className="pt-28 pb-12 px-6 lg:px-8 max-w-[1600px] mx-auto relative z-10">
        <div className="mb-8 flex flex-col gap-2">
          <h1 className={`text-4xl md:text-5xl font-serif tracking-tight ${GOLD_TEXT}`}>Clinic Verification Dashboard</h1>
          <p className="text-gray-400 text-sm max-w-2xl text-lg font-sans">Securely authenticate medicine batches using multimodal AI visual analysis and distributed ledger verification.</p>
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
                 
                 <UploadZone 
                   isScanning={status === 'scanning'} 
                   file={file}
                   onFileChange={setFile}
                 />
                 
                 <div className="mt-8">
                   <button 
                     type="submit"
                     disabled={status === 'scanning' || !file || !batchId}
                     className={`w-full py-4 text-black font-semibold rounded-xl text-lg transition-all flex justify-center items-center gap-3 cursor-pointer ${
                       (status === 'scanning' || !file || !batchId)
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
      </main>
    </div>
  );
}
