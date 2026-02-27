import React from "react";
import {
  CSSIcon,
  HTMLIcon,
  JavaScriptIcon,
  JQueryIcon,
  SCSSIcon,
  TailwindCSSIcon,
} from "@/components/Icons/icons";
import type { ProjectDataProps } from "./types";

export type ClefProjectEntry = {
  id: string;
  name: string;
  description: string;
  image: string;
  data: ProjectDataProps;
};

const projectMeta = (
  name: string,
  progressPeriod: string,
  liveDemoUrl: string,
): ProjectDataProps["project"] => ({
  name,
  progressPeriod,
  liveDemoUrl,
  gitRepositoryUrl: null,
});

const standardStack = (): ProjectDataProps["technologyStack"] => ({
  frontEnd: [
    <HTMLIcon />,
    <CSSIcon />,
    <JavaScriptIcon />,
    <JQueryIcon />,
    <SCSSIcon />,
  ],
  backEnd: [],
});

const tailwindStack = (): ProjectDataProps["technologyStack"] => ({
  frontEnd: [
    <HTMLIcon />,
    <CSSIcon />,
    <JavaScriptIcon />,
    <JQueryIcon />,
    <SCSSIcon />,
    <TailwindCSSIcon />,
  ],
  backEnd: [],
});

const threeStack = (): ProjectDataProps["technologyStack"] => ({
  frontEnd: [
    <HTMLIcon />,
    <CSSIcon />,
    <JavaScriptIcon />,
    <JQueryIcon />,
    <SCSSIcon />,
    <span>Three.js</span>,
  ],
  backEnd: [],
});

export const clefProjects: ClefProjectEntry[] = [
  {
    id: "clef_project1",
    name: "성도ENG(다국어 프로젝트)",
    description: "하이테크 EPC 기업 웹사이트",
    image: "sdeng.jpg",
    data: {
      project: projectMeta(
        "성도ENG(다국어 프로젝트)",
        "2026.01.05 ~ 2026.01.23",
        "http://sdeng2026.clefweb.co.kr/EN/",
      ),
      technologyStack: standardStack(),
      keyResponsibilities: [
        {
          front: "다국어 브릿지 설계",
          back: "PHP에서 언어 값을 내려주고, JS에서 JSON 경로/텍스트를 같은 기준으로 맞춤",
        },
        {
          front: "History 탭 렌더링",
          back: "data-src 기반 JSON을 fetch/axios로 불러와 타임라인 DOM을 동적으로 생성",
        },
        {
          front: "프로젝트 슬라이더 구성",
          back: "프로젝트 리스트 AJAX 응답을 Swiper 슬라이드로 재구성",
        },
        {
          front: "문의 폼 검증/전송",
          back: "required + 커스텀 검증을 통과하면 FormData로 전송",
        },
        {
          front: "유효성 검사 모듈 재사용",
          back: "mindmu에서 만든 FormValidator를 적용하고, i18n 메시지까지 다국어로 확장",
        },
        {
          front: "스크롤 인터랙션 구현",
          back: "GSAP/ScrollTrigger/Lenis로 섹션 진입·전환 모션을 자연스럽게 연결",
        },
      ],
      mainFeatures: [
        {
          title: "다국어 사이트 구조",
          icon: "🌐",
          desc: [
            "EN/HU 라우팅과 언어 상태 브릿지 구성",
            "언어별 JSON 데이터 경로와 텍스트를 일관되게 동기화",
          ],
        },
        {
          title: "데이터 기반 탭/슬라이더",
          icon: "🧩",
          desc: [
            "History: JSON 로딩 → DOM 렌더링까지 자동 구성",
            "Projects: 리스트 AJAX 렌더링 + Swiper 연동",
          ],
        },
        {
          title: "문의/폼 플로우",
          icon: "✉️",
          desc: [
            "폼 검증 후 FormData로 전송",
            "i18n 기반 다국어 검증 메시지 적용",
            "스크롤 인터랙션과 함께 UX를 더 매끄럽게 정리",
          ],
        },
      ],
      troubleshootingAndSolutions: () => {
        return (
          <>
            {/* CASE 01 */}
            <section>
              <h2>
                🧩 트러블슈팅 01. 파일 업로드 유효성 메시지 다국어(i18n) 적용
              </h2>
              <ul>
                <li>
                  기존 <strong>파일 업로드 검증 로직(gfn_changeFile)</strong>
                  에서 확장자/용량/파일명/최대 개수 안내가{" "}
                  <strong>alert로 하드코딩</strong>되어 있어, EN/HU 화면에서
                  언어 흐름이 중간중간 끊기는 문제가 있었음.
                </li>
                <li>
                  특히 다중 업로드(M) 모드에서는{" "}
                  <strong>검증 실패 → input 초기화(obj.value="")</strong>가
                  반복되며, 화면에 따라 메시지 노출 방식이 달라 보여 UX가
                  불안정해 보일 수 있었음.
                </li>
                <li>
                  요구사항은 <strong>검증 메시지를 언어팩 기준으로 통일</strong>
                  하고, 가능하면 Toast로, 여의치 않으면 alert로 처리하되{" "}
                  <strong>표현(표시) 레이어를 분리</strong>하는 것이었음.
                </li>
              </ul>
            </section>

            <section>
              <h2>✅ 해결 방법</h2>
              <ul>
                <li>
                  gfn_changeFile에 <strong>notify 콜백을 options로 주입</strong>
                  하는 구조로 변경:
                  <ul>
                    <li>
                      notify가 있으면{" "}
                      <strong>Toast.show(t(key, params))</strong>로 출력
                    </li>
                    <li>notify가 없으면 fallback으로 alert 사용</li>
                  </ul>
                </li>
                <li>
                  하드코딩 문구를 모두 <strong>i18n key</strong>로 치환:
                  <ul>
                    <li>
                      확장자 제한: <strong>fileExt</strong> (params: exts)
                    </li>
                    <li>
                      파일명 특수문자: <strong>fileSpecialChar</strong>
                    </li>
                    <li>
                      파일 용량 제한: <strong>fileTooLarge</strong> (params:
                      limit)
                    </li>
                    <li>
                      최대 업로드 개수: <strong>fileMaxCount</strong> (params:
                      count)
                    </li>
                  </ul>
                </li>
                <li>
                  다중 업로드(M)에서 fileMap이 비어있을 수 있는 케이스를 고려해{" "}
                  <strong>map_size = fileMap?.size ?? 0</strong>로 널 안정성
                  보강
                  <br />
                  <span style={{ opacity: 0.75 }}>
                    ※ 이후 fileMap.set을 사용하므로, 호출부에서는 fileMap을
                    Map으로 보장해야 함.
                  </span>
                </li>
              </ul>
            </section>

            <section>
              <h2>📈 결과</h2>
              <ul>
                <li>
                  파일 업로드 검증 메시지가{" "}
                  <strong>언어팩(EN/HU) 기준으로 일관되게 출력</strong>되며,
                  페이지/브라우저별 표현 차이가 눈에 띄게 줄어듦
                </li>
                <li>
                  “검증(로직)”과 “표시(Toast/alert)”를 분리해{" "}
                  <strong>유지보수와 확장(언어 추가, UI 교체)</strong>이 훨씬
                  쉬워짐
                </li>
                <li>
                  같은 검증을 쓰는 다른 화면도 <strong>notify만 주입</strong>
                  하면 동일 UX로 빠르게 확장 가능
                </li>
              </ul>
            </section>

            <hr />

            {/* CASE 02 */}
            <section>
              <h2>🧩 트러블슈팅 02. 파일 삭제(confirm) 메시지 다국어 처리</h2>
              <ul>
                <li>
                  파일 삭제 함수(gfn_upFileDel)의 confirm 문구가 한국어로
                  고정되어, 화면 언어와 맞지 않는 문제가 있었음.
                </li>
                <li>
                  삭제 후 라벨(“업로드된 파일 N개”)도 한국어 하드코딩이라
                  EN/HU에서 <strong>언어가 섞여 보일 가능성</strong>이 있었음.
                </li>
              </ul>
            </section>

            <section>
              <h2>✅ 해결 방법</h2>
              <ul>
                <li>
                  options.confirmMsg가 있으면 최우선 적용하고, 없으면{" "}
                  <strong>document.documentElement.lang</strong> 기반으로 EN/HU
                  기본 문구를 제공:
                  <ul>
                    <li>HU: “Törli ezt a mellékletet?”</li>
                    <li>EN: “Do you want to delete this attachment?”</li>
                  </ul>
                </li>
                <li>
                  삭제 후 상태 갱신(fileMap 삭제, row 제거, 삭제
                  배열(formData_del) 기록)은 기존 흐름을 유지해{" "}
                  <strong>기능 회귀 없이 안전하게 개선</strong>
                </li>
                <li>
                  (추가 개선 포인트) 라벨 텍스트도 i18n 키로 바꾸기 쉽게 TODO로
                  정리:
                  <br />
                  <span style={{ opacity: 0.75 }}>
                    “업로드된 파일 {"{"}count{"}"}개” → t('uploadedFileCount',{" "}
                    {"{"} count {"}"})
                  </span>
                </li>
              </ul>
            </section>

            <section>
              <h2>📈 결과</h2>
              <ul>
                <li>
                  confirm 메시지가 <strong>페이지 언어와 일치</strong>해 사용자
                  혼란이 줄어듦
                </li>
                <li>
                  옵션 기반(confirmMsg)으로도 제어할 수 있어, 특정 화면에서는{" "}
                  <strong>문구를 상황에 맞게 커스터마이징</strong>할 수 있게 됨
                </li>
              </ul>
            </section>
          </>
        );
      },
    },
  },
  {
    id: "clef_project2",
    name: "능인솔루션(다국어 프로젝트)",
    description: "전자·제어 R&D 기업 웹사이트",
    image: "ni.png",
    data: {
      project: projectMeta(
        "능인솔루션(다국어 프로젝트)",
        "2025.12.03 ~ 2025.12.18",
        "https://nisolution.co.kr/",
      ),
      technologyStack: standardStack(),
      keyResponsibilities: [
        {
          front: "다국어 런타임 컨텍스트 브릿지",
          back: "PHP에서 결정된 언어 컨텍스트(LANG)를 공통 include/JS 레이어까지 일관되게 전달해 i18n 분기 기준을 단일화",
        },
        {
          front: "다국어 include 경로 자동화",
          back: "호출 파일 경로에서 언어 폴더(KR/ENG/JP/SC)를 추출하고, INCLUDE_PATH 상수로 include 경로를 동적 해석하도록 구성",
        },
        {
          front: "모달 접근성(키보드 포커스 트랩)",
          back: "openModal 시 마지막 포커스 요소를 저장하고, Tab/Shift+Tab 순환(trapFocus) + ESC/딤/닫기 버튼으로 닫기 + 닫힘 후 포커스 복귀까지 구현",
        },
        {
          front: "인증서 탭 렌더링",
          back: "JSON fetch로 섹션을 동적으로 생성해 관리 편의성 확보",
        },
        {
          front: "폼 검증/전송",
          back: "FormValidator로 검증하고 FormData로 전송",
        },
        {
          front: "GSAP/Swiper 인터랙션",
          back: "스크롤 모션과 슬라이더를 함께 구성해 화면 흐름을 연결",
        },
      ],

      mainFeatures: [
        {
          title: "인증서/기술 탭",
          icon: "📂",
          desc: ["JSON 기반 콘텐츠 렌더링", "언어별 타이틀/alt 처리"],
        },
        {
          title: "다국어 KR/EN",
          icon: "🌐",
          desc: ["언어 상태 브릿지 유지", "폼 검증 메시지 i18n"],
        },
        {
          title: "Lang Config 기반 include 경로 자동화",
          icon: "🧭",
          desc: [
            "호출 파일 경로에서 언어 폴더 자동 판별(KR/ENG/JP/SC)",
            "INCLUDE_PATH 상수로 include 경로 표준화",
          ],
        },
        {
          title: "문의 폼",
          icon: "✉️",
          desc: ["검증 모듈 재사용", "서버 전송 플로우"],
        },
      ],
      troubleshootingAndSolutions: () => {
        return (
          <>
            <section>
              <h2>
                🧩 다국어 폴더 분기 구조에서 include 경로 하드코딩으로 인한
                유지보수 리스크 개선
              </h2>
              <ul>
                <li>
                  다국어 운영이{" "}
                  <strong>국가 코드(KR/ENG/JP/SC) 폴더 분기</strong> 방식이었고,
                  각 언어 폴더 내부에서 공통으로 사용하는{" "}
                  <strong>include 파일 경로가 절대 경로로 하드코딩</strong>되어
                  있었음.
                </li>
                <li>
                  언어 폴더/구조 변경 또는 신규 언어 추가 시, include 경로를{" "}
                  <strong>파일 단위로 수동 수정</strong>해야 해서
                  <strong>누락/오타로 인한 런타임 오류</strong> 및{" "}
                  <strong>유지보수 비용 증가</strong> 가능성이 높았음.
                </li>
                <li>
                  구조적으로는 <strong>경로 결합 로직이 분산</strong>되어 있어,
                  변경 시 영향 범위를 예측하기 어렵고
                  <strong>환경별(로컬/운영) 경로 차이 대응</strong>도 불리한
                  상태였음.
                </li>
              </ul>
            </section>

            <section>
              <h2>✅ 해결 방법</h2>
              <ul>
                <li>
                  공통 include 경로를 중앙에서 결정하도록{" "}
                  <strong>lang_config.php</strong>를 신규 도입하고, 실행 진입
                  파일 기준으로 <strong>현재 언어 폴더를 자동 탐지</strong>해
                  상수로 관리하도록 구성함.
                </li>
                <li>
                  <strong>debug_backtrace()</strong>로 호출 파일 경로를 확인한
                  뒤, 정규식으로{" "}
                  <strong>언어 코드 디렉터리(KR/ENG/JP/SC)</strong>를 추출하여
                  <strong>LANG</strong>, <strong>INCLUDE_PATH</strong>를 정의함.
                </li>
                <li>
                  이후 include/require는 하드코딩 대신{" "}
                  <strong>INCLUDE_PATH 기반</strong>으로 통일해, 언어 폴더 분기
                  구조에서도 동일한 include 코드를 재사용 가능하게 정리함.
                </li>
              </ul>
            </section>

            <section>
              <h2>📈 결과</h2>
              <ul>
                <li>
                  언어 추가/폴더 구조 변경 시, include 경로 수정이{" "}
                  <strong>중앙 설정 파일 단위로 수렴</strong>되어
                  <strong>변경 범위와 리스크</strong>가 크게 감소함.
                </li>
                <li>
                  경로 하드코딩 제거로{" "}
                  <strong>누락/오타로 인한 장애 가능성</strong>을 낮추고,
                  <strong>유지보수성(Maintainability)</strong>을 개선함.
                </li>
                <li>
                  다국어 분기 구조에서 공통 레이아웃(include) 자산을{" "}
                  <strong>표준화된 방식으로 재사용</strong>할 수 있어 협업 시{" "}
                  <strong>일관된 로딩 규칙</strong>을 제공하게 됨.
                </li>
              </ul>
            </section>
          </>
        );
      },
    },
  },
  {
    id: "clef_project3",
    name: "HAILO",
    description: "브랜딩·마케팅 스튜디오 웹사이트",
    image: "hailo.jpg",
    data: {
      project: projectMeta(
        "HAILO",
        "2025.08.20 ~ 2025.08.26",
        "https://hailolab.com/",
      ),
      technologyStack: threeStack(),
      keyResponsibilities: [
        {
          front: "Three.js 비주얼",
          back: "메인 3D 오브젝트를 구성하고 모션과 자연스럽게 연결",
        },
        {
          front: "듀얼 Swiper 구성",
          back: "좌/우 슬라이더를 동기화하고 상태(네비게이션/활성)를 안정적으로 제어",
        },
        {
          front: "스크롤 인터랙션",
          back: "GSAP/ScrollTrigger로 섹션 전환 흐름을 설계",
        },
        {
          front: "문의 폼 검증",
          back: "파일 첨부까지 포함한 검증과 전송 플로우를 구축",
        },
        {
          front: "결제 결과 템플릿",
          back: "TOSS 성공/실패 페이지를 공통 템플릿으로 정리해 재사용성 확보",
        },
      ],
      mainFeatures: [
        {
          title: "3D 브랜드 비주얼",
          icon: "🌀",
          desc: ["Three.js 기반 3D 연출", "스크롤/타임라인과 결합"],
        },
        {
          title: "듀얼 슬라이더",
          icon: "🧭",
          desc: ["메인 비주얼 Swiper 동기화", "상태/네비게이션 제어"],
        },
        {
          title: "문의/결제 결과",
          icon: "🧾",
          desc: ["문의 폼 + 파일 첨부", "결제 성공/실패 결과 페이지"],
        },
      ],
      troubleshootingAndSolutions: () => {
        return (
          <>
            <section>
              <h2>
                🧩 브랜치 전략 부재로 인한 변경사항 유실 및 충돌 리스크 대응
              </h2>
              <ul>
                <li>
                  레포지토리에 <strong>브랜치 운영 규칙이 없어서</strong>,
                  백엔드/프론트가 <strong>main 단일 브랜치</strong>에서 동시에
                  작업하는 구조였음.
                </li>
                <li>
                  그 과정에서 백엔드 작업 중 사용자 페이지(프론트 영역) 파일이
                  수정되며, 프론트 변경사항이{" "}
                  <strong>후행 커밋에 덮여 이력이 유실</strong>되는 문제가
                  발생함.
                </li>
                <li>
                  기능 난이도 문제가 아니라,{" "}
                  <strong>
                    형상관리(Version Control) 워크플로우가 정리되지 않은 협업
                    리스크
                  </strong>
                  로 판단했음.
                </li>
              </ul>
            </section>

            <section>
              <h2>✅ 해결 방법</h2>
              <ul>
                <li>
                  유실된 변경사항은 <strong>VS Code Timeline</strong>으로 파일별
                  변경 시점을 추적한 뒤, 필요한 구간을{" "}
                  <strong>복원해 재적용</strong>하여 빠르게 정상화함.
                </li>
                <li>
                  재발 방지를 위해 팀에 <strong>브랜치 기반 작업 규칙</strong>을
                  제안:
                  <ul>
                    <li>단순 텍스트/경미 수정은 main에서 처리</li>
                    <li>
                      <strong>신규 기능</strong> 또는{" "}
                      <strong>변경 범위가 큰 작업</strong>은 별도 브랜치에서
                      진행 후 main으로 병합하도록 운영 전환
                    </li>
                  </ul>
                </li>
              </ul>
            </section>

            <section>
              <h2>📈 결과</h2>
              <ul>
                <li>
                  변경사항 유실을 <strong>Timeline 기반으로 빠르게 복구</strong>
                  해 일정 지연을 최소화
                </li>
                <li>
                  브랜치 전략 도입으로 <strong>덮어쓰기/충돌 위험</strong>을
                  프로세스 차원에서 낮춤
                </li>
                <li>
                  이후 신규 기능과 대규모 작업을 분기 기반으로 관리할 기준이
                  생겨,
                  <strong>협업 안정성과 변경 이력 추적성</strong>이 개선됨
                </li>
              </ul>
            </section>
          </>
        );
      },
    },
  },
  {
    id: "clef_project4",
    name: "AXLUN",
    description: "프리미엄 윤활유 브랜드 웹사이트",
    image: "axlun.png",
    data: {
      project: projectMeta(
        "AXLUN",
        "2025.11.10 ~ 2025.11.16",
        "https://axlun.com/",
      ),
      technologyStack: standardStack(),
      keyResponsibilities: [
        {
          front: "기술 탭 JSON 로딩",
          back: "fetch + AbortController로 중복 요청을 깔끔하게 취소",
        },
        {
          front: "제품 리스트 AJAX",
          back: "POST 응답을 DocumentFragment로 구성해 렌더링 비용을 줄임",
        },
        {
          front: "무한 스크롤",
          back: "IntersectionObserver 기반으로 구현하고, 필요 시 scroll 폴백도 함께 구성",
        },
      ],
      mainFeatures: [
        {
          title: "기술 탭 데이터",
          icon: "🧪",
          desc: ["JSON 기반 탭 콘텐츠 렌더링", "캐시로 중복 로딩 최소화"],
        },
        {
          title: "제품 리스트/무한 스크롤",
          icon: "🛢️",
          desc: ["AJAX 리스트 렌더링", "스크롤 하단 로딩"],
        },
        {
          title: "문의 폼 모듈",
          icon: "📨",
          desc: ["공통 검증 모듈", "FormData 전송"],
        },
      ],
    },
  },
  {
    id: "clef_project5",
    name: "블루로빈(다국어 프로젝트)",
    description: "로봇 기술 기업 다국어 웹사이트",
    image: "bluerobin.png",
    data: {
      project: projectMeta(
        "블루로빈(다국어 프로젝트)",
        "2025.07.15 ~ 2025.07.25",
        "https://bluerobin.co.kr/",
      ),
      technologyStack: standardStack(),
      keyResponsibilities: [
        {
          front: "다국어 상태 동기화",
          back: "서버 언어코드 → html lang/hidden 필드 → JS UI까지 흐름을 한 번에 맞춤",
        },
        {
          front: "문의 폼 AJAX",
          back: "폼 데이터 수집 후 비동기 전송, 결과는 모달로 피드백",
        },
        {
          front: "뉴스 리스트/페이징",
          back: "API 응답으로 리스트를 갱신하고 스크롤 트리거와 연결",
        },
        {
          front: "채용 JSON 렌더링",
          back: "axios로 정적 JSON을 로드해 DOM에 바인딩",
        },
        {
          front: "스크롤 인터랙션",
          back: "GSAP/ScrollTrigger로 섹션 모션을 구성",
        },
      ],
      mainFeatures: [
        {
          title: "다국어 기업 사이트",
          icon: "🌍",
          desc: ["KR/EN 템플릿 분리", "언어 상태 브릿지 유지"],
        },
        {
          title: "데이터 기반 콘텐츠",
          icon: "🧩",
          desc: ["뉴스 비동기 목록/페이징", "채용 JSON 렌더링"],
        },
        {
          title: "문의/스크롤 인터랙션",
          icon: "✅",
          desc: ["AJAX 문의 접수 + UI 피드백", "GSAP 모션"],
        },
      ],
    },
  },
  {
    id: "clef_project6",
    name: "희망어스",
    description: "기부 참여 캠페인 웹사이트",
    image: "hopeus.jpg",
    data: {
      project: projectMeta(
        "희망어스",
        "2025.05.13 ~ 2025.05.28",
        "https://hopeus.kr/",
      ),
      technologyStack: standardStack(),
      keyResponsibilities: [
        {
          front: "후원자 지도/검색",
          back: "Kakao Maps 마커와 리스트를 동기화해 탐색 경험을 개선",
        },
        {
          front: "AJAX 리스트",
          back: "커뮤니티 리스트를 비동기로 로드하고 무한 스크롤로 확장",
        },
        {
          front: "탭 UI 동기화",
          back: "URL 쿼리와 탭 상태를 연결해 새로고침/공유에도 흐름 유지",
        },
        {
          front: "스크롤 리빌",
          back: "GSAP/ScrollTrigger로 섹션 리빌 연출",
        },
        {
          front: "공통 템플릿",
          back: "include 구조를 기반으로 배너/모달을 공통화",
        },
      ],
      mainFeatures: [
        {
          title: "후원자 지도/리스트",
          icon: "🗺️",
          desc: ["지역/키워드 필터링", "마커 선택 및 상세 모달"],
        },
        {
          title: "캠페인/소식 탭",
          icon: "📌",
          desc: ["탭 UI + URL 쿼리 동기화", "콘텐츠 즉시 전환"],
        },
        {
          title: "AJAX 커뮤니티",
          icon: "🔄",
          desc: ["리스트 비동기 로딩", "무한 스크롤/로딩 오버레이"],
        },
      ],
      troubleshootingAndSolutions: () => {
        return (
          <>
            <section>
              <h2>
                🧩 동적 렌더링 전환 이후 모달 트리거 이벤트 바인딩 실패 이슈
              </h2>
              <ul>
                <li>
                  모달 오픈 트리거(<strong>.modal__btn</strong>)를 기존에는{" "}
                  <strong>직접 바인딩(direct binding)</strong>으로 연결하고
                  있었음.
                </li>
                <li>
                  버튼이 <strong>비동기 렌더링(동적 DOM 삽입)</strong>으로
                  바뀌면서, 초기 바인딩 시점에는 대상 노드가 없어 클릭이
                  동작하지 않는 문제가 발생함.
                </li>
                <li>
                  모달 로직 자체 문제가 아니라,{" "}
                  <strong>
                    DOM 라이프사이클과 이벤트 등록 타이밍이 어긋난 케이스
                  </strong>
                  였음.
                </li>
              </ul>
            </section>

            <section>
              <h2>✅ 해결 방법</h2>
              <ul>
                <li>
                  동적으로 생성되는 요소에서도 동일하게 동작하도록{" "}
                  <strong>이벤트 위임(event delegation)</strong>으로 변경함.
                </li>
                <li>
                  상위 컨테이너(<strong>document</strong>)에 click 리스너를 1회
                  등록하고, 버블링 과정에서 <strong>셀렉터 매칭</strong>으로
                  타겟이 <strong>.modal__btn</strong>인지 확인한 뒤 모달을
                  오픈하도록 구성.
                </li>
                <li>
                  이렇게 바꾸면 트리거가 런타임에 삽입돼도 이벤트 체인에 의해
                  처리되므로, 렌더링 방식이 달라져도 안정적으로 동작함.
                </li>
              </ul>
            </section>

            <section>
              <h2>📈 결과</h2>
              <ul>
                <li>
                  비동기/동적 렌더링 환경에서도 모달 트리거가{" "}
                  <strong>항상 동일하게 동작</strong>하도록 안정화됨
                </li>
                <li>
                  브라우저의 <strong>이벤트 전파 모델</strong>을 기반으로
                  해결해, 비슷한 유형의 “동적 노드 이벤트 바인딩 실패” 이슈에
                  재사용 가능한 패턴을 확보함
                </li>
              </ul>
            </section>
          </>
        );
      },
    },
  },
  {
    id: "clef_project7",
    name: "밝은눈안과",
    description: "안과 홍보 웹사이트",
    image: "lighteyes.jpg",
    data: {
      project: projectMeta(
        "밝은눈안과",
        "2025.06.16 ~ 2025.06.26",
        "https://bgneye-ai.com/",
      ),
      technologyStack: threeStack(),
      keyResponsibilities: [
        {
          front: "메인 레이아웃 Swiper",
          back: "전체 섹션 Swiper를 구성하고 슬라이드 상태를 세밀하게 제어",
        },
        {
          front: "케이스/AI Swiper",
          back: "중첩 Swiper 구성과 autoplay 충돌을 상황에 맞게 제어",
        },
        {
          front: "그래프/카운트 애니메이션",
          back: "GSAP 타임라인으로 수치/그래프 연출을 자연스럽게 연결",
        },
        {
          front: "터치/스크롤 충돌 제어",
          back: "allowTouchMove/stopPropagation으로 제스처 충돌을 분리",
        },
        {
          front: "데이터 로딩",
          back: "fetch로 섹션 데이터를 불러온 뒤 UI를 즉시 업데이트",
        },
        {
          front: "각막 절삭량 계산",
          back: "SPH/CYL 값을 정규화하고 테이블 매핑으로 좌/우 절삭량을 산출",
        },
        {
          front: "추천 수술법 로직 개선",
          back: "각막두께 + 수술 이력 우선순위를 반영해 좌·우 결과를 통합 추천",
        },
        {
          front: "결과 키 매핑 렌더링",
          back: "data-result-key 기반으로 수술법/절삭량을 좌·우 UI에 동일하게 동기화",
        },
      ],
      mainFeatures: [
        {
          title: "멀티 섹션 Swiper",
          icon: "🧭",
          desc: ["레이아웃/케이스/AI 결과 Swiper 분리", "섹션 전환 UX 최적화"],
        },
        {
          title: "시각화 애니메이션",
          icon: "📊",
          desc: ["케이스 비교 그래프", "카운트/라인 드로잉"],
        },
        {
          title: "상담/지점 정보",
          icon: "🏥",
          desc: ["상담 폼/결과 확장 UI", "지도/지점 정보 연동"],
        },
      ],
      troubleshootingAndSolutions: () => (
        <section>
          <h2>트러블슈팅</h2>
          <ul>
            <li>
              내부 스크롤과 Swiper 제스처가 충돌 → allowTouchMove를 상황별로
              토글
            </li>
            <li>
              슬라이드 전환 시 그래프가 꼬임 → GSAP 상태를 초기화하고 재실행
            </li>
            <li>
              굴절도 값 포맷이 제각각이라 절삭량이 누락 → toFixed(2)로 정규화한
              뒤 테이블 매칭
            </li>
          </ul>
        </section>
      ),
    },
  },
  {
    id: "clef_project8",
    name: "밝은눈안과 오프라인",
    description: "안과 검사 결과 리포트 웹페이지",
    image: "lighteyes.jpg",
    data: {
      project: projectMeta(
        "밝은눈안과 오프라인",
        "2025.12.18 ~ 2025.12.31",
        "about:blank",
      ),
      technologyStack: standardStack(),
      keyResponsibilities: [
        {
          front: "검사 결과 템플릿",
          back: "결과 타입별 페이지 템플릿을 구성해 확장성을 확보",
        },
        {
          front: "ScrollTrigger 애니메이션",
          back: "섹션 진입/배경 전환 모션을 흐름에 맞게 설계",
        },
        {
          front: "결과 데이터 렌더링",
          back: "fetch 유틸로 데이터를 불러온 뒤 화면에 반영",
        },
        {
          front: "Swiper 결과 UI",
          back: "결과 카드/슬라이더 UI를 구성해 가독성을 개선",
        },
        {
          front: "공통 모듈",
          back: "지도/모달/폼 공통 스크립트를 프로젝트 전반에 적용",
        },
      ],
      mainFeatures: [
        {
          title: "검사 결과 리포트",
          icon: "🧾",
          desc: ["다수 결과 타입 페이지", "결과 요약/설명 구성"],
        },
        {
          title: "스크롤 인터랙션",
          icon: "🖱️",
          desc: ["섹션 전환 애니메이션", "배경/콘텐츠 리빌"],
        },
        {
          title: "추천 수술/결과 안내",
          icon: "✅",
          desc: ["결과 기반 추천 안내", "결과 상세 페이지"],
        },
      ],
    },
  },
  {
    id: "clef_project9",
    name: "마인드뮤",
    description: "멘탈 헬스케어 기업 웹사이트",
    image: "mindmu.png",
    data: {
      project: projectMeta(
        "마인드뮤",
        "2025.09.29 ~ 2025.10.27",
        "https://mindmu.co.kr/",
      ),
      technologyStack: tailwindStack(),
      keyResponsibilities: [
        {
          front: "템플릿/리소스 분기",
          back: "SUB 기준으로 CSS/JS를 페이지 단위로 나눠 로딩",
        },
        {
          front: "GSAP 스크롤 모션",
          back: "ScrollTrigger로 섹션/텍스트 애니메이션 흐름 구성",
        },
        {
          front: "서비스 Swiper",
          back: "서비스 슬라이더를 구성하고 반응형에서 autoplay를 상황별로 제어",
        },
        {
          front: "신청 폼 구축",
          back: "센터/상담사 신청 폼과 날짜 선택 UI를 함께 구성",
        },
        {
          front: "백엔드 협업 표준화",
          back: "입력 경로/스키마를 먼저 합의하고, 폼 처리 코드를 선요청해 데이터 핸들링을 효율화",
        },
        {
          front: "프론트 유효성 검사 모듈",
          back: "백엔드 검증 로직을 FormValidator로 이관해, 이후 i18n 검사 메시지 확장 기반까지 마련",
        },
        {
          front: "스타일 시스템",
          back: "SCSS 공통화와 Tailwind 유틸을 병행해 생산성과 일관성을 같이 챙김",
        },
      ],
      mainFeatures: [
        {
          title: "서비스/프로그램 소개",
          icon: "🧠",
          desc: ["서비스 섹션 Swiper 슬라이더", "메인/서브 모션 연출"],
        },
        {
          title: "센터·상담사 신청",
          icon: "📝",
          desc: ["신청/확인 플로우 페이지 구성", "날짜 선택 UI 연동"],
        },
        {
          title: "유효성 검사 모듈",
          icon: "✅",
          desc: [
            "formGroup 기반 공통 검증 로직",
            "의존 필드/체크박스/파일·날짜/멀티 인풋까지 폭넓게 처리",
            "라벨 텍스트 기반 에러 메시지 + Toast 안내로 UX 정리",
          ],
        },
      ],
      troubleshootingAndSolutions: () => {
        return (
          <>
            <section>
              <h2>
                🧩 트러블슈팅 01. 전화번호 입력 포맷 편차(하이픈 유무)로 인한
                데이터 불일치
              </h2>
              <ul>
                <li>
                  사용자가 자유 입력을 하면{" "}
                  <strong>01012345678 / 010-1234-5678</strong>처럼 포맷이 섞여,
                  서버/운영에서 처리 기준이 흐트러질 수 있었음.
                </li>
              </ul>
            </section>

            <section>
              <h2>✅ 해결 방법</h2>
              <ul>
                <li>
                  전화번호 입력에{" "}
                  <strong>oninput 자동 하이픈(gfn_autoHyphen)</strong>을 적용해,
                  입력 즉시 포맷이 정규화되도록 처리
                </li>
                <li>
                  과도한 입력을 막기 위해 <strong>maxlength</strong>도 함께 적용
                </li>
              </ul>
            </section>

            <section>
              <h2>📈 결과</h2>
              <ul>
                <li>
                  전화번호가 <strong>항상 같은 형태로 저장</strong>되어
                  후처리/검증 비용이 감소
                </li>
                <li>
                  사용자는 하이픈을 따로 신경 쓸 필요가 없어 입력 UX가 개선됨
                </li>
              </ul>
            </section>

            <hr />

            <section>
              <h2>
                🧩 트러블슈팅 02. 운영시간 입력값 범위 오류(AM/PM 시간/분) 방지
              </h2>
              <ul>
                <li>
                  운영시간(시/분)을 자유 입력으로 두면{" "}
                  <strong>범위 밖 숫자(예: 27시, 99분)</strong>가 들어가거나, 빈
                  값 제출이 발생할 수 있었음.
                </li>
                <li>
                  AM/PM 필드가 분리된 구조라, 어떤 필드가 문제인지{" "}
                  <strong>사용자에게 명확히 안내하는 검증</strong>이 필요했음.
                </li>
              </ul>
            </section>

            <section>
              <h2>✅ 해결 방법</h2>
              <ul>
                <li>
                  FormValidator에 운영시간 검증을 추가:
                  <ul>
                    <li>
                      <strong>정규식 검사</strong>로 숫자 형식 체크
                    </li>
                    <li>
                      <strong>범위 검사</strong>로 AM(0~11), PM(12~23), 분(0~59)
                      제한
                    </li>
                    <li>
                      오류 시 예시(example)까지 함께 보여줘 빠르게 수정하도록
                      유도
                    </li>
                  </ul>
                </li>
              </ul>
            </section>

            <section>
              <h2>📈 결과</h2>
              <ul>
                <li>
                  운영시간 데이터에서 발생하던{" "}
                  <strong>범위/형식 오류를 제출 전에 차단</strong>
                </li>
                <li>
                  잘못된 값이 저장되는 걸 막아, 서버/운영 단계의 수정 비용이
                  줄어듦
                </li>
              </ul>
            </section>
          </>
        );
      },
    },
  },
  {
    id: "clef_project10",
    name: "유스라이즈",
    description: "청년 참여 캠페인 웹사이트",
    image: "youth.png",
    data: {
      project: projectMeta(
        "유스라이즈",
        "2025.11.28 ~ 2025.12.13",
        "https://youthrise.co.kr/",
      ),
      technologyStack: standardStack(),
      keyResponsibilities: [
        {
          front: "스크롤 스토리텔링",
          back: "GSAP/ScrollTrigger로 인트로 타임라인을 구성해 몰입도를 높임",
        },
        {
          front: "IG Swiper 슬라이더",
          back: "자동재생/반응형 동작을 상황에 맞게 제어",
        },
        {
          front: "콘텐츠 페이지 템플릿",
          back: "아카이브/공지/Q&A/리포트를 구조화해 운영 편의성 확보",
        },
        {
          front: "공통 인터랙션",
          back: "모바일 메뉴/다크 섹션 토글 등 공통 UX를 정리",
        },
        {
          front: "리사이즈 대응",
          back: "ScrollTrigger refresh와 상태 재구성으로 깨짐을 방지",
        },
      ],
      mainFeatures: [
        {
          title: "스크롤 기반 메인 비주얼",
          icon: "🎬",
          desc: ["인트로 애니메이션", "진행도에 따른 텍스트/그래픽 변화"],
        },
        {
          title: "SNS/캠페인 슬라이더",
          icon: "📱",
          desc: ["Swiper 기반 IG 섹션", "모바일 autoplay 제어"],
        },
        {
          title: "아카이브/공지/Q&A",
          icon: "📚",
          desc: ["콘텐츠 목록/상세 페이지", "서브 템플릿 구성"],
        },
      ],
    },
  },
  {
    id: "clef_project11",
    name: "고려대학교 LMS",
    description: "고려대학교 온라인 강의 웹사이트",
    image: "korea.jpg",
    data: {
      project: projectMeta(
        "고려대학교 LMS",
        "2025.08.26 ~ 2025.09.01",
        "https://koreaeco.re.kr/sub07/lectures.php?view=lecture_lists",
      ),
      technologyStack: {
        frontEnd: [
          <HTMLIcon />,
          <CSSIcon />,
          <JavaScriptIcon />,
          <JQueryIcon />,
          <SCSSIcon />,
          <span>GSAP</span>,
          <span>Swiper</span>,
        ],
        backEnd: [],
      },
      keyResponsibilities: [
        {
          front: "강의 탭/뷰 구성",
          back: "온라인 강의/나의 수강 탭 전환과 히스토리 상태를 함께 동기화",
        },
        {
          front: "강의 목록 AJAX",
          back: "강의 리스트를 비동기로 로드하고 페이징 UI까지 렌더링",
        },
        {
          front: "상태 기반 UI 분기",
          back: "진행/종료, 설문/퀴즈 완료, 수료증 유무 등 서버 상태값에 따라 클래스/버튼 노출을 조건 분기",
        },
        {
          front: "반응형 보드·그리드 재배치",
          back: "날짜/카테고리/상태 및 수강률·퀴즈·설문 컬럼을 모바일 우선순위 기준으로 재배치하고, 상태 배지를 상단 고정으로 강조",
        },
        {
          front: "강의 콘텐츠 노출",
          back: "YouTube iframe 기반으로 강의 영상을 삽입하고, UI 제약사항을 고려해 오버레이 처리까지 포함해 안정적으로 노출",
        },
        {
          front: "모달 상태 전환 퍼블리싱",
          back: "시청률/제출 상태에 따라 모달 CTA(닫기↔퀴즈이동), 정오답(.correct/.incorrect) 스타일, 답안 보기 모드 버튼 고정 등을 UI 레벨에서 대응",
        },
        {
          front: "배너 인터랙션",
          back: "GSAP으로 서브 배너 타이틀/탭 진입 모션을 구성",
        },
      ],

      mainFeatures: [
        {
          title: "온라인 강의 목록",
          icon: "📘",
          desc: [
            "AJAX 기반 리스트 렌더링",
            "진행/종료 상태값에 따라 .status / .status.ongoing 클래스 적용",
            "데스크탑·모바일 그리드 재배치 + 모바일 상태 배지 상단 고정",
            "페이지네이션 UI 제공",
          ],
        },
        {
          title: "나의 온라인 수강",
          icon: "🧑‍🎓",
          desc: [
            "설문 완료(SURVEY_CMPLT_YN) 시 .survey_complete로 상태 표현",
            "수료증 파일 존재 시 .complete 적용 + '수료증 다운로드' 버튼 노출",
            "수강률/퀴즈/설문 컬럼 모바일 그리드 재배치(정보 우선순위 유지)",
          ],
        },
        {
          title: "YouTube iframe 강의 영상 노출",
          icon: "🎬",
          desc: [
            "YouTube iframe로 강의 영상 임베드",
            "플레이어 UI 제약(상단 오버레이 등) 대응을 위한 레이아웃/오버레이 처리",
          ],
        },
      ],

      troubleshootingAndSolutions: () => (
        <>
          <section>
            <h2>🧩 YouTube iframe 임베드 시 플레이어 상단 UI 노출 이슈 대응</h2>
            <ul>
              <li>
                강의 영상을 <strong>YouTube iframe</strong>으로 삽입했을 때,
                플레이어 우측 상단에 표시되는 UI(더보기/오버레이 요소)가 화면
                정책/디자인 요구사항과 충돌함.
              </li>
              <li>
                iframe 내부 UI는 외부 DOM에서 직접 제어가 불가능해(동일 출처
                정책 및 플레이어 제약),
                <strong>레이아웃 레벨에서의 대응</strong>이 필요했음.
              </li>
            </ul>
          </section>

          <section>
            <h2>✅ 해결 방법</h2>
            <ul>
              <li>
                플레이어 상단 우측 영역을{" "}
                <strong>고려대학교 마크(로고) 오버레이</strong>로 마스킹하여
                시각적으로 문제 요소가 노출되지 않도록 처리함.
              </li>
              <li>
                오버레이는 클릭/포커스 동작을 방해하지 않도록 레이어 우선순위와
                인터랙션 범위를 조정해
                <strong>재생 UX를 유지</strong>하면서 UI 노출만 차단함.
              </li>
            </ul>
          </section>

          <section>
            <h2>📈 결과</h2>
            <ul>
              <li>
                iframe 내부 UI를 직접 수정하지 않고도, 요구사항에 맞게
                <strong>불필요한 UI 노출을 안정적으로 차단</strong>함.
              </li>
              <li>
                외부 오버레이 방식으로 처리해 유지보수 시에도 영향 범위가
                명확해지고, 디자인 변경에도 대응이 쉬운 구조로 정리됨.
              </li>
            </ul>
          </section>
        </>
      ),
    },
  },
];

export const clefProjectData = clefProjects.reduce<
  Record<string, ProjectDataProps>
>((acc, project) => {
  acc[project.id] = project.data;
  return acc;
}, {});
