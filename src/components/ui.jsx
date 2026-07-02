/* ── FilterPill ── */
export function FilterPill({ label, active, onClick, small = false }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full font-semibold transition-all duration-200 border
        ${small ? 'px-3 py-1 text-xs' : 'px-4 py-1.5 text-xs'}
        ${active
          ? 'bg-coral text-white border-coral'
          : 'bg-white text-gray-500 border-slate-200 hover:border-coral/50 hover:text-ink'
        }`}
    >
      {label}
    </button>
  );
}

/* ── CtrlBtn ── */
export function CtrlBtn({ children, onClick, disabled, primary }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-3 py-1.5 rounded-md text-xs font-mono transition-all duration-200
        ${disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
        ${primary
          ? 'bg-teal text-white hover:bg-rose'
          : 'bg-[#1e1e1c] text-gray-400 hover:bg-[#2e2e2c]'
        }`}
    >
      {children}
    </button>
  );
}

/* ── SectionCard ── */
export function SectionCard({ title, children, accent = false }) {
  return (
    <div
      className="bg-white rounded-2xl p-6"
      style={{
        border: `${accent ? 2 : 1}px solid ${accent ? '#F05D5844' : '#e8eaed'}`,
      }}
    >
      <h3
        className="text-base font-bold pb-3 mb-4"
        style={{
          color:        '#393937',
          borderBottom: `2px solid ${accent ? '#F05D58' : '#f0f0f0'}`,
        }}
      >
        {title}
      </h3>
      {children}
    </div>
  );
}
