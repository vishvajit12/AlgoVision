import { useNavigate }  from 'react-router-dom';
import AlgoRobot        from '../components/AlgoRobot';
import SpeechBubble     from '../components/SpeechBubble';
import ProblemCard      from '../components/ProblemCard';
import { PROBLEMS }     from '../data/problems';
import { useEffect, useRef, useState } from "react";
import { SiLeetcode, SiCodechef, SiCodeforces , SiGithub} from 'react-icons/si';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TOPICS }       from '../data/constants';
import { Swords } from 'lucide-react';
import { X } from 'lucide-react';
gsap.registerPlugin(ScrollTrigger);
import { Handshake } from 'lucide-react';
import { Mail } from 'lucide-react'; 
import { AtSign } from 'lucide-react';

const STATS = [['50+','Problems'],['15','Topics'],['3','Platforms'],['Free','Forever']];
const PLATFORMS = [
  { name: 'LeetCode',   color: '#FFA116', Icon: SiLeetcode },
  { name: 'CodeChef',   color: '#5B4638', Icon: SiCodechef },
  { name: 'Codeforces', color: '#1E88E5', Icon: SiCodeforces },
];

export default function HomePage({ user }) {
  const navigate         = useNavigate();
  const animated         = PROBLEMS.filter(p => p.animated);
  const displayTopics    = TOPICS.filter(t => t !== 'All');
  const container = useRef(null);

  // ── Phase 2 ship: only sail when section is in view ──
  const phase2Ref = useRef(null);
  const [shipActive, setShipActive] = useState(false);

  useEffect(() => {
    const el = phase2Ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShipActive(entry.isIntersecting);
      },
      { threshold: 0.01} // fires once 1% of the section is visible
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

//  useEffect(() => {
//   const ctx = gsap.context(() => {

//     gsap.utils.toArray(".section").forEach((section) => {
//       gsap.from(section, {
//         opacity: 0,
//         y: 80,
//         duration: 1,
//         ease: "power3.out",

//         scrollTrigger: {
//           trigger: section,
//           start: "top 40%",
//           end: "bottom 100%",
//           toggleActions: "play none none reverse",
//         },
        
//       });
    
// });

//   }, container);

//   return () => ctx.revert();
// }, []);

  return (
     <div ref={container} className="min-h-screen" >

      {/* ══════════════════════════════
          HERO
      ══════════════════════════════ */}
      <section
       className="relative overflow-hidden" 
        style={{background: 'linear-gradient(140deg,#F05D58,#DB5550)' }}
      >
        {/* Background wavy stripes (Boy-Coy style) */}
        <div className="absolute left-1/3 inset-y-0 right-0 pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute left-0 right-0 h-5 rounded-full"
              style={{ top:`${5 + i * 9.5}%`, background:'rgba(0,0,0,0.05)' }}
            />
          ))}
        </div>

        {/* Main hero row */}
        <div className="relative z-10 max-w-5xl mx-auto px-2 pt-0.7 pb-0 flex items-center gap-8 flex-wrap">

          {/* ── Left: Text ── */}
          <div className="flex-none w-100 fade-up">
            {/* Handwritten accent */}
            <p className="text-white/60 italic text-sm mb-4 flex items-center gap-2">
              <span className="text-xl"><Swords /></span>
             no more wall of text!
            </p>

            {/* Personalised greeting */}
            {user?.name && (
              <p className="text-white/80 text-sm font-semibold mb-3">
                Welcome back, <span className="text-white font-black">{user.name}</span>🤝
              </p>
            )}

            <h1
              className="text-white font-black leading-none mb-5 tracking-tighter"
              style={{ fontSize:'clamp(40px,5vw,66px)' }}
            >
              Algorithms<br />come alive..!
            </h1>

            <p className="text-white/75 leading-relaxed mb-8 text-base max-w-xs">
              AnimeCode visualises every algorithm step&nbsp;by&nbsp;step.
              Watch, pause, rewind and actually understand.
            </p>

            {/* CTAs */}
            <div className="flex gap-3 flex-wrap">
              <button
                onClick={() => navigate('/browse')}
                className="bg-white text-coral font-black px-7 py-3 rounded-xl text-sm
                           shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all"
              >
                Browse Problems →
              </button>
              <button
                onClick={() => navigate('/problem/7', { state:{ problem: PROBLEMS[6] } })}
                className="text-white font-bold px-7 py-3 rounded-xl text-sm
                           border-2 border-white/40 hover:bg-white/10 transition-all"
              >
                ▶ Watch Demo
              </button>
            </div>

            <p className="mt-5 text-white/40 text-xs italic flex items-center gap-1.5">
              <span className="text-base">↗</span>
              learn any algorithm visually, free forever
            </p>
          </div>

          {/* ── Right: Robot ── */}
          <div className="flex-1 min-w-64 relative flex items-end justify-center" style={{ minHeight:360 }}>
            <div className="bubble-pop absolute top-5 right-4 z-10">
              <SpeechBubble />
            </div>
            <div className="relative z-0 mt-10">
              <AlgoRobot />
            </div>
          </div>
        </div>

        {/* ── Stats bar ── */}
        <div
          className="relative z-10 mt-4 flex gap-10 justify-center flex-wrap px-8 py-4"
          style={{ background:'rgba(0,0,0,0.13)' }}
        >
          {STATS.map(([n, l]) => (
            <div key={l} className="text-center">
              <div className="text-white font-black text-2xl">{n}</div>
              <div className="text-white/50 text-xs font-medium mt-0.5">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════
          ANIMATED PROBLEMS
      ══════════════════════════════ */}
      <section className="py-14 px-8" style={{ background:'#DBDDCB', zIndex: 11 }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-ink font-black text-2xl mb-1 tracking-tight">
            Animated problems
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Interactive step-by-step visualisations not just static images.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {animated.slice(2, 7).map(p => <ProblemCard key={p.id} problem={p} />)}
            {animated.length > 5 && (
              <div
                onClick={() => navigate('/browse')}
                className="cursor-pointer bg-white rounded-2xl p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-slate-200"
              >
                <div className="flex h-full flex-col justify-between">
                  <div>
                    <div className="text-xs font-mono text-gray-300 mb-2">Many more problems</div>
                    <p className="font-bold text-sm text-ink leading-snug mb-3">
                      Explore more animations
                    </p>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      Click to view the full animated problems list and jump to any problem page.
                    </p>
                  </div>
                  <div className="mt-4 flex items-center justify-between pt-1 border-t border-slate-50">
                    <span className="text-coral text-xs font-bold">View all</span>
                    <span className="text-xs font-mono text-gray-300">→</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          HOW IT WORKS
      ══════════════════════════════ */}
      <section className="py-14 px-8 bg-[#E0E0C0]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-ink font-black text-2xl mb-1 tracking-tight">
            How AnimeCode works
          </h2>
          <p className="text-gray-400 text-sm mb-10">Three steps to understanding any algorithm.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
            {[
              { num:'01', icon:'💡', title:'Read the Walkthrough',
                desc:'Every problem has a numbered step-by-step solution breakdown above the animation so you know what to expect.' },
              { num:'02', icon:'▶', title:'Watch the Animation',
                desc:'Switch between 3 real test cases. Press Play or step through manually — control the pace entirely.' },
              { num:'03', icon:'💻', title:'Study the Code',
                desc:'Clean C++ and Python solutions with a one-click copy button. See exactly how the algorithm maps to code.' },
            ].map(({ num, icon, title, desc }) => (
              <div
                key={num}
                className="rounded-2xl p-6 border border-slate-100 hover:border-coral/30
                           hover:shadow-lg transition-all duration-200 group bg-white"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-black text-gray-200 font-mono">{num}</span>
                  <span className="text-2xl">{icon}</span>
                </div>
                <h3 className="font-black text-ink text-base mb-2 group-hover:text-coral transition-colors">
                  {title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          TOPICS
      ══════════════════════════════ */}
      <section className="section  py-14 px-8" style={{ background:'#DBDDCB' }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-ink font-black text-2xl mb-1 tracking-tight">
            Browse by topic
          </h2>
          <p className="text-gray-500 text-sm mb-7">
            15 categories — Arrays to Tries, DP to Graphs.
          </p>
          <div className="flex flex-wrap gap-2">
            {displayTopics.map(t => (
              <button
                key={t}
                onClick={() => navigate('/browse')}
                className="px-4 py-2 rounded-full text-sm font-semibold border border-slate-300
                           text-ink bg-white hover:bg-coral hover:text-white hover:border-coral
                           transition-all duration-200"
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          PLATFORMS BANNER
      ══════════════════════════════ */}
       <section className="section  py-12 px-8 bg-[#E0E0C0]" >
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-gray-400 text-xs uppercase tracking-widest font-bold mb-6">
          Problems sourced from
        </p>
        <div className="flex justify-center gap-10 flex-wrap items-center">
          {PLATFORMS.map(({ name, color, Icon }) => (
            <div key={name} className="flex items-center gap-2.5 group">
              <Icon
                className="text-2xl transition-all group-hover:scale-105"
                style={{ color }}
              />
              <span
                className="font-black text-lg tracking-tight transition-all group-hover:scale-105"
                style={{ color }}
              >
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
      {/* ══════════════════════════════
          PHASE 2 TEASER
      ══════════════════════════════ */}
       <section
         ref={phase2Ref}
         className="section py-20 px-8 text-center bg-[#323133] relative overflow-hidden"
       >
         <style>{`
           @keyframes ship-sail {
             0%   { transform: translateX(110vw); }
             100% { transform: translateX(-110vw); }
           }
           .ship-floating {
             animation: ship-sail 25s linear infinite;
             animation-play-state: paused;
           }
           .ship-floating.ship-sail-active {
             animation-play-state: running;
           }
         `}</style>
         <img
           src="/sunny2-removebg-preview.png" alt="Sunny"
           className={`ship-floating ${shipActive ? 'ship-sail-active' : ''} pointer-events-none absolute right-0 bottom-0 w-60 opacity-90 hidden sm:block`}
         />
         <div className="max-w-xl mx-auto">
          <span
            className="inline-block px-4 py-1 rounded-full text-xs font-bold mb-5 tracking-widest border"
            style={{ color:'#348681', background:'rgba(52,134,129,.15)', borderColor:'rgba(52,134,129,.3)' }}
          >
            PHASE 2 — COMING SOON
          </span>
          <h2 className="text-white font-black text-3xl mb-3 tracking-tight">
            AI Animation Engine
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed mb-8">
            Paste any coding problem. Receive a fully animated explanation with
            C++ and Python solutions in seconds.
          </p>
          {/* Fake terminal */}
          <div
            className="text-left rounded-2xl p-5 font-mono text-xs leading-8"
            style={{ background:'#252523', border:'1px solid #323230' }}
          >
            <div>
              <span style={{ color:'#F05D58' }}>$</span>
              <span className="text-gray-400"> animecode generate </span>
              <span style={{ color:'rgba(52,134,129,.8)' }}>
                "find two numbers summing to target..."
              </span>
            </div>
            <div style={{ color:'#348681' }}>✓ Analysing problem…</div>
            <div className="text-gray-700">✓ Generating animation steps…</div>
            <div className="text-gray-700">✓ Writing C++ &amp; Python…</div>
            <div className="text-gray-700">✓ Computing time complexity…</div>
            <div style={{ color:'#4caf50' }}>✓ Done in 2.3 s 🚀</div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          FOOTER
      ══════════════════════════════ */}
      <footer className="py-2 px-2 border-t border-slate-100 bg-[#2c2b2e]">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-start gap-1">
            <div className="w-7 h-7 rounded-lg bg-coral flex items-center justify-center text-white font-black text-sm">A</div>
            <span className="text-white font-black text-lg tracking-tight">
          Anime<span className="opacity-60">Code</span>
        </span>
          </div>
          <p className="text-gray-400 text-xs text-center font-['Poppins']">
            • Open Source • Crafted by Vishvajit for Every Developer ⛵︎
          </p>
          <div className="flex gap-4">
            {[[<Mail />,'mailto:vishvajit6264@gmail.com'],[ <AtSign />,'https://linkedin.com/in/vishvajit-shinde']].map(([icon, href]) => (
              <a key={href+icon} href={href}
                className="text-gray-400 w-5 h-5 hover:text-coral transition-colors text-base">
                {icon}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}