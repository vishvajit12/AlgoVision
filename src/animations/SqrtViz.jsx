// src/animations/SqrtViz.jsx
const TEAL   = '#348681';
const GREEN  = '#4caf50';
const RED    = '#ef5350';
const AMBER  = '#f5a623';
const MID    = '#2A2A28';

export default function SqrtViz({ step, test }) {
  const s = test.steps[Math.min(step, test.steps.length - 1)] || {};

  if (s.phase === 'shortcut') {
    return (
      <div className="px-6 py-5 font-mono">
        <code className="text-gray-500 text-xs block mb-6">x = {test.x}</code>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 flex items-center justify-center rounded-2xl text-3xl font-bold"
            style={{ background: `${GREEN}1a`, border: `2.5px solid ${GREEN}`, color: GREEN, boxShadow: `0 0 16px ${GREEN}55` }}>
            {test.x}
          </div>
          <span className="text-2xl text-gray-600">→</span>
          <div className="w-20 h-20 flex items-center justify-center rounded-2xl text-3xl font-bold"
            style={{ background: `${GREEN}1a`, border: `2.5px solid ${GREEN}`, color: GREEN, boxShadow: `0 0 16px ${GREEN}55` }}>
            {s.ans}
          </div>
        </div>
        <div className="px-4 py-3 rounded-xl text-sm leading-relaxed" style={{ background: 'rgba(76,175,80,.1)', border: '1px solid rgba(76,175,80,.35)', color: GREEN }}>
          {s.desc}
        </div>
      </div>
    );
  }

  const low = s.low, high = s.high, mid = s.mid;
  const rangeMax = test.x || 1;

  const posPct = (v) => rangeMax === 0 ? 0 : (v / rangeMax) * 100;

  return (
    <div className="px-6 py-5 font-mono">
      <code className="text-gray-500 text-xs block mb-1">x = {test.x}</code>

      {/* Phase badge */}
      <div className="mb-8">
        <span
          className="inline-block text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full font-bold transition-all duration-300"
          style={{
            background: s.phase === 'done' || s.phase === 'exact' ? 'rgba(76,175,80,.12)' : s.phase === 'too-big' ? 'rgba(239,83,80,.12)' : `${TEAL}1a`,
            color: s.phase === 'done' || s.phase === 'exact' ? GREEN : s.phase === 'too-big' ? RED : TEAL,
            border: `1px solid ${(s.phase === 'done' || s.phase === 'exact') ? 'rgba(76,175,80,.35)' : s.phase === 'too-big' ? 'rgba(239,83,80,.35)' : `${TEAL}33`}`,
          }}
        >
          {s.phase === 'init' && 'Starting Search'}
          {s.phase === 'compute' && 'Computing mid × mid'}
          {s.phase === 'exact' && 'Perfect Square Found! ✅'}
          {s.phase === 'too-big' && 'Too Big — Search Left'}
          {s.phase === 'save-right' && 'Valid Candidate — Search Right'}
          {s.phase === 'narrow' && 'Narrowing Range'}
          {s.phase === 'done' && 'Done ✅'}
        </span>
      </div>

      {/* Number line */}
      <div className="relative mb-8" style={{ height: 70 }}>
        <div className="absolute w-full h-1 rounded-full" style={{ top: 30, background: '#2e2e2c' }} />

        {low !== null && low !== undefined && (
          <div className="absolute text-[10px] font-bold px-1.5 py-0.5 rounded transition-all duration-450 ease-out"
            style={{ top: 40, left: `calc(${posPct(low)}% - 14px)`, color: AMBER, background: `${AMBER}1a`, border: `1px solid ${AMBER}66` }}>
            low={low}
          </div>
        )}
        {high !== null && high !== undefined && (
          <div className="absolute text-[10px] font-bold px-1.5 py-0.5 rounded transition-all duration-450 ease-out"
            style={{ top: 40, left: `calc(${posPct(high)}% - 14px)`, color: RED, background: `${RED}1a`, border: `1px solid ${RED}66` }}>
            high={high}
          </div>
        )}
        {mid !== null && mid !== undefined && (
          <div className="absolute flex flex-col items-center transition-all duration-450 ease-out" style={{ top: -8, left: `calc(${posPct(mid)}% - 18px)` }}>
            <div
              className="w-9 h-9 flex items-center justify-center rounded-full text-sm font-bold"
              style={{
                border: `2.5px solid ${s.phase === 'exact' ? GREEN : TEAL}`,
                background: s.phase === 'exact' ? `${GREEN}22` : `${TEAL}22`,
                color: s.phase === 'exact' ? GREEN : TEAL,
                boxShadow: `0 0 12px ${s.phase === 'exact' ? GREEN : TEAL}55`,
              }}
            >
              {mid}
            </div>
          </div>
        )}
      </div>

      {/* mid*mid computation card */}
      {mid !== null && mid !== undefined && s.sq !== null && (
        <div className="flex items-center gap-4 mb-6 flex-wrap">
          <Readout label={`${mid} × ${mid}`} value={s.sq} color={s.phase === 'exact' ? GREEN : s.phase === 'too-big' ? RED : TEAL} glow />
          <span className="text-xl text-gray-600">vs</span>
          <Readout label="x" value={test.x} color={AMBER} />
        </div>
      )}

      {/* ans readout */}
      <div className="flex gap-6 mb-4">
        <Readout label="ans (best so far)" value={s.ans ?? 0} color={GREEN} glow={s.phase === 'save-right' || s.phase === 'exact' || s.phase === 'done'} />
      </div>

      {/* Step description */}
      <div
        className="px-4 py-3 rounded-xl text-sm leading-relaxed"
        style={{
          background: (s.phase === 'done' || s.phase === 'exact') ? 'rgba(76,175,80,.1)' : s.phase === 'too-big' ? 'rgba(239,83,80,.08)' : 'rgba(255,255,255,.04)',
          border: `1px solid ${(s.phase === 'done' || s.phase === 'exact') ? 'rgba(76,175,80,.35)' : s.phase === 'too-big' ? 'rgba(239,83,80,.35)' : '#2e2e2c'}`,
          color: (s.phase === 'done' || s.phase === 'exact') ? GREEN : s.phase === 'too-big' ? RED : '#ccc',
        }}
      >
        {s.desc}
      </div>
    </div>
  );
}

function Readout({ label, value, color, glow }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-widest mb-1 text-gray-600">{label}</div>
      <div
        className="min-w-14 h-11 flex items-center justify-center rounded-xl text-lg font-bold px-3 transition-all duration-300"
        style={{ background: `${color}1a`, border: `1.5px solid ${color}55`, color, boxShadow: glow ? `0 0 12px ${color}66` : 'none', transform: glow ? 'scale(1.08)' : 'scale(1)' }}
      >
        {value}
      </div>
    </div>
  );
}