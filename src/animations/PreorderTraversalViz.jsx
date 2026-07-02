// src/animations/PreorderTraversalViz.jsx
const TEAL   = '#348681';
const GREEN  = '#4caf50';
const AMBER  = '#f5a623';
const MID    = '#2A2A28';

const CELL = 74;
const NODE = 44;
const STK_W = 56;
const STK_ITEM_H = 38;

export default function PreorderTraversalViz({ step, test }) {
  const s     = test.steps[Math.min(step, test.steps.length - 1)] || {};
  const nodes = test.treeNodes || [];
  const stack = s.stack || [];
  const result = s.result || [];

  const maxX = nodes.length ? Math.max(...nodes.map(n => n.x)) : 0;
  const maxY = nodes.length ? Math.max(...nodes.map(n => n.y)) : 0;
  const treeW = (maxX + 1) * CELL;
  const treeH = (maxY + 1) * CELL;

  const posOf = (idx) => {
    const nd = nodes.find(n => n.idx === idx);
    return nd ? { x: nd.x * CELL + CELL / 2, y: nd.y * CELL + CELL / 2 } : null;
  };

  const settledIdxs = new Set();
  result.forEach(val => {
    const nd = nodes.find(n => n.val === val);
    if (nd) settledIdxs.add(nd.idx);
  });

  return (
    <div className="px-6 py-5 font-mono">
      {/* Phase badge */}
      <div className="mb-6">
        <span
          className="inline-block text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full font-bold transition-all duration-300"
          style={{
            background: s.phase === 'done' ? 'rgba(76,175,80,.12)' : s.phase === 'pop' ? `${AMBER}1a` : `${TEAL}1a`,
            color: s.phase === 'done' ? GREEN : s.phase === 'pop' ? AMBER : TEAL,
            border: `1px solid ${s.phase === 'done' ? 'rgba(76,175,80,.35)' : s.phase === 'pop' ? `${AMBER}44` : `${TEAL}33`}`,
          }}
        >
          {s.phase === 'init' && 'Pushing Root'}
          {s.phase === 'pop' && 'Pop & Visit (before children!)'}
          {(s.phase === 'push-right' || s.phase === 'push-right-skip') && 'Checking Right Child'}
          {(s.phase === 'push-left' || s.phase === 'push-left-skip') && 'Checking Left Child'}
          {s.phase === 'done' && 'Traversal Complete ✅'}
        </span>
      </div>

      <div className="flex gap-10 items-start flex-wrap mb-6">
        {/* Tree canvas */}
        <div>
          <div className="text-xs uppercase tracking-widest mb-2 text-gray-600">Tree (root → left → right)</div>
          <div className="relative" style={{ width: Math.max(treeW, 120), height: Math.max(treeH, 100) }}>
            {nodes.length === 0 && <div className="text-xs text-gray-700 pt-6">(empty tree)</div>}
            <svg className="absolute left-0 top-0" width={treeW} height={treeH} style={{ pointerEvents: 'none' }}>
              {nodes.map((nd) => {
                const p = posOf(nd.idx);
                return ['left', 'right'].map((side) => {
                  const childIdx = nd[side];
                  if (childIdx === null || childIdx === undefined) return null;
                  const c = posOf(childIdx);
                  if (!c || !p) return null;
                  return <line key={`${nd.idx}-${side}`} x1={p.x} y1={p.y} x2={c.x} y2={c.y} stroke="#3e3e3c" strokeWidth="2" />;
                });
              })}
            </svg>

            {nodes.map((nd) => {
              const p = posOf(nd.idx);
              const isVisiting = s.visitIdx === nd.idx;
              const isOnStack = stack.includes(nd.idx);
              const isSettled = settledIdxs.has(nd.idx) && !isVisiting;

              return (
                <div
                  key={nd.idx}
                  className="absolute flex items-center justify-center rounded-full text-base font-bold transition-all duration-300"
                  style={{
                    left: p.x - NODE / 2, top: p.y - NODE / 2, width: NODE, height: NODE,
                    border: `2.5px solid ${isVisiting ? AMBER : isSettled ? GREEN : isOnStack ? `${TEAL}88` : '#3e3e3c'}`,
                    background: isVisiting ? `${AMBER}33` : isSettled ? `${GREEN}18` : isOnStack ? `${TEAL}11` : MID,
                    color: isVisiting ? AMBER : isSettled ? GREEN : isOnStack ? TEAL : '#ccc',
                    boxShadow: isVisiting ? `0 0 14px ${AMBER}66` : isOnStack ? `0 0 8px ${TEAL}44` : 'none',
                    transform: isVisiting ? 'scale(1.15)' : 'scale(1)',
                    zIndex: 2,
                  }}
                >
                  {nd.val}
                </div>
              );
            })}
          </div>
        </div>

        {/* Stack container */}
        <div className="flex flex-col items-center">
          <div className="text-xs uppercase tracking-widest mb-2 text-gray-600">Stack</div>
          <div
            className="relative flex flex-col-reverse justify-start items-center rounded-xl overflow-hidden"
            style={{
              width: STK_W,
              height: STK_ITEM_H * 6 + 10,
              border: '2px solid #3e3e3c',
              borderTop: 'none',
              background: 'rgba(255,255,255,.03)',
              padding: '4px 0',
            }}
          >
            {stack.length === 0 && <span className="text-[10px] text-gray-700 mb-2">empty</span>}
            {stack.map((idx, i) => {
              const nd = nodes.find(n => n.idx === idx);
              const isTop = i === stack.length - 1;
              const aboutToPop = isTop && s.phase === 'pop';
              return (
                <div
                  key={`${i}-${idx}`}
                  className="flex items-center justify-center text-sm font-bold rounded-md mb-1 transition-all duration-300"
                  style={{
                    width: STK_W - 12, height: STK_ITEM_H - 6,
                    border: `2px solid ${aboutToPop ? AMBER : `${TEAL}55`}`,
                    background: aboutToPop ? `${AMBER}22` : `${TEAL}11`,
                    color: aboutToPop ? AMBER : '#eee',
                    boxShadow: aboutToPop ? `0 0 10px ${AMBER}55` : 'none',
                    transform: isTop ? 'scale(1.05)' : 'scale(1)',
                  }}
                >
                  {nd?.val}
                </div>
              );
            })}
          </div>
          <div className="text-[10px] mt-1 px-2 py-0.5 rounded" style={{ background: '#2e2e2c', color: '#888' }}>
            top ↑
          </div>
        </div>

        {/* Result array */}
        <div>
          <div className="text-xs uppercase tracking-widest mb-2 text-gray-600">Result</div>
          <div className="flex flex-wrap gap-2 min-h-12 px-3 py-2.5 rounded-xl items-center"
               style={{ background: 'rgba(255,255,255,.03)', border: '1px solid #2e2e2c', minWidth: 120 }}>
            {result.length === 0 ? (
              <span className="text-xs text-gray-700">[ ]</span>
            ) : (
              result.map((v, i) => {
                const justAdded = i === result.length - 1 && s.phase === 'pop';
                return (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-lg text-sm font-bold transition-all duration-300"
                    style={{
                      background: justAdded ? 'rgba(245,166,35,.22)' : `${GREEN}14`,
                      border: `1.5px solid ${justAdded ? AMBER : `${GREEN}44`}`,
                      color: justAdded ? AMBER : GREEN,
                      boxShadow: justAdded ? `0 0 12px rgba(245,166,35,.5)` : 'none',
                      transform: justAdded ? 'scale(1.1)' : 'scale(1)',
                    }}
                  >
                    {v}
                  </span>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Step description */}
      <div
        className="px-4 py-3 rounded-xl text-sm leading-relaxed"
        style={{
          background: s.phase === 'done' ? 'rgba(76,175,80,.1)' : s.phase === 'pop' ? `${AMBER}14` : 'rgba(255,255,255,.04)',
          border: `1px solid ${s.phase === 'done' ? 'rgba(76,175,80,.35)' : s.phase === 'pop' ? `${AMBER}44` : '#2e2e2c'}`,
          color: s.phase === 'done' ? GREEN : s.phase === 'pop' ? AMBER : '#ccc',
        }}
      >
        {s.desc}
      </div>
    </div>
  );
}