import { useState } from 'react';

const OCCUPATIONS = [
  { icon: '🎓', label: 'Student' },
  { icon: '💻', label: 'Developer' },
  { icon: '🎯', label: 'Competitive Programmer' },
  { icon: '🔍', label: 'Unemployed' },
  { icon: '🕷', label: 'Spiderman' },
  { icon: '🥸', label: 'Einstein' },
];

export default function WelcomeModal({ onClose }) {
  const [name,       setName]       = useState('');
  const [occupation, setOccupation] = useState('');
  const [step,       setStep]       = useState(0); // 0=name, 1=occupation

  const handleNext = () => {
    if (step === 0) {
      if (!name.trim()) return;
      setStep(1);
    } else {
      const userData = { name: name.trim(), occupation };
      localStorage.setItem('ac_user', JSON.stringify(userData));
      onClose(userData);
    }
  };

  const handleSkip = () => {
    const userData = { name: name.trim(), occupation: '' };
    localStorage.setItem('ac_user', JSON.stringify(userData));
    onClose(userData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="bg-#DBDDCB rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">

        {/* Top coral bar */}
        <div className="bg-#DBDDCB px-8 pt-8 pb-6 text-center relative overflow-hidden">
          {/* Decorative stripes */}
          {[...Array(5)].map((_, i) => (
            <div key={i} className="absolute left-0 right-0 h-3 rounded-full opacity-10"
              style={{ top: `${20 + i * 18}%`, background: 'rgba(0,0,0,0.3)' }} />
          ))}
          <div className="relative z-10">
            <div className="text-5xl mb-3 animate-bounce">
              {step === 0 ? '👋' : '🤖'}
            </div>
            <h1 className="text-white font-black text-2xl tracking-tight mb-1">
              {step === 0 ? 'Welcome to AnimeCode!' : `Hey, ${name}! 🎉`}
            </h1>
            <p className="text-white/70 text-sm">
              {step === 0
                ? 'Algorithms visualized, step by step.'
                : 'What best describes you?'}
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="px-8 py-7">
          {step === 0 ? (
            /* ── Step 1: Name ── */
            <div>
              <label className="block text-xs font-bold text-white uppercase tracking-wider mb-2">
                Your Name
              </label>
              <input
                autoFocus
                value={name}
                onChange={e => setName(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleNext()}
                placeholder="e.g. sanket, tanaya, spidy, luffy …"
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 text-white text-sm outline-none focus:border-coral transition-colors placeholder:text-gray-600 mb-5"
              />
              <button
                onClick={handleNext}
                disabled={!name.trim()}
                className="w-full py-3 rounded-xl bg-coral text-white font-bold text-sm
                           hover:bg-rose transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Continue →
              </button>
            </div>
          ) : (
            /* ── Step 2: Occupation (optional) ── */
            <div>
              <div className="grid grid-cols-2 gap-2 mb-5">
                {OCCUPATIONS.map(({ icon, label }) => (
                  <button
                    key={label}
                    onClick={() => setOccupation(occupation === label ? '' : label)}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold
                                border-2 transition-all text-left
                                ${occupation === label
                                  ? 'border-coral bg-coral/10 text-coral'
                                  : 'border-slate-200 text-white hover:border-coral/40 hover:text-coral'}`}
                  >
                    <span className="text-base">{icon}</span>
                    {label}
                  </button>
                ))}
              </div>

              <button
                onClick={handleNext}
                className="w-full py-3 rounded-xl bg-coral text-white font-bold text-sm
                           hover:bg-rose transition-all mb-2"
              >
                Start Learning 🚀
              </button>
              {!occupation && (
                <button
                  onClick={handleSkip}
                  className="w-full py-2 text-xs text-gray-400 hover:text-gray-600 transition-colors"
                >
                  Skip for now
                </button>
              )}
            </div>
          )}

          {/* Step indicator dots */}
          <div className="flex justify-center gap-2 mt-4">
            {[0, 1].map(i => (
              <div key={i}
                className={`h-1.5 rounded-full transition-all duration-300
                  ${step === i ? 'bg-coral w-5' : 'bg-slate-200 w-1.5'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
