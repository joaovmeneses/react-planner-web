'use client'

import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faTrash, faCircleCheck } from '@fortawesome/free-solid-svg-icons'

interface CardBodyProps {
  nome: string
  horasObjetivo: number
  horasEstudadas: number
  id: string
  indice: number,
  status: string,
  className?: string
  onDelete: ((indice: number) => void) | null;
  onEdit: ((indice: number) => void) | null;
  onSelect: ((indice: number) => void) | null;
}

export default function CardBody({
  nome,
  horasObjetivo,
  indice,
  status,
  className,
  onDelete,
  onEdit,
  onSelect
}: CardBodyProps) {
  const formatNumber = (num: number): string => {
    return num.toString().padStart(2, '0')
  }

  const converteTempo = (horasObjetivo: number) => {
    const horas = Math.floor(horasObjetivo / 3600)
    const minutos = Math.floor((horasObjetivo % 3600) / 60)
    const segundos = Math.floor(horasObjetivo % 60)

    return `${formatNumber(horas)}:${formatNumber(minutos)}:${formatNumber(segundos)}`
  }

  const borderColor = status === 'finalizada' ? 'border-gray-400' : 'border-[#5c55bb]'

  return (
    <div onMouseDown={e => e.preventDefault()} className={`p-4 my-4 border-2 rounded-lg ${borderColor} ${className} `}>
      <div className='flex flex-col items-center'>
        <button
          onClick={() => onSelect?.(indice)}
          className={`absolute w-fit h-fit self-end mt-5 mr-3 top-0 right-0 bg-transparent p-1 rounded-sm ${status == 'finalizada' ? 'text-[#28c76f] hover:bg-[#28c76f] hover:bg-opacity-50' : 'text-gray-400'}`}
          disabled={!onSelect} 
        >
          <FontAwesomeIcon icon={faCircleCheck} />
        </button>
        <h1 className='text-base font-semibold text-light-text'>{nome}</h1>
        <h2 className='text-base text-light-text mt-2'>{converteTempo(horasObjetivo)}</h2>
        <div className='flex justify-around w-full mt-4'>
        {onEdit && (
          <button
            onClick={() => onEdit(indice)}
            className='bg-transparent p-2 text-[#28c76f] hover:bg-[#28c76f] hover:bg-opacity-50'
          >
            <FontAwesomeIcon icon={faCog} />
          </button>
        )}

        {onDelete && (
          <button
            onClick={() => onDelete(indice)}
            className='bg-transparent p-2 text-[#28c76f] hover:bg-[#28c76f] hover:bg-opacity-50'
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        )}
        </div>
      </div>
    </div>
  )
}
