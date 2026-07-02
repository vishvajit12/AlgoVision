// src/animations/ReverseWordsViz.jsx
const TEAL   = '#348681';
const GREEN  = '#4caf50';
const AMBER  = '#f5a623';
const PURPLE = '#a78bfa';
const MID    = '#2A2A28';

export default function ReverseWordsViz({ step, test }) {
  const s   = test.steps[Math.min(step, test.steps.length - 1)] || {};
  const raw = test.raw || '';
  const words = s.words || [];
  const reversedWords = s.reversedWords;

  // Tokenize raw string into { text, isSpace } chunks for rendering
  const tokens = [];
  let buf = '';
  let bufIsSpace = raw[0] === ' ';
  for (const ch of raw) {
    const isSpace = ch === ' ';
    if (isSpace !== bufIsSpace) {
      tokens.push({ text: buf, isSpace: bufIsSpace });
      buf = '';
      bufIsSpace = isSpace;
    }
    buf += ch;
  }
  if (buf) tokens.push({ text: buf, isSpace: bufIsSpace });

  const displayList = reversedWords || words;

  return (
    <div className="px-6 py-5 font-mono">
      {/* Phase badge */}
      <div className="mb-6">
        <span
          className="inline-block text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full font-bold transition-all duration-300"
          style={{
            background: s.phase === 'done' ? 'rgba(76,175,80,.12)'
              : s.phase === 'reverse' ? `${PURPLE}1a`
              : s.phase === 'join' ? `${GREEN}1a`
              : `${TEAL}1a`,
            color: s.phase === 'done' ? GREEN : s.phase === 'reverse' ? PURPLE : s.phase === 'join' ? GREEN : TEAL,
            border: `1px solid ${
              s.phase === 'done' ? 'rgba(76,175,80,.35)' : s.phase === 'reverse' ? `${PURPLE}44` : s.phase === 'join' ? `${GREEN}44` : `${TEAL}33`
            }`,
          }}
        >
          {(s.phase === 'split' || s.phase === 'split-skip' || s.phase === 'split-done') && 'Splitting on Whitespace'}
          {s.phase === 'reverse' && 'Reversing Word Order'}
          {s.phase === 'join' && 'Joining with Single Spaces'}
          {s.phase === 'done' && 'Done ✅'}
        </span>
      </div>

      {/* Raw string with word/space tokenization */}
      <div className="mb-6">
        <div className="text-xs uppercase tracking-widest mb-2 text-gray-600">input string</div>
        <div className="flex flex-wrap items-center gap-1 px-3 py-2.5 rounded-xl" style={{ background: 'rgba(255,255,255,.03)', border: '1px solid #2e2e2c' }}>
          {tokens.map((tk, i) => {
            if (tk.isSpace) {
              return (
                <span key={i} className="flex gap-0.5 px-1">
                  {tk.text.split('').map((_, j) => (
                    <span key={j} className="w-1.5 h-1.5 rounded-full" style={{ background: '#444' }} />
                  ))}
                </span>
              );
            }
            const isActive = s.activeWord === tk.text && (s.phase === 'split');
            return (
              <span
                key={i}
                className="px-2 py-1 rounded-lg text-sm font-bold transition-all duration-300"
                style={{
                  background: isActive ? `${TEAL}2a` : 'transparent',
                  border: `1.5px solid ${isActive ? TEAL : 'transparent'}`,
                  color: isActive ? TEAL : '#ccc',
                  boxShadow: isActive ? `0 0 10px ${TEAL}44` : 'none',
                }}
              >
                {tk.text}
              </span>
            );
          })}
        </div>
      </div>

      {/* Words array */}
      <div className="mb-6">
        <div className="text-xs uppercase tracking-widest mb-2 text-gray-600">
          {reversedWords ? 'words (reversed)' : 'words array'}
        </div>
        <div className="flex flex-wrap gap-2 min-h-12 px-3 py-2.5 rounded-xl items-center" style={{ background: 'rgba(255,255,255,.03)', border: '1px solid #2e2e2c' }}>
          {displayList.length === 0 ? (
            <span className="text-xs text-gray-700">[ ]</span>
          ) : (
            displayList.map((w, i) => {
              const isJoining = s.activeWord === w && s.phase === 'join';
              const isLastAdded = i === displayList.length - 1 && s.phase === 'split' && w === s.activeWord;
              return (
                <span
                  key={`${i}-${w}`}
                  className="px-3 py-1.5 rounded-lg text-sm font-bold transition-all duration-500 ease-out"
                  style={{
                    background: isJoining ? 'rgba(76,175,80,.2)' : reversedWords ? `${PURPLE}18` : `${TEAL}18`,
                    border: `1.5px solid ${isJoining ? GREEN : reversedWords ? `${PURPLE}44` : `${TEAL}44`}`,
                    color: isJoining ? GREEN : reversedWords ? PURPLE : TEAL,
                    boxShadow: (isJoining || isLastAdded) ? `0 0 10px ${isJoining ? GREEN : TEAL}55` : 'none',
                    transform: (isJoining || isLastAdded) ? 'scale(1.08)' : 'scale(1)',
                  }}
                >
                  {w}
                </span>
              );
            })
          )}
        </div>
      </div>

      {/* Result string being built */}
      <div className="mb-4">
        <div className="text-xs uppercase tracking-widest mb-2 text-gray-600">result</div>
        <div
          className="px-4 py-3 rounded-xl text-base font-bold min-h-12 flex items-center transition-all duration-300"
          style={{
            background: s.phase === 'done' ? 'rgba(76,175,80,.12)' : 'rgba(255,255,255,.03)',
            border: `1.5px solid ${s.phase === 'done' ? 'rgba(76,175,80,.4)' : '#2e2e2c'}`,
            color: s.phase === 'done' ? GREEN : '#eee',
          }}
        >
          {s.result ? `"${s.result}"` : <span className="text-gray-700 text-sm">(empty)</span>}
        </div>
      </div>

      {/* Step description */}
      <div
        className="px-4 py-3 rounded-xl text-sm leading-relaxed"
        style={{
          background: s.phase === 'done' ? 'rgba(76,175,80,.1)' : 'rgba(255,255,255,.04)',
          border: `1px solid ${s.phase === 'done' ? 'rgba(76,175,80,.35)' : '#2e2e2c'}`,
          color: s.phase === 'done' ? GREEN : '#ccc',
        }}
      >
        {s.desc}
      </div>
    </div>
  );
}