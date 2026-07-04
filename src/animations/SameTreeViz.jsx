// src/animations/SameTreeViz.jsx
const TEAL  = '#348681';
const GREEN = '#4caf50';
const RED   = '#ef5350';
const AMBER = '#f5a623';
const MID   = '#2A2A28';

const CELL = 72;
const NODE = 44;

function TreePanel({ label, treeNodes, activeIdx, mismatchIdx, matchedIdxs, ghostPos }) {
  const maxX = treeNodes.length ? Math.max(...treeNodes.map(n => n.x)) : 0;
  const minX = treeNodes.length ? Math.min(...treeNodes.map(n => n.x)) : 0;
  const maxY = treeNodes.length ? Math.max(...treeNodes.map(n => n.y)) : 0;
  const width = (maxX - minX + 1) * CELL;
  const height = (maxY + 1) * CELL;

  const posOf = (idx) => {
    const nd = treeNodes.find(n => n.idx === idx);
    return nd ? { x: (nd.x - minX) * CELL + CELL / 2, y: nd.y * CELL + CELL / 2 } : null;
  };

  return (
    <div>
      <div className="text-xs uppercase tracking-widest mb-2 text-gray-600">{label}</div>
      <div className="relative" style={{ width: Math.max(width, 90), height: Math.max(height, 90) }}>
        <svg className="absolute left-0 top-0" width={width} height={height} style={{ pointerEvents: 'none' }}>
          {treeNodes.map((nd) => {
            const p = posOf(nd.idx);
            return ['left', 'right'].map((side) => {
              const childIdx = nd[side];
              if (childIdx === null || childIdx === undefined) return null;
              const c = posOf(childIdx);
              if (!c || !p) return null;
              return <line key={`${nd.idx}-${side}`} x1={p.x} y1={p.y} x2={c.x} y2={c.y} stroke="#3e3e3c" strokeWidth="2" />;
            });
          })}
          {/* Ghost line to a missing node position */}
          {ghostPos && ghostPos.parentIdx !== undefined && (() => {
            const p = posOf(ghostPos.parentIdx);
            if (!p) return null;
            return <line x1={p.x} y1={p.y} x2={ghostPos.x} y2={ghostPos.y} stroke={RED} strokeWidth="2" strokeDasharray="4,4" opacity="0.5" />;
          })()}
        </svg>

        {treeNodes.map((nd) => {
          const p = posOf(nd.idx);
          const isActive = activeIdx === nd.idx;
          const isMismatch = mismatchIdx === nd.idx;
          const isMatched = matchedIdxs.includes(nd.idx) && !isActive;

          return (
            <div
              key={nd.idx}
              className="absolute flex items-center justify-center rounded-full text-base font-bold transition-all duration-300"
              style={{
                left: p.x - NODE / 2, top: p.y - NODE / 2, width: NODE, height: NODE,
                border: `2.5px solid ${isMismatch ? RED : isActive ? AMBER : isMatched ? GREEN : '#3e3e3c'}`,
                background: isMismatch ? 'rgba(239,83,80,.2)' : isActive ? `${AMBER}33` : isMatched ? `${GREEN}18` : MID,
                color: isMismatch ? RED : isActive ? AMBER : isMatched ? GREEN : '#ccc',
                boxShadow: isMismatch ? `0 0 14px rgba(239,83,80,.5)` : isActive ? `0 0 12px ${AMBER}66` : 'none',
                transform: (isMismatch || isActive) ? 'scale(1.12)' : 'scale(1)',
                zIndex: 2,
              }}
            >
              {nd.val}
            </div>
          );
        })}

        {/* Ghost circle for a structurally-missing node */}
        {ghostPos && (
          <div
            className="absolute flex items-center justify-center rounded-full text-sm font-bold"
            style={{
              left: ghostPos.x - NODE / 2, top: ghostPos.y - NODE / 2, width: NODE, height: NODE,
              border: `2px dashed ${RED}`, color: RED, opacity: 0.6,
            }}
          >
            ∅
          </div>
        )}
      </div>
    </div>
  );
}

export default function SameTreeViz({ step, test }) {
  const s = test.steps[Math.min(step, test.steps.length - 1)] || {};
  const pNodes = test.pNodes || [];
  const qNodes = test.qNodes || [];

  // Build a running set of "matched" node idxs based on phase history up to current step
  const matchedP = [];
  const matchedQ = [];
  for (let i = 0; i <= Math.min(step, test.steps.length - 1); i++) {
    const st = test.steps[i];
    if (st.phase === 'compare-values' || st.phase === 'subtree-done') {
      if (st.pIdx !== null && st.pIdx !== undefined) matchedP.push(st.pIdx);
      if (st.qIdx !== null && st.qIdx !== undefined) matchedQ.push(st.qIdx);
    }
  }

  const isMismatchFrame = s.phase === 'value-mismatch' || s.phase === 'one-null';

  // Compute ghost position for one-null mismatches
  let ghostP = null, ghostQ = null;
  if (s.phase === 'one-null') {
    if (s.pIdx !== null && s.pIdx !== undefined && (s.qIdx === null || s.qIdx === undefined)) {
      // q is missing a node that p has — show ghost on q's side roughly mirroring p's position
      const pNode = pNodes.find(n => n.idx === s.pIdx);
      if (pNode) ghostQ = { x: pNode.x * CELL + CELL / 2 - Math.min(...qNodes.map(n=>n.x), 0) * CELL, y: pNode.y * CELL + CELL / 2, parentIdx: undefined };
    }
  }

  return (
    <div className="px-6 py-5 font-mono">
      {/* Phase badge */}
      <div className="mb-6">
        <span
          className="inline-block text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full font-bold transition-all duration-300"
          style={{
            background: s.phase === 'done' ? (s.result ? 'rgba(76,175,80,.12)' : 'rgba(239,83,80,.12)')
              : isMismatchFrame ? 'rgba(239,83,80,.12)'
              : s.phase === 'both-null' ? 'rgba(76,175,80,.12)'
              : `${AMBER}1a`,
            color: s.phase === 'done' ? (s.result ? GREEN : RED) : isMismatchFrame ? RED : s.phase === 'both-null' ? GREEN : AMBER,
            border: `1px solid ${
              s.phase === 'done' ? (s.result ? 'rgba(76,175,80,.35)' : 'rgba(239,83,80,.35)') : isMismatchFrame ? 'rgba(239,83,80,.35)' : s.phase === 'both-null' ? 'rgba(76,175,80,.35)' : `${AMBER}44`
            }`,
          }}
        >
          {s.phase === 'compare-both-exist' && 'Comparing Node Pair'}
          {s.phase === 'compare-values' && 'Values Match ✅'}
          {s.phase === 'value-mismatch' && 'Value Mismatch! ❌'}
          {s.phase === 'both-null' && 'Both Null — Match'}
          {s.phase === 'one-null' && 'Structural Mismatch! ❌'}
          {s.phase === 'subtree-done' && 'Subtree Confirmed ✅'}
          {s.phase === 'done' && (s.result ? 'Same Tree ✅' : 'Different Trees ❌')}
        </span>
      </div>

      <div className="flex gap-10 items-start flex-wrap mb-4">
        <TreePanel label="Tree p" treeNodes={pNodes} activeIdx={s.pIdx} mismatchIdx={isMismatchFrame ? s.pIdx : null} matchedIdxs={matchedP} ghostPos={null} />
        <TreePanel label="Tree q" treeNodes={qNodes} activeIdx={s.qIdx} mismatchIdx={isMismatchFrame ? s.qIdx : null} matchedIdxs={matchedQ} ghostPos={ghostQ} />
      </div>

      {/* Step description */}
      <div
        className="px-4 py-3 rounded-xl text-sm leading-relaxed"
        style={{
          background: s.phase === 'done' ? (s.result ? 'rgba(76,175,80,.1)' : 'rgba(239,83,80,.08)') : isMismatchFrame ? 'rgba(239,83,80,.08)' : 'rgba(255,255,255,.04)',
          border: `1px solid ${s.phase === 'done' ? (s.result ? 'rgba(76,175,80,.35)' : 'rgba(239,83,80,.35)') : isMismatchFrame ? 'rgba(239,83,80,.35)' : '#2e2e2c'}`,
          color: s.phase === 'done' ? (s.result ? GREEN : RED) : isMismatchFrame ? RED : '#ccc',
        }}
      >
        {s.desc}
      </div>
    </div>
  );
}