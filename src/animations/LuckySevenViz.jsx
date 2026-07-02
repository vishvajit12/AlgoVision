// src/animations/LuckySevenViz.jsx
const TEAL  = '#348681';
const GREEN = '#4caf50';
const GOLD  = '#f5c518';
const MID   = '#2A2A28';

export default function LuckySevenViz({ step, test }) {
  const s   = test.steps[Math.min(step, test.steps.length - 1)] || {};
  const arr = test.arr || [];

  return (
    <div className="px-6 py-5 font-mono">
      {/* Input */}
      <code className="text-gray-500 text-xs block mb-6">
        S = "{arr.join('')}"
      </code>

      {/* Character cells with position counter above */}
      <div className="flex flex-wrap gap-2.5 mb-6">
        {arr.map((ch, i) => {
          const isActive = s.activeIdx === i;
          const isLucky  = s.luckyIdx === i && (s.phase === 'lucky' || s.phase === 'done');
          const isPast   = s.activeIdx !== undefined && s.activeIdx !== null && i < s.activeIdx && i !== s.luckyIdx;

          return (
            <div key={i} className="text-center">
              {/* position label (1st, 2nd, ...) */}
              <div className="h-4 mb-1 text-[10px] font-bold" style={{ color: isLucky ? GOLD : isActive ? TEAL : '#555' }}>
                {(isActive || isLucky) ? `${i + 1}${ordinalSuffix(i + 1)}` : ''}
              </div>

              <div
                className="w-14 h-14 flex items-center justify-center text-xl
                           font-bold rounded-xl transition-all duration-300"
                style={{
                  border:     `2.5px solid ${isLucky ? GOLD : isActive ? TEAL : isPast ? '#3e3e3c' : '#3e3e3c'}`,
                  background: isLucky ? 'rgba(245,197,24,.2)' : isActive ? `${TEAL}22` : isPast ? '#1c1c1a' : MID,
                  color:      isLucky ? GOLD : isActive ? TEAL : isPast ? '#666' : '#ccc',
                  boxShadow:  isLucky ? `0 0 18px rgba(245,197,24,.55)` : isActive ? `0 0 10px ${TEAL}44` : 'none',
                  transform:  isLucky ? 'scale(1.15)' : isActive ? 'scale(1.05)' : 'scale(1)',
                  opacity:    isPast ? 0.5 : 1,
                }}
              >
                {ch}
                {isLucky && (
                  <span className="absolute" style={{ transform: 'translate(20px, -22px)', fontSize: 16 }}>🍀</span>
                )}
              </div>
              <div className="text-xs mt-1 text-gray-600">[{i}]</div>
            </div>
          );
        })}
      </div>

      {/* Step description */}
      <div
        className="px-4 py-3 rounded-xl text-sm leading-relaxed"
        style={{
          background: s.phase === 'lucky' || s.phase === 'done' ? 'rgba(245,197,24,.1)' : 'rgba(255,255,255,.04)',
          border: `1px solid ${s.phase === 'lucky' || s.phase === 'done' ? 'rgba(245,197,24,.4)' : '#2e2e2c'}`,
          color:  s.phase === 'lucky' || s.phase === 'done' ? GOLD : '#ccc',
        }}
      >
        {s.desc}
      </div>
    </div>
  );
}

function ordinalSuffix(n) {
  const j = n % 10, k = n % 100;
  if (j === 1 && k !== 11) return 'st';
  if (j === 2 && k !== 12) return 'nd';
  if (j === 3 && k !== 13) return 'rd';
  return 'th';
}