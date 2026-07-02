// src/animations/ContainerWithMostWaterViz.jsx
const TEAL   = '#348681';
const GREEN  = '#4caf50';
const RED    = '#ef5350';
const AMBER  = '#f5a623';
const BLUE   = '#4fc3f7';
const MID    = '#2A2A28';

const COL_W  = 44;
const GAP    = 10;
const CHART_H = 160;

export default function ContainerWithMostWaterViz({ step, test }) {
  const s   = test.steps[Math.min(step, test.steps.length - 1)] || {};
  const arr = test.arr || [];

  const maxH = Math.max(...arr, 1);
  const heightFor = (v) => Math.max(14, (v / maxH) * (CHART_H - 20));
  const xFor = (idx) => idx * (COL_W + GAP);
  const rowWidth = arr.length * COL_W + Math.max(0, arr.length - 1) * GAP;

  const hasContainer = s.fst !== undefined && s.sec !== undefined && s.sec > s.fst;
  const shorterIsFst = hasContainer && arr[s.fst] <= arr[s.sec];

  // pixel geometry for water shading
  const baseY = 30 + CHART_H;
  const fstTopY = hasContainer ? baseY - heightFor(arr[s.fst]) : 0;
  const secTopY = hasContainer ? baseY - heightFor(arr[s.sec]) : 0;
  const waterTopY = hasContainer ? Math.max(fstTopY, secTopY) : 0;
  const fstX = hasContainer ? xFor(s.fst) + COL_W : 0;
  const secX = hasContainer ? xFor(s.sec) : 0;

  return (
    <div className="px-6 py-5 font-mono">
      <code className="text-gray-500 text-xs block mb-1">
        height = [{arr.join(',')}]
      </code>

      {/* Phase badge */}
      <div className="mb-6">
        <span
          className="inline-block text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full font-bold transition-all duration-300"
          style={{
            background: s.isNewMax ? 'rgba(76,175,80,.12)' : s.phase === 'done' ? 'rgba(76,175,80,.12)' : `${BLUE}1a`,
            color: s.isNewMax ? GREEN : s.phase === 'done' ? GREEN : BLUE,
            border: `1px solid ${(s.isNewMax || s.phase === 'done') ? 'rgba(76,175,80,.35)' : `${BLUE}44`}`,
          }}
        >
          {s.phase === 'done' ? 'Done ✅' : s.isNewMax ? 'New Best Area! 🎉' : s.mover ? `Moving ${s.mover === 'fst' ? 'fst →' : '← sec'}` : 'Measuring Container'}
        </span>
      </div>

      {/* Chart canvas */}
      <div className="relative mb-6" style={{ width: rowWidth + 20, height: CHART_H + 50 }}>
        <svg className="absolute left-0 top-0 pointer-events-none" width={rowWidth + 20} height={CHART_H + 50}>
          {/* Water region */}
          {hasContainer && (
            <polygon
              points={`${fstX},${baseY} ${fstX},${waterTopY} ${secX},${waterTopY} ${secX},${baseY}`}
              fill={BLUE}
              opacity="0.22"
              style={{ transition: 'all .4s ease-out' }}
            />
          )}
          {/* Water surface line */}
          {hasContainer && (
            <line x1={fstX} y1={waterTopY} x2={secX} y2={waterTopY}
              stroke={BLUE} strokeWidth="2" strokeDasharray="5,4" opacity="0.7"
              style={{ transition: 'all .4s ease-out' }} />
          )}
        </svg>

        {/* fst / sec pointer chips */}
        {hasContainer && (
          <>
            <div
              className="absolute text-[10px] font-bold px-1.5 py-0.5 rounded transition-all duration-450 ease-out"
              style={{ top: 0, left: xFor(s.fst) + COL_W / 2 - 14, color: shorterIsFst ? RED : TEAL, background: shorterIsFst ? 'rgba(239,83,80,.15)' : `${TEAL}1a`, border: `1px solid ${shorterIsFst ? RED : TEAL}77` }}
            >
              fst
            </div>
            <div
              className="absolute text-[10px] font-bold px-1.5 py-0.5 rounded transition-all duration-450 ease-out"
              style={{ top: 0, left: xFor(s.sec) + COL_W / 2 - 14, color: !shorterIsFst ? RED : AMBER, background: !shorterIsFst ? 'rgba(239,83,80,.15)' : `${AMBER}1a`, border: `1px solid ${!shorterIsFst ? RED : AMBER}77` }}
            >
              sec
            </div>
          </>
        )}

        {/* Bars */}
        <div className="absolute left-0 flex items-end gap-2.5" style={{ top: 30, height: CHART_H }}>
          {arr.map((v, i) => {
            const h = heightFor(v);
            const isFst = s.fst === i;
            const isSec = s.sec === i;
            const isShorterWall = (isFst && shorterIsFst) || (isSec && !shorterIsFst);
            const active = isFst || isSec;

            return (
              <div key={i} className="flex flex-col items-center justify-end" style={{ width: COL_W, height: CHART_H }}>
                <div
                  className="rounded-t-lg flex items-end justify-center text-xs font-bold pb-1 transition-all duration-300"
                  style={{
                    width: COL_W,
                    height: h,
                    background: isShorterWall ? `${RED}33` : isFst ? `${TEAL}22` : isSec ? `${AMBER}22` : MID,
                    border: `2px solid ${isShorterWall ? RED : isFst ? TEAL : isSec ? AMBER : '#3e3e3c'}`,
                    borderBottom: 'none',
                    color: isShorterWall ? RED : active ? '#fff' : '#aaa',
                    boxShadow: isShorterWall ? `0 0 12px ${RED}55` : active ? `0 0 8px ${(isFst ? TEAL : AMBER)}44` : 'none',
                    transform: isShorterWall ? 'scale(1.06)' : 'scale(1)',
                  }}
                >
                  {v}
                </div>
                <div className="w-full text-center text-[10px] py-1 rounded-b-lg" style={{ background: '#1e1e1c', color: '#666' }}>
                  {i}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Readouts */}
      <div className="flex gap-6 mb-4 flex-wrap">
        <Readout label="width" value={hasContainer ? s.sec - s.fst : '—'} color={BLUE} />
        <Readout label="area" value={s.area ?? '—'} color={s.isNewMax ? GREEN : BLUE} glow={s.isNewMax} />
        <Readout label="marea" value={s.marea ?? 0} color={GREEN} glow={s.isNewMax} />
      </div>

      {/* Step description */}
      <div
        className="px-4 py-3 rounded-xl text-sm leading-relaxed"
        style={{
          background: s.isNewMax ? 'rgba(76,175,80,.1)' : s.phase === 'done' ? 'rgba(76,175,80,.1)' : 'rgba(255,255,255,.04)',
          border: `1px solid ${(s.isNewMax || s.phase === 'done') ? 'rgba(76,175,80,.35)' : '#2e2e2c'}`,
          color: (s.isNewMax || s.phase === 'done') ? GREEN : '#ccc',
        }}
      >
        {s.desc}
      </div>
    </div>
  );
}

function Readout({ label, value, color, glow }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-widest mb-1 text-gray-600">{label}</div>
      <div
        className="min-w-14 h-11 flex items-center justify-center rounded-xl text-lg font-bold px-3 transition-all duration-300"
        style={{ background: `${color}1a`, border: `1.5px solid ${color}55`, color, boxShadow: glow ? `0 0 12px ${color}66` : 'none', transform: glow ? 'scale(1.08)' : 'scale(1)' }}
      >
        {value}
      </div>
    </div>
  );
}