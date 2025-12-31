"use client";
import { useState, useEffect } from "react";
import { Plus, Trash2, CheckCircle2, Circle, StickyNote, Save } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FocusPage() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "", completed: false, placeholder: "Top Priority (Most Important)" },
    { id: 2, text: "", completed: false, placeholder: "Second Priority" },
    { id: 3, text: "", completed: false, placeholder: "Something else..." },
  ]);

  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

  // Load Data
  useEffect(() => {
    const savedTasks = localStorage.getItem("nexus_focus_tasks");
    const savedNotes = localStorage.getItem("nexus_notes");
    
    if (savedTasks) setTasks(JSON.parse(savedTasks));
    if (savedNotes) setNotes(JSON.parse(savedNotes));
  }, []);

  // Save Data
  const saveData = (newTasks, newNotes) => {
    if (newTasks) {
      setTasks(newTasks);
      localStorage.setItem("nexus_focus_tasks", JSON.stringify(newTasks));
    }
    if (newNotes) {
      setNotes(newNotes);
      localStorage.setItem("nexus_notes", JSON.stringify(newNotes));
    }
  };

  // Handle Task Input
  const updateTask = (id, text) => {
    const updated = tasks.map(t => t.id === id ? { ...t, text } : t);
    saveData(updated, null);
  };

  // Toggle Task Completion
  const toggleTask = (id) => {
    const updated = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
    saveData(updated, null);
  };

  // Add Brain Dump Note
  const addNote = () => {
    if (!newNote.trim()) return;
    const updatedNotes = [{ id: Date.now(), text: newNote, date: new Date().toLocaleTimeString() }, ...notes];
    saveData(null, updatedNotes);
    setNewNote("");
  };

  // Delete Note
  const deleteNote = (id) => {
    const updatedNotes = notes.filter(n => n.id !== id);
    saveData(null, updatedNotes);
  };

  return (
    <div className="min-h-screen px-5 pt-8 pb-32">
      
      {/* Header */}
      <div className="mb-8">
        <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">Daily Plan</p>
        <h1 className="text-2xl font-bold text-white mt-1">Focus & Notes</h1>
      </div>

      {/* 1. The "Sticky Note" (Today's Priorities) */}
      <div className="bg-gradient-to-br from-amber-100 to-amber-200 rounded-3xl p-6 shadow-xl shadow-amber-900/10 mb-8 relative overflow-hidden">
        {/* Decorative Tape */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-8 bg-white/30 backdrop-blur-md rotate-[-2deg] -mt-4 shadow-sm"></div>

        <h2 className="text-amber-900/70 text-sm font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
          <StickyNote size={16} /> Today's Top 3
        </h2>

        <div className="space-y-4">
          {tasks.map((task) => (
            <div key={task.id} className="flex items-center gap-3">
              <button onClick={() => toggleTask(task.id)} className="shrink-0 transition-transform active:scale-90">
                {task.completed ? (
                  <CheckCircle2 size={24} className="text-amber-700" />
                ) : (
                  <Circle size={24} className="text-amber-900/40" />
                )}
              </button>
              
              <input
                type="text"
                value={task.text}
                onChange={(e) => updateTask(task.id, e.target.value)}
                placeholder={task.placeholder}
                className={`w-full bg-transparent border-b border-amber-900/10 py-1 text-amber-950 placeholder:text-amber-800/40 focus:outline-none focus:border-amber-800/50 transition-all ${
                  task.completed ? "line-through text-amber-900/50" : "font-medium"
                }`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* 2. Brain Dump / Quick Notes */}
      <div>
        <h2 className="text-white text-lg font-bold mb-4 flex items-center gap-2">
          🧠 Brain Dump
        </h2>

        {/* Note Input */}
        <div className="relative mb-6">
          <input
            type="text"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Quick thought, idea, or reminder..."
            className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-4 pl-4 pr-12 text-slate-200 focus:outline-none focus:border-blue-500/50 transition-all"
            onKeyDown={(e) => e.key === 'Enter' && addNote()}
          />
          <button 
            onClick={addNote}
            className="absolute right-2 top-2 bottom-2 bg-blue-600 w-10 rounded-xl flex items-center justify-center text-white active:scale-95 transition-transform"
          >
            <Plus size={20} />
          </button>
        </div>

        {/* Notes List */}
        <div className="grid gap-3">
          <AnimatePresence>
            {notes.length === 0 ? (
              <p className="text-slate-600 text-center text-sm py-4">No notes yet. Clear your mind!</p>
            ) : (
              notes.map((note) => (
                <motion.div
                  key={note.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-slate-900/50 border border-slate-800 p-4 rounded-2xl flex justify-between items-start group"
                >
                  <div>
                    <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">{note.text}</p>
                    <p className="text-slate-600 text-[10px] mt-2">{note.date}</p>
                  </div>
                  <button 
                    onClick={() => deleteNote(note.id)}
                    className="text-slate-600 hover:text-red-400 p-1 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>

    </div>
  );
}