import { DIFF_STYLES } from '../data/constants';

export default function DiffBadge({ diff }) {
  const s = DIFF_STYLES[diff] || {};
  return (
    <span
      className="px-2.5 py-0.5 rounded-full text-xs font-bold whitespace-nowrap"
      style={{ background: s.bg, color: s.text, border: `1px solid ${s.border}` }}
    >
      {diff}
    </span>
  );
}
