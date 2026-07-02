// 세로 읽기 레벨 슬라이더 (원문 / 쉬운말 / 쉽게읽기).
// 드래그 / 클릭 → Y좌표 비율로 레벨 계산 (원본 슬라이더 로직 이식).
import { useEffect, useRef, useState } from 'react';
import { percentageMap } from '../data/levels';

const GHOST_DURATION = 1000; // ms — .rlv-knob-ghost 페이드아웃 트랜지션과 동일하게 유지

export default function ReadingLevelSlider({ level, onChange }) {
  const trackRef = useRef(null);
  const draggingRef = useRef(false);
  const prevLevelRef = useRef(level);
  const ghostIdRef = useRef(0);
  const [ghosts, setGhosts] = useState([]);

  // 레벨이 바뀌면 이전 knob 위치에 잔상(ghost)을 남기고 페이드아웃 후 제거.
  useEffect(() => {
    if (prevLevelRef.current !== level) {
      const id = ghostIdRef.current++;
      setGhosts((prev) => [...prev, { id, top: percentageMap[prevLevelRef.current] }]);
      const timer = setTimeout(() => {
        setGhosts((prev) => prev.filter((g) => g.id !== id));
      }, GHOST_DURATION);
      prevLevelRef.current = level;
      return () => clearTimeout(timer);
    }
    prevLevelRef.current = level;
  }, [level]);

  function levelFromEvent(e) {
    const rect = trackRef.current.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    return ratio < 0.3 ? 0 : ratio > 0.7 ? 2 : 1;
  }

  function handlePointerDown(e) {
    draggingRef.current = true;
    try { trackRef.current.setPointerCapture(e.pointerId); } catch (_) {}
    onChange(levelFromEvent(e));
  }

  function handlePointerMove(e) {
    if (!draggingRef.current) return;
    const lv = levelFromEvent(e);
    if (lv !== level) onChange(lv);
  }

  function handlePointerUp(e) {
    draggingRef.current = false;
    try { trackRef.current.releasePointerCapture(e.pointerId); } catch (_) {}
  }

  return (
    <div className="article-support">
      <div className="rlv" role="group" aria-label="읽기 난이도 선택">
        <span className="rlv-cap"><i className="ti ti-eye" aria-hidden="true"></i>쉬운 읽기</span>
        <span
          className={'rlv-label' + (level === 0 ? ' active' : '')}
          data-level="0"
          onClick={() => onChange(0)}
        >
          원문
        </span>
        <div
          className="rlv-track"
          ref={trackRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        >
          {ghosts.map((g) => (
            <div key={g.id} className="rlv-knob-ghost" style={{ top: g.top + '%' }}></div>
          ))}
          {percentageMap.map((top, i) => (
            <span
              key={i}
              className={'rlv-dot' + (i === level ? ' active' : '')}
              style={{ top: top + '%' }}
            ></span>
          ))}
          <div
            className={'rlv-knob' + (draggingRef.current ? ' dragging' : '')}
            style={{ top: percentageMap[level] + '%' }}
          >
            <div className="rlv-knob-dot"></div>
          </div>
        </div>
        <span
          className={'rlv-label' + (level === 2 ? ' active' : '')}
          data-level="2"
          onClick={() => onChange(2)}
        >
          쉽게읽기
        </span>
      </div>
    </div>
  );
}
