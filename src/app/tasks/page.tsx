"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";

const INITIAL_TASKS = [
  { id: 1, title: "Confirm Saturday viewing with Adaeze", contact: "Adaeze Okonkwo", deal: "₦45M · Lekki Duplex", due: "Today", priority: "high", done: false, avatar: "AO", avFrom: "#6366f1", avTo: "#8b5cf6" },
  { id: 2, title: "Send counter-offer to Emeka", contact: "Emeka Nwosu", deal: "₦28M · Ikeja Apt", due: "Today", priority: "high", done: false, avatar: "EN", avFrom: "#f59e0b", avTo: "#ef4444" },
  { id: 3, title: "Send service charge breakdown to Fatima", contact: "Fatima Al-Hassan", deal: "₦62M · VI Penthouse", due: "Tomorrow", priority: "medium", done: false, avatar: "FA", avFrom: "#06b6d4", avTo: "#6366f1" },
  { id: 4, title: "Follow up with Chukwudi's lawyer", contact: "Chukwudi Eze", deal: "₦18M · Ajah Terrace", due: "Tomorrow", priority: "medium", done: false, avatar: "CE", avFrom: "#ec4899", avTo: "#f43f5e" },
  { id: 5, title: "Send congratulations message to Ngozi", contact: "Ngozi Adeyemi", deal: "₦35M · Yaba Studio", due: "This week", priority: "low", done: true, avatar: "NA", avFrom: "#25D366", avTo: "#128C7E" },
  { id: 6, title: "Schedule call with Biodun", contact: "Biodun Olatunji", deal: "₦12M · Surulere Flat", due: "This week", priority: "low", done: false, avatar: "BO", avFrom: "#8b5cf6", avTo: "#6366f1" },
  { id: 7, title: "Prepare ₦120M proposal for Kemi", contact: "Kemi Fashola", deal: "₦120M · Ikoyi Mansion", due: "This week", priority: "high", done: false, avatar: "KF", avFrom: "#06b6d4", avTo: "#0891b2" },
];

const PRIORITY_COLORS: Record<string, string> = {
  high: "#EF4444",
  medium: "#F59E0B",
  low: "#6366F1",
};

const NavIcon = ({ children, active }: { children: React.ReactNode; active?: boolean }) => (
  <div className={`w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer transition-colors ${active ? "bg-[#25D366]/15" : "hover:bg-white/5"}`}>
    {children}
  </div>
);

export default function Tasks() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [filter, setFilter] = useState<"all" | "today" | "upcoming" | "done">("all");
  const [input, setInput] = useState("");

  const toggle = (id: number) => setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));

  const addTask = () => {
    if (!input.trim()) return;
    setTasks([...tasks, {
      id: tasks.length + 1,
      title: input,
      contact: "Unassigned",
      deal: "—",
      due: "Today",
      priority: "medium",
      done: false,
      avatar: "?",
      avFrom: "#3f3f46",
      avTo: "#27272a",
    }]);
    setInput("");
  };

  const filtered = tasks.filter(t => {
    if (filter === "today") return t.due === "Today" && !t.done;
    if (filter === "upcoming") return t.due !== "Today" && !t.done;
    if (filter === "done") return t.done;
    return true;
  });

  const pending = tasks.filter(t => !t.done).length;
  const done = tasks.filter(t => t.done).length;

  return (
    <div className="flex h-screen bg-[#0d0d0f] text-white overflow-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>

     <Sidebar />

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Header */}
        <div className="px-5 py-3 border-b border-white/[0.06] flex items-center justify-between flex-shrink-0">
          <div>
            <h1 className="text-[14px] font-semibold">Tasks</h1>
            <p className="text-[11px] text-[#52525b]">{pending} pending · {done} completed</p>
          </div>
        </div>

        {/* Stats */}
        <div className="px-5 py-3 grid grid-cols-3 gap-3 border-b border-white/[0.06] flex-shrink-0">
          {[
            { label: "Due today", value: tasks.filter(t => t.due === "Today" && !t.done).length, color: "#EF4444" },
            { label: "Upcoming", value: tasks.filter(t => t.due !== "Today" && !t.done).length, color: "#F59E0B" },
            { label: "Completed", value: done, color: "#25D366" },
          ].map(s => (
            <div key={s.label} className="bg-[#111114] border border-white/[0.06] rounded-xl p-3">
              <div className="text-[20px] font-bold" style={{ color: s.color }}>{s.value}</div>
              <div className="text-[11px] text-[#52525b]">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Filter tabs */}
        <div className="px-5 py-2 flex items-center gap-1 border-b border-white/[0.06] flex-shrink-0">
          {(["all", "today", "upcoming", "done"] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-[12px] px-3 py-1.5 rounded-lg capitalize transition-colors ${filter === f ? "bg-[#25D366]/15 text-[#25D366]" : "text-[#52525b] hover:text-white"}`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Task list */}
        <div className="flex-1 overflow-y-auto px-5 py-3 space-y-2">
          {filtered.map(task => (
            <div
              key={task.id}
              className={`flex items-center gap-3 p-3 rounded-xl border transition-colors ${task.done ? "border-white/[0.03] bg-transparent opacity-50" : "border-white/[0.06] bg-[#111114] hover:border-white/10"}`}
            >
              {/* Checkbox */}
              <button
                onClick={() => toggle(task.id)}
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${task.done ? "bg-[#25D366] border-[#25D366]" : "border-white/20 hover:border-[#25D366]"}`}
              >
                {task.done && (
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                )}
              </button>

              {/* Avatar */}
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-semibold flex-shrink-0"
                style={{ background: `linear-gradient(135deg, ${task.avFrom}, ${task.avTo})` }}>
                {task.avatar}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className={`text-[13px] font-medium ${task.done ? "line-through text-[#52525b]" : "text-[#f4f4f5]"}`}>
                  {task.title}
                </div>
                <div className="text-[11px] text-[#52525b] truncate">{task.contact} · {task.deal}</div>
              </div>

              {/* Meta */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: PRIORITY_COLORS[task.priority] + "18", color: PRIORITY_COLORS[task.priority] }}>
                  {task.priority}
                </span>
                <span className={`text-[11px] ${task.due === "Today" && !task.done ? "text-[#EF4444]" : "text-[#52525b]"}`}>
                  {task.due}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Add task input */}
        <div className="px-5 pb-4 pt-2 border-t border-white/[0.06] flex-shrink-0">
          <div className="flex items-center gap-2 bg-[#111114] border border-white/[0.08] rounded-xl px-4 py-2.5 focus-within:border-[#25D366]/40 transition-colors">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && addTask()}
              placeholder="Add a task and press Enter..."
              className="flex-1 bg-transparent border-none outline-none text-white text-[12px] placeholder-[#3f3f46]"
            />
            <button onClick={addTask} className="w-8 h-8 bg-[#25D366] hover:bg-[#1fb855] rounded-lg flex items-center justify-center flex-shrink-0 transition-colors">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}