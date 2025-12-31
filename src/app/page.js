import { Bell, Plus } from "lucide-react";

export default function Home() {
  // ডামি ডাটা (পরে ডাটাবেস থেকে আসবে)
  const currentBalance = "12,450";
  const todayDate = new Date().toLocaleDateString("en-US", { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <div className="min-h-screen px-5 pt-8">
      
      {/* 1. Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">Good Morning</p>
          <h1 className="text-xl font-bold text-white mt-1">My Life OS</h1>
        </div>
        <button className="h-10 w-10 bg-slate-900 border border-slate-800 rounded-full flex items-center justify-center active:scale-95 transition-transform">
          <Bell size={18} className="text-slate-300" />
        </button>
      </div>

      {/* 2. Main Wallet Card (Hero) */}
      <div className="relative w-full h-40 rounded-3xl bg-gradient-to-br from-blue-600 to-violet-700 p-6 flex flex-col justify-between shadow-2xl shadow-blue-900/30 overflow-hidden mb-6">
        {/* Background Design Element */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-10 translate-x-10 pointer-events-none"></div>
        
        <div>
          <p className="text-blue-100/80 text-sm font-medium">Total Balance</p>
          <h2 className="text-3xl font-bold text-white mt-1">৳ {currentBalance}</h2>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-xs text-white font-medium">
            Daily Limit: ৳500
          </div>
        </div>
      </div>

      {/* 3. Quick Actions */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <button className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-col items-center justify-center gap-2 active:scale-95 transition-all hover:border-emerald-500/50 group">
          <div className="h-10 w-10 bg-emerald-500/10 rounded-full flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
            <Plus size={20} className="text-emerald-500" />
          </div>
          <span className="text-sm font-medium text-slate-300">Add Income</span>
        </button>

        <button className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-col items-center justify-center gap-2 active:scale-95 transition-all hover:border-red-500/50 group">
          <div className="h-10 w-10 bg-red-500/10 rounded-full flex items-center justify-center group-hover:bg-red-500/20 transition-colors">
            <Plus size={20} className="text-red-500" />
          </div>
          <span className="text-sm font-medium text-slate-300">Add Expense</span>
        </button>
      </div>

      {/* 4. Today's Overview Section */}
      <div>
        <div className="flex justify-between items-end mb-4">
          <h3 className="text-lg font-semibold text-white">Today's Focus</h3>
          <span className="text-xs text-slate-500">{todayDate}</span>
        </div>

        {/* Empty State / Task List */}
        <div className="space-y-3">
          {/* Task Item 1 */}
          <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl flex items-center gap-4 active:scale-[0.98] transition-transform">
            <div className="h-5 w-5 rounded-md border-2 border-slate-600" /> {/* Checkbox placeholder */}
            <p className="text-slate-300 text-sm">Finish the PWA project setup</p>
          </div>
          
          {/* Task Item 2 */}
          <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl flex items-center gap-4 active:scale-[0.98] transition-transform">
            <div className="h-5 w-5 rounded-md border-2 border-slate-600" />
            <p className="text-slate-300 text-sm">Grocery shopping for home</p>
          </div>
        </div>
      </div>

    </div>
  );
}