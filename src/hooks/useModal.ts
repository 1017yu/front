import { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { TModalType, TOpenModalType } from '@/types/TModalType';
import { modalState } from '@/states/ModalState';

export const useModal = () => {
  const [modalDataState, setModalDataState] =
    useRecoilState<TModalType>(modalState);

  // 모달 추가 - 중첩 가능
  const openModal = useCallback(
    (modal: TOpenModalType) => {
      setModalDataState({
        isOpen: true,
        ...modal,
      });
    },
    [setModalDataState],
  );

  // 취소
  const closeModal = useCallback(() => {
    setModalDataState((prev) => {
      return { ...prev, isOpen: false };
    });
  }, [setModalDataState]);

  return {
    modalDataState,
    openModal,
    closeModal,
  };
};
