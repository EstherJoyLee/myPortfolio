import React from "react";
import styles from "./MainMobileCard.module.scss";

interface MainMobileCardProps {
  title: string;
  subtitle?: string;
  icon?: string;
  description?: string;
  onClick?: () => void;
  thumbnail?: React.ReactNode;
}

const MainMobileCard: React.FC<MainMobileCardProps> = ({
  title,
  subtitle,
  icon,
  description,
  onClick,
  thumbnail,
}) => {
  return (
    <div className={styles.card} onClick={onClick}>
      {thumbnail && <div className={styles.thumbnail}>{thumbnail}</div>}
      {icon && <div className={styles.icon}>{icon}</div>}
      <h2 className={styles.title}>{title}</h2>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      {description && <p className={styles.description}>{description}</p>}
    </div>
  );
};

export default MainMobileCard;
