// src/animations/DeleteNodeViz.jsx
const TEAL   = '#348681';
const GREEN  = '#4caf50';
const RED    = '#ef5350';
const AMBER  = '#f5a623';
const PURPLE = '#a78bfa';
const MID    = '#2A2A28';

const BOX = 56;
const GAP = 48;

export default function DeleteNodeViz({ step, test }) {
  const s     = test.steps[Math.min(step, test.steps.length - 1)] || {};
  const nodes = test.nodes || [];

  const xFor = (idx) => idx * (BOX + GAP);
  const rowWidth = nodes.length * BOX + Math.max(0, nodes.length - 1) * GAP;

  const isFlying = s.phase === 'copy';

  return (
    <div className="px-6 py-5 font-mono">
      <code className="text-gray-500 text-xs block mb-1">
        list = [{nodes.map(nd => nd.val).join(',')}], given node = value {nodes.find(n => n.idx === test.givenIdx)?.val}
      </code>

      {/* Phase badge */}
      <div className="mb-6">
        <span
          className="inline-block text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full font-bold transition-all duration-300"
          style={{
            background: s.phase === 'done' ? 'rgba(76,175,80,.12)'
              : s.phase === 'delete' ? 'rgba(239,83,80,.12)'
              : isFlying ? `${PURPLE}1a`
              : `${TEAL}1a`,
            color: s.phase === 'done' ? GREEN : s.phase === 'delete' ? RED : isFlying ? PURPLE : TEAL,
            border: `1px solid ${
              s.phase === 'done' ? 'rgba(76,175,80,.35)' : s.phase === 'delete' ? 'rgba(239,83,80,.35)' : isFlying ? `${PURPLE}55` : `${TEAL}33`
            }`,
          }}
        >
          {s.phase === 'given' && 'Given: node only (no head!)'}
          {s.phase === 'peek' && 'Peeking node->next'}
          {s.phase === 'copy' && 'Copying Value Forward'}
          {s.phase === 'temp' && 'Saving temp Pointer'}
          {s.phase === 'skip' && 'Re-linking node->next'}
          {s.phase === 'delete' && 'Deleting temp'}
          {s.phase === 'done' && 'Done ✅'}
        </span>
      </div>

      {/* Canvas */}
      <div className="relative mb-6" style={{ width: rowWidth + 40, height: 190, paddingTop: 90 }}>
        {/* SVG links */}
        <svg className="absolute left-0 top-0" width={rowWidth + 40} height={190} style={{ pointerEvents: 'none' }}>
          <defs>
            <marker id="arrowTealDN" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 Z" fill={TEAL} />
            </marker>
            <marker id="arrowGreenDN" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 Z" fill={GREEN} />
            </marker>
            <marker id="arrowRedDN" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 Z" fill={RED} />
            </marker>
            <marker id="arrowGrayDN" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 Z" fill="#555" />
            </marker>
          </defs>

          {(s.links || []).map((lk, i) => {
            const x1 = xFor(lk.from) + BOX;
            const x2 = xFor(lk.to);
            const yMid = 90 + BOX / 2;

            if (lk.kind === 'skip') {
              const midX = (x1 + x2) / 2;
              return (
                <path key={i} d={`M ${x1} ${yMid} Q ${midX} ${yMid - 55} ${x2} ${yMid}`}
                  fill="none" stroke={GREEN} strokeWidth="2.5" markerEnd="url(#arrowGreenDN)"
                  style={{ transition: 'all .5s ease-out' }} />
              );
            }
            if (lk.kind === 'fading') {
              return (
                <line key={i} x1={x1} y1={yMid} x2={x2} y2={yMid}
                  stroke={RED} strokeWidth="2" strokeDasharray="5,4" markerEnd="url(#arrowRedDN)" opacity="0.7" />
              );
            }
            return (
              <line key={i} x1={x1} y1={yMid} x2={x2} y2={yMid}
                stroke={TEAL} strokeWidth="2.5" markerEnd="url(#arrowTealDN)" />
            );
          })}

          {/* tail -> null, only if the last node has no outgoing link */}
          {nodes.length > 0 && (() => {
            const last = nodes[nodes.length - 1];
            const hasOutgoing = (s.links || []).some(lk => lk.from === last.idx);
            const removedTail = s.removedIdx === last.idx;
            if (hasOutgoing || removedTail) return null;
            const x1 = xFor(last.idx) + BOX;
            const yMid = 90 + BOX / 2;
            return (
              <line x1={x1} y1={yMid} x2={x1 + 28} y2={yMid}
                stroke="#555" strokeWidth="2" markerEnd="url(#arrowGrayDN)" />
            );
          })()}

          {/* Flying value chip — copy animation */}
          {isFlying && s.nextIdx !== null && s.nextIdx !== undefined && (
            <FlyingValue
              fromX={xFor(s.nextIdx) + BOX / 2}
              toX={xFor(s.givenIdx) + BOX / 2}
              y={90 + BOX / 2}
              value={nodes.find(n => n.idx === s.nextIdx)?.val}
            />
          )}
        </svg>

        {/* Node boxes */}
        <div className="absolute left-0" style={{ top: 90 }}>
          {nodes.map((nd) => {
            const isGiven = s.givenIdx === nd.idx;
            const isNext  = s.nextIdx === nd.idx;
            const isTemp  = s.tempIdx === nd.idx;
            const isDel   = s.delIdx === nd.idx;
            const removed = s.removedIdx === nd.idx;
            const displayVal = (s.values && s.values[nd.idx] !== undefined) ? s.values[nd.idx] : nd.val;

            return (
              <div key={nd.idx} className="absolute text-center transition-all duration-400"
                   style={{ left: xFor(nd.idx), width: BOX, opacity: removed ? 0.25 : 1 }}>
                <div className="flex justify-center gap-1 mb-1" style={{ height: 16 }}>
                  {isGiven && <Chip color={TEAL} label="node" />}
                  {isTemp  && <Chip color={RED}  label="temp" />}
                </div>

                <div
                  className="flex items-center justify-center text-lg font-bold rounded-xl transition-all duration-300"
                  style={{
                    width: BOX,
                    height: BOX,
                    border: `2.5px solid ${isDel ? RED : isGiven ? TEAL : isNext ? PURPLE : isTemp ? RED : '#3e3e3c'}`,
                    background: isDel ? 'rgba(239,83,80,.2)' : isGiven ? `${TEAL}22` : isNext ? `${PURPLE}22` : isTemp ? `${RED}18` : MID,
                    color: isDel ? RED : removed ? '#666' : '#eee',
                    boxShadow: isDel ? `0 0 14px rgba(239,83,80,.45)` : isGiven ? `0 0 10px ${TEAL}55` : isNext ? `0 0 10px ${PURPLE}55` : 'none',
                    transform: isDel || (isGiven && isFlying) ? 'scale(1.08)' : 'scale(1)',
                    textDecoration: removed ? 'line-through' : 'none',
                  }}
                >
                  {displayVal}
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
          background: s.phase === 'delete' ? 'rgba(239,83,80,.08)' : s.phase === 'done' ? 'rgba(76,175,80,.1)' : isFlying ? `${PURPLE}14` : 'rgba(255,255,255,.04)',
          border: `1px solid ${s.phase === 'delete' ? 'rgba(239,83,80,.35)' : s.phase === 'done' ? 'rgba(76,175,80,.35)' : isFlying ? `${PURPLE}44` : '#2e2e2c'}`,
          color: s.phase === 'delete' ? RED : s.phase === 'done' ? GREEN : isFlying ? PURPLE : '#ccc',
        }}
      >
        {s.desc}
      </div>
    </div>
  );
}

function FlyingValue({ fromX, toX, y, value }) {
  return (
    <g>
      <line x1={fromX} y1={y} x2={toX} y2={y} stroke={PURPLE} strokeWidth="2" strokeDasharray="4,4" opacity="0.5" />
      <circle cx={fromX} cy={y - 44} r="15" fill={PURPLE} opacity="0.9">
        <animate attributeName="cx" from={fromX} to={toX} dur="0.6s" fill="freeze" />
      </circle>
      <text
        fontSize="13" fontWeight="bold" fill="#fff" textAnchor="middle" dy="4"
      >
        <animate attributeName="x" from={fromX} to={toX} dur="0.6s" fill="freeze" attributeType="XML" />
        <tspan x={fromX} dy="0">{value}</tspan>
        <animateMotion dur="0.6s" fill="freeze" path={`M0,${y-44} L${toX-fromX},${y-44}`} />
      </text>
    </g>
  );
}

function Chip({ color, label }) {
  return (
    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded"
      style={{ color, background: `${color}1a`, border: `1px solid ${color}55` }}>
      {label}
    </span>
  );
}