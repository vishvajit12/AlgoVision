// src/animations/FlattenMultilevelListViz.jsx
const TEAL   = '#348681';
const GREEN  = '#4caf50';
const AMBER  = '#f5a623';
const MID    = '#2A2A28';

const CELL = 72;
const NODE = 44;
const STK_W = 68;
const STK_ITEM_H = 34;

export default function FlattenMultilevelListViz({ step, test }) {
  const s     = test.steps[Math.min(step, test.steps.length - 1)] || {};
  const nodes = test.nodes || [];
  const callStack = s.callStack || [];
  const flat = s.flat || [];
  const links = s.links || [];

  const maxX = nodes.length ? Math.max(...nodes.map(n => n.x)) : 0;
  const maxY = nodes.length ? Math.max(...nodes.map(n => n.y)) : 0;
  const gridW = (maxX + 1) * CELL;
  const gridH = (maxY + 1) * CELL;

  const posOf = (id) => {
    const nd = nodes.find(n => n.id === id);
    return nd ? { x: nd.x * CELL + CELL / 2, y: nd.y * CELL + CELL / 2 } : null;
  };

  const linkedSet = new Set();
  links.forEach(([a, b]) => { linkedSet.add(`${a}-${b}`); });

  return (
    <div className="px-6 py-5 font-mono">
      {/* Phase badge */}
      <div className="mb-6">
        <span
          className="inline-block text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full font-bold transition-all duration-300"
          style={{
            background: s.phase === 'done' ? 'rgba(76,175,80,.12)' : s.phase === 'link' ? `${GREEN}1a` : s.phase === 'visit-has-child' ? `${AMBER}1a` : `${TEAL}1a`,
            color: s.phase === 'done' ? GREEN : s.phase === 'link' ? GREEN : s.phase === 'visit-has-child' ? AMBER : TEAL,
            border: `1px solid ${s.phase === 'done' ? 'rgba(76,175,80,.35)' : s.phase === 'link' ? `${GREEN}44` : s.phase === 'visit-has-child' ? `${AMBER}44` : `${TEAL}33`}`,
          }}
        >
          {s.phase === 'init' && 'Starting flatten()'}
          {s.phase === 'visit-no-child' && 'Visit — No Child'}
          {s.phase === 'visit-has-child' && 'Visit — Has Child! Recursing First'}
          {s.phase === 'recurse-push' && 'Recursion Deepens'}
          {s.phase === 'recurse-pop' && 'Child Fully Flattened — Returning'}
          {s.phase === 'link' && 'Splicing Child Into Main Chain'}
          {s.phase === 'done' && 'Flatten Complete ✅'}
        </span>
      </div>

      {nodes.length === 0 ? (
        <div className="text-xs text-gray-700 mb-4">(empty list)</div>
      ) : (
        <div className="flex gap-8 items-start flex-wrap mb-6">
          {/* Original structure */}
          <div>
            <div className="text-xs uppercase tracking-widest mb-2 text-gray-600">Multilevel Structure</div>
            <div className="relative" style={{ width: gridW, height: gridH }}>
              <svg className="absolute left-0 top-0" width={gridW} height={gridH} style={{ pointerEvents: 'none' }}>
                {/* original next links */}
                {nodes.map((nd) => {
                  if (nd.next === null || nd.next === undefined) return null;
                  const p = posOf(nd.id), c = posOf(nd.next);
                  if (!p || !c) return null;
                  const isNowLinked = linkedSet.has(`${nd.id}-${nd.next}`);
                  return (
                    <line key={`next-${nd.id}`} x1={p.x} y1={p.y} x2={c.x} y2={c.y}
                      stroke={isNowLinked ? GREEN : '#3e3e3c'} strokeWidth={isNowLinked ? 2.5 : 2}
                      style={{ transition: 'all .3s ease-out' }} />
                  );
                })}
                {/* original child links (dashed) */}
                {nodes.map((nd) => {
                  if (nd.child === null || nd.child === undefined) return null;
                  const p = posOf(nd.id), c = posOf(nd.child);
                  if (!p || !c) return null;
                  const isNowLinked = linkedSet.has(`${nd.id}-${nd.child}`);
                  return (
                    <line key={`child-${nd.id}`} x1={p.x} y1={p.y} x2={c.x} y2={c.y}
                      stroke={isNowLinked ? GREEN : '#3e3e3c'}
                      strokeWidth={isNowLinked ? 2.5 : 2}
                      strokeDasharray={isNowLinked ? '0' : '4,4'}
                      style={{ transition: 'all .3s ease-out' }} />
                  );
                })}
                {/* new reconnection links (tail -> nextNode), drawn only if not an existing next/child edge */}
                {links.map(([a, b], i) => {
                  const isOriginalNext = nodes.find(n => n.id === a && n.next === b);
                  const isOriginalChild = nodes.find(n => n.id === a && n.child === b);
                  if (isOriginalNext || isOriginalChild) return null;
                  const p = posOf(a), c = posOf(b);
                  if (!p || !c) return null;
                  const midX = (p.x + c.x) / 2, midY = (p.y + c.y) / 2 - 30;
                  return (
                    <path key={`new-${i}`} d={`M ${p.x} ${p.y} Q ${midX} ${midY} ${c.x} ${c.y}`}
                      fill="none" stroke={GREEN} strokeWidth="2.5" style={{ transition: 'all .4s ease-out' }} />
                  );
                })}
              </svg>

              {nodes.map((nd) => {
                const isActive = s.active === nd.id;
                const isInFlat = flat.includes(nd.id);
                const p = posOf(nd.id);
                return (
                  <div
                    key={nd.id}
                    className="absolute flex items-center justify-center rounded-full text-sm font-bold transition-all duration-300"
                    style={{
                      left: p.x - NODE / 2, top: p.y - NODE / 2, width: NODE, height: NODE,
                      border: `2.5px solid ${isActive ? AMBER : isInFlat ? GREEN : '#3e3e3c'}`,
                      background: isActive ? `${AMBER}33` : isInFlat ? `${GREEN}18` : MID,
                      color: isActive ? AMBER : isInFlat ? GREEN : '#ccc',
                      boxShadow: isActive ? `0 0 14px ${AMBER}66` : 'none',
                      transform: isActive ? 'scale(1.15)' : 'scale(1)',
                      zIndex: 2,
                    }}
                  >
                    {nd.val}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Call stack */}
          <div className="flex flex-col items-center">
            <div className="text-xs uppercase tracking-widest mb-2 text-gray-600">call stack</div>
            <div
              className="relative flex flex-col-reverse justify-start items-center rounded-xl overflow-hidden"
              style={{ width: STK_W, height: STK_ITEM_H * 4 + 10, border: '2px solid #3e3e3c', borderTop: 'none', background: 'rgba(255,255,255,.03)', padding: '4px 0' }}
            >
              {callStack.length === 0 && <span className="text-[10px] text-gray-700 mb-2">empty</span>}
              {callStack.map((val, i) => {
                const isTop = i === callStack.length - 1;
                return (
                  <div key={`${i}-${val}`} className="flex items-center justify-center text-xs font-bold rounded-md mb-1 transition-all duration-300"
                    style={{
                      width: STK_W - 12, height: STK_ITEM_H - 6,
                      border: `2px solid ${isTop ? TEAL : `${TEAL}55`}`,
                      background: isTop ? `${TEAL}22` : `${TEAL}11`,
                      color: isTop ? TEAL : '#eee',
                      boxShadow: isTop ? `0 0 8px ${TEAL}44` : 'none',
                    }}>
                    solve({val})
                  </div>
                );
              })}
            </div>
            <div className="text-[10px] mt-1 px-2 py-0.5 rounded" style={{ background: '#2e2e2c', color: '#888' }}>top ↑</div>
          </div>
        </div>
      )}

      {/* Flattened result strip */}
      <div className="mb-4">
        <div className="text-xs uppercase tracking-widest mb-2 text-gray-600">flattened order (so far)</div>
        <div className="flex flex-wrap gap-2 min-h-11 px-3 py-2 rounded-xl items-center" style={{ background: 'rgba(255,255,255,.03)', border: '1px solid #2e2e2c' }}>
          {flat.length === 0 ? (
            <span className="text-xs text-gray-700">[ ]</span>
          ) : (
            flat.map((v, i) => (
              <span key={i} className="px-2.5 py-1 rounded-lg text-sm font-bold" style={{ background: `${GREEN}14`, border: `1.5px solid ${GREEN}44`, color: GREEN }}>
                {v}
              </span>
            ))
          )}
        </div>
      </div>

      {/* Step description */}
      <div
        className="px-4 py-3 rounded-xl text-sm leading-relaxed"
        style={{
          background: s.phase === 'done' ? 'rgba(76,175,80,.1)' : s.phase === 'link' ? `${GREEN}14` : 'rgba(255,255,255,.04)',
          border: `1px solid ${s.phase === 'done' ? 'rgba(76,175,80,.35)' : s.phase === 'link' ? `${GREEN}44` : '#2e2e2c'}`,
          color: s.phase === 'done' ? GREEN : s.phase === 'link' ? GREEN : '#ccc',
        }}
      >
        {s.desc}
      </div>
    </div>
  );
}