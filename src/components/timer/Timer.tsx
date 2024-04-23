"use client"

import React, { useState, useEffect } from 'react';
import TimerBar from './TimerBar';

interface TimercardProps {
  nome: string;
  horasObjetivo: number;
  horasEstudadas: number | null;
  indice: number;
}

const Timercard: React.FC<TimercardProps> = ({ nome, horasObjetivo, horasEstudadas }: TimercardProps) => {
  const tempoInicial = horasEstudadas !== null ? (horasObjetivo - horasEstudadas) : horasObjetivo;
  
  const [tempoRestante, setTempoRestante] = useState(tempoInicial);
  const [pausado, setPausado] = useState(true);

  const iniciarTimer = () => {
    setPausado(false);
  };

  const pausarTimer = () => {
    setPausado(true);
  };

  useEffect(() => {
    let temporizador: string | number | NodeJS.Timeout | undefined;

    if (!pausado && tempoRestante > 0) {
      temporizador = setInterval(() => {
        setTempoRestante((tempoAnterior) => tempoAnterior - 1);
      }, 1000);
    }

    return () => clearInterval(temporizador);
  }, [pausado, tempoRestante]);

  const calcularPorcentagem = () => {
    return ((horasObjetivo - tempoRestante) / horasObjetivo) * 100;
  };

  const timerBarProgres = {
    width: `${calcularPorcentagem()}%`,
    backgroundColor: 'purple',
    height: '20px',
  };

  return (
    <div className='w-64 h-48 bg-white rounded-lg text-white'>
      <h1 className='text-xl text-white pl-4 pt-2'>Cronômetro</h1>
      <div className='grid pt-8 pb-9'>
        <h1 className='flex justify-center text-2xl py-2'>{String(Math.floor(tempoRestante / 3600)).padStart(2, '0')}:{String(Math.floor((tempoRestante % 3600) / 60)).padStart(2, '0')}:{String(tempoRestante % 60).padStart(2, '0')}</h1>
        <div className='flex justify-center w-full'>
          <button className='bg-violet-600 rounded-l-lg px-2 py-1 ring-1 ring-violet-400 hover:bg-violet-700 hover:ring-2 hover:ring-violet-400' onClick={iniciarTimer} disabled={!pausado}>Ligar</button>
          <button className='bg-violet-600 rounded-r-lg px-1 py-1 ring-1 ring-violet-400 hover:bg-violet-700 hover:ring-2 hover:ring-violet-400' onClick={pausarTimer} disabled={pausado}>Pausar</button>
        </div>
      </div>
      <div className='border-x-2 border-black bg-black'>
        <TimerBar style={timerBarProgres} />
      </div>
    </div>
  );
};

export default Timercard;
