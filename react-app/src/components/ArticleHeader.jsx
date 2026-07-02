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
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true" aria-label="수정" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.0001 4.99989L19.0001 8.99989M21.1741 6.81189C21.7028 6.28332 21.9998 5.56636 21.9999 4.81875C22 4.07113 21.7031 3.3541 21.1746 2.82539C20.646 2.29668 19.929 1.99961 19.1814 1.99951C18.4338 1.99942 17.7168 2.29632 17.1881 2.82489L3.84206 16.1739C3.60988 16.4054 3.43817 16.6904 3.34206 17.0039L2.02106 21.3559C1.99521 21.4424 1.99326 21.5342 2.01541 21.6217C2.03756 21.7092 2.08298 21.7891 2.14685 21.8529C2.21073 21.9167 2.29068 21.962 2.37821 21.984C2.46575 22.006 2.55762 22.0039 2.64406 21.9779L6.99706 20.6579C7.31023 20.5626 7.59523 20.392 7.82706 20.1609L21.1741 6.81189Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <i className="ti ti-bookmark" aria-hidden="true" aria-label="북마크"></i>
          <i className="ti ti-letter-case" aria-hidden="true" aria-label="글자 크기"></i>
          <i className="ti ti-share" aria-hidden="true" aria-label="공유"></i>
          <i className="ti ti-printer" aria-hidden="true" aria-label="인쇄"></i>
        </div>
      </div>
    </div>
  );
}
