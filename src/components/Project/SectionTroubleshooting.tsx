// components/Project/SectionTroubleshooting.tsx
import styles from "./Project.module.scss";
import type { JSX, WheelEventHandler } from "react";

interface Props {
  troubleshootingAndSolutions?: () => JSX.Element;
}

export default function SectionTroubleshooting({
  troubleshootingAndSolutions,
}: Props) {
  const handleWheel: WheelEventHandler<HTMLDivElement> = (event) => {
    const target = event.currentTarget;
    const { scrollTop, scrollHeight, clientHeight } = target;

    if (scrollHeight <= clientHeight) return;

    const atTop = scrollTop <= 0;
    const atBottom = scrollTop + clientHeight >= scrollHeight - 1;
    const scrollingDown = event.deltaY > 0;
    const scrollingUp = event.deltaY < 0;

    if ((scrollingDown && !atBottom) || (scrollingUp && !atTop)) {
      event.stopPropagation();
    }
  };

  return (
    <div className={`section ${styles.section}`} id={styles.section5}>
      <div className="slide">
        <div className={styles.sectionInner}>
          <h1>
            <i>🕵🏻‍♀️</i> Troubleshooting & Solutions
          </h1>
        </div>
      </div>
      <div className="slide">
        <div className={styles.sectionInner}>
          <div className={styles.troublesWrapper} onWheel={handleWheel}>
            {troubleshootingAndSolutions ? (
              troubleshootingAndSolutions()
            ) : (
              <section>
                <h2>내용 준비 중</h2>
                <p>해당 프로젝트의 트러블슈팅 정리는 추후 업데이트 예정입니다.</p>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
