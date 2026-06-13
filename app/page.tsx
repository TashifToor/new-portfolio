"use client";
import { useState, useEffect, useRef, useCallback } from "react";

/* ═══════════════════════════════════════════════════════════════
HOOKS
═══════════════════════════════════════════════════════════════ */
function useTypewriter(words: string[], speed: number = 70, pause: number = 2200): string {
  const [text, setText] = useState("");
  const [wi, setWi] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const w = words[wi % words.length];
    const t = setTimeout(() => {
      if (!del) {
        setText(w.slice(0, text.length + 1));
        if (text.length + 1 === w.length) setTimeout(() => setDel(true), pause);
      } else {
        setText(w.slice(0, text.length - 1));
        if (text.length === 0) { setDel(false); setWi(i => i + 1); }
      }
    }, del ? speed / 2.2 : speed);
    return () => clearTimeout(t);
  }, [text, del, wi, words, speed, pause]);
  return text;
}

function useInView(threshold: number = 0.12): [React.RefObject<HTMLDivElement>, boolean] {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState<boolean>(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function useMouse(): { x: number; y: number } {
  const [pos, setPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  useEffect(() => {
  const h = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, []);
  return pos;
}

/* ═══════════════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════════════ */
const PROJECTS = [
  {
    id: "talentiq", num: "02",
    name: "TalentIQ",
    sub: "Agentic RAG Recruitment Engine",
    year: "2026",
    stack: ["FastAPI", "LangGraph", "FAISS", "LLaMA 3.3 70B", "PostgreSQL", "Next.js"],
    problem: "Manual CV screening at scale. Semantic search over 500+ profiles requires vector indexing. Multi-step reasoning over unstructured PDF data demands agentic orchestration.",
    solution: "LangGraph multi-step pipeline. FastAPI + JWT + FAISS. Real-time Next.js dashboard. Score, skill-gap delta, and fast-track flag per candidate.",
    metrics: [{ v: "60%", l: "Faster Screening" }, { v: "500+", l: "CV Profiles" }, { v: "70B", l: "LLaMA Params" }],
    color: "#a78bfa",
    grad: "linear-gradient(135deg, rgba(167,139,250,.15) 0%, transparent 60%)",
  },
  {
    id: "medicare", num: "03",
    name: "MediCare AI",
    sub: "Medical RAG with Anti-Hallucination Guards",
    year: "2026",
    stack: ["LangChain", "ChromaDB", "FastAPI", "SentenceTransformers", "Docker", "Groq"],
    problem: "Medical retrieval has zero hallucination tolerance. Standard LLM responses over large corpora drift from source. Concurrent load must not degrade latency.",
    solution: "RAG over 8-doc medical corpus with SentenceTransformer embeddings. Source-grounded prompt guards rejecting out-of-corpus responses. Dockerised for scale.",
    metrics: [{ v: "94%", l: "Retrieval Acc." }, { v: "<2s", l: "Latency" }, { v: "~0%", l: "Hallucination" }],
    color: "#34d399",
    grad: "linear-gradient(135deg, rgba(52,211,153,.15) 0%, transparent 60%)",
  },

  {
      id: "bizledger", num: "01",
      name: "BizLedger",
      sub: "Multi-Tenant SaaS Accounting Platform",
      year: "2025",
      stack: ["Django REST Framework", "PostgreSQL", "JWT", "Docker", "Celery", "React"],
      problem: "Tenant data isolation as a hard architectural guarantee — not a convention. N+1 query patterns and schema leakage were existential risks.",
      solution: "Row-level tenant-isolated PostgreSQL schema. 7 DRF apps, RBAC, full Docker containerisation. Zero cross-tenant query surface by design.",
      metrics: [{ v: "7", l: "Django Apps" }, { v: "1K+", l: "Transactions" }, { v: "0", l: "Data Leaks" }],
      color: "#4f8ef7",
      grad: "linear-gradient(135deg, rgba(79,142,247,.15) 0%, transparent 60%)",
    },
];

const EXP = [
  { role: "Associate Software Engineer", co: "M1 Solution", period: "Feb 2026 — Present", type: "Full-time · Remote", live: true,
    pts: ["Architecting FastAPI service layer for live airline-operations platform; designed service contracts from scratch.", "Engineered PostgreSQL schema cutting data access latency 30% via query optimisation & indexing."] },
  { role: "AI Engineer — Team Lead", co: "WorldWise Solutions", period: "Feb — May 2026", type: "Contract · Remote", live: false,
    pts: ["Built HadeesGPT — Hadees RAG (LangChain + ChromaDB) hitting 92% query accuracy.", "Directed 3-engineer ML team shipping production AI systems."] },
  { role: "Backend Developer — Team Lead", co: "CodeCelix", period: "Sep — Nov 2025", type: "Contract · Remote", live: false,
    pts: ["Delivered 8 production DRF endpoints integrated with React frontend.", "Cut integration turnaround 35% via code reviews across 3-member team."] },
];

const SKILLS = {
  "Core Backend":        { color: "#4f8ef7", items: ["Python", "Django", "DRF","Neo4j","GraphRag", "Knowledge Graphs", "FastAPI", "Flask", "Celery", "Redis", "JWT", "OAuth2"] },
  "AI / ML":             { color: "#a78bfa", items: ["LangChain", "LangGraph", "Agentic RAG", "FAISS", "GraphDB","ChromaDB", "SentenceTransformers", "Groq API"] },
  "Databases":           { color: "#38bdf8", items: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "FAISS", "ChromaDB"] },
  "DevOps":              { color: "#fb923c", items: ["Docker", "Git", "GitHub", "Linux", "Postman", "CI/CD"] },
  "Frontend":            { color: "#34d399", items: ["React", "Next.js", "Tailwind CSS", "JavaScript", "Vite"] },
};

/* ═══════════════════════════════════════════════════════════════
   GLOBAL CSS — Editorial dark with cinematic typography
═══════════════════════════════════════════════════════════════ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Editorial+New:ital,wght@0,400;0,700;1,400;1,700&family=Clash+Display:wght@400;500;600;700&family=Fira+Code:wght@300;400;500&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,700;1,800&family=DM+Mono:wght@300;400;500&family=Cabinet+Grotesk:wght@400;500;700;800&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}

:root {
  --ink:     #0c0c10;
  --ink2:    #111118;
  --ink3:    #16161e;
  --surface: #1c1c26;
  --lift:    #22222e;
  --wire:    rgba(255,255,255,0.06);
  --wire2:   rgba(255,255,255,0.11);
  --chalk:   #e8e8f0;
  --fog:     #7070888;
  --ghost:   #40405a;
  --neon:    #6366f1;
  --neon2:   #818cf8;
  --ember:   #f97316;
  --jade:    #10b981;
  --ice:     #38bdf8;
  --serif:   'Playfair Display', Georgia, serif;
  --display: 'Cabinet Grotesk', sans-serif;
  --mono:    'DM Mono', monospace;
  --body:    'Plus Jakarta Sans', sans-serif;
}

html { scroll-behavior: smooth; background: var(--ink); }
body { background: var(--ink); color: var(--chalk); font-family: var(--body);
  -webkit-font-smoothing: antialiased; overflow-x: hidden; }

::selection { background: rgba(99,102,241,.35); color: #fff; }

::-webkit-scrollbar { width: 3px; }
::-webkit-scrollbar-track { background: var(--ink); }
::-webkit-scrollbar-thumb { background: var(--ghost); border-radius: 2px; }

/* ── Keyframes ── */
@keyframes in-up    { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:none} }
@keyframes in-left  { from{opacity:0;transform:translateX(-24px)} to{opacity:1;transform:none} }
@keyframes in-right { from{opacity:0;transform:translateX(24px)} to{opacity:1;transform:none} }
@keyframes blink    { 0%,100%{opacity:1} 50%{opacity:0} }
@keyframes spin-slow{ to{transform:rotate(360deg)} }
@keyframes drift    { 0%,100%{transform:translateY(0) rotate(0deg)} 33%{transform:translateY(-12px) rotate(1deg)} 66%{transform:translateY(-6px) rotate(-1deg)} }
@keyframes scan     { 0%{transform:translateY(-100%)} 100%{transform:translateY(800%)} }
@keyframes glow-pulse { 0%,100%{opacity:.5;transform:scale(1)} 50%{opacity:.85;transform:scale(1.08)} }
@keyframes marquee  { from{transform:translateX(0)} to{transform:translateX(-50%)} }
@keyframes line-grow{ from{width:0} to{width:100%} }
@keyframes counter-in{ from{opacity:0;transform:translateY(16px) scale(.9)} to{opacity:1;transform:none} }

/* ── Utilities ── */
.in-up    { animation: in-up   .65s cubic-bezier(.16,1,.3,1) both }
.in-left  { animation: in-left .65s cubic-bezier(.16,1,.3,1) both }
.in-right { animation: in-right .65s cubic-bezier(.16,1,.3,1) both }
.drift    { animation: drift 7s ease-in-out infinite }

/* ── Custom cursor ── */
#cursor {
  width: 8px; height: 8px; border-radius: 50%;
  background: var(--neon);
  position: fixed; top: 0; left: 0; pointer-events: none; z-index: 9999;
  transform: translate(-50%,-50%);
  transition: transform .08s, background .2s;
  mix-blend-mode: screen;
}
#cursor-ring {
  width: 32px; height: 32px; border-radius: 50%;
  border: 1px solid rgba(99,102,241,.5);
  position: fixed; top: 0; left: 0; pointer-events: none; z-index: 9998;
  transform: translate(-50%,-50%);
  transition: left .12s ease, top .12s ease, width .2s, height .2s, border-color .2s;
}

/* ── Noise overlay ── */
body::before {
  content:''; position:fixed; inset:0; z-index:1; pointer-events:none;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
  background-size: 200px; opacity:.5;
}

/* ── Grid ── */
.grid-bg {
  background-image:
    linear-gradient(rgba(99,102,241,.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(99,102,241,.04) 1px, transparent 1px);
  background-size: 72px 72px;
}

/* ── Nav ── */
.nav { position:fixed; top:0; left:0; right:0; z-index:200;
  padding: 0 48px; height:64px;
  display:flex; align-items:center; justify-content:space-between;
  transition: background .4s, border-color .4s; }
.nav.solid { background:rgba(12,12,16,.88); backdrop-filter:blur(24px);
  border-bottom:1px solid var(--wire); }
.nav-logo { font-family:var(--mono); font-size:13px; color:var(--ghost);
  display:flex; align-items:center; gap:9px; }
.nav-logo span { color: var(--chalk); }
.nav-links { display:flex; gap:36px; }
.nav-link { font-family:var(--mono); font-size:11.5px; color:var(--ghost);
  text-decoration:none; letter-spacing:.6px;
  transition:color .2s; position:relative; padding-bottom:2px; }
.nav-link::after { content:''; position:absolute; bottom:0; left:0; width:0; height:1px;
  background:var(--neon2); transition:width .25s; }
.nav-link:hover { color:var(--chalk); }
.nav-link:hover::after { width:100%; }
.nav-cta { font-family:var(--display); font-size:12.5px; font-weight:600;
  padding:8px 20px; border:1px solid var(--wire2); border-radius:8px;
  color:var(--chalk); background:rgba(255,255,255,.04); cursor:pointer;
  text-decoration:none; transition:all .2s; letter-spacing:.3px; }
.nav-cta:hover { background:rgba(255,255,255,.09); border-color:rgba(255,255,255,.22); }

/* ── Section label ── */
.sec-label { font-family:var(--mono); font-size:10.5px; letter-spacing:2px;
  color:var(--neon2); text-transform:uppercase; margin-bottom:16px; display:block; }

/* ── Cards ── */
.glass-card {
  background: rgba(28,28,38,.7);
  border: 1px solid var(--wire);
  border-radius: 20px;
  backdrop-filter: blur(12px);
  transition: border-color .3s, box-shadow .3s, transform .3s;
  position: relative; overflow: hidden;
}
.glass-card:hover {
  border-color: var(--wire2);
  box-shadow: 0 8px 48px rgba(0,0,0,.35), 0 0 0 1px rgba(99,102,241,.1);
  transform: translateY(-2px);
}

/* ── Stack tag ── */
.stag {
  display:inline-flex; align-items:center; gap:5px;
  padding:4px 11px; border-radius:99px;
  font-family:var(--mono); font-size:10.5px;
  background:rgba(99,102,241,.1); border:1px solid rgba(99,102,241,.2);
  color: #a5b4fc; white-space:nowrap;
  transition: background .2s, border-color .2s;
}
.stag:hover { background:rgba(99,102,241,.2); border-color:rgba(99,102,241,.4); }

/* ── Skill pill ── */
.spill {
  padding:6px 14px; border-radius:9px;
  font-family:var(--mono); font-size:11.5px; color:var(--ghost);
  background:rgba(255,255,255,.03); border:1px solid var(--wire);
  transition:all .2s; cursor:default;
}
.spill:hover { color:var(--chalk); border-color:var(--wire2); background:rgba(255,255,255,.07); }

/* ── Timeline ── */
.tl-dot { width:10px; height:10px; border-radius:50%; flex-shrink:0; margin-top:6px; }
.tl-dot.live { background:#10b981; box-shadow:0 0 0 3px rgba(16,185,129,.18), 0 0 14px rgba(16,185,129,.5);
  animation: glow-pulse 2s ease-in-out infinite; }
.tl-dot.past { background:var(--ghost); box-shadow:0 0 0 3px rgba(64,64,90,.3); }

/* ── Marquee ── */
.marquee-wrap { overflow:hidden; white-space:nowrap; border-top:1px solid var(--wire); border-bottom:1px solid var(--wire);
  padding:14px 0; background:var(--ink2); }
.marquee-inner { display:inline-flex; gap:0; animation: marquee 22s linear infinite; }
.marquee-item { font-family:var(--mono); font-size:12px; color:var(--ghost); padding:0 48px;
  display:inline-flex; align-items:center; gap:20px; }
.marquee-item::after { content:'·'; color:var(--wire2); }

/* ── Number big ── */
.stat-n { font-family:var(--serif); font-size:clamp(36px,5vw,54px); font-style:italic; line-height:1; }

/* ── Responsive ── */
@media(max-width:768px){
  .nav { padding:0 20px; }
  .nav-links { display:none; }
  .hero-grid { grid-template-columns:1fr !important; }
  .proj-metrics { grid-template-columns:repeat(3,1fr) !important; }
  .case-grid { grid-template-columns:1fr !important; }
  .skills-grid { grid-template-columns:1fr 1fr !important; }
}
`;

/* ═══════════════════════════════════════════════════════════════
   CURSOR
═══════════════════════════════════════════════════════════════ */
function Cursor() {
  const mouse = useMouse();
  const [hov, setHov] = useState<boolean>(false);
  useEffect(() => {
    const els = document.querySelectorAll("a,button,.glass-card,.spill,.stag");
    const on  = () => setHov(true);
    const off = () => setHov(false);
    els.forEach(el => { el.addEventListener("mouseenter", on); el.addEventListener("mouseleave", off); });
    return () => els.forEach(el => { el.removeEventListener("mouseenter", on); el.removeEventListener("mouseleave", off); });
  }, []);
  return (
    <>
      <div id="cursor" style={{ left: mouse.x, top: mouse.y, background: hov ? "#a78bfa" : "#6366f1", transform: `translate(-50%,-50%) scale(${hov ? 1.8 : 1})` }} />
      <div id="cursor-ring" style={{ left: mouse.x, top: mouse.y, width: hov ? 48 : 32, height: hov ? 48 : 32, borderColor: hov ? "rgba(167,139,250,.5)" : "rgba(99,102,241,.4)" }} />
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════
   NAV
═══════════════════════════════════════════════════════════════ */
function Nav() {
  const [solid, setSolid] = useState<boolean>(false);
  useEffect(() => {
    const h = () => setSolid(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <nav className={`nav${solid ? " solid" : ""}`}>
      <div className="nav-logo">
        <div style={{ width:7, height:7, borderRadius:"50%", background:"#10b981", boxShadow:"0 0 8px #10b981" }} />
        <span>tashif</span>.dev
      </div>
      <div className="nav-links">
        {["work","experience","skills","contact"].map(s => (
          <a key={s} href={`#${s}`} className="nav-link">_{s}</a>
        ))}
      </div>
      <a href="mailto:tashiftoor12345@gmail.com" className="nav-cta">Hire Me ↗</a>
    </nav>
  );
}

/* ═══════════════════════════════════════════════════════════════
   HERO
═══════════════════════════════════════════════════════════════ */
function Hero() {
  const typed = useTypewriter(["REST APIs.", "Django Systems.", "FastAPI Backends.", "Agentic Pipelines.", "SaaS Platforms."], 72, 2000);
  const [ref, inView] = useInView(0.05);

  return (
    <section ref={ref} style={{ minHeight:"100vh", display:"flex", alignItems:"center", position:"relative", padding:"120px 48px 80px", overflow:"hidden" }} className="grid-bg">
      {/* Ambient orbs */}
      {[
        { w:700, h:700, bg:"rgba(99,102,241,.09)", t:"-10%", l:"45%", blur:160 },
        { w:400, h:400, bg:"rgba(167,139,250,.07)", t:"60%",  l:"5%",  blur:120 },
        { w:300, h:300, bg:"rgba(16,185,129,.05)",  t:"20%",  l:"75%", blur:100 },
      ].map((o,i) => (
        <div key={i} style={{ position:"absolute", width:o.w, height:o.h, borderRadius:"50%", background:o.bg, top:o.t, left:o.l, filter:`blur(${o.blur}px)`, pointerEvents:"none", zIndex:0 }} />
      ))}

      {/* Decorative ring */}
      <div style={{ position:"absolute", right:"8%", top:"50%", transform:"translateY(-50%)", width:360, height:360, borderRadius:"50%", border:"1px solid var(--wire)", zIndex:0, pointerEvents:"none" }}>
        <div style={{ position:"absolute", inset:-1, borderRadius:"50%", border:"1px dashed rgba(99,102,241,.15)" }} />
        {/* Orbiting dot */}
        <div style={{ position:"absolute", top:"50%", left:"50%", width:"100%", height:"100%", animation:"spin-slow 18s linear infinite", marginLeft:"-50%", marginTop:"-50%", pointerEvents:"none" }}>
          <div style={{ position:"absolute", top:0, left:"50%", width:6, height:6, borderRadius:"50%", background:"#6366f1", boxShadow:"0 0 12px #6366f1", transform:"translateX(-50%) translateY(-50%)" }} />
        </div>
      </div>

      <div style={{ maxWidth:1200, width:"100%", margin:"0 auto", position:"relative", zIndex:1 }}>
        <div className="hero-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:80, alignItems:"center" }}>
          {/* Left */}
          <div>
            {/* Status */}
            <div className="in-up" style={{ animationDelay:".05s", display:"inline-flex", alignItems:"center", gap:9, padding:"5px 14px", background:"rgba(16,185,129,.08)", border:"1px solid rgba(16,185,129,.2)", borderRadius:99, marginBottom:40 }}>
              <div style={{ width:6, height:6, borderRadius:"50%", background:"#10b981", boxShadow:"0 0 7px #10b981", animation:"glow-pulse 2s infinite" }} />
              <span style={{ fontFamily:"var(--mono)", fontSize:11.5, color:"#6ee7b7" }}>Available · Backend & AI Systems Engineering</span>
            </div>

            {/* Headline */}
            <h1 className="in-up" style={{ animationDelay:".15s", fontFamily:"var(--serif)", fontWeight:700, fontSize:"clamp(44px,6.5vw,82px)", lineHeight:1.06, letterSpacing:"-1px", marginBottom:20 }}>
              I build systems<br />
              <em style={{ fontStyle:"italic", color:"rgba(232,232,240,.45)" }}>that ship</em><br />
              to production.
            </h1>

            {/* Terminal line */}
            <div className="in-up" style={{ animationDelay:".28s", fontFamily:"var(--mono)", fontSize:"clamp(13px,1.6vw,17px)", color:"rgba(232,232,240,.5)", marginBottom:36, display:"flex", alignItems:"center", gap:0 }}>
              <span style={{ color:"#818cf8", marginRight:8 }}>~/dev</span>
              <span style={{ color:"#34d399", marginRight:8 }}>❯</span>
              <span style={{ color:"rgba(232,232,240,.8)" }}>{typed}</span>
              <span style={{ animation:"blink 1.1s step-end infinite", color:"#6366f1", marginLeft:2 }}>█</span>
            </div>

            {/* Bio */}
            <p className="in-up" style={{ animationDelay:".38s", fontSize:15.5, lineHeight:1.8, color:"rgba(232,232,240,.5)", maxWidth:500, marginBottom:48 }}>
              Python Backend Developer. Currently at{" "}
              <span style={{ color:"var(--chalk)", fontWeight:600 }}>M1 Solution</span> architecting FastAPI services for live airline-ops. Led engineering teams at WorldWise & CodeCelix delivering production AI systems.
              {" "}<span style={{ color:"#818cf8" }}>3 companies. All in production.</span>
            </p>

            {/* CTAs */}
            <div className="in-up" style={{ animationDelay:".48s", display:"flex", gap:14, flexWrap:"wrap" }}>
              <a href="#work" style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"13px 28px", background:"var(--chalk)", color:"var(--ink)", borderRadius:11, fontFamily:"var(--display)", fontWeight:700, fontSize:14, textDecoration:"none", transition:"opacity .2s, transform .15s", letterSpacing:".2px" }}
                onMouseOver={e=>{e.currentTarget.style.opacity=".88";e.currentTarget.style.transform="translateY(-2px)"}}
                onMouseOut={e=>{e.currentTarget.style.opacity="1";e.currentTarget.style.transform="none"}}>
                View My Work →
              </a>
              <a href="https://github.com/TashifToor" target="_blank" rel="noreferrer" style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"12px 24px", border:"1px solid var(--wire2)", borderRadius:11, color:"var(--chalk)", fontFamily:"var(--display)", fontWeight:500, fontSize:14, textDecoration:"none", transition:"all .2s" }}
                onMouseOver={e=>e.currentTarget.style.borderColor="rgba(255,255,255,.28)"}
                onMouseOut={e=>e.currentTarget.style.borderColor="var(--wire2)"}>
                GitHub ↗
              </a>
            </div>

            {/* Stats */}
            <div className="in-up" style={{ animationDelay:".58s", display:"flex", gap:36, marginTop:60, paddingTop:40, borderTop:"1px solid var(--wire)", flexWrap:"wrap" }}>
              {[["3×","Team Lead Roles"],["94%","RAG Accuracy"],["30%","Latency Cut"],["60%","Faster Screening"]].map(([n,l]) => (
                <div key={l}>
                  <div className="stat-n" style={{ color:"var(--chalk)" }}>{n}</div>
                  <div style={{ fontFamily:"var(--mono)", fontSize:10.5, color:"var(--ghost)", marginTop:5, letterSpacing:.4 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — photo card */}
          <div className="in-right" style={{ animationDelay:".2s", display:"flex", justifyContent:"center" }}>
            <div className="drift" style={{ position:"relative", width:340 }}>
              {/* Photo placeholder with code-terminal aesthetic */}
              <div style={{ borderRadius:24, overflow:"hidden", border:"1px solid var(--wire2)", background:"var(--ink3)", boxShadow:"0 32px 80px rgba(0,0,0,.5), 0 0 0 1px rgba(99,102,241,.15)" }}>
                {/* Terminal header */}
                <div style={{ padding:"12px 16px", background:"var(--ink2)", borderBottom:"1px solid var(--wire)", display:"flex", alignItems:"center", gap:8 }}>
                  {["#ff5f57","#febc2e","#28c840"].map(c => <div key={c} style={{ width:10, height:10, borderRadius:"50%", background:c }} />)}
                  <span style={{ fontFamily:"var(--mono)", fontSize:10.5, color:"var(--ghost)", marginLeft:8 }}>tashif@prod:~</span>
                </div>
                {/* Photo area */}
                <div style={{ position:"relative", aspectRatio:"4/5", background:"linear-gradient(160deg, #16161e 0%, #0f0f16 100%)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <img src="/1.png" alt="Muhammad Tashif" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}
                    onError={e => { (e.target as HTMLImageElement).style.display="none"; }} />
                  {/* Code overlay on hover */}
                  <div style={{ position:"absolute", bottom:43, left:67, right:16, background:"rgba(12,12,16,.85)", borderRadius:10, padding:"12px 14px", backdropFilter:"blur(8px)", border:"1px solid var(--wire)" }}>
                    <div style={{ fontFamily:"var(--mono)", fontSize:10.5, color:"#6ee7b7", marginBottom:4 }}>$ whoami</div>
                    <div style={{ fontFamily:"var(--mono)", fontSize:11, color:"rgba(232,232,240,.6)" }}>Muhammad Tashif — Python Dev</div>
                  </div>
                </div>
              </div>
              {/* Floating badge */}
              <div style={{ position:"absolute", top:-18, right:-18, background:"var(--surface)", border:"1px solid var(--wire2)", borderRadius:14, padding:"10px 16px", boxShadow:"0 8px 30px rgba(0,0,0,.4)" }}>
                <div style={{ fontFamily:"var(--mono)", fontSize:10, color:"var(--ghost)", marginBottom:3 }}>current_role</div>
                <div style={{ fontFamily:"var(--display)", fontSize:13, fontWeight:700, color:"var(--chalk)" }}>Backend Dev @ M1</div>
              </div>
              <div style={{ position:"absolute", bottom:-18, left:-18, background:"var(--surface)", border:"1px solid rgba(16,185,129,.25)", borderRadius:14, padding:"10px 16px", boxShadow:"0 8px 30px rgba(0,0,0,.4)" }}>
                <div style={{ fontFamily:"var(--mono)", fontSize:10, color:"#6ee7b7", marginBottom:3 }}>status</div>
                <div style={{ fontFamily:"var(--display)", fontSize:13, fontWeight:700, color:"#10b981" }}>● Available</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MARQUEE
═══════════════════════════════════════════════════════════════ */
function Marquee() {
  const items = ["Django","FastAPI","PostgreSQL","LangChain","LangGraph","Docker","FAISS","Redis","RAG Systems","REST APIs","JWT Auth","Celery","ChromaDB","Next.js","React"];
  return (
    <div className="marquee-wrap">
      <div className="marquee-inner">
        {[...items,...items].map((it,i) => (
          <span key={i} className="marquee-item">{it}</span>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PROJECTS
═══════════════════════════════════════════════════════════════ */
function ProjectCard({ p, i }: { p: typeof PROJECTS[0]; i: number }) {
  const [ref, inView] = useInView(0.08);
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div ref={ref} className="glass-card" style={{
      padding:36, opacity: inView?1:0, transform: inView?"none":"translateY(28px)",
      transition:`opacity .7s ease ${i*.13}s, transform .7s cubic-bezier(.16,1,.3,1) ${i*.13}s`,
      background: p.grad,
    }}>
      {/* Accent bar */}
      <div style={{ position:"absolute", top:0, left:0, right:0, height:"2px", background:`linear-gradient(90deg, ${p.color}, transparent)`, borderRadius:"20px 20px 0 0" }} />
      {/* Scan line */}
      <div style={{ position:"absolute", left:0, right:0, height:"30%", background:`linear-gradient(transparent, rgba(255,255,255,.015), transparent)`, animation:"scan 4s ease-in-out infinite", pointerEvents:"none" }} />

      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:22, flexWrap:"wrap", gap:14 }}>
        <div>
          <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:8 }}>
            <span style={{ fontFamily:"var(--mono)", fontSize:10, color:"var(--ghost)", letterSpacing:1 }}>PROJECT_{p.num}</span>
            <span style={{ fontFamily:"var(--mono)", fontSize:10, color:"var(--ghost)" }}>· {p.year}</span>
          </div>
          <h3 style={{ fontFamily:"var(--serif)", fontSize:30, fontStyle:"italic", fontWeight:700, color:"var(--chalk)", lineHeight:1.1, marginBottom:6 }}>{p.name}</h3>
          <p style={{ fontFamily:"var(--mono)", fontSize:11.5, color:"var(--ghost)" }}>{p.sub}</p>
        </div>
        <a href="https://github.com/TashifToor" target="_blank" rel="noreferrer" style={{ padding:"7px 16px", background:"rgba(255,255,255,.04)", border:"1px solid var(--wire)", borderRadius:9, color:"var(--ghost)", fontFamily:"var(--mono)", fontSize:11, textDecoration:"none", transition:"all .2s", flexShrink:0 }}
          onMouseOver={e=>{e.currentTarget.style.color="var(--chalk)";e.currentTarget.style.borderColor="var(--wire2)"}}
          onMouseOut={e=>{e.currentTarget.style.color="var(--ghost)";e.currentTarget.style.borderColor="var(--wire)"}}>
          GitHub ↗
        </a>
      </div>

      {/* Stack */}
      <div style={{ display:"flex", flexWrap:"wrap", gap:7, marginBottom:28 }}>
        {p.stack.map(s => <span key={s} className="stag">{s}</span>)}
      </div>

      {/* Metrics */}
      <div className="proj-metrics" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12, marginBottom:24 }}>
        {p.metrics.map(m => (
          <div key={m.l} style={{ padding:"16px 18px", background:"rgba(255,255,255,.03)", border:`1px solid rgba(255,255,255,.06)`, borderRadius:13, textAlign:"center" }}>
            <div style={{ fontFamily:"var(--serif)", fontSize:28, fontStyle:"italic", color:p.color, lineHeight:1 }}>{m.v}</div>
            <div style={{ fontFamily:"var(--mono)", fontSize:10, color:"var(--ghost)", marginTop:5, lineHeight:1.4 }}>{m.l}</div>
          </div>
        ))}
      </div>

      {/* Case study toggle */}
      <button onClick={() => setOpen(!open)} style={{ background:"none", border:"none", cursor:"pointer", padding:0, display:"flex", alignItems:"center", gap:8, marginBottom: open ? 22 : 0 }}>
        <div style={{ width:18, height:18, borderRadius:5, border:`1px solid ${p.color}44`, display:"flex", alignItems:"center", justifyContent:"center" }}>
          <span style={{ fontFamily:"var(--mono)", fontSize:12, color:p.color, lineHeight:1 }}>{open?"−":"+"}</span>
        </div>
        <span style={{ fontFamily:"var(--mono)", fontSize:11.5, color:p.color }}>Engineering Case Study</span>
      </button>

      {open && (
        <div className="case-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, animation:"in-up .35s cubic-bezier(.16,1,.3,1)" }}>
          <div style={{ padding:18, background:"rgba(239,68,68,.05)", border:"1px solid rgba(239,68,68,.12)", borderRadius:12 }}>
            <div style={{ fontFamily:"var(--mono)", fontSize:9.5, color:"rgba(252,165,165,.6)", marginBottom:10, letterSpacing:1 }}>THE PROBLEM</div>
            <p style={{ fontSize:13, lineHeight:1.75, color:"rgba(232,232,240,.55)" }}>{p.problem}</p>
          </div>
          <div style={{ padding:18, background:"rgba(16,185,129,.04)", border:"1px solid rgba(16,185,129,.12)", borderRadius:12 }}>
            <div style={{ fontFamily:"var(--mono)", fontSize:9.5, color:"rgba(110,231,183,.6)", marginBottom:10, letterSpacing:1 }}>THE SOLUTION</div>
            <p style={{ fontSize:13, lineHeight:1.75, color:"rgba(232,232,240,.55)" }}>{p.solution}</p>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   EXPERIENCE
═══════════════════════════════════════════════════════════════ */
function Experience() {
  const [ref, inView] = useInView(0.08);
  return (
    <section id="experience" style={{ padding:"110px 48px" }}>
      <div ref={ref} style={{ maxWidth:860, margin:"0 auto", opacity:inView?1:0, transform:inView?"none":"translateY(24px)", transition:"all .7s cubic-bezier(.16,1,.3,1)" }}>
        <span className="sec-label">Professional Velocity</span>
        <h2 style={{ fontFamily:"var(--serif)", fontSize:"clamp(30px,4.5vw,50px)", fontWeight:700, fontStyle:"italic", color:"var(--chalk)", marginBottom:56, lineHeight:1.1 }}>
          Where I've shipped.
        </h2>
        <div style={{ display:"flex", flexDirection:"column", gap:0 }}>
          {EXP.map((e, i) => (
            <div key={i} style={{ display:"flex", gap:28, paddingBottom: i < EXP.length-1 ? 40 : 0 }}>
              <div style={{ display:"flex", flexDirection:"column", alignItems:"center", width:22, flexShrink:0 }}>
                <div className={`tl-dot ${e.live ? "live" : "past"}`} />
                {i < EXP.length-1 && <div style={{ flex:1, width:1, background:"var(--wire)", marginTop:10 }} />}
              </div>
              <div style={{ flex:1 }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:10, marginBottom:5 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:10, flexWrap:"wrap" }}>
                    <span style={{ fontFamily:"var(--display)", fontSize:15.5, fontWeight:700, color:"var(--chalk)" }}>{e.role}</span>
                    <span style={{ color:"var(--ghost)" }}>·</span>
                    <span style={{ fontFamily:"var(--display)", fontSize:15, fontWeight:600, color:"#818cf8" }}>{e.co}</span>
                    {e.live && <span style={{ padding:"2px 9px", background:"rgba(16,185,129,.1)", border:"1px solid rgba(16,185,129,.25)", borderRadius:99, fontFamily:"var(--mono)", fontSize:9.5, color:"#6ee7b7", letterSpacing:.5 }}>CURRENT</span>}
                  </div>
                  <span style={{ fontFamily:"var(--mono)", fontSize:11, color:"var(--ghost)" }}>{e.period}</span>
                </div>
                <div style={{ fontFamily:"var(--mono)", fontSize:11, color:"var(--ghost)", marginBottom:14 }}>{e.type}</div>
                {e.pts.map((pt, j) => (
                  <div key={j} style={{ display:"flex", gap:12, marginBottom:7 }}>
                    <span style={{ color:"#6366f1", fontFamily:"var(--mono)", fontSize:13, flexShrink:0, marginTop:1 }}>›</span>
                    <p style={{ fontSize:14, lineHeight:1.7, color:"rgba(232,232,240,.55)" }}>{pt}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Education note */}
        <div style={{ marginTop:48, padding:"20px 24px", background:"rgba(99,102,241,.06)", border:"1px solid rgba(99,102,241,.15)", borderRadius:14, display:"flex", alignItems:"center", gap:16 }}>
          <div style={{ width:36, height:36, borderRadius:10, background:"rgba(99,102,241,.15)", border:"1px solid rgba(99,102,241,.25)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, fontSize:18 }}>🎓</div>
          <div>
            <div style={{ fontFamily:"var(--display)", fontSize:14, fontWeight:600, color:"var(--chalk)", marginBottom:2 }}>B.Sc. Information Technology — University of the Punjab, Lahore</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SKILLS
═══════════════════════════════════════════════════════════════ */
function Skills() {
  const [ref, inView] = useInView(0.08);
  return (
    <section id="skills" style={{ padding:"110px 48px", background:"var(--ink2)" }}>
      <div ref={ref} style={{ maxWidth:1100, margin:"0 auto", opacity:inView?1:0, transform:inView?"none":"translateY(24px)", transition:"all .7s cubic-bezier(.16,1,.3,1)" }}>
        <span className="sec-label">Technical Arsenal</span>
        <h2 style={{ fontFamily:"var(--serif)", fontSize:"clamp(30px,4.5vw,50px)", fontWeight:700, fontStyle:"italic", color:"var(--chalk)", marginBottom:56, lineHeight:1.1 }}>
          What I deploy.
        </h2>
        <div className="skills-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16 }}>
          {Object.entries(SKILLS).map(([cat, { color, items }]) => (
            <div key={cat} className="glass-card" style={{ padding:24 }}>
              <div style={{ display:"flex", alignItems:"center", gap:9, marginBottom:18 }}>
                <div style={{ width:8, height:8, borderRadius:"50%", background:color, boxShadow:`0 0 10px ${color}` }} />
                <span style={{ fontFamily:"var(--mono)", fontSize:10.5, color, letterSpacing:1 }}>{cat.toUpperCase()}</span>
              </div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:7 }}>
                {items.map(s => <span key={s} className="spill">{s}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CONTACT
═══════════════════════════════════════════════════════════════ */
function Contact() {
  const [copied, setCopied] = useState<boolean>(false);
  const [ref, inView] = useInView(0.1);
  const copy = async () => {
    try { await navigator.clipboard.writeText("tashiftoor12345@gmail.com"); setCopied(true); setTimeout(()=>setCopied(false), 2200); } catch {}
  };
  return (
    <section id="contact" style={{ padding:"120px 48px" }} className="grid-bg">
      <div ref={ref} style={{ maxWidth:660, margin:"0 auto", textAlign:"center", opacity:inView?1:0, transform:inView?"none":"translateY(24px)", transition:"all .7s cubic-bezier(.16,1,.3,1)" }}>
        <span className="sec-label" style={{ display:"block", marginBottom:20 }}>Get In Touch</span>
        <h2 style={{ fontFamily:"var(--serif)", fontSize:"clamp(34px,5.5vw,64px)", fontWeight:700, fontStyle:"italic", lineHeight:1.08, color:"var(--chalk)", marginBottom:24 }}>
          Let's build something<br />that actually ships.
        </h2>
        <p style={{ fontSize:15.5, color:"rgba(232,232,240,.45)", lineHeight:1.8, marginBottom:50, maxWidth:440, margin:"0 auto 50px" }}>
          Open to backend engineering roles, AI systems contracts, and selective freelance engagements. I write code that runs in production — not in tutorials.
        </p>
        <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap", marginBottom:44 }}>
          <a href="mailto:tashiftoor12345@gmail.com" style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"13px 28px", background:"var(--chalk)", color:"var(--ink)", borderRadius:11, fontFamily:"var(--display)", fontWeight:700, fontSize:14, textDecoration:"none", transition:"opacity .2s, transform .15s" }}
            onMouseOver={e=>{e.currentTarget.style.opacity=".88";e.currentTarget.style.transform="translateY(-2px)"}}
            onMouseOut={e=>{e.currentTarget.style.opacity="1";e.currentTarget.style.transform="none"}}>
            tashiftoor12345@gmail.com →
          </a>
          <button onClick={copy} style={{ padding:"12px 22px", background:"rgba(255,255,255,.05)", border:"1px solid var(--wire2)", borderRadius:11, color:"var(--chalk)", fontFamily:"var(--mono)", fontSize:12, cursor:"pointer", transition:"all .2s" }}
            onMouseOver={e=>e.currentTarget.style.background="rgba(255,255,255,.09)"}
            onMouseOut={e=>e.currentTarget.style.background="rgba(255,255,255,.05)"}>
            {copied ? "✓ Copied!" : "Copy Email"}
          </button>
        </div>
        <div style={{ display:"flex", gap:28, justifyContent:"center", flexWrap:"wrap" }}>
          {[["GitHub","https://github.com/TashifToor"],["LinkedIn","https://linkedin.com/in/tashiftoor"],["+92-336-2715232","tel:+923362715232"]].map(([l,h]) => (
            <a key={l} href={h} target={h.startsWith("tel")||h.startsWith("mailto") ? "_self":"_blank"} rel="noreferrer"
              style={{ fontFamily:"var(--mono)", fontSize:12.5, color:"var(--ghost)", textDecoration:"none", transition:"color .2s", letterSpacing:.3 }}
              onMouseOver={e=>e.currentTarget.style.color="var(--chalk)"}
              onMouseOut={e=>e.currentTarget.style.color="var(--ghost)"}>
              {l}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   FOOTER
═══════════════════════════════════════════════════════════════ */
function Footer() {
  return (
    <footer style={{ padding:"22px 48px", borderTop:"1px solid var(--wire)", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:10 }}>
      <span style={{ fontFamily:"var(--mono)", fontSize:11, color:"var(--ghost)" }}>© 2026 Muhammad Tashif Munir Toor</span>
      <span style={{ fontFamily:"var(--mono)", fontSize:11, color:"var(--ghost)" }}>
        Built with Next.js · <span style={{ color:"#10b981" }}>●</span> Lahore, Pakistan
      </span>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ROOT
═══════════════════════════════════════════════════════════════ */
export default function Portfolio() {
  return (
    <>
      <style>{CSS}</style>
      <Cursor />
      <Nav />
      <Hero />
      <Marquee />
      <section id="work" style={{ padding:"110px 48px", background:"var(--ink2)" }}>
        <div style={{ maxWidth:960, margin:"0 auto" }}>
          <span className="sec-label">Proof of Work</span>
          <h2 style={{ fontFamily:"var(--serif)", fontSize:"clamp(30px,4.5vw,50px)", fontWeight:700, fontStyle:"italic", color:"var(--chalk)", marginBottom:52, lineHeight:1.1 }}>
            Systems I've architected.
          </h2>
          <div style={{ display:"flex", flexDirection:"column", gap:22 }}>
            {PROJECTS.map((p, i) => <ProjectCard key={p.id} p={p} i={i} />)}
          </div>
        </div>
      </section>
      <Experience />
      <Skills />
      <Contact />
      <Footer />
    </>
  );
}