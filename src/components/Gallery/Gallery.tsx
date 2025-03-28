import React from "react";
import styles from "./Gallery.module.scss";

const getImagePath = (imageName: string) => {
  return require(`@/resources/images/main/${imageName}.jpg`);
};

const Gallery = () => {
  const imageNames = ["member1", "member2", "member3"];
  const joinDate = ["2022-01-03", "2022-01-03", "2018-04-23"];

  return (
    <>
      {imageNames.map((imageName, index) => (
        <div key={imageName} className={styles.galleryWrapper}>
          <div className={styles.pic}>
            <img src={getImagePath(imageName)} alt={imageName} />
          </div>
          <div className={styles.con}>
            <h2>{imageName} Information</h2>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima,
              quibusdam.
            </p>
            <span>{joinDate[index]}</span>
          </div>
        </div>
      ))}
    </>
  );
};

export default React.memo(Gallery); // ✅ React.memo 적용
