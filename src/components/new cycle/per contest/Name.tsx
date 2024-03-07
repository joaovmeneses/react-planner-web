"use client"

import React, { useState } from "react"

interface PositionComponentProps{
    onSelect: (name:string, stage:number) => void;
    onBack: (stage:number) => void;
    stage: number;
}

const NameComponent: React.FC<PositionComponentProps> = ({onSelect,onBack,stage}) =>{

    const [option,setOption] = useState<string>();

    const handleSelectChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        const selectedContest = e.target.value;
        if (selectedContest) {
            setOption(selectedContest);
            
    }
    };

    const handleButtonChange = () =>{
        if(option){
            let newStage = 1 + stage; 
            onSelect(option,newStage)
        }
    }

    const handleButtonChangeBack = () =>{
        onBack(stage-1);
    }

    return(
        <div>
            <div className="flex flex-col gap-4 px-10">
                <h3 className="text-[#5e5873] font-medium text-2xl">Nome</h3>
                <input className="bg-white border-2 rounded focus:border-[#a855f7] focus:shadow-[#a855f7] focus:shadow-sm p-2 border-[#dcdbe2] outline-none"  
                type="text" 
                onChange={handleSelectChange} 
                placeholder="Nome do curso"/>
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

export default NameComponent;