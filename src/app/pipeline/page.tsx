"use client";
import { useState } from "react";

const STAGES = [
  { id: "new", name: "New Lead", color: "#6366F1" },
  { id: "viewing", name: "Viewing Booked", color: "#25D366" },
  { id: "negotiating", name: "Negotiating", color: "#F59E0B" },
  { id: "offer", name: "Offer Made", color: "#EC4899" },
  { id: "won", name: "Won", color: "#25D366" },
  { id: "lost", name: "Lost", color: "#EF4444" },
];

const INITIAL_DEALS = [
  { id: 1, name: "Adaeze Okonkwo", title: "Lekki Duplex", value: "₦45M", stage: "viewing", avatar: "AO", avFrom: "#6366f1", avTo: "#8b5cf6", time: "2m ago" },
  { id: 2, name: "Emeka Nwosu", title: "Ikeja Apartment", value: "₦28M", stage: "negotiating", avatar: "EN", avFrom: "#f59e0b", avTo: "#ef4444", time: "14m ago" },
  { id: 3, name: "Fatima Al-Hassan", title: "VI Penthouse", value: "₦62M", stage: "new", avatar: "FA", avFrom: "#06b6d4", avTo: "#6366f1", time: "1h ago" },
  { id: 4, name: "Chukwudi Eze", title: "Ajah Terrace", value: "₦18M", stage: "offer", avatar: "CE", avFrom: "#ec4899", avTo: "#f43f5e", time: "3h ago" },
  { id: 5, name: "Ngozi Adeyemi", title: "Yaba Studio", value: "₦35M", stage: "won", avatar: "NA", avFrom: "#25D366", avTo: "#128C7E", time: "Yesterday" },
  { id: 6, name: "Biodun Olatunji", title: "Surulere Flat", value: "₦12M", stage: "new", avatar: "BO", avFrom: "#8b5cf6", avTo: "#6366f1", time: "2h ago" },
  { id: 7, name: "Kemi Fashola", title: "Ikoyi Mansion", value: "₦120M", stage: "negotiating", avatar: "KF", avFrom: "#06b6d4", avTo: "#0891b2", time: "5h ago" },
  { id: 8, name: "Tunde Bakare", title: "Magodo Estate", value: "₦22M", stage: "lost", avatar: "TB", avFrom: "#ef4444", avTo: "#dc2626", time: "2 days ago" },
];

type Deal = typeof INITIAL_DEALS[0];

const NavIcon = ({ children, active }: { children: React.ReactNode; active?: boolean }) => (
  <div className={`w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer transition-colors ${active ? "bg-[#25D366]/15" : "hover:bg-white/5"}`}>
    {children}
  </div>
);

export default function Pipeline() {
  const [deals, setDeals] = useState<Deal[]>(INITIAL_DEALS);
  const [dragging, setDragging] = useState<Deal | null>(null);
  const [dragOver, setDragOver] = useState<string | null>(null);

  const onDragStart = (deal: Deal) => setDragging(deal);
  const onDragOver = (e: React.DragEvent, stageId: string) => {
    e.preventDefault();
    setDragOver(stageId);
  };
  const onDrop = (stageId: string) => {
    if (!dragging) return;
    setDeals(deals.map(d => d.id === dragging.id ? { ...d, stage: stageId } : d));
    setDragging(null);
    setDragOver(null);
  };
  const onDragEnd = () => { setDragging(null); setDragOver(null); };

  const totalValue = (stageId: string) => {
    const stageDeals = deals.filter(d => d.stage === stageId);
    return stageDeals.length;
  };

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
        <NavIcon active>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#25D366" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
        </NavIcon>
        <NavIcon>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3f3f46" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
        </NavIcon>
        <NavIcon>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3f3f46" strokeWidth="2" strokeLinecap="round"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>
        </NavIcon>
        <div className="mt-auto w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: "linear-gradient(135deg,#25D366,#128C7E)" }}>C</div>
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Header */}
        <div className="px-5 py-3 border-b border-white/[0.06] flex items-center justify-between flex-shrink-0">
          <div>
            <h1 className="text-[14px] font-semibold">Pipeline</h1>
            <p className="text-[11px] text-[#52525b]">{deals.length} deals · Drag to move between stages</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="text-[12px] px-3 py-1.5 rounded-lg border border-white/[0.08] text-[#a1a1aa] hover:text-white hover:border-white/20 transition-colors">
              Filter
            </button>
            <button className="text-[12px] px-3 py-1.5 rounded-lg bg-[#25D366] hover:bg-[#1fb855] text-white font-medium transition-colors">
              + Add deal
            </button>
          </div>
        </div>

        {/* Kanban board */}
        <div className="flex-1 overflow-x-auto overflow-y-hidden p-4">
          <div className="flex gap-3 h-full" style={{ minWidth: `${STAGES.length * 220}px` }}>
            {STAGES.map((stage) => {
              const stageDeals = deals.filter(d => d.stage === stage.id);
              const isOver = dragOver === stage.id;

              return (
                <div
                  key={stage.id}
                  className="flex flex-col w-52 flex-shrink-0"
                  onDragOver={(e) => onDragOver(e, stage.id)}
                  onDrop={() => onDrop(stage.id)}
                >
                  {/* Column header */}
                  <div className="flex items-center justify-between mb-2.5 px-1">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ background: stage.color }} />
                      <span className="text-[12px] font-semibold text-[#f4f4f5]">{stage.name}</span>
                    </div>
                    <span className="text-[11px] text-[#52525b] bg-white/5 px-1.5 py-0.5 rounded-full">
                      {totalValue(stage.id)}
                    </span>
                  </div>

                  {/* Drop zone */}
                  <div className={`flex-1 rounded-xl p-2 flex flex-col gap-2 overflow-y-auto transition-colors ${isOver ? "bg-[#25D366]/[0.06] border border-[#25D366]/30" : "bg-[#111114] border border-white/[0.04]"}`}>

                    {stageDeals.map((deal) => (
                      <div
                        key={deal.id}
                        draggable
                        onDragStart={() => onDragStart(deal)}
                        onDragEnd={onDragEnd}
                        className={`bg-[#0d0d0f] border border-white/[0.06] rounded-xl p-3 cursor-grab active:cursor-grabbing transition-all hover:border-white/10 ${dragging?.id === deal.id ? "opacity-40" : ""}`}
                      >
                        {/* Deal header */}
                        <div className="flex items-center gap-2 mb-2">
                          <div
                            className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-semibold flex-shrink-0"
                            style={{ background: `linear-gradient(135deg, ${deal.avFrom}, ${deal.avTo})` }}
                          >
                            {deal.avatar}
                          </div>
                          <div className="min-w-0">
                            <div className="text-[11px] font-semibold text-[#f4f4f5] truncate">{deal.name}</div>
                            <div className="text-[10px] text-[#52525b] truncate">{deal.time}</div>
                          </div>
                        </div>

                        {/* Deal info */}
                        <div className="text-[11px] text-[#a1a1aa] mb-2 truncate">{deal.title}</div>

                        {/* Value + stage */}
                        <div className="flex items-center justify-between">
                          <span className="text-[12px] font-semibold text-[#f4f4f5]">{deal.value}</span>
                          <div className="w-1.5 h-1.5 rounded-full" style={{ background: stage.color }} />
                        </div>
                      </div>
                    ))}

                    {/* Empty state */}
                    {stageDeals.length === 0 && (
                      <div className={`flex-1 flex items-center justify-center border-2 border-dashed rounded-xl min-h-[80px] transition-colors ${isOver ? "border-[#25D366]/40" : "border-white/[0.04]"}`}>
                        <span className="text-[11px] text-[#3f3f46]">Drop here</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
