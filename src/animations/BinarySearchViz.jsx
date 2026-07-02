const TEAL  = '#348681';
const MID   = '#2A2A28';
const GREEN = '#4caf50';
const RED   = '#ef5350';

export default function BinarySearchViz({ step, test }) {
  const s   = test.steps[Math.min(step, test.steps.length - 1)] || {};
  const arr = test.arr || [];

  return (
    <div className="px-6 py-5 font-mono">
      {/* Input header */}
      <div className="flex flex-wrap gap-4 mb-5">
        <code className="text-gray-500 text-xs">nums = [{arr.join(',')}]</code>
        <code className="text-xs" style={{ color: TEAL }}>target = {test.target}</code>
      </div>

      {/* Pointer labels */}
      <div className="flex flex-wrap gap-2.5 h-5 mb-1.5">
        {arr.map((_, i) => {
          const iL = i === s.lo;
          const iH = i === s.hi;
          const iM = i === s.mid && s.mid !== -1;
          return (
            <div key={i} className="w-12 text-center text-xs font-bold">
              {s.done && i === s.mid
                ? <span style={{ color: s.nf ? RED : GREEN }}>{s.nf ? '✗' : '✓'}</span>
                : <>
                    {iL && <span style={{ color: '#ef9a9a' }}>L</span>}
                    {iM && <span style={{ color: TEAL      }}>M</span>}
                    {iH && <span style={{ color: '#ffcc80' }}>H</span>}
                  </>
              }
            </div>
          );
        })}
      </div>

      {/* Array cells */}
      <div className="flex flex-wrap gap-2.5 mb-6">
        {arr.map((v, i) => {
          const inRange = i >= s.lo && i <= s.hi;
          const isMid   = i === s.mid && s.mid !== -1;
          const isDone  = s.done && i === s.mid;
          return (
            <div
              key={i}
              className="w-12 h-12 flex items-center justify-center text-base font-bold rounded-lg transition-all duration-300"
              style={{
                border:     `2px solid ${isDone ? (s.nf ? RED : GREEN) : isMid ? TEAL : inRange ? '#4a4a48' : '#2e2e2c'}`,
                background: isDone ? (s.nf ? 'rgba(239,83,80,.15)' : 'rgba(76,175,80,.2)') : isMid ? `${TEAL}22` : inRange ? 'rgba(255,255,255,.05)' : 'transparent',
                color:      isDone ? (s.nf ? RED : GREEN) : isMid ? TEAL : inRange ? '#ccc' : '#3e3e3c',
                boxShadow:  isDone && !s.nf ? `0 0 12px rgba(76,175,80,.4)` : isMid ? `0 0 8px ${TEAL}44` : 'none',
              }}
            >
              {v}
            </div>
          );
        })}
      </div>

      {/* State pills */}
      <div className="flex flex-wrap gap-2.5 mb-4">
        {[['lo', s.lo], ['mid', s.mid === -1 ? '—' : s.mid], ['hi', s.hi]].map(([k, v]) => (
          <div key={k}
            className="px-3 py-1.5 rounded-lg text-xs"
            style={{ background: 'rgba(255,255,255,.04)', border: '1px solid #2e2e2c' }}>
            <span style={{ color: '#777' }}>{k} = </span>
            <strong style={{ color: TEAL }}>{v}</strong>
          </div>
        ))}
      </div>

      {/* Step description */}
      <div
        className="px-4 py-3 rounded-xl text-sm leading-relaxed"
        style={{
          background: s.done ? (s.nf ? 'rgba(239,83,80,.1)' : 'rgba(76,175,80,.1)') : 'rgba(255,255,255,.04)',
          border:     `1px solid ${s.done ? (s.nf ? 'rgba(239,83,80,.35)' : 'rgba(76,175,80,.35)') : '#2e2e2c'}`,
          color:      s.done ? (s.nf ? RED : GREEN) : '#ccc',
        }}
      >
        {s.desc}
      </div>
    </div>
  );
}
