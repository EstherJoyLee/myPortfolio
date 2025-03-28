import { useRef } from "react";
import { videos, images } from "@/resources/js/assets";
import useModal from "@/hooks/useModal";
import styles from "./Main.module.scss";
import ProsNCons from "@/components/ProsNCons/ProsNCons";
import Project from "@/components/Project/Project";
import AboutMe from "@/components/AboutMe/AboutMe";
import useDragRotation from "@/hooks/useDragRotation";

const Main = () => {
  const circleRef = useRef<HTMLDivElement | null>(null); // circle 요소에 대한 ref
  const { openModal, ModalWrapper, isOpen } = useModal()!;
  const { rotation } = useDragRotation(circleRef, {
    autoRotate: !isOpen, // 모달이 열렸을 때는 자동 회전 중단
  });
  const articleRefs = useRef<(HTMLDivElement | null)[]>([]); // article 요소들을 위한 ref 배열

  // 각 article에 ref를 할당하는 함수
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
        {/* face1 완료*/}
        <article
          className={styles.face1}
          ref={(el) => setArticleRef(el as HTMLDivElement, 4)}
        >
          <h1>Profile</h1>
          <div className={styles.inner}>
            <div>
              <h3>PINKRABBIT</h3>
              <div className={styles.pic}>
                <video src={videos.bgVideo} muted autoPlay loop></video>
              </div>
              <h2>Who's PinkRabbit?</h2>
              <button
                onClick={(e) => {
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
          ref={(el) => setArticleRef(el as HTMLDivElement, 3)}
        >
          <h1>Pros & Cons</h1>
          <div className={styles.inner}>
            <div>
              <video src={videos.bgVideo} muted autoPlay loop></video>
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
                    onClick={() => openModal(ProsNCons, { jsonData: "const" })}
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
                <img src={images.line} alt="lines" />
              </div>
            </div>
          </div>
        </article>
        {/* face4 - JoyLog */}
        <article
          className={styles.face4}
          ref={(el) => setArticleRef(el as HTMLDivElement, 1)}
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
        {/* face5 - Nexmedia */}
        <article
          className={styles.face5}
          ref={(el) => setArticleRef(el as HTMLDivElement, 7)}
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
        {/* face6 - 법무법인선린 */}
        <article
          className={styles.face6}
          ref={(el) => setArticleRef(el as HTMLDivElement, 5)}
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

        {/* face8 */}
        {/* <article
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
        </article> */}
      </section>
      <ModalWrapper />
    </main>
  );
};

export default Main;
