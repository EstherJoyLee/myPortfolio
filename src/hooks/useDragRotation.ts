import { useEffect, useRef, useState } from "react";

interface Options {
  autoRotate?: boolean;
}

export default function useDragRotation(
  ref: React.RefObject<HTMLDivElement | null>,
  options: Options = { autoRotate: true }
) {
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentRotation, setCurrentRotation] = useState(0);
  const requestRef = useRef<number | null>(null);
  const autoRotateSpeed = useRef(0.2);
  const velocityRef = useRef(0);
  const isHovering = useRef(false);

  const cancelFrame = () => {
    if (requestRef.current !== null) {
      cancelAnimationFrame(requestRef.current);
      requestRef.current = null;
    }
  };

  const autoRotate = () => {
    const rotate = () => {
      if (!isDragging && !isHovering.current && options.autoRotate) {
        setRotation((prev) => prev + autoRotateSpeed.current);
        setCurrentRotation((prev) => prev + autoRotateSpeed.current);
      }
      requestRef.current = requestAnimationFrame(rotate);
    };

    cancelFrame(); // 중복 방지
    requestRef.current = requestAnimationFrame(rotate);
  };

  const smoothRotation = () => {
    velocityRef.current *= 0.95;
    if (Math.abs(velocityRef.current) > 0.1) {
      setRotation((prev) => prev + velocityRef.current);
      setCurrentRotation((prev) => prev + velocityRef.current);
      requestRef.current = requestAnimationFrame(smoothRotation);
    } else {
      if (options.autoRotate && !isHovering.current) {
        autoRotate();
      }
    }
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMouseDown = (e: MouseEvent) => {
      setIsDragging(true);
      setStartX(e.clientX);
      velocityRef.current = 0;
      cancelFrame();
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - startX;
      setRotation(currentRotation - deltaX);
      velocityRef.current = deltaX * 0.15;
    };

    const onMouseUp = () => {
      if (!isDragging) return;
      setIsDragging(false);
      setCurrentRotation(rotation);
      smoothRotation();
    };

    const onTouchStart = (e: TouchEvent) => {
      setIsDragging(true);
      setStartX(e.touches[0].clientX);
      velocityRef.current = 0;
      cancelFrame();
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      const deltaX = e.touches[0].clientX - startX;
      setRotation(currentRotation - deltaX);
      velocityRef.current = deltaX * 0.15;
    };

    const onTouchEnd = () => {
      if (!isDragging) return;
      setIsDragging(false);
      setCurrentRotation(rotation);
      smoothRotation();
    };

    const onMouseEnter = () => {
      isHovering.current = true;
      cancelFrame();
    };

    const onMouseLeave = () => {
      isHovering.current = false;
      if (options.autoRotate && !isDragging) {
        autoRotate();
      }
    };

    el.addEventListener("mouseenter", onMouseEnter);
    el.addEventListener("mouseleave", onMouseLeave);
    el.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);

    el.addEventListener("touchstart", onTouchStart);
    el.addEventListener("touchmove", onTouchMove);
    el.addEventListener("touchend", onTouchEnd);

    // ✅ 처음 진입 시 자동 회전 시작
    if (options.autoRotate) {
      autoRotate();
    }

    return () => {
      el.removeEventListener("mouseenter", onMouseEnter);
      el.removeEventListener("mouseleave", onMouseLeave);
      el.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);

      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);

      cancelFrame();
    };
  }, [ref, isDragging, rotation, currentRotation, options.autoRotate]);

  return { rotation };
}
