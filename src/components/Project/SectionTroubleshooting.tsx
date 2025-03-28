// components/Project/SectionTroubleshooting.tsx
import styles from "./Project.module.scss";
import { JSX } from "react";

interface Props {
  troubleshootingAndSolutions: () => JSX.Element;
}

export default function SectionTroubleshooting({
  troubleshootingAndSolutions,
}: Props) {
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
          <div className={styles.troublesWrapper}>
            {troubleshootingAndSolutions()}
          </div>
        </div>
      </div>
    </div>
  );
}
