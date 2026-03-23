"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";

const CONTACTS = [
  { id: 1, name: "Adaeze Okonkwo", phone: "+234 801 234 5678", company: "Self", stage: "Viewing Booked", stageColor: "#25D366", deal: "₦45M", source: "WhatsApp", lastSeen: "2m ago", avatar: "AO", avFrom: "#6366f1", avTo: "#8b5cf6", score: 92 },
  { id: 2, name: "Emeka Nwosu", phone: "+234 802 345 6789", company: "Nwosu Holdings", stage: "Negotiating", stageColor: "#F59E0B", deal: "₦28M", source: "WhatsApp", lastSeen: "14m ago", avatar: "EN", avFrom: "#f59e0b", avTo: "#ef4444", score: 78 },
  { id: 3, name: "Fatima Al-Hassan", phone: "+234 803 456 7890", company: "Al-Hassan Group", stage: "New Lead", stageColor: "#6366F1", deal: "₦62M", source: "Referral", lastSeen: "1h ago", avatar: "FA", avFrom: "#06b6d4", avTo: "#6366f1", score: 65 },
  { id: 4, name: "Chukwudi Eze", phone: "+234 805 678 9012", company: "Eze Properties", stage: "Offer Made", stageColor: "#EC4899", deal: "₦18M", source: "WhatsApp", lastSeen: "3h ago", avatar: "CE", avFrom: "#ec4899", avTo: "#f43f5e", score: 88 },
  { id: 5, name: "Ngozi Adeyemi", phone: "+234 806 789 0123", company: "Self", stage: "Won", stageColor: "#25D366", deal: "₦35M", source: "WhatsApp", lastSeen: "Yesterday", avatar: "NA", avFrom: "#25D366", avTo: "#128C7E", score: 100 },
  { id: 6, name: "Biodun Olatunji", phone: "+234 807 890 1234", company: "Olatunji Ventures", stage: "New Lead", stageColor: "#6366F1", deal: "₦12M", source: "Instagram", lastSeen: "2h ago", avatar: "BO", avFrom: "#8b5cf6", avTo: "#6366f1", score: 45 },
  { id: 7, name: "Kemi Fashola", phone: "+234 808 901 2345", company: "Fashola & Co", stage: "Negotiating", stageColor: "#F59E0B", deal: "₦120M", source: "WhatsApp", lastSeen: "5h ago", avatar: "KF", avFrom: "#06b6d4", avTo: "#0891b2", score: 81 },
  { id: 8, name: "Tunde Bakare", phone: "+234 809 012 3456", company: "Self", stage: "Lost", stageColor: "#EF4444", deal: "₦22M", source: "WhatsApp", lastSeen: "2 days ago", avatar: "TB", avFrom: "#ef4444", avTo: "#dc2626", score: 20 },
];

const NavIcon = ({ children, active }: { children: React.ReactNode; active?: boolean }) => (
  <div className={`w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer transition-colors ${active ? "bg-[#25D366]/15" : "hover:bg-white/5"}`}>
    {children}
  </div>
);

export default function Contacts() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<typeof CONTACTS[0] | null>(null);

  const filtered = CONTACTS.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search) ||
    c.company.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-[#0d0d0f] text-white overflow-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>

      <Sidebar />

      {/* Contact list */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Header */}
        <div className="px-5 py-3 border-b border-white/[0.06] flex items-center justify-between">
          <div>
            <h1 className="text-[14px] font-semibold">Contacts</h1>
            <p className="text-[11px] text-[#52525b]">{CONTACTS.length} total contacts</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.07] rounded-lg px-3 py-1.5">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#3f3f46" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search contacts..."
                className="bg-transparent border-none outline-none text-white text-[12px] w-40 placeholder-[#3f3f46]"
              />
            </div>
            <button className="text-[12px] px-3 py-1.5 rounded-lg bg-[#25D366] hover:bg-[#1fb855] text-white font-medium transition-colors">
              + Add contact
            </button>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">

          {/* Table */}
          <div className="flex-1 overflow-y-auto">
            {/* Table header */}
            <div className="grid px-5 py-2 border-b border-white/[0.04] text-[10px] font-semibold text-[#3f3f46] uppercase tracking-widest" style={{ gridTemplateColumns: "2fr 1.5fr 1fr 1fr 1fr 0.8fr" }}>
              <span>Contact</span>
              <span>Phone</span>
              <span>Stage</span>
              <span>Deal value</span>
              <span>Source</span>
              <span>Score</span>
            </div>

            {filtered.map(c => (
              <div
                key={c.id}
                onClick={() => setSelected(selected?.id === c.id ? null : c)}
                className={`grid px-5 py-3 border-b border-white/[0.04] cursor-pointer transition-colors items-center ${selected?.id === c.id ? "bg-[#25D366]/[0.06] border-l-2 border-l-[#25D366]" : "hover:bg-white/[0.02]"}`}
                style={{ gridTemplateColumns: "2fr 1.5fr 1fr 1fr 1fr 0.8fr" }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-semibold flex-shrink-0"
                    style={{ background: `linear-gradient(135deg, ${c.avFrom}, ${c.avTo})` }}>{c.avatar}</div>
                  <div>
                    <div className="text-[12px] font-semibold text-[#f4f4f5]">{c.name}</div>
                    <div className="text-[11px] text-[#52525b]">{c.company}</div>
                  </div>
                </div>
                <span className="text-[12px] text-[#a1a1aa]">{c.phone}</span>
                <span className="text-[11px] font-medium px-2 py-0.5 rounded-full w-fit"
                  style={{ background: c.stageColor + "18", color: c.stageColor }}>{c.stage}</span>
                <span className="text-[12px] font-semibold text-[#f4f4f5]">{c.deal}</span>
                <span className="text-[11px] text-[#a1a1aa]">{c.source}</span>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1 bg-white/[0.06] rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${c.score}%`, background: c.score > 70 ? "#25D366" : c.score > 40 ? "#F59E0B" : "#EF4444" }} />
                  </div>
                  <span className="text-[10px] text-[#52525b]">{c.score}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Contact detail panel */}
          {selected && (
            <div className="w-60 border-l border-white/[0.06] bg-[#111114] p-4 flex flex-col gap-4 overflow-y-auto flex-shrink-0">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-[#3f3f46] uppercase tracking-widest">Contact</span>
                <button onClick={() => setSelected(null)} className="text-[#3f3f46] hover:text-white text-lg leading-none">×</button>
              </div>

              <div className="flex flex-col items-center gap-2 py-2">
                <div className="w-14 h-14 rounded-full flex items-center justify-center text-[16px] font-semibold"
                  style={{ background: `linear-gradient(135deg, ${selected.avFrom}, ${selected.avTo})` }}>{selected.avatar}</div>
                <div className="text-[14px] font-semibold text-center">{selected.name}</div>
                <div className="text-[11px] text-[#52525b]">{selected.company}</div>
                <span className="text-[10px] font-medium px-2 py-0.5 rounded-full"
                  style={{ background: selected.stageColor + "18", color: selected.stageColor }}>{selected.stage}</span>
              </div>

              <div className="bg-[#0d0d0f] border border-white/[0.06] rounded-xl p-3 space-y-2">
                {[["Phone", selected.phone], ["Deal", selected.deal], ["Source", selected.source], ["Last seen", selected.lastSeen]].map(([l, v]) => (
                  <div key={l} className="flex justify-between">
                    <span className="text-[11px] text-[#52525b]">{l}</span>
                    <span className="text-[11px] text-[#a1a1aa] text-right">{v}</span>
                  </div>
                ))}
              </div>

              <div>
                <div className="text-[10px] font-semibold text-[#3f3f46] uppercase tracking-widest mb-2">Relationship score</div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-white/[0.06] rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{ width: `${selected.score}%`, background: selected.score > 70 ? "#25D366" : selected.score > 40 ? "#F59E0B" : "#EF4444" }} />
                  </div>
                  <span className="text-[12px] font-semibold" style={{ color: selected.score > 70 ? "#25D366" : selected.score > 40 ? "#F59E0B" : "#EF4444" }}>{selected.score}</span>
                </div>
              </div>

              <button className="w-full py-2.5 bg-[#25D366] hover:bg-[#1fb855] rounded-xl text-white text-[12px] font-semibold transition-colors">
                Open conversation →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
