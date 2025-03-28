import React, { useEffect, useRef, useState } from "react";
import { getAllVideoUrls } from "@/utils/getAllVideos";
import styles from "./Player.module.scss";
import CloseButton from "../Buttons/CloseButton";
import Loader from "../Loader/Loader";

interface PlayerProps {
  prosNcons: string;
  videoId: string; // 여전히 고유 식별자로 사용됨
  timestamp: number;
  isPortrait: Boolean;
  onClose: () => void;
}

const Player: React.FC<PlayerProps> = ({
  prosNcons,
  videoId,
  timestamp,
  isPortrait,
  onClose,
}) => {
  const [loading, setLoading] = useState(true);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  console.log("isPortrait: ", isPortrait);
  useEffect(() => {
    const fetchVideoUrl = async () => {
      try {
        const urls = await getAllVideoUrls();
        // console.log("📦 [Firebase] 전체 video URLs:", urls);

        // ✅ videoId가 포함된 URL 찾기 (파일명 or ID 기준)
        const matchedUrl = urls.find((url) => url.includes(videoId));
        // console.log("🔍 매칭된 video URL:", matchedUrl);
        if (matchedUrl) setVideoUrl(matchedUrl);
        else
          console.error(`❌ 해당 videoId(${videoId})로 매칭된 URL이 없습니다.`);
      } catch (err) {
        console.error("🔥 Firebase Storage URL 가져오기 실패:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideoUrl();
  }, [videoId]);

  useEffect(() => {
    if (videoRef.current) {
      console.log("▶️ 영상 태그 참조 성공:", videoRef.current);
      videoRef.current.currentTime = timestamp;
    }
  }, [videoUrl, timestamp]);

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
          <CloseButton onClick={onClose} position={{ top: 0, right: 0 }} />
        </div>

        <div
          className={
            isPortrait
              ? `${styles.player} ${styles.playerPortrait}`
              : styles.player
          }
        >
          {loading && <Loader size={40} />}

          {!loading && videoUrl && (
            <video
              ref={videoRef}
              controls
              autoPlay
              className={styles.video}
              onLoadedMetadata={() => {
                if (videoRef.current) videoRef.current.currentTime = timestamp;
              }}
            >
              <source src={videoUrl} type="video/mp4" />
              ⚠️ 지원되지 않는 브라우저입니다.
            </video>
          )}

          {!loading && !videoUrl && (
            <p className={styles.error}>해당 비디오를 찾을 수 없습니다 😢</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Player;
