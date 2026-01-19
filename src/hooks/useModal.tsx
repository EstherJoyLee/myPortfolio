import { useState, useCallback } from "react";
import Modal from "@/components/Modal/Modal";

interface ModalStackItem {
  component: React.FC<any>;
  props: any;
}

const useModal = () => {
  const [modalStack, setModalStack] = useState<ModalStackItem[]>([]);

  const openModal = useCallback(
    (NewComponent: React.FC<any>, props: any = {}) => {
      setModalStack((prev) => [...prev, { component: NewComponent, props }]);
    },
    [],
  );

  const closeModal = useCallback(() => {
    setModalStack((prev) => {
      if (prev.length === 0) return prev;
      return prev.slice(0, -1);
    });
  }, []);

  // 현재 표시할 모달 (스택의 마지막 항목)
  const currentModal = modalStack[modalStack.length - 1];
  const isOpen = modalStack.length > 0;

  // ✅ JSX에서 <ModalWrapper /> 로 쓸 수 있도록 함수형 컴포넌트로 반환
  const ModalWrapper = () => {
    if (!isOpen || !currentModal) return null;
    return (
      <Modal onClose={closeModal}>
        <currentModal.component
          {...currentModal.props}
          openModal={openModal}
          closeModal={closeModal}
        />
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
