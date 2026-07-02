import { useParams, useLocation, useNavigate } from 'react-router-dom';
import DiffBadge         from '../components/DiffBadge';
import TopicTag          from '../components/TopicTag';
import SolutionExplainer from '../components/SolutionExplainer';
import AnimationPlayer   from '../components/AnimationPlayer';
import CodeSection       from '../components/CodeSection';
import ProblemCard       from '../components/ProblemCard';
import { SectionCard }   from '../components/ui';
import { PROBLEMS, getProblemNum, getProblemLink } from '../data/problems';
import { PLATFORM_COLORS } from '../data/constants';
import { FileText } from 'lucide-react';


export default function ProblemPage() {
  const { id }        = useParams();
  const { state }     = useLocation();
  const navigate      = useNavigate();

  /* Prefer state (faster), fall back to array lookup (direct URL) */
  const problem = state?.problem || PROBLEMS.find(p => p.id === parseInt(id));

  if (!problem) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-slate-50">
        <span className="text-5xl">🤖</span>
        <p className="text-gray-500 text-lg font-semibold">Problem not found</p>
        <button
          onClick={() => navigate('/browse')}
          className="px-6 py-2.5 bg-coral text-white rounded-xl text-sm font-bold hover:bg-rose transition-all"
        >
          ← Back to Problems
        </button>
      </div>
    );
  }

  const related    = PROBLEMS
    .filter(p => p.id !== problem.id && p.topics.some(t => problem.topics.includes(t)))
    .slice(0, 4);
  const platColor  = PLATFORM_COLORS[problem.platform] || '#348681';
  const probLink   = getProblemLink(problem);
  const probNum    = getProblemNum(problem);

  return (
    <div className="min-h-screen pb-16" style={{ background:'#DBDDCB' }}>

      {/* ══════════════════════════════
          HEADER BAR
      ══════════════════════════════ */}
      <div className="bg-#E0E0C0 border-b border-slate-200 px-6 md:px-10 py-5 top-14 z-40 shadow-sm">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate('/browse')}
            className="text-xs text-gray-500 border border-slate-200 px-3 py-1.5
                       rounded-lg mb-3 hover:border-coral hover:text-coral transition-all
                       flex items-center gap-1"
          >
            ← Back to Problems
          </button>

          {/* Title row */}
          <div className="flex items-center gap-3 flex-wrap mb-2.5">
            <span className="text-sm font-mono text-gray-500">{probNum}</span>
            <h1 className="text-xl md:text-2xl font-black text-ink tracking-tight">
              {problem.title}
            </h1>
            <DiffBadge diff={problem.diff} />
          </div>

          {/* Tags + external link */}
          <div className="flex items-center gap-2 flex-wrap">
            {problem.topics.map(t => <TopicTag key={t} label={t} />)}

            {/* Platform badge */}
            <span
              className="px-2.5 py-0.5 rounded-full text-xs font-bold"
              style={{
                color:      platColor,
                background: `${platColor}15`,
                border:     `1px solid ${platColor}33`,
              }}
            >
              {problem.platform}
            </span>

            {/* External link */}
            <a
              href={probLink}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto text-xs text-gray-400 hover:text-teal transition-colors
                         flex items-center gap-1 font-medium"
            >
              View on {problem.platform} ↗
            </a>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════
          BODY
      ══════════════════════════════ */}
      <div className="max-w-4xl mx-auto px-6 md:px-10 pt-7 flex flex-col gap-5">

        {/* 1. Problem Statement */}
        <SectionCard title="📋 Problem Statement">
          <p className="text-gray-500 text-sm leading-relaxed whitespace-pre-line">{problem.desc}</p>
        </SectionCard>

        {/* 2. Solution Walkthrough  ← NEW: ABOVE animation */}
        <SectionCard title="💡 Solution Walkthrough">
          <SolutionExplainer problem={problem} />
        </SectionCard>

        {/* 3. Interactive Animation */}
        <SectionCard title="▶ Interactive Animation" accent>
          {problem.animated ? (
            <AnimationPlayer problem={problem} />
          ) : (
            <div
              className="py-14 text-center rounded-2xl"
              style={{ background:'#1C1C1A', border:'1px dashed #2e2e2c' }}
            >
              <div className="text-4xl mb-3">🤖</div>
              <p className="text-gray-600 text-sm">Animation coming soon for this problem!</p>
            </div>
          )}
        </SectionCard>

        {/* 4. Complexity Analysis */}
        <SectionCard title="📊 Complexity Analysis">
          <div className="flex gap-4 flex-wrap">
            {[
              ['Time Complexity',  problem.tc, '#348681'],
              ['Space Complexity', problem.sc, '#F05D58'],
            ].map(([label, val, color]) => (
              <div
                key={label}
                className="flex-1 min-w-36 p-5 rounded-2xl"
                style={{ border:`1px solid ${color}33`, background:`${color}08` }}
              >
                <p
                  className="text-xs font-bold uppercase tracking-wider mb-2"
                  style={{ color:'#999' }}
                >
                  {label}
                </p>
                <p
                  className="font-mono font-black text-3xl tracking-tighter"
                  style={{ color }}
                >
                  {val}
                </p>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* 5. Code */}
        {(problem.cpp || problem.py) && (
          <SectionCard title="💻 Solution Code">
            <CodeSection problem={problem} />
          </SectionCard>
        )}

        {/* 6. Related Problems */}
        {related.length > 0 && (
          <SectionCard title="🔗 Related Problems">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {related.map(p => <ProblemCard key={p.id} problem={p} />)}
            </div>
          </SectionCard>
        )}
      </div>
    </div>
  );
}
