"use client";
import { useState } from "react";

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

      {/* Sidebar */}
      <div className="w-14 bg-[#0d0d0f] border-r border-white/[0.06] flex flex-col items-center py-4 gap-1">
        <div className="w-8 h-8 bg-[#25D366] rounded-xl flex items-center justify-center mb-4 flex-shrink-0">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </div>
        <NavIcon>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3f3f46" strokeWidth="2" strokeLinecap="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
        </NavIcon>
        <NavIcon>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3f3f46" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
        </NavIcon>
        <NavIcon>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3f3f46" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
        </NavIcon>
        <NavIcon active>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#25D366" strokeWidth="2" strokeLinecap="round"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>
        </NavIcon>
        <div className="mt-auto w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: "linear-gradient(135deg,#25D366,#128C7E)" }}>C</div>
      </div>

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