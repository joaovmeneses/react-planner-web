"use client";

import Modal from "react-modal";

interface ModalErrorProps {
  error: string;
  handleClose: () => void;
}

const ModalError: React.FC<ModalErrorProps> = ({ error, handleClose }) => {
  Modal.setAppElement('body')
  return (
    <Modal
      className="fixed inset-0 z-50 flex justify-center items-center bg-gray-800 bg-opacity-75"
      overlayClassName="fixed z-50 inset-0 flex justify-center items-center"
      isOpen={error !== ""}
      onRequestClose={handleClose}
      shouldCloseOnOverlayClick={true}
    >
      <div className="flex flex-col items-center bg-[#7367f0] rounded-lg p-8 max-w-md">
        <h3 className="text-xl w-full text-center mr-1 mb-4">Erro</h3>
        <p className="mb-4">{error}</p>
        <div className="flex justify-end">
          <button
            className="px-4 py-2 text-center bg-[#5e56d8] text-white rounded-lg hover:bg-[#4c43b9]"
            onClick={handleClose}
          >
            Fechar
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalError;

