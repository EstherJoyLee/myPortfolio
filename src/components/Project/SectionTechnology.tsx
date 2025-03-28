// components/Project/SectionTechnology.tsx
import styles from "./Project.module.scss";

interface Props {
  technologyStack: {
    frontEnd: React.ReactNode[];
    backEnd: React.ReactNode[];
  };
}

export default function SectionTechnology({ technologyStack }: Props) {
  return (
    <div className={`section ${styles.section}`} id={styles.section2}>
      <div className="slide">
        <div className={styles.sectionInner}>
          <h1>
            <i>💻</i> Technology Stack
          </h1>
        </div>
      </div>

      <div className="slide">
        <div className={styles.sectionInner}>
          <div className={styles.stackWrapper}>
            <h1>Front-end</h1>
            <ul className={styles.iconWrapper}>
              {technologyStack.frontEnd.map((stack, index) => (
                <li key={index}>{stack}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {technologyStack.backEnd.length > 0 && (
        <div className="slide">
          <div className={styles.sectionInner}>
            <div className={styles.stackWrapper}>
              <h1>Back-end</h1>
              <ul className={styles.iconWrapper}>
                {technologyStack.backEnd.map((stack, index) => (
                  <li key={index}>{stack}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
