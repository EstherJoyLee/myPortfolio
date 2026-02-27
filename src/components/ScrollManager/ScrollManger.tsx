import React, { useEffect } from "react";

const preventScrollPropagation = (event: WheelEvent | TouchEvent) => {
  const target = event.currentTarget as HTMLElement;
  if (!target) return;

  const { scrollTop, scrollHeight, clientHeight } = target;
  const isScrollable = scrollHeight > clientHeight;

  if (!isScrollable) return; // 스크롤 영역 없으면 이벤트 넘기기

  if (event instanceof WheelEvent) {
    const isScrollingDown = event.deltaY > 0;
    const isScrollingUp = event.deltaY < 0;
    const atTop = scrollTop === 0;
    const atBottom = scrollTop + clientHeight >= scrollHeight - 1; // float 보정

    const canScrollDown = !atBottom && isScrollingDown;
    const canScrollUp = !atTop && isScrollingUp;

    if (canScrollDown || canScrollUp) {
      // 내부에서 스크롤 가능한 상황이면 이벤트 상위 전파 막기
      event.stopPropagation();
    }
  } else if (event instanceof TouchEvent) {
    // 터치 스크롤도 전파 막기 (추가 개선 가능)
    event.stopPropagation();
  }
};

const observeScrollableElements = () => {
  const observer = new MutationObserver(() => {
    document
      .querySelectorAll(
        ".fp-section *[style*='overflow: auto'], .fp-section *[style*='overflow: scroll']"
      )
      .forEach((el) => {
        el.removeEventListener(
          "wheel",
          preventScrollPropagation as EventListener
        );
        el.addEventListener("wheel", preventScrollPropagation as EventListener);
        el.removeEventListener(
          "touchmove",
          preventScrollPropagation as EventListener
        );
        el.addEventListener(
          "touchmove",
          preventScrollPropagation as EventListener
        );
      });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["style"],
  });
};

const ScrollManager = () => {
  useEffect(() => {
    observeScrollableElements();
  }, []);

  return null;
};

export default ScrollManager;
