import React, { memo } from "react";
import styles from "./CLEFModal.module.scss";
import Project from "@/components/Project/Project";
import { clefProjects } from "@/components/ProjectData/clef";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface CLEFModalProps {
  openModal?: (component: React.FC<any>, props?: any) => void;
}

const CLEFModal = ({ openModal }: CLEFModalProps) => {
  const handleProjectClick = (projectId: string) => {
    if (openModal) {
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
        loop={true}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
        }}
        className={styles.swiper}
      >
        {clefProjects.map((project) => (
          <SwiperSlide key={project.id} className={styles.swiperSlide}>
            <button
              className={styles.projectCard}
              style={{
                backgroundImage: `url('/resources/images/clef-projects/${project.image}')`,
              }}
              onClick={() => handleProjectClick(project.id)}
            >
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
