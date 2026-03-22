"use client";
import { useState } from "react";

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
        <NavIcon active>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#25D366" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
        </NavIcon>
        <NavIcon>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3f3f46" strokeWidth="2" strokeLinecap="round"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>
        </NavIcon>
        <div className="mt-auto w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: "linear-gradient(135deg,#25D366,#128C7E)" }}>C</div>
      </div>

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
