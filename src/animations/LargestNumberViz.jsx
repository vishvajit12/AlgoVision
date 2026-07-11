// src/animations/LargestNumberViz.jsx
const TEAL   = '#348681';
const GREEN  = '#4caf50';
const RED    = '#ef5350';
const AMBER  = '#f5a623';
const MID    = '#2A2A28';

export default function LargestNumberViz({ step, test }) {
  const s = test.steps[Math.min(step, test.steps.length - 1)] || {};

  return (
    <div className="px-6 py-5 font-mono">
      <code className="text-gray-500 text-xs block mb-1">
        nums = [{(test.arr || []).join(',')}]
      </code>

      {/* Phase badge */}
      <div className="mb-6">
        <span
          className="inline-block text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full font-bold transition-all duration-300"
          style={{
            background: s.phase === 'join' || s.phase === 'zero-shortcut' ? 'rgba(76,175,80,.12)' : s.phase === 'compare' ? `${AMBER}1a` : `${TEAL}1a`,
            color: s.phase === 'join' || s.phase === 'zero-shortcut' ? GREEN : s.phase === 'compare' ? AMBER : TEAL,
            border: `1px solid ${s.phase === 'join' || s.phase === 'zero-shortcut' ? 'rgba(76,175,80,.35)' : s.phase === 'compare' ? `${AMBER}44` : `${TEAL}33`}`,
          }}
        >
          {s.phase === 'convert' && 'Converting to Strings'}
          {s.phase === 'compare' && 'Comparing Concatenations'}
          {s.phase === 'sorted' && 'Sort Complete'}
          {s.phase === 'check-zero' && 'Checking All-Zero Edge Case'}
          {s.phase === 'zero-shortcut' && 'All Zeros — Special Case!'}
          {s.phase === 'join' && 'Joining Final Result'}
        </span>
      </div>

      {/* Comparison card — the heart of the animation */}
      {s.phase === 'compare' && (
        <div className="mb-6 flex items-center gap-4 flex-wrap">
          <ConcatCard label={`"${s.compareA}" + "${s.compareB}"`} value={s.concatAB} isWinner={s.winner === 'A'} />
          <span className="text-xl text-gray-600">vs</span>
          <ConcatCard label={`"${s.compareB}" + "${s.compareA}"`} value={s.concatBA} isWinner={s.winner === 'B'} />
        </div>
      )}

      {/* String array (current working order) */}
      <div className="mb-6">
        <div className="text-xs uppercase tracking-widest mb-2 text-gray-600">
          {s.sorted ? 'sorted order' : 'strings'}
        </div>
        <div className="flex flex-wrap gap-2">
          {(s.sorted || s.strs || []).map((v, i) => {
            const isActive = s.compareA === v || s.compareB === v;
            const isZeroFlag = s.phase === 'check-zero' && i === 0;
            const isZeroShortcut = s.phase === 'zero-shortcut' && i === 0;
            return (
              <div key={i} className="text-center">
                <div
                  className="min-w-12 h-12 flex items-center justify-center text-lg font-bold rounded-xl px-2 transition-all duration-300"
                  style={{
                    border: `2.5px solid ${isZeroShortcut ? AMBER : isZeroFlag ? AMBER : isActive ? AMBER : '#3e3e3c'}`,
                    background: isZeroShortcut ? `${AMBER}22` : isZeroFlag ? `${AMBER}18` : isActive ? `${AMBER}18` : MID,
                    color: (isZeroShortcut || isZeroFlag || isActive) ? AMBER : '#ccc',
                    boxShadow: (isZeroShortcut || isActive) ? `0 0 10px ${AMBER}44` : 'none',
                  }}
                >
                  "{v}"
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Result string */}
      {(s.phase === 'join' || s.phase === 'zero-shortcut') && (
        <div className="mb-4">
          <div className="text-xs uppercase tracking-widest mb-2 text-gray-600">result</div>
          <div
            className="inline-block px-4 py-3 rounded-xl text-xl font-bold transition-all duration-300"
            style={{ background: 'rgba(76,175,80,.15)', border: '2px solid rgba(76,175,80,.4)', color: GREEN, boxShadow: '0 0 14px rgba(76,175,80,.4)' }}
          >
            "{s.result}"
          </div>
        </div>
      )}

      {/* Step description */}
      <div
        className="px-4 py-3 rounded-xl text-sm leading-relaxed"
        style={{
          background: s.phase === 'join' || s.phase === 'zero-shortcut' ? 'rgba(76,175,80,.1)' : 'rgba(255,255,255,.04)',
          border: `1px solid ${s.phase === 'join' || s.phase === 'zero-shortcut' ? 'rgba(76,175,80,.35)' : '#2e2e2c'}`,
          color: s.phase === 'join' || s.phase === 'zero-shortcut' ? GREEN : '#ccc',
        }}
      >
        {s.desc}
      </div>
    </div>
  );
}

function ConcatCard({ label, value, isWinner }) {
  return (
    <div
      className="px-4 py-3 rounded-xl transition-all duration-300"
      style={{
        border: `2.5px solid ${isWinner ? GREEN : '#3e3e3c'}`,
        background: isWinner ? 'rgba(76,175,80,.15)' : 'rgba(255,255,255,.03)',
        boxShadow: isWinner ? '0 0 14px rgba(76,175,80,.4)' : 'none',
        transform: isWinner ? 'scale(1.05)' : 'scale(1)',
      }}
    >
      <div className="text-[10px] text-gray-500 mb-1">{label}</div>
      <div className="text-2xl font-bold" style={{ color: isWinner ? GREEN : '#ccc' }}>
        {value} {isWinner && '👑'}
      </div>
    </div>
  );
}