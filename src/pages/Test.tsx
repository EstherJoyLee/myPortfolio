import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import "./Scroll.css";

gsap.registerPlugin(ScrollTrigger);

const Project = () => {
  class CardFlipOnScroll {
    wrapper: HTMLElement;
    sticky: HTMLElement;
    cards: NodeListOf<HTMLElement>;
    length: number;
    start: number;
    end: number;
    step: number;

    constructor(wrapper: HTMLElement, sticky: HTMLElement) {
      this.wrapper = wrapper;
      this.sticky = sticky;
      this.cards = sticky.querySelectorAll(".card");
      this.length = this.cards.length;

      this.start = 0;
      this.end = 0;
      this.step = 0;
    }

    init() {
      this.start = this.wrapper.offsetTop - 100;
      this.end =
        this.wrapper.offsetTop +
        this.wrapper.offsetHeight -
        window.innerHeight * 1.2;
      this.step = (this.end - this.start) / (this.length * 2);
    }

    animate() {
      this.cards.forEach((card, i) => {
        const s = this.start + this.step * i;
        const e = s + this.step * (this.length + 1);

        if (window.scrollY <= s) {
          card.style.transform = `
            perspective(100vw)
            translateX(100vw) 
            rotateY(180deg)
          `;
        } else if (window.scrollY > s && window.scrollY <= e - this.step) {
          card.style.transform = `
            perspective(100vw)
            translateX(${100 + ((window.scrollY - s) / (e - s)) * -100}vw)
            rotateY(180deg)
          `;
        } else if (window.scrollY > e - this.step && window.scrollY <= e) {
          card.style.transform = `
            perspective(100vw)
            translateX(${100 + ((window.scrollY - s) / (e - s)) * -100}vw)
            rotateY(${
              180 + (-(window.scrollY - (e - this.step)) / this.step) * 180
            }deg)
          `;
        } else if (window.scrollY > e) {
          card.style.transform = `
            perspective(100vw)
            translateX(0vw) 
            rotateY(0deg)
          `;
        }
      });
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      console.log("🔥 현재 스크롤 위치 (window.scrollY):", window.scrollY);
    };

    document.addEventListener("scroll", () => {
      console.log("🔥 문서에서 스크롤 발생! 현재 위치:", window.scrollY);
    });

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    const mainContent1 = document.querySelector(".main-content-1");
    const sticky = document.querySelector(".sticky");

    if (mainContent1 instanceof HTMLElement && sticky instanceof HTMLElement) {
      const cardFlipOnScroll = new CardFlipOnScroll(mainContent1, sticky);
      cardFlipOnScroll.init();

      window.addEventListener("scroll", () => {
        cardFlipOnScroll.animate();
      });

      window.addEventListener("resize", () => {
        cardFlipOnScroll.init();
      });
    }
  }, []);
  return (
    <>
      <div className="main-content-1">
        <div className="sticky">
          <div className="sticky-background">SCROLL ANIMATION</div>
          <div className="card-frame">
            <div className="card">
              <div className="front">SEO 최적화 적용</div>
              <div className="back">
                Next.js ISR + CSR 조합을 활용한 SEO 최적화 적용
              </div>
            </div>
            <div className="card">
              <div className="front">CRUD 기능 개발</div>
              <div className="back">
                Firebase Firestore 및 Supabase 연동을 통한 CRUD 기능 개발
              </div>
            </div>
            <div className="card">
              <div className="front">UI 최적화</div>
              <div className="back">Redux를 활용한 상태 관리 및 UI 최적화</div>
            </div>
            <div className="card">
              <div className="front">로그인 기능 구축</div>
              <div className="back">
                Firebase Authentication을 통한 일반 로그인 및 Google OAuth
                로그인 기능 구축
              </div>
            </div>
            <div className="card">
              <div className="front">이메일 문의 기능 구현</div>
              <div className="back">EmailJS를 활용한 이메일 문의 기능 구현</div>
            </div>
            <div className="card">
              <div className="front">반응형 디자인 구현</div>
              <div className="back">
                다크 & 라이트 모드 지원, Tailwind CSS 적용하여 반응형 디자인
                구현
              </div>
            </div>
            <div className="card">
              <div className="front">SEO 강화</div>
              <div className="back">
                ercel 배포 및 Google Search Console을 활용한 SEO 강화
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Project;
