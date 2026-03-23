"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";

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

      <Sidebar />

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
