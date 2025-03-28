import { useEffect, useRef, useState } from "react";
import { videos, images } from "@/resources/js/assets";
import Gallery from "@/components/Gallery/Gallery";
import useModal from "@/hooks/useModal";
import styles from "./Main.module.scss";
import ProsNCons from "@/components/ProsNCons/ProsNCons";

const Main = () => {
  const circleRef = useRef<HTMLDivElement | null>(null); // circle 요소에 대한 ref
  const articleRefs = useRef<(HTMLDivElement | null)[]>([]); // article 요소들을 위한 ref 배열
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [currentRotation, setCurrentRotation] = useState(0);
  const requestRef = useRef<number | null>(null);
  const autoRotateSpeed = useRef(0.2); // ⭐ 자동 회전 속도
  const { openModal, ModalWrapper } = useModal();

  useEffect(() => {
    const circle = circleRef.current;
    if (!circle) return;

    let velocity = 0; // 속도 변수

    // 🎯 마우스 드래그 시작
    const handleMouseDown = (e: MouseEvent) => {
      setIsDragging(true);
      setStartX(e.clientX);
      velocity = 0; // 드래그 시작 시 속도 초기화
      if (requestRef.current) cancelAnimationFrame(requestRef.current); // 기존 애니메이션 중지
    };

    // 🎯 마우스 이동 중 (드래그)
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - startX;
      setRotation(currentRotation - deltaX * 0.2);
      velocity = deltaX * 0.1; // 이동 속도 기록
    };

    // 🎯 마우스 놓기 (드래그 종료 → 부드럽게 감속 후 자동 회전 재개)
    const handleMouseUp = () => {
      if (!isDragging) return;
      setIsDragging(false);
      setCurrentRotation(rotation);
      smoothRotation(); // 감속하면서 자연스럽게 회전
    };

    const handleMouseOver = () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current); // 기존 애니메이션 중지
    };

    const handleMouseLeave = () => {
      autoRotate(); // 마우스가 벗어나면 자동 회전 재개
    };

    // 📌 자동 회전 함수
    const autoRotate = () => {
      if (!isDragging) {
        setRotation((prev) => prev + autoRotateSpeed.current);
        setCurrentRotation((prev) => prev + autoRotateSpeed.current);
      }
      // requestRef.current = requestAnimationFrame(autoRotate);
    };

    // 📌 마우스를 놓았을 때 부드럽게 감속 후 자동 회전으로 복귀
    const smoothRotation = () => {
      if (!circleRef.current) return;
      velocity *= 0.95; // 점점 속도를 줄여 부드럽게 멈추도록 설정
      if (Math.abs(velocity) > 0.1) {
        setRotation((prev) => prev + velocity);
        setCurrentRotation((prev) => prev + velocity);
        requestRef.current = requestAnimationFrame(smoothRotation);
      } else {
        autoRotate(); // 감속 후 자동 회전 재개
      }
    };

    // 🟢 자동 회전 시작
    // requestRef.current = requestAnimationFrame(autoRotate);

    // 이벤트 등록
    circle.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    circle.addEventListener("mouseover", handleMouseOver);
    circle.addEventListener("mouseleave", handleMouseLeave);

    // 클린업
    return () => {
      circle.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      circle.removeEventListener("mouseover", handleMouseOver);
      circle.removeEventListener("mouseleave", handleMouseLeave);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isDragging, rotation, currentRotation]);

  // 각 article에 ref를 할당하는 함수
  const setArticleRef = (el: HTMLDivElement | null, index: number) => {
    if (el) {
      articleRefs.current[index] = el;
    }
  };

  const openProsNConsModal = (type: "pros" | "cons") => {
    openModal(ProsNCons, { jsonData: type });
  };

  return (
    <main className={styles.wrap}>
      <video src={videos.bgVideo} loop muted autoPlay></video>
      <section
        id={styles.circle}
        ref={circleRef}
        style={{ transform: `rotateY(${rotation}deg)` }}
      >
        {/* face1 완료*/}
        <article
          className={styles.face1}
          ref={(el) => setArticleRef(el as HTMLDivElement, 4)}
        >
          <h1>PINKRABBIT</h1>
          <div className={styles.inner}>
            <div>
              <h3>
                {/* <img src={images.tit} alt="PINKRABBIT" /> */}
                PINKRABBIT
              </h3>
              <div className={styles.pic}>
                {/* <img src={images.pinkRabbit} alt="pickRabbit" /> */}
              </div>
              <h2>Who's PinkRabbit?</h2>
              <a href="#" onClick={(e) => e.preventDefault()}>
                <img src={images.btn} alt="button" />
              </a>
              <img
                src={images.reflect}
                alt="reflection"
                className={styles.reflect}
              />
            </div>
          </div>
        </article>
        {/* face2 */}
        <article
          className={styles.face2}
          ref={(el) => setArticleRef(el as HTMLDivElement, 2)}
        >
          <h1>Alter Ego</h1>
          <div className={styles.inner}>
            <Gallery />
          </div>
        </article>
        {/* face3 */}
        <article
          className={styles.face3}
          ref={(el) => setArticleRef(el as HTMLDivElement, 3)}
        >
          <h1>Pros & Cons</h1>
          <div className={styles.inner}>
            <div>
              <video src={videos.fc4Video} controls autoPlay loop></video>
              <ul>
                <li>
                  <button
                    className={styles.prosBtn}
                    onClick={() => openProsNConsModal("pros")}
                  >
                    Pros
                  </button>
                </li>
                <li>&</li>
                <li>
                  <button
                    className={styles.consBtn}
                    onClick={() => openProsNConsModal("cons")}
                  >
                    Cons
                  </button>
                </li>
              </ul>
            </div>

            {/* <div>
              <h2>Information</h2>
              <p>Lorem ipsum dolor sit amet.</p>
              <em>2022-03-02</em>
            </div> */}
          </div>
        </article>

        {/* face4 */}
        <article
          className={styles.face4}
          ref={(el) => setArticleRef(el as HTMLDivElement, 6)}
        >
          <h1>Portfolio</h1>
          <div className={styles.inner}>
            <div>
              <div>
                <video src={videos.loopVideo} autoPlay loop muted></video>
                <h2>
                  PinkRabbit's <br /> Portfolio
                </h2>
                <ul>
                  <li>JoyLog</li>
                  <li>Nexmedia</li>
                  <li>법무법인선린</li>
                </ul>
                {/* <img src={images.txt2} alt="Who's Next?" /> */}
                <img src={images.line} alt="lines" />
              </div>
            </div>
          </div>
        </article>
        {/* face5 - JoyLog */}
        <article
          className={styles.face5}
          ref={(el) => setArticleRef(el as HTMLDivElement, 1)}
        >
          <h1>
            JoyLog <span>[개인프로젝트]</span>
          </h1>
          <div className={styles.inner}>
            {/* <div className={styles.videoWrapper}>
              <video controls autoPlay loop muted>
                <source
                  src="/resources/videos/joylog.mp4"
                  type="video/mp4"
                ></source>
                <source
                  src="/resources/videos/joylog.webm"
                  type="video/webm"
                ></source>
                Your browser does not support the video tag.
              </video>
            </div> */}
            <div className={styles.projectLink}>
              <button>JoyLog</button>
            </div>
          </div>
        </article>
        {/* face6 - Nexmedia */}
        <article
          className={styles.face6}
          ref={(el) => setArticleRef(el as HTMLDivElement, 7)}
        >
          <h1>
            Nexmedia <span>[2020.03 - 2023.03]</span>
          </h1>
          <div className={styles.inner}>
            {/* <div className={styles.videoWrapper}>
              <video controls autoPlay loop muted>
                <source
                  src="/resources/videos/nexmedia_theSharp.mp4"
                  type="video/mp4"
                ></source>
                <source
                  src="/resources/videos/nexmedia_theSharp.webm"
                  type="video/webm"
                ></source>
                Your browser does not support the video tag.
              </video>
            </div> */}
            <div className={styles.projectLink}>
              <button>Solution System</button>
            </div>
            <div>
              {/* <div className={styles.videoWrapper}>
                <video
                  src="/resources/videos/nexmedia_DESIAN.mp4"
                  controls
                  autoPlay
                  loop
                  muted
                >
                  <source
                    src="/resources/videos/nexmedia_DESIAN.mp4"
                    type="video/mp4"
                  ></source>
                  <source
                    src="/resources/videos/nexmedia_DESIAN.webm"
                    type="video/webm"
                  ></source>
                  Your browser does not support the video tag.
                </video>
              </div> */}
              <div className={styles.projectLink}>
                <button>The Sharp</button>
              </div>
            </div>
            <div>
              {/* <div className={styles.videoWrapper}>
                <video
                  src="/resources/videos/nexmedia_solutionSystem.mp4"
                  controls
                  autoPlay
                  loop
                  muted
                >
                  <source
                    src="/resources/videos/nexmedia_solutionSystem.mp4"
                    type="video/mp4"
                  ></source>
                  <source
                    src="/resources/videos/nexmedia_solutionSystem.webm"
                    type="video/webm"
                  ></source>
                  Your browser does not support the video tag.
                </video>
              </div> */}
              <div className={styles.projectLink}>
                <button>DESIAN</button>
              </div>
            </div>
          </div>
        </article>
        {/* face7 - 법무법인선린 */}
        <article
          className={styles.face7}
          ref={(el) => setArticleRef(el as HTMLDivElement, 5)}
        >
          <h1>
            법무법인선린 <span>[2024.05 - 2024.08]</span>
          </h1>
          <div className={styles.inner}>
            {/* <div>
              <div className={styles.videoWrapper}>
                <video
                  src="/resources/videos/sunlin_official.mp4"
                  controls
                  autoPlay
                  loop
                  muted
                >
                  <source
                    src="/resources/videos/sunlin_official.mp4"
                    type="video/mp4"
                  ></source>
                  <source
                    src="/resources/videos/sunlin_official.webm"
                    type="video/webm"
                  ></source>
                  Your browser does not support the video tag.
                </video>
              </div>
            </div> */}
            <div className={styles.projectLink}>
              <button>법무법인선린</button>
            </div>
            <div>
              {/* <div className={styles.videoWrapper}>
                <video
                  src="/resources/videos/sunlin_revival.mp4"
                  controls
                  autoPlay
                  loop
                  muted
                >
                  <source
                    src="/resources/videos/sunlin_revival.mp4"
                    type="video/mp4"
                  ></source>
                  <source
                    src="/resources/videos/sunlin_revival.webm"
                    type="video/webm"
                  ></source>
                  Your browser does not support the video tag.
                </video>
              </div> */}
              <div className={styles.projectLink}>
                <button>선린개인회생</button>
              </div>
            </div>
          </div>
        </article>

        {/* face8 */}
        <article
          className={styles.face8}
          ref={(el) => setArticleRef(el as HTMLDivElement, 0)}
        >
          <h1>Contact</h1>
          <div className={styles.inner}>
            <div>
              <p>
                <i className="fab fa-android"></i>
              </p>
              <h2>Android</h2>
            </div>
            <div>
              <p>
                <i className="fab fa-apple"></i>
              </p>
              <h2>Apple</h2>
            </div>
            <div>
              <p>
                <i className="fab fa-twitter-square"></i>
              </p>
              <h2>Twitter</h2>
            </div>
            <div>
              <p>
                <i className="fab fa-facebook-square"></i>
              </p>
              <h2>Facebook</h2>
            </div>
            <div>
              <p>
                <i className="fab fa-youtube"></i>
              </p>
              <h2>Youtube</h2>
            </div>
            <div>
              <p>
                <i className="fab fa-google-play"></i>
              </p>
              <h2>Google</h2>
            </div>
          </div>
        </article>
      </section>
      <ModalWrapper />
    </main>
  );
};

export default Main;
