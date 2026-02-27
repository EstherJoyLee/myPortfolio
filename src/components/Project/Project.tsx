import React, { memo, useEffect, useRef } from "react";
import $ from "jquery";
import "fullpage.js/dist/jquery.fullpage.css";
import "fullpage.js";
import projectData from "@/components/ProjectData/ProjectData";
import PageMenu from "./PageMenu";
import SectionIntro from "./SectionIntro";
import SectionTechnology from "./SectionTechnology";
import SectionResponsibilities from "./SectionResponsibilities";
import SectionFeatures from "./SectionFeatures";
import SectionTroubleshooting from "./SectionTroubleshooting";
import gsap from "gsap";
import styles from "./Project.module.scss";

// Extend the Window interface to include jQuery
declare global {
  interface Window {
    jQuery: any;
    $: any;
  }
}

export type ProjectId = keyof typeof projectData;

interface KeyResponsibilitiesProps {
  projectId: ProjectId;
}
// jQuery를 전역에 등록 (fullpage.js가 jQuery를 인식하도록 함)
window.jQuery = $;
window.$ = $;

const Project = ({ projectId }: KeyResponsibilitiesProps) => {
  const hasAnimated = useRef(false);
  const project = projectData[projectId].project;
  const technologyStack = projectData[projectId].technologyStack;
  const mainFeatures = projectData[projectId].mainFeatures;
  const troubleshootingAndSolutions =
    projectData[projectId].troubleshootingAndSolutions;

  useEffect(() => {
    if (window.location.hash) {
      window.location.hash = ""; // hash를 제거하여 첫 번째 섹션에서 시작하도록 설정
    }

    if (hasAnimated.current) return;
    hasAnimated.current = true;

    const scrollables = Array.from(
      document.querySelectorAll("[class*=sectionInner] *"),
    ).filter((el) => {
      const style = window.getComputedStyle(el);
      return (
        style.overflow === "auto" ||
        style.overflowY === "auto" ||
        style.overflow === "scroll" ||
        style.overflowY === "scroll"
      );
    });

    const selectorList = scrollables
      .map((el) => {
        const id = el.id;
        if (id) return `#${id}`;

        const classList = Array.from(el.classList);
        if (classList.length > 0) {
          return "." + classList.join(".");
        }

        return null;
      })
      .filter(Boolean);
    // fullpage.js 초기화
    const initFullpage = () => {
      if (!$.fn.fullpage) {
        return;
      }

      $("#fullpage").fullpage({
        autoScrolling: true,
        slidesNavigation: false,
        easing: "easeInOutCubic",
        scrollingSpeed: 800,
        loopHorizontal: true,
        recordHistory: false,
        normalScrollElements: selectorList.join(","),
        // normalScrollElements: "#keyResWrapper",
        anchors: ["page1", "page2", "page3", "page4", "page5", "page6"],
        menu: "#pageMenu",
        onLeave: function (index, nextIndex, direction) {
          const sections = document.querySelectorAll(".section");
          const currentSection = sections[index - 1];
          const currentSlidesContainer = currentSection.querySelector(
            ".fp-slidesContainer",
          );
          const slideArray = Array.from(
            currentSection.querySelectorAll(".slide"),
          );
          const firstSlide = slideArray[0];

          const $targets = $(".section").find("h1, h1 > i, a");
          gsap.set($targets, {
            y: 30,
            opacity: 0,
          });

          if (index === 3) {
            gsap.set(".card", {
              x: "100vw",
              rotationY: 180,
              opacity: 1,
            });
          }
          // ✅ slide가 undefined가 아닌지 체크하면서 class 제거
          slideArray.forEach((slide) => {
            if (slide) slide.classList.remove("active");
          });

          // ✅ 첫 슬라이드가 존재할 때만 활성화
          if (firstSlide) firstSlide.classList.add("active");

          if (currentSlidesContainer instanceof HTMLElement) {
            currentSlidesContainer.style.transform =
              "translate3d(0px, 0px, 0px)";
          }
        },
        afterLoad: function (anchorLink, index) {
          const currentSection = $(".section").eq(index - 1); // 섹션 인덱스는 1부터 시작

          const $targets = currentSection.find("h1 > i, h1, a");
          gsap.to($targets, {
            y: 0,
            opacity: 1,
            duration: 0.4,
            ease: "power3.out",
            stagger: 0.2,
          });

        },
        afterRender: function () {
        },
        afterResize: function () {
        },
        afterResponsive: function (isResponsive) {
        },
        afterSlideLoad: function (anchorLink, index, slideAnchor, slideIndex) {
          const currentSection = $(".section").eq(index - 1); // 섹션 인덱스는 1부터 시작
          const currentSlide = currentSection.find(".slide").eq(slideIndex); // 슬라이드는 0부터 시작

          const $targets = currentSlide.find(
            "[class*='iconWrapper'] li, [class*='featurePoint'], h1, h1 > i, [class*='featureContent'], [class*='troublesWrapper']",
          );

          gsap.to($targets.toArray(), {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.2,
          });

          if (index === 3 && slideIndex === 1) {
            gsap.to(".card", {
              x: 0,
              rotationY: 0,
              opacity: 1,
              duration: 1.5,
              ease: "power3.out",
              stagger: 0.2, // ✅ 카드가 순차적으로 등장
            });
          } else {
            gsap.set(".card", {
              x: "100vw",
              rotationY: 180,
              opacity: 1,
            });
          }
        },
        onSlideLeave: function (
          anchorLink,
          index,
          slideIndex,
          direction,
          nextSlideIndex,
        ) {
          gsap.set(
            "[class*='iconWrapper'] li, [class*='featurePoint'], .slide h1, .slide h1 > i, [class*='featureContent'], [class*='troublesWrapper']",
            {
              y: 30,
              opacity: 0,
            },
          );
        },
      });
    };

    // fullpage.js 초기화 실행
    initFullpage();

    // Cleanup 함수에서 fullpage.js 제거
    return () => {
      if ($.fn.fullpage && typeof $.fn.fullpage.destroy === "function") {
        $.fn.fullpage.destroy("all");
      }
    };
  }, []);

  return (
    <>
      <PageMenu projectId={projectId} />
      <div id="fullpage" className={styles.fullpageWrapper}>
        <SectionIntro projectId={projectId} project={project} />
        <SectionTechnology technologyStack={technologyStack} />
        <SectionResponsibilities projectId={projectId} />
        <SectionFeatures mainFeatures={mainFeatures} />
        <SectionTroubleshooting
          troubleshootingAndSolutions={troubleshootingAndSolutions}
        />
      </div>
    </>
  );
};

export default memo(Project);
