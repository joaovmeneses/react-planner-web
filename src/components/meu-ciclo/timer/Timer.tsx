'use client'

import React, { useState, useEffect } from 'react'

interface TimercardProps {
  id: string | undefined;
  horas_objetivo: number | undefined;
  horas_estudadas: number | undefined;
  timeOut: () => void;
  resetTimer: boolean;
  isDisabled: boolean;
  status: string | undefined;
  onCompleteDisciplina: () => void;
  onUpdateHorasEstudadas: (id: string, horasEstudadas: number) => void;
}

const Timercard: React.FC<TimercardProps> = ({
  id,
  horas_objetivo,
  horas_estudadas,
  timeOut,
  resetTimer,
  isDisabled,
  status,
  onCompleteDisciplina,
  onUpdateHorasEstudadas
}: TimercardProps) => {
  const tempoInicial = 0;

  const [timeFloor, setTimeFloor] = useState(0)
  const [startUpdateTime, setStartUpdateTime] = useState(0)
  const [startTime, setStartTime] = useState(Math.floor(Date.now() / 1000))
  const [tempoRestante, setTempoRestante] = useState(tempoInicial)
  const [tempoAtualizar, setTempoAtualizar] = useState(tempoInicial)
  const [pausado, setPausado] = useState(true)
  const [incrementoEstudo, setIncrementoEstudo] = useState(0);

  const iniciarTimer = () => {
    if (isDisabled) return;
    setPausado(false);
    setIncrementoEstudo(0);
    setStartTime(Math.floor(Date.now() / 1000))
    setStartUpdateTime(Math.floor(Date.now() / 1000))
  }

  useEffect(() => {
    let temporizador: NodeJS.Timeout | undefined;

    if (!pausado) {
      temporizador = setInterval(() => {
        
        if (status == "finalizado") {
          clearInterval(temporizador);
          if (id) onUpdateHorasEstudadas(id, horas_estudadas! + incrementoEstudo);
          onCompleteDisciplina();
          timeOut();

          return;
        }

        const curTime = Math.floor(Date.now() / 1000)
        const elapsedTime = (curTime - startTime!) + timeFloor

        setTempoRestante(elapsedTime);
        setIncrementoEstudo((prev) => prev + 1);
        setTempoAtualizar((curTime - startUpdateTime!));

        
        if (tempoAtualizar >= 10) {
          if (id) {
            onUpdateHorasEstudadas(id, horas_estudadas! + incrementoEstudo);
            setIncrementoEstudo(0);
          }

          setTempoAtualizar(0); 
          setStartUpdateTime(Math.floor(Date.now() / 1000))
        }
      }, 1000); 
    }

    return () => clearInterval(temporizador);
  }, [pausado, horas_estudadas, horas_objetivo, incrementoEstudo, tempoAtualizar, id]);



  const pausarTimer = () => {
    if (id !== undefined && !isDisabled) {
      setPausado(true);
      setTimeFloor(tempoRestante)

      if (id) {
        onUpdateHorasEstudadas(id, horas_estudadas! + incrementoEstudo);
        setIncrementoEstudo(0);
      }
    }
  };

  useEffect(() => {
    setTempoRestante(tempoInicial);
    setPausado(true);
    setTimeFloor(0)
    console.log("Cronómetro reset")
  }, [id, resetTimer]);

  useEffect(() => {
    if (isDisabled && !pausado) {
      setPausado(true);
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
            onClick={() => pausarTimer()}
            disabled={pausado || isDisabled}
          >
            Pausar
          </button>
        </div>
      </div>
    </div>
  )
}

export default Timercard;
