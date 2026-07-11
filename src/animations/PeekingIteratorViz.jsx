// src/animations/PeekingIteratorViz.jsx
const TEAL   = '#348681';
const GREEN  = '#4caf50';
const AMBER  = '#f5a623';
const RED    = '#ef5350';
const MID    = '#2A2A28';

const BOX = 52;
const GAP = 12;

export default function PeekingIteratorViz({ step, test }) {
  const s   = test.steps[Math.min(step, test.steps.length - 1)] || {};
  const arr = test.arr || [];

  const xFor = (idx) => idx * (BOX + GAP);
  const rowWidth = arr.length * BOX + Math.max(0, arr.length - 1) * GAP;

  return (
    <div className="px-6 py-5 font-mono">
      <code className="text-gray-500 text-xs block mb-1">
        nums = [{arr.join(',')}]
      </code>

      {/* Call badge */}
      <div className="mb-6">
        <span
          className="inline-block text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full font-bold transition-all duration-300"
          style={{
            background: s.phase === 'done' ? 'rgba(76,175,80,.12)'
              : s.op === 'peek' ? `${AMBER}1a`
              : s.op === 'next' ? `${TEAL}1a`
              : s.op === 'hasNext' ? `${RED}18`
              : 'rgba(255,255,255,.06)',
            color: s.phase === 'done' ? GREEN : s.op === 'peek' ? AMBER : s.op === 'next' ? TEAL : s.op === 'hasNext' ? RED : '#ccc',
            border: `1px solid ${
              s.phase === 'done' ? 'rgba(76,175,80,.35)' : s.op === 'peek' ? `${AMBER}44` : s.op === 'next' ? `${TEAL}44` : s.op === 'hasNext' ? `${RED}44` : '#3e3e3c'
            }`,
          }}
        >
          {s.op === 'construct' && 'Constructor'}
          {s.op === 'next' && 'Calling next()'}
          {s.op === 'peek' && 'Calling peek()'}
          {s.op === 'hasNext' && 'Calling hasNext()'}
          {s.op === 'done' && 'Sequence Complete ✅'}
        </span>
      </div>

      {/* Array with real iterator pointer */}
      <div className="relative mb-8" style={{ width: rowWidth + 20, paddingTop: 34 }}>
        {s.realPtr !== null && s.realPtr !== undefined && (
          <div className="absolute text-[10px] font-bold px-1.5 py-0.5 rounded transition-all duration-450 ease-out"
            style={{ top: 0, left: xFor(Math.min(s.realPtr, arr.length)) + BOX / 2 - 34, color: TEAL, background: `${TEAL}1a`, border: `1px solid ${TEAL}66`, whiteSpace: 'nowrap' }}>
            real iterator →
          </div>
        )}
        <div className="flex gap-3" style={{ marginTop: 34 }}>
          {arr.map((v, i) => {
            const isConsumed = s.realPtr !== null && s.realPtr !== undefined && i < s.realPtr;
            const isCurrent = s.realPtr === i;
            return (
              <div key={i} className="text-center">
                <div
                  className="w-12 h-12 flex items-center justify-center text-lg font-bold rounded-xl transition-all duration-300"
                  style={{
                    border: `2.5px solid ${isCurrent ? TEAL : '#3e3e3c'}`,
                    background: isCurrent ? `${TEAL}22` : isConsumed ? '#1c1c1a' : MID,
                    color: isCurrent ? TEAL : isConsumed ? '#555' : '#ccc',
                    boxShadow: isCurrent ? `0 0 10px ${TEAL}55` : 'none',
                    opacity: isConsumed ? 0.4 : 1,
                    textDecoration: isConsumed ? 'line-through' : 'none',
                  }}
                >
                  {v}
                </div>
                <div className="text-[9px] mt-1 text-gray-600">[{i}]</div>
              </div>
            );
          })}
          {s.realPtr === arr.length && (
            <div className="flex items-center justify-center text-xs text-gray-600 px-2">end</div>
          )}
        </div>
      </div>

      {/* Cache slot + result readout */}
      <div className="flex gap-8 mb-6 flex-wrap items-start">
        <div>
          <div className="text-xs uppercase tracking-widest mb-2 text-gray-600">cache slot</div>
          <div
            className="w-16 h-16 flex flex-col items-center justify-center rounded-2xl text-xl font-bold transition-all duration-400"
            style={{
              border: `2.5px solid ${s.hasCached ? AMBER : '#3e3e3c'}`,
              background: s.hasCached ? `${AMBER}22` : 'rgba(255,255,255,.02)',
              color: s.hasCached ? AMBER : '#555',
              boxShadow: s.hasCached ? `0 0 14px ${AMBER}55` : 'none',
              transform: s.phase === 'pull-cache' ? 'scale(1.15)' : 'scale(1)',
            }}
          >
            {s.hasCached ? s.cached : '—'}
          </div>
          <div className="text-[9px] mt-1 text-center text-gray-600">{s.hasCached ? 'filled' : 'empty'}</div>
        </div>

        <div>
          <div className="text-xs uppercase tracking-widest mb-2 text-gray-600">return value</div>
          <div
            className="min-w-16 h-16 flex items-center justify-center rounded-2xl text-xl font-bold px-3 transition-all duration-400"
            style={{
              border: `2.5px solid ${s.result !== null && s.result !== undefined ? GREEN : '#3e3e3c'}`,
              background: s.result !== null && s.result !== undefined ? `${GREEN}1a` : 'rgba(255,255,255,.02)',
              color: s.result !== null && s.result !== undefined ? GREEN : '#555',
              boxShadow: s.result !== null && s.result !== undefined ? `0 0 14px ${GREEN}55` : 'none',
            }}
          >
            {s.result !== null && s.result !== undefined ? String(s.result) : '—'}
          </div>
        </div>
      </div>

      {/* Step description */}
      <div
        className="px-4 py-3 rounded-xl text-sm leading-relaxed"
        style={{
          background: s.phase === 'done' ? 'rgba(76,175,80,.1)' : s.phase === 'pull-cache' || s.phase === 'return-cache' ? `${AMBER}14` : 'rgba(255,255,255,.04)',
          border: `1px solid ${s.phase === 'done' ? 'rgba(76,175,80,.35)' : s.phase === 'pull-cache' || s.phase === 'return-cache' ? `${AMBER}44` : '#2e2e2c'}`,
          color: s.phase === 'done' ? GREEN : s.phase === 'pull-cache' || s.phase === 'return-cache' ? AMBER : '#ccc',
        }}
      >
        {s.desc}
      </div>
    </div>
  );
}