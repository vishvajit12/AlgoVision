// src/animations/LongestSubstringViz.jsx
const TEAL  = '#348681';
const GREEN = '#4caf50';
const RED   = '#ef5350';
const AMBER = '#f5a623';
const MID   = '#2A2A28';

const BOX = 48;   // w-12 = 48px
const GAP = 8;    // gap-2 = 8px

export default function LongestSubstringViz({ step, test }) {
  const s   = test.steps[Math.min(step, test.steps.length - 1)] || {};
  const arr = test.arr || [];

  const inWindow = (i) =>
    s.windowStart !== undefined &&
    s.windowEnd !== undefined &&
    i >= s.windowStart &&
    i <= s.windowEnd;

  const hasWindow = s.windowStart !== undefined && s.windowEnd !== undefined && s.windowEnd >= s.windowStart;

  // Position + width of the sliding window box, in px, relative to the array row
  const winLeft  = hasWindow ? s.windowStart * (BOX + GAP) : 0;
  const winWidth = hasWindow ? (s.windowEnd - s.windowStart + 1) * BOX + (s.windowEnd - s.windowStart) * GAP : 0;

  return (
    <div className="px-6 py-5 font-mono">
      {/* Input */}
      <code className="text-gray-500 text-xs block mb-5">
        s = "{arr.join('')}"
      </code>

      {/* Array row wrapper — relative, so the sliding box can be absolutely positioned inside */}
      <div className="relative mb-2" style={{ paddingTop: 28 }}>

        {/* 🟩 Sliding window box — animates left/width via CSS transition */}
        {hasWindow && (
          <div
            className="absolute rounded-2xl transition-all duration-500 ease-out pointer-events-none"
            style={{
              top: 28,
              left: winLeft,
              width: winWidth,
              height: BOX,
              border: `2.5px solid ${s.dup ? RED : TEAL}`,
              background: s.dup ? 'rgba(239,83,80,.10)' : `${TEAL}14`,
              boxShadow: s.dup ? `0 0 16px rgba(239,83,80,.35)` : `0 0 14px ${TEAL}44`,
              zIndex: 0,
            }}
          />
        )}

        {/* L / R pointer chips — float above the row, slide horizontally */}
        {s.left !== undefined && (
          <div
            className="absolute text-[10px] font-bold px-1.5 py-0.5 rounded transition-all duration-500 ease-out"
            style={{
              top: 0,
              left: s.left * (BOX + GAP) + BOX / 2 - 10,
              color: AMBER,
              background: 'rgba(245,166,35,.12)',
              border: `1px solid ${AMBER}55`,
            }}
          >
            L
          </div>
        )}
        {s.right !== undefined && s.right !== -1 && s.right !== s.left && (
          <div
            className="absolute text-[10px] font-bold px-1.5 py-0.5 rounded transition-all duration-500 ease-out"
            style={{
              top: 0,
              left: s.right * (BOX + GAP) + BOX / 2 - 10,
              color: TEAL,
              background: `${TEAL}1a`,
              border: `1px solid ${TEAL}55`,
            }}
          >
            R
          </div>
        )}

        {/* Character cells — sit above the sliding box (z-index) */}
        <div className="flex gap-2 relative" style={{ zIndex: 1 }}>
          {arr.map((ch, i) => {
            const isRight = s.right === i;
            const isDup   = s.dup === ch && isRight;
            const window_ = inWindow(i);

            return (
              <div key={i} className="text-center">
                <div
                  className="flex items-center justify-center text-lg font-bold rounded-xl transition-all duration-300"
                  style={{
                    width: BOX,
                    height: BOX,
                    border: `2px solid ${isDup ? RED : isRight ? TEAL : '#3e3e3c'}`,
                    background: isDup ? 'rgba(239,83,80,.25)' : isRight ? `${TEAL}33` : MID,
                    color: isDup ? RED : window_ ? '#eee' : '#888',
                    transform: isDup ? 'scale(1.1)' : 'scale(1)',
                  }}
                >
                  {ch}
                </div>
                <div className="text-xs mt-1 text-gray-600">[{i}]</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Window caption */}
      {hasWindow && (
        <div className="mb-5 text-xs text-gray-600">
          window = "{arr.slice(s.windowStart, s.windowEnd + 1).join('')}"
          <span className="ml-2" style={{ color: s.dup ? RED : TEAL }}>
            (len {s.windowEnd - s.windowStart + 1})
          </span>
        </div>
      )}

      {/* Map + maxLen row */}
      <div className="flex gap-6 mb-4 flex-wrap">
        <div className="flex-1 min-w-[200px]">
          <div className="text-xs uppercase tracking-widest mb-2 text-gray-600">
            Last Seen Map
          </div>
          <div
            className="flex flex-wrap gap-2 min-h-10 px-3 py-2 rounded-xl items-center"
            style={{ background: 'rgba(255,255,255,.03)', border: '1px solid #2e2e2c' }}
          >
            {!s.map || Object.keys(s.map).length === 0 ? (
              <span className="text-xs text-gray-700">{'{ }'}</span>
            ) : (
              Object.entries(s.map).map(([ch, idx]) => (
                <span
                  key={ch}
                  className="px-2.5 py-1 rounded text-xs"
                  style={{
                    background: ch === s.dup ? 'rgba(239,83,80,.15)' : `${TEAL}1a`,
                    border: `1px solid ${ch === s.dup ? 'rgba(239,83,80,.4)' : `${TEAL}33`}`,
                    color: ch === s.dup ? RED : TEAL,
                  }}
                >
                  {ch}:{idx}
                </span>
              ))
            )}
          </div>
        </div>

        <div>
          <div className="text-xs uppercase tracking-widest mb-2 text-gray-600">
            maxLen
          </div>
          <div
            className="w-16 h-10 flex items-center justify-center rounded-xl text-lg font-bold transition-all duration-300"
            style={{
              background: 'rgba(76,175,80,.1)',
              border: '1px solid rgba(76,175,80,.35)',
              color: GREEN,
              transform: s.right === -1 ? 'scale(1)' : undefined,
            }}
          >
            {s.maxLen ?? 0}
          </div>
        </div>
      </div>

      {/* Step description */}
      <div
        className="px-4 py-3 rounded-xl text-sm leading-relaxed"
        style={{
          background: s.dup
            ? 'rgba(239,83,80,.08)'
            : s.right === -1
            ? 'rgba(76,175,80,.1)'
            : 'rgba(255,255,255,.04)',
          border: `1px solid ${s.dup ? 'rgba(239,83,80,.35)' : '#2e2e2c'}`,
          color: s.dup ? RED : s.right === -1 ? GREEN : '#ccc',
        }}
      >
        {s.desc}
      </div>
    </div>
  );
}