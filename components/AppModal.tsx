import { FC, ReactNode, useState, useEffect, useRef } from "react";

interface ModalProps {
  children?: ReactNode;
  isOpen: Boolean;
  closeModal: () => void;
  className?: String;
}

const AppModal: FC<ModalProps> = ({ children, isOpen, closeModal, className }) => {
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
          <div className="fixed top-0 left-0 w-full z-50 h-screen flex items-center justify-center overflow-x-clip bg-[#000000CC]">
            <div ref={modalRef} className={`relative p-4 lg:p-6 -mt-16 max-w-5xl min-w-[365px] bg-dark-modal rounded-xl ${className}`}>
              <div onClick={() => closeModal()} className="cursor-pointer absolute top-6 right-6">
                <img src="/icons/close.svg" alt="close" />
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
