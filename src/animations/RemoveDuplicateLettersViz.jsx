// src/animations/RemoveDuplicateLettersViz.jsx
const TEAL   = '#348681';
const GREEN  = '#4caf50';
const RED    = '#ef5350';
const AMBER  = '#f5a623';
const GRAY   = '#888';
const MID    = '#2A2A28';

const STK_W = 56;
const STK_ITEM_H = 40;

export default function RemoveDuplicateLettersViz({ step, test }) {
  const s     = test.steps[Math.min(step, test.steps.length - 1)] || {};
  const arr   = test.arr || [];
  const stack = s.stack || [];
  const lastIndex = test.steps[0]?.lastIndex || {};

  return (
    <div className="px-6 py-5 font-mono">
      <code className="text-gray-500 text-xs block mb-1">
        s = "{arr.join('')}"
      </code>

      {/* Phase badge */}
      <div className="mb-6">
        <span
          className="inline-block text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full font-bold transition-all duration-300"
          style={{
            background: s.phase === 'done' ? 'rgba(76,175,80,.12)'
              : s.phase === 'pop' ? 'rgba(239,83,80,.12)'
              : s.phase === 'skip' ? `${GRAY}22`
              : `${TEAL}1a`,
            color: s.phase === 'done' ? GREEN : s.phase === 'pop' ? RED : s.phase === 'skip' ? GRAY : TEAL,
            border: `1px solid ${
              s.phase === 'done' ? 'rgba(76,175,80,.35)' : s.phase === 'pop' ? 'rgba(239,83,80,.35)' : s.phase === 'skip' ? `${GRAY}44` : `${TEAL}33`
            }`,
          }}
        >
          {s.phase === 'init' && 'Precomputing Last Occurrence'}
          {s.phase === 'check' && 'Checking if Already Placed'}
          {s.phase === 'skip' && 'Skip — Already in Stack'}
          {s.phase === 'compare' && 'Comparing Top vs Current'}
          {s.phase === 'pop' && 'Popping — Will Reappear Later'}
          {s.phase === 'push' && 'Pushing Character'}
          {s.phase === 'done' && 'Done ✅'}
        </span>
      </div>

      {/* Input string */}
      <div className="flex flex-wrap gap-2 mb-6">
        {arr.map((ch, i) => {
          const isActive = s.i === i;
          const isSkipped = isActive && s.phase === 'skip';
          return (
            <div key={i} className="text-center">
              <div
                className="w-11 h-11 flex items-center justify-center text-base font-bold rounded-lg transition-all duration-300"
                style={{
                  border: `2px solid ${isSkipped ? GRAY : isActive ? TEAL : '#3e3e3c'}`,
                  background: isSkipped ? `${GRAY}22` : isActive ? `${TEAL}22` : MID,
                  color: isSkipped ? GRAY : isActive ? TEAL : '#888',
                  boxShadow: isActive ? `0 0 10px ${isSkipped ? GRAY : TEAL}44` : 'none',
                  opacity: isSkipped ? 0.5 : 1,
                  textDecoration: isSkipped ? 'line-through' : 'none',
                }}
              >
                {ch}
              </div>
              <div className="text-[9px] mt-1 text-gray-600">[{i}]</div>
            </div>
          );
        })}
      </div>

      <div className="flex gap-10 items-start flex-wrap mb-4">
        {/* Last Occurrence table */}
        <div>
          <div className="text-xs uppercase tracking-widest mb-2 text-gray-600">last occurrence</div>
          <div className="flex flex-wrap gap-2 px-3 py-2.5 rounded-xl" style={{ background: 'rgba(255,255,255,.03)', border: '1px solid #2e2e2c', minWidth: 140 }}>
            {Object.entries(lastIndex).map(([ch, idx]) => {
              const isRelevant = s.char === ch || s.popChar === ch;
              const stillAhead = s.i !== undefined && s.i !== null && idx > s.i;
              return (
                <span
                  key={ch}
                  className="px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all duration-300"
                  style={{
                    background: isRelevant ? (stillAhead ? 'rgba(76,175,80,.2)' : 'rgba(239,83,80,.15)') : `${TEAL}14`,
                    border: `1.5px solid ${isRelevant ? (stillAhead ? GREEN : RED) : `${TEAL}33`}`,
                    color: isRelevant ? (stillAhead ? GREEN : RED) : TEAL,
                    boxShadow: isRelevant ? `0 0 10px ${(stillAhead ? GREEN : RED)}44` : 'none',
                  }}
                >
                  {ch} → {idx}
                </span>
              );
            })}
          </div>
        </div>

        {/* Stack container */}
        <div className="flex flex-col items-center">
          <div className="text-xs uppercase tracking-widest mb-2 text-gray-600">stack</div>
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
            {stack.length === 0 && <span className="text-[10px] text-gray-700 mb-2">empty</span>}
            {stack.map((ch, i) => {
              const isTop = i === stack.length - 1;
              const beingPushed = isTop && s.phase === 'push';
              const isLocked = isTop && s.phase === 'compare' && s.popChar === null;
              return (
                <div
                  key={`${i}-${ch}`}
                  className="flex items-center justify-center text-sm font-bold rounded-md mb-1 transition-all duration-300"
                  style={{
                    width: STK_W - 12, height: STK_ITEM_H - 6,
                    border: `2px solid ${beingPushed ? GREEN : isLocked ? GRAY : `${TEAL}55`}`,
                    background: beingPushed ? 'rgba(76,175,80,.2)' : isLocked ? `${GRAY}18` : `${TEAL}11`,
                    color: beingPushed ? GREEN : isLocked ? GRAY : '#eee',
                    boxShadow: beingPushed ? `0 0 10px rgba(76,175,80,.5)` : 'none',
                    transform: isTop ? 'scale(1.05)' : 'scale(1)',
                  }}
                >
                  {ch}
                </div>
              );
            })}
          </div>
          <div className="text-[10px] mt-1 px-2 py-0.5 rounded" style={{ background: '#2e2e2c', color: '#888' }}>
            top ↑
          </div>
        </div>
      </div>

      {/* Step description */}
      <div
        className="px-4 py-3 rounded-xl text-sm leading-relaxed"
        style={{
          background: s.phase === 'done' ? 'rgba(76,175,80,.1)' : s.phase === 'pop' ? 'rgba(239,83,80,.08)' : 'rgba(255,255,255,.04)',
          border: `1px solid ${s.phase === 'done' ? 'rgba(76,175,80,.35)' : s.phase === 'pop' ? 'rgba(239,83,80,.35)' : '#2e2e2c'}`,
          color: s.phase === 'done' ? GREEN : s.phase === 'pop' ? RED : '#ccc',
        }}
      >
        {s.desc}
      </div>
    </div>
  );
} 