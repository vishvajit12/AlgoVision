import { useState } from 'react';
import { Mail } from 'lucide-react';
import { Link } from 'lucide-react';
import { Star } from 'lucide-react';
import { GitFork } from 'lucide-react';
import { Laptop } from 'lucide-react';

import { Smartphone } from 'lucide-react';
const PLATFORMS  = ['LeetCode','CodeChef','Codeforces','AtCoder','HackerRank','GeeksforGeeks'];
const CORAL      = '#F05D58';
const TEAL       = '#348681';

// ── Google Form wiring ──
const GOOGLE_FORM_ACTION = 'https://docs.google.com/forms/d/e/1FAIpQLSf_5Rkkhe-odWlMH5jHHMj5GLvYN4IPPHaxOlV-3SeTUzY8CQ/viewform?usp=dialog';
const ENTRY_IDS = {
  name:        'entry.1644540531',
  email:       'entry.179061092',
  platform:    'entry.1814786671',
  qNum:        'entry.2071149161',
  explanation: 'entry.1379587854',
  animIdea:    'entry.560603829',
};

export default function ContactPage() {
  const [form, setForm] = useState({
    name:'', email:'', platform:'LeetCode',
    qNum:'', explanation:'', animIdea:'',
  });
  const [sent,    setSent]    = useState(false);
  const [loading, setLoading] = useState(false);

  const sf = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.email.trim()) {
      alert('Please fill in your name and email!');
      return;
    }
    setLoading(true);

    const data = new FormData();
    data.append(ENTRY_IDS.name,        form.name);
    data.append(ENTRY_IDS.email,       form.email);
    data.append(ENTRY_IDS.platform,    form.platform);
    data.append(ENTRY_IDS.qNum,        form.qNum);
    data.append(ENTRY_IDS.explanation, form.explanation);
    data.append(ENTRY_IDS.animIdea,    form.animIdea);

    try {
      await fetch(GOOGLE_FORM_ACTION, {
        method: 'POST',
        mode:   'no-cors',   // Google Forms doesn't return CORS headers; required
        body:   data,
      });
      // no-cors means we can't read the response, so we optimistically assume success
      setForm({ name:'', email:'', platform:'LeetCode', qNum:'', explanation:'', animIdea:'' });
      setSent(true);
      setTimeout(() => setSent(false), 4000);
    } catch {
      alert('Network error. Please try again!');
    }
    setLoading(false);
  };

  /* Shared input style for notepad fields */
  const noteInput = (extra = {}) => ({
    fontFamily: 'Georgia, serif',
    fontSize: 13,
    color: '#333',
    background: 'transparent',
    border: 'none',
    borderBottom: '2px solid rgba(150,140,0,.3)',
    outline: 'none',
    padding: '2px 0 4px',
    ...extra,
  });

  return (
    <div className="min-h-screen px-6 md:px-10 py-14 " style={{ background:'#E0E0C0' }}>
      <div className="max-w-4xl mx-auto">

        {/* ── Page header ── */}   
        <div className="text-center mb-14 mt-0">
          <span
            className="inline-block px-4 py-1 rounded-full text-xs font-bold
                       tracking-widest mb-5 border"
            style={{ color: TEAL, background:`${TEAL}20`, borderColor:`${TEAL}40` }}
          >
            OPEN SOURCE PROJECT
          </span>
          <h1 className="text-ink font-black text-4xl tracking-tight mb-3">
            Contribute to AlgoVision
          </h1>
          <p className="text-gray-500 text-sm max-w-md mx-auto leading-relaxed">
            Help us build the world's first visual algorithm platform.
            Bring your question — we'll animate it for everyone.
          </p>
        </div>

        {/* ── Two-column layout ── */}
        <div className="flex gap-10 items-start flex-wrap">

          {/* ══════════════════════════════
              LEFT: ENVELOPE + NOTEPAD
          ══════════════════════════════ */}
          <div className="flex-1 min-w-80">
 
            {/* Notepad pin */}
            <div className="flex justify-center relative z-20 -mb-px">
              <div
                className="w-7 h-7 rounded-full border-2 shadow-lg"
                style={{
                  background: 'linear-gradient(135deg,#f0f0ee,#c8c8c6)',
                  borderColor: '#b0b0ae',
                }}
              />
            </div>

            {/* ── Notepad ── */}
            <div
              className="relative z-10 mx-5 rounded-t-sm px-7 pt-6 pb-8 shadow-2xl"
              style={{
                background: '#FFFDE7',
                backgroundImage:
                  'repeating-linear-gradient(transparent,transparent 27px,rgba(130,120,0,.22) 27px,rgba(130,120,0,.22) 28px)',
                backgroundSize:     '100% 28px',
                backgroundPosition: '0 38px',
              }}
            >
              <p
                className="mb-8 mt-4 italic"
                style={{ fontFamily:'Georgia,serif', fontSize:16, color:'#555' }}
              >
                Dear AlgoVision…
              </p>

              <div className="flex flex-col gap-4">
                {/* Name */}
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span style={{ fontFamily:'Georgia,serif', fontSize:13, color:'#777' }}>My name is</span>
                  <input
                    value={form.name}
                    onChange={e => sf('name', e.target.value)}
                    placeholder="Your name"
                    style={{ ...noteInput(), flex:1, minWidth:100 }}
                  />
                </div>

                {/* Email */}
                <div className="flex items-baseline gap-2 mt-3 flex-wrap">
                  <span style={{ fontFamily:'Georgia,serif', fontSize:13, color:'#777' }}>email me at</span>
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => sf('email', e.target.value)}
                    placeholder="your@email.com"
                    style={{ ...noteInput(), flex:1, minWidth:140 }}
                  />
                </div>

                {/* Platform + Q# */}
                <div className="flex items-baseline gap-2 mt-3 flex-wrap">
                  <span style={{ fontFamily:'Georgia,serif', fontSize:13, color:'#777' }}>Platform:</span>
                  <select
                    value={form.platform}
                    onChange={e => sf('platform', e.target.value)}
                    style={{ ...noteInput(), cursor:'pointer' }}
                  >
                    {PLATFORMS.map(p => <option key={p}>{p}</option>)}
                  </select>
                  <span style={{ fontFamily:'Georgia,serif', fontSize:13, color:'#777', marginLeft:8 }}>Q&nbsp;#:</span>
                  <input
                    value={form.qNum}
                    onChange={e => sf('qNum', e.target.value)}
                    placeholder="e.g. 42"
                    style={{ ...noteInput(), width:64 }}
                  />
                </div>

                {/* Solution / explanation */}
                <div className='mt-4'>
                  <div style={{ fontFamily:'Georgia,serif', fontSize:13, color:'#777', marginBottom:2 }}>
                    I'd like to contribute my solution:
                  </div>
                  <textarea
                    value={form.explanation}
                    onChange={e => sf('explanation', e.target.value)}
                    rows={3}
                    placeholder="Describe the algorithm, key steps, edge cases…"
                    style={{ ...noteInput({ resize:'none', lineHeight:1.8, width:'100%' }) }}
                  />
                </div>

                {/* Animation idea */}
                <div className='mt-4'>
                  <div style={{ fontFamily:'Georgia,serif', fontSize:13, color:'#777', marginBottom:10 }}>
                    Animation idea:
                  </div>
                  <textarea
                    value={form.animIdea}
                    onChange={e => sf('animIdea', e.target.value)}
                    rows={2}
                    placeholder="What to visualise? Arrays, trees, pointers…"
                    style={{ ...noteInput({ resize:'none', lineHeight:1.8, width:'100%' }) }}
                  />
                </div>
              </div>

              {/* Submit button */}
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="mt-14 px-8 py-2.5 rounded-full text-white text-sm font-black
                           shadow-lg transition-all duration-300 flex items-center gap-2"
                style={{
                  background: sent ? '#4caf50' : loading ? '#aaa' : CORAL,
                  cursor: loading ? 'wait' : 'pointer',
                }}
              >
                {sent    ? '✓ Sent — Thank you!' :
                 loading ? 'Sending…' :
                           'CONTRIBUTE ▶'}
              </button>
            </div>

            {/* ── Envelope body ── */}
            <div
              className="relative overflow-hidden shadow-2xl rounded-b-2xl"
              style={{ height:130, background:'white' }}
            >
              {/* Airmail stripes top */}
              <div
                className="absolute top-0 left-0 right-0 h-2.5"
                style={{
                  background:
                    'repeating-linear-gradient(90deg,#E53935 0,#E53935 10px,white 10px,white 14px,#1976D2 14px,#1976D2 24px,white 24px,white 28px)',
                }}
              />

              {/* V-fold shadow lines */}
              <svg className="absolute inset-0 w-full" style={{ height:80, top:10 }}>
                <line x1="0" y1="0" x2="50%" y2="65" stroke="#e8e8e6" strokeWidth="1" />
                <line x1="100%" y1="0" x2="50%" y2="65" stroke="#e8e8e6" strokeWidth="1" />
              </svg>

              {/* Airmail stripes bottom */}
              <div
                className="absolute bottom-0 left-0 right-0 h-2.5"
                style={{
                  background:
                    'repeating-linear-gradient(90deg,#1976D2 0,#1976D2 10px,white 10px,white 14px,#E53935 14px,#E53935 24px,white 24px,white 28px)',
                }}
              />

              {/* Open Source label */}
              <div
                className="absolute bottom-4 left-4 text-white text-xs font-black
                           tracking-widest px-3 py-1 rounded"
                style={{ background:'#1565C0', letterSpacing:'0.12em' }}
              >
                OPEN SOURCE
              </div>

              {/* Stamp */}
              <div
                className="absolute bottom-3.5 right-4 w-14 h-14 rounded-full
                           flex flex-col items-center justify-center border-2 border-dashed border-white/40"
                style={{ background:'radial-gradient(circle at 35% 35%,#FFA726,#E65100)' }}
              >
                <span className="text-xl"><Laptop /></span>
                <span className="text-white font-black" style={{ fontSize:5, letterSpacing:'0.04em' }}>
                  ALGOVISION
                </span>
              </div>
            </div>
          </div>

          {/* ══════════════════════════════
              RIGHT: CONTACT INFO
          ══════════════════════════════ */}
          <div className="w-52 min-w-44 shrink-0">
            <h3 className="text-ink font-black text-xl mb-2">Get in Touch</h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-7">
              Open to contributions, collaborations and feedback!
            </p>

            {[
              { icon:<Mail />, text:'vishvajit6264@gmail.com', href:'mailto:vishvajit6264@gmail.com' },
              { icon:<Smartphone />, text:'+91 8261849093',          href:'tel:+918261849093'              },
              { icon:<Link />, text:'LinkedIn',                 href:'https://linkedin.com/in/vishvajit-shinde'           },
            ].map(({ icon, text, href }) => (
              <a
                key={text}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-500 hover:text-coral
                           text-sm mb-4 transition-colors duration-200"
              >
                <span className="text-xl w-7 shrink-0">{icon}</span>
                <span className="truncate">{text}</span>
              </a>
            ))}

            {/* Why contribute box */}
            <div
              className="mt-7 p-4 rounded-2xl border"
              style={{ background:'#1a1a18', borderColor:'#2e2e2c' }}
            >
              <p
                className="text-xs font-black tracking-wider mb-3 uppercase"
                style={{ color: TEAL }}
              >
                Why Contribute?
              </p>
              <p className="text-gray-600 text-xs leading-relaxed mb-4">
                Every problem you submit gets a beautiful animation that helps
                thousands of developers and students understand algorithms.
              </p>
              <div className="flex gap-2">
                <span
                  className="px-3 py-1.5 rounded-lg text-xs font-bold"
                  style={{ background:`${TEAL}18`, border:`1px solid ${TEAL}33`, color: TEAL }}
                >
                   <Star /> Star
                </span>
                <span
                  className="px-3 py-1.5 rounded-lg text-xs font-bold"
                  style={{ background:`${CORAL}15`, border:`1px solid ${CORAL}33`, color: CORAL }}
                >
                  <GitFork /> Fork
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}