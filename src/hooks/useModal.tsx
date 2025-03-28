import { useState, useCallback } from "react";
import Modal from "@/components/Modal/Modal";

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [Component, setComponent] = useState<React.FC<any> | null>(null);
  const [componentProps, setComponentProps] = useState<any>({});

  const openModal = useCallback(
    (NewComponent: React.FC<any>, props: any = {}) => {
      setComponent(() => NewComponent);
      setComponentProps(props);
      setIsOpen(true);
    },
    []
  );

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setTimeout(() => {
      setComponent(null);
      setComponentProps({});
    }, 300);
  }, []);

  // ✅ JSX에서 <ModalWrapper /> 로 쓸 수 있도록 함수형 컴포넌트로 반환
  const ModalWrapper = () => {
    if (!isOpen || !Component) return null;
    return (
      <Modal onClose={closeModal}>
        <Component {...componentProps} />
      </Modal>
    );
  };

  return {
    openModal,
    closeModal,
    ModalWrapper,
    isOpen,
  };
};

export default useModal;
