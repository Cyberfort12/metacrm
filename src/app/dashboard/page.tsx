"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";

const convos = [
  {
    id: 1, name: "Adaeze Okonkwo", phone: "+234 801 234 5678",
    preview: "Please send the property details again", time: "2m", unread: 3,
    stage: "Viewing Booked", stageColor: "#25D366", av: "AO", avFrom: "#6366f1", avTo: "#8b5cf6",
    deal: "₦45M · Lekki Duplex",
    ai: "Interested in 4-bed Lekki duplex. Viewing Sat. Next: confirm time with landlord.",
    next: "Send viewing confirmation and landlord contact to client before Friday.",
    msgs: [
      { d: "in", t: "Hi, I saw your listing for the Lekki duplex. Is it still available?", time: "9:14" },
      { d: "out", t: "Yes! Beautiful 4-bed in Lekki Phase 1. Looking to buy or rent?", time: "9:16" },
      { d: "in", t: "Buy. What's the asking price?", time: "9:17" },
      { d: "out", t: "Asking ₦45M — includes BQ, 2 parking spaces, 24hr security. Want to schedule a viewing?", time: "9:20" },
      { d: "in", t: "Yes please. Can we do Saturday?", time: "9:22" },
      { d: "out", t: "Saturday works! Let me confirm with the landlord. Can I get your full name?", time: "9:23" },
      { d: "in", t: "Adaeze Okonkwo", time: "9:24" },
      { d: "in", t: "Please send the property details again", time: "10:42" },
    ],
  },
  {
    id: 2, name: "Emeka Nwosu", phone: "+234 802 345 6789",
    preview: "I can do the inspection Friday morning", time: "14m", unread: 1,
    stage: "Negotiating", stageColor: "#F59E0B", av: "EN", avFrom: "#f59e0b", avTo: "#ef4444",
    deal: "₦28M · Ikeja Apt",
    ai: "Negotiating on 3-bed Ikeja. Price at ₦28M. Next: counter-offer response.",
    next: "Follow up on counter-offer. Client wants 5% discount.",
    msgs: [
      { d: "out", t: "Hi Emeka, following up on the Ikeja apartment. Have you made a decision?", time: "8:00" },
      { d: "in", t: "Still thinking. Can we negotiate the price?", time: "8:45" },
      { d: "out", t: "The landlord can go to ₦27.5M final. What do you think?", time: "9:00" },
      { d: "in", t: "I can do the inspection Friday morning", time: "9:30" },
    ],
  },
  {
    id: 3, name: "Fatima Al-Hassan", phone: "+234 803 456 7890",
    preview: "What's the service charge per year?", time: "1h", unread: 0,
    stage: "New Lead", stageColor: "#6366F1", av: "FA", avFrom: "#06b6d4", avTo: "#6366f1",
    deal: "₦62M · VI Penthouse",
    ai: "New inquiry on VI penthouse. Asking about charges. Next: send full breakdown.",
    next: "Send service charge breakdown and building facilities brochure.",
    msgs: [
      { d: "in", t: "Good afternoon, I'm interested in the Victoria Island penthouse.", time: "Yesterday" },
      { d: "out", t: "Great choice! It's a stunning 5-bed with ocean view. Budget range?", time: "Yesterday" },
      { d: "in", t: "What's the service charge per year?", time: "1h ago" },
    ],
  },
  {
    id: 4, name: "Chukwudi Eze", phone: "+234 805 678 9012",
    preview: "My lawyer will review the documents today", time: "3h", unread: 0,
    stage: "Offer Made", stageColor: "#EC4899", av: "CE", avFrom: "#ec4899", avTo: "#f43f5e",
    deal: "₦18M · Ajah Terrace",
    ai: "Offer accepted at ₦18M. Documents with client lawyer. Next: follow up on signing.",
    next: "Check in with client lawyer on document review status.",
    msgs: [
      { d: "out", t: "Chukwudi, the landlord has accepted ₦18M. I'll send the documents now.", time: "Yesterday" },
      { d: "in", t: "Great news! My lawyer will review the documents today", time: "3h ago" },
    ],
  },
];

type Msg = { d: string; t: string; time: string };
type Convo = typeof convos[0];

const NavIcon = ({ children, active }: { children: React.ReactNode; active?: boolean }) => (
  <div className={`w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer transition-colors ${active ? "bg-[#25D366]/15" : "hover:bg-white/5"}`}>
    {children}
  </div>
);

export default function Dashboard() {
  const [active, setActive] = useState<Convo>(convos[0]);
  const [msgs, setMsgs] = useState<Msg[]>(convos[0].msgs);
  const [input, setInput] = useState("");

  const switchConvo = (c: Convo) => { setActive(c); setMsgs([...c.msgs]); };

  const sendMsg = () => {
    if (!input.trim()) return;
    const now = new Date();
    const time = `${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}`;
    setMsgs((prev) => [...prev, { d: "out", t: input, time }]);
    setInput("");
  };

  return (
    <div className="flex h-screen bg-[#0d0d0f] text-white overflow-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>

     <Sidebar />

      {/* Conversation list */}
      <div className="w-64 bg-[#111114] border-r border-white/[0.06] flex flex-col">
        <div className="p-4 border-b border-white/[0.06]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[13px] font-semibold">Inbox</span>
            <span className="text-[11px] text-[#3f3f46] bg-white/5 px-2 py-0.5 rounded-full">5 open</span>
          </div>
          <div className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.07] rounded-lg px-3 py-2">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#3f3f46" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input className="bg-transparent border-none outline-none text-white text-[12px] w-full placeholder-[#3f3f46]" placeholder="Search…" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {convos.map((c) => (
            <div key={c.id} onClick={() => switchConvo(c)}
              className={`p-4 border-b border-white/[0.04] cursor-pointer transition-colors ${active.id === c.id ? "bg-[#25D366]/[0.06] border-l-2 border-l-[#25D366]" : "hover:bg-white/[0.03]"}`}>
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-semibold flex-shrink-0"
                  style={{ background: `linear-gradient(135deg, ${c.avFrom}, ${c.avTo})` }}>{c.av}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] font-semibold text-[#f4f4f5] truncate">{c.name}</span>
                    <span className="text-[10px] text-[#52525b] ml-1 flex-shrink-0">{c.time}</span>
                  </div>
                </div>
              </div>
              <div className="text-[11px] text-[#f4f4f5] truncate pl-10 mb-2">{c.preview}</div>
              <div className="flex items-center justify-between pl-10">
                <span className="text-[10px] font-medium px-2 py-0.5 rounded-full"
                  style={{ background: c.stageColor + "18", color: c.stageColor }}>{c.stage}</span>
                {c.unread > 0 && <span className="w-4 h-4 bg-[#25D366] rounded-full text-[9px] font-bold flex items-center justify-center">{c.unread}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat */}
      <div className="flex-1 flex flex-col bg-[#0d0d0f] min-w-0">
        <div className="px-4 py-3 border-b border-white/[0.06] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-semibold"
              style={{ background: `linear-gradient(135deg, ${active.avFrom}, ${active.avTo})` }}>{active.av}</div>
            <div>
              <div className="text-[13px] font-semibold">{active.name}</div>
              <div className="text-[11px] text-[#52525b]">{active.phone}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] px-3 py-1 rounded-full border border-white/[0.08] text-[#a1a1aa]">{active.deal}</span>
            <span className="text-[11px] px-3 py-1 rounded-full font-medium"
              style={{ background: active.stageColor + "18", color: active.stageColor, border: `1px solid ${active.stageColor}30` }}>{active.stage}</span>
          </div>
        </div>

        <div className="mx-4 mt-3 px-3 py-2.5 rounded-xl bg-[#25D366]/[0.07] border border-[#25D366]/[0.15] flex items-start gap-2">
          <div className="w-1.5 h-1.5 bg-[#25D366] rounded-full mt-1.5 flex-shrink-0" />
          <p className="text-[11px] text-[#71717a] leading-relaxed">
            <span className="text-[#25D366] font-medium">AI · </span>{active.ai}
          </p>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-2">
          {msgs.map((m, i) => (
            <div key={i} className={`flex ${m.d === "out" ? "justify-end" : "justify-start"}`}>
              <div className="max-w-[65%]">
                <div className={`px-4 py-2.5 text-[12px] leading-relaxed rounded-2xl ${m.d === "out" ? "bg-[#25D366] text-white rounded-br-[4px]" : "bg-[#1a1a1e] text-[#e4e4e7] border border-white/[0.06] rounded-bl-[4px]"}`}>{m.t}</div>
                <div className={`text-[10px] mt-1 ${m.d === "out" ? "text-right text-white/40" : "text-[#52525b]"}`}>{m.time}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="px-4 pb-4">
          <div className="flex items-center gap-2 bg-[#111114] border border-white/[0.08] rounded-xl px-4 py-2.5 focus-within:border-[#25D366]/40 transition-colors">
            <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendMsg()}
              placeholder={`Message ${active.name.split(" ")[0]}…`}
              className="flex-1 bg-transparent border-none outline-none text-white text-[12px] placeholder-[#3f3f46]" />
            <button onClick={sendMsg} className="w-8 h-8 bg-[#25D366] hover:bg-[#1fb855] rounded-lg flex items-center justify-center flex-shrink-0 transition-colors">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="white"><path d="M2 21l21-9L2 3v7l15 2-15 2v7z"/></svg>
            </button>
          </div>
        </div>
      </div>

      {/* Detail panel */}
      <div className="w-56 bg-[#111114] border-l border-white/[0.06] p-4 flex flex-col gap-4 overflow-y-auto">
        <div>
          <div className="text-[10px] font-semibold text-[#3f3f46] uppercase tracking-widest mb-2">Deal</div>
          <div className="bg-[#0d0d0f] border border-white/[0.06] rounded-xl p-3">
            <div className="text-[12px] font-semibold text-[#f4f4f5] mb-1">{active.deal}</div>
            <div className="text-[11px] text-[#52525b] mb-2">{active.name}</div>
            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full"
              style={{ background: active.stageColor + "18", color: active.stageColor }}>{active.stage}</span>
          </div>
        </div>
        <div>
          <div className="text-[10px] font-semibold text-[#3f3f46] uppercase tracking-widest mb-2">Contact</div>
          <div className="bg-[#0d0d0f] border border-white/[0.06] rounded-xl p-3 space-y-2">
            {[["Phone", active.phone], ["Company", "Acme Realty"], ["Source", "WhatsApp"]].map(([l, v]) => (
              <div key={l} className="flex justify-between">
                <span className="text-[11px] text-[#52525b]">{l}</span>
                <span className="text-[11px] text-[#a1a1aa] truncate ml-2 text-right">{v}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="text-[10px] font-semibold text-[#3f3f46] uppercase tracking-widest mb-2">Next action</div>
          <div className="bg-[#25D366]/[0.07] border border-[#25D366]/[0.12] rounded-xl p-3">
            <div className="text-[10px] font-semibold text-[#25D366] mb-1">AI suggestion</div>
            <p className="text-[11px] text-[#71717a] leading-relaxed">{active.next}</p>
          </div>
        </div>
        <button className="mt-auto w-full py-2.5 bg-[#25D366] hover:bg-[#1fb855] rounded-xl text-white text-[12px] font-semibold transition-colors">
          Move to next stage →
        </button>
      </div>

    </div>
  );
}