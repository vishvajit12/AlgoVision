// src/animations/BinaryTreeInorderViz.jsx
const TEAL   = '#348681';
const GREEN  = '#4caf50';
const RED    = '#ef5350';
const AMBER  = '#f5a623';
const MID    = '#2A2A28';

const CELL = 80;   // grid unit for tree layout
const NODE = 46;   // node circle diameter
const STK_W = 60;
const STK_ITEM_H = 38;

export default function BinaryTreeInorderViz({ step, test }) {
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

  return (
    <div className="px-6 py-5 font-mono">
      {/* Phase badge */}
      <div className="mb-6">
        <span
          className="inline-block text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full font-bold transition-all duration-300"
          style={{
            background: s.phase === 'done' ? 'rgba(76,175,80,.12)' : s.phase === 'visit' ? `${AMBER}1a` : `${TEAL}1a`,
            color: s.phase === 'done' ? GREEN : s.phase === 'visit' ? AMBER : TEAL,
            border: `1px solid ${s.phase === 'done' ? 'rgba(76,175,80,.35)' : s.phase === 'visit' ? `${AMBER}44` : `${TEAL}33`}`,
          }}
        >
          {s.phase === 'descend' && 'Going Left / Pushing'}
          {s.phase === 'visit' && 'Popping & Visiting'}
          {s.phase === 'done' && 'Traversal Complete ✅'}
        </span>
      </div>

      <div className="flex gap-10 items-start flex-wrap mb-6">
        {/* Tree canvas */}
        <div>
          <div className="text-xs uppercase tracking-widest mb-2 text-gray-600">Tree</div>
          <div className="relative" style={{ width: Math.max(treeW, 120), height: Math.max(treeH, 100) }}>
            {nodes.length === 0 && (
              <div className="text-xs text-gray-700 pt-6">(empty tree)</div>
            )}
            {/* Edges */}
            <svg className="absolute left-0 top-0" width={treeW} height={treeH} style={{ pointerEvents: 'none' }}>
              {nodes.map((nd) => {
                const p = posOf(nd.idx);
                return ['left', 'right'].map((side) => {
                  const childIdx = nd[side];
                  if (childIdx === null || childIdx === undefined) return null;
                  const c = posOf(childIdx);
                  if (!c || !p) return null;
                  return (
                    <line key={`${nd.idx}-${side}`}
                      x1={p.x} y1={p.y} x2={c.x} y2={c.y}
                      stroke="#3e3e3c" strokeWidth="2" />
                  );
                });
              })}
            </svg>

            {/* Nodes */}
            {nodes.map((nd) => {
              const p = posOf(nd.idx);
              const isCurr = s.currIdx === nd.idx;
              const isOnStack = stack.includes(nd.idx);
              const isVisiting = s.visitIdx === nd.idx;
              const visitedIdx = result.includes(nd.val) && result.indexOf(nd.val) !== -1 &&
                (nodes.filter(n2 => n2.val === nd.val).length === 1 ? true : false); // safe for unique vals in demo trees

              return (
                <div
                  key={nd.idx}
                  className="absolute flex items-center justify-center rounded-full text-base font-bold transition-all duration-300"
                  style={{
                    left: p.x - NODE / 2, top: p.y - NODE / 2, width: NODE, height: NODE,
                    border: `2.5px solid ${isVisiting ? AMBER : isCurr ? TEAL : isOnStack ? `${TEAL}88` : '#3e3e3c'}`,
                    background: isVisiting ? `${AMBER}33` : isCurr ? `${TEAL}22` : isOnStack ? `${TEAL}11` : MID,
                    color: isVisiting ? AMBER : isCurr ? TEAL : '#eee',
                    boxShadow: isVisiting ? `0 0 14px ${AMBER}66` : isCurr ? `0 0 10px ${TEAL}55` : 'none',
                    transform: isVisiting ? 'scale(1.15)' : 'scale(1)',
                    zIndex: 2,
                  }}
                >
                  {nd.val}
                </div>
              );
            })}

            {/* curr = null pointer marker, shown once tree exists */}
            {nodes.length > 0 && (s.currIdx === null || s.currIdx === undefined) && (
              <div className="absolute text-[10px] text-gray-600" style={{ top: -18, left: 0 }}>
                curr → null
              </div>
            )}
          </div>
        </div>

        {/* Stack container */}
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
            {stack.length === 0 && <span className="text-[10px] text-gray-700 mb-2">empty</span>}
            {stack.map((idx, i) => {
              const nd = nodes.find(n => n.idx === idx);
              const isTop = i === stack.length - 1;
              const beingPopped = isTop && s.phase === 'visit';
              return (
                <div
                  key={`${i}-${idx}`}
                  className="flex items-center justify-center text-sm font-bold rounded-md mb-1 transition-all duration-300"
                  style={{
                    width: STK_W - 12, height: STK_ITEM_H - 6,
                    border: `2px solid ${beingPopped ? AMBER : `${TEAL}55`}`,
                    background: beingPopped ? `${AMBER}22` : `${TEAL}11`,
                    color: beingPopped ? AMBER : '#eee',
                    boxShadow: beingPopped ? `0 0 10px ${AMBER}55` : 'none',
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
                const justAdded = i === result.length - 1 && s.phase === 'visit';
                return (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-lg text-sm font-bold transition-all duration-300"
                    style={{
                      background: justAdded ? 'rgba(76,175,80,.22)' : `${GREEN}14`,
                      border: `1.5px solid ${justAdded ? GREEN : `${GREEN}44`}`,
                      color: GREEN,
                      boxShadow: justAdded ? `0 0 12px rgba(76,175,80,.5)` : 'none',
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
          background: s.phase === 'done' ? 'rgba(76,175,80,.1)' : s.phase === 'visit' ? `${AMBER}14` : 'rgba(255,255,255,.04)',
          border: `1px solid ${s.phase === 'done' ? 'rgba(76,175,80,.35)' : s.phase === 'visit' ? `${AMBER}44` : '#2e2e2c'}`,
          color: s.phase === 'done' ? GREEN : s.phase === 'visit' ? AMBER : '#ccc',
        }}
      >
        {s.desc}
      </div>
    </div>
  );
}