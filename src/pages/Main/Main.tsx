import { useRef } from "react";
import { videos, images } from "@/resources/js/assets";
import useModal from "@/hooks/useModal";
import styles from "./Main.module.scss";
import ProsNCons from "@/components/ProsNCons/ProsNCons";
import Project from "@/components/Project/Project";
import AboutMe from "@/components/AboutMe/AboutMe";
import useDragRotation from "@/hooks/useDragRotation";
import CLEFModal from "@/components/CLEFModal";

const Main = () => {
  const circleRef = useRef<HTMLDivElement | null>(null);
  const { openModal, ModalWrapper, isOpen } = useModal()!;
  const { rotation } = useDragRotation(circleRef, {
    autoRotate: !isOpen,
  });
  const articleRefs = useRef<(HTMLDivElement | null)[]>([]);

  const setArticleRef = (el: HTMLDivElement | null, index: number) => {
    if (el) {
      articleRefs.current[index] = el;
    }
  };

  return (
    <main className={styles.wrap}>
      <video src={videos.bgVideo} loop muted autoPlay></video>

      <section
        id={styles.circle}
        ref={circleRef}
        style={{ transform: `rotateY(${rotation}deg)` }}
      >
        {/* face1 */}
        <article
          className={styles.face1}
          ref={(el) => setArticleRef(el as HTMLDivElement, 0)}
        >
          <h1>Profile</h1>
          <div className={styles.inner}>
            <div>
              <h3>PINKRABBIT</h3>
              <div className={styles.pic}>
                <video
                  src={videos.pinkRabbit}
                  preload="auto"
                  muted
                  autoPlay
                  loop
                ></video>
              </div>
              <h2>Who's PinkRabbit?</h2>
              <button
                onClick={() => {
                  openModal(AboutMe);
                }}
              >
                <img src={images.btn} alt="button" />
              </button>
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
          ref={(el) => setArticleRef(el as HTMLDivElement, 1)}
        >
          <h1>Pros & Cons</h1>
          <div className={styles.inner}>
            <div>
              <video src={videos.prosNcons} muted autoPlay loop></video>
              <ul>
                <li>
                  <button
                    className={styles.prosBtn}
                    onClick={() => openModal(ProsNCons, { jsonData: "pros" })}
                  >
                    Pros
                  </button>
                </li>
                <li>&</li>
                <li>
                  <button
                    className={styles.consBtn}
                    onClick={() => openModal(ProsNCons, { jsonData: "cons" })}
                  >
                    Cons
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </article>

        {/* face3 */}
        <article
          className={styles.face3}
          ref={(el) => setArticleRef(el as HTMLDivElement, 2)}
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
                  <li>CLEF</li>
                  <li>JoyLog</li>
                  <li>Nexmedia</li>
                  <li>법무법인선린</li>
                </ul>
                <img src={images.line} alt="lines" />
              </div>
            </div>
          </div>
        </article>

        {/* face4 - CLEF */}
        <article
          className={styles.face4}
          ref={(el) => setArticleRef(el as HTMLDivElement, 3)}
          onClick={() => openModal(CLEFModal, { openModal })}
          style={{ cursor: "pointer" }}
        >
          <h1>
            CLEF <span>[2025.01 - 현재]</span>
          </h1>
          <div className={styles.inner}>
            <div className={styles.projectLink}>
              <button onClick={() => openModal(CLEFModal, { openModal })}>
                CLEF
              </button>
              <p>🎵 CLEF에서 진행한 다양한 프로젝트</p>
            </div>
          </div>
        </article>

        {/* face5 - JoyLog */}
        <article
          className={styles.face5}
          ref={(el) => setArticleRef(el as HTMLDivElement, 4)}
          onClick={() => openModal(Project, { projectId: "joylog" })}
          style={{ cursor: "pointer" }}
        >
          <h1>
            JoyLog <span>[개인프로젝트]</span>
          </h1>
          <div className={styles.inner}>
            <div className={styles.projectLink}>
              <button
                onClick={() => openModal(Project, { projectId: "joylog" })}
              >
                JoyLog
              </button>
              <p>✏️ blog 웹 어플리케이션 프로젝트</p>
            </div>
          </div>
        </article>

        {/* face6 - NEXMEDIA */}
        <article
          className={styles.face6}
          ref={(el) => setArticleRef(el as HTMLDivElement, 5)}
          onClick={() => openModal(Project, { projectId: "solutionSystem" })}
          style={{ cursor: "pointer" }}
        >
          <h1>
            Nexmedia <span>[2020.03 - 2023.03]</span>
          </h1>
          <div className={styles.inner}>
            <div>
              <div className={styles.projectLink}>
                <button
                  onClick={() =>
                    openModal(Project, { projectId: "solutionSystem" })
                  }
                >
                  Solution
                  <br />
                  System
                </button>
                <p>💡 보안/라이선스 사유로 URL 및 결과물은 공개 불가</p>
              </div>
            </div>
            <div>
              <div className={styles.projectLink}>
                <button
                  onClick={() => openModal(Project, { projectId: "theSharp" })}
                >
                  The Sharp
                </button>
                <p>🏢 The Sharp 브랜드 사업지 전용 템플릿 사이트</p>
              </div>
            </div>
          </div>
        </article>

        {/* face7 - 법무법인선린 */}
        <article
          className={styles.face7}
          ref={(el) => setArticleRef(el as HTMLDivElement, 6)}
          onClick={() => openModal(Project, { projectId: "sunlin" })}
          style={{ cursor: "pointer" }}
        >
          <h1>
            법무법인선린 <span>[2024.05 - 2024.08]</span>
          </h1>
          <div className={styles.inner}>
            <div className={styles.projectLink}>
              <button
                onClick={() => openModal(Project, { projectId: "sunlin" })}
              >
                법무법인선린
              </button>
              <p>⚖️ 로펌 법무법인선린의 온라인 브랜드 사이트</p>
            </div>
          </div>
        </article>
      </section>

      <ModalWrapper />
    </main>
  );
};

export default Main;
