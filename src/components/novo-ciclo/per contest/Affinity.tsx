"use client"

import React, { useState } from "react"

import type { Disciplinas } from "@/interfaces/PerCycle"
import Subject from "./Subject"

interface AffinityComponentProps{
    onSelect: (selectedAffinities: Disciplinas[]) => void;
    onBack: (stage:number) => void;
    stage: number;
    affinities: Disciplinas[];
}

const AffinityComponent: React.FC<AffinityComponentProps> = ({onSelect,onBack,stage,affinities}) =>{

    const [isSelectionValid, setIsSelectionValid] = useState<boolean>(false);
    const [selectedAffinities,setSelectedAffinities] = useState<Disciplinas[]>(affinities)

    const handleUpdateAffinity = (updatedAffinity: Disciplinas) => {
        const updatedAffinities = selectedAffinities.map((affinity) =>
          affinity.nome === updatedAffinity.nome ? updatedAffinity : affinity
        );

        setSelectedAffinities(updatedAffinities);
        console.log(updatedAffinities);
        
        const isValid = updatedAffinities.every((affinity) => affinity.afinidade !== null);

        setIsSelectionValid(isValid);
      };

    const handleButtonFinalize = () =>{
        if(isSelectionValid){
            onSelect(selectedAffinities);
        }
    }

    const handleButtonChangeBack = () =>{
        onBack(stage-1);
    }

    return(
        <div className="flex flex-col gap-4 ">
            <h2 className="text-[#5e5873] font-medium text-2xl px-10">Afinidades</h2>
            <div className="px-10">
                <div className="flex justify-between border-y-2 border-[#f3f2f7] bg-[#f3f2f7] pr-24 pl-4 py-2 text-sm">
                    <p>DISCIPLINA</p>
                    <div className="flex gap-40">
                        <p>INICIANTE</p>
                        <p>INTERMEDIÁRIO</p>
                        <p>AVANÇADO</p>
                    </div>
                </div>
                {affinities.map((affinity, index) => (
                    <Subject
                    key={index}
                    index={index}
                    affinity={affinity}
                    onUpdateAffinity={handleUpdateAffinity}
                    />
                ))}
            </div>
            <div className="my-7 h-1 border-t-2 border-[#dfdfdf]"/>
            <div className="flex justify-between text-sm text-white px-10 mt-5">
                <button className="flex gap-2 py-2 px-5 bg-[#a855f7]" onClick={handleButtonChangeBack}>
                    <img src="/images/per-contest/left arrow.svg" alt="" />
                    <p className="text-white font-semibold">Voltar</p>
                </button>
                <button className={`flex gap-2 py-2 px-4 ${isSelectionValid ? 'bg-[#a855f7]' : 'bg-[#dcdbe2]'}`} onClick={handleButtonFinalize}>
                    <p className="text-white font-semibold">Finalizar</p>
                    <img src="/images/per-contest/rigth arrow.svg" alt="" />
                </button>
            </div>
        </div>
    )
}

export default AffinityComponent;