import React from "react";
import styles from "./Modal.module.scss";
import CloseButton from "../Buttons/CloseButton";

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  return (
    <div className={styles.modalWrapper} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className={styles.modalContent}>
        <CloseButton
          onClick={onClose}
          position={{ top: "2rem", right: "2rem" }}
        />
        {children}
      </div>
    </div>
  );
};

export default Modal;
