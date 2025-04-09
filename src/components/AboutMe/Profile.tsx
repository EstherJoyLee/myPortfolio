// components/AboutMe/Profile.tsx
import React from "react";
import styles from "./AboutMe.module.scss";

const Profile = () => {
  return (
    <section className={styles.profile}>
      <div className={styles.profileLeft}>
        <img
          src="/resources/images/profile.jpg"
          width="200"
          height="200"
          alt="이주희"
          loading="lazy"
        />
      </div>
      <div className={styles.profileRight}>
        <h1>Juhee Lee</h1>
        <p className={styles.jobTitle}>
          I don’t just build interfaces—I shape their meaning.
        </p>
        <ul className={styles.contactList}>
          <li>📧 bonjourjj3@gmail.com</li>
          <li>
            🔗{" "}
            <a
              href="https://github.com/EstherJoyLee"
              target="_blank"
              rel="noreferrer"
            >
              github.com/EstherJoyLee
            </a>
          </li>
          <li>🎓 걔원예술대학교 시각디자인학과</li>
          <li>🎓 한양사이버대학교 컴퓨터공학과</li>
          <li>🗓 웹퍼블리셔 경력 4년</li>
        </ul>
      </div>
    </section>
  );
};

export default Profile;
