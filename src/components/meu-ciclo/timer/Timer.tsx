'use client'

import { SelectedDisciplina } from '@/interfaces/meuCiclo';
import React, { useState, useEffect } from 'react'

interface TimercardProps {
  id: string | undefined;
  horasObjetivo: number | undefined;
  horasEstudadas: number | undefined;
  timeOut: () => void;
  resetTimer: boolean;
  isDisabled: boolean;
}

const Timercard: React.FC<TimercardProps> = ({
  id,
  horasObjetivo,
  horasEstudadas,
  timeOut,
  resetTimer,
  isDisabled  
}: TimercardProps) => {
  const tempoInicial = 0;

  const [tempoRestante, setTempoRestante] = useState(tempoInicial)
  const [pausado, setPausado] = useState(true)

  const iniciarTimer = () => {
    if (isDisabled) return;
    
    setPausado(false)
    console.log(horasObjetivo)
    console.log(horasEstudadas)
    console.log(tempoRestante)
  }

  useEffect(() => {
    let temporizador: string | number | NodeJS.Timeout | undefined

    if (!pausado) {
      temporizador = setInterval(() => {
        setTempoRestante(tempoAnterior => tempoAnterior! + 1)
      }, 1000)

      if(horasObjetivo && tempoRestante == horasObjetivo)
      {
        timeOut();
      }
    }

    return () => clearInterval(temporizador)
  }, [pausado, tempoRestante])

  useEffect(() => {
    setTempoRestante(tempoInicial);
    setPausado(true);
    console.log("Resetado")
  }, [id, resetTimer]);
            
  useEffect(() => {
    if (isDisabled && !pausado) {
      pausarTimer();
    }
  }, [isDisabled]);

  return (
    <div className='w-64 h-48 bg-light dark:bg-dark text-light-text dark:text-dark-text rounded-lg shadow-lg'>
      <h1 className='text-base text-[#5c55bb] pl-4 pt-2'>Cronômetro</h1>
      <div className='grid pt-8 pb-9'>
        <h1 className='flex justify-center text-2xl py-2'>
          {String(Math.floor(tempoRestante! / 3600)).padStart(2, '0')}:
          {String(Math.floor((tempoRestante! % 3600) / 60)).padStart(2, '0')}:
          {String(tempoRestante! % 60).padStart(2, '0')}
        </h1>
        <div className='flex justify-center w-full'>
          <button
            className={`${pausado ? 'bg-transparent' : 'bg-[#7367f0] bg-opacity-50'} text-base text-[#7367f0] rounded-l-lg px-4 py-1 border-[#7367f0] border-y-2 border-l-2`}
            onClick={() => {
              if (id !== undefined && !isDisabled) {
                iniciarTimer();
              }
            }}
            disabled={!pausado || isDisabled}
          >
            Ligar
          </button>
          <button
            className={`${pausado ? 'bg-[#7367f0] bg-opacity-50' : 'bg-transparent'} text-base text-[#7367f0] rounded-r-lg px-4 py-1 border-[#7367f0] border-2`}
            onClick={() => {
              if(id!==undefined && !isDisabled){
              setPausado(true)}
              }}
            disabled={pausado || isDisabled}
          >
            Pausar
          </button>
        </div>
      </div>
    </div>
  )
}

export default Timercard
