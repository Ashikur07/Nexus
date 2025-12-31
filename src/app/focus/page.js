"use client";
import { useState, useEffect } from "react";
import { Plus, Trash2, CheckCircle2, Circle, Target, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FocusPage() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "", completed: false, placeholder: "Top Priority (Most Important) 🔥" },
    { id: 2, text: "", completed: false, placeholder: "Secondary Task 🚀" },
    { id: 3, text: "", completed: false, placeholder: "Quick Win ✨" },
  ]);

  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [progress, setProgress] = useState(0);

  // Load Data
  useEffect(() => {
    const savedTasks = localStorage.getItem("nexus_focus_tasks");
    const savedNotes = localStorage.getItem("nexus_notes");
    
    if (savedTasks) {
      const parsedTasks = JSON.parse(savedTasks);
      setTasks(parsedTasks);
      calculateProgress(parsedTasks);
    }
    if (savedNotes) setNotes(JSON.parse(savedNotes));
  }, []);

  // Calculate Progress
  const calculateProgress = (currentTasks) => {
    const filledTasks = currentTasks.filter(t => t.text.trim() !== "");
    if (filledTasks.length === 0) {
      setProgress(0);
      return;
    }
    const completed = currentTasks.filter(t => t.completed && t.text.trim() !== "").length;
    const total = filledTasks.length;
    setProgress(Math.round((completed / total) * 100));
  };

  // Save Data Helper
  const saveTasks = (newTasks) => {
    setTasks(newTasks);
    calculateProgress(newTasks);
    localStorage.setItem("nexus_focus_tasks", JSON.stringify(newTasks));
    // হোম পেজকে আপডেট জানানোর জন্য ইভেন্ট ফায়ার করা হচ্ছে
    window.dispatchEvent(new Event("storage"));
  };

  const saveNotes = (newNotes) => {
    setNotes(newNotes);
    localStorage.setItem("nexus_notes", JSON.stringify(newNotes));
  };

  const updateTask = (id, text) => {
    const updated = tasks.map(t => t.id === id ? { ...t, text } : t);
    saveTasks(updated);
  };

  const toggleTask = (id) => {
    const updated = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
    saveTasks(updated);
  };

  const addNote = () => {
    if (!newNote.trim()) return;
    const updatedNotes = [{ id: Date.now(), text: newNote, date: new Date().toLocaleTimeString() }, ...notes];
    saveNotes(updatedNotes);
    setNewNote("");
  };

  const deleteNote = (id) => {
    const updatedNotes = notes.filter(n => n.id !== id);
    saveNotes(updatedNotes);
  };

  return (
    <div className="min-h-screen px-5 pt-8 pb-32">
      
      {/* Header with Progress */}
      <div className="mb-8 flex justify-between items-end">
        <div>
          <p className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-1">Daily Objectives</p>
          <h1 className="text-2xl font-bold text-white">Focus Mode</h1>
        </div>
        <div className="text-right">
          <span className="text-3xl font-bold text-white">{progress}%</span>
          <p className="text-slate-500 text-[10px] uppercase">Completed</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-slate-900 rounded-full mb-8 overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
        />
      </div>

      {/* 1. The "Glass Card" (Today's Priorities) - NEW DESIGN */}
      <div className="relative bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-3xl p-6 shadow-2xl mb-10">
        {/* Glow Effect */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

        <h2 className="text-slate-300 text-sm font-bold uppercase tracking-wider mb-5 flex items-center gap-2">
          <Target size={18} className="text-blue-400" /> Core Tasks
        </h2>

        <div className="space-y-5">
          {tasks.map((task) => (
            <div key={task.id} className="flex items-center gap-4 group">
              <button 
                onClick={() => toggleTask(task.id)} 
                className={`shrink-0 transition-all duration-300 ${task.completed ? "scale-110" : "scale-100"}`}
              >
                {task.completed ? (
                  <CheckCircle2 size={26} className="text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
                ) : (
                  <Circle size={26} className="text-slate-600 group-hover:text-blue-400 transition-colors" />
                )}
              </button>
              
              <div className="relative w-full">
                <input
                  type="text"
                  value={task.text}
                  onChange={(e) => updateTask(task.id, e.target.value)}
                  placeholder={task.placeholder}
                  className={`w-full bg-transparent border-b py-2 text-lg transition-all ${
                    task.completed 
                    ? "border-transparent text-slate-600 line-through decoration-slate-600" 
                    : "border-slate-800 text-slate-200 focus:border-blue-500 placeholder:text-slate-700"
                  } focus:outline-none`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Brain Dump - Improved UI */}
      <div>
        <h2 className="text-slate-300 text-sm font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
          <Sparkles size={16} className="text-purple-400" /> Quick Notes
        </h2>

        <div className="relative mb-6 group">
          <input
            type="text"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Capture an idea..."
            className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-4 pl-5 pr-14 text-slate-200 focus:outline-none focus:border-purple-500/50 transition-all shadow-inner"
            onKeyDown={(e) => e.key === 'Enter' && addNote()}
          />
          <button 
            onClick={addNote}
            className="absolute right-2 top-2 bottom-2 bg-slate-800 hover:bg-purple-600 hover:text-white w-10 rounded-xl flex items-center justify-center text-slate-400 transition-all active:scale-95"
          >
            <Plus size={20} />
          </button>
        </div>

        <div className="grid gap-3">
          <AnimatePresence>
            {notes.map((note) => (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-slate-900/40 border border-slate-800 p-4 rounded-2xl flex justify-between items-start"
              >
                <div>
                  <p className="text-slate-300 text-sm whitespace-pre-wrap">{note.text}</p>
                  <p className="text-slate-600 text-[10px] mt-1">{note.date}</p>
                </div>
                <button onClick={() => deleteNote(note.id)} className="text-slate-700 hover:text-red-400 transition-colors">
                  <Trash2 size={16} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}