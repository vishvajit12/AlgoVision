import { useState, useRef } from "react";

export default function AlgoRobot() {
  const [pos, setPos]         = useState({ x: 650, y: 100 });
  const [dragging, setDragging] = useState(false);
  const offset = useRef({ x: 0, y: 0 });

  const onPointerDown = (e) => {
    setDragging(true);
    offset.current = { x: e.pageX - pos.x, y: e.pageY - pos.y };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e) => {
    if (!dragging) return;
    setPos({ x: e.pageX - offset.current.x, y: e.pageY - offset.current.y });
  };
  const onPointerUp = (e) => {
    setDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  }

  return (
    <div
      style={{
        position: "sticky",  // ← anchored to the document; scrolls naturally with the page
        left: pos.x,
        top:  pos.y,
        cursor:     dragging ? "grabbing" : "grab",
        userSelect: "none",
        touchAction:"none",
        zIndex: 10,
        filter: dragging
          ? "drop-shadow(0 14px 32px rgba(240,93,88,0.45))"
          : "drop-shadow(0 12px 24px rgba(0,0,0,0.22))",
        transition: dragging ? "none" : "filter 0.2s",
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      <svg viewBox="-20 0 258 310" width={300} height={400} overflow="visible">
        <defs>
          <style>{`
            @keyframes robo-float { 0%,100%{ transform:translateY(0)     } 50%{ transform:translateY(-14px)   } }
            @keyframes robo-blink { 0%,88%,100%{ transform:scaleY(1)     } 92%{ transform:scaleY(0.06)        } }
            @keyframes robo-wave  { 0%,100%{ transform:rotate(-10deg)    } 50%{ transform:rotate(24deg)       } }
            @keyframes robo-pulse { 0%,100%{ opacity:1;transform:scale(1)} 50%{ opacity:.3;transform:scale(.78)} }
            @keyframes robo-scan  { 0%,100%{ opacity:.35 }               50%{ opacity:1                       } }

            .robo-float { animation: robo-float 3.2s ease-in-out infinite; }
            .robo-blink { animation: robo-blink 4.6s ease-in-out infinite; transform-box:fill-box; transform-origin:center; }
            .robo-wave  { animation: robo-wave  2.4s ease-in-out infinite; transform-box:fill-box; }
            .robo-pulse { animation: robo-pulse 1.8s ease-in-out infinite; transform-box:fill-box; transform-origin:center; }
            .robo-scan  { animation: robo-scan  2.4s ease-in-out infinite; }
          `}</style>
        </defs>

        <g className="robo-float">

          {/* Shadow */}
          <ellipse cx={110} cy={298} rx={48} ry={7} fill="#111" opacity={0.35} />

          {/* ── Left arm – segmented ring chain, pivots at shoulder ── */}
          <g className="robo-wave" style={{ transformBox: "fill-box", transformOrigin: "80% 90%" }}>
            <line x1={40} y1={136} x2={28} y2={122} stroke="#1A1A18" strokeWidth={13} strokeLinecap="round" />
            <line x1={28} y1={122} x2={17} y2={107} stroke="#1A1A18" strokeWidth={13} strokeLinecap="round" />
            <line x1={17} y1={107} x2={ 9} y2={ 90} stroke="#1A1A18" strokeWidth={13} strokeLinecap="round" />
            <line x1={ 9} y1={ 90} x2={ 4} y2={ 73} stroke="#1A1A18" strokeWidth={13} strokeLinecap="round" />
            <line x1={ 4} y1={ 73} x2={ 0} y2={ 58} stroke="#1A1A18" strokeWidth={11} strokeLinecap="round" />
            <line x1={0}  y1={ 58} x2={ 0} y2={ 43} stroke="#1A1A18" strokeWidth={11} strokeLinecap="round" />
            <path d="M 0 43 C -9 35 -13 27 -9 19"   stroke="#1A1A18" strokeWidth={10} fill="none" strokeLinecap="round" />
            <path d="M 0 43 C  9 35  13 27  9 19"   stroke="#1A1A18" strokeWidth={10} fill="none" strokeLinecap="round" />
            <path d="M 0 43 C -9 35 -13 27 -9 19"   stroke="#484846" strokeWidth={2.5} fill="none" strokeLinecap="round" />
            <path d="M 0 43 C  9 35  13 27  9 19"   stroke="#484846" strokeWidth={2.5} fill="none" strokeLinecap="round" />

            <circle cx={40} cy={136} r={14} fill="#3A3A38" stroke="#5C5C5A" strokeWidth={4.5} />
            <circle cx={40} cy={136} r={6}  fill="#2C2C2A" />
            <circle cx={28} cy={122} r={13} fill="#3A3A38" stroke="#5C5C5A" strokeWidth={4} />
            <circle cx={28} cy={122} r={5.5} fill="#2C2C2A" />
            <circle cx={17} cy={107} r={13} fill="#3A3A38" stroke="#5C5C5A" strokeWidth={4} />
            <circle cx={17} cy={107} r={5.5} fill="#2C2C2A" />
            <circle cx={ 9} cy={ 90} r={14} fill="#3A3A38" stroke="#5C5C5A" strokeWidth={4.5} />
            <circle cx={ 9} cy={ 90} r={6}  fill="#2C2C2A" />
            <circle cx={ 4} cy={ 73} r={12} fill="#3A3A38" stroke="#5C5C5A" strokeWidth={4} />
            <circle cx={ 4} cy={ 73} r={5}  fill="#2C2C2A" />
            <circle cx={ 0} cy={ 58} r={11} fill="#3A3A38" stroke="#5C5C5A" strokeWidth={3.5} />
            <circle cx={ 0} cy={ 58} r={4.5} fill="#2C2C2A" />
            <circle cx={ 0} cy={ 43} r={9}  fill="#3A3A38" stroke="#5C5C5A" strokeWidth={3} />
            <circle cx={ 0} cy={ 43} r={3.5} fill="#2C2C2A" />
            <circle cx={-9} cy={ 19} r={6}  fill="#3A3A38" stroke="#5C5C5A" strokeWidth={2.5} />
            <circle cx={-9} cy={ 19} r={2.5} fill="#2C2C2A" />
            <circle cx={ 9} cy={ 19} r={6}  fill="#3A3A38" stroke="#5C5C5A" strokeWidth={2.5} />
            <circle cx={ 9} cy={ 19} r={2.5} fill="#2C2C2A" />
          </g>

          {/* ── Body group ── */}
          <g>
            <rect x={74}  y={222} width={24} height={44} rx={9} fill="#2C2C2A" stroke="#5C5C5A" strokeWidth={2.5} />
            <rect x={122} y={222} width={24} height={44} rx={9} fill="#2C2C2A" stroke="#5C5C5A" strokeWidth={2.5} />
            <rect x={64}  y={254} width={36} height={14} rx={7} fill="#3A3A38" stroke="#5C5C5A" strokeWidth={2} />
            <rect x={120} y={254} width={36} height={14} rx={7} fill="#3A3A38" stroke="#5C5C5A" strokeWidth={2} />
            <circle cx={86}  cy={224} r={4} fill="#5C5C5A" />
            <circle cx={134} cy={224} r={4} fill="#5C5C5A" />

            <rect x={48} y={128} width={124} height={98} rx={20} fill="#2C2C2A" stroke="#5C5C5A" strokeWidth={3} />
            <rect x={62} y={142} width={96}  height={68} rx={12} fill="#3A3A38" stroke="#5C5C5A" strokeWidth={1.5} />
            <rect x={70} y={150} width={80}  height={48} rx={8}  fill="#1E1E1C" />

            <rect x={76} y={158} width={68} height={4} rx={2}   fill="#348681" opacity={0.85} />
            <rect x={76} y={166} width={50} height={3} rx={1.5} fill="#348681" opacity={0.45} />
            <rect x={76} y={173} width={68} height={5} rx={2.5} fill="#F05D58" opacity={0.9} />
            <rect x={76} y={182} width={40} height={3} rx={1.5} fill="#F05D58" opacity={0.5} />
            <rect x={76} y={189} width={60} height={3} rx={1.5} fill="#348681" opacity={0.3} />

            <circle cx={60}  cy={150} r={4} fill="#5C5C5A" stroke="#6E6E6C" strokeWidth={1} />
            <circle cx={60}  cy={210} r={4} fill="#5C5C5A" stroke="#6E6E6C" strokeWidth={1} />
            <circle cx={160} cy={150} r={4} fill="#5C5C5A" stroke="#6E6E6C" strokeWidth={1} />
            <circle cx={160} cy={210} r={4} fill="#5C5C5A" stroke="#6E6E6C" strokeWidth={1} />

            <rect x={88} y={114} width={44} height={18} rx={7} fill="#1E1E1C" stroke="#5C5C5A" strokeWidth={2} />
            <rect x={96} y={118} width={28} height={10} rx={4} fill="#3A3A38" />

            <rect x={44} y={36} width={132} height={82} rx={22} fill="#2C2C2A" stroke="#5C5C5A" strokeWidth={3} />
            <rect x={56} y={38} width={108} height={12} rx={10} fill="#3A3A38" opacity={0.7} />

            <circle cx={44}  cy={77} r={9} fill="#3A3A38" stroke="#5C5C5A" strokeWidth={2.5} />
            <circle cx={44}  cy={77} r={4} fill="#5C5C5A" />
            <circle cx={176} cy={77} r={9} fill="#3A3A38" stroke="#5C5C5A" strokeWidth={2.5} />
            <circle cx={176} cy={77} r={4} fill="#5C5C5A" />

            <rect x={56} y={46} width={108} height={58} rx={14} fill="#1E1E1C" stroke="#2E2E2C" strokeWidth={1.5} />
            <rect x={60} y={49} width={60}  height={6}  rx={3}  fill="white" opacity={0.05} />

            <g className="robo-blink">
              <circle cx={88} cy={75} r={15}  fill="#3A3A38" />
              <circle cx={88} cy={75} r={11}  fill="#1E1E1C" />
              <circle cx={88} cy={75} r={7}   fill="#348681" />
              <circle cx={88} cy={75} r={3.5} fill="#0a0a09" />
              <circle cx={90} cy={73} r={2.5} fill="white" opacity={0.85} />

              <circle cx={132} cy={75} r={15}  fill="#3A3A38" />
              <circle cx={132} cy={75} r={11}  fill="#1E1E1C" />
              <circle cx={132} cy={75} r={7}   fill="#348681" />
              <circle cx={132} cy={75} r={3.5} fill="#0a0a09" />
              <circle cx={134} cy={73} r={2.5} fill="white" opacity={0.85} />
            </g>

            <rect x={76}  y={97} width={68} height={7} rx={3.5} fill="#1E1E1C" />
            <rect x={80}  y={98} width={9}  height={5} rx={2}   fill="#F05D58" />
            <rect x={94}  y={98} width={9}  height={5} rx={2}   fill="#F05D58" opacity={0.5} />
            <rect x={108} y={98} width={9}  height={5} rx={2}   fill="#F05D58" />
            <rect x={122} y={98} width={9}  height={5} rx={2}   fill="#F05D58" opacity={0.7} />
            <rect x={136} y={98} width={6}  height={5} rx={2}   fill="#F05D58" />

            <rect x={107} y={18} width={6} height={22} rx={3} fill="#5C5C5A" stroke="#6E6E6C" strokeWidth={1} />
            <circle cx={110} cy={13} r={9} fill="#F05D58" className="robo-pulse" />
            <circle cx={110} cy={13} r={5} fill="white" opacity={0.5} />
          </g>

          {/* ── Right arm – short bracket arm (static) ── */}
          <g>
            <rect x={162} y={132} width={44} height={22} rx={11} fill="#2C2C2A" stroke="#5C5C5A" strokeWidth={2} />
            <circle cx={162} cy={143} r={9} fill="#3A3A38" stroke="#5C5C5A" strokeWidth={2} />
            <rect x={200} y={120} width={14} height={44} rx={6} fill="#F05D58" stroke="#5C5C5A" strokeWidth={1.5} />
            <text x={203} y={148} fill="white" fontSize={20} fontFamily="monospace" fontWeight="bold" opacity={0.95}>[</text>
          </g>

        </g>
      </svg>
    </div>
  );
}