"use client"

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faTrash, faCheck } from "@fortawesome/free-solid-svg-icons";

interface CardBodyProps {
  nome: string;
  horasObjetivo: number;
  status: string;
  id: string;
  indice: number;
  className?: string;
}

export default function CardBody({ nome, horasObjetivo, status, id, indice, className }: CardBodyProps) {
  
  const formatNumber = (num: number): string => {
    return num.toString().padStart(2, '0');
  };
  
  const converteTempo = (horasObjetivo: number) => {
    const horas = Math.floor(horasObjetivo / 3600);
    const minutos = Math.floor((horasObjetivo % 3600) / 60);
    const segundos = Math.floor(horasObjetivo % 60);
  
    return `${formatNumber(horas)}:${formatNumber(minutos)}:${formatNumber(segundos)}`;
  };

  return (
    <div className={`p-4 my-4 border-2 rounded-lg ${className} ${
        status === 'em andamento' ? 'border-orange-400' :
        status === 'não iniciado' ? 'border-green-400' :
        status === 'completo' ? 'border-gray-400' : 'border-gray-200'
      }`}>
      <div className='flex flex-col items-center'>
        <h1 className='text-base font-semibold text-gray-700'>{nome}</h1>
        <h2 className='text-lg text-gray-500 mt-2'>
          {converteTempo(horasObjetivo)}
        </h2>
        <div className='flex justify-around w-full mt-4'>
          <button className='bg-transparent text-green-500 hover:text-green-600'>
            <FontAwesomeIcon icon={faCog} />
          </button>
          <button className='bg-transparent text-red-500 hover:text-red-600'>
            <FontAwesomeIcon icon={faTrash} />
          </button>
          <button className='bg-transparent text-green-500 hover:text-green-600'>
            <FontAwesomeIcon icon={faCheck} />
          </button>
        </div>
      </div>
    </div>
  );
}
