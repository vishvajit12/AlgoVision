import { useState, useEffect, useRef } from 'react';
import { CtrlBtn }               from './ui';
import { TEST_CASES }            from '../data/testCases';
import { MousePointerClick } from 'lucide-react';


import TwoSumViz                 from '../animations/TwoSumViz';
import BinarySearchViz           from '../animations/BinarySearchViz';
import ValidParenViz             from '../animations/ValidParenViz';
import LongestSubstringViz       from '../animations/LongestSubstringViz';
import ContainsDuplicateViz from '../animations/ContainsDuplicateViz';
import RemoveNthNodeViz          from '../animations/RemoveNthNodeViz';
import PalindromeLinkedListViz from '../animations/PalindromeLinkedListViz';
import BestTimeToBuySellViz from '../animations/BestTimeToBuySellViz';
import LinkedListCycleViz from '../animations/LinkedListCycleViz';
import MergeSortedArrayViz from '../animations/MergeSortedArrayViz';
import DeleteNodeViz from '../animations/DeleteNodeViz';
import BinaryTreeInorderViz from '../animations/BinaryTreeInorderViz';
import LuckySevenViz from '../animations/LuckySevenViz';
import ContainerWithMostWaterViz from '../animations/ContainerWithMostWaterViz';
import ReverseWordsViz from '../animations/ReverseWordsViz';
import RemoveOccurrencesViz from '../animations/RemoveOccurrencesViz';
import PreorderTraversalViz from '../animations/PreorderTraversalViz';
import MajorityElementViz from '../animations/MajorityElementViz';
import FindFirstLastViz from '../animations/FindFirstLastViz';
import RemoveDuplicateLettersViz from '../animations/RemoveDuplicateLettersViz';
import CloneGraphViz from '../animations/CloneGraphViz';
import SameTreeViz from '../animations/SameTreeViz';
import SqrtViz from '../animations/SqrtVizViz';
import SortedArrayToBSTViz from '../animations/SortedArrayToBSTViz';
import ShuffleArrayViz from '../animations/ShuffleArrayViz';
import PeekingIteratorViz from '../animations/PeekingIteratorViz';
import LargestNumberViz from '../animations/LargestNumberViz';
import FlattenMultilevelListViz from '../animations/FlattenMultilevelListViz';
import SortColorsViz from '../animations/SortColorsViz';


const VIZ_MAP = { 1: TwoSumViz,
                  2: BinarySearchViz, 
                  3: ValidParenViz, 
                  4:  LongestSubstringViz, 
                  5: RemoveNthNodeViz , 
                  6:  PalindromeLinkedListViz,
                  7:  LinkedListCycleViz,
                  8:  BestTimeToBuySellViz,
                  9: ContainsDuplicateViz,
                  10:  MergeSortedArrayViz,
                  11: DeleteNodeViz,
                  12: BinaryTreeInorderViz,
                  13: LuckySevenViz,
                  14: ContainerWithMostWaterViz,
                  15: ReverseWordsViz,
                  16: RemoveOccurrencesViz,
                  17: PreorderTraversalViz,
                  18: MajorityElementViz,
                  19: FindFirstLastViz,
                  20: RemoveDuplicateLettersViz,
                  21: CloneGraphViz,
                  22: SameTreeViz,
                  23: SqrtViz, 
                  24: SortedArrayToBSTViz,
                  25: ShuffleArrayViz,
                  26: PeekingIteratorViz,
                  28: LargestNumberViz,
                  29: FlattenMultilevelListViz,
                  30: SortColorsViz,   
            };

export default function AnimationPlayer({ problem }) {
  const tests   = TEST_CASES[problem.id]?.tests || [];
  const Viz     = VIZ_MAP[problem.id];

  const [tc,    setTc]    = useState(0);
  const [step,  setStep]  = useState(0);
  const [play,  setPlay]  = useState(false);
  const [speed, setSpeed] = useState(0.5);

  const cur   = tests[tc] || { steps: [] };
  const steps = cur.steps || [];
  const wrapperRef = useRef(null);

  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => { setStep(0); setPlay(false); }, [problem.id]);
  useEffect(() => { setStep(0); setPlay(false); }, [tc]);

  useEffect(() => {
    if (!play || !steps.length) return;
    const t = setInterval(() => {
      setStep(s => {
        if (s >= steps.length - 1) { setPlay(false); return s; }
        return s + 1;
      });
    }, 1400 / speed);
    return () => clearInterval(t);
  }, [play, speed, steps.length]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      const isFullscreen = document.fullscreenElement === wrapperRef.current;
      setFullscreen(isFullscreen);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const go = n => setStep(Math.max(0, Math.min(steps.length - 1, n)));

  const pct = steps.length > 1 ? (step / (steps.length - 1)) * 100 : 0;

  const toggleFullscreen = async () => {
    if (!wrapperRef.current) return;
    if (document.fullscreenElement === wrapperRef.current) {
      await document.exitFullscreen();
    } else {
      await wrapperRef.current.requestFullscreen();
    }
  };

  return (
    <div
      ref={wrapperRef}
      className={`relative rounded-2xl overflow-hidden ${fullscreen ? 'flex flex-col h-screen w-screen' : ''}`}
      style={{ border: '1px solid #2a2a28', background: '#1C1C1A' }}
    >

      {/* ── macOS titlebar ── */}
      <div className="flex items-center gap-3 px-4 py-2.5 flex-shrink-0" style={{ borderBottom: '1px solid #222220' }}>
        {['#FF5F57','#FEBC2E','#28C840'].map(c => (
          <div key={c} className="w-3 h-3 rounded-full" style={{ background: c }} />
        ))}
        <span className="text-xs font-mono ml-2" style={{ color:'#4a4a48' }}>
          AlgoVision · visualizer
        </span>
      <button
  onClick={toggleFullscreen}
  className="flex items-center gap-2 rounded-full px-5 py-1 text-sm font-semibold transition-all duration-300 hover:scale-105 active:scale-95"
  style={{
    background: fullscreen ? "#0B766E" : "#0B766E",
    color: "#FFFFFF",
    boxShadow: fullscreen
      ? "0 0 18px rgba(11,118,110,0.45)"
      : "0 10px 25px rgba(0,0,0,0.35)",
  }}
>
  <MousePointerClick size={16} />
  <span>{fullscreen ? "Exit Fullscreen" : "Fullscreen"}</span>
</button>
        <div className="flex-1" />
        <span className="text-xs font-mono" style={{ color:'#4a4a48' }}>
          step {step + 1} / {steps.length}
        </span>
      </div>

      {/* ── Test case tabs ── */}
      <div className="flex items-center gap-2 flex-wrap px-4 py-2 flex-shrink-0"
           style={{ background:'#1a1a18', borderBottom:'1px solid #252523' }}>
        {tests.map((t, i) => (
          <button
            key={i}
            onClick={() => setTc(i)}
            className="px-3 py-1 rounded text-xs font-mono font-semibold transition-all"
            style={{
              background: tc === i ? '#348681' : '#252523',
              color:      tc === i ? 'white'   : '#666',
            }}
          >
            {t.label}
          </button>
        ))}
        <div className="flex-1" />
        {cur.expected && (
          <span className="text-xs font-mono" style={{ color:'#555' }}>
            Expected: <strong style={{ color:'#348681' }}>{cur.expected}</strong>
          </span>
        )}
      </div>

      {/* ── Input caption ── */}
      {cur.caption && (
        <div className="px-4 py-1.5 text-xs font-mono flex-shrink-0"
             style={{ background:'#1e1e1c', borderBottom:'1px solid #252523', color:'#666' }}>
          Input: {cur.caption}
        </div>
      )}

      {/* ── Visualization ── */}
      <div
        className={
          fullscreen
            ? 'flex-1 min-h-0 overflow-auto flex items-center justify-center'
            : 'min-h-[240px]'
        }
      >
        {Viz && steps.length > 0
          ? <Viz step={step} test={cur} />
          : <div className="flex items-center justify-center h-48 text-sm" style={{ color:'#555' }}>
              Animation coming soon for this problem!
            </div>
        }
      </div>

      {/* ── Controls ── */}
      <div
        className={`flex items-center gap-2 flex-wrap px-4 py-2.5 flex-shrink-0 ${fullscreen ? 'sticky bottom-0 z-10' : ''}`}
        style={{ borderTop:'1px solid #222220', background:'#161614' }}
      >

        <CtrlBtn disabled={step === 0}              onClick={() => go(step - 1)}>‹ Prev</CtrlBtn>
        <CtrlBtn primary onClick={() => setPlay(p => !p)}>
          {play ? '⏸ Pause' : '▶ Play'}
        </CtrlBtn>
        <CtrlBtn disabled={step === steps.length - 1} onClick={() => go(step + 1)}>Next ›</CtrlBtn>
        <CtrlBtn onClick={() => { setStep(0); setPlay(false); }}>↺</CtrlBtn>

        {/* Progress bar (click to seek) */}
        <div className="flex-1 flex items-center gap-2 min-w-20">
          <div
            className="flex-1 h-1 rounded-full cursor-pointer"
            style={{ background:'#2a2a28' }}
            onClick={e => {
              const r = e.currentTarget.getBoundingClientRect();
              go(Math.round((e.clientX - r.left) / r.width * (steps.length - 1)));
            }}
          >
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{ width:`${pct}%`, background:'#348681' }}
            />
          </div>
        </div>

        {/* Speed */}
        {[0.5, 1, 2].map(sp => (
          <button
            key={sp}
            onClick={() => setSpeed(sp)}
            className="text-xs font-mono px-2 py-1 rounded transition-all"
            style={{
              background: speed === sp ? '#348681' : '#222220',
              color:      speed === sp ? 'white'   : '#555',
            }}
          >
            {sp}x
          </button>
        ))}
      </div>
    </div>
  );
}