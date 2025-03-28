// components/Project/SectionResponsibilities.tsx
import styles from "./Project.module.scss";
import KeyResponsibilities from "@/components/KeyResponsibilities/KeyResponsibilities";
import { ProjectId } from "@/components/Project/Project"; // 여길 실제 경로로 수정

interface Props {
  projectId: ProjectId;
}

export default function SectionResponsibilities({ projectId }: Props) {
  return (
    <div className={`section ${styles.section}`} id={styles.section3}>
      <div className="slide">
        <div className={styles.sectionInner}>
          <h1>
            <i>👩🏻‍💻</i> Key Responsibilities
          </h1>
        </div>
      </div>
      <div className="slide">
        <div className={styles.sectionInner}>
          <KeyResponsibilities projectId={projectId} />
        </div>
      </div>
    </div>
  );
}
