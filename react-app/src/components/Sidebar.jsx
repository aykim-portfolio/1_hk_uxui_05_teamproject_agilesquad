// Epic AI 사이드바: 무료/유료 토글, 탭(AI 검증 대화 / 이해관계자 시각), 페이월.
import { useRef, useState } from 'react';
import { levels } from '../data/levels';

// 이 기사에서 확인 가능한 프리미엄 인사이트 수(읽기 난이도와 무관하게 항상 동일한 고정값).
// 원문(levels[0]) 기준 hk-stat 검증 수치 개수 + 이해관계자 시각 카드 수(3개)로 계산.
// 현재 읽기 레벨의 본문을 기준으로 세면 쉽게읽기 모드일 때 수치가 급감해 버려,
// "쉬운 읽기" 자체를 위축시키는 신호가 되므로 항상 원문 기준으로 고정한다.
const INSIGHT_COUNT = (levels[0].body.match(/class="hk-stat"/g) || []).length + 3;

export default function Sidebar({ level, onSubOpen, isPremium }) {
  const isPro = isPremium;
  const [tab, setTab] = useState('ai'); // 'ai' | 'stake'
  const [input, setInput] = useState('');
  const [flash, setFlash] = useState(false);
  const [askCount, setAskCount] = useState(0);
  const flashTimerRef = useRef(null);

  const lockedStyle = isPro
    ? { opacity: 1, pointerEvents: 'auto' }
    : { opacity: 0.3, pointerEvents: 'none' };

  function handleAsk() {
    if (!isPro) return;
    const v = input.trim();
    if (v) {
      alert('질문: ' + v);
      setAskCount((n) => n + 1);
    }
  }

  // 키보드로 입력을 모두 지운 순간(비어있지 않다가 → 비게 됨)에만 flash 효과.
  function handleInputChange(e) {
    const next = e.target.value;
    if (input !== '' && next === '') {
      setFlash(false);
      requestAnimationFrame(() => setFlash(true));
      clearTimeout(flashTimerRef.current);
      flashTimerRef.current = setTimeout(() => setFlash(false), 350);
    }
    setInput(next);
  }

  return (
    <aside className="art-sidebar aside">
      <div className="art-sidebar-sticky">
        <p className="panel-title">AI 궁금증 해결소</p>
        <p className="panel-sub">
          {level === 2 ? '궁금한 점을 물어보세요!' : '기사 밖으로 나갈 필요 없는 원스톱 자본시장 분석'}
        </p>

        <div className="tab-bar">
          <button className={'tab-btn' + (tab === 'ai' ? ' active' : '')} onClick={() => setTab('ai')}>AI 대화</button>
          <button className={'tab-btn' + (tab === 'stake' ? ' active' : '')} onClick={() => setTab('stake')}>다른 생각</button>
        </div>

        {/* AI 검증 대화 */}
        <div className={'ai-view' + (tab === 'ai' ? ' active' : '')}>
          <div className="paywall-wrap">
            <div style={lockedStyle}>
              {level !== 2 && (
                <div className="ai-box">
                  <i className="ti ti-search" aria-hidden="true" style={{ fontSize: 14, marginRight: 6, color: 'var(--text-muted)' }}></i>
                  <strong>Epic AI 경제 분석 대기 중</strong><br />
                  기사 본문에서 밑줄 있는 수치를 클릭하여 실시간 검증을 실행해 보세요.<br /><br />
                  - <strong>실시간 데이터 교차 검증:</strong> 행안부 지방공기업 결산 원자료와 지자체 고시를 즉시 대조합니다.<br />
                  - <strong>맞춤 분석 피드백:</strong> 선택된 요금·적자 수치의 기준 연도와 산정 단위를 명확히 밝혀드립니다.<br />
                  - <strong>전문가 Insight:</strong> 우리 지역 가구별 요금 인상 부담을 시뮬레이션해 드립니다.
                </div>
              )}
              {level === 2 && (
                <div className="ai-summary-card">
                  <p className="ai-summary-head"><i className="ti ti-sparkles" aria-hidden="true"></i> AI가 요약했어요</p>
                  <p className="ai-summary-body">수도요금이 올라요. 낡은 수도관을 고치고 깨끗한 물을 보내려면 돈이 필요해서, 여러 동네에서 요금을 조금씩 올리기로 했어요.</p>
                </div>
              )}
              <div className="chips">
                {level === 2 ? (
                  <>
                    <button className="chip" onClick={() => isPro && setInput('2조3138억원은 어디서 나온 숫자예요?')}>2조3138억원은 어디서 나온 숫자예요?</button>
                    <button className="chip" onClick={() => isPro && setInput('우리 집 수도요금은 얼마나 오르나요?')}>우리 집 수도요금은 얼마나 오르나요?</button>
                    <button className="chip" onClick={() => isPro && setInput('요금을 제일 조금 걷는 동네는 어디예요?')}>요금을 제일 조금 걷는 동네는 어디예요?</button>
                  </>
                ) : (
                  <>
                    <button className="chip" onClick={() => isPro && setInput('상하수도 순손실 2조3138억원의 정확한 출처는?')}>상하수도 순손실 2조3138억원의 출처는?</button>
                    <button className="chip" onClick={() => isPro && setInput('우리 지역 3인 가구 기준 요금 인상액은 얼마인가요?')}>우리 지역 3인 가구 요금 인상액은?</button>
                    <button className="chip" onClick={() => isPro && setInput('요금 현실화율이 낮은 지자체 순위 요약은?')}>요금 현실화율이 낮은 지자체 순위는?</button>
                  </>
                )}
              </div>
              <div className="input-row">
                <input
                  className={'ai-input' + (flash ? ' flash' : '')}
                  type="text"
                  value={input}
                  onChange={handleInputChange}
                />
                <button className="ask-btn" onClick={handleAsk}>질문</button>
              </div>
              {level !== 2 && (
                <div className="sim-card">
                  <p className="sim-label"><i className="ti ti-chart-dots" aria-hidden="true"></i> 구독 활용 현황</p>
                  <div className="sim-grid">
                    <div className="sim-cell"><div className="sim-key">AI 검증 대화 사용</div><div className="sim-val">{askCount}회</div></div>
                    <div className="sim-cell"><div className="sim-key">이 기사 프리미엄 인사이트</div><div className="sim-val">{INSIGHT_COUNT}개</div></div>
                  </div>
                </div>
              )}
            </div>
            {!isPro && (
              <div className="paywall-overlay">
                <div className="lock-gate">
                  <div className="lock-icon"><i className="ti ti-lock" aria-hidden="true"></i></div>
                  <p className="lock-title">유료 구독 전용 기능입니다</p>
                  <p className="lock-desc">AI 대화 및 구독 활용 현황은<br />한경 프리미엄 구독자에게 제공됩니다.</p>
                  <button className="lock-cta" onClick={onSubOpen}><i className="ti ti-sparkles" aria-hidden="true" style={{ marginRight: 4, fontSize: 12 }}></i>유료 구독 신청 후 잠금해제 →</button>
                  <p className="lock-cta-note">7일 무료 체험 후 결제 · 언제든 해지 가능</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 이해관계자 시각 */}
        <div className={'ai-view' + (tab === 'stake' ? ' active' : '')}>
          <div className="paywall-wrap">
            <div style={lockedStyle}>
              {level === 2 ? (
                <>
                  <div className="stake-card">
                    <p className="stake-label">정부 담당자 이야기</p>
                    <p className="stake-body">"상하수도 적자가 2조 원이 넘었어요. 그래서 요금을 올릴 수밖에 없어요. 낡은 관을 안 고치면 나중에 더 큰 사고가 날 수도 있거든요."</p>
                  </div>
                  <div className="stake-card">
                    <p className="stake-label">창원·보령시 수도국 이야기</p>
                    <p className="stake-body">"여러 해 동안 요금을 안 올렸더니 해마다 100억 원 넘게 적자가 쌓였어요. 그래서 한꺼번에 말고 조금씩 나눠서 올리려고 해요."</p>
                  </div>
                  <div className="stake-card">
                    <p className="stake-label">시민 단체 이야기</p>
                    <p className="stake-body">"요금이 갑자기 많이 오르면 형편이 어려운 분들이 더 힘들어져요. 요금을 올리기 전에 새는 물부터 먼저 줄여야 해요."</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="stake-card">
                    <p className="stake-label">행정안전부 지방재정 담당 입장</p>
                    <p className="stake-body">"상하수도 순손실이 2조원을 넘어선 만큼 요금 현실화는 불가피하다. 노후 관로 보수와 정수시설 투자 재원을 확보하지 못하면 안전 사고로 이어질 수 있다는 점을 지자체와 공유하고 있다."</p>
                  </div>
                  <div className="stake-card">
                    <p className="stake-label">지자체(창원·보령 등) 상수도사업본부 설명</p>
                    <p className="stake-body">"수년간 요금을 동결해 온 탓에 연평균 100억원대 적자가 누적됐다. 단계적 인상으로 주민 부담을 최소화하되 원가 회수율을 정상화하는 것이 목표다."</p>
                  </div>
                  <div className="stake-card">
                    <p className="stake-label">시민·소비자 단체 논평</p>
                    <p className="stake-body">"동시다발적 인상은 취약계층 생계비를 직접 압박한다. 요금 인상에 앞서 공기업 방만 경영 점검과 누수율 개선이 선행돼야 한다."</p>
                  </div>
                </>
              )}
            </div>
            {!isPro && (
              <div className="paywall-overlay">
                <div className="lock-gate">
                  <div className="lock-icon"><i className="ti ti-users" aria-hidden="true"></i></div>
                  <p className="lock-title">다른 생각 요약 (유료 전용)</p>
                  <p className="lock-desc">기사 원문 내의 다양한 이익집단의<br />상충되는 시선을 요약합니다.</p>
                  <button className="lock-cta" onClick={onSubOpen}><i className="ti ti-sparkles" aria-hidden="true" style={{ marginRight: 4, fontSize: 12 }}></i>유료 구독 신청 후 잠금해제 →</button>
                  <p className="lock-cta-note">7일 무료 체험 후 결제 · 언제든 해지 가능</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}
