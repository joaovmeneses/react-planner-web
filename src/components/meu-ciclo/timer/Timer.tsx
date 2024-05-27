"use client"

import React, { useState, useEffect } from 'react';

interface TimercardProps {
  nome: string;
  horasObjetivo: number;
  horasEstudadas: number | null;
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
    <div className='w-64 h-48 bg-[#283046] rounded-lg text-[#b9bbc2] shadow-lg'>
      <h1 className='text-base text-[#5c55bb] pl-4 pt-2'>Cronômetro</h1>
      <div className='grid pt-8 pb-9'>
        <h1 className='flex justify-center text-2xl py-2'>
          {String(Math.floor(tempoRestante / 3600)).padStart(2, '0')}:
          {String(Math.floor((tempoRestante % 3600) / 60)).padStart(2, '0')}:
          {String(tempoRestante % 60).padStart(2, '0')}
        </h1>
        <div className='flex justify-center w-full'>
          <button className={`${pausado ? 'bg-transparent' : 'bg-[#7367f0]'} text-lg text-[#5c55bb] rounded-l-lg px-2 py-1 border-[#6960da] border-y-2 border-l-2`} onClick={iniciarTimer} disabled={!pausado}>Ligar</button>
          <button className={`${pausado ? 'bg-[#7367f0]' : 'bg-transparent'} text-lg text-[#5c55bb] rounded-r-lg px-1 py-1 border-[#6960da] border-2`} onClick={pausarTimer} disabled={pausado}>Pausar</button>
        </div>
      </div>
    </div>
  );
};

export default Timercard;
