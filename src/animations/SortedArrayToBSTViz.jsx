// src/animations/SortedArrayToBSTViz.jsx
const TEAL   = '#348681';
const GREEN  = '#4caf50';
const AMBER  = '#f5a623';
const MID    = '#2A2A28';

const CELL = 70;
const NODE = 44;
const STK_W = 74;
const STK_ITEM_H = 34;

export default function SortedArrayToBSTViz({ step, test }) {
  const s     = test.steps[Math.min(step, test.steps.length - 1)] || {};
  const arr   = test.arr || [];
  const nodes = test.treeNodes || [];
  const status = s.status || {};
  const callStack = s.callStack || [];

  const maxX = nodes.length ? Math.max(...nodes.map(n => n.x)) : 0;
  const maxY = nodes.length ? Math.max(...nodes.map(n => n.y)) : 0;
  const treeW = (maxX + 1) * CELL;
  const treeH = (maxY + 1) * CELL;

  const posOf = (idx) => {
    const nd = nodes.find(n => n.idx === idx);
    return nd ? { x: nd.x * CELL + CELL / 2, y: nd.y * CELL + CELL / 2 } : null;
  };

  const inRange = (i) => s.lo !== null && s.lo !== undefined && s.hi !== null && s.hi !== undefined && i >= s.lo && i <= s.hi;

  return (
    <div className="px-6 py-5 font-mono">
      <code className="text-gray-500 text-xs block mb-1">
        nums = [{arr.join(',')}]
      </code>

      {/* Phase badge */}
      <div className="mb-6">
        <span
          className="inline-block text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full font-bold transition-all duration-300"
          style={{
            background: s.phase === 'done' ? 'rgba(76,175,80,.12)' : s.phase === 'create' ? `${AMBER}1a` : `${TEAL}1a`,
            color: s.phase === 'done' ? GREEN : s.phase === 'create' ? AMBER : TEAL,
            border: `1px solid ${s.phase === 'done' ? 'rgba(76,175,80,.35)' : s.phase === 'create' ? `${AMBER}44` : `${TEAL}33`}`,
          }}
        >
          {s.phase === 'call' && `build(${s.lo}, ${s.hi}) — Picking Middle`}
          {s.phase === 'create' && 'Node Created'}
          {s.phase === 'base-null' && 'Base Case — Empty Range'}
          {s.phase === 'return' && 'Subtree Complete — Returning'}
          {s.phase === 'done' && 'Tree Complete ✅'}
        </span>
      </div>

      <div className="flex gap-10 items-start flex-wrap mb-6">
        {/* Array with lo/hi/mid */}
        <div>
          <div className="text-xs uppercase tracking-widest mb-2 text-gray-600">nums (sorted)</div>
          <div className="relative" style={{ paddingTop: 34 }}>
            <div className="flex gap-2">
              {arr.map((v, i) => {
                const isMid = s.mid === i;
                const dimmed = s.lo !== null && s.lo !== undefined && !inRange(i);
                return (
                  <div key={i} className="text-center relative">
                    {isMid && (
                      <div className="absolute text-[10px] font-bold px-1.5 py-0.5 rounded" style={{ top: -28, left: '50%', transform: 'translateX(-50%)', color: AMBER, background: `${AMBER}1a`, border: `1px solid ${AMBER}66`, whiteSpace: 'nowrap' }}>
                        mid
                      </div>
                    )}
                    <div
                      className="w-12 h-12 flex items-center justify-center text-base font-bold rounded-xl transition-all duration-300"
                      style={{
                        border: `2.5px solid ${isMid ? AMBER : '#3e3e3c'}`,
                        background: isMid ? `${AMBER}22` : MID,
                        color: isMid ? AMBER : '#ccc',
                        boxShadow: isMid ? `0 0 12px ${AMBER}55` : 'none',
                        transform: isMid ? 'scale(1.1)' : 'scale(1)',
                        opacity: dimmed ? 0.25 : 1,
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
        </div>

        {/* Call stack */}
        <div className="flex flex-col items-center">
          <div className="text-xs uppercase tracking-widest mb-2 text-gray-600">call stack</div>
          <div
            className="relative flex flex-col-reverse justify-start items-center rounded-xl overflow-hidden"
            style={{ width: STK_W, height: STK_ITEM_H * 5 + 10, border: '2px solid #3e3e3c', borderTop: 'none', background: 'rgba(255,255,255,.03)', padding: '4px 0' }}
          >
            {callStack.length === 0 && <span className="text-[10px] text-gray-700 mb-2">empty</span>}
            {callStack.map((frame, i) => {
              const isTop = i === callStack.length - 1;
              return (
                <div
                  key={`${i}-${frame}`}
                  className="flex items-center justify-center text-xs font-bold rounded-md mb-1 transition-all duration-300"
                  style={{
                    width: STK_W - 12, height: STK_ITEM_H - 6,
                    border: `2px solid ${isTop ? TEAL : `${TEAL}55`}`,
                    background: isTop ? `${TEAL}22` : `${TEAL}11`,
                    color: isTop ? TEAL : '#eee',
                    boxShadow: isTop ? `0 0 8px ${TEAL}44` : 'none',
                    transform: isTop ? 'scale(1.05)' : 'scale(1)',
                  }}
                >
                  build{frame}
                </div>
              );
            })}
          </div>
          <div className="text-[10px] mt-1 px-2 py-0.5 rounded" style={{ background: '#2e2e2c', color: '#888' }}>top ↑</div>
        </div>

        {/* Tree canvas */}
        <div>
          <div className="text-xs uppercase tracking-widest mb-2 text-gray-600">Balanced BST (growing)</div>
          <div className="relative" style={{ width: Math.max(treeW, 90), height: Math.max(treeH, 90) }}>
            <svg className="absolute left-0 top-0" width={treeW} height={treeH} style={{ pointerEvents: 'none' }}>
              {nodes.map((nd) => {
                const p = posOf(nd.idx);
                if (status[nd.idx] !== 'created') return null;
                return ['left', 'right'].map((side) => {
                  const childIdx = nd[side];
                  if (childIdx === null || childIdx === undefined) return null;
                  if (status[childIdx] !== 'created') return null;
                  const c = posOf(childIdx);
                  if (!c || !p) return null;
                  return <line key={`${nd.idx}-${side}`} x1={p.x} y1={p.y} x2={c.x} y2={c.y} stroke={GREEN} strokeWidth="2" style={{ transition: 'all .3s ease-out' }} />;
                });
              })}
            </svg>

            {nodes.map((nd) => {
              const st = status[nd.idx];
              const p = posOf(nd.idx);
              if (st !== 'created') {
                return (
                  <div key={nd.idx} className="absolute rounded-full" style={{ left: p.x - NODE / 2, top: p.y - NODE / 2, width: NODE, height: NODE, border: '2px dashed #3e3e3c', opacity: 0.25 }} />
                );
              }
              const isActive = s.activeIdx === nd.idx;
              return (
                <div
                  key={nd.idx}
                  className="absolute flex items-center justify-center rounded-full text-sm font-bold transition-all duration-400"
                  style={{
                    left: p.x - NODE / 2, top: p.y - NODE / 2, width: NODE, height: NODE,
                    border: `2.5px solid ${isActive ? AMBER : GREEN}`,
                    background: isActive ? `${AMBER}33` : `${GREEN}1a`,
                    color: isActive ? AMBER : GREEN,
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
      </div>

      {/* Step description */}
      <div
        className="px-4 py-3 rounded-xl text-sm leading-relaxed"
        style={{
          background: s.phase === 'done' ? 'rgba(76,175,80,.1)' : s.phase === 'create' ? `${AMBER}14` : 'rgba(255,255,255,.04)',
          border: `1px solid ${s.phase === 'done' ? 'rgba(76,175,80,.35)' : s.phase === 'create' ? `${AMBER}44` : '#2e2e2c'}`,
          color: s.phase === 'done' ? GREEN : s.phase === 'create' ? AMBER : '#ccc',
        }}
      >
        {s.desc}
      </div>
    </div>
  );
}