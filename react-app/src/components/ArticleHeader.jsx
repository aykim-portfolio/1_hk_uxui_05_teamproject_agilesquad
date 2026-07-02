// 기사 제목/바이라인 — article 본문과 aside(Epic AI) 컬럼 상단을 모두 가로지르는 헤더.
import { levels } from '../data/levels';

export default function ArticleHeader({ level }) {
  return (
    <div className="art-header">
      <h1 className="art-title" key={level}>{levels[level].title}</h1>

      <div className="art-byline">
        <div className="art-byline-left">
          <span className="art-avatar">한</span>
          <span className="art-team">이소이·강태우·김해연 기자</span>
          <span className="art-ai-label">
            <i className="ti ti-shield-check" aria-hidden="true" style={{ fontSize: 11 }}></i> AI 신뢰 라벨링 적용
          </span>
          <span className="art-dates">입력: 2026.06.30 18:17  수정: 2026.07.01 00:37</span>
        </div>
        <div className="art-byline-icons">
          <i className="ti ti-bookmark" aria-hidden="true" aria-label="북마크"></i>
          <i className="ti ti-letter-case" aria-hidden="true" aria-label="글자 크기"></i>
          <i className="ti ti-share" aria-hidden="true" aria-label="공유"></i>
          <i className="ti ti-printer" aria-hidden="true" aria-label="인쇄"></i>
        </div>
      </div>
    </div>
  );
}
