'use client'
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useRef, useState } from 'react'

interface ModalProps {
  onClose: () => void
  onSubmit: (id: string) => Promise<void>
  id: string
}

const ModalDelete = ({ onClose, onSubmit, id }: ModalProps) => {
  // ajustar a responsividade do modal
  const [windowOrientation, setWindowOrientation] = useState(window.screen.orientation.type)
  const handleOrientation = () => {
    // pegar a orientação da tela
    setWindowOrientation(window.screen.orientation.type)
  }
  useEffect(() => {
    handleOrientation()

    window.addEventListener('orientationchange', handleOrientation)

    return () => {
      window.removeEventListener('orientationchange', handleOrientation)
    }
  }, [])

  return (
    <div className='bg-backdrop backdrop-blur-sm fixed inset-0 flex justify-center items-center w-full z-50'>
      <div
        className={`bg-backgroundPaper w-fit ${windowOrientation === 'portrait-primary' || windowOrientation === 'portrait-secondary' ? 'h-1/4' : 'h-1/2'} rounded-3xl mx-3 px-4 sm:py-4 lg:py-0 lg:px-6`}
      >
        <div className='flex flex-col justify-evenly items-center h-full'>
          <div className='flex flex-col justify-between sm:justify-evenly items-center text-center h-1/2'>
            <FontAwesomeIcon className='text-warning w-1/2 h-1/2' icon={faTriangleExclamation} />
            <p className={`text-base sm:text-lg md:text-2xl`}>Tem certeza que deseja deletar este ciclo?</p>
          </div>
          <div className='flex justify-evenly items-center w-full h-1/4'>
            <button
              onClick={() => onSubmit(id)}
              className='bg-primary hover:brightness-125 text-white rounded-md text-lg md:text-2xl w-1/3 md:w-1/4 h-fit px-4 py-1 hover:cursor-pointer'
            >
              Sim
            </button>
            <button
              onClick={onClose}
              className='bg-primary hover:brightness-125 text-white rounded-md text-lg md:text-2xl w-1/3 md:w-1/4 h-fit px-4 py-1 hover:cursor-pointer'
            >
              Não
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalDelete
