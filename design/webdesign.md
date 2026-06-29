# Agile Squad 웹 디자인 시스템 — WebDesign.md

> 웹·앱(한경 서비스 리디자인) UI 전용 디자인 시스템
> 작성자 : 김민성 DesignOPS

## 개요

컬러 토큰(§1), 타이포그래피 스케일(§2), 스페이싱(§3), Border Radius(§4), Elevation(§5)은
**[design.md](design.md) §1~§6과 동일**하다. 이 문서는 웹·앱 환경에서 달라지는 항목만 기술한다.

---

## 목차

1. [웹 환경 차이점](#1-웹-환경-차이점)
2. [레이아웃 그리드](#2-레이아웃-그리드)
3. [타이포그래피 — 웹 사용 기준](#3-타이포그래피--웹-사용-기준)
4. [컴포넌트](#4-컴포넌트)
5. [사용 가이드](#5-사용-가이드)

---

## 1. 웹 환경 차이점

| 항목 | 장표 (design.md) | 웹·앱 (webdesign.md) |
|---|---|---|
| 캔버스 | 1280×720px 고정 | 반응형 360~1440px |
| 주요 타이포 | Display/Heading 위주 | Body/Caption 위주 |
| 컴포넌트 | 슬라이드 전용 (header-bar, tooltip 등) | 네비게이션, 버튼, 인풋, 카드, 모달 등 |
| 인터랙션 | 없음 (정적 슬라이드) | hover, focus, active, disabled 상태 |
| 색상 예외 | 다크 배경 indigo 직접 사용 허용 | Semantic Token 전용 — 예외 없음 |

---

## 2. 레이아웃 그리드

### 브레이크포인트

| 이름 | 범위 | 컬럼 | Gutter | 마진 |
|---|---|---|---|---|
| Mobile | 360~767px | 4 | 16px | 16px |
| Tablet | 768~1023px | 8 | 24px | 24px |
| Desktop | 1024~1279px | 12 | 24px | 32px |
| Wide | 1280px+ | 12 | 32px | 64px |

### 컨텐츠 최대 너비

| 용도 | 최대 너비 |
|---|---|
| 본문 컨텐츠 | 720px |
| 페이지 레이아웃 | 1200px |
| 풀 와이드 섹션 | 100% |

---

## 3. 타이포그래피 — 웹 사용 기준

스케일 정의는 [design.md §2](design.md#2-타이포그래피)와 동일. 웹에서의 사용 매핑만 추가.

| 스타일명 | 웹 사용처 |
|---|---|
| Heading/XL (28px) | 페이지 H1 |
| Heading/L (24px) | 섹션 제목 H2 |
| Heading/M (20px) | 카드 제목, H3 |
| Heading/XS (16px) | 소형 카드 제목, 사이드바 헤더 |
| Body/L-Regular (16px) | 본문 메인 텍스트 |
| Body/M-Regular (14px) | 카드 설명, 목록 |
| Body/S-Regular (13px) | 보조 설명, 메타 |
| Caption/L-Regular (12px) | 태그, 뱃지 본문 |
| Caption/M-Bold (11px) | 상태 칩, 레이블 |

> Display 계열(32~48px)은 웹 히어로 섹션에서만 제한적으로 사용.

---

## 4. 컴포넌트

> 장표 전용 컴포넌트(header-bar, tooltip, viewpoint card, persona-card)는 웹에서 사용하지 않는다.
> 아래는 웹·앱 전용 컴포넌트 스펙이다.

### 4.1 버튼

| 종류 | 배경 | 텍스트 | 크기 | Radius |
|---|---|---|---|---|
| Primary | brand/primary | text/inverse | h:40px, px:spacing/16 | radius/md |
| Secondary | background/secondary | brand/secondary | h:40px, px:spacing/16 | radius/md |
| Ghost | transparent | text/primary | h:40px, px:spacing/16 | radius/md |
| Danger | status/error | text/inverse | h:40px, px:spacing/16 | radius/md |

- Hover: 각각 brand/primary-hover, brand/secondary-hover 적용
- Disabled: 모든 상태 `text/disabled`, `background/muted`
- 폰트: `Body/M-Bold`

### 4.2 인풋 필드

- 높이: 40px (MD), 36px (SM)
- 배경: `background/surface`
- 테두리: `border/default` → 포커스 시 `border/brand` 2px
- 플레이스홀더: `text/disabled`
- 텍스트: `Body/M-Regular` + `text/primary`
- Radius: `radius/md`
- Elevation: `Elevation/1 · Raised`
- 에러 상태: `border/error` + `status/error` 에러 메시지

### 4.3 카드 (웹)

- 배경: `background/surface`
- Elevation: `Elevation/2 · Card`
- Radius: `radius/lg`
- 제목: `Heading/XS` + `text/primary`
- 본문: `Body/M-Regular` + `text/secondary`
- 구분선: `border/default`
- Padding: `spacing/24`

### 4.4 네비게이션 바

- 배경: `background/surface`
- 높이: 56px (Mobile), 64px (Desktop)
- 하단 border: `border/default` 1px
- 로고/브랜드: `brand/primary`
- 메뉴 텍스트: `Body/M-Medium` + `text/primary`
- 활성 메뉴: `text/brand` + 하단 2px `brand/primary`
- Elevation: `Elevation/2 · Card`

### 4.5 모달

- 배경: `background/surface`
- Overlay: rgba(0,0,0,0.4)
- Radius: `radius/2xl`
- Elevation: `Elevation/4 · Modal`
- 헤더: `Heading/M` + `text/primary`
- Padding: `spacing/32`
- 최대 너비: 560px (MD), 480px (SM)

### 4.6 상태 칩 (웹)

장표의 status chip과 토큰은 동일, 크기만 웹에 맞게 조정.

| 상태 | 배경 | 텍스트 | 크기 |
|---|---|---|---|
| success | status/success-bg | status/success | h:24px |
| warning | status/warning-bg | status/warning | h:24px |
| error | status/error-bg | status/error | h:24px |
| info | status/info-bg | status/info | h:24px |

- 폰트: `Caption/M-Bold`
- Radius: `radius/full`
- Padding: `spacing/4` (상하) · `spacing/8` (좌우)

### 4.7 태그 / 뱃지

- 배경: `background/muted` (기본) / `background/brand` (브랜드)
- 텍스트: `text/secondary` / `text/brand`
- 폰트: `Caption/L-Medium`
- Radius: `radius/full`
- Padding: `spacing/4` (상하) · `spacing/10` (좌우)

---

## 5. 사용 가이드

### 컬러 원칙 (웹)

- 장표와 달리 **예외 없이** Semantic Token만 사용 — indigo primitive 직접 사용 금지
- 다크 모드는 현재 스펙 외 — 추후 변수 모드 추가 시 확장

### 타이포그래피 원칙 (웹)

- 본문 최소 크기: `Body/S-Regular` (13px) — 이하 사용 금지
- 버튼 텍스트: 반드시 `Body/M-Bold` 또는 `Body/S-Bold`
- 링크: `text/link` + underline on hover

### 인터랙션 원칙

- 모든 인터랙티브 요소: hover, focus, active, disabled 4개 상태 필수 정의
- Focus: `border/brand` 2px outline (접근성)
- 트랜지션: 150ms ease-out (색상), 200ms ease-out (크기·위치)

---

*공통 토큰 출처: Figma Design System — aPVAfH6RnkG0eugmNNN87s*
