// src/animations/PalindromeLinkedListViz.jsx
const TEAL  = '#348681';
const GREEN = '#4caf50';
const RED   = '#ef5350';
const AMBER = '#f5a623';
const MID   = '#2A2A28';

const BOX     = 52;
const GAP     = 40;
const STK_W   = 64;
const STK_ITEM_H = 40;

export default function PalindromeLinkedListViz({ step, test }) {
  const s     = test.steps[Math.min(step, test.steps.length - 1)] || {};
  const nodes = test.nodes || [];

  const xFor = (idx) => idx * (BOX + GAP);
  const rowWidth = nodes.length * BOX + Math.max(0, nodes.length - 1) * GAP;

  const stack = s.stack || [];

  return (
    <div className="px-6 py-5 font-mono">
      {/* Input */}
      <code className="text-gray-500 text-xs block mb-1">
        head = [{nodes.map(nd => nd.val).join(',')}]
      </code>

      {/* Phase badge */}
      <div className="mb-6">
        <span
          className="inline-block text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full font-bold"
          style={{
            background: s.phase === 'done'
              ? (s.result ? 'rgba(76,175,80,.12)' : 'rgba(239,83,80,.12)')
              : s.match === false ? 'rgba(239,83,80,.12)'
              : `${TEAL}1a`,
            color: s.phase === 'done'
              ? (s.result ? GREEN : RED)
              : s.match === false ? RED
              : TEAL,
            border: `1px solid ${
              s.phase === 'done'
                ? (s.result ? 'rgba(76,175,80,.35)' : 'rgba(239,83,80,.35)')
                : s.match === false ? 'rgba(239,83,80,.35)'
                : `${TEAL}33`
            }`,
          }}
        >
          {s.phase === 'push'    && 'Pass 1 · Pushing to Stack'}
          {s.phase === 'compare' && 'Pass 2 · Comparing'}
          {s.phase === 'pop'     && 'Popping Stack'}
          {s.phase === 'done'    && (s.result ? 'Palindrome ✅' : 'Not a Palindrome ❌')}
        </span>
      </div>

      <div className="flex gap-10 items-start flex-wrap">
        {/* Linked list canvas */}
        <div className="relative" style={{ width: rowWidth + 40, height: 130, paddingTop: 50 }}>
          <svg className="absolute left-0 top-0" width={rowWidth + 40} height={130} style={{ pointerEvents: 'none' }}>
            <defs>
              <marker id="arrowTealPLL" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                <path d="M0,0 L8,4 L0,8 Z" fill={TEAL} />
              </marker>
              <marker id="arrowGrayPLL" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                <path d="M0,0 L8,4 L0,8 Z" fill="#555" />
              </marker>
            </defs>

            {/* Links between nodes */}
            {nodes.slice(0, -1).map((nd, i) => {
              const x1 = xFor(nd.idx) + BOX;
              const x2 = xFor(nodes[i + 1].idx);
              const yMid = 50 + BOX / 2;
              return (
                <line key={i} x1={x1} y1={yMid} x2={x2} y2={yMid}
                  stroke={TEAL} strokeWidth="2.5" markerEnd="url(#arrowTealPLL)" />
              );
            })}
            {/* tail -> null */}
            {nodes.length > 0 && (() => {
              const tail = nodes[nodes.length - 1];
              const x1 = xFor(tail.idx) + BOX;
              const yMid = 50 + BOX / 2;
              return (
                <line x1={x1} y1={yMid} x2={x1 + 28} y2={yMid}
                  stroke="#555" strokeWidth="2" markerEnd="url(#arrowGrayPLL)" />
              );
            })()}
          </svg>

          {/* Node boxes */}
          <div className="absolute left-0" style={{ top: 50 }}>
            {nodes.map((nd) => {
              const isTemp = s.tempIdx === nd.idx;
              const isCurr = s.curIdx === nd.idx;
              const flashGood = isCurr && s.match === true;
              const flashBad  = isCurr && s.match === false;

              return (
                <div key={nd.idx} className="absolute text-center" style={{ left: xFor(nd.idx), width: BOX }}>
                  <div className="flex justify-center gap-1 mb-1" style={{ height: 16 }}>
                    {isTemp && <Chip color={AMBER} label="temp" />}
                    {isCurr && <Chip color={TEAL} label="curr" />}
                  </div>
                  <div
                    className="flex items-center justify-center text-lg font-bold rounded-xl transition-all duration-300"
                    style={{
                      width: BOX,
                      height: BOX,
                      border: `2.5px solid ${flashBad ? RED : flashGood ? GREEN : isTemp ? AMBER : isCurr ? TEAL : '#3e3e3c'}`,
                      background: flashBad ? 'rgba(239,83,80,.2)' : flashGood ? 'rgba(76,175,80,.15)' : isTemp ? `${AMBER}22` : isCurr ? `${TEAL}22` : MID,
                      color: flashBad ? RED : flashGood ? GREEN : '#eee',
                      boxShadow: flashBad ? `0 0 14px rgba(239,83,80,.45)` : flashGood ? `0 0 12px rgba(76,175,80,.4)` : isTemp ? `0 0 10px ${AMBER}55` : isCurr ? `0 0 10px ${TEAL}55` : 'none',
                      transform: (flashBad || flashGood) ? 'scale(1.1)' : 'scale(1)',
                    }}
                  >
                    {nd.val}
                  </div>
                  <div className="text-[10px] mt-1 text-gray-600">idx {nd.idx}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 🧱 STACK CONTAINER */}
        <div className="flex flex-col items-center">
          <div className="text-xs uppercase tracking-widest mb-2 text-gray-600">Stack</div>

          <div
            className="relative flex flex-col-reverse justify-start items-center rounded-xl overflow-hidden"
            style={{
              width: STK_W,
              height: STK_ITEM_H * 5 + 10,
              border: '2px solid #3e3e3c',
              borderTop: 'none',
              background: 'rgba(255,255,255,.03)',
              padding: '4px 0',
            }}
          >
            {stack.length === 0 && (
              <span className="text-[10px] text-gray-700 mb-2">empty</span>
            )}
            {stack.map((v, i) => {
              const isTop = i === stack.length - 1;
              const flashGood = isTop && s.match === true;
              const flashBad  = isTop && s.match === false;
              const isPeek = isTop && s.phase === 'compare';

              return (
                <div
                  key={`${i}-${v}`}
                  className="flex items-center justify-center text-sm font-bold rounded-md mb-1 transition-all duration-300"
                  style={{
                    width: STK_W - 12,
                    height: STK_ITEM_H - 6,
                    border: `2px solid ${flashBad ? RED : flashGood ? GREEN : isPeek ? TEAL : `${TEAL}55`}`,
                    background: flashBad ? 'rgba(239,83,80,.25)' : flashGood ? 'rgba(76,175,80,.2)' : isPeek ? `${TEAL}22` : `${TEAL}11`,
                    color: flashBad ? RED : flashGood ? GREEN : '#eee',
                    boxShadow: (flashBad || flashGood || isPeek) ? `0 0 10px ${flashBad ? 'rgba(239,83,80,.5)' : flashGood ? 'rgba(76,175,80,.5)' : `${TEAL}55`}` : 'none',
                    transform: isTop ? 'scale(1.05)' : 'scale(1)',
                    animation: 'none',
                  }}
                >
                  {v}
                </div>
              );
            })}
          </div>

          <div
            className="text-[10px] mt-1 px-2 py-0.5 rounded"
            style={{ background: '#2e2e2c', color: '#888' }}
          >
            top ↑
          </div>
        </div>
      </div>

      {/* Step description */}
      <div
        className="mt-6 px-4 py-3 rounded-xl text-sm leading-relaxed"
        style={{
          background: s.match === false || (s.phase === 'done' && !s.result)
            ? 'rgba(239,83,80,.08)'
            : (s.match === true || (s.phase === 'done' && s.result))
            ? 'rgba(76,175,80,.1)'
            : 'rgba(255,255,255,.04)',
          border: `1px solid ${
            s.match === false || (s.phase === 'done' && !s.result) ? 'rgba(239,83,80,.35)' : '#2e2e2c'
          }`,
          color: s.match === false || (s.phase === 'done' && !s.result)
            ? RED
            : (s.match === true || (s.phase === 'done' && s.result))
            ? GREEN
            : '#ccc',
        }}
      >
        {s.desc}
      </div>
    </div>
  );
}

function Chip({ color, label }) {
  return (
    <span
      className="text-[9px] font-bold px-1.5 py-0.5 rounded"
      style={{ color, background: `${color}1a`, border: `1px solid ${color}55` }}
    >
      {label}
    </span>
  );
}