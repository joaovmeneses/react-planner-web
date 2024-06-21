'use client'

import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faTrash, faCheck } from '@fortawesome/free-solid-svg-icons'

interface CardBodyProps {
  nome: string
  horasObjetivo: number
  status: string
  id: string
  indice: number
  className?: string
  onDelete: (indice: number) => void
  onEdit: (indice: number) => void
}

export default function CardBody({
  nome,
  horasObjetivo,
  status,
  id,
  indice,
  className,
  onDelete,
  onEdit
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

  return (
    <div onMouseDown={e => e.preventDefault()} className={`p-4 my-4 border-2 rounded-lg ${className}`}>
      <div className='flex flex-col items-center'>
        <h1 className='text-base font-semibold text-light-text'>{nome}</h1>
        <h2 className='text-base text-light-text mt-2'>{converteTempo(horasObjetivo)}</h2>
        <div className='flex justify-around w-full mt-4'>
          <button
            onClick={() => onEdit(indice)}
            className='bg-transparent text-[#28c76f] p-2 hover:bg-[#28c76f] hover:bg-opacity-50'
          >
            <FontAwesomeIcon icon={faCog} />
          </button>
          <button
            onClick={() => onDelete(indice)}
            className='bg-transparent p-2 text-[#28c76f] hover:bg-[#28c76f] hover:bg-opacity-50'
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
          <button className='bg-transparent text-[#28c76f] p-2 hover:bg-[#28c76f] hover:bg-opacity-50'>
            <FontAwesomeIcon icon={faCheck} />
          </button>
        </div>
      </div>
    </div>
  )
}
