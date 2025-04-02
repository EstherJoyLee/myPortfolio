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
      <ul>
        {lines.map((line, i) => (
          <li key={i}>{line}</li>
        ))}
      </ul>
    </div>
  );
};

export default ExperienceCard;
