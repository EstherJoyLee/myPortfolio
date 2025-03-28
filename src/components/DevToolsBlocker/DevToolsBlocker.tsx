import { useEffect } from "react";

const DevToolsBlocker = () => {
  useEffect(() => {
    console.log("🚀 개발자 도구 차단 컴포넌트가 마운트되었습니다.");
    // 1️⃣ F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U 키 방지
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === "F12" ||
        (event.ctrlKey && event.shiftKey && event.key === "I") ||
        (event.ctrlKey && event.shiftKey && event.key === "J") ||
        (event.ctrlKey && event.key === "U")
      ) {
        event.preventDefault();
      }
    };

    // 2️⃣ 우클릭 방지
    const handleContextMenu = (event: MouseEvent) => event.preventDefault();

    // 3️⃣ 개발자 도구 감지 (창 크기 변화 감지)
    const detectDevTools = () => {
      const threshold = 160;
      const widthDiff = window.outerWidth - window.innerWidth;
      const heightDiff = window.outerHeight - window.innerHeight;

      if (widthDiff > threshold || heightDiff > threshold) {
        document.body.innerHTML = ""; // 페이지 내용 삭제
        alert("개발자 도구가 감지되었습니다. 접근이 차단됩니다.");
        window.location.href = "about:blank";
      }
    };

    // 4️⃣ console 접근 감지 및 차단
    const detectConsoleAccess = () => {
      const element = new Image();
      Object.defineProperty(element, "id", {
        get: function () {
          alert("개발자 도구 접근이 감지되었습니다.");
          window.location.href = "about:blank";
        },
      });
      console.log("%c", element);
    };

    // 5️⃣ debugger 트릭 적용 (개발자 도구 실행 시 멈추게 함)
    const preventDebugging = () => {
      setInterval(() => {
        debugger;
      }, 1000);
    };

    // 6️⃣ Chrome 확장 프로그램 감지 및 차단

    // 이벤트 리스너 등록
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("contextmenu", handleContextMenu);
    window.addEventListener("resize", detectDevTools);
    setInterval(detectDevTools, 500);
    setInterval(detectConsoleAccess, 1000);
    preventDebugging();

    // 언마운트 시 이벤트 제거
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("contextmenu", handleContextMenu);
      window.removeEventListener("resize", detectDevTools);
    };
  }, []);

  return null;
};

export default DevToolsBlocker;
