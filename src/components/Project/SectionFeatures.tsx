// components/Project/SectionFeatures.tsx
import styles from "./Project.module.scss";

interface Feature {
  title: string;
  desc: string[];
}

interface Props {
  mainFeatures: Feature[];
}

export default function SectionFeatures({ mainFeatures }: Props) {
  return (
    <div className={`section ${styles.section}`} id={styles.section4}>
      <div className="slide">
        <div className={styles.sectionInner}>
          <h1>
            <i>💡</i> Main Features
          </h1>
        </div>
      </div>
      <div className="slide">
        <div className={styles.sectionInner}>
          <div className={styles.featureContent}>
            {mainFeatures.map((feature, idx) => (
              <div key={idx} className={styles.featureItemWrapper}>
                {/* Left: Title */}
                <div className={styles.featureLeft}>
                  <h2 className={styles.featureTitle}>{feature.title}</h2>
                </div>

                {/* Right: Description */}
                <ul className={styles.featureRight}>
                  {feature.desc.map((desc, i) => (
                    <li key={i} className={styles.featurePoint}>
                      <span className={styles.checkIcon}>✅</span>
                      <span>{desc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
