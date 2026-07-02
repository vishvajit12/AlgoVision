import { SOLUTION_STEPS } from '../data/testCases';

export default function SolutionExplainer({ problem }) {
  const sol = SOLUTION_STEPS[problem.id];
  if (!sol) return (
    <p className="text-gray-400 text-sm italic">No walkthrough available yet for this problem.</p>
  );

  return (
    <div>
      {/* Header strip */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <span className="px-3 py-1 rounded-lg text-sm font-bold bg-teal/10 text-teal border border-teal/20">
          {sol.title}
        </span>
        <span className="text-slate-300">•</span>
        <span className="font-mono text-xs text-gray-500">
          Time: <strong className="text-teal">{problem.tc}</strong>
        </span>
        <span className="text-slate-300">•</span>
        <span className="font-mono text-xs text-gray-500">
          Space: <strong className="text-coral">{problem.sc}</strong>
        </span>
      </div>

      {/* Approach summary */}
      <p className="text-gray-500 text-sm leading-relaxed mb-5 px-4 py-3
                    bg-slate-50 rounded-xl border-l-4 border-teal">
        {sol.approach}
      </p>

      {/* Numbered steps */}
      <div className="flex flex-col gap-2">
        {sol.steps.map((step, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-3 px-4 py-3 rounded-xl border transition-all duration-150
              hover:border-teal/30 hover:shadow-sm
              ${idx % 2 === 0 ? 'bg-slate-50/80 border-slate-100' : 'bg-white border-slate-100'}`}
          >
            {/* Step number badge */}
            <div className="w-7 h-7 rounded-full bg-ink text-white flex items-center justify-center
                            text-xs font-black shrink-0 mt-0.5">
              {step.num}
            </div>

            {/* Icon */}
            <span className="text-xl shrink-0 mt-0.5">{step.icon}</span>

            {/* Text */}
            <div className="min-w-0">
              <p className="font-bold text-sm text-ink mb-0.5">{step.title}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom hint */}
      <p className="text-xs text-gray-400 mt-4 flex items-center gap-1.5">
        <span>💡</span>
        Watch the animation below to see each step execute live with real test cases.
      </p>
    </div>
  );
}
