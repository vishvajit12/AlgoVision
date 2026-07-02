export default function TopicTag({ label, color = '#348681' }) {
  return (
    <span
      className="px-2 py-0.5 rounded-full text-xs font-semibold font-mono inline-block"
      style={{
        background: `${color}15`,
        color,
        border: `1px solid ${color}33`,
      }}
    >
      {label}
    </span>
  );
}
