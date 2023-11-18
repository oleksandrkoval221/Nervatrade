import { FC, ReactNode, useState, useEffect, useRef } from "react";

interface ModalProps {
  children?: ReactNode;
  isOpen: Boolean;
  closeModal: () => void
}

const AppModal: FC<ModalProps> = ({ children, isOpen, closeModal }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event: React.MouseEvent<HTMLElement>) {
      // @ts-ignore
      if (modalRef.current && !modalRef.current?.contains(event.target)) {
        closeModal();
      }
    }
    // @ts-ignore
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // @ts-ignore
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modalRef]);

  return (
    <>
      {
        isOpen ?
          <div className="fixed top-0 left-0 w-full z-50 h-screen flex items-center justify-center overflow-x-clip bg-[#0C0B1090]">
            <div ref={modalRef} className="relative p-4 lg:px-5 -mt-32 max-w-5xl min-w-[365px] bg-dark-modal rounded-lg min-h-[300px]">
              <div onClick={() => closeModal()} className="cursor-pointer absolute top-4 right-4">
                <img src="/icons/Close-round.svg" alt="close" />
              </div>
              {children}
            </div>
          </div>
          : <></>
      }
    </>
  );
};

export default AppModal;
