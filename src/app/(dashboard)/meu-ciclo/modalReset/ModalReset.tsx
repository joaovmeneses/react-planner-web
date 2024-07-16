import React from 'react'

interface ModalResetProps {
  onClose: () => void
  onSubmit: () => void
}

const ModalReset = ({ onClose, onSubmit }: ModalResetProps) => {
  return (
    <div className='fixed inset-0 flex items-center justify-center z-40 bg-black bg-opacity-50'>
      <div className='bg-light dark:bg-dark rounded-lg shadow-lg w-96 relative'>
        <button
          onClick={onClose}
          className='absolute top-[-20px] right-[6px] text-orange-500 dark:bg-[#283046] bg-[#f8f8f8] px-2 py-0.5 text-xl rounded z-50 transform translate-x-1/2 translate-y-1/2 hover:top-[-18px] hover:right-[8px]'
        >
          &times;
        </button>
        <div className='flex bg-gray-200 dark:bg-[#161d31] rounded-t-lg h-16 justify-between items-center pl-4 mb-4'>
          <h2 className='text-xl font-bold text-orange-500'>Reiniciar Ciclo</h2>
        </div>
        <div className='p-4 mb-4 space-y-4'>
          <p>Você já finalizou este ciclo de estudos. Gostaria de reiniciá-lo?</p>
          <div className='flex justify-end space-x-3 w-full'>
            <button
              className='w-fit px-4 py-2 bg-orange-500 text-white rounded-lg'
              onClick={onSubmit}
            >
              Sim
            </button>
            <button
              className='w-fit px-4 py-2 bg-orange-500 text-white rounded-lg'
              onClick={onClose}
            >
              Não
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalReset
