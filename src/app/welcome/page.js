"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, ShieldCheck } from "lucide-react";

export default function Welcome() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-between p-8 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-blue-900/20 to-transparent pointer-events-none" />

      {/* 1. Logo Section */}
      <div className="flex-1 flex flex-col items-center justify-center z-10">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="h-24 w-24 bg-slate-900 border border-slate-800 rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-500/20 mb-8"
        >
          <span className="text-5xl">🌌</span>
        </motion.div>

        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-bold text-white mb-2 tracking-tight"
        >
          Nexus OS
        </motion.h1>
        
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-slate-400 text-sm tracking-widest uppercase"
        >
          Your Life. Optimized.
        </motion.p>
      </div>

      {/* 2. Action Button */}
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="w-full z-10"
      >
        <Link href="/">
          <button className="group w-full bg-white text-slate-950 h-16 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 active:scale-95 transition-all shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]">
            Initialize System
            <ChevronRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </Link>
        
        <div className="flex items-center justify-center gap-2 mt-6 text-slate-600 text-[10px] uppercase tracking-wider">
          <ShieldCheck size={12} />
          <span>Secure & Local Encrypted</span>
        </div>
      </motion.div>
    </div>
  );
}