import React, { memo } from "react";
import styles from "./CLEFModal.module.scss";
import Project from "@/components/Project/Project";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface CLEFModalProps {
  openModal?: (component: React.FC<any>, props?: any) => void;
}

const CLEFModal = ({ openModal }: CLEFModalProps) => {
  const clefProjects = [
    {
      id: "clef_project1",
      name: "AI Learning Platform",
      description: "음악 학습 AI 플랫폼",
      thumbnail: "🎵",
    },
    {
      id: "clef_project2",
      name: "Music Analytics",
      description: "음악 분석 및 통계",
      thumbnail: "📊",
    },
    {
      id: "clef_project3",
      name: "Collaboration Tool",
      description: "협업 도구",
      thumbnail: "🤝",
    },
    {
      id: "clef_project4",
      name: "Stream Service",
      description: "음악 스트리밍 서비스",
      thumbnail: "🎧",
    },
    {
      id: "clef_project5",
      name: "Mobile App",
      description: "모바일 어플리케이션",
      thumbnail: "📱",
    },
    {
      id: "clef_project6",
      name: "Web Dashboard",
      description: "웹 대시보드",
      thumbnail: "📈",
    },
    {
      id: "clef_project7",
      name: "API Service",
      description: "API 서비스",
      thumbnail: "🔌",
    },
    {
      id: "clef_project8",
      name: "Admin Panel",
      description: "관리자 패널",
      thumbnail: "⚙️",
    },
    {
      id: "clef_project9",
      name: "User Portal",
      description: "사용자 포털",
      thumbnail: "👤",
    },
    {
      id: "clef_project10",
      name: "Payment System",
      description: "결제 시스템",
      thumbnail: "💳",
    },
    {
      id: "clef_project11",
      name: "Recommendation Engine",
      description: "추천 엔진",
      thumbnail: "⭐",
    },
  ];

  const handleProjectClick = (projectId: string) => {
    console.log("프로젝트 클릭:", projectId);
    if (openModal) {
      console.log("프로젝트 모달 열기:", projectId);
      openModal(Project, { projectId });
    }
  };

  return (
    <div className={styles.modalContent}>
      <h1>CLEF Projects</h1>
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        spaceBetween={20}
        slidesPerView={3}
        className={styles.swiper}
      >
        {clefProjects.map((project) => (
          <SwiperSlide key={project.id} className={styles.swiperSlide}>
            <button
              className={styles.projectCard}
              onClick={() => handleProjectClick(project.id)}
            >
              <div className={styles.thumbnail}>{project.thumbnail}</div>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default memo(CLEFModal);
