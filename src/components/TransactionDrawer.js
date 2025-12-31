"use client";
import { useState, useEffect } from "react";
import { X, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
  { id: "food", label: "Food", icon: "🍔" },
  { id: "transport", label: "Transport", icon: "🚗" },
  { id: "shopping", label: "Shopping", icon: "🛍️" },
  { id: "utility", label: "Bills", icon: "💡" },
  { id: "income", label: "Salary/Gift", icon: "💰" },
  { id: "others", label: "Others", icon: "🧩" },
];

export default function TransactionDrawer({ isOpen, onClose, type, onSave }) {
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(type === "income" ? "income" : "food");

  // ড্রয়ার খুললে ফিল্ড রিসেট হবে
  useEffect(() => {
    if (isOpen) {
      setAmount("");
      setNote("");
      setSelectedCategory(type === "income" ? "income" : "food");
    }
  }, [isOpen, type]);

  const handleSubmit = () => {
    if (!amount) return;
    onSave({
      id: Date.now(),
      amount: parseFloat(amount),
      type, // 'income' or 'expense'
      category: selectedCategory,
      note: note || (type === "income" ? "Income" : "Expense"),
      date: new Date().toISOString(),
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Background Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-60 backdrop-blur-sm"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 rounded-t-3xl z-60 p-6 pb-10"
          >
            {/* Handle Bar */}
            <div className="w-12 h-1.5 bg-slate-700 rounded-full mx-auto mb-6" />

            <div className="flex justify-between items-center mb-6">
              <h2 className={`text-xl font-bold ${type === 'income' ? 'text-emerald-400' : 'text-red-400'}`}>
                Add {type === "income" ? "Income" : "Expense"}
              </h2>
              <button onClick={onClose} className="p-2 bg-slate-800 rounded-full text-slate-400">
                <X size={20} />
              </button>
            </div>

            {/* Amount Input */}
            <div className="mb-6">
              <label className="text-slate-500 text-xs uppercase font-bold tracking-wider mb-2 block">Amount</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-slate-400 font-bold">৳</span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0"
                  autoFocus
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-3xl font-bold text-white focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-700"
                />
              </div>
            </div>

            {/* Category Selection (Only for Expense) */}
            {type === "expense" && (
              <div className="mb-6">
                <label className="text-slate-500 text-xs uppercase font-bold tracking-wider mb-3 block">Category</label>
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                  {categories.filter(c => c.id !== 'income').map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`flex flex-col items-center gap-2 p-3 rounded-xl min-w-[80px] border transition-all ${
                        selectedCategory === cat.id
                          ? "bg-blue-600/20 border-blue-500 text-blue-400"
                          : "bg-slate-950 border-slate-800 text-slate-400"
                      }`}
                    >
                      <span className="text-2xl">{cat.icon}</span>
                      <span className="text-xs font-medium">{cat.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Note Input */}
            <div className="mb-8">
              <label className="text-slate-500 text-xs uppercase font-bold tracking-wider mb-2 block">Note (Optional)</label>
              <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="What is this for?"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-slate-300 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Save Button */}
            <button
              onClick={handleSubmit}
              className={`w-full py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all ${
                type === 'income' 
                ? 'bg-emerald-500 hover:bg-emerald-600 text-emerald-950 shadow-emerald-500/20' 
                : 'bg-red-500 hover:bg-red-600 text-white shadow-red-500/20'
              }`}
            >
              <Check size={20} />
              Confirm Transaction
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}