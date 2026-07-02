// src/animations/BestTimeToBuySellViz.jsx
const TEAL  = '#348681';
const GREEN = '#4caf50';
const RED   = '#ef5350';
const AMBER = '#f5a623';
const MID   = '#2A2A28';

const COL_W  = 52;
const GAP    = 14;
const CHART_H = 160;

export default function BestTimeToBuySellViz({ step, test }) {
  const s   = test.steps[Math.min(step, test.steps.length - 1)] || {};
  const arr = test.arr || [];

  const maxPrice = Math.max(...arr, 1);
  const heightFor = (v) => Math.max(18, (v / maxPrice) * (CHART_H - 30));
  const xFor = (idx) => idx * (COL_W + GAP);
  const rowWidth = arr.length * COL_W + Math.max(0, arr.length - 1) * GAP;

  const hasBridge = s.checkIdx !== null && s.checkIdx !== undefined && s.profit !== null && s.profit !== undefined;

  return (
    <div className="px-6 py-5 font-mono">
      {/* Input */}
      <code className="text-gray-500 text-xs block mb-1">
        prices = [{arr.join(',')}]
      </code>

      {/* Phase badge */}
      <div className="mb-6">
        <span
          className="inline-block text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full font-bold"
          style={{
            background: s.phase === 'done' ? 'rgba(76,175,80,.12)'
              : s.isNewMax ? 'rgba(76,175,80,.12)'
              : `${TEAL}1a`,
            color: s.phase === 'done' ? GREEN : s.isNewMax ? GREEN : TEAL,
            border: `1px solid ${
              s.phase === 'done' ? 'rgba(76,175,80,.35)' : s.isNewMax ? 'rgba(76,175,80,.35)' : `${TEAL}33`
            }`,
          }}
        >
          {s.phase === 'init' && 'Initializing'}
          {s.phase === 'check' && (s.isNewMax ? 'New Best Profit! 🎉' : 'Checking Profit')}
          {s.phase === 'update' && 'Updating Best Buy'}
          {s.phase === 'done' && 'Done'}
        </span>
      </div>

      {/* Chart canvas */}
      <div className="relative mb-6" style={{ width: rowWidth + 20, height: CHART_H + 50, paddingTop: 40 }}>

        {/* SVG bridge line (buy -> today) */}
        <svg
          className="absolute left-0 top-0 pointer-events-none"
          width={rowWidth + 20}
          height={CHART_H + 50}
        >
          {hasBridge && (() => {
            const buyX = xFor(s.bestBuyIdx) + COL_W / 2;
            const buyY = 40 + (CHART_H - heightFor(arr[s.bestBuyIdx]));
            const curX = xFor(s.checkIdx) + COL_W / 2;
            const curY = 40 + (CHART_H - heightFor(arr[s.checkIdx]));
            const color = s.isNewMax ? GREEN : AMBER;
            return (
              <line
                x1={buyX} y1={buyY} x2={curX} y2={curY}
                stroke={color} strokeWidth="2.5" strokeDasharray="6,5"
                style={{ transition: 'all .4s ease-out' }}
              />
            );
          })()}
        </svg>

        {/* BUY / TODAY marker chips */}
        {arr.map((_, i) => (
          <div key={`chip-${i}`}>
            {s.bestBuyIdx === i && (
              <div
                className="absolute text-[10px] font-bold px-1.5 py-0.5 rounded transition-all duration-500 ease-out"
                style={{
                  top: 0,
                  left: xFor(i) + COL_W / 2 - 18,
                  color: AMBER,
                  background: 'rgba(245,166,35,.12)',
                  border: `1px solid ${AMBER}55`,
                }}
              >
                BUY
              </div>
            )}
            {(s.i === i || s.checkIdx === i) && s.bestBuyIdx !== i && (
              <div
                className="absolute text-[10px] font-bold px-1.5 py-0.5 rounded transition-all duration-500 ease-out"
                style={{
                  top: 0,
                  left: xFor(i) + COL_W / 2 - 22,
                  color: TEAL,
                  background: `${TEAL}1a`,
                  border: `1px solid ${TEAL}55`,
                }}
              >
                TODAY
              </div>
            )}
          </div>
        ))}

        {/* Price bars */}
        <div className="absolute left-0 flex items-end gap-3.5" style={{ top: 40, height: CHART_H }}>
          {arr.map((v, i) => {
            const h = heightFor(v);
            const isBuy = s.bestBuyIdx === i;
            const isToday = s.i === i || s.checkIdx === i;
            const isBridgeEnd = hasBridge && (i === s.bestBuyIdx || i === s.checkIdx);
            const bridgeColor = s.isNewMax ? GREEN : AMBER;

            return (
              <div key={i} className="flex flex-col items-center justify-end" style={{ width: COL_W, height: CHART_H }}>
                <div
                  className="rounded-t-lg flex items-end justify-center text-xs font-bold pb-1 transition-all duration-300"
                  style={{
                    width: COL_W,
                    height: h,
                    background: isBridgeEnd
                      ? `${bridgeColor}33`
                      : isBuy ? `${AMBER}22`
                      : isToday ? `${TEAL}22`
                      : MID,
                    border: `2px solid ${
                      isBridgeEnd ? bridgeColor : isBuy ? AMBER : isToday ? TEAL : '#3e3e3c'
                    }`,
                    borderBottom: 'none',
                    color: isBridgeEnd ? bridgeColor : isBuy ? AMBER : isToday ? TEAL : '#aaa',
                    boxShadow: isBridgeEnd ? `0 0 12px ${bridgeColor}55` : 'none',
                  }}
                >
                  {v}
                </div>
                <div
                  className="w-full text-center text-[10px] py-1 rounded-b-lg"
                  style={{ background: '#1e1e1c', color: '#666' }}
                >
                  day {i}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Readouts */}
      <div className="flex gap-6 mb-4 flex-wrap">
        <Readout label="Best_buy" value={s.bestBuyVal ?? '—'} color={AMBER} />
        <Readout
          label="profit today"
          value={s.profit ?? '—'}
          color={s.isNewMax ? GREEN : s.profit != null ? TEAL : '#666'}
          glow={s.isNewMax}
        />
        <Readout label="max_profit" value={s.maxProfit ?? 0} color={GREEN} glow={s.isNewMax} />
      </div>

      {/* Step description */}
      <div
        className="px-4 py-3 rounded-xl text-sm leading-relaxed"
        style={{
          background: s.isNewMax ? 'rgba(76,175,80,.1)'
            : s.phase === 'done' ? 'rgba(76,175,80,.1)'
            : 'rgba(255,255,255,.04)',
          border: `1px solid ${(s.isNewMax || s.phase === 'done') ? 'rgba(76,175,80,.35)' : '#2e2e2c'}`,
          color: (s.isNewMax || s.phase === 'done') ? GREEN : '#ccc',
        }}
      >
        {s.desc}
      </div>
    </div>
  );
}

function Readout({ label, value, color, glow }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-widest mb-1 text-gray-600">{label}</div>
      <div
        className="min-w-16 h-11 flex items-center justify-center rounded-xl text-lg font-bold px-3 transition-all duration-300"
        style={{
          background: `${color}1a`,
          border: `1.5px solid ${color}55`,
          color,
          boxShadow: glow ? `0 0 12px ${color}66` : 'none',
          transform: glow ? 'scale(1.1)' : 'scale(1)',
        }}
      >
        {value}
      </div>
    </div>
  );
}