// src/animations/CloneGraphViz.jsx
const TEAL   = '#348681';
const GREEN  = '#4caf50';
const RED    = '#ef5350';
const AMBER  = '#f5a623';
const MID    = '#2A2A28';

const CELL = 90;
const NODE = 46;
const STK_W = 56;
const STK_ITEM_H = 38;

export default function CloneGraphViz({ step, test }) {
  const s     = test.steps[Math.min(step, test.steps.length - 1)] || {};
  const nodes = test.graphNodes || [];
  const edges = test.graphEdges || [];
  const cloneEdges = s.cloneEdges || [];
  const status = s.status || {};
  const callStack = s.callStack || [];

  const maxX = nodes.length ? Math.max(...nodes.map(n => n.x)) : 0;
  const maxY = nodes.length ? Math.max(...nodes.map(n => n.y)) : 0;
  const gridW = (maxX + 1) * CELL;
  const gridH = (maxY + 1) * CELL;

  const posOf = (id) => {
    const nd = nodes.find(n => n.id === id);
    return nd ? { x: nd.x * CELL + CELL / 2, y: nd.y * CELL + CELL / 2 } : null;
  };

  const edgeKey = (a, b) => [a, b].sort().join('-');
  const cloneEdgeSet = new Set(cloneEdges.map(([a, b]) => edgeKey(a, b)));

  return (
    <div className="px-6 py-5 font-mono">
      {/* Phase badge */}
      <div className="mb-6">
        <span
          className="inline-block text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full font-bold transition-all duration-300"
          style={{
            background: s.phase === 'done' ? 'rgba(76,175,80,.12)'
              : s.phase === 'call-visited' ? `${TEAL}1a`
              : s.phase === 'link' ? `${GREEN}1a`
              : s.phase === 'return' ? `${RED}18`
              : `${AMBER}1a`,
            color: s.phase === 'done' ? GREEN : s.phase === 'call-visited' ? TEAL : s.phase === 'link' ? GREEN : s.phase === 'return' ? RED : AMBER,
            border: `1px solid ${
              s.phase === 'done' ? 'rgba(76,175,80,.35)' : s.phase === 'call-visited' ? `${TEAL}44` : s.phase === 'link' ? `${GREEN}44` : s.phase === 'return' ? `${RED}44` : `${AMBER}44`
            }`,
          }}
        >
          {s.phase === 'init' && 'Starting'}
          {s.phase === 'call-new' && `clone(${s.activeNode}) — Not Visited, Creating`}
          {s.phase === 'call-visited' && `clone(${s.targetNode}) — Already in Map!`}
          {s.phase === 'link' && 'Linking Clone to Parent'}
          {s.phase === 'return' && `clone(${s.targetNode}) Fully Done — Returning`}
          {s.phase === 'done' && 'Clone Complete ✅'}
        </span>
      </div>

      <div className="flex gap-8 items-start flex-wrap mb-6">
        {/* Original graph */}
        <div>
          <div className="text-xs uppercase tracking-widest mb-2 text-gray-600">Original Graph</div>
          <div className="relative" style={{ width: Math.max(gridW, 100), height: Math.max(gridH, 100) }}>
            {nodes.length === 0 && <div className="text-xs text-gray-700 pt-6">(null)</div>}
            <svg className="absolute left-0 top-0" width={gridW} height={gridH} style={{ pointerEvents: 'none' }}>
              {edges.map(([a, b], i) => {
                const pa = posOf(a), pb = posOf(b);
                if (!pa || !pb) return null;
                return <line key={i} x1={pa.x} y1={pa.y} x2={pb.x} y2={pb.y} stroke="#3e3e3c" strokeWidth="2" />;
              })}
            </svg>
            {nodes.map((nd) => {
              const isActive = s.activeNode === nd.id;
              const isTarget = s.targetNode === nd.id;
              const p = posOf(nd.id);
              return (
                <div
                  key={nd.id}
                  className="absolute flex items-center justify-center rounded-full text-base font-bold transition-all duration-300"
                  style={{
                    left: p.x - NODE / 2, top: p.y - NODE / 2, width: NODE, height: NODE,
                    border: `2.5px solid ${isActive ? AMBER : isTarget ? TEAL : '#3e3e3c'}`,
                    background: isActive ? `${AMBER}33` : isTarget ? `${TEAL}22` : MID,
                    color: isActive ? AMBER : isTarget ? TEAL : '#ccc',
                    boxShadow: isActive ? `0 0 14px ${AMBER}66` : isTarget ? `0 0 10px ${TEAL}55` : 'none',
                    transform: isActive ? 'scale(1.12)' : 'scale(1)',
                    zIndex: 2,
                  }}
                >
                  {nd.id}
                </div>
              );
            })}
          </div>
        </div>

        {/* Call stack */}
        <div className="flex flex-col items-center">
          <div className="text-xs uppercase tracking-widest mb-2 text-gray-600">Call Stack</div>
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
            {callStack.length === 0 && <span className="text-[10px] text-gray-700 mb-2">empty</span>}
            {callStack.map((val, i) => {
              const isTop = i === callStack.length - 1;
              return (
                <div
                  key={`${i}-${val}`}
                  className="flex items-center justify-center text-sm font-bold rounded-md mb-1 transition-all duration-300"
                  style={{
                    width: STK_W - 12, height: STK_ITEM_H - 6,
                    border: `2px solid ${isTop ? AMBER : `${AMBER}55`}`,
                    background: isTop ? `${AMBER}22` : `${AMBER}11`,
                    color: isTop ? AMBER : '#eee',
                    boxShadow: isTop ? `0 0 10px ${AMBER}55` : 'none',
                    transform: isTop ? 'scale(1.05)' : 'scale(1)',
                  }}
                >
                  clone({val})
                </div>
              );
            })}
          </div>
          <div className="text-[10px] mt-1 px-2 py-0.5 rounded" style={{ background: '#2e2e2c', color: '#888' }}>
            top ↑
          </div>
        </div>

        {/* Clone graph */}
        <div>
          <div className="text-xs uppercase tracking-widest mb-2 text-gray-600">Clone Graph (growing)</div>
          <div className="relative" style={{ width: Math.max(gridW, 100), height: Math.max(gridH, 100) }}>
            {nodes.length === 0 && <div className="text-xs text-gray-700 pt-6">(null)</div>}
            <svg className="absolute left-0 top-0" width={gridW} height={gridH} style={{ pointerEvents: 'none' }}>
              {cloneEdges.map(([a, b], i) => {
                const pa = posOf(a), pb = posOf(b);
                if (!pa || !pb) return null;
                return (
                  <line key={i} x1={pa.x} y1={pa.y} x2={pb.x} y2={pb.y} stroke={GREEN} strokeWidth="2.5"
                    style={{ transition: 'all .3s ease-out' }} />
                );
              })}
            </svg>
            {nodes.map((nd) => {
              const st = status[nd.id] || 'pending';
              if (st === 'pending') {
                const p = posOf(nd.id);
                return (
                  <div key={nd.id} className="absolute rounded-full"
                    style={{
                      left: p.x - NODE / 2, top: p.y - NODE / 2, width: NODE, height: NODE,
                      border: '2px dashed #3e3e3c', opacity: 0.3,
                    }} />
                );
              }
              const isCloning = st === 'cloning';
              const p = posOf(nd.id);
              const isActive = s.activeNode === nd.id;
              return (
                <div
                  key={nd.id}
                  className="absolute flex items-center justify-center rounded-full text-base font-bold transition-all duration-400"
                  style={{
                    left: p.x - NODE / 2, top: p.y - NODE / 2, width: NODE, height: NODE,
                    border: `2.5px solid ${isCloning ? AMBER : GREEN}`,
                    background: isCloning ? `${AMBER}22` : `${GREEN}1a`,
                    color: isCloning ? AMBER : GREEN,
                    boxShadow: isActive ? `0 0 14px ${isCloning ? AMBER : GREEN}66` : 'none',
                    transform: isActive ? 'scale(1.1)' : 'scale(1)',
                    zIndex: 2,
                  }}
                >
                  {nd.id}'
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
          background: s.phase === 'done' ? 'rgba(76,175,80,.1)' : s.phase === 'call-visited' ? `${TEAL}14` : 'rgba(255,255,255,.04)',
          border: `1px solid ${s.phase === 'done' ? 'rgba(76,175,80,.35)' : s.phase === 'call-visited' ? `${TEAL}44` : '#2e2e2c'}`,
          color: s.phase === 'done' ? GREEN : s.phase === 'call-visited' ? TEAL : '#ccc',
        }}
      >
        {s.desc}
      </div>
    </div>
  );
}