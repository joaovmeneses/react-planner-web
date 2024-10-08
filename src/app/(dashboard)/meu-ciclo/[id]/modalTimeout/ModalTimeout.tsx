import React, { useEffect } from 'react'

interface ModalTimeoutProps {
  disciplina: string
  onClose: () => void
}

const ModalTimeout = ({ disciplina, onClose }: ModalTimeoutProps) => {

  useEffect(() => {
    const interval = setTimeout(() => {
      onClose()
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className='fixed inset-0 flex items-start justify-end z-header'>
        <div className='flex flex-col gap-0 space-y-0'>
          <div className='flex bg-green-500 rounded-t-lg h-10 justify-between items-center pl-4'>
            <h2 className='text-sm font-bold text-white'>Matéria Concluída!</h2>
            <button
              onClick={onClose}
              className='text-white mx-3 px-2 text-xl bg-transparent hover:bg-[#ffffff2f]'
            >
              &times;
            </button>
          </div>
          <div className='bg-[#0000004f] rounded-b-lg w-96 relative'>
            <div className='p-2 space-y-4'>
              <p>{disciplina}</p>
            </div>
        </div>
      </div>
    </div>
  )
}

export default ModalTimeout
