"use client";

import Button from "@/components/menu/Button";
import Card from "@/components/new cicle/Card";
import { ChangeEvent, useState } from "react";

export default function NovosCiclos() {
  const [inputValue, setInputValue] = useState("");

  const handlerInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handlerKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if(event.key === ' ' && !inputValue.trim()){
        event.preventDefault();
    }
  }

  return (
    <section className="flex flex-col text-5x mt-20 gap-16">
      <h2 className="text-center text-purple-400 text-2xl">
        Escolha um Ciclo para começar!
      </h2>
      <div className="flex justify-center gap-28">
        <Card
          title="Ciclo do Zero"
          text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus dolore rem qui officiis repellat? Voluptatum sit beatae animi cum, laudantium eveniet harum blanditiis exercitationem vel quia commodi veniam neque dolores?"
        >
          <input
            className="bg-[#F6F6F6] text-xs rounded w-full text-gray-500 py-2 px-3"
            type="text"
            placeholder="Escreva o nome de seu novo ciclo"
            onKeyDown={handlerKeyDown}
            onChange={handlerInputChange}
          />
          {inputValue && <button className="bg-[#7367f0] text-xs rounded w-full mt-3 py-2 px-3">Começar</button>}
        </Card>
        <Card
          title="Ciclo por Curso"
          text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus dolore rem qui officiis repellat? Voluptatum sit beatae animi cum, laudantium eveniet harum blanditiis exercitationem vel quia commodi veniam neque dolores?"
        >
          <button className="bg-[#CB55FF] text-center text-xs rounded w-full py-2 px-3">
            Começar
          </button>
        </Card>
      </div>
    </section>
  );
}
