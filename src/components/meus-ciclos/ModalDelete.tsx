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
  const [windowOrientation, setWindowOrientation] = useState(window.screen.orientation.type)
  const handleOrientation = () => {
    setWindowOrientation(window.screen.orientation.type)
  }
  useEffect(() => {
    handleOrientation()

    window.screen.orientation.addEventListener('change', handleOrientation)

    return () => {
      window.screen.orientation.addEventListener('change', handleOrientation)
    }
  }, [])
  return (
    <>
      <div className='bg-backdrop backdrop-blur-sm fixed inset-0 w-full z-40' />
      <div className='fixed lg:absolute inset-0 flex justify-center items-center w-full z-50'>
        <div
          className={`bg-backgroundPaper w-fit ${windowOrientation === 'portrait-primary' ? 'h-1/4' : 'h-1/2 lg:h-fit'} rounded-3xl mx-3 px-4 sm:py-4 lg:py-6 lg:px-6`}
        >
          <div className='flex flex-col justify-evenly lg:gap-10 items-center h-full'>
            <div className='flex flex-col justify-center sm:justify-evenly lg:gap-5 items-center text-center h-2/3'>
              <FontAwesomeIcon
                className='text-warning text-base lg:text-lg w-1/2 h-1/2 lg:w-1/5 lg:h-1/5'
                icon={faTriangleExclamation}
              />
              <p className={`text-base sm:text-lg md:text-xl `}>Tem certeza que deseja deletar este ciclo?</p>
            </div>
            <div className='flex justify-evenly items-center w-full h-1/5'>
              <button
                onClick={() => onSubmit(id)}
                className='bg-primary hover:brightness-125 text-white rounded-md text-lg md:text-xl w-1/3 h-fit px-4 py-1 hover:cursor-pointer'
              >
                Sim
              </button>
              <button
                onClick={onClose}
                className='bg-primary hover:brightness-125 text-white rounded-md text-lg md:text-xl w-1/3 h-fit px-4 py-1 hover:cursor-pointer'
              >
                Não
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ModalDelete
