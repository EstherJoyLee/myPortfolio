import { RotatingLines } from "react-loader-spinner";
import styles from "./Loader.module.scss";

interface LoaderProps {
  size?: number;
  message?: string;
  fullscreen?: boolean; // ✅ `true`면 전체화면(fixed), `false`면 부모요소 안(absolute)
}

const Loader: React.FC<LoaderProps> = ({
  size = 60,
  message,
  fullscreen = false,
}) => {
  return (
    <div
      className={`${styles.loaderWrapper} ${
        fullscreen ? styles.fullscreen : ""
      }`}
    >
      <RotatingLines
        strokeColor="#FFF"
        strokeWidth="4"
        animationDuration="1"
        width={typeof size === "number" ? `${size}px` : size}
        visible
      />
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
};

export default Loader;
