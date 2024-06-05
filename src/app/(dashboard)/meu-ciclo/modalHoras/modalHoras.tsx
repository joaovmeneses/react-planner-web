import React, { useState, useEffect } from 'react'

interface ModalProps {
  onClose: () => void
  onSubmit: (horasObjetivo: number) => void
  initialHorasObjetivo?: number
  nomeDisciplina: string
}

const Modal: React.FC<ModalProps> = ({ onClose, onSubmit, initialHorasObjetivo, nomeDisciplina }) => {
  const initialHours = Math.floor((initialHorasObjetivo || 0) / 3600)
  const initialMinutes = Math.floor(((initialHorasObjetivo || 0) % 3600) / 60)
  const initialSeconds = Math.floor((initialHorasObjetivo || 0) % 60)

  const [hours, setHours] = useState(initialHours)
  const [minutes, setMinutes] = useState(initialMinutes)
  const [seconds, setSeconds] = useState(initialSeconds)

  useEffect(() => {
    setHours(initialHours)
    setMinutes(initialMinutes)
    setSeconds(initialSeconds)
  }, [initialHorasObjetivo])

  const handleSubmit = () => {
    const totalSeconds = hours * 3600 + minutes * 60 + seconds
    onSubmit(totalSeconds)
    onClose()
  }

  const formatNumber = (num: number): string => num.toString().padStart(2, '0')

  const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (/^\d*$/.test(value)) {
      setHours(Number(value))
    }
  }

  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (/^\d*$/.test(value) && Number(value) < 60) {
      setMinutes(Number(value))
    }
  }

  const handleSecondsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (/^\d*$/.test(value) && Number(value) < 60) {
      setSeconds(Number(value))
    }
  }

  return (
    <div className='fixed inset-0 flex items-center justify-center z-40 bg-black bg-opacity-50'>
      <div className='bg-light dark:bg-dark rounded-lg shadow-lg w-96 relative'>
        <button onClick={onClose} className='absolute top-[-20px] right-[6px] text-orange-500 dark:bg-[#283046] bg-[#f8f8f8] px-2 py-0.5 text-xl rounded z-50 transform translate-x-1/2 translate-y-1/2 hover:top-[-18px] hover:right-[8px]'>
          &times;
        </button>
        <div className='flex bg-gray-200 dark:bg-[#161d31] rounded-t-lg h-16 justify-between items-center pl-4 mb-4'>
          <h2 className='text-xl font-bold text-orange-500'>{nomeDisciplina}</h2>
        </div>
        <div className='p-4 mb-4'>
          <label className='block text-light-text dark:text-white mb-2'>Horas</label>
          <div className='flex items-center bg-gray-200 dark:bg-gray-800 rounded-lg p-2'>
            <input
              type='text'
              value={formatNumber(hours)}
              onChange={handleHoursChange}
              className='w-12 p-2 text-center bg-gray-200 dark:bg-gray-800 text-light-text dark:text-white border-none appearance-none'
            />
            <span className='mx-2 text-light-text dark:text-white'>:</span>
            <input
              type='text'
              value={formatNumber(minutes)}
              onChange={handleMinutesChange}
              className='w-12 p-2 text-center bg-gray-200 dark:bg-gray-800 text-light-text dark:text-white border-none'
            />
            <span className='mx-2 text-light-text dark:text-white'>:</span>
            <input
              type='text'
              value={formatNumber(seconds)}
              onChange={handleSecondsChange}
              className='w-12 p-2 text-center bg-gray-200 dark:bg-gray-800 text-light-text dark:text-white border-none'
            />
          </div>
          <div className='flex items-center mb-4'>
            <input type='checkbox' id='informarHorasCorridas' className='mr-2' />
            <label htmlFor='informarHorasCorridas' className='text-light-text dark:text-white'>
              Informar horas corridas
            </label>
          </div>
          <div className='flex justify-end'>
            <button onClick={handleSubmit} className='px-4 py-2 bg-orange-500 text-white rounded-lg'>
              Concluir
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
