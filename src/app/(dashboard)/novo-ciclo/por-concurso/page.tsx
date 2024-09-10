"use client"

import { useState } from "react"

import { useRouter } from "next/navigation";

import StageLogo from "@/components/novo-ciclo/per contest/StageLogo"
import StageText from "@/components/novo-ciclo/per contest/StageText"
import ContestComponent from "@/components/novo-ciclo/per contest/Contest"
import type { Contest, CicloData, Disciplinas, Position } from "@/interfaces/PerCycle"
import PositionComponent from "@/components/novo-ciclo/per contest/Position"
import NameComponent from "@/components/novo-ciclo/per contest/Name"
import AffinityComponent from "@/components/novo-ciclo/per contest/Affinity"
import { getPosition, postCiclo, getUserId } from "@/services/novosCiclos"

export default function PorConcurso(){

    const router = useRouter();

    const [contest,setContest] = useState<Contest>();
    const [positions,setPositions] = useState<Position[]>();
    const [position,setPosition] = useState<Position>();
    const [cycleName,setcycleName] = useState<string>('');
    const [affinities,setAffinities] = useState<Disciplinas[]>();
    const [stage,setStage] = useState<number>(1);

    const handleContest = async (contest:Contest,stage:number)=>{
        setContest(contest);
        setStage(stage);
        const positionData = await getPosition(contest._id);

        setPositions(positionData);
    }

    const handlePosition = (position:Position,stage:number)=>{
        setPosition(position);
        setStage(stage);

        const disciplinasTransformadas = position.disciplinas.map(disciplina => ({
            ...disciplina,
            afinidade: null
        }));

        console.log(disciplinasTransformadas);
        setAffinities(disciplinasTransformadas);
    }

    const handleAffinities = async (affinities:Disciplinas[])=>{
        try {
            const userId = await getUserId();
    
            const cicloData: CicloData = {
                nome: cycleName,
                qtd_total_questoes: position?.qtd_questoes,
                usuario_ref: userId,
                horas_por_ciclo: 24,
                disciplinas: affinities
            };
    
            await postCiclo(cicloData, contest?._id);
    
            router.push("/meus-ciclos");
    
        } catch (error) {
            alert("Erro ao criar ciclo");
        }

    }

    const handleName = (name:string,stage:number) =>{
        setcycleName(name);
        setStage(stage);
    }

    const onBack = (stage:number)=>{
        setStage(stage);
    }


    return(
        <section className="m-5 sm:m-10">
            <h2 className="text-[#5e5873] text-2xl sm:text-3xl mb-5 sm:mb-10">Ciclo por Concurso</h2>
            <div className="bg-white text-[#3a3a3a] py-3 sm:py-5">
                <div className="flex flex-col justify-center px-2 sm:px-10">
                    <div className="flex justify-center flex-wrap">
                        <div className="flex items-center justify-center">
                            <div className="mt-4 sm:mt-7 mr-2 sm:mr-3 h-1 w-8 sm:w-20 border-t-2 border-white"/>
                            <StageLogo logo="/images/per-contest/rigth arrow.svg" check="/images/per-contest/Check.svg" stage={stage} moment={1}/>
                            <div className="mt-4 sm:mt-7 ml-2 sm:ml-3 h-1 w-8 sm:w-20 border-t-2 border-[#dfdfdf]"/>
                        </div>
                        <div className="flex items-center justify-center">
                            <div className="mt-4 sm:mt-7 mr-2 sm:mr-3 h-1 w-8 sm:w-20 border-t-2 border-[#dfdfdf]"/>
                            <StageLogo logo="/images/per-contest/rigth arrow.svg" check="/images/per-contest/Check.svg" stage={stage} moment={2}/>
                            <div className="mt-4 sm:mt-7 ml-2 sm:ml-3 h-1 w-8 sm:w-20 border-t-2 border-[#dfdfdf]"/>
                        </div>
                        <div className="flex items-center justify-center">
                            <div className="mt-4 sm:mt-7 mr-2 sm:mr-3 h-1 w-8 sm:w-20 border-t-2 border-[#dfdfdf]"/>
                            <StageLogo logo="/images/per-contest/Graduation Cap.svg" check="/images/per-contest/Check.svg" stage={stage} moment={3} cap = {true}/>
                            <div className="mt-4 sm:mt-7 ml-2 sm:ml-3 h-1 w-8 sm:w-20 border-t-2 border-[#dfdfdf]"/>
                        </div>
                        <div className="flex items-center justify-center">
                            <div className="mt-4 sm:mt-7 mr-2 sm:mr-3 h-1 w-8 sm:w-20 border-t-2 border-[#dfdfdf]"/>
                            <StageLogo logo="/images/per-contest/rigth arrow.svg" stage={stage} moment={4}/>
                            <div className="mt-4 sm:mt-7 ml-2 sm:ml-3 h-1 w-8 sm:w-20 border-t-2 border-white"/>
                        </div>
                    </div>
                    <div className="flex justify-center flex-wrap">
                        <StageText title="Concurso" description="Selecione o Concurso" stage={stage} moment={1}/>
                        <StageText title="Cargo" description="Selecione o Cargo" stage={stage} moment={2}/>
                        <StageText title="Nome do Ciclo" description="Defina um nome para seu novo ciclo" stage={stage} moment={3}/>
                        <StageText title="Afinidade" description="Selecione a afinidade com as disciplinas" stage={stage} moment={4}/>
                    </div>
                </div>
                {stage===1&&(
                    <ContestComponent onSelect={handleContest} stage={stage}/>
                )}
                {stage===2&&(
                    <PositionComponent onSelect={handlePosition} onBack={onBack} stage={stage} positions={positions}/>
                )}
                {stage===3&&(
                    <NameComponent onSelect={handleName} onBack={onBack} stage={stage}/>
                )}
                {stage===4&&(
                    <AffinityComponent onSelect={handleAffinities} onBack={onBack} stage={stage} affinities={affinities || []}/>
                )}
            </div>
        </section>
    )
}