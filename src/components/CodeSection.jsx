import { useState } from 'react';

export default function CodeSection({ problem }) {
  const [lang,   setLang]   = useState('cpp');
  const [copied, setCopied] = useState(false);

  const code = lang === 'cpp' ? problem.cpp : problem.py;
  if (!code) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(code).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl overflow-hidden border border-slate-200">
      {/* Tab bar */}
      <div className="flex items-center justify-between px-4 py-2
                      bg-slate-50 border-b border-slate-200">
        <div className="flex gap-1">
          {['cpp', 'py'].map(l => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all
                ${lang === l
                  ? 'bg-ink text-white'
                  : 'text-gray-400 hover:text-ink'}`}
            >
              {l === 'cpp' ? 'C++' : 'Python'}
            </button>
          ))}
        </div>
        <button
          onClick={handleCopy}
          className={`text-xs px-3 py-1 rounded-lg border transition-all
            ${copied
              ? 'bg-green-50 text-green-600 border-green-200'
              : 'bg-white text-gray-400 border-slate-200 hover:border-gray-400 hover:text-ink'}`}
        >
          {copied ? '✓ Copied!' : 'Copy'}
        </button>
      </div>

      {/* Code */}
      <pre
        className="m-0 px-6 py-5 overflow-x-auto text-sm leading-7 max-h-96 scrollbar-thin"
        style={{ background:'#1e1e1e', color:'#d4d4d4' }}
      >
        {code}
      </pre>
    </div>
  );
}
