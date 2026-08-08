// src/animations/SortColorsViz.jsx
const RED   = '#ef5350';
const AMBER = '#f5a623';
const TEAL  = '#348681';
const GREEN = '#4caf50';
const MID   = '#2A2A28';

const BOX = 52;
const GAP = 10;

const COLOR_FOR = { 0: RED, 1: AMBER, 2: GREEN };
const LABEL_FOR = { 0: '0 (red)', 1: '1 (white)', 2: '2 (blue)' };

export default function SortColorsViz({ step, test }) {
  const s = test.steps[Math.min(step, test.steps.length - 1)] || {};
  const arr = s.arr || test.arr || [];

  const xFor = (idx) => idx * (BOX + GAP);
  const rowWidth = arr.length * BOX + Math.max(0, arr.length - 1) * GAP;

  const zoneFor = (i) => {
    if (s.low !== undefined && i < s.low) return '0-zone';
    if (s.low !== undefined && s.mid !== undefined && i >= s.low && i < s.mid) return '1-zone';
    if (s.high !== undefined && i > s.high) return '2-zone';
    return 'unknown';
  };

  return (
    <div className="px-6 py-5 font-mono">
      <code className="text-gray-500 text-xs block mb-1">
        nums = [{(test.arr || []).join(',')}]
      </code>

      {/* Phase badge */}
      <div className="mb-8">
        <span
          className="inline-block text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full font-bold transition-all duration-300"
          style={{
            background: s.phase === 'done' ? 'rgba(76,175,80,.12)' : s.action ? `${COLOR_FOR[s.action]}1a` : `${TEAL}1a`,
            color: s.phase === 'done' ? GREEN : s.action ? COLOR_FOR[s.action] : TEAL,
            border: `1px solid ${s.phase === 'done' ? 'rgba(76,175,80,.35)' : s.action ? `${COLOR_FOR[s.action]}44` : `${TEAL}33`}`,
          }}
        >
          {s.phase === 'check' && `nums[mid] = ${LABEL_FOR[s.action]}`}
          {s.phase === 'swap-low' && 'Swap with low, advance both'}
          {s.phase === 'swap-high' && 'Swap with high, mid stays!'}
          {s.phase === 'advance-mid' && 'Advance mid only'}
          {s.phase === 'init' && 'Starting'}
          {s.phase === 'done' && 'Sorted ✅'}
        </span>
      </div>

      {/* Array with pointer chips */}
      <div className="relative mb-2" style={{ width: rowWidth + 20, paddingTop: 34 }}>
        {s.low !== undefined && (
          <div className="absolute text-[10px] font-bold px-1.5 py-0.5 rounded transition-all duration-450 ease-out"
            style={{ top: 0, left: xFor(s.low) + BOX / 2 - 14, color: RED, background: `${RED}1a`, border: `1px solid ${RED}66` }}>
            low
          </div>
        )}
        {s.mid !== undefined && s.mid < arr.length && (
          <div className="absolute text-[10px] font-bold px-1.5 py-0.5 rounded transition-all duration-450 ease-out"
            style={{ top: 16, left: xFor(s.mid) + BOX / 2 - 14, color: TEAL, background: `${TEAL}1a`, border: `1px solid ${TEAL}66` }}>
            mid
          </div>
        )}
        {s.high !== undefined && (
          <div className="absolute text-[10px] font-bold px-1.5 py-0.5 rounded transition-all duration-450 ease-out"
            style={{ top: 0, left: xFor(s.high) + BOX / 2 - 14, color: GREEN, background: `${GREEN}1a`, border: `1px solid ${GREEN}66` }}>
            high
          </div>
        )}

        <div className="flex gap-2.5" style={{ marginTop: 34 }}>
          {arr.map((v, i) => {
            const isMid = s.mid === i;
            const zone = zoneFor(i);
            return (
              <div key={i} className="text-center">
                <div
                  className="w-12 h-12 flex items-center justify-center text-lg font-bold rounded-xl transition-all duration-300"
                  style={{
                    border: `2.5px solid ${isMid ? COLOR_FOR[v] : `${COLOR_FOR[v]}88`}`,
                    background: `${COLOR_FOR[v]}22`,
                    color: COLOR_FOR[v],
                    boxShadow: isMid ? `0 0 12px ${COLOR_FOR[v]}66` : 'none',
                    transform: isMid ? 'scale(1.1)' : 'scale(1)',
                    opacity: zone === 'unknown' ? 1 : 0.85,
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

      {/* Zone brackets */}
      <div className="relative mb-8" style={{ width: rowWidth + 20, height: 30 }}>
        {arr.map((_, i) => {
          const zone = zoneFor(i);
          if (zone === 'unknown') return null;
          const label = zone === '0-zone' ? '0s' : zone === '1-zone' ? '1s' : '2s';
          const color = zone === '0-zone' ? RED : zone === '1-zone' ? AMBER : GREEN;
          return (
            <div key={i} className="absolute text-[9px] text-center font-bold" style={{ left: xFor(i), width: BOX, top: 4, color: `${color}bb` }}>
              {label}
            </div>
          );
        })}
      </div>

      {/* Step description */}
      <div
        className="px-4 py-3 rounded-xl text-sm leading-relaxed"
        style={{
          background: s.phase === 'done' ? 'rgba(76,175,80,.1)' : s.phase === 'swap-high' ? `${GREEN}14` : 'rgba(255,255,255,.04)',
          border: `1px solid ${s.phase === 'done' ? 'rgba(76,175,80,.35)' : s.phase === 'swap-high' ? `${GREEN}44` : '#2e2e2c'}`,
          color: s.phase === 'done' ? GREEN : '#ccc',
        }}
      >
        {s.desc}
      </div>
    </div>
  );
}