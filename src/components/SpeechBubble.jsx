export default function SpeechBubble() {
  return (
    <svg
      viewBox="0 0 195 128"
      width={195}
      height={128}
      style={{ filter: 'drop-shadow(2px 3px 10px rgba(0,0,0,0.28))' }}
    >
      <path
        d="M12,8 Q12,0 22,0 L173,0 Q183,0 183,10 L183,88 Q183,98 173,98 L108,98 L90,124 L84,98 L22,98 Q12,98 12,88 Z"
        fill="#1C1C1A"
      />
      <text x={98} y={30} textAnchor="middle" fill="white"   fontSize={13} fontFamily="Georgia,serif" fontStyle="italic">
        No more
      </text>
      <text x={98} y={50} textAnchor="middle" fill="#F05D58" fontSize={14} fontFamily="Georgia,serif" fontStyle="italic" fontWeight="bold">
        dry-run headaches!
      </text>
      <text x={98} y={70} textAnchor="middle" fill="#348681" fontSize={11} fontFamily="monospace">
        {'<Debug />'}
      </text>
      <text x={98} y={87} textAnchor="middle" fill="#DBDDCB" fontSize={10} fontFamily="monospace" opacity={0.7}>
        visually 🧠
      </text>
    </svg>
  );
}
