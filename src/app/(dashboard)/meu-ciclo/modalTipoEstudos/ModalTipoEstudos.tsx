'use client'
import type { ChangeEvent} from 'react';
import React, { useState } from 'react'
 
import StatusDisciplina from '@/enums/Status'
import TipoEstudos from '@/enums/TipoEstudos'

interface ModalTipoDeEstudosProps {
  onClose: () => void
  onSubmit: (status: string, tipoEstudo?: string[]) => void
}

const ModalTipoEstudos = ({ onClose, onSubmit }: ModalTipoDeEstudosProps) => {
  const [tipos, setTipos] = useState<string[]>([])

  const handleTipoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      tipos.push(e.target.value)
    } else {
      const updatedTipos = tipos.filter(element => element !== e.target.value)

      setTipos(updatedTipos)
    }
  }

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
          <h2 className='text-xl font-bold text-orange-500'>Selecione o tipo de estudo:</h2>
        </div>
        <div className='p-4 mb-4'>
          <form className='flex flex-col'>
            <div className='space-x-2'>
              <input
                type='checkbox'
                id={TipoEstudos.PDF}
                name={TipoEstudos.PDF}
                value={TipoEstudos.PDF}
                onChange={handleTipoChange}
              />
              <label htmlFor={TipoEstudos.PDF}>PDF</label>
            </div>

            <div className='space-x-2'>
              <input
                type='checkbox'
                id={TipoEstudos.VIDEO_AULA}
                name={TipoEstudos.VIDEO_AULA}
                value={TipoEstudos.VIDEO_AULA}
                onChange={handleTipoChange}
              />
              <label htmlFor={TipoEstudos.VIDEO_AULA}>Vídeo Aula</label>
            </div>

            <div className='space-x-2'>
              <input
                type='checkbox'
                id={TipoEstudos.LIVRO}
                name={TipoEstudos.LIVRO}
                value={TipoEstudos.LIVRO}
                onChange={handleTipoChange}
              />
              <label htmlFor={TipoEstudos.LIVRO}>Livro</label>
            </div>

            <div className='space-x-2'>
              <input
                type='checkbox'
                id={TipoEstudos.QUESTOES}
                name={TipoEstudos.QUESTOES}
                value={TipoEstudos.QUESTOES}
                onChange={handleTipoChange}
              />
              <label htmlFor={TipoEstudos.QUESTOES}>Questões</label>
            </div>

            <div className='space-x-2'>
              <input
                type='checkbox'
                id={TipoEstudos.RESUMO}
                name={TipoEstudos.RESUMO}
                value={TipoEstudos.RESUMO}
                onChange={handleTipoChange}
              />
              <label htmlFor={TipoEstudos.RESUMO}>Resumo</label>
            </div>

            <button
              type='button'
              onClick={() => {
                onSubmit(StatusDisciplina.FINALIZADA, tipos.length > 0 ? tipos : undefined)
              }}
              className='w-fit self-end px-4 py-2 bg-orange-500 text-white rounded-lg'
            >
              Concluir
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ModalTipoEstudos
