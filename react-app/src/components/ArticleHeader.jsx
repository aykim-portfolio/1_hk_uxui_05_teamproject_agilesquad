// 기사 제목/바이라인 — article 본문과 aside(Epic AI) 컬럼 상단을 모두 가로지르는 헤더.
import { levels } from '../data/levels';
import { useFadeLevel } from '../lib/useFadeLevel';

export default function ArticleHeader({ level }) {
  const { currentLevel, prevLevel } = useFadeLevel(level);

  return (
    <div className="art-header">
      <div className="hk-crossfade">
        {prevLevel !== null && (
          <h1
            key={'old-' + prevLevel}
            aria-hidden="true"
            className={'art-title hk-crossfade-old' + (prevLevel === 2 ? ' art-title--easy' : '')}
          >
            {levels[prevLevel].title}
          </h1>
        )}
        <h1
          key={'new-' + currentLevel}
          className={'art-title hk-crossfade-new' + (currentLevel === 2 ? ' art-title--easy' : '')}
        >
          {levels[currentLevel].title}
        </h1>
      </div>

      <div className="art-byline">
        <div className="art-byline-left">
          <div className="art-authors">
            <span className="art-author">
              <span className="art-avatar"><i className="ti ti-user" aria-hidden="true"></i></span>
              <span className="art-team">이소이 기자</span>
            </span>
            <span className="art-author">
              <span className="art-avatar">
                <img src="/kang-taewoo.png" alt="강태우 기자" />
              </span>
              <span className="art-team">강태우 기자</span>
            </span>
            <span className="art-author">
              <span className="art-avatar"><i className="ti ti-user" aria-hidden="true"></i></span>
              <span className="art-team">김해연 기자</span>
            </span>
          </div>
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
