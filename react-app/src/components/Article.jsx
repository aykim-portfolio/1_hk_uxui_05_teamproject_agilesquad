// 기사 본문 영역. 제목/본문은 읽기 레벨(level)에 따라 바뀌며,
// 본문의 수치 하이라이트 팝오버는 렌더 후 initHkStatHighlight 로 부착합니다.
import { useEffect, useRef } from 'react';
import { levels } from '../data/levels';
import { initHkStatHighlight, attachHkStatDocHandler } from '../lib/hkStat';
import { useFadeLevel } from '../lib/useFadeLevel';

function FigureImg({ level }) {
  return level === 2 ? (
    <img
      src="/water-story-illustration.png"
      alt="수도요금 이야기 4컷 일러스트"
      style={{ width: '100%', display: 'block' }}
      loading="lazy"
    />
  ) : (
    <img
      src="/water.png"
      alt="줄줄이 오르는 지자체 상·하수도 요금 표"
      style={{ width: '100%', display: 'block' }}
      loading="lazy"
    />
  );
}

export default function Article({ level }) {
  const bodyRef = useRef(null);
  const { currentLevel, prevLevel } = useFadeLevel(level);

  // 문서 레벨 클릭 핸들러는 최초 1회 등록.
  useEffect(() => {
    attachHkStatDocHandler();
  }, []);

  // 레벨이 바뀌어 본문 HTML 이 갈릴 때마다 팝오버 재부착.
  useEffect(() => {
    if (bodyRef.current) initHkStatHighlight(bodyRef.current);
  }, [currentLevel]);

  const heroCaption =
    currentLevel === 2
      ? '여러 동네에서 수도요금이 오르고 있어요 / 한국경제 자료사진'
      : '전국 지자체가 하반기부터 상하수도 요금을 줄줄이 인상한다. / 한국경제 자료사진';

  return (
    <main className="art-main content">
      <div className="hk-crossfade">
        {prevLevel !== null && (
          <div
            key={'old-' + prevLevel}
            aria-hidden="true"
            className={'art-body hk-stat-scope hk-crossfade-old' + (prevLevel === 2 ? ' art-body--easy' : '')}
            dangerouslySetInnerHTML={{ __html: levels[prevLevel].body }}
          />
        )}
        <div
          key={'new-' + currentLevel}
          ref={bodyRef}
          className={'art-body hk-stat-scope hk-crossfade-new' + (currentLevel === 2 ? ' art-body--easy' : '')}
          dangerouslySetInnerHTML={{ __html: levels[currentLevel].body }}
        />
      </div>

      <div className="hk-crossfade">
        {prevLevel !== null && (
          <figure key={'oldfig-' + prevLevel} aria-hidden="true" className="art-figure hk-crossfade-old">
            <FigureImg level={prevLevel} />
          </figure>
        )}
        <figure key={'newfig-' + currentLevel} className="art-figure hk-crossfade-new">
          <FigureImg level={currentLevel} />
        </figure>
      </div>

      <p className="art-hero-cap">{heroCaption}</p>

      {/* 비밀 수첩 — 기사 이해도 확인 퀴즈 (쉽게읽기 모드 전용) */}
      {currentLevel === 2 && (
        <div className="glossary">
          <div className="glossary-row">
            <span className="glossary-hole"></span>
            <div className="glossary-title">
              기사를 잘 읽었나요?
            </div>
          </div>
          <div className="glossary-list">
            <div className="glossary-item">
              <div className="glossary-q-row">
                <span className="glossary-hole"></span>
                <div className="glossary-q"><span className="glossary-qmark">Q.</span> 수도요금이 오르는 이유는?</div>
              </div>
              <div className="glossary-a"><span className="glossary-amark">A.</span> 낡은 수도관을 고치기 위해서예요</div>
            </div>
            <div className="glossary-item">
              <div className="glossary-q-row">
                <span className="glossary-hole"></span>
                <div className="glossary-q"><span className="glossary-qmark">Q.</span> 요금이 오르는 지역은 어디인가요?</div>
              </div>
              <div className="glossary-a"><span className="glossary-amark">A.</span> 수원, 창원, 용인, 여주 같은 곳이에요</div>
            </div>
            <div className="glossary-item">
              <div className="glossary-q-row">
                <span className="glossary-hole"></span>
                <div className="glossary-q"><span className="glossary-qmark">Q.</span> 2024년에 전국 수도 사업이 잃은 돈은 얼마인가요?</div>
              </div>
              <div className="glossary-a"><span className="glossary-amark">A.</span> 2조3138억원이에요</div>
            </div>
          </div>
        </div>
      )}

      <div className="art-footer">
        <span className="art-copyright">ⓒ 한경닷컴, 무단전재 및 재배포 금지</span>
      </div>

      <div className="art-author-card">
        <div className="art-author-head">
          <div className="art-author-avatar"></div>
          <div className="art-author-name">이소이·강태우·김해연 기자</div>
        </div>
        <div className="art-author-desc">안녕하세요. 한국경제 사회부입니다.</div>
      </div>
    </main>
  );
}
