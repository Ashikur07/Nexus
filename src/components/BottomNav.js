"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Wallet, CheckCircle2, Settings } from "lucide-react";
import { motion } from "framer-motion";

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Wallet", href: "/wallet", icon: Wallet },
    { name: "Focus", href: "/focus", icon: CheckCircle2 }, // Daily Task
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 pb-6 bg-gradient-to-t from-slate-950 via-slate-950 to-transparent">
      <div className="bg-slate-900/80 backdrop-blur-lg border border-slate-800 rounded-2xl h-16 flex items-center justify-around shadow-lg shadow-black/50">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link key={item.name} href={item.href} className="relative flex flex-col items-center justify-center w-12 h-12">
              {isActive && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 bg-blue-500/10 rounded-xl border border-blue-500/30"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <Icon
                size={24}
                className={`z-10 transition-colors duration-300 ${
                  isActive ? "text-blue-400" : "text-slate-500"
                }`}
              />
              {/* Active Dot */}
              {isActive && (
                <span className="absolute bottom-2 w-1 h-1 bg-blue-400 rounded-full shadow-[0_0_8px_rgba(96,165,250,0.8)]" />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}