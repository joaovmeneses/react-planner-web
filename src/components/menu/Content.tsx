"use client";

import { useState } from "react";
import Button from "./Button";

export default function Content() {
  const [ocultarOpcoesCiclos, setMostrarOpcoesCiclos] = useState(true);
  const [ocultarOpcoesEdital, setMostrarOpcoesEdital] = useState(true);

  return (
    <section className="w-64 bg-purple-600 h-full">
      <div className="pt-14">
        <h2 className="pl-11 mb-10 text-gray-300">PÁGINAS</h2>
        <div>
          <hr />
          <Button root="/" image="./img/menu/home.svg">
            Início
          </Button>
          <hr />
          <div className={ocultarOpcoesCiclos ? "" : "flex flex-col bg-purple-800"}>
            <div className="flex justify-between">
              <Button image="./img/menu/circle.svg">
                Ciclos
              </Button>
                <button className="pr-4" onClick={() => setMostrarOpcoesCiclos(!ocultarOpcoesCiclos)}>
                  {ocultarOpcoesCiclos?<img src="/img/menu/down-arrow.svg" alt="" />:<img src="/img/menu/right-arrow.svg" alt="" />}
                </button>
            </div>
            <Button root="/" image="./img/menu/play-button.svg" show = {ocultarOpcoesCiclos}>
                <p className="text-gray-300">Meus Ciclos</p>
            </Button>
            <Button root="/" image="./img/menu/plus.svg" show = {ocultarOpcoesCiclos}>
            <p className="text-gray-300">Novos Ciclos</p>
            </Button>
          </div>
          <hr />
          <div className={ocultarOpcoesEdital ? "" : "flex flex-col bg-purple-800"}>
            <div className="flex justify-between">
              <Button image="./img/menu/file.svg">
                Edital
              </Button>
                <button className="pr-4" onClick={() => setMostrarOpcoesEdital(!ocultarOpcoesEdital)}>
                  {ocultarOpcoesEdital?<img src="/img/menu/down-arrow.svg" alt="" />:<img src="/img/menu/right-arrow.svg" alt="" />}
                </button>
            </div>
          </div>
          <hr />
        </div>
      </div>
    </section>
  );
}
