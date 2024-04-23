"use client"

import React from "react";

export default function CardBody({ nome, horasObjetivo, status, id, indice }: { nome: string, horasObjetivo: number, status: string, id: string, indice: number }) {
  const converteTempo = (horasObjetivo: number) => {
    const horas = Math.floor(horasObjetivo / 3600);
    const minutos = Math.floor((horasObjetivo % 36000) / 60000);
    return `${horas}h${minutos}`;
  };

  // fazer o controle do indice e status para o timer
  // carrgar o id para algo?
  // transformar o card num button para interagir com o timer

  return (
    <div className='w-64 h-30 my-2 bg-white ring-2 ring-purple-600 houver:ring-orange-300 rounded-lg text-black-100'>
      <div className='grid pt-8 pb-7'>
        <h1 className='flex justify-center text-2xl'>{nome}</h1>
        <h1 className='flex justify-center text-2xl py-2'>
          {converteTempo(horasObjetivo)}
        </h1>
      </div>
    </div>
  );
}