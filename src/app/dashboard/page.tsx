"use client";
import { useState } from "react";

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

      {/* Icon sidebar */}
      <div className="w-14 bg-[#0d0d0f] border-r border-white/[0.06] flex flex-col items-center py-4 gap-1">
        <div className="w-8 h-8 bg-[#25D366] rounded-xl flex items-center justify-center mb-4 flex-shrink-0">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </div>
        <NavIcon active>
          <div className="relative">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#25D366" strokeWidth="2" strokeLinecap="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#25D366] rounded-full" />
          </div>
        </NavIcon>
        <NavIcon>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3f3f46" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
        </NavIcon>
        <NavIcon>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3f3f46" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
        </NavIcon>
        <NavIcon>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3f3f46" strokeWidth="2" strokeLinecap="round"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>
        </NavIcon>
        <div className="mt-auto w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: "linear-gradient(135deg,#25D366,#128C7E)" }}>C</div>
      </div>

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