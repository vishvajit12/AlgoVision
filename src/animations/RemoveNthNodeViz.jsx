// src/animations/RemoveNthNodeViz.jsx
const TEAL  = '#348681';
const GREEN = '#4caf50';
const RED   = '#ef5350';
const AMBER = '#f5a623';
const MID   = '#2A2A28';

const BOX = 56;
const GAP = 48; // extra room so arrows/arcs are readable

export default function RemoveNthNodeViz({ step, test }) {
  const s     = test.steps[Math.min(step, test.steps.length - 1)] || {};
  const nodes = test.nodes || [];

  const xFor = (idx) => idx * (BOX + GAP);
  const rowWidth = nodes.length * BOX + Math.max(0, nodes.length - 1) * GAP;

  const isRemoved = (idx) => s.phase === 'done' && s.removedIdx === idx;
  const isFadingHead = (idx) => s.phase === 'delete-head' && s.delIdx === idx && s.headIdx === null;

  return (
    <div className="px-6 py-5 font-mono">
      {/* Header info */}
      <code className="text-gray-500 text-xs block mb-1">
        head = [{nodes.map(nd => nd.val).join(',')}], n = {test.n}
      </code>

      {/* Phase badge */}
      <div className="mb-6">
        <span
          className="inline-block text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full font-bold"
          style={{
            background: s.phase === 'delete' || s.phase === 'delete-head' ? 'rgba(239,83,80,.12)'
              : s.phase === 'done' ? 'rgba(76,175,80,.12)'
              : `${TEAL}1a`,
            color: s.phase === 'delete' || s.phase === 'delete-head' ? RED
              : s.phase === 'done' ? GREEN
              : TEAL,
            border: `1px solid ${
              s.phase === 'delete' || s.phase === 'delete-head' ? 'rgba(239,83,80,.35)'
              : s.phase === 'done' ? 'rgba(76,175,80,.35)'
              : `${TEAL}33`
            }`,
          }}
        >
          {s.phase === 'count' && 'Pass 1 · Measuring Length'}
          {s.phase === 'locate' && 'Locating Target Node'}
          {s.phase === 'delete' && 'Unlinking Node'}
          {s.phase === 'delete-head' && 'Removing Head'}
          {s.phase === 'done' && 'Done'}
        </span>
      </div>

      {/* Linked list canvas */}
      <div
        className="relative mb-6"
        style={{ width: rowWidth + 40, height: 150, paddingTop: 60 }}
      >
        {/* SVG layer: HEAD arrow + link arrows */}
        <svg
          className="absolute left-0 top-0"
          width={rowWidth + 40}
          height={150}
          style={{ pointerEvents: 'none' }}
        >
          <defs>
            <marker id="arrowTeal" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 Z" fill={TEAL} />
            </marker>
            <marker id="arrowGreen" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 Z" fill={GREEN} />
            </marker>
            <marker id="arrowRed" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 Z" fill={RED} />
            </marker>
            <marker id="arrowGray" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 Z" fill="#555" />
            </marker>
          </defs>

          {/* HEAD pointer */}
          {s.headIdx !== null && s.headIdx !== undefined && (
            <>
              <text x={xFor(s.headIdx) + BOX / 2} y={20} textAnchor="middle" fontSize="11" fontWeight="bold" fill={AMBER}>
                HEAD
              </text>
              <line
                x1={xFor(s.headIdx) + BOX / 2} y1={26}
                x2={xFor(s.headIdx) + BOX / 2} y2={58}
                stroke={AMBER} strokeWidth="2" markerEnd="url(#arrowRed)"
                style={{ transition: 'all .4s ease-out' }}
              />
            </>
          )}
          {s.headIdx === null && (
            <text x={20} y={20} fontSize="11" fontWeight="bold" fill={AMBER}>
              HEAD → NULL (list empty)
            </text>
          )}

          {/* Normal / fading / skip links, drawn behind nodes */}
          {(s.links || []).map((lk, i) => {
            const x1 = xFor(lk.from) + BOX;
            const x2 = xFor(lk.to);
            const yMid = 60 + BOX / 2;

            if (lk.kind === 'skip') {
              const midX = (x1 + x2) / 2;
              return (
                <path
                  key={i}
                  d={`M ${x1} ${yMid} Q ${midX} ${yMid - 55} ${x2} ${yMid}`}
                  fill="none"
                  stroke={GREEN}
                  strokeWidth="2.5"
                  markerEnd="url(#arrowGreen)"
                  style={{ transition: 'all .5s ease-out' }}
                />
              );
            }
            if (lk.kind === 'fading') {
              return (
                <line
                  key={i}
                  x1={x1} y1={yMid} x2={x2} y2={yMid}
                  stroke={RED} strokeWidth="2" strokeDasharray="5,4"
                  markerEnd="url(#arrowRed)"
                  opacity="0.7"
                />
              );
            }
            return (
              <line
                key={i}
                x1={x1} y1={yMid} x2={x2} y2={yMid}
                stroke={TEAL} strokeWidth="2.5"
                markerEnd="url(#arrowTeal)"
              />
            );
          })}

          {/* Tail → NULL, only when the last node still links out normally */}
          {nodes.length > 0 && !isRemoved(nodes[nodes.length - 1].idx) && s.phase !== 'delete-head' && (
            (() => {
              const tailIdx = nodes[nodes.length - 1].idx;
              const hasOutgoing = (s.links || []).some(lk => lk.from === tailIdx);
              if (hasOutgoing) return null;
              const x1 = xFor(tailIdx) + BOX;
              const yMid = 60 + BOX / 2;
              return (
                <line
                  key="tail-null"
                  x1={x1} y1={yMid} x2={x1 + 32} y2={yMid}
                  stroke="#555" strokeWidth="2" markerEnd="url(#arrowGray)"
                />
              );
            })()
          )}
        </svg>

        {/* Node boxes */}
        <div className="absolute left-0" style={{ top: 60 }}>
          {nodes.map((nd) => {
            const isTemp = s.tempIdx === nd.idx;
            const isPrev = s.prevIdx === nd.idx;
            const isDel  = s.delIdx === nd.idx;
            const removed = isRemoved(nd.idx) || isFadingHead(nd.idx);

            return (
              <div
                key={nd.idx}
                className="absolute text-center transition-all duration-400"
                style={{ left: xFor(nd.idx), width: BOX, opacity: removed ? 0.25 : 1 }}
              >
                {/* pointer chips */}
                <div className="flex justify-center gap-1 mb-1" style={{ height: 16 }}>
                  {isTemp && <Chip color={AMBER} label="temp" />}
                  {isPrev && <Chip color={TEAL} label="prev" />}
                  {isDel  && <Chip color={RED} label="del" />}
                </div>

                <div
                  className="flex items-center justify-center text-lg font-bold rounded-xl transition-all duration-300"
                  style={{
                    width: BOX,
                    height: BOX,
                    border: `2.5px solid ${isDel ? RED : isTemp ? AMBER : isPrev ? TEAL : '#3e3e3c'}`,
                    background: isDel ? 'rgba(239,83,80,.2)' : isTemp ? `${AMBER}22` : isPrev ? `${TEAL}22` : MID,
                    color: isDel ? RED : removed ? '#666' : '#eee',
                    boxShadow: isDel ? `0 0 14px rgba(239,83,80,.45)` : isTemp ? `0 0 10px ${AMBER}55` : isPrev ? `0 0 10px ${TEAL}55` : 'none',
                    transform: isDel ? 'scale(1.08)' : 'scale(1)',
                    textDecoration: removed ? 'line-through' : 'none',
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

      {/* length / position readouts */}
      <div className="flex gap-6 mb-4 flex-wrap">
        <Readout label="length" value={s.length ?? '—'} color={TEAL} />
        <Readout label="position" value={s.position ?? '—'} color={AMBER} />
      </div>

      {/* Step description */}
      <div
        className="px-4 py-3 rounded-xl text-sm leading-relaxed"
        style={{
          background: s.phase === 'delete' || s.phase === 'delete-head'
            ? 'rgba(239,83,80,.08)'
            : s.phase === 'done'
            ? 'rgba(76,175,80,.1)'
            : 'rgba(255,255,255,.04)',
          border: `1px solid ${
            s.phase === 'delete' || s.phase === 'delete-head' ? 'rgba(239,83,80,.35)' : '#2e2e2c'
          }`,
          color: s.phase === 'delete' || s.phase === 'delete-head' ? RED : s.phase === 'done' ? GREEN : '#ccc',
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

function Readout({ label, value, color }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-widest mb-1 text-gray-600">{label}</div>
      <div
        className="w-16 h-10 flex items-center justify-center rounded-xl text-lg font-bold"
        style={{ background: `${color}1a`, border: `1px solid ${color}55`, color }}
      >
        {value}
      </div>
    </div>
  );
}