"use client";
import { useState, useEffect } from "react";
import { Bell, Plus, TrendingUp, TrendingDown, History } from "lucide-react";
import TransactionDrawer from "@/components/TransactionDrawer";

export default function Home() {
  // State for Drawer
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [transactionType, setTransactionType] = useState("expense"); // 'income' or 'expense'

  // State for Data
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);

  // Load data from LocalStorage on first load
  useEffect(() => {
    const savedData = localStorage.getItem("nexus_transactions");
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setTransactions(parsed);
      calculateBalance(parsed);
    }
  }, []);

  // Calculate Totals
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

  // Add New Transaction
  const handleAddTransaction = (newTransaction) => {
    const updatedTransactions = [newTransaction, ...transactions];
    setTransactions(updatedTransactions);
    calculateBalance(updatedTransactions);
    // Save to LocalStorage
    localStorage.setItem("nexus_transactions", JSON.stringify(updatedTransactions));
  };

  // Open Drawer Function
  const openDrawer = (type) => {
    setTransactionType(type);
    setIsDrawerOpen(true);
  };

  return (
    <div className="min-h-screen px-5 pt-8 pb-32">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">Welcome Back</p>
          <h1 className="text-xl font-bold text-white mt-1">Nexus OS</h1>
        </div>
        <button className="h-10 w-10 bg-slate-900 border border-slate-800 rounded-full flex items-center justify-center active:scale-95 transition-transform">
          <Bell size={18} className="text-slate-300" />
        </button>
      </div>

      {/* Main Balance Card */}
      <div className="relative w-full rounded-3xl bg-gradient-to-br from-blue-600 to-violet-700 p-6 shadow-2xl shadow-blue-900/30 overflow-hidden mb-6">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-10 translate-x-10 pointer-events-none"></div>
        
        <div className="relative z-10">
          <p className="text-blue-100/80 text-sm font-medium">Total Balance</p>
          <h2 className="text-4xl font-bold text-white mt-2">৳ {balance.toLocaleString()}</h2>
          
          <div className="flex gap-4 mt-6">
            <div className="flex items-center gap-2 bg-black/20 px-3 py-1.5 rounded-lg">
              <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <TrendingUp size={12} className="text-emerald-400" />
              </div>
              <span className="text-xs text-emerald-100">+৳{income.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-2 bg-black/20 px-3 py-1.5 rounded-lg">
              <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center">
                <TrendingDown size={12} className="text-red-400" />
              </div>
              <span className="text-xs text-red-100">-৳{expense.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <button 
          onClick={() => openDrawer('income')}
          className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-col items-center justify-center gap-2 active:scale-95 transition-all hover:border-emerald-500/50 group"
        >
          <div className="h-10 w-10 bg-emerald-500/10 rounded-full flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
            <Plus size={20} className="text-emerald-500" />
          </div>
          <span className="text-sm font-medium text-slate-300">Add Income</span>
        </button>

        <button 
          onClick={() => openDrawer('expense')}
          className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-col items-center justify-center gap-2 active:scale-95 transition-all hover:border-red-500/50 group"
        >
          <div className="h-10 w-10 bg-red-500/10 rounded-full flex items-center justify-center group-hover:bg-red-500/20 transition-colors">
            <Plus size={20} className="text-red-500" />
          </div>
          <span className="text-sm font-medium text-slate-300">Add Expense</span>
        </button>
      </div>

      {/* Recent Transactions */}
      <div>
        <div className="flex justify-between items-end mb-4">
          <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
          <button className="text-xs text-blue-400">View All</button>
        </div>

        <div className="space-y-3">
          {transactions.length === 0 ? (
            <div className="text-center py-10 opacity-50">
              <History className="mx-auto mb-2 text-slate-600" size={32} />
              <p className="text-slate-500 text-sm">No transactions yet</p>
            </div>
          ) : (
            transactions.slice(0, 5).map((t) => (
              <div key={t.id} className="bg-slate-900/50 border border-slate-800 p-4 rounded-2xl flex items-center justify-between active:scale-[0.98] transition-transform">
                <div className="flex items-center gap-4">
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center text-xl ${
                    t.type === 'income' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'
                  }`}>
                    {t.type === 'income' ? '💰' : 
                     t.category === 'food' ? '🍔' : 
                     t.category === 'transport' ? '🚗' : 
                     t.category === 'shopping' ? '🛍️' : '🧩'}
                  </div>
                  <div>
                    <p className="text-slate-200 font-medium text-sm">{t.note}</p>
                    <p className="text-slate-500 text-xs capitalize">{t.category} • {new Date(t.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                  </div>
                </div>
                <span className={`font-bold ${t.type === 'income' ? 'text-emerald-400' : 'text-slate-200'}`}>
                  {t.type === 'income' ? '+' : '-'}৳{t.amount}
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Transaction Drawer Component */}
      <TransactionDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)}
        type={transactionType}
        onSave={handleAddTransaction}
      />

    </div>
  );
}