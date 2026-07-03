// src/animations/FindFirstLastViz.jsx
const TEAL   = '#348681';
const GREEN  = '#4caf50';
const RED    = '#ef5350';
const AMBER  = '#f5a623';
const PURPLE = '#a78bfa';
const MID    = '#2A2A28';

const BOX = 50;
const GAP = 10;

export default function FindFirstLastViz({ step, test }) {
  const s   = test.steps[Math.min(step, test.steps.length - 1)] || {};
  const arr = test.arr || [];

  const xFor = (idx) => idx * (BOX + GAP);
  const rowWidth = arr.length * BOX + Math.max(0, arr.length - 1) * GAP;

  const passColor = s.pass === 'first' ? TEAL : s.pass === 'last' ? PURPLE : GREEN;
  const inRange = (i) => s.low !== null && s.high !== null && i >= s.low && i <= s.high;

  return (
    <div className="px-6 py-5 font-mono">
      <code className="text-gray-500 text-xs block mb-1">
        nums = [{arr.join(',')}], target = {test.target}
      </code>

      {/* Pass badge */}
      <div className="mb-6">
        <span
          className="inline-block text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full font-bold transition-all duration-300"
          style={{
            background: s.phase === 'done' ? 'rgba(76,175,80,.12)' : `${passColor}1a`,
            color: s.phase === 'done' ? GREEN : passColor,
            border: `1px solid ${s.phase === 'done' ? 'rgba(76,175,80,.35)' : `${passColor}44`}`,
          }}
        >
          {s.pass === 'first' && '🔍 findFirst — biasing LEFT on match'}
          {s.pass === 'last' && '🔍 findLast — biasing RIGHT on match'}
          {s.pass === 'combine' && 'Combining Results'}
        </span>
      </div>

      {/* Array with low/high/mid chips */}
      <div className="relative mb-6" style={{ width: Math.max(rowWidth, 100) + 20, height: 110, paddingTop: 40 }}>
        {arr.length === 0 && <div className="text-xs text-gray-700">(empty array)</div>}

        {arr.length > 0 && (
          <>
            {s.low !== null && s.low !== undefined && s.low <= (arr.length - 1) && s.low >= 0 && (
              <div className="absolute text-[10px] font-bold px-1.5 py-0.5 rounded transition-all duration-450 ease-out"
                style={{ top: 0, left: xFor(s.low) + BOX / 2 - 14, color: AMBER, background: `${AMBER}1a`, border: `1px solid ${AMBER}66` }}>
                low
              </div>
            )}
            {s.high !== null && s.high !== undefined && s.high <= (arr.length - 1) && s.high >= 0 && (
              <div className="absolute text-[10px] font-bold px-1.5 py-0.5 rounded transition-all duration-450 ease-out"
                style={{ top: 18, left: xFor(s.high) + BOX / 2 - 14, color: RED, background: `${RED}1a`, border: `1px solid ${RED}66` }}>
                high
              </div>
            )}

            <div className="absolute flex gap-2.5" style={{ top: 40 }}>
              {arr.map((v, i) => {
                const isMid = s.mid === i;
                const isMatch = isMid && (s.phase === 'match-left' || s.phase === 'match-right');
                const dimmed = !inRange(i) && s.low !== null;

                return (
                  <div key={i} className="text-center">
                    <div
                      className="w-12 h-12 flex items-center justify-center text-lg font-bold rounded-xl transition-all duration-300"
                      style={{
                        border: `2.5px solid ${isMatch ? GREEN : isMid ? passColor : '#3e3e3c'}`,
                        background: isMatch ? 'rgba(76,175,80,.2)' : isMid ? `${passColor}22` : MID,
                        color: isMatch ? GREEN : isMid ? passColor : '#ccc',
                        boxShadow: isMatch ? `0 0 14px rgba(76,175,80,.5)` : isMid ? `0 0 10px ${passColor}55` : 'none',
                        transform: isMatch ? 'scale(1.12)' : isMid ? 'scale(1.05)' : 'scale(1)',
                        opacity: dimmed ? 0.3 : 1,
                      }}
                    >
                      {v}
                    </div>
                    <div className="text-[10px] mt-1 text-gray-600">[{i}]</div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* Readouts */}
      <div className="flex gap-6 mb-4 flex-wrap">
        <Readout label="low" value={s.low ?? '—'} color={AMBER} />
        <Readout label="mid" value={s.mid ?? '—'} color={passColor} />
        <Readout label="high" value={s.high ?? '—'} color={RED} />
        <Readout label="ans" value={s.ans ?? -1} color={GREEN} glow={s.phase === 'match-left' || s.phase === 'match-right'} />
      </div>

      {/* Step description */}
      <div
        className="px-4 py-3 rounded-xl text-sm leading-relaxed"
        style={{
          background: s.phase === 'done' ? 'rgba(76,175,80,.1)'
            : (s.phase === 'match-left' || s.phase === 'match-right') ? 'rgba(76,175,80,.1)'
            : `${passColor}10`,
          border: `1px solid ${
            s.phase === 'done' || s.phase === 'match-left' || s.phase === 'match-right' ? 'rgba(76,175,80,.35)' : `${passColor}33`
          }`,
          color: s.phase === 'done' || s.phase === 'match-left' || s.phase === 'match-right' ? GREEN : '#ccc',
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
        className="min-w-12 h-11 flex items-center justify-center rounded-xl text-lg font-bold px-3 transition-all duration-300"
        style={{ background: `${color}1a`, border: `1.5px solid ${color}55`, color, boxShadow: glow ? `0 0 12px ${color}66` : 'none', transform: glow ? 'scale(1.1)' : 'scale(1)' }}
      >
        {value}
      </div>
    </div>
  );
}