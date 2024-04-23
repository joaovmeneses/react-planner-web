"use client";
import Timercard from "@/components/timer/Timer";
import CardBody from "@/components/my-cycles/cards/CardBody";
import ListBody from "@/components/my-cycles/list/ListItem";

import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

interface Disciplina {
    id: string;
    nome: string;
    horas_objetivo: number;
    status: string;
    indice: number;
}

export default function MeusCiclos(){

    const [disciplinas, setDisciplinas] = useState<Disciplina[]>([]);

    const [dadosTimer, setDadosTimer] = useState<{ disciplina: string; progressoInicial: number }>({ disciplina: "", progressoInicial: 0 });

    const urlApi: string = "http://ec2-3-85-125-196.compute-1.amazonaws.com:3000";
    const rotaDisciplina: string = "/disciplina/ciclo/:";
    const ciclo_id: string = "ab5c597a-da96-4ee2-85a5-57dfb1db4lfd";

    const urlCompleta: string = urlApi + rotaDisciplina + ciclo_id;
    
    useEffect(() => {
        const fetchDisciplinas = async () => {
            try {
                const response = await fetch(urlCompleta);
                const data = await response.json();
                setDisciplinas(data);
            } catch (error) {
                console.error("Erro ao buscar dados da API:", error);
            }
        };

        fetchDisciplinas();
    }, []);

    useEffect(() => {
        const fetchDadosTimer = async () => {
            try {
                const response = await fetch("URL_DA_API_PARA_O_TIMER");
                const data = await response.json();
                setDadosTimer(data);
            } catch (error) {
                console.error("Erro ao buscar dados do timer da API:", error);
            }
        };

        fetchDadosTimer();
    }, []);

    return(
        <div className="flex flex-row w-auto space-x-4">
        <div className="grid grid-cols-3 rounded-lg w-full bg-white drop-shadow-lg my-3 gap-x-2 gap-y-2 py-3 pl-4">
            <DragDropContext onDragEnd={() => {}}>
                <Droppable droppableId="cards" direction="horizontal">
                    {(provided, snapshot) => (
                        <>                            
                            {disciplinas.map((disciplina, index) => (
                                <CardBody
                                    key={disciplina.id}
                                    nome={disciplina.nome}
                                    horasObjetivo={disciplina.horas_objetivo}
                                    status={disciplina.status}
                                    id={disciplina.id}
                                    indice={index}
                                />
                            ))}
                        </>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    

            <div className="flex flex-col h-full w-80 rounded-lg drop-shadow-lg">
                <Timercard disciplina={dadosTimer.disciplina} progressoInicial={dadosTimer.progressoInicial}  />
                <div className="flex flex-col w-full">
                <DragDropContext onDragEnd={() => {}}>
                <ListBody />
                </DragDropContext>
                </div>
             </div>
        </div>
    )
}
