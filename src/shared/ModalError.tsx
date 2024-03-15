"use client";

import Modal from "react-modal";

interface ModalErrorProps {
  error: string;
  handleClose: () => void;
}

const ModalError: React.FC<ModalErrorProps> = ({ error, handleClose }) => {
  return (
    <Modal
      className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-75"
      overlayClassName="fixed inset-0 flex justify-center items-center"
      isOpen={error !== ""}
      onRequestClose={handleClose}
      shouldCloseOnOverlayClick={true}
    >
      <div className="flex flex-col items-center bg-purple-500 rounded-lg p-8 max-w-md">
        <h3 className="text-xl mb-4">Erro</h3>
        <p className="mb-4">{error}</p>
        <div className="flex justify-end">
          <button
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-900 mr-2"
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

