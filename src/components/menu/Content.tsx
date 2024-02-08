"use client";

import { useState } from "react";
import Button from "./Button";

export default function Content() {
  const [ocultarOpcoesCiclos, setMostrarOpcoesCiclos] = useState(true);
  const [ocultarOpcoesEdital, setMostrarOpcoesEdital] = useState(true);

  return (
    <section className="w-64 bg-white h-full text-gray-400">
      <img className="mt-8 ml-12" src="/img/Logo_small.png" alt="Logo DEX" />
      <div className="pt-14 mx-5 ">
        <h2 className="pl-7 mb-10">PÁGINAS</h2>
        <div>
          <Button root="/site" image="/img/menu/home.png" image2="/img/menu/home_white.png">
            Início
          </Button>
          <div className={ocultarOpcoesCiclos ? "" : "flex flex-col"}>
            <div className="flex justify-between mt-8">
              <div className="flex pl-7 h-11 py-3 gap-4">
                <img src="/img/menu/circle.png" alt="" />
                Ciclos
              </div>
                <button className="pr-4" onClick={() => setMostrarOpcoesCiclos(!ocultarOpcoesCiclos)}>
                  {ocultarOpcoesCiclos?<img src="/img/menu/down-arrow.png" alt="" />:<img src="/img/menu/right-arrow.png" alt="" />}
                </button>
            </div>
            <Button root="/site/meus-ciclos" image="/img/menu/play-button.svg" image2="/img/menu/play-button-white.png" show = {ocultarOpcoesCiclos}>
                <p className="">Meus Ciclos</p>
            </Button>
            <Button root="/site/novos-ciclos" image="/img/menu/plus.svg" image2="/img/menu/plus_white.png" show = {ocultarOpcoesCiclos}>
                <p className="">Novos Ciclos</p>
            </Button>
          </div>
          <div className={ocultarOpcoesEdital ? "" : "flex flex-col"}>
            <div className="flex justify-between">
              <div className="flex pl-7 h-11 py-3 gap-4">
                <img src="/img/menu/file.png" alt="" />
                Edital
              </div>
                <button className="pr-4" onClick={() => setMostrarOpcoesEdital(!ocultarOpcoesEdital)}>
                  {ocultarOpcoesEdital?<img src="/img/menu/down-arrow.png" alt="" />:<img src="/img/menu/right-arrow.png" alt="" />}
                </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
