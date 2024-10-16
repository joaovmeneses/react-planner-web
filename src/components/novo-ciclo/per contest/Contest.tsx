"use client"

import React, { useState, useEffect } from "react"

import type { Contest } from "@/interfaces/PerCycle"
import { getContest } from "@/services/novosCiclos"

interface ContestComponentProps{
    onSelect: (contest:Contest,stage:number) => void;
    stage: number;
}

const ConstestComponent: React.FC<ContestComponentProps> = ({onSelect,stage}) =>{

    const [option,setOption] = useState<string>("");
    const [contests,setContests] = useState<Contest[]>([]);
    const [contest,setContest] = useState<Contest>()

    useEffect(()=>{
        async function fetchData(){
            const data = await getContest();

            setContests(data);
        }

        fetchData();
    },[])

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>)=>{
        const selectedContest = contests.find(contest => contest._id === e.target.value);
        
        if (selectedContest) {
            setOption(selectedContest._id);
            setContest(selectedContest);
    }
    };

    const handleButtonChange = () =>{
        if(contest){
            const newStage = 1 + stage;

            onSelect(contest,newStage)
        }
    }

    return(
        <div>
            <div className="flex flex-col gap-4 px-10">
                <h3 className="text-[#5e5873] font-medium text-2xl">Concurso</h3>
                <select className="bg-white border-2 rounded focus:border-[#a855f7] focus:shadow-[#a855f7] focus:shadow-sm p-2 border-[#dcdbe2] outline-none"
                id="dropdown"
                value={option}
                onChange={handleSelectChange}
                >
                    <option value="" disabled hidden></option>
                    {contests.map((contest) => (
                        <option key={contest._id} value={contest._id}>
                        {contest.nome}
                        </option>
                    ))}
                </select>
                <div className="flex gap-2">
                    <input type="checkbox" name="personalizado" id="personalizado" />
                    <label htmlFor="personalizado">Não tem o curso que você quer?</label>
                </div>
            </div>
            <div className="my-7 h-1 border-t-2 border-[#dfdfdf]"/>
            <div className="flex justify-end px-10 text-white">
                <button className={`flex gap-2 py-2 px-4 ${option ? 'bg-[#a855f7]' : 'bg-[#dcdbe2]'}`} onClick={handleButtonChange}>
                    <p className="text-white font-semibold">Próximo</p>
                    <img src="/images/per-contest/rigth arrow.svg" alt="" />
                </button>
            </div>
        </div>
    )
}

export default ConstestComponent;