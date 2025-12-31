"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, ShieldCheck, Zap } from "lucide-react";

export default function Welcome() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-between p-8 relative overflow-hidden">
      
      {/* --- 1. Dynamic Background Effects (Aurora Glows) --- */}
      {/* Top Left Glow */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob" />
      {/* Top Right Glow */}
      <div className="absolute top-0 -right-20 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob animation-delay-2000" />
      {/* Bottom Center Glow */}
      <div className="absolute -bottom-32 left-20 w-72 h-72 bg-indigo-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob animation-delay-4000" />
      
      {/* Grid Overlay for Tech feel */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>

      {/* --- 2. Main Content Section --- */}
      <div className="flex-1 flex flex-col items-center justify-center z-10 w-full max-w-md">
        
        {/* Animated Logo Container */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="relative group mb-10"
        >
          {/* Logo Glow Ring */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-violet-600 rounded-full blur opacity-40 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
          
          <div className="relative h-28 w-28 bg-black/50 backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-center shadow-2xl">
            <Zap className="text-white w-12 h-12 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
          </div>
        </motion.div>

        {/* Text Content */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center space-y-4"
        >
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/60 tracking-tighter">
            Nexus OS
          </h1>
          <p className="text-slate-400 text-base leading-relaxed max-w-xs mx-auto">
            Orchestrate your life with <span className="text-blue-400">precision</span> and <span className="text-purple-400">clarity</span>.
          </p>
        </motion.div>
      </div>

      {/* --- 3. Bottom Action Section --- */}
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="w-full max-w-md z-10 space-y-6"
      >
        <Link href="/" className="block">
          <button className="relative w-full group overflow-hidden bg-white text-black h-16 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-95 shadow-[0_0_50px_-12px_rgba(255,255,255,0.5)]">
            
            {/* Button Shine Effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent z-20" />
            
            <span className="z-10">Initialize System</span>
            <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1 z-10" />
          </button>
        </Link>
        
        {/* Security Badge */}
        <div className="flex items-center justify-center gap-2 text-slate-500 text-xs font-medium tracking-wide border border-white/5 bg-white/5 py-2 rounded-full backdrop-blur-md">
          <ShieldCheck size={14} className="text-green-500" />
          <span>End-to-End Encrypted Environment</span>
        </div>
      </motion.div>
    </div>
  );
}