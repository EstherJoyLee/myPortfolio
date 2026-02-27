import { useEffect, useRef, useState, useCallback } from "react";

interface Options {
  autoRotate?: boolean;
}

export default function useDragRotation(
  ref: React.RefObject<HTMLDivElement | null>,
  options: Options = { autoRotate: true },
) {
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentRotation, setCurrentRotation] = useState(0);

  const requestRef = useRef<number | null>(null);
  const autoRotateSpeed = useRef(0.2);
  const velocityRef = useRef(0);
  const isHovering = useRef(false);

  // ✅ 최신 상태를 이벤트 핸들러/RAF에서 읽기 위한 refs
  const isDraggingRef = useRef(isDragging);
  const startXRef = useRef(startX);
  const currentRotationRef = useRef(currentRotation);
  const rotationRef = useRef(rotation);
  const autoRotateEnabledRef = useRef(!!options.autoRotate);

  useEffect(() => {
    isDraggingRef.current = isDragging;
  }, [isDragging]);

  useEffect(() => {
    startXRef.current = startX;
  }, [startX]);

  useEffect(() => {
    currentRotationRef.current = currentRotation;
  }, [currentRotation]);

  useEffect(() => {
    rotationRef.current = rotation;
  }, [rotation]);

  useEffect(() => {
    autoRotateEnabledRef.current = !!options.autoRotate;
  }, [options.autoRotate]);

  const cancelFrame = useCallback(() => {
    if (requestRef.current !== null) {
      cancelAnimationFrame(requestRef.current);
      requestRef.current = null;
    }
  }, []);

  const autoRotate = useCallback(() => {
    const rotate = () => {
      if (
        !isDraggingRef.current &&
        !isHovering.current &&
        autoRotateEnabledRef.current
      ) {
        setRotation((prev) => {
          const next = prev + autoRotateSpeed.current;
          rotationRef.current = next;
          return next;
        });

        setCurrentRotation((prev) => {
          const next = prev + autoRotateSpeed.current;
          currentRotationRef.current = next;
          return next;
        });
      }
      requestRef.current = requestAnimationFrame(rotate);
    };

    cancelFrame();
    requestRef.current = requestAnimationFrame(rotate);
  }, [cancelFrame]);

  const smoothRotation = useCallback(() => {
    velocityRef.current *= 0.95;

    if (Math.abs(velocityRef.current) > 0.1) {
      setRotation((prev) => {
        const next = prev + velocityRef.current;
        rotationRef.current = next;
        return next;
      });

      setCurrentRotation((prev) => {
        const next = prev + velocityRef.current;
        currentRotationRef.current = next;
        return next;
      });

      requestRef.current = requestAnimationFrame(smoothRotation);
    } else {
      if (autoRotateEnabledRef.current && !isHovering.current) {
        autoRotate();
      }
    }
  }, [autoRotate]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMouseDown = (e: MouseEvent) => {
      setIsDragging(true);
      setStartX(e.clientX);
      startXRef.current = e.clientX;
      velocityRef.current = 0;
      cancelFrame();
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const deltaX = e.clientX - startXRef.current;
      const nextRotation = currentRotationRef.current - deltaX;

      setRotation(nextRotation);
      rotationRef.current = nextRotation;

      velocityRef.current = deltaX * 0.15;
    };

    const onMouseUp = () => {
      if (!isDraggingRef.current) return;
      setIsDragging(false);

      setCurrentRotation(rotationRef.current);
      currentRotationRef.current = rotationRef.current;

      smoothRotation();
    };

    const onTouchStart = (e: TouchEvent) => {
      const x = e.touches[0].clientX;
      setIsDragging(true);
      setStartX(x);
      startXRef.current = x;
      velocityRef.current = 0;
      cancelFrame();
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current) return;
      const deltaX = e.touches[0].clientX - startXRef.current;
      const nextRotation = currentRotationRef.current - deltaX;

      setRotation(nextRotation);
      rotationRef.current = nextRotation;

      velocityRef.current = deltaX * 0.15;
    };

    const onTouchEnd = () => {
      if (!isDraggingRef.current) return;
      setIsDragging(false);

      setCurrentRotation(rotationRef.current);
      currentRotationRef.current = rotationRef.current;

      smoothRotation();
    };

    const onMouseEnter = () => {
      isHovering.current = true;
      cancelFrame();
    };

    const onMouseLeave = () => {
      isHovering.current = false;
      if (autoRotateEnabledRef.current && !isDraggingRef.current) {
        autoRotate();
      }
    };

    el.addEventListener("mouseenter", onMouseEnter);
    el.addEventListener("mouseleave", onMouseLeave);
    el.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: true });
    el.addEventListener("touchend", onTouchEnd);

    if (autoRotateEnabledRef.current) {
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
  }, [ref, autoRotate, smoothRotation, cancelFrame]);

  return { rotation };
}
