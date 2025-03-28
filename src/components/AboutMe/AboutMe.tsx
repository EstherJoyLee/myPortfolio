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
          퍼블리셔 4년차의 실무 감각 위에 프론트엔드 개발자로서의 성장성을
          더해가는 중입니다.
          <br />
          픽셀 하나에도 집착하는 마크업 덕후입니다 :)
        </h2>
      </Section>

      <Section className={styles.values}>
        <h2>💡 개발 철학</h2>
        <ul>
          <li>
            “코드는 나 혼자만 보는 것이 아니기 때문에, 항상 재사용 가능하고
            유지보수하기 쉬운 구조로 작성하기 위해 노력합니다.”
          </li>
          <li>
            “inline 스타일이나 보일러플레이트 코드를 지양하고, 읽는 사람
            입장에서 불편함이 없도록 모듈화에 집중합니다.”
          </li>
          <li>
            “내 코드가 완벽할 수 없다는 걸 인정하며, 다양한 코드를 접하면서 더
            나은 방향이 무엇인지 끊임없이 고민합니다.”
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
            title="캄보디아 대학생 HTML/CSS/JavaScript 워크숍"
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
              "React, Firebase 등 실전 기술 중심 성장 중",
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
            디자인을 해석하고 그대로 구현하는 것을 기본으로 하되, 기한 내에
            어려울 경우 디자이너와 타협점을 찾아 현실적인 방향으로 조정합니다.
          </li>
          <li>
            여러 부서로부터 들어오는 요청은 마감일을 우선 파악하여 우선순위를
            정하고 업무를 재정렬합니다.
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
