

interface ModalDeleteProps{
    onClose: React.MouseEventHandler<HTMLButtonElement>,
    onDelete: React.MouseEventHandler<HTMLButtonElement>,
}

const ModalDelete: React.FC<ModalDeleteProps> = ({onClose,onDelete}) =>{
    return (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-800 bg-opacity-75">
          <div className="bg-white rounded-lg p-8 max-w-md">
            <h3 className="text-xl mb-4">Quer eliminar o ciclo?</h3>
            <div className="flex justify-end">
              <button
                className="px-4 py-2 mr-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={onDelete}
              >
                Sim
              </button>
              <button
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                onClick={onClose}
              >
                Não
              </button>
            </div>
          </div>
        </div>
      );
    };

export default ModalDelete;