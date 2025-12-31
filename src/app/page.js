"use client";
import { useState, useEffect } from "react";
import { Bell, Plus, TrendingUp, TrendingDown, History, CheckCircle2, Circle, ArrowRight } from "lucide-react";
import TransactionDrawer from "@/components/TransactionDrawer";
import Link from "next/link";

export default function Home() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [transactionType, setTransactionType] = useState("expense");
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  
  // NEW: Tasks State
  const [tasks, setTasks] = useState([]);

  // Load ALL Data
  useEffect(() => {
    loadTransactions();
    loadTasks();

    // Listen for updates from other pages
    window.addEventListener("storage", loadTasks);
    return () => window.removeEventListener("storage", loadTasks);
  }, []);

  const loadTransactions = () => {
    const savedData = localStorage.getItem("nexus_transactions");
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setTransactions(parsed);
      calculateBalance(parsed);
    }
  };

  const loadTasks = () => {
    const savedTasks = localStorage.getItem("nexus_focus_tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  };

  const calculateBalance = (data) => {
    let totalIncome = 0;
    let totalExpense = 0;
    data.forEach(t => {
      if (t.type === "income") totalIncome += t.amount;
      else totalExpense += t.amount;
    });
    setIncome(totalIncome);
    setExpense(totalExpense);
    setBalance(totalIncome - totalExpense);
  };

  const handleAddTransaction = (newTransaction) => {
    const updatedTransactions = [newTransaction, ...transactions];
    setTransactions(updatedTransactions);
    calculateBalance(updatedTransactions);
    localStorage.setItem("nexus_transactions", JSON.stringify(updatedTransactions));
  };

  // Toggle Task directly from Home
  const toggleTaskFromHome = (id) => {
    const updatedTasks = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
    setTasks(updatedTasks);
    localStorage.setItem("nexus_focus_tasks", JSON.stringify(updatedTasks));
  };

  return (
    <div className="min-h-screen px-5 pt-8 pb-32">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">Good Morning</p>
          <h1 className="text-xl font-bold text-white mt-1">Nexus OS</h1>
        </div>
        <button className="h-10 w-10 bg-slate-900 border border-slate-800 rounded-full flex items-center justify-center active:scale-95 transition-transform">
          <Bell size={18} className="text-slate-300" />
        </button>
      </div>

      {/* Wallet Card */}
      <div className="relative w-full rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 p-6 shadow-2xl shadow-blue-900/30 overflow-hidden mb-8">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-10 translate-x-10 pointer-events-none"></div>
        <div className="relative z-10">
          <p className="text-blue-100/80 text-xs font-bold uppercase tracking-widest">Total Net Worth</p>
          <h2 className="text-4xl font-bold text-white mt-2">৳ {balance.toLocaleString()}</h2>
          <div className="flex gap-4 mt-6">
            <div className="flex items-center gap-2 bg-black/20 px-3 py-1.5 rounded-lg border border-white/5">
              <TrendingUp size={14} className="text-emerald-300" />
              <span className="text-xs text-emerald-100 font-medium">+৳{income.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-2 bg-black/20 px-3 py-1.5 rounded-lg border border-white/5">
              <TrendingDown size={14} className="text-rose-300" />
              <span className="text-xs text-rose-100 font-medium">-৳{expense.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <button 
          onClick={() => { setTransactionType('income'); setIsDrawerOpen(true); }}
          className="bg-slate-900/50 border border-slate-800 hover:border-emerald-500/30 p-4 rounded-2xl flex items-center gap-3 transition-all group"
        >
          <div className="h-10 w-10 bg-emerald-500/10 rounded-full flex items-center justify-center group-hover:bg-emerald-500/20 text-emerald-500">
            <Plus size={20} />
          </div>
          <span className="text-sm font-medium text-slate-300">Income</span>
        </button>

        <button 
          onClick={() => { setTransactionType('expense'); setIsDrawerOpen(true); }}
          className="bg-slate-900/50 border border-slate-800 hover:border-rose-500/30 p-4 rounded-2xl flex items-center gap-3 transition-all group"
        >
          <div className="h-10 w-10 bg-rose-500/10 rounded-full flex items-center justify-center group-hover:bg-rose-500/20 text-rose-500">
            <Plus size={20} />
          </div>
          <span className="text-sm font-medium text-slate-300">Expense</span>
        </button>
      </div>

      {/* Today's Focus Section (Real Data Linkup) */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-white">Priority Tasks</h3>
          <Link href="/focus" className="text-xs text-blue-400 flex items-center gap-1">
            Manage <ArrowRight size={12} />
          </Link>
        </div>

        <div className="space-y-3">
          {tasks.filter(t => t.text).length === 0 ? (
            <Link href="/focus" className="block bg-slate-900 border border-slate-800 border-dashed rounded-2xl p-6 text-center text-slate-500 text-sm hover:border-blue-500/50 hover:text-blue-400 transition-colors">
              + Set your goals for today
            </Link>
          ) : (
            tasks.filter(t => t.text).slice(0, 3).map((task) => (
              <div 
                key={task.id} 
                onClick={() => toggleTaskFromHome(task.id)}
                className={`p-4 rounded-2xl border flex items-center gap-4 cursor-pointer transition-all active:scale-[0.98] ${
                  task.completed 
                  ? "bg-slate-900/30 border-slate-800/50 opacity-60" 
                  : "bg-slate-900 border-slate-800 hover:border-slate-700"
                }`}
              >
                {task.completed ? (
                  <CheckCircle2 size={22} className="text-emerald-500 shrink-0" />
                ) : (
                  <Circle size={22} className="text-slate-600 shrink-0" />
                )}
                <span className={`text-sm font-medium truncate ${task.completed ? "text-slate-500 line-through" : "text-slate-200"}`}>
                  {task.text}
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Recent Transactions (Short List) */}
      <div>
        <h3 className="text-lg font-bold text-white mb-4">Recent Money Flow</h3>
        <div className="space-y-3">
          {transactions.length === 0 ? (
            <p className="text-slate-600 text-sm">No transactions recorded yet.</p>
          ) : (
            transactions.slice(0, 3).map((t) => (
              <div key={t.id} className="bg-slate-900/50 border border-slate-800 p-4 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center text-lg ${
                    t.type === 'income' ? 'bg-emerald-500/10' : 'bg-rose-500/10'
                  }`}>
                    {t.category === 'food' ? '🍔' : 
                     t.category === 'transport' ? '🚗' : 
                     t.category === 'shopping' ? '🛍️' : 
                     t.type === 'income' ? '💰' : '📄'}
                  </div>
                  <div>
                    <p className="text-slate-200 font-medium text-sm">{t.note}</p>
                    <p className="text-slate-500 text-[10px] capitalize">{new Date(t.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                  </div>
                </div>
                <span className={`font-bold text-sm ${t.type === 'income' ? 'text-emerald-400' : 'text-slate-300'}`}>
                  {t.type === 'income' ? '+' : '-'} ৳{t.amount}
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      <TransactionDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)}
        type={transactionType}
        onSave={handleAddTransaction}
      />
    </div>
  );
}