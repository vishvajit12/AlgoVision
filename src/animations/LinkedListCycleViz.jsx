// src/animations/LinkedListCycleViz.jsx
const TEAL  = '#348681';
const GREEN = '#4caf50';
const RED   = '#ef5350';
const AMBER = '#f5a623';
const MID   = '#2A2A28';

const BOX = 56;
const GAP = 48;
const MARKER_W = 46;

export default function LinkedListCycleViz({ step, test }) {
  const s     = test.steps[Math.min(step, test.steps.length - 1)] || {};
  const nodes = test.nodes || [];
  const hasCycle = test.cycleTo !== null && test.cycleTo !== undefined;

  const xFor = (idx) => idx * (BOX + GAP);
  const rowWidth = nodes.length * BOX + Math.max(0, nodes.length - 1) * GAP;
  const canvasW = rowWidth + 60;
  const canvasH = hasCycle ? 210 : 160;

  const slowVisible = s.slowIdx !== null && s.slowIdx !== undefined;
  const fastVisible = s.fastIdx !== null && s.fastIdx !== undefined;
  const collided = slowVisible && fastVisible && s.slowIdx === s.fastIdx && s.result === true;
  const overlapping = slowVisible && fastVisible && s.slowIdx === s.fastIdx && !collided;

  const isMoving = s.phase === 'fast-hop1' || s.phase === 'fast-hop2' || s.phase === 'slow-step';

  return (
    <div className="px-6 py-5 font-mono">
      <code className="text-gray-500 text-xs block mb-1">
        head = [{nodes.map(nd => nd.val).join(',')}]{hasCycle ? ` (cycle → idx ${test.cycleTo})` : ' (no cycle)'}
      </code>

      {/* Phase / result badge */}
      <div className="mb-6">
        <span
          className="inline-block text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full font-bold transition-all duration-300"
          style={{
            background: s.result === true ? 'rgba(76,175,80,.12)'
              : s.result === false ? 'rgba(239,83,80,.12)'
              : s.phase?.startsWith('fast') ? `${AMBER}1a`
              : s.phase === 'slow-step' ? `${GREEN}1a`
              : `${TEAL}1a`,
            color: s.result === true ? GREEN : s.result === false ? RED
              : s.phase?.startsWith('fast') ? AMBER
              : s.phase === 'slow-step' ? GREEN
              : TEAL,
            border: `1px solid ${
              s.result === true ? 'rgba(76,175,80,.35)' : s.result === false ? 'rgba(239,83,80,.35)'
              : s.phase?.startsWith('fast') ? `${AMBER}44`
              : s.phase === 'slow-step' ? `${GREEN}44`
              : `${TEAL}33`
            }`,
          }}
        >
          {s.phase === 'init' && 'Starting Position'}
          {s.phase === 'fast-hop1' && '🐇 fast — Hop 1 of 2'}
          {s.phase === 'fast-hop2' && '🐇 fast — Hop 2 of 2'}
          {s.phase === 'slow-step' && !s.result && '🐢 slow — Hop 1 of 1'}
          {s.result === true && 'Cycle Detected ✅'}
          {s.result === false && 'No Cycle ❌'}
        </span>
      </div>

      {/* Canvas */}
      <div className="relative mb-6" style={{ width: canvasW, height: canvasH, paddingTop: 90 }}>
        {/* SVG structural links (static — the list shape itself) */}
        <svg className="absolute left-0 top-0" width={canvasW} height={canvasH} style={{ pointerEvents: 'none' }}>
          <defs>
            <marker id="arrowTealLLC" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 Z" fill={TEAL} />
            </marker>
            <marker id="arrowGrayLLC" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 Z" fill="#555" />
            </marker>
            <marker id="arrowAmberLLC" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 Z" fill={AMBER} />
            </marker>
          </defs>

          {nodes.slice(0, -1).map((nd, i) => {
            const x1 = xFor(nd.idx) + BOX;
            const x2 = xFor(nodes[i + 1].idx);
            const yMid = 90 + BOX / 2;
            return (
              <line key={i} x1={x1} y1={yMid} x2={x2} y2={yMid}
                stroke={TEAL} strokeWidth="2.5" markerEnd="url(#arrowTealLLC)" />
            );
          })}

          {nodes.length > 0 && (() => {
            const tail = nodes[nodes.length - 1];
            const yMid = 90 + BOX / 2;
            if (hasCycle) {
              const targetX = xFor(test.cycleTo) + BOX / 2;
              if (test.cycleTo === tail.idx) {
                const cx = xFor(tail.idx) + BOX / 2;
                return (
                  <path key="selfloop"
                    d={`M ${cx - 14} ${yMid - BOX/2} C ${cx - 40} ${yMid - BOX - 10}, ${cx + 40} ${yMid - BOX - 10}, ${cx + 14} ${yMid - BOX/2}`}
                    fill="none" stroke={AMBER} strokeWidth="2.5" markerEnd="url(#arrowAmberLLC)" />
                );
              }
              const x1 = xFor(tail.idx) + BOX / 2;
              return (
                <path key="cyclearc"
                  d={`M ${x1} ${yMid + BOX/2} C ${x1} ${yMid + 70}, ${targetX} ${yMid + 70}, ${targetX} ${yMid + BOX/2}`}
                  fill="none" stroke={AMBER} strokeWidth="2.5" markerEnd="url(#arrowAmberLLC)" />
              );
            }
            const x1 = xFor(tail.idx) + BOX;
            return (
              <line key="tailnull" x1={x1} y1={yMid} x2={x1 + 28} y2={yMid}
                stroke="#555" strokeWidth="2" markerEnd="url(#arrowGrayLLC)" />
            );
          })()}
        </svg>

        {/* 🐢🐇 Floating pointer markers — glide smoothly between nodes */}
        {!overlapping && !collided && fastVisible && (
          <div
            className="absolute text-center transition-all duration-450 ease-out"
            style={{ top: 0, left: xFor(s.fastIdx) + BOX / 2 - MARKER_W / 2, width: MARKER_W }}
          >
            <div
              className="text-[10px] font-bold px-1.5 py-1 rounded-lg"
              style={{ color: AMBER, background: `${AMBER}1a`, border: `1px solid ${AMBER}66` }}
            >
              🐇 fast
            </div>
          </div>
        )}
        {!overlapping && !collided && slowVisible && (
          <div
            className="absolute text-center transition-all duration-450 ease-out"
            style={{ top: 38, left: xFor(s.slowIdx) + BOX / 2 - MARKER_W / 2, width: MARKER_W }}
          >
            <div
              className="text-[10px] font-bold px-1.5 py-1 rounded-lg"
              style={{ color: GREEN, background: `${GREEN}1a`, border: `1px solid ${GREEN}66` }}
            >
              🐢 slow
            </div>
          </div>
        )}
        {overlapping && (
          <div
            className="absolute text-center transition-all duration-450 ease-out"
            style={{ top: 15, left: xFor(s.slowIdx) + BOX / 2 - MARKER_W / 2 - 6, width: MARKER_W + 12 }}
          >
            <div
              className="text-[10px] font-bold px-1.5 py-1 rounded-lg"
              style={{ color: TEAL, background: `${TEAL}1a`, border: `1px solid ${TEAL}66` }}
            >
              🐇🐢 same spot
            </div>
          </div>
        )}
        {collided && (
          <div
            className="absolute text-center transition-all duration-300"
            style={{ top: 15, left: xFor(s.slowIdx) + BOX / 2 - MARKER_W / 2 - 6, width: MARKER_W + 12 }}
          >
            <div
              className="text-[10px] font-bold px-1.5 py-1 rounded-lg animate-pulse"
              style={{ color: RED, background: 'rgba(239,83,80,.18)', border: `1px solid ${RED}` }}
            >
              💥 COLLISION
            </div>
          </div>
        )}

        {/* Node boxes */}
        <div className="absolute left-0" style={{ top: 90 }}>
          {nodes.map((nd) => {
            const isSlow = s.slowIdx === nd.idx;
            const isFast = s.fastIdx === nd.idx;
            const isCollisionNode = collided && isSlow && isFast;

            return (
              <div key={nd.idx} className="absolute text-center" style={{ left: xFor(nd.idx), width: BOX }}>
                <div
                  className="flex items-center justify-center text-lg font-bold rounded-xl transition-all duration-300"
                  style={{
                    width: BOX,
                    height: BOX,
                    border: `2.5px solid ${isCollisionNode ? RED : isSlow && isFast ? TEAL : isFast ? AMBER : isSlow ? GREEN : '#3e3e3c'}`,
                    background: isCollisionNode ? 'rgba(239,83,80,.2)' : isSlow && isFast ? `${TEAL}22` : isFast ? `${AMBER}22` : isSlow ? `${GREEN}22` : MID,
                    color: isCollisionNode ? RED : '#eee',
                    boxShadow: isCollisionNode ? `0 0 16px rgba(239,83,80,.5)` : (isSlow || isFast) ? `0 0 10px ${isFast ? AMBER : GREEN}55` : 'none',
                    transform: isCollisionNode ? 'scale(1.12)' : 'scale(1)',
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

      {/* Step description */}
      <div
        className="px-4 py-3 rounded-xl text-sm leading-relaxed"
        style={{
          background: s.result === true ? 'rgba(76,175,80,.1)'
            : s.result === false ? 'rgba(239,83,80,.08)'
            : 'rgba(255,255,255,.04)',
          border: `1px solid ${
            s.result === true ? 'rgba(76,175,80,.35)' : s.result === false ? 'rgba(239,83,80,.35)' : '#2e2e2c'
          }`,
          color: s.result === true ? GREEN : s.result === false ? RED : '#ccc',
        }}
      >
        {s.desc}
      </div>
    </div>
  );
}