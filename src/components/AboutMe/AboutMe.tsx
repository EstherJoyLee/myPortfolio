// components/AboutMe/AboutMe.tsx
import React, { useEffect, useRef } from "react";
import Profile from "./Profile";
import Section from "./Section";
import ExperienceCard from "./ExperienceCard";
import styles from "./AboutMe.module.scss";
import gsap from "gsap";

const AboutMe = () => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (wrapperRef.current) {
      gsap.from(wrapperRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
      });
    }
  }, []);

  return (
    <div ref={wrapperRef} className={`aboutMeWrapper ${styles.aboutMeWrapper}`}>
      <Profile />

      <Section className={styles.intro}>
        <h2>
          익숙함에 머물지 않고, 새로운 기술과 더 나은 구조를 향해 확장 중인
          퍼블리셔 이주희입니다.
        </h2>
      </Section>

      <Section className={styles.values}>
        <h2>💡 개발 철학</h2>
        <ul>
          <li>
            마크업은 브라우저가 이해할 수 있어야 하지만 결국 사람을 위한
            것이라고 생각합니다. 사용자 눈높이에서 구조와 user flow를 설계하려고
            합니다.
          </li>

          <li>
            inline 스타일과 보일러플레이트 코드를 줄이고, 읽는 사람이 편한
            구조를 만들기 위해 모듈화에 집중합니다.
          </li>

          <li>
            내 코드가 완벽할 수 없다는 걸 알기에, 더 좋은 구조와 user flow를
            위해 계속 배우고 관찰합니다.
          </li>
        </ul>
      </Section>

      <Section className={styles.experiences}>
        <h2>📌 기억에 남는 경험</h2>
        <div className={styles.cardGrid}>
          <ExperienceCard
            title="웹퍼블리셔로서 4년간 20+ 프로젝트 마크업"
            emoji="🧩"
            lines={[
              "시맨틱 마크업, 반응형, 접근성 기반 퍼블리싱 실무 경험",
              "디자인-개발 사이에서 커뮤니케이션 방법 체득",
            ]}
          />
          <ExperienceCard
            title="라오스 대학생 HTML/CSS/JavaScript 워크숍"
            emoji="👩🏻‍💻"
            lines={[
              "6개월간 매주 토요일, 온라인 수업 운영",
              "매주 과제와 최종 아웃풋 사이트 제작으로 실력 향상",
            ]}
          />
          <ExperienceCard
            title="개인 프로젝트로 프론트엔드 성장 가능성 증명"
            emoji="💻"
            lines={[
              "Next.js 기반 블로그(JoyLog) 설계·개발",
              "React, Firebase 등 새로운 기술에 도전하며 성장 중",
            ]}
          />
        </div>
      </Section>

      <Section className={styles.workStyle}>
        <h2>🧰 업무 스타일</h2>
        <ul>
          <li>
            마감 기한을 최우선으로 생각하며, 일정 내에 완성하는 것을 가장 중요한
            업무 기준으로 삼습니다.
          </li>
          <li>
            투두리스트와 개인 업무 일지를 활용해 요청자, 마감일, 프로젝트, 내용
            등을 정리하며 업무 누수를 방지합니다.
          </li>
          <li>
            디자이너, 기획자와의 원활한 커뮤니케이션을 통해 의도를 정확히
            파악하고, 작업 결과물에 반영하려 노력합니다.
          </li>
          <li>
            여러 부서로부터 들어오는 요청은 마감일을 우선 파악하여 우선순위를
            정하고 업무를 재정렬합니다.
          </li>
          <li>
            업무 중 반복적이거나 비효율적인 작업은 자동화하거나 개선 방안을
            제안해, 팀 전체의 생산성을 높이는 데 기여합니다.
          </li>
        </ul>
      </Section>

      <Section className={styles.fun}>
        <h2>✨ TIM 모음.zip</h2>
        <ul>
          <li>☕ 커피 없이 코드 못 짬</li>
          <li>🧠 디버깅할 때 혼잣말 많이 함</li>
          <li>🔄 코드 다 짜도 고칠 데 없는지 습관적으로 열어봄</li>
          <li>🧨 에러 계속 안 잡히면 커밋 메시지가 점점 간절해짐</li>
        </ul>
      </Section>
    </div>
  );
};

export default AboutMe;
