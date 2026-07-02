// src/animations/ValidParenViz.jsx
const TEAL  = '#348681';
const GREEN = '#4caf50';
const RED   = '#ef5350';
const AMBER = '#f5a623';
const MID   = '#2A2A28';

const BOX = 48;
const GAP = 10;
const STK_W = 64;
const STK_ITEM_H = 40;

const OPENERS = ['(', '[', '{'];

export default function ValidParenViz({ step, test }) {
  const s   = test.steps[Math.min(step, test.steps.length - 1)] || {};
  const arr = test.arr || [];
  const stack = s.stack || [];

  return (
    <div className="px-6 py-5 font-mono">
      {/* Input */}
      <code className="text-gray-500 text-xs block mb-1">
        s = "{arr.join('')}"
      </code>

      {/* Phase badge */}
      <div className="mb-6">
        <span
          className="inline-block text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full font-bold"
          style={{
            background: s.result === true ? 'rgba(76,175,80,.12)'
              : s.result === false ? 'rgba(239,83,80,.12)'
              : s.match === false ? 'rgba(239,83,80,.12)'
              : `${TEAL}1a`,
            color: s.result === true ? GREEN
              : s.result === false ? RED
              : s.match === false ? RED
              : TEAL,
            border: `1px solid ${
              s.result === true ? 'rgba(76,175,80,.35)'
              : s.result === false ? 'rgba(239,83,80,.35)'
              : s.match === false ? 'rgba(239,83,80,.35)'
              : `${TEAL}33`
            }`,
          }}
        >
          {s.result === true && 'Valid ✅'}
          {s.result === false && 'Invalid ❌'}
          {s.result == null && (s.match === false ? 'Mismatch Detected' : 'Scanning')}
        </span>
      </div>

      <div className="flex gap-10 items-start flex-wrap">
        {/* Character row */}
        <div>
          <div className="flex flex-wrap gap-2.5 mb-2">
            {arr.map((ch, idx) => {
              const active = s.i === idx;
              const isOpener = OPENERS.includes(ch);
              const flashBad = active && s.match === false;
              const flashGood = active && s.match === true;

              return (
                <div key={idx} className="text-center">
                  <div
                    className="w-12 h-12 flex items-center justify-center text-xl font-bold rounded-xl transition-all duration-300"
                    style={{
                      border: `2.5px solid ${
                        flashBad ? RED : flashGood ? GREEN : active ? (isOpener ? AMBER : TEAL) : '#3e3e3c'
                      }`,
                      background: flashBad ? 'rgba(239,83,80,.2)'
                        : flashGood ? 'rgba(76,175,80,.15)'
                        : active ? `${isOpener ? AMBER : TEAL}22`
                        : MID,
                      color: flashBad ? RED : flashGood ? GREEN : active ? '#fff' : '#ccc',
                      boxShadow: flashBad ? `0 0 14px rgba(239,83,80,.45)`
                        : flashGood ? `0 0 12px rgba(76,175,80,.4)`
                        : active ? `0 0 10px ${isOpener ? AMBER : TEAL}55`
                        : 'none',
                      transform: (flashBad || flashGood) ? 'scale(1.1)' : 'scale(1)',
                    }}
                  >
                    {ch}
                  </div>
                  <div className="text-xs mt-1 text-gray-600">[{idx}]</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 🧱 STACK CONTAINER */}
        <div className="flex flex-col items-center">
          <div className="text-xs uppercase tracking-widest mb-2 text-gray-600">Stack</div>

          <div
            className="relative flex flex-col-reverse justify-start items-center rounded-xl overflow-hidden"
            style={{
              width: STK_W,
              height: STK_ITEM_H * 4 + 10,
              border: '2px solid #3e3e3c',
              borderTop: 'none',
              background: 'rgba(255,255,255,.03)',
              padding: '4px 0',
            }}
          >
            {stack.length === 0 && (
              <span className="text-[10px] text-gray-700 mb-2">empty</span>
            )}
            {stack.map((v, i) => {
              const isTop = i === stack.length - 1;
              const flashGood = isTop && s.match === true;
              const flashBad  = isTop && s.match === false;
              const isPeek = isTop && s.topVal !== null && s.topVal !== undefined;

              return (
                <div
                  key={`${i}-${v}`}
                  className="flex items-center justify-center text-base font-bold rounded-md mb-1 transition-all duration-300"
                  style={{
                    width: STK_W - 12,
                    height: STK_ITEM_H - 6,
                    border: `2px solid ${flashBad ? RED : flashGood ? GREEN : isPeek ? AMBER : `${AMBER}55`}`,
                    background: flashBad ? 'rgba(239,83,80,.25)' : flashGood ? 'rgba(76,175,80,.2)' : isPeek ? `${AMBER}22` : `${AMBER}11`,
                    color: flashBad ? RED : flashGood ? GREEN : '#eee',
                    boxShadow: (flashBad || flashGood || isPeek) ? `0 0 10px ${flashBad ? 'rgba(239,83,80,.5)' : flashGood ? 'rgba(76,175,80,.5)' : `${AMBER}55`}` : 'none',
                    transform: isTop ? 'scale(1.05)' : 'scale(1)',
                  }}
                >
                  {v}
                </div>
              );
            })}
          </div>

          <div
            className="text-[10px] mt-1 px-2 py-0.5 rounded"
            style={{ background: '#2e2e2c', color: '#888' }}
          >
            top ↑
          </div>
        </div>
      </div>

      {/* Step description */}
      <div
        className="mt-6 px-4 py-3 rounded-xl text-sm leading-relaxed"
        style={{
          background: s.result === false || s.match === false
            ? 'rgba(239,83,80,.08)'
            : s.result === true
            ? 'rgba(76,175,80,.1)'
            : 'rgba(255,255,255,.04)',
          border: `1px solid ${
            (s.result === false || s.match === false) ? 'rgba(239,83,80,.35)' : '#2e2e2c'
          }`,
          color: (s.result === false || s.match === false) ? RED : s.result === true ? GREEN : '#ccc',
        }}
      >
        {s.desc}
      </div>
    </div>
  );
}