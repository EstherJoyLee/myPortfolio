import React from "react";
import styles from "./CloseButton.module.scss";

interface CloseButtonProps {
  onClick: () => void; // 닫기 버튼 클릭 시 실행할 함수
  position?: Partial<{
    top: number | string;
    right: number | string;
    bottom: number | string;
    left: number | string;
  }>;
  // ✅ 부분적으로만 받을 수 있도록 `Partial` 적용
}

const CloseButton: React.FC<CloseButtonProps> = ({
  onClick,
  position = {},
}) => {
  const style = {
    ...(position.top !== undefined && { top: `${position.top}` }),
    ...(position.right !== undefined && { right: `${position.right}` }),
    ...(position.bottom !== undefined && { bottom: `${position.bottom}` }),
    ...(position.left !== undefined && { left: `${position.left}` }),
  };

  return (
    <button className={styles.closeButton} style={style} onClick={onClick}>
      ✖
    </button>
  );
};

export default CloseButton;
