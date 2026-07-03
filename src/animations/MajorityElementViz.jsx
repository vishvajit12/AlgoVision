// src/animations/MajorityElementViz.jsx
const TEAL  = '#348681';
const GREEN = '#4caf50';
const RED   = '#ef5350';
const AMBER = '#f5a623';
const MID   = '#2A2A28';

export default function MajorityElementViz({ step, test }) {
  const s   = test.steps[Math.min(step, test.steps.length - 1)] || {};
  const arr = test.arr || [];

  const maxCount = Math.ceil(arr.length / 2) + 1;
  const countPct = Math.min(100, ((s.count ?? 0) / maxCount) * 100);

  return (
    <div className="px-6 py-5 font-mono">
      <code className="text-gray-500 text-xs block mb-6">
        nums = [{arr.join(',')}]
      </code>

      <div className="flex gap-10 items-start flex-wrap mb-6">
        {/* Array row */}
        <div>
          <div className="text-xs uppercase tracking-widest mb-2 text-gray-600">nums</div>
          <div className="flex flex-wrap gap-2.5">
            {arr.map((v, i) => {
              const isActive = s.i === i;
              const matchesCandidate = isActive && v === s.candidate;
              const opposesCandidate = isActive && v !== s.candidate;

              return (
                <div key={i} className="text-center">
                  <div
                    className="w-14 h-14 flex items-center justify-center text-xl font-bold rounded-xl transition-all duration-300"
                    style={{
                      border: `2.5px solid ${
                        matchesCandidate ? GREEN : opposesCandidate ? RED : isActive ? TEAL : '#3e3e3c'
                      }`,
                      background: matchesCandidate ? 'rgba(76,175,80,.18)' : opposesCandidate ? 'rgba(239,83,80,.15)' : isActive ? `${TEAL}22` : MID,
                      color: matchesCandidate ? GREEN : opposesCandidate ? RED : isActive ? TEAL : '#ccc',
                      boxShadow: matchesCandidate ? `0 0 12px rgba(76,175,80,.4)` : opposesCandidate ? `0 0 12px rgba(239,83,80,.4)` : isActive ? `0 0 10px ${TEAL}44` : 'none',
                      transform: isActive ? 'scale(1.08)' : 'scale(1)',
                    }}
                  >
                    {v}
                  </div>
                  <div className="text-xs mt-1 text-gray-600">[{i}]</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Throne panel */}
        <div>
          <div className="text-xs uppercase tracking-widest mb-2 text-gray-600">candidate</div>
          <div
            className="w-20 h-20 flex flex-col items-center justify-center rounded-2xl text-2xl font-bold relative transition-all duration-400"
            style={{
              border: `2.5px solid ${s.crowned ? AMBER : TEAL}`,
              background: s.crowned ? `${AMBER}22` : `${TEAL}18`,
              color: s.crowned ? AMBER : TEAL,
              boxShadow: s.crowned ? `0 0 20px ${AMBER}66` : `0 0 10px ${TEAL}33`,
              transform: s.crowned ? 'scale(1.12)' : 'scale(1)',
            }}
          >
            {s.crowned && <span className="absolute" style={{ top: -20, fontSize: 20 }}>👑</span>}
            {s.candidate}
          </div>
        </div>

        {/* Vote meter */}
        <div>
          <div className="text-xs uppercase tracking-widest mb-2 text-gray-600">count</div>
          <div className="flex items-end gap-3">
            <div
              className="relative rounded-xl overflow-hidden flex items-end justify-center"
              style={{ width: 40, height: 100, background: 'rgba(255,255,255,.03)', border: '2px solid #3e3e3c' }}
            >
              <div
                className="w-full transition-all duration-400 ease-out flex items-start justify-center pt-1"
                style={{
                  height: `${countPct}%`,
                  background: (s.count ?? 0) === 0 ? 'rgba(239,83,80,.35)' : `${GREEN}55`,
                  borderTop: `2px solid ${(s.count ?? 0) === 0 ? RED : GREEN}`,
                }}
              >
                <span className="text-xs font-bold" style={{ color: (s.count ?? 0) === 0 ? RED : GREEN }}>
                  {s.count}
                </span>
              </div>
            </div>
            {s.vote && (
              <span
                className="text-2xl font-bold pb-2"
                style={{ color: s.vote === 'match' ? GREEN : RED }}
              >
                {s.vote === 'match' ? '+1' : '−1'}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Step description */}
      <div
        className="px-4 py-3 rounded-xl text-sm leading-relaxed"
        style={{
          background: s.phase === 'done' ? 'rgba(76,175,80,.1)' : s.crowned ? `${AMBER}14` : (s.count === 0 ? 'rgba(239,83,80,.08)' : 'rgba(255,255,255,.04)'),
          border: `1px solid ${s.phase === 'done' ? 'rgba(76,175,80,.35)' : s.crowned ? `${AMBER}44` : (s.count === 0 ? 'rgba(239,83,80,.3)' : '#2e2e2c')}`,
          color: s.phase === 'done' ? GREEN : s.crowned ? AMBER : (s.count === 0 ? RED : '#ccc'),
        }}
      >
        {s.desc}
      </div>
    </div>
  );
}