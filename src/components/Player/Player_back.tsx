import React, { useEffect, useRef, useState } from "react";
import styles from "./Player.module.scss";
import CloseButton from "../Buttons/CloseButton";
import Loader from "../Loader/Loader";

interface PlayerProps {
  prosNcons: string;
  videoId: string;
  timestamp: number;
  onClose: () => void;
}

const Player: React.FC<PlayerProps> = ({
  prosNcons,
  videoId,
  timestamp,
  onClose,
}) => {
  const [loading, setLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!iframeRef.current) return;

    // ✅ MutationObserver로 iframe 내부 감지
    const observer = new MutationObserver(() => {
      const iframeDocument = iframeRef.current?.contentDocument;
      if (iframeDocument) {
        const button = iframeDocument.querySelector(
          `[aria-label="새 탭에서 보기"]`
        );
        if (button) {
          button.remove(); // ✅ "새 탭에서 보기" 버튼 제거
        }
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, []);

  // ✅ Google Drive의 미리보기 URL + 특정 시간(t=초단위) 적용
  const videoUrl = `https://drive.google.com/file/d/${videoId}/preview#t=${timestamp}s`;

  return (
    <div className={styles.playerWrapper} onClick={onClose}>
      <div
        className={styles.playerContent}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.playerTop}>
          <p className={styles.keyword}>
            🎬 {prosNcons} (시작 {timestamp}초)
          </p>
          {/* <button className={styles.button} onClick={onClose}>
            ✖
          </button> */}
          <CloseButton onClick={onClose} position={{ top: 0, right: 0 }} />
        </div>

        {/* ✅ Google Drive iframe으로 특정 시간부터 재생 */}
        <div className={styles.player}>
          {loading && <Loader size={40} />}
          <iframe
            ref={iframeRef}
            title="pros-and-cons"
            src={videoUrl}
            allow="autoplay; encrypted-media"
            allowFullScreen
            className={styles.video}
            onLoad={() => setLoading(false)}
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Player;
