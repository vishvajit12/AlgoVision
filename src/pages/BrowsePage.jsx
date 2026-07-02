import { useState }          from 'react';
import ProblemCard            from '../components/ProblemCard';
import { FilterPill }         from '../components/ui';
import { PROBLEMS }           from '../data/problems';
import { Globe } from 'lucide-react';
import { Search } from 'lucide-react';
import { TOPICS, DIFFICULTIES, PLATFORMS, PLATFORM_COLORS, PLATFORM_ICONS } from '../data/constants';

export default function BrowsePage() {
  const [search,  setSearch]  = useState('');
  const [platF,   setPlatF]   = useState('All');
  const [diffF,   setDiffF]   = useState('All');
  const [topicF,  setTopicF]  = useState('All');

  const filtered = PROBLEMS.filter(p => {
    if (platF  !== 'All' && p.platform !== platF)          return false;
    if (diffF  !== 'All' && p.diff     !== diffF)          return false;
    if (topicF !== 'All' && !p.topics.includes(topicF))    return false;
    if (search && !p.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const platformCount = (name) =>
    name === 'All' ? PROBLEMS.length : PROBLEMS.filter(p => p.platform === name).length;

  return (
    <div className="min-h-screen py-10 px-6 md:px-10" style={{ background:'#DBDDCB' }}>
      <div className="max-w-5xl mx-auto">

        {/* ── Page header ── */}
        <div className="mb-8 mt-0">
          <h1 className="text-ink font-black text-3xl tracking-tight mb-1">
            Problem Library
          </h1>
          <p className="text-gray-500 text-sm">
            {PROBLEMS.filter(p => p.animated).length} animated ·{' '}
            {PROBLEMS.length} total across {PLATFORMS.length - 1} platforms
          </p>
        </div>

        {/* ── Search ── */}
        <div className="relative mb-6">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-base"> <Search /></span>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search problems by name…"
            className="w-full pl-10 pr-4 py-3 rounded-2xl border-2 border-slate-200
                       bg-white text-ink text-sm outline-none
                       focus:border-coral transition-colors placeholder:text-gray-300"
          />
        </div>

        {/* ═══════════════════════════════════════
            PLATFORM FILTER SECTION
        ═══════════════════════════════════════ */}
        <div className="bg-white rounded-2xl p-5 mb-4 border border-slate-100 shadow-sm">
          <h3 className="text-xs font-black text-ink uppercase tracking-widest mb-4 flex items-center gap-2">
            <span><Globe /></span> Platform
          </h3>
          <div className="flex flex-wrap gap-3">
            {PLATFORMS.map(p => {
              const color  = PLATFORM_COLORS[p] || '#348681';
              const icon   = PLATFORM_ICONS[p]  || <Globe />;
              const count  = platformCount(p);
              const active = platF === p;
              return (
                <button
                  key={p}
                  onClick={() => setPlatF(p)}
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm
                             font-semibold transition-all duration-200 border-2"
                  style={{
                    borderColor: active ? color    : '#e8eaed',
                    background:  active ? `${color}15` : 'white',
                    color:       active ? color    : '#888',
                  }}
                >
                  <span className="text-base">{p === 'All' ? <Globe /> : icon}</span>
                  <span>{p}</span>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full font-bold"
                    style={{
                      background: active ? color    : '#f0f0f0',
                      color:      active ? 'white'  : '#aaa',
                    }}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ═══════════════════════════════════════
            DIFFICULTY + TOPIC FILTERS
        ═══════════════════════════════════════ */}
        <div className="bg-white rounded-2xl p-5 mb-6 border border-slate-100 shadow-sm">
          {/* Difficulty */}
          <div className="mb-4">
            <h3 className="text-xs font-black text-ink uppercase tracking-widest mb-3 flex items-center gap-2">
              <span>📊</span> Difficulty
            </h3>
            <div className="flex flex-wrap gap-2">
              {DIFFICULTIES.map(d => (
                <FilterPill key={d} label={d} active={diffF === d} onClick={() => setDiffF(d)} />
              ))}
            </div>
          </div>

          {/* Topic */}
          <div>
            <h3 className="text-xs font-black text-ink uppercase tracking-widest mb-3 flex items-center gap-2">
              <span>🏷️</span> Topic
            </h3>
            <div className="flex flex-wrap gap-2">
              {TOPICS.map(t => (
                <FilterPill key={t} label={t} active={topicF === t} onClick={() => setTopicF(t)} small />
              ))}
            </div>
          </div>
        </div>

        {/* ── Results count ── */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs text-gray-400 font-medium">
            Showing <strong className="text-ink">{filtered.length}</strong> problem{filtered.length !== 1 ? 's' : ''}
          </p>
          {(platF !== 'All' || diffF !== 'All' || topicF !== 'All' || search) && (
            <button
              onClick={() => { setPlatF('All'); setDiffF('All'); setTopicF('All'); setSearch(''); }}
              className="text-xs text-coral hover:underline font-semibold"
            >
              Clear all filters ✕
            </button>
          )}
        </div>

        {/* ── Problem grid ── */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filtered.map(p => <ProblemCard key={p.id} problem={p} />)}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🤔</div>
            <p className="text-gray-400 text-base font-semibold mb-2">No problems match</p>
            <p className="text-gray-300 text-sm">Try adjusting or clearing your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
