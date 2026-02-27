import React from "react";
import {
  CSSIcon,
  FirebaseIcon,
  HTMLIcon,
  JavaScriptIcon,
  JQueryIcon,
  NextJSIcon,
  ReactIcon,
  ReduxIcon,
  SCSSIcon,
  SupabaseIcon,
  TailwindCSSIcon,
  TypeScriptIcon,
  VercelIcon,
} from "@/components/Icons/icons";
import { clefProjectData } from "./clef";
import type { ProjectDataProps } from "./types";

const joylog: ProjectDataProps = {
  project: {
    name: "JoyLog",
    progressPeriod: "2025.01 ~ 2025.03",
    liveDemoUrl: "https://joylog.vercel.app/",
    testBlogUrl: "https://joylog.vercel.app/blog/bonjourjj3",
    gitRepositoryUrl: "https://github.com/EstherJoyLee/blog",
  },
  technologyStack: {
    frontEnd: [
      <NextJSIcon />,
      <TypeScriptIcon />,
      <ReactIcon />,
      <ReduxIcon />,
      <SCSSIcon />,
      <TailwindCSSIcon />,
    ],
    backEnd: [<FirebaseIcon />, <SupabaseIcon />, <VercelIcon />],
  },
  keyResponsibilities: [
    {
      front: "SEO 최적화 적용",
      back: "Next.js ISR + CSR 조합을 활용한 SEO 최적화 적용",
    },
    {
      front: "CRUD 기능 개발",
      back: "Firebase Firestore 및 Supabase 연동을 통한 CRUD 기능 개발",
    },
    { front: "UI 최적화", back: "Redux를 활용한 상태 관리 및 UI 최적화" },
    {
      front: "로그인 기능 구축",
      back: "Firebase Authentication을 통한 일반 로그인 및 Google OAuth 로그인 기능 구축",
    },
    {
      front: "재사용 가능한 구조 설계",
      back: "재사용 가능한 컴포넌트 구조로 설계하여 유지보수 용이 및 보일러 플레이트 코드 감소 ",
    },
    {
      front: "반응형 디자인 구현",
      back: "Tailwind CSS & 미디어 시스템 적용하여 반응형 디자인 구현 및 추가로 다크 & 라이트 모드 지원",
    },
  ],
  mainFeatures: [
    {
      title: "회원가입 & 로그인",
      icon: "🔒",
      desc: [
        "Firebase를 이용한 이메일 인증 및 구글 로그인 지원 🔑",
        "회원가입 시 커스텀 URL 설정 가능 → 나만의 블로그 주소 생성! 🌍",
      ],
    },
    {
      title: "블로그 기능",
      icon: "📝",
      desc: [
        " 게시글 & 폴더 CRUD (생성, 수정, 삭제 가능) 📝",
        "Markdown 지원 → 깔끔한 문서 작성 가능 ✍️",
        "게시글 공개/비공개 설정 🔒",
        "다크 모드 & 라이트 모드 지원 🌑☀️",
      ],
    },
    {
      title: "게시물 검색 기능",
      icon: "🔍",
      desc: [
        "더보기 버튼 → 포스트 리스트 페이지에서 추가 게시물 불러오기 📄",
        "좌측 사이드 메뉴에서 특정 검색어를 포함한 모든든 게시물 검색 가능 🔍",
      ],
    },
  ],
  troubleshootingAndSolutions: () => {
    return (
      <>
        <section>
          <h2>
            🚨 문제: ISR 환경에서 로그인 상태를 가져오지 못해, 블로그
            계정주(관리자)임에도 비공개 게시물이 표시되지 않는 문제
          </h2>
          <ul>
            <li>
              Next.js의 ISR은 서버에서 정적 페이지를 생성하지만, Firebase
              Authentication은 클라이언트에서만 동작
            </li>
            <li>
              ISR에서는 로그인 여부를 확인할 수 없기 때문에 관리자 계정도 비공개
              게시물을 볼 수 없음
            </li>
          </ul>
        </section>

        <section>
          <h2>📌 문제 발생 흐름 (Before)</h2>
          <pre>
            <code>
              (사용자) - 로그인 → [ Firebase Authentication ] ✅ (클라이언트
              인증 완료) | 🚫 ISR에서는 로그인 정보 확인 불가 | [
              getStaticProps() 실행 ] | 🚫 '로그인 정보를 가져올 수 없음' | 🔴
              관리자조차 비공개 게시물 접근 불가
            </code>
          </pre>
        </section>

        <section>
          <h2>
            ✅ 해결 방법: Firebase Admin SDK를 활용하여 ISR에서도 로그인 정보
            검증
          </h2>
          <h3>🔥 1. Firebase Admin SDK를 도입하여 서버에서도 인증 정보 확인</h3>
          <p>
            Firebase Admin SDK를 활용하여 서버에서 직접 로그인 상태를 확인하고,
            관리자 계정이면 비공개 게시물을 포함하여 정적 페이지를 생성하도록
            수정
          </p>
        </section>

        <section>
          <h3>📌 Firebase Admin SDK 초기화</h3>
          <pre className="bg-gray-100 p-4 overflow-x-auto rounded-md">
            <code>
              {`import admin from "firebase-admin";

const serviceAccount = JSON.parse(
  process.env.NEXT_PUBLIC_FIREBASE_ADMIN_SDK_KEY as string
);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export const adminAuth = admin.auth();
export const adminDB = admin.firestore();`}
            </code>
          </pre>
        </section>

        <section>
          <h3>📌 ISR에서 Firebase Admin SDK로 사용자 인증 검증</h3>
          <pre className="bg-gray-100 p-4 overflow-x-auto rounded-md">
            <code>
              {`export const generateStaticParams = async () => {
  try {
    const userSnapshot = await adminDB.collection("users").get();
    const users = userSnapshot.docs
      .map((doc) => ({
        displayName: doc.data().blogUrl, // params 객체 구조로 반환
      }))
      .filter((user) => Boolean(user.displayName));

    return users;
  } catch (error) {
    return [];
  }
};

// ✅ Firestore에서 게시물 가져오기
const getPosts = async (
  displayName: string | undefined,
  userUid: string | null
) => {

  if (!displayName) {
    return [];
  }

  try {
    const userSnapshot = await adminDB
      .collection("users")
      .where("blogUrl", "==", displayName)
      .get();

    if (userSnapshot.empty) {
      return [];
    }

    const authorUid = userSnapshot.docs[0].id;
    const isBlogOwner = userUid === authorUid;

    let postsQuery = adminDB
      .collection("posts")
      .where("authorUid", "==", authorUid)
      .orderBy("createdAt", "desc")
      .limit(5);

    if (!isBlogOwner) {
      postsQuery = postsQuery.where("isPublic", "==", true);
    }
    const postSnapshot = await postsQuery.get();

    return postSnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title || "제목 없음",
        content: data.content || "내용 없음",
        imageUrl: data.imageUrl || null,
        isPublic: data.isPublic || false,
        authorUid: data.authorUid || "",
        createdAt: data.createdAt
          ? new Date(data.createdAt.seconds * 1000).toISOString()
          : null,
        updatedAt: data.updatedAt
          ? new Date(data.updatedAt.seconds * 1000).toISOString()
          : null,
      };
    });
  } catch (error) {
    return [];
  }
};`}
            </code>
          </pre>
        </section>

        <section>
          <h2>📈 결과</h2>
          <table>
            <thead>
              <tr>
                <th>Before (문제 발생 전)</th>
                <th>After (문제 해결 후)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Firebase Auth로 인증 가능 (클라이언트)</td>
                <td>Firebase Admin SDK로 서버에서도 인증 확인 가능</td>
              </tr>
            </tbody>
          </table>
        </section>
      </>
    );
  },
};

const solutionSystem: ProjectDataProps = {
  project: {
    name: "Nexmedia Solution System",
    progressPeriod: "2020.03 ~ 2023.03",
    liveDemoUrl: "https://www.nex-media.co.kr/pages/product.php",
    gitRepositoryUrl: null,
  },
  technologyStack: {
    frontEnd: [<HTMLIcon />, <CSSIcon />, <JavaScriptIcon />, <JQueryIcon />],
    backEnd: [],
  },
  keyResponsibilities: [
    {
      front: "스마트 상담 대기표 UI 개발",
      back: "대형 스크린 디스플레이를 고려한 반응형 상담 대기번호 시스템 UI를 HTML, CSS, JavaScript 기반으로 단독 구현",
    },
    {
      front: "상담 예약 태블릿 시스템 구축",
      back: "기획 단계부터 참여하여 폼 데이터터 정규화 및 사용자 친화적인 인터페이스를 갖춘 태블릿 전용 예약 시스템 개발",
    },
    {
      front: "모바일 상담 CRM 시스템 제작",
      back: "폼 데이터 유효성 검증 및 입력 UI 최적화를 통해 정확하고 안정적인 고객 데이터 수집 인터페이스 구현",
    },
    {
      front: "부적격 검수 시스템 UI 개발",
      back: "데이터 기반 리스트 및 상세 조회 UI 구현, 시멘틱 마크업 설계 및 user flow 최적화",
    },
    {
      front: "청약 자격 점검 시스템 제작",
      back: "user flow에 맞춘 인터랙션 설계 및 터치 디바이스 최적화 UI 구현 (청약 공급 유형 선택 등)",
    },
    {
      front: "타 부서와의 긴밀한 커뮤니케이션",
      back: "기획자, 백엔드 개발자와의 실시간 커뮤니케이션을 통해 요구사항 조율 및 에러 없는 기능 구현",
    },
  ],
  mainFeatures: [
    {
      title: "스마트 상담 대기표 시스템",
      icon: "🖥️",
      desc: [
        "대형 디스플레이에 실시간 대기번호 정보 출력",
        "차례 도착 시 상담석 위치 및 알림 연동 기능 구현",
        "총 대기 인원 정보 실시간 업데이트",
      ],
    },
    {
      title: "태블릿 상담 예약 시스템",
      icon: "📱",
      desc: [
        "실시간 상담 대기 인원 확인 기능 제공",
        "태블릿으로 간편하게 상담 시간 예약 가능",
      ],
    },
    {
      title: "모바일 상담 CRM 연동",
      icon: "🔗",
      desc: [
        "QR 코드 스캔을 통한 CRM 연동 및 상담 연결",
        "모바일 환경 최적화 상담 시스템 제공",
      ],
    },
    {
      title: "부적격 검수 시스템",
      icon: "🧾",
      desc: [
        "청약 시 부적격 여부 자동 검수 기능 구현",
        "대상자 정보, 가점제 자료 등 데이터 통합 관리",
      ],
    },
    {
      title: "청약 자격 점검 시스템",
      icon: "✅",
      desc: [
        "사용자가 직접 청약 자격 여부를 사전 점검",
        "청약 자격 DB화를 통한 마케팅 활용 가능",
        "부적격자 사전 필터링 가능",
      ],
    },
  ],
  troubleshootingAndSolutions: () => {
    return (
      <>
        <section>
          <h2>🤝 협업 과정 중 이슈 발생 및 커뮤니케이션 해결 경험</h2>
          <ul>
            <li>
              모든 솔루션 시스템이{" "}
              <strong>초기 기획이 없는 상태에서 시작</strong>되어, 작업 범위 및
              일정이 불명확한 상황에서 진행됨
            </li>
            <li>
              기획자 요청사항이{" "}
              <strong>작업 중간에 자주 변경되거나 추가 요청되는 상황</strong>이
              빈번하여 우선순위 조정이 필수였음
            </li>
            <li>
              백엔드 개발자와의 협업 중{" "}
              <strong>작동 조건(예: 알림 발생 시 색상 변경)</strong>에 대한
              정의가 부족해 기능 해석 차이 발생
            </li>
          </ul>
        </section>

        <section>
          <h2>✅ 해결 방법</h2>
          <ul>
            <li>
              <strong>기획자와의 커뮤니케이션을 통해 작업 우선순위 조율</strong>
              , 1차/2차 분할 개발 방식으로 효율적인 일정 관리
            </li>
            <li>
              <strong>백엔드 개발자와의 명확한 기능 정의 및 역할 분담</strong>,
              주석 및 문서화를 통해 내용용 정리
            </li>
            <li>
              <strong>
                작업 누수 방지를 위한 히스토리 관리 및 우선순위 정리
              </strong>
              로 실시간 요청에 안정적으로 대응
            </li>
          </ul>
        </section>

        <section>
          <h2>📈 결과</h2>
          <ul>
            <li>협업 과정에서의 실시간 대응력 향상 및 일정 리스크 최소화</li>
            <li>프론트/기획/백엔드 간 유기적인 협업 경험으로 협업 역량 강화</li>
            <li>기한 내 주요 기능 완성 및 시스템 안정성 확보</li>
          </ul>
        </section>
      </>
    );
  },
};

const theSharp: ProjectDataProps = {
  project: {
    name: "The Sharp",
    progressPeriod: "2022.07 ~ 2022.07",
    liveDemoUrl: "https://www.xn--6e0bs5ii3fhrcs2i1lat6zyt5a.kr/",
    mobileLiveDemoUrl: "https://m.xn--6e0bs5ii3fhrcs2i1lat6zyt5a.kr/",
    gitRepositoryUrl: null,
  },
  technologyStack: {
    frontEnd: [<HTMLIcon />, <CSSIcon />, <JavaScriptIcon />, <JQueryIcon />],
    backEnd: [],
  },
  keyResponsibilities: [
    {
      front: "메인 페이지 및 서브 페이지 UI 마크업",
      back: "HTML, CSS, JavaScript 기반으로 반응형 UI 구성 및 시멘틱 마크업 설계",
    },
    {
      front: "분양 사업지 맞춤형 콘텐츠 관리",
      back: "프로젝트별 이미지 및 텍스트 교체가 가능하도록 유연한 구조 설계 및 콘텐츠 업데이트",
    },
    {
      front: "사이버 모델하우스 CTA 버튼 기능 개발",
      back: "우측 고정형 CTA 버튼 및 클릭 시 동작하는 Cyber Model House 컴포넌트 UI/UX 구현",
    },
    {
      front: "메인 스크롤 이벤트 구현",
      back: "스크롤 위치 기반 인터랙션 연출로 페이지 몰입도 향상 (text fade-in 등)",
    },
  ],
  mainFeatures: [
    {
      title: "분양 정보 중심의 랜딩 페이지",
      icon: "🏢",
      desc: [
        "고객 대상 주요 분양 정보(단지 소개, 위치, 혜택 등)를 직관적으로 제공",
        "분양 사업지에 따라 콘텐츠(텍스트/이미지) 변경 가능",
      ],
    },
    {
      title: "사이버 모델하우스 기능",
      icon: "🏠",
      desc: [
        "고정형 CTA 버튼을 통해 사이버 모델하우스 진입 유도",
        "사이드 패널 기반 UI로 상세 콘텐츠(영상/이미지/링크크) 제공",
      ],
    },
    {
      title: "스크롤 기반 인터랙션",
      icon: "🖱️",
      desc: [
        "스크롤 위치에 따라 요소가 자연스럽게 등장하도록 인터랙션 연출",
        "페이지 몰입도 향상 및 사용자 시선 유도",
      ],
    },
  ],
  troubleshootingAndSolutions: () => {
    return (
      <>
        <section>
          <h2>🧩 유지보수형 구조 내 새로운 요구사항 구현</h2>
          <ul>
            <li>
              The Sharp 관련 사이트들은은
              <strong>공통 레이아웃과 컴포넌트 구조(템플릿 기반)</strong>였음.
            </li>
            <li>
              선임 개발자가 작성한 기존 코드베이스 내에서 작업을 이어가야
              했으며,
              <strong>레이아웃 구조를 훼손하지 않고</strong> 기능을 추가하거나
              콘텐츠를 수정해야 하는 상황이 잦았음.
            </li>
            <li>
              일부 화면에서는 기존 스크립트와의 충돌 없이{" "}
              <strong>새로운 인터랙션 기능을 자연스럽게 통합</strong>해야 했음
            </li>
          </ul>
        </section>

        <section>
          <h2>✅ 해결 방법</h2>
          <ul>
            <li>
              기존 코드 구조를 분석한 후,{" "}
              <strong>재사용 가능한 형태로 모듈화</strong>하여 신규 요구사항을
              손쉽게 적용할 수 있도록 구성
            </li>
            <li>
              공통 구조를 해치지 않기 위해{" "}
              <strong>CSS/JS 네이밍 컨벤션 및 기능 분리</strong> 원칙 준수
            </li>
            <li>
              <strong>디자인 및 콘텐츠 변경 요구에 대응</strong>할 수 있도록
              반복 요소를 파악하고 자동화 또는 컴포넌트화 제안
            </li>
          </ul>
        </section>

        <section>
          <h2>📈 결과</h2>
          <ul>
            <li>
              브랜드 일관성을 유지하면서 각 사업지에 특화된 페이지 구현 성공
            </li>
            <li>반복 프로젝트를 효율적으로 관리할 수 있는 구조에 기여</li>
            <li>
              신규 기능과 기존 구조의 안정적 통합으로 전체 개발 속도 및 유지보수
              편의성 향상
            </li>
          </ul>
        </section>
      </>
    );
  },
};

const sunlin: ProjectDataProps = {
  project: {
    name: "법무법인선린",
    progressPeriod: "2024.05 ~ 2024.06",
    liveDemoUrl: "https://www.gnlaw.co.kr/",
    gitRepositoryUrl: null,
  },
  technologyStack: {
    frontEnd: [<HTMLIcon />, <CSSIcon />, <JavaScriptIcon />, <JQueryIcon />],
    backEnd: [],
  },
  keyResponsibilities: [
    {
      front: "웹표준 및 웹접근성 기반 리디자인",
      back: "기존 이미지 기반 구조를 제거하고 HTML/CSS로 재구성하여 시맨틱 마크업 및 웹접근성 준수",
    },
    {
      front: "프로젝트 리커버리 및 일정 리스크 대응",
      back: "약 3개월 지연된 프로젝트를 3주 만에 PC/모바일 완성, 타이트한 일정 내 안정적인 결과물 제공",
    },
    {
      front: "메인/서브 페이지 UI 재구축",
      back: "메인/서브 페이지의 콘텐츠 구조를 재정의하고 레이아웃, 스타일, 인터랙션 전면 리팩토링",
    },
    {
      front: "슬라이드 및 스크롤 인터랙션 개발",
      back: "JavaScript + jQuery 기반의 메인 슬라이더 및 스크롤 위치 기반 인터랙션 구현",
    },
    {
      front: "오시는 길 지도 기능 구현",
      back: "지도 API를 활용한 위치 안내 탭 UI 구현 및 지역별 좌표 동적 로딩 기능 구성",
    },
    {
      front: "모바일 대응 및 반응형 퀵버튼 개발",
      back: "모바일 해상도에 맞춘 UI 구성 및 하단 고정형 퀵버튼 기능 구현",
    },
  ],
  mainFeatures: [
    {
      title: "메인 페이지 슬라이더",
      icon: "🎞️",
      desc: [
        "메인 비주얼 영역에 JavaScript 기반 슬라이더 구현",
        "자동 재생 및 터치/버튼 네비게이션 기능 포함",
      ],
    },
    {
      title: "스크롤 기반 인터랙션",
      icon: "🖱️",
      desc: [
        "스크롤 위치에 따라 요소 등장/변화 애니메이션 구현",
        "페이지 몰입도 및 사용성 향상",
      ],
    },
    {
      title: "오시는 길 지도 (멀티 오피스 지원)",
      icon: "🗺️",
      desc: [
        "각 지역 사무소를 탭으로 구분하여 위치 선택 가능",
        "탭 클릭 시 해당 지점 좌표를 불러와 SPA 방식으로 지도 렌더링",
      ],
    },
    {
      title: "모바일 최적화 퀵버튼 기능",
      icon: "📱",
      desc: [
        "모바일 전용 하단 고정형 퀵버튼 UI 구현",
        "문의, 전화연결 등 주요 액션에 바로 접근 가능",
      ],
    },
    {
      title: "시맨틱 마크업 및 콘텐츠 구조화",
      icon: "🧱",
      desc: [
        "웹표준/접근성 지침에 따라 HTML5 시맨틱 태그 구성",
        "검색 최적화 및 유지보수 효율성을 고려한 콘텐츠 구조 설계",
      ],
    },
  ],
  troubleshootingAndSolutions: () => {
    return (
      <>
        <section>
          <h2>🚨 프로젝트 지연 및 비표준 작업물로 인한 리스크 발생</h2>
          <ul>
            <li>
              기존 작업자가 웹사이트 전체를 <strong>이미지 중심</strong>으로
              구성하고, 슬라이더 및 스크롤 이벤트 등{" "}
              <strong>기본 기능이 미구현</strong>된 상태로 작업 종료
            </li>
            <li>
              마크업 구조가{" "}
              <strong>웹표준 및 웹접근성 기준을 충족하지 못함</strong>
            </li>
            <li>
              약 <strong>3개월 이상 일정 지연</strong>된 상태에서 프로젝트 인수,
              <strong>PC/모바일 동시 대응 및 전체 재구성</strong> 필요
            </li>
          </ul>
        </section>

        <section>
          <h2>✅ 해결 전략</h2>
          <ul>
            <li>
              프로젝트 전체를 분석 후,{" "}
              <strong>불필요한 이미지 요소 제거 및 시맨틱 구조로 재설계</strong>
            </li>
            <li>
              HTML, CSS, JavaScript 기반으로{" "}
              <strong>메인/서브 페이지 UI 전면 재구축</strong>
            </li>
            <li>
              3주 내 완료를 목표로 기능별 작업 우선순위 설정 및{" "}
              <strong>빠르게 완성 가능한 구조로 최적화</strong>
            </li>
            <li>
              <strong>
                슬라이더, 스크롤 이벤트, 지도 API, 탭 전환 로직 등 핵심 기능
              </strong>
              을 새롭게 구현하며 기존 틀 안정 유지
            </li>
          </ul>
        </section>

        <section>
          <h2>📈 결과</h2>
          <ul>
            <li>
              3주 만에 PC/모바일 전환 완료 → 지연된 프로젝트 안정적으로 마무리
            </li>
            <li>
              웹표준/웹접근성 기반 구조로 전환 → 유지보수 효율성과 SEO 품질 향상
            </li>
            <li>
              UX 관점에서 탭 지도, 퀵버튼 등 실용적 기능 추가로 사용자 편의 개선
            </li>
          </ul>
        </section>
      </>
    );
  },
};

const ProjectData = {
  joylog,
  solutionSystem,
  theSharp,
  sunlin,
  ...clefProjectData,
};

export default ProjectData;
