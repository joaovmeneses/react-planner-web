'use client'
import React, { useState } from 'react'

import { useRouter } from 'next/navigation'

import Loading from '@/components/Loading/Loading'
import CycleCard from '@/components/novo-ciclo/CycleCard'
import api from '../../../../axiosConfig'


export interface FromZeroPayload {
  nome: string 
}

const NovoCiclo = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleCreateFromZero = async (value: FromZeroPayload) => {
    setIsLoading(true)
    const token = localStorage.getItem('token')

    const res = await api.post('/ciclo', value, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    router.push(`/meu-ciclo/${res.data.id}`)
  }

  return (
    <>
      <div className='flex flex-col gap-10'>
        <section className='flex flex-col items-center'>
          <div className='flex flex-col items-center gap-5 px-4 w-full md:w-7/12 text-center'>
            <h1 className='w-4/5 text-xl md:text-2xl font-semibold'>Selecione o seu Ciclo para Começar!</h1>
            <p className='text-sm font-extralight text-balance'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
              fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
            </p>
          </div>
        </section>
        <section>
          <div className='grid grid-flow-row gap-5 lg:gap-0 lg:grid-flow-col'>
            <CycleCard title='Ciclo do Zero' onSubmit={handleCreateFromZero} />
            <CycleCard title='Ciclo por Concurso' />
            <CycleCard title='Ciclo por Área' />
          </div>
        </section>
      </div>
      <Loading isLoading={isLoading} />
    </>
  )
}

export default NovoCiclo
