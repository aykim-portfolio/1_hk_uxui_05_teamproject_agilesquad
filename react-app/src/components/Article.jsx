// 기사 본문 영역. 제목/본문은 읽기 레벨(level)에 따라 바뀌며,
// 본문의 수치 하이라이트 팝오버는 렌더 후 initHkStatHighlight 로 부착합니다.
import { useEffect, useRef } from 'react';
import { levels } from '../data/levels';
import { initHkStatHighlight, attachHkStatDocHandler } from '../lib/hkStat';

export default function Article({ level, onSubOpen }) {
  const bodyRef = useRef(null);

  // 문서 레벨 클릭 핸들러는 최초 1회 등록.
  useEffect(() => {
    attachHkStatDocHandler();
  }, []);

  // 레벨이 바뀌어 본문 HTML 이 갈릴 때마다 팝오버 재부착.
  useEffect(() => {
    if (bodyRef.current) initHkStatHighlight(bodyRef.current);
  }, [level]);

  return (
    <main className="art-main content">
      <p className="art-hero-cap">전국 지자체가 하반기부터 상하수도 요금을 줄줄이 인상한다. / 한국경제 자료사진</p>

      <div
        className="art-body hk-stat-scope"
        ref={bodyRef}
        dangerouslySetInnerHTML={{ __html: levels[level].body }}
      />

      <figure className="art-figure">
        <img
          src="/water-rate-table.png"
          alt="줄줄이 오르는 지자체 상·하수도 요금 표"
          style={{ width: '100%', display: 'block' }}
          loading="lazy"
        />
      </figure>

      {/* 쉬운 읽기 — 용어 설명 */}
      <div className="glossary">
        <div className="glossary-title"><i className="ti ti-sparkles" aria-hidden="true"></i> 어떤 말이 어려웠나요?</div>
        <div className="glossary-list">
          <div className="glossary-item"><span className="glossary-term">요금 현실화율</span>: 물을 공급하는 원가 대비 실제로 받는 요금의 비율. 100%보다 낮으면 팔수록 손해라는 뜻</div>
          <div className="glossary-item"><span className="glossary-term">순손실</span>: 벌어들인 돈보다 쓴 돈이 많아 최종적으로 남은 적자</div>
          <div className="glossary-item"><span className="glossary-term">고지분</span>: 요금 고지서가 나가는 청구 기준 시점. '8월 고지분'은 8월에 청구되는 사용분</div>
        </div>
      </div>

      <div className="art-footer">
        <span className="art-copyright">ⓒ 한경닷컴, 무단전재 및 재배포 금지</span>
        <div className="art-footer-links">
          <a className="art-footer-link" onClick={onSubOpen}>한국경제 구독신청</a>
          <span className="art-footer-sep">|</span>
          <a className="art-footer-link strong" onClick={onSubOpen}>한경 프리미엄9 구독신청</a>
        </div>
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
