// components/Project/SectionIntro.tsx
import styles from "./Project.module.scss";

interface Props {
  projectId: string;
  project: {
    name: string;
    progressPeriod: string;
    liveDemoUrl: string;
    testBlogUrl?: string;
    mobileLiveDemoUrl?: string;
    gitRepositoryUrl?: string | null;
  };
}

export default function SectionIntro({ projectId, project }: Props) {
  const hasLiveDemo =
    Boolean(project.liveDemoUrl) && project.liveDemoUrl !== "about:blank";

  return (
    <div className={`section ${styles.section}`} id={styles.section1}>
      <div className={styles.sectionInner}>
        <div className={styles.projectIntro}>
          <h1>
            <i>✏️</i> {project.name} <span>[{project.progressPeriod}]</span>
          </h1>
          {hasLiveDemo ? (
            <a href={project.liveDemoUrl} target="_blank" rel="noreferrer">
              <i>🔗</i> Live Demo
            </a>
          ) : (
            <span className={styles.privateLink}>
              <i>🔒</i> Live Demo (비공개)
            </span>
          )}
          {project.testBlogUrl ? (
            <a href={project.testBlogUrl} target="_blank" rel="noreferrer">
              <i>🔗</i>Test BLog Live Demo
            </a>
          ) : (
            ""
          )}
          {project.mobileLiveDemoUrl ? (
            <a
              href={project.mobileLiveDemoUrl}
              target="_blank"
              rel="noreferrer"
            >
              <i>🔗</i>Mobile Live Demo
            </a>
          ) : (
            ""
          )}
          {project.gitRepositoryUrl && (
            <a href={project.gitRepositoryUrl} target="_blank" rel="noreferrer">
              <i>🔗</i> Git Repository
            </a>
          )}
        </div>
        <span className={styles.scrollDown}>
          scroll down <i className="fas fa-angle-down"></i>
        </span>
      </div>
    </div>
  );
}
