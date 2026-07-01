// Epic AI 사이드바: 무료/유료 토글, 탭(AI 검증 대화 / 이해관계자 시각), 페이월.
import { useState } from 'react';

export default function Sidebar({ onSubOpen, isPremium }) {
  const isPro = isPremium;
  const [tab, setTab] = useState('ai'); // 'ai' | 'stake'
  const [input, setInput] = useState('');

  const lockedStyle = isPro
    ? { opacity: 1, pointerEvents: 'auto' }
    : { opacity: 0.3, pointerEvents: 'none' };

  function handleAsk() {
    if (!isPro) return;
    const v = input.trim();
    if (v) alert('질문: ' + v);
  }

  return (
    <aside className="art-sidebar aside">
      <div className="art-sidebar-sticky">
        <p className="panel-title">Epic AI 실시간 심층 탐색</p>
        <p className="panel-sub">기사 밖으로 나갈 필요 없는 원스톱 자본시장 분석</p>

        <div className="tab-bar">
          <button className={'tab-btn' + (tab === 'ai' ? ' active' : '')} onClick={() => setTab('ai')}>AI 검증 대화</button>
          <button className={'tab-btn' + (tab === 'stake' ? ' active' : '')} onClick={() => setTab('stake')}>이해관계자 시각</button>
        </div>

        {/* AI 검증 대화 */}
        <div className={'ai-view' + (tab === 'ai' ? ' active' : '')}>
          <div className="ai-box" style={lockedStyle}>
            <i className="ti ti-search" aria-hidden="true" style={{ fontSize: 14, marginRight: 6, color: 'var(--text-muted)' }}></i>
            <strong>Epic AI 경제 분석 대기 중</strong><br />
            기사 본문에서 밑줄 있는 수치를 클릭하여 실시간 검증을 실행해 보세요.<br /><br />
            - <strong>실시간 데이터 교차 검증:</strong> 행안부 지방공기업 결산 원자료와 지자체 고시를 즉시 대조합니다.<br />
            - <strong>맞춤 분석 피드백:</strong> 선택된 요금·적자 수치의 기준 연도와 산정 단위를 명확히 밝혀드립니다.<br />
            - <strong>전문가 Insight:</strong> 우리 지역 가구별 요금 인상 부담을 시뮬레이션해 드립니다.
          </div>
          <div className="chips" style={lockedStyle}>
            <button className="chip" onClick={() => isPro && setInput('상하수도 순손실 2조3138억원의 정확한 출처는?')}>상하수도 순손실 2조3138억원의 출처는?</button>
            <button className="chip" onClick={() => isPro && setInput('우리 지역 3인 가구 기준 요금 인상액은 얼마인가요?')}>우리 지역 3인 가구 요금 인상액은?</button>
            <button className="chip" onClick={() => isPro && setInput('요금 현실화율이 낮은 지자체 순위 요약은?')}>요금 현실화율이 낮은 지자체 순위는?</button>
          </div>
          <div className="input-row" style={lockedStyle}>
            <input
              className="ai-input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="추가적인 실시간 데이터 검증 질의..."
            />
            <button className="ask-btn" onClick={handleAsk}>질문</button>
          </div>
          <div className="sim-card" style={lockedStyle}>
            <p className="sim-label"><i className="ti ti-chart-dots" aria-hidden="true"></i> 에픽 AI 종합 시뮬레이션 지수</p>
            <div className="sim-grid">
              <div className="sim-cell"><div className="sim-key">전국 상수도 현실화율</div><div className="sim-val danger">74.5%</div></div>
              <div className="sim-cell"><div className="sim-key">하수도 순손실 증가율</div><div className="sim-val danger">+7.6%</div></div>
            </div>
          </div>
          {!isPro && (
            <div>
              <div className="lock-gate">
                <div className="lock-icon"><i className="ti ti-lock" aria-hidden="true"></i></div>
                <p className="lock-title">유료 구독 전용 기능입니다</p>
                <p className="lock-desc">AI 검증 대화 및 종합 시뮬레이션 지수는<br />한경 프리미엄 구독자에게 제공됩니다.</p>
                <button className="lock-cta" onClick={onSubOpen}><i className="ti ti-sparkles" aria-hidden="true" style={{ marginRight: 4, fontSize: 12 }}></i>유료 구독 신청 후 잠금해제 →</button>
                <p className="lock-cta-note">7일 무료 체험 후 결제 · 언제든 해지 가능</p>
              </div>
            </div>
          )}
        </div>

        {/* 이해관계자 시각 */}
        <div className={'ai-view' + (tab === 'stake' ? ' active' : '')}>
          <div className="stake-card">
            <p className="stake-label">행정안전부 지방재정 담당 입장</p>
            <p className="stake-body">"상하수도 순손실이 2조원을 넘어선 만큼 요금 현실화는 불가피하다. 노후 관로 보수와 정수시설 투자 재원을 확보하지 못하면 안전 사고로 이어질 수 있다는 점을 지자체와 공유하고 있다."</p>
          </div>
          <div className="stake-card">
            <p className="stake-label">지자체(창원·보령 등) 상수도사업본부 설명</p>
            <p className="stake-body">"수년간 요금을 동결해 온 탓에 연평균 100억원대 적자가 누적됐다. 단계적 인상으로 주민 부담을 최소화하되 원가 회수율을 정상화하는 것이 목표다."</p>
          </div>
          <div className={'stake-card' + (isPro ? '' : ' blur-card')}>
            <p className="stake-label">시민·소비자 단체 논평 (잠금)</p>
            <p className="stake-body">"동시다발적 인상은 취약계층 생계비를 직접 압박한다. 요금 인상에 앞서 공기업 방만 경영 점검과 누수율 개선이 선행돼야 한다."</p>
          </div>
          {!isPro && (
            <div>
              <div className="lock-gate">
                <div className="lock-icon"><i className="ti ti-users" aria-hidden="true"></i></div>
                <p className="lock-title">이해관계자 시각 요약 (유료 전용)</p>
                <p className="lock-desc">행안부, 지자체 상수도사업본부, 시민단체 등<br />다양한 이익집단의 상충되는 시선을 요약합니다.</p>
                <button className="lock-cta" onClick={onSubOpen}><i className="ti ti-sparkles" aria-hidden="true" style={{ marginRight: 4, fontSize: 12 }}></i>유료 구독 신청 후 잠금해제 →</button>
                <p className="lock-cta-note">7일 무료 체험 후 결제 · 언제든 해지 가능</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
