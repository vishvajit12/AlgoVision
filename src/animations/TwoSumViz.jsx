// src/animations/TwoSumViz.jsx
const TEAL  = '#348681';
const GREEN = '#4caf50';
const RED   = '#ef5350';
const AMBER = '#f5a623';
const MID   = '#2A2A28';

export default function TwoSumViz({ step, test }) {
  const s   = test.steps[Math.min(step, test.steps.length - 1)] || {};
  const arr = test.arr || [];
  const map = s.map || {};

  const isFoundIdx = (idx) => s.foundIdx !== null && s.foundIdx === idx;
  const isCurrent  = (idx) => s.i === idx;

  return (
    <div className="px-6 py-5 font-mono">
      {/* Input */}
      <code className="text-gray-500 text-xs block mb-5">
        nums = [{arr.join(',')}], target = {test.target}
      </code>

      {/* Array cells */}
      <div className="flex flex-wrap gap-2.5 mb-5">
        {arr.map((v, i) => {
          const active = isCurrent(i);
          const done   = s.result && (i === s.result[0] || i === s.result[1]);

          return (
            <div key={i} className="text-center">
              <div
                className="w-14 h-14 flex items-center justify-center text-xl
                           font-bold rounded-xl transition-all duration-300"
                style={{
                  border:     `2.5px solid ${done ? GREEN : active ? TEAL : '#3e3e3c'}`,
                  background: done ? 'rgba(76,175,80,.18)' : active ? `${TEAL}22` : MID,
                  color:      done ? GREEN : active ? TEAL : '#ccc',
                  boxShadow:  done ? `0 0 14px rgba(76,175,80,.4)` : active ? `0 0 10px ${TEAL}44` : 'none',
                  transform:  done ? 'scale(1.08)' : 'scale(1)',
                }}
              >
                {v}
              </div>
              <div className="text-xs mt-1 text-gray-600">[{i}]</div>
            </div>
          );
        })}
      </div>

      {/* Complement readout */}
      <div className="flex gap-6 mb-5 flex-wrap items-center">
        <Readout label="target" value={test.target} color={AMBER} />
        <span className="text-gray-600 text-lg mt-4">−</span>
        <Readout label={`nums[${Math.max(s.i,0)}]`} value={s.i >= 0 ? arr[s.i] : '—'} color={TEAL} />
        <span className="text-gray-600 text-lg mt-4">=</span>
        <Readout
          label="complement"
          value={s.complement ?? '—'}
          color={s.foundIdx !== null && s.foundIdx !== undefined ? GREEN : AMBER}
          glow={s.foundIdx !== null && s.foundIdx !== undefined}
        />
      </div>

      {/* Hash Map container */}
      <div className="mb-4">
        <div className="text-xs uppercase tracking-widest mb-2 text-gray-600">
          Hash Map — value : index
        </div>
        <div
          className="flex flex-wrap gap-2 min-h-12 px-3 py-2.5 rounded-xl items-center"
          style={{ background:'rgba(255,255,255,.03)', border:'1px solid #2e2e2c' }}
        >
          {Object.keys(map).length === 0 ? (
            <span className="text-xs text-gray-700">{'{ }'}</span>
          ) : (
            Object.entries(map).map(([val, idx]) => {
              const isMatch = s.complement !== null && s.complement !== undefined && String(s.complement) === val && s.foundIdx !== null && s.foundIdx !== undefined;
              return (
                <span
                  key={val}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300"
                  style={{
                    background: isMatch ? 'rgba(76,175,80,.2)' : `${TEAL}1a`,
                    border: `1.5px solid ${isMatch ? GREEN : `${TEAL}44`}`,
                    color: isMatch ? GREEN : TEAL,
                    boxShadow: isMatch ? `0 0 12px rgba(76,175,80,.45)` : 'none',
                    transform: isMatch ? 'scale(1.08)' : 'scale(1)',
                  }}
                >
                  {val} : {idx}
                </span>
              );
            })
          )}
        </div>
      </div>

      {/* Step description */}
      <div
        className="px-4 py-3 rounded-xl text-sm leading-relaxed"
        style={{
          background: s.result
            ? 'rgba(76,175,80,.1)'
            : 'rgba(255,255,255,.04)',
          border: `1px solid ${s.result ? 'rgba(76,175,80,.35)' : '#2e2e2c'}`,
          color:  s.result ? GREEN : '#ccc',
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
        style={{
          background: `${color}1a`,
          border: `1.5px solid ${color}55`,
          color,
          boxShadow: glow ? `0 0 12px ${color}66` : 'none',
          transform: glow ? 'scale(1.08)' : 'scale(1)',
        }}
      >
        {value}
      </div>
    </div>
  );
}