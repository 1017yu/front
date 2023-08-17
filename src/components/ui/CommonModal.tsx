import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import Button from '@/components/ui/Button';
import { useModal } from '@/hooks/useModal';

export const CommonModal = () => {
  const { modalDataState, closeModal } = useModal();

  const handleCancelClick = () => {
    if (modalDataState.cancelCallback) {
      modalDataState.cancelCallback();
    }
    closeModal();
  };

  const handleOkClick = () => {
    if (modalDataState.okCallback) {
      modalDataState.okCallback();
    }
    closeModal();
  };

  return (
    <>
      {modalDataState.isOpen && (
        <Transition appear show={modalDataState.isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6"
                    >
                      {modalDataState.title}
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-subTextAndBorder">
                        {modalDataState.content}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      {modalDataState.type === 'twoButton' ? (
                        <div className="mt-4 w-20">
                          <Button
                            contents={modalDataState.okButton || '확인'}
                            onClick={handleOkClick}
                          />
                        </div>
                      ) : null}
                      <div className="mt-4 w-20">
                        <Button
                          contents={modalDataState.cancelButton || '취소'}
                          onClick={handleCancelClick}
                        />
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      )}
    </>
  );
};
