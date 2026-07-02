// src/animations/ContainsDuplicateViz.jsx
const TEAL  = '#348681';
const GREEN = '#4caf50';
const RED   = '#ef5350';
const MID   = '#2A2A28';

export default function ContainsDuplicateViz({ step, test }) {
  const s   = test.steps[Math.min(step, test.steps.length - 1)] || {};
  const arr = test.arr || [];

  return (
    <div className="px-6 py-5 font-mono">
      {/* Input */}
      <code className="text-gray-500 text-xs block mb-5">
        nums = [{arr.join(',')}]
      </code>

      {/* Array cells */}
      <div className="flex flex-wrap gap-2.5 mb-6">
        {arr.map((v, i) => {
          const active = s.active === i;
          const dup    = s.found && s.active === i;
          return (
            <div key={i} className="text-center">
              <div
                className="w-14 h-14 flex items-center justify-center text-xl
                           font-bold rounded-xl transition-all duration-300"
                style={{
                  border:     `2.5px solid ${dup ? RED : active ? TEAL : '#3e3e3c'}`,
                  background: dup ? 'rgba(239,83,80,.2)' : active ? `${TEAL}22` : MID,
                  color:      dup ? RED : active ? TEAL : '#ccc',
                  boxShadow:  dup ? `0 0 14px rgba(239,83,80,.4)` : active ? `0 0 10px ${TEAL}44` : 'none',
                }}
              >
                {v}
              </div>
              <div className="text-xs mt-1 text-gray-600">[{i}]</div>
            </div>
          );
        })}
      </div>

      {/* Hash Set display */}
      <div className="mb-4">
        <div className="text-xs uppercase tracking-widest mb-2 text-gray-600">
          Hash Set
        </div>
        <div
          className="flex flex-wrap gap-2 min-h-10 px-3 py-2 rounded-xl items-center"
          style={{ background:'rgba(255,255,255,.03)', border:'1px solid #2e2e2c' }}
        >
          {!(s.set?.length)
            ? <span className="text-xs text-gray-700">{'{ }'}</span>
            : s.set.map(v => (
                <span key={v}
                  className="px-2.5 py-1 rounded text-xs"
                  style={{ background:`${TEAL}1a`, border:`1px solid ${TEAL}33`, color: TEAL }}>
                  {v}
                </span>
              ))
          }
        </div>
      </div>

      {/* Step description */}
      <div
        className="px-4 py-3 rounded-xl text-sm leading-relaxed"
        style={{
          background: s.found !== undefined
            ? (s.found ? 'rgba(76,175,80,.1)' : 'rgba(239,83,80,.08)')
            : 'rgba(255,255,255,.04)',
          border: `1px solid ${s.found ? 'rgba(76,175,80,.35)' : '#2e2e2c'}`,
          color:  s.found ? GREEN : '#ccc',
        }}
      >
        {s.desc}
      </div>
    </div>
  );
}