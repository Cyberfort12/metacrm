"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const WA_ICON = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const CHECK = (
  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#25D366" strokeWidth="3">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const FACES = [
  { name: "Emeka Okafor", role: "Real estate agent, Lagos", quote: "I close 3x more deals now. Every WhatsApp lead is tracked automatically.", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=200&fit=crop&crop=top" },
  { name: "Fatima Musa", role: "Insurance broker, Abuja", quote: "No more lost leads. Piper reminds me when to follow up with every client.", img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=300&h=200&fit=crop&crop=top" },
  { name: "Chidi Eze", role: "Car dealer, Port Harcourt", quote: "The AI summaries save me 2 hours every single day. Total game changer.", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop&crop=top" },
  { name: "Ngozi Adeyemi", role: "Travel agent, Lagos", quote: "My whole team uses the same WhatsApp number now. Zero chaos.", img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=300&h=200&fit=crop&crop=top" },
];

const FEATURES = [
  { icon: "💬", title: "WhatsApp inbox", desc: "All conversations linked to deals. Auto-captured." },
  { icon: "✨", title: "AI summaries", desc: "Claude AI reads every chat and tells you what to do next." },
  { icon: "🎙️", title: "Voice notes", desc: "Send and receive voice notes inside your CRM." },
  { icon: "📊", title: "Deal pipeline", desc: "Drag-and-drop kanban. See every stage at a glance." },
  { icon: "💳", title: "Local payments", desc: "Pay via Paystack. No USD card needed." },
  { icon: "👥", title: "Team inbox", desc: "Multiple agents. One WhatsApp number." },
];

const PLANS = [
  {
    name: "Starter",
    monthly: "₦5,000",
    yearly: "₦4,000",
    users: "1–3 users · 1 WhatsApp number",
    features: ["Unlimited contacts", "Basic deal pipeline", "Follow-up reminders", "Email support"],
    cta: "Get started",
    popular: false,
  },
  {
    name: "Growth",
    monthly: "₦15,000",
    yearly: "₦12,000",
    users: "Up to 10 users · 3 WhatsApp numbers",
    features: ["AI conversation summaries", "Team inbox + assignments", "Voice notes support", "WhatsApp automations", "Priority WhatsApp support"],
    cta: "Get started",
    popular: true,
  },
  {
    name: "Enterprise",
    monthly: "Custom",
    yearly: "Custom",
    users: "Unlimited users · Unlimited numbers",
    features: ["Full Meta ecosystem", "Custom onboarding + setup", "API access", "Dedicated account manager", "SLA guarantee"],
    cta: "Contact us",
    popular: false,
  },
];

function PlanCard({ plan, yearly, index }: { plan: typeof PLANS[0]; yearly: boolean; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`relative flex flex-col rounded-2xl p-5 border transition-all duration-300 hover:-translate-y-1 ${plan.popular ? "border-[#25D366] border-[1.5px]" : "border-white/[0.07] bg-[#111114]"}`}
      style={{
        background: plan.popular ? "#0d1f13" : "#111114",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity .6s ease ${index * 0.15}s, transform .6s ease ${index * 0.15}s`,
      }}
    >
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#25D366] text-white text-[10px] font-bold px-3 py-1 rounded-full whitespace-nowrap">
          Most popular
        </div>
      )}
      <div className="text-[11px] font-semibold text-[#a1a1aa] uppercase tracking-widest mb-3">{plan.name}</div>
      <div className="text-[30px] font-bold text-white mb-1">
        {yearly ? plan.yearly : plan.monthly}
        {plan.monthly !== "Custom" && <span className="text-[13px] font-normal text-[#52525b]">/mo</span>}
      </div>
      <div className="text-[11px] text-[#52525b] mb-4 pb-4 border-b border-white/[0.06]">{plan.users}</div>
      <div className="flex flex-col gap-2 flex-1">
        {plan.features.map(f => (
          <div key={f} className="flex items-center gap-2 text-[11px] text-[#a1a1aa]">
            <div className="w-4 h-4 bg-[#25D366]/10 rounded-full flex items-center justify-center flex-shrink-0">{CHECK}</div>
            {f}
          </div>
        ))}
      </div>
      <button className={`w-full mt-4 py-2.5 rounded-xl text-[12px] font-semibold transition-colors ${plan.popular ? "bg-[#25D366] hover:bg-[#1fb855] text-white border-none" : "bg-transparent text-[#a1a1aa] border border-white/10 hover:border-white/20 hover:text-white"}`}>
        {plan.cta}
      </button>
    </div>
  );
}

export default function Landing() {
  const router = useRouter();
  const [yearly, setYearly] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleWaitlist = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06] sticky top-0 bg-[#0a0a0a]/90 backdrop-blur-sm z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#25D366] rounded-xl flex items-center justify-center">{WA_ICON}</div>
          <span className="font-semibold text-[15px]">Piper</span>
        </div>
        <div className="flex items-center gap-2">
          <a href="#pricing" className="text-[13px] text-[#a1a1aa] hover:text-white transition-colors px-3 py-2">Pricing</a>
          <button onClick={() => router.push("/login")} className="text-[13px] px-4 py-2 rounded-xl border border-white/10 text-[#a1a1aa] hover:text-white hover:border-white/20 transition-colors">Log in</button>
          <button onClick={() => router.push("/login")} className="text-[13px] px-4 py-2 rounded-xl bg-[#25D366] hover:bg-[#1fb855] text-white font-medium transition-colors">Sign up free</button>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center text-center px-6 pt-20 pb-12">
        <div className="inline-flex items-center gap-2 bg-[#25D366]/10 border border-[#25D366]/20 rounded-full px-4 py-1.5 mb-6" style={{ animation: "fadeUp .6s ease forwards" }}>
          <div className="w-1.5 h-1.5 bg-[#25D366] rounded-full animate-pulse" />
          <span className="text-[12px] text-[#25D366] font-medium">Now in early access</span>
        </div>

        <h1 className="text-5xl md:text-6xl font-bold leading-tight max-w-2xl mb-5" style={{ letterSpacing: "-1.5px" }}>
          Close more deals.<br />
          <span className="text-[#25D366]">WhatsApp is your CRM.</span>
        </h1>

        <p className="text-[16px] text-[#71717a] max-w-lg mb-8 leading-relaxed">
          Nigeria. Brazil. India. MENA. The world sells on WhatsApp — Piper is the first CRM built for it. AI-powered, locally priced.
        </p>

        <div className="flex items-center gap-3 mb-8 flex-wrap justify-center">
          <button onClick={() => router.push("/login")} className="px-6 py-3 bg-[#25D366] hover:bg-[#1fb855] text-white font-semibold rounded-xl transition-colors text-[14px]">
            Start free today
          </button>
          <a href="#pricing" className="px-6 py-3 border border-white/10 hover:border-white/20 text-[#a1a1aa] hover:text-white rounded-xl transition-colors text-[14px]">
            See pricing
          </a>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex">
            {["https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=64&h=64&fit=crop&crop=face",
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face",
              "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=64&h=64&fit=crop&crop=face",
              "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=64&h=64&fit=crop&crop=face",
            ].map((src, i) => (
              <img key={i} src={src} alt="" className="w-8 h-8 rounded-full border-2 border-[#0a0a0a] object-cover" style={{ marginLeft: i === 0 ? 0 : -8 }} />
            ))}
          </div>
          <p className="text-[12px] text-[#71717a]"><span className="text-white font-medium">50+ businesses</span> already on the waitlist</p>
        </div>
      </section>

      {/* Phone mockup */}
      <div className="flex justify-center px-6 pb-16">
        <div className="relative">
          <div className="w-52 bg-[#111114] rounded-3xl border border-white/10 overflow-hidden" style={{ animation: "float 4s ease-in-out infinite" }}>
            <div className="h-5 bg-[#0a0a0a] flex items-center justify-center">
              <div className="w-12 h-1 bg-[#1a1a1a] rounded-full" />
            </div>
            <div className="px-3 py-2 border-b border-white/[0.06] flex items-center gap-2">
              <img src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=52&h=52&fit=crop&crop=face" alt="" className="w-7 h-7 rounded-full object-cover" />
              <div>
                <div className="text-[11px] font-semibold">Adaeze Okonkwo</div>
                <div className="text-[9px] text-[#25D366]">Viewing Booked · ₦45M</div>
              </div>
            </div>
            <div className="p-3 flex flex-col gap-2">
              <div className="bg-[#1a1a1e] rounded-xl rounded-bl-sm px-3 py-2 text-[10px] text-[#e4e4e7] max-w-[80%] border border-white/[0.06]">
                Is the Lekki duplex still available?
                <div className="text-[8px] opacity-50 mt-1">9:14</div>
              </div>
              <div className="bg-[#25D366] rounded-xl rounded-br-sm px-3 py-2 text-[10px] text-white max-w-[80%] self-end">
                Yes! 4-bed, ₦45M. View Saturday?
                <div className="text-[8px] opacity-70 mt-1">9:16</div>
              </div>
              <div className="bg-[#1a1a1e] rounded-xl rounded-bl-sm px-3 py-2 text-[10px] text-[#e4e4e7] max-w-[80%] border border-white/[0.06]">
                Yes please! 10am works?
                <div className="text-[8px] opacity-50 mt-1">9:18</div>
              </div>
              <div className="bg-[#25D366]/[0.08] border border-[#25D366]/20 rounded-xl p-2">
                <div className="text-[8px] font-semibold text-[#25D366] mb-1">✦ AI summary</div>
                <div className="text-[8px] text-[#71717a] leading-relaxed">Viewing Sat 10am. Next: confirm with landlord.</div>
              </div>
            </div>
          </div>

          {/* Floating cards */}
          <div className="absolute top-4 -right-36 flex flex-col gap-2 w-32">
            {[
              { label: "Deals this month", val: "12", color: "#25D366", sub: "+3 from last month" },
              { label: "Pipeline value", val: "₦284M", color: "#f4f4f5", sub: "8 active deals" },
              { label: "Follow-ups due", val: "3", color: "#F59E0B", sub: "Today" },
            ].map((c, i) => (
              <div key={i} className="bg-[#111114] border border-white/[0.08] rounded-xl p-3"
                style={{ opacity: 0, animation: `fadeUp .5s ease ${.3 + i * .2}s forwards` }}>
                <div className="text-[9px] text-[#52525b] mb-1">{c.label}</div>
                <div className="text-[18px] font-bold" style={{ color: c.color }}>{c.val}</div>
                <div className="text-[9px] text-[#52525b]">{c.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-px border-y border-white/[0.06] bg-white/[0.06]">
        {[
          { stat: "2.5B+", label: "WhatsApp users globally" },
          { stat: "0", label: "CRMs built for Africa" },
        ].map(s => (
          <div key={s.label} className="text-center py-8 bg-[#0a0a0a]">
            <div className="text-3xl font-bold text-[#25D366]">{s.stat}</div>
            <div className="text-[11px] text-[#52525b] mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Faces */}
      <section className="px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-2">Built for people like you</h2>
        <p className="text-[13px] text-[#71717a] text-center mb-8">Real estate agents, brokers, traders — people who sell on WhatsApp every day</p>
        <div className="grid grid-cols-2 gap-3 max-w-2xl mx-auto">
          {FACES.map(f => (
            <div key={f.name} className="bg-[#111114] border border-white/[0.06] rounded-2xl overflow-hidden hover:border-[#25D366]/30 transition-colors">
              <img src={f.img} alt={f.name} className="w-full h-28 object-cover object-top" />
              <div className="p-3">
                <div className="text-[12px] font-semibold mb-0.5">{f.name}</div>
                <div className="text-[10px] text-[#52525b] mb-2">{f.role}</div>
                <div className="text-[10px] text-[#a1a1aa] leading-relaxed italic">"{f.quote}"</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-16 border-t border-white/[0.06]">
        <h2 className="text-3xl font-bold text-center mb-2">Built different</h2>
        <p className="text-[13px] text-[#71717a] text-center mb-8">Every feature designed for how African businesses actually sell</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-2xl mx-auto">
          {FEATURES.map(f => (
            <div key={f.title} className="bg-[#111114] border border-white/[0.06] rounded-2xl p-4 hover:border-[#25D366]/30 transition-colors">
              <div className="text-xl mb-3">{f.icon}</div>
              <div className="text-[13px] font-semibold mb-1">{f.title}</div>
              <div className="text-[11px] text-[#71717a] leading-relaxed">{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="px-6 py-16 border-t border-white/[0.06]">
        <h2 className="text-3xl font-bold text-center mb-2">Simple pricing</h2>
        <p className="text-[13px] text-[#71717a] text-center mb-6">Priced for Nigerian businesses. Pay in naira. No USD card needed.</p>

        <div className="flex items-center justify-center gap-3 mb-8">
          <span className="text-[12px] text-[#71717a]">Monthly</span>
          <button
            onClick={() => setYearly(!yearly)}
            className={`w-10 h-6 rounded-full relative transition-colors ${yearly ? "bg-[#25D366]" : "bg-[#1a1a1a] border border-white/10"}`}
          >
            <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${yearly ? "translate-x-5" : "translate-x-1"}`} />
          </button>
          <span className="text-[12px] text-[#71717a]">Yearly</span>
          <span className="text-[10px] font-semibold text-[#25D366] bg-[#25D366]/10 border border-[#25D366]/20 px-2 py-0.5 rounded-full">Save 20%</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {PLANS.map((plan, i) => (
            <PlanCard key={plan.name} plan={plan} yearly={yearly} index={i} />
          ))}
        </div>
        <p className="text-center text-[11px] text-[#3f3f46] mt-5">All plans include a 14-day free trial. Pay via Paystack or bank transfer.</p>
      </section>

      {/* Waitlist */}
      <section id="waitlist" className="px-6 py-20 border-t border-[#25D366]/10 bg-[#25D366]/[0.03]">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-3xl font-bold mb-3">Get early access</h2>
          <p className="text-[13px] text-[#71717a] mb-8">First 50 businesses get 3 months free. No credit card needed.</p>

          {submitted ? (
            <div className="bg-[#25D366]/10 border border-[#25D366]/20 rounded-2xl p-8">
              <div className="text-4xl mb-3">🎉</div>
              <div className="text-[15px] font-semibold text-[#25D366] mb-2">You're on the list!</div>
              <div className="text-[13px] text-[#71717a]">We'll reach out on WhatsApp when your access is ready.</div>
            </div>
          ) : (
            <form onSubmit={handleWaitlist} className="flex flex-col gap-3">
              <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Your email address" type="email" required
                className="w-full bg-[#111114] border border-white/10 rounded-xl px-4 py-3 text-white text-[13px] placeholder-[#3f3f46] focus:outline-none focus:border-[#25D366]" />
              <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Your WhatsApp number" type="tel" required
                className="w-full bg-[#111114] border border-white/10 rounded-xl px-4 py-3 text-white text-[13px] placeholder-[#3f3f46] focus:outline-none focus:border-[#25D366]" />
              <button type="submit" className="w-full bg-[#25D366] hover:bg-[#1fb855] text-white font-semibold py-3 rounded-xl transition-colors text-[14px]">
                Join the waitlist →
              </button>
              <p className="text-[11px] text-[#3f3f46]">No spam. We'll only contact you about Piper.</p>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] px-6 py-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="w-6 h-6 bg-[#25D366] rounded-lg flex items-center justify-center">
            {WA_ICON}
          </div>
          <span className="text-[13px] font-semibold">Piper</span>
        </div>
        <p className="text-[11px] text-[#3f3f46]">WhatsApp CRM for modern sales teams · Built in Nigeria 🇳🇬</p>
      </footer>

      <style jsx global>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </main>
  );
}