"use client"

import React, { useState } from "react"
import { Position } from "@/interfaces/PerCycle"

interface PositionComponentProps{
    onSelect: (contest:Position,stage:number) => void;
    onBack: (stage:number) => void;
    stage: number;
    positions?: Position[];
}

const PositionComponent: React.FC<PositionComponentProps> = ({onSelect,onBack,stage,positions}) =>{

    const [option,setOption] = useState<string>("");
    const [position,setPosition] = useState<Position>()

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>)=>{
        const selectedContest = positions?.find(position => position.nome === e.target.value);
        if (selectedContest) {
            setOption(selectedContest.nome);
            setPosition(selectedContest);
    }
    };

    const handleButtonChange = () =>{
        if(position){
            let newStage = 1 + stage; 
            onSelect(position,newStage)
        }
    }

    const handleButtonChangeBack = () =>{
        onBack(stage-1);
    }

    return(
        <div>
            <div className="flex flex-col gap-4 px-10">
                <h3 className="text-[#5e5873] font-medium text-2xl">Cargo</h3>
                <select className="bg-white border-2 rounded focus:border-[#a855f7] focus:shadow-[#a855f7] focus:shadow-sm p-2 border-[#dcdbe2] outline-none" 
                id="dropdown"
                value={option} 
                onChange={handleSelectChange}>
                    <option value="" disabled hidden></option>
                    {positions?.map((position) =>(
                        <option value={position.nome}>
                            {position.nome}
                        </option>
                    ))}
                </select>
            </div>
            <div className="my-7 h-1 border-t-2 border-[#dfdfdf]"/>
            <div className="flex justify-between text-sm text-white px-10 mt-5">
                <button className="flex gap-2 py-2 px-5 bg-[#a855f7]" onClick={handleButtonChangeBack}>
                    <img src="/img/per-contest/left arrow.svg" alt="" />
                    <p>Voltar</p>
                </button>
                <button className={`flex gap-2 py-2 px-4 ${option ? 'bg-[#a855f7]' : 'bg-[#dcdbe2]'}`} onClick={handleButtonChange}>
                    <p>Próximo</p>
                    <img src="/img/per-contest/rigth arrow.svg" alt="" />
                </button>
            </div>
        </div>
    )
}

export default PositionComponent;