import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import styles from "./KeyResponsibilities.module.scss";
import projectData from "@/components/ProjectData/ProjectData";

gsap.registerPlugin(ScrollTrigger);

type ProjectId = keyof typeof projectData;

interface KeyResponsibilitiesProps {
  projectId: ProjectId;
}

// ✅ 컴포넌트 밖으로 이동
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

const KeyResponsibilities = ({ projectId }: KeyResponsibilitiesProps) => {
  const keyResponsibilities = projectData[projectId].keyResponsibilities;

  useEffect(() => {
    const mainContent1 = document.querySelector("#keyResWrapper");
    const sticky = document.querySelector("#keyResSticky");

    if (
      !(mainContent1 instanceof HTMLElement) ||
      !(sticky instanceof HTMLElement)
    ) {
      return;
    }

    const cardFlipOnScroll = new CardFlipOnScroll(mainContent1, sticky);
    cardFlipOnScroll.init();
    cardFlipOnScroll.animate(); // ✅ 초기 상태 반영

    const handleScroll = () => {
      cardFlipOnScroll.animate();
    };

    const handleResize = () => {
      cardFlipOnScroll.init();
      cardFlipOnScroll.animate();
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={styles.keyResWrapper} id="keyResWrapper">
      <div className={styles.keyResSticky} id="keyResSticky">
        <div className={styles.cardFrame}>
          {keyResponsibilities.map((item: { front: string; back: string }) => (
            <div className={`card ${styles.card}`} key={item.front}>
              <div className={styles.front}>
                {item.front}
                <i className={styles.hover}>👆🏻</i>
              </div>
              <div className={styles.back}>{item.back}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KeyResponsibilities;
