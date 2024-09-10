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

  const handleCreateFromConcurso = async () => {
    router.push('/novo-ciclo/por-concurso');
  };

  return (
    <>
      <div className='flex flex-col gap-10'>
        <section className='flex flex-col items-center'>
          <div className='flex flex-col items-center gap-5 px-4 w-full md:w-7/12 text-center'>
            <h1 className='w-4/5 text-xl md:text-2xl font-semibold'>Selecione o seu Ciclo para Começar!</h1>
            <p className='text-sm font-extralight text-balance'>
              Bem-vindo ao nosso gerenciador de estudos para concursos. Aqui você pode criar seu ciclo de estudos
              personalizado de duas maneiras: Ciclo do Zero e Ciclo por Concurso. Com o Ciclo do Zero, você tem total
              liberdade para adicionar e organizar suas disciplinas e horários. Já com o Ciclo por Concurso, você pode
              basear seu ciclo no concurso escolhido, recebendo uma organização de matérias e horários feita para
              otimizar seus estudos. Escolha a opção que melhor se adapta às suas necessidades e comece a estudar de
              forma mais eficiente.
            </p>
          </div>
        </section>
        <section>
          <div className='grid grid-flow-row gap-5 lg:gap-0 lg:grid-flow-col'>
            <CycleCard
              title='Ciclo do Zero'
              description='Crie seu ciclo de estudos do zero, totalmente personalizado para suas necessidades. Adicione suas disciplinas, organize seus horários e defina suas metas de estudo de acordo com suas preferências. Essa opção é ideal para quem gosta de ter controle total sobre o seu planejamento e quer adaptar o ciclo conforme seu próprio ritmo e estilo de aprendizado. Dê um nome ao seu novo ciclo e comece agora mesmo a sua jornada rumo ao sucesso nos concursos.'
              onSubmit={handleCreateFromZero}
            />
            <CycleCard
              title='Ciclo por Concurso'
              description='Escolha seu concurso e crie um ciclo de estudos baseado nele. Nesse modelo, selecionamos as matérias mais relevantes e organizamos um plano de estudos eficiente para você. Esta opção é perfeita para quem deseja um guia estruturado e otimizado para o concurso escolhido e que pode ser adaptado de acordo com suas necessidades, garantindo que você foque nos tópicos mais importantes e maximize seu desempenho. Clique no botão para começar e deixe a gente ajudar você a alcançar seus objetivos.'
              onSubmit={handleCreateFromConcurso}
            />
          </div>
        </section>
      </div>
      <Loading isLoading={isLoading} />
    </>
  )
}

export default NovoCiclo
