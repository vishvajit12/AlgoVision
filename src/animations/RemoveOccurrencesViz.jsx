// src/animations/RemoveOccurrencesViz.jsx
const TEAL  = '#348681';
const GREEN = '#4caf50';
const RED   = '#ef5350';
const AMBER = '#f5a623';
const MID   = '#2A2A28';

const STK_W = 220;
const STK_ITEM_H = 42;

export default function RemoveOccurrencesViz({ step, test }) {
  const s     = test.steps[Math.min(step, test.steps.length - 1)] || {};
  const arr   = test.arr || [];
  const stack = s.stack || [];
  const k     = (test.part || '').length;

  const isPopping = s.match === true;
  const isJustPopped = s.match === null && step > 0; // frame right after a pop

  return (
    <div className="px-6 py-5 font-mono">
      {/* Input */}
      <code className="text-gray-500 text-xs block mb-1">
        s = "{arr.join('')}", part = "{test.part}"
      </code>

      {/* Phase badge */}
      <div className="mb-6">
        <span
          className="inline-block text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full font-bold transition-all duration-300"
          style={{
            background: s.phase === 'done' ? 'rgba(76,175,80,.12)' : isPopping ? 'rgba(239,83,80,.12)' : `${TEAL}1a`,
            color: s.phase === 'done' ? GREEN : isPopping ? RED : TEAL,
            border: `1px solid ${s.phase === 'done' ? 'rgba(76,175,80,.35)' : isPopping ? 'rgba(239,83,80,.35)' : `${TEAL}33`}`,
          }}
        >
          {s.phase === 'done' && 'Done ✅'}
          {s.phase !== 'done' && isPopping && 'Match! Popping k chars'}
          {s.phase !== 'done' && !isPopping && s.i >= 0 && `Pushing s[${s.i}]`}
          {s.phase !== 'done' && !isPopping && s.i === undefined && 'Scanning'}
          {s.phase !== 'done' && s.i === -1 && 'Starting'}
        </span>
      </div>

      {/* Character row (input) */}
      <div className="flex flex-wrap gap-2 mb-6">
        {arr.map((ch, i) => {
          const isActive = s.i === i;
          return (
            <div key={i} className="text-center">
              <div
                className="w-11 h-11 flex items-center justify-center text-base font-bold rounded-lg transition-all duration-300"
                style={{
                  border: `2px solid ${isActive ? TEAL : '#3e3e3c'}`,
                  background: isActive ? `${TEAL}22` : MID,
                  color: isActive ? TEAL : '#888',
                  boxShadow: isActive ? `0 0 10px ${TEAL}44` : 'none',
                }}
              >
                {ch}
              </div>
              <div className="text-[9px] mt-1 text-gray-600">[{i}]</div>
            </div>
          );
        })}
      </div>

      {/* Vertical Stack container with last-k window highlight */}
      <div className="flex flex-col items-center mb-6">
        <div className="text-xs uppercase tracking-widest mb-2 text-gray-600">
          Stack (bottom → top)
        </div>

        <div
          className="relative flex flex-col-reverse justify-start items-center rounded-xl overflow-hidden"
          style={{
            width: STK_W,
            minHeight: STK_ITEM_H * 6 + 10,
            border: '2px solid #3e3e3c',
            borderTop: 'none',
            background: 'rgba(255,255,255,.03)',
            padding: '6px 0',
          }}
        >
          {stack.length === 0 && <span className="text-[10px] text-gray-700 mb-2">empty</span>}
          {stack.map((ch, i) => {
            const withinLastK = i >= stack.length - k;
            const isTopWindow = withinLastK && s.i !== -1;
            const flashRed = isPopping && withinLastK;

            return (
              <div
                key={`${i}-${ch}-${step}`}
                className="flex items-center justify-center text-base font-bold rounded-md mb-1 transition-all duration-300"
                style={{
                  width: STK_W - 20,
                  height: STK_ITEM_H - 8,
                  border: `2px solid ${flashRed ? RED : isTopWindow ? AMBER : `${TEAL}55`}`,
                  background: flashRed ? 'rgba(239,83,80,.25)' : isTopWindow ? `${AMBER}18` : `${TEAL}11`,
                  color: flashRed ? RED : isTopWindow ? AMBER : '#eee',
                  boxShadow: flashRed ? `0 0 12px rgba(239,83,80,.5)` : isTopWindow ? `0 0 8px ${AMBER}44` : 'none',
                  transform: flashRed ? 'scale(1.05) translateX(6px)' : 'scale(1)',
                }}
              >
                {ch}
              </div>
            );
          })}
        </div>

        <div className="text-[10px] mt-1 px-2 py-0.5 rounded" style={{ background: '#2e2e2c', color: '#888' }}>
          top ↑ (last {k} highlighted amber = suffix window)
        </div>
      </div>

      {/* Step description */}
      <div
        className="px-4 py-3 rounded-xl text-sm leading-relaxed"
        style={{
          background: s.phase === 'done' ? 'rgba(76,175,80,.1)' : isPopping ? 'rgba(239,83,80,.08)' : 'rgba(255,255,255,.04)',
          border: `1px solid ${s.phase === 'done' ? 'rgba(76,175,80,.35)' : isPopping ? 'rgba(239,83,80,.35)' : '#2e2e2c'}`,
          color: s.phase === 'done' ? GREEN : isPopping ? RED : '#ccc',
        }}
      >
        {s.desc}
      </div>
    </div>
  );
}