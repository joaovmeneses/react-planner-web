'use client'
import React, { ReactNode, useState } from 'react'
import { useRouter } from 'next/navigation'
import { FromZeroPayload } from '@/app/(dashboard)/novo-ciclo/page'

interface CardProps {
  title: string
  description?: string
  onSubmit?: (value: FromZeroPayload) => void
}

const CicleCard = ({ title, description, onSubmit }: CardProps) => {
  const hasInput = onSubmit !== undefined
  const [inputValue, setInputValue] = useState<string>('')

  const Button: ReactNode = (
    <button
      onClick={() => {
        onSubmit && onSubmit({ nome: inputValue })
      }}
      className={`${!inputValue ? 'invisible py-0 mt-0 h-0' : 'block mt-5 py-2'} bg-primary text-white hover:shadow-primaryLg hover:cursor-pointer px-5 w-full rounded-md text-sm text-center font-semibold`}
    >
      Começar
    </button>
  )

  return (
    <div className='bg-backgroundPaper shadow-secondaryMd rounded-md mx-2 h-fit'>
      <h2 className='text-primary p-5 font-semibold'>{title}</h2>
      <div className='flex flex-col items-center p-5 pt-0'>
        <p className='text-center text-xs'>
          {description
            ? description
            : `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. olor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua`}
        </p>
        <hr className='border-t border-t-gray-500 border-opacity-30 m-4 w-full' />
        <div className='w-full h-fit'>
          {hasInput && (
            <input
              placeholder='Dê um nome ao seu Novo Ciclo'
              onChange={e => setInputValue(e.target.value)}
              className='block bg-backgroundPaper text-sm text-textPrimary py-2 px-5 focus:placeholder:pl-1 placeholder:transition-all placeholder:duration-300 border rounded border-gray-500 border-opacity-30 focus:border-opacity-100 focus:border-primary focus:outline-none focus:shadow-primaryMd w-full'
            />
          )}
          {hasInput ? (
            Button
          ) : (
            <a
              href={''}
              className={`block bg-primary text-white hover:shadow-primaryLg hover:cursor-pointer py-2 px-5 w-full rounded-md text-sm text-center font-semibold`}
            >
              Começar
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default CicleCard
