"use client"

import StageLogo from "@/components/new cycle/per contest/StageLogo"
import StageText from "@/components/new cycle/per contest/StageText"
import ContestComponent from "@/components/new cycle/per contest/Contest"
import { useState } from "react"
import { Affinity, Contest, Position } from "@/interfaces/PerCycle"
import PositionComponent from "@/components/new cycle/per contest/Position"
import NameComponent from "@/components/new cycle/per contest/Name"
import AffinityComponent from "@/components/new cycle/per contest/Affinity"

export default function PorConcurso(){

    const [contest,setContest] = useState<Contest>();
    const [position,setPosition] = useState<Position>();
    const [cycleName,setcycleName] = useState<string>();
    const [affinities,setAffinities] = useState<Affinity[]>();
    const [stage,setStage] = useState<number>(1);

    const handleContest = (contest:Contest,stage:number)=>{
        setContest(contest);
        setStage(stage);
    }

    const handlePosition = (position:Position,stage:number)=>{
        setPosition(position);
        setStage(stage);
    }

    const handleAffinities = (affinities:Affinity[])=>{
        setAffinities(affinities);
    }

    const handleName = (name:string,stage:number) =>{
        setcycleName(name);
        setStage(stage);
    }

    const onBack = (stage:number)=>{
        setStage(stage);
    }


    return(
        <section className="m-10">
            <h2 className="text-[#5e5873] text-3xl mb-10">Ciclo por Concurso</h2>
            <div className="bg-white text-[#3a3a3a] py-5">
                <div className="">
                    <div className="flex flex-col justify-center px-10">
                        <div className="flex justify-center">
                            <div className="flex">
                                <div className="mt-7 mr-3 h-1 w-20 border-t-2 border-white"/>
                                <StageLogo logo="/img/per-contest/rigth arrow.svg" check="/img/per-contest/Check.svg" stage={stage} moment={1}/>
                                <div className="mt-7 ml-3 h-1 w-20 border-t-2 border-[#dfdfdf]"/>
                            </div>
                            <div className="flex">
                                <div className="mt-7 mr-3 h-1 w-20 border-t-2 border-[#dfdfdf]"/>
                                <StageLogo logo="/img/per-contest/rigth arrow.svg" check="/img/per-contest/Check.svg" stage={stage} moment={2}/>
                                <div className="mt-7 ml-3 h-1 w-20 border-t-2 border-[#dfdfdf]"/>
                            </div>
                            <div className="flex">
                                <div className="mt-7 mr-3 h-1 w-20 border-t-2 border-[#dfdfdf]"/>
                                <StageLogo logo="/img/per-contest/Graduation Cap.svg" check="/img/per-contest/Check.svg" stage={stage} moment={3} cap = {true}/>
                                <div className="mt-7 ml-3 h-1 w-20 border-t-2 border-[#dfdfdf]"/>
                            </div>
                            <div className="flex">
                                <div className="mt-7 mr-3 h-1 w-20 border-t-2 border-[#dfdfdf]"/>
                                <StageLogo logo="/img/per-contest/rigth arrow.svg" stage={stage} moment={4}/>
                                <div className="mt-7 ml-3 h-1 w-20 border-t-2 border-white"/>
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <StageText title="Concurso" description="Selecione o Concurso" stage={stage} moment={1}/>
                            <StageText title="Cargo" description="Selecione o Cargo" stage={stage} moment={2}/>
                            <StageText title="Nome do Ciclo" description="Defina um nome para seu novo ciclo" stage={stage} moment={3}/>
                            <StageText title="Afinidade" description="Selecione a afinidade com as disciplinas" stage={stage} moment={4}/>
                        </div>
                    </div>
                </div>
                {stage===1&&(
                    <ContestComponent onSelect={handleContest} stage={stage}/>
                )}
                {stage===2&&(
                    <PositionComponent onSelect={handlePosition} onBack={onBack} stage={stage} positions={contest?.positions || []}/>
                )}
                {stage===3&&(
                    <NameComponent onSelect={handleName} onBack={onBack} stage={stage}/>
                )}
                {stage===4&&(
                    <AffinityComponent onSelect={handleAffinities} onBack={onBack} stage={stage} affinities={position?.affinies || []}/>
                )}
            </div>
        </section>
    )
}