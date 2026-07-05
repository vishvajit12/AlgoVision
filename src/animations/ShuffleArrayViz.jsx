// src/animations/ShuffleArrayViz.jsx
const TEAL   = '#348681';
const GREEN  = '#4caf50';
const AMBER  = '#f5a623';
const PURPLE = '#a78bfa';
const MID    = '#2A2A28';

const BOX = 52;
const GAP = 14;

export default function ShuffleArrayViz({ step, test }) {
  const s = test.steps[Math.min(step, test.steps.length - 1)] || {};
  const arr = s.arr || [];
  const original = s.original || test.original || [];

  const xFor = (idx) => idx * (BOX + GAP);
  const rowWidth = arr.length * BOX + Math.max(0, arr.length - 1) * GAP;

  const isSwapping = s.phase === 'swap';

  return (
    <div className="px-6 py-5 font-mono">
      <code className="text-gray-500 text-xs block mb-1">
        {s.op === 'init' ? `new Solution(${JSON.stringify(test.original)})` : `${s.op}()`}
      </code>

      {/* Randomness disclaimer + phase badge */}
      <div className="mb-6 flex gap-2 flex-wrap">
        <span
          className="inline-block text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full font-bold transition-all duration-300"
          style={{
            background: s.phase === 'result' ? 'rgba(76,175,80,.12)' : s.phase === 'reset' ? `${PURPLE}1a` : `${TEAL}1a`,
            color: s.phase === 'result' ? GREEN : s.phase === 'reset' ? PURPLE : TEAL,
            border: `1px solid ${s.phase === 'result' ? 'rgba(76,175,80,.35)' : s.phase === 'reset' ? `${PURPLE}44` : `${TEAL}33`}`,
          }}
        >
          {s.phase === 'construct' && 'Constructor — Saving Original'}
          {s.phase === 'pick-j' && '🎲 Picking Random j'}
          {s.phase === 'swap' && 'Swapping'}
          {s.phase === 'loop-end' && 'Loop Complete'}
          {s.phase === 'result' && 'shuffle() Result'}
          {s.phase === 'reset' && 'reset() — Restoring Original'}
        </span>
        {(s.phase === 'pick-j' || s.phase === 'swap' || s.phase === 'result') && (
          <span className="inline-block text-[10px] px-2.5 py-1 rounded-full font-bold" style={{ background: `${AMBER}14`, color: AMBER, border: `1px solid ${AMBER}33` }}>
            ⚠️ one possible random outcome — every permutation is equally likely
          </span>
        )}
      </div>

      {/* Original reference row */}
      <div className="mb-5">
        <div className="text-xs uppercase tracking-widest mb-2 text-gray-600">original (saved, never changes)</div>
        <div className="flex gap-3.5">
          {original.map((v, i) => (
            <div key={i} className="w-11 h-11 flex items-center justify-center text-base font-bold rounded-lg"
              style={{ border: '2px solid #3e3e3c', background: '#1c1c1a', color: '#666' }}>
              {v}
            </div>
          ))}
        </div>
      </div>

      {/* Live arr row */}
      <div className="relative mb-6" style={{ width: rowWidth + 20, paddingTop: 34 }}>
        {s.i !== null && s.i !== undefined && (
          <div className="absolute text-[10px] font-bold px-1.5 py-0.5 rounded transition-all duration-450 ease-out"
            style={{ top: 0, left: xFor(s.i) + BOX / 2 - 10, color: AMBER, background: `${AMBER}1a`, border: `1px solid ${AMBER}66` }}>
            i
          </div>
        )}
        {s.j !== null && s.j !== undefined && (
          <div className="absolute text-[10px] font-bold px-1.5 py-0.5 rounded transition-all duration-450 ease-out"
            style={{ top: 16, left: xFor(s.j) + BOX / 2 - 10, color: PURPLE, background: `${PURPLE}1a`, border: `1px solid ${PURPLE}66` }}>
            j
          </div>
        )}

        <svg className="absolute left-0 top-0 pointer-events-none" width={rowWidth + 20} height={80}>
          {isSwapping && s.i !== s.j && (
            <path
              d={`M ${xFor(s.i) + BOX/2} 60 Q ${(xFor(s.i)+xFor(s.j))/2 + BOX/2} 20 ${xFor(s.j) + BOX/2} 60`}
              fill="none" stroke={GREEN} strokeWidth="2.5" strokeDasharray="5,4"
            />
          )}
        </svg>

        <div className="text-xs uppercase tracking-widest mb-2 text-gray-600" style={{ position: 'absolute', top: 34, left: 0, transform: 'translateY(-24px)' }}>
          arr (working copy)
        </div>
        <div className="flex gap-3.5" style={{ marginTop: 34 }}>
          {arr.map((v, i) => {
            const isI = s.i === i;
            const isJ = s.j === i;
            const flash = isSwapping && (isI || isJ);
            return (
              <div key={i} className="text-center">
                <div
                  className="w-12 h-12 flex items-center justify-center text-lg font-bold rounded-xl transition-all duration-400"
                  style={{
                    border: `2.5px solid ${flash ? GREEN : isI ? AMBER : isJ ? PURPLE : '#3e3e3c'}`,
                    background: flash ? 'rgba(76,175,80,.18)' : isI ? `${AMBER}1a` : isJ ? `${PURPLE}1a` : MID,
                    color: flash ? GREEN : isI ? AMBER : isJ ? PURPLE : '#eee',
                    boxShadow: flash ? `0 0 12px rgba(76,175,80,.4)` : 'none',
                    transform: flash ? 'scale(1.1)' : 'scale(1)',
                  }}
                >
                  {v}
                </div>
                <div className="text-[9px] mt-1 text-gray-600">[{i}]</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step description */}
      <div
        className="px-4 py-3 rounded-xl text-sm leading-relaxed"
        style={{
          background: s.phase === 'result' ? 'rgba(76,175,80,.1)' : s.phase === 'reset' ? `${PURPLE}14` : 'rgba(255,255,255,.04)',
          border: `1px solid ${s.phase === 'result' ? 'rgba(76,175,80,.35)' : s.phase === 'reset' ? `${PURPLE}44` : '#2e2e2c'}`,
          color: s.phase === 'result' ? GREEN : s.phase === 'reset' ? PURPLE : '#ccc',
        }}
      >
        {s.desc}
      </div>
    </div>
  );
}