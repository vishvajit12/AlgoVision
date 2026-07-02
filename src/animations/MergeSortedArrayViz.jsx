// src/animations/MergeSortedArrayViz.jsx
const TEAL   = '#348681';
const GREEN  = '#4caf50';
const PURPLE = '#a78bfa';
const AMBER  = '#f5a623';
const MID    = '#2A2A28';

const BOX = 50;
const GAP = 12;

export default function MergeSortedArrayViz({ step, test }) {
  const s     = test.steps[Math.min(step, test.steps.length - 1)] || {};
  const arr1  = s.arr1 || [];
  const arr2  = test.arr2 || [];

  const xFor = (idx) => idx * (BOX + GAP);
  const row1W = arr1.length * BOX + Math.max(0, arr1.length - 1) * GAP;
  const row2W = arr2.length * BOX + Math.max(0, arr2.length - 1) * GAP;
  const canvasW = Math.max(row1W, row2W) + 60;

  const isWriting = s.phase === 'write';
  const winnerColor = s.winner === 'i' ? TEAL : s.winner === 'j' ? PURPLE : AMBER;

  return (
    <div className="px-6 py-5 font-mono">
      <code className="text-gray-500 text-xs block mb-1">
        nums1 (m={test.m}) merges with nums2 (n={test.n})
      </code>

      {/* Phase badge */}
      <div className="mb-6">
        <span
          className="inline-block text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full font-bold transition-all duration-300"
          style={{
            background: s.phase === 'done' ? 'rgba(76,175,80,.12)' : isWriting ? `${winnerColor}1a` : `${AMBER}1a`,
            color: s.phase === 'done' ? GREEN : isWriting ? winnerColor : AMBER,
            border: `1px solid ${s.phase === 'done' ? 'rgba(76,175,80,.35)' : isWriting ? `${winnerColor}55` : `${AMBER}44`}`,
          }}
        >
          {s.phase === 'init' && 'Starting Position'}
          {s.phase === 'compare' && 'Comparing Back Elements'}
          {s.phase === 'write' && `Writing from ${s.winner === 'i' ? 'nums1' : 'nums2'}`}
          {s.phase === 'exit' && 'Main Loop Ends'}
          {s.phase === 'skip-copy' && 'Nothing Left to Copy'}
          {s.phase === 'done' && 'Merge Complete ✅'}
        </span>
      </div>

      {/* nums2 row (top — source) */}
      <div className="mb-2">
        <div className="text-xs uppercase tracking-widest mb-2 text-gray-600">nums2</div>
        <div className="relative" style={{ width: canvasW, height: 90, paddingTop: 34 }}>
          {arr2.map((v, idx) => {
            const isJ = s.j === idx;
            const consumed = s.j !== undefined && idx > s.j;
            return (
              <div key={idx}>
                {isJ && (
                  <div
                    className="absolute text-[10px] font-bold px-1.5 py-0.5 rounded transition-all duration-450 ease-out"
                    style={{ top: 0, left: xFor(idx) + BOX / 2 - 10, color: PURPLE, background: `${PURPLE}22`, border: `1px solid ${PURPLE}77` }}
                  >
                    j
                  </div>
                )}
                <div
                  className="absolute flex items-center justify-center text-lg font-bold rounded-xl transition-all duration-300"
                  style={{
                    left: xFor(idx), top: 34, width: BOX, height: BOX,
                    border: `2.5px solid ${isJ ? PURPLE : consumed ? '#333' : '#3e3e3c'}`,
                    background: isJ ? `${PURPLE}22` : consumed ? '#1c1c1a' : MID,
                    color: isJ ? PURPLE : consumed ? '#555' : '#ccc',
                    boxShadow: isJ ? `0 0 10px ${PURPLE}55` : 'none',
                    opacity: consumed ? 0.4 : 1,
                  }}
                >
                  {v}
                </div>
              </div>
            );
          })}
          {arr2.length === 0 && <div className="text-xs text-gray-700 pt-2">(empty)</div>}
        </div>
      </div>

      {/* Arrow zone + nums1 row (bottom — destination) */}
      <div className="relative mb-4" style={{ width: canvasW, height: 110, paddingTop: 34 }}>
        {/* Arrow overlay */}
        <svg className="absolute left-0 top-0 pointer-events-none" width={canvasW} height={110}>
          <defs>
            <marker id="arrowWinMSA" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 Z" fill={winnerColor} />
            </marker>
          </defs>
          {isWriting && s.winner === 'i' && (
            <line
              x1={xFor(s.i + 1) + BOX / 2} y1={34 + BOX / 2}
              x2={xFor(s.k) + BOX / 2} y2={34 + BOX / 2}
              stroke={TEAL} strokeWidth="2.5" strokeDasharray="6,5" markerEnd="url(#arrowWinMSA)"
            />
          )}
        </svg>

        {/* i chip (track A) */}
        {s.i !== undefined && s.i >= 0 && (
          <div
            className="absolute text-[10px] font-bold px-1.5 py-0.5 rounded transition-all duration-450 ease-out"
            style={{ top: 0, left: xFor(s.i) + BOX / 2 - 10, color: TEAL, background: `${TEAL}1a`, border: `1px solid ${TEAL}66` }}
          >
            i
          </div>
        )}
        {/* k chip (track B, offset down slightly to avoid overlap with i) */}
        {s.k !== undefined && s.k >= 0 && (
          <div
            className="absolute text-[10px] font-bold px-1.5 py-0.5 rounded transition-all duration-450 ease-out"
            style={{ top: 16, left: xFor(s.k) + BOX / 2 - 10, color: AMBER, background: `${AMBER}1a`, border: `1px solid ${AMBER}66` }}
          >
            k
          </div>
        )}

        {arr1.map((v, idx) => {
          const isI = s.i === idx;
          const isK = s.k === idx;
          const finalized = s.k !== undefined && idx > s.k;
          const flash = isK && isWriting;

          return (
            <div
              key={idx}
              className="absolute flex items-center justify-center text-lg font-bold rounded-xl transition-all duration-300"
              style={{
                left: xFor(idx), top: 34, width: BOX, height: BOX,
                border: `2.5px solid ${flash ? winnerColor : finalized ? GREEN : isI ? TEAL : isK ? AMBER : '#3e3e3c'}`,
                background: flash ? `${winnerColor}33` : finalized ? 'rgba(76,175,80,.15)' : isI ? `${TEAL}1a` : isK ? `${AMBER}1a` : MID,
                color: finalized ? GREEN : flash ? winnerColor : '#eee',
                boxShadow: flash ? `0 0 14px ${winnerColor}66` : finalized ? `0 0 8px rgba(76,175,80,.3)` : 'none',
                transform: flash ? 'scale(1.1)' : 'scale(1)',
              }}
            >
              {v}
            </div>
          );
        })}
        <div className="absolute text-xs uppercase tracking-widest text-gray-600" style={{ top: 34 + BOX + 8, left: 0 }}>
          nums1
        </div>
      </div>

      {/* Step description */}
      <div
        className="mt-8 px-4 py-3 rounded-xl text-sm leading-relaxed"
        style={{
          background: s.phase === 'done' ? 'rgba(76,175,80,.1)' : isWriting ? `${winnerColor}14` : 'rgba(255,255,255,.04)',
          border: `1px solid ${s.phase === 'done' ? 'rgba(76,175,80,.35)' : isWriting ? `${winnerColor}44` : '#2e2e2c'}`,
          color: s.phase === 'done' ? GREEN : isWriting ? winnerColor : '#ccc',
        }}
      >
        {s.desc}
      </div>
    </div>
  );
}