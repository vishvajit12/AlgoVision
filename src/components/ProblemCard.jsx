import { useState }      from 'react';
import { useNavigate }   from 'react-router-dom';
import DiffBadge         from './DiffBadge';
import TopicTag          from './TopicTag';
import { PLATFORM_COLORS } from '../data/constants';
import { getProblemNum }   from '../data/problems';

export default function ProblemCard({ problem }) {
  const navigate      = useNavigate();
  const [hov, setHov] = useState(false);
  const platColor     = PLATFORM_COLORS[problem.platform] || '#888';

  const handleClick = () => {
    if (problem.animated) {
      navigate(`/problem/${problem.id}`, { state: { problem } });
    }
  };

  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className={`bg-white rounded-2xl p-4 transition-all duration-200
                  ${problem.animated
                    ? 'cursor-pointer hover:-translate-y-0.5 hover:shadow-xl hover:shadow-slate-200'
                    : 'cursor-default opacity-90'}`}
      style={{
        border: `1.5px solid ${hov && problem.animated ? '#F05D58' : '#e8eaed'}`,
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-mono text-gray-300">{getProblemNum(problem)}</span>
          <span
            className="text-xs font-semibold px-1.5 py-0.5 rounded-full"
            style={{
              color:      platColor,
              background: `${platColor}18`,
              border:     `1px solid ${platColor}33`,
            }}
          >
            {problem.platform}
          </span>
        </div>
        <DiffBadge diff={problem.diff} />
      </div>

      {/* Title */}
      <p className="font-bold text-sm text-ink leading-snug mb-2.5 line-clamp-2">
        {problem.title}
      </p>

      {/* Topics */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {problem.topics.slice(0, 3).map(t => <TopicTag key={t} label={t} />)}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-1 border-t border-slate-50">
        {problem.animated
          ? <span className="text-coral text-xs font-bold flex items-center gap-1">
              <span>▶</span> Watch Animation
            </span>
          : <span className="text-xs font-semibold text-gray-300 bg-gray-50 px-2 py-0.5 rounded-full">
              Coming Soon
            </span>
        }
        <span className="text-xs font-mono text-gray-300">{problem.tc}</span>
      </div>
    </div>
  );
}

