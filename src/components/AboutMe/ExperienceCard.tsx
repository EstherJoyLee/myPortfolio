// components/AboutMe/ExperienceCard.tsx
import React from "react";
import styles from "./AboutMe.module.scss";

const ExperienceCard = ({
  title,
  lines,
  emoji,
}: {
  title: string;
  lines: string[];
  emoji?: string;
}) => {
  return (
    <div className={styles.card}>
      <h3>
        {emoji && `${emoji} `}
        {title}
      </h3>
      {lines.map((line, i) => (
        <p key={i}>{line}</p>
      ))}
    </div>
  );
};

export default ExperienceCard;
