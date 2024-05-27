"use client"

import React, { useEffect, useState } from 'react';
import api from '../../../../axiosConfig';
import { GridContextProvider, GridDropZone, GridItem, swap, move } from 'react-grid-dnd';
import CardBody from '@/components/meu-ciclo/CardBody';
import Timercard from '@/components/meu-ciclo/timer/Timer';
import Modal from './modalHoras/modalHoras';


interface SelectedDisciplina {
    id: string;
    nome: string;
    horas_objetivo: number;
    status: string;
    indice: number;
}

interface Disciplina {
    id: string;
    nome: string;
}

export default function MeuCiclo() {
    const [disciplinas, setDisciplinas] = useState<Disciplina[]>([]);
    const [selectedDisciplinas, setSelectedDisciplinas] = useState<SelectedDisciplina[]>([]);
    const [dadosTimer, setDadosTimer] = useState<{ disciplina: string; progressoInicial: number }>({ disciplina: "", progressoInicial: 0 });
    const [currentDisciplina, setCurrentDisciplina] = useState<Disciplina | null>(null);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [draggingItem, setDraggingItem] = useState<string | null>(null);

    const ciclo_id: string = "4ecb7ecf-c58d-4c87-a75b-af3f34dff50d";

    useEffect(() => {
        api.get(`/disciplina`).then(response => {
            const disciplinasFiltradas = response.data.map((disciplina: any) => ({
                id: disciplina._id,
                nome: disciplina.nome
            }));
            setDisciplinas(disciplinasFiltradas);
        });

        api.get(`/disciplina/ciclo/${ciclo_id}`).then(response => {
            setSelectedDisciplinas(response.data);
        });
    }, [ciclo_id]);

    const onChange = (sourceId: string, sourceIndex: number, targetIndex: number, targetId?: string) => {
        const effectiveTargetId = targetId ?? sourceId;
        console.log(sourceId, sourceIndex, targetIndex, targetId, effectiveTargetId);

        if (sourceId === effectiveTargetId) {
            if (sourceId === 'disciplinas') {
                const updatedItems = swap(disciplinas, sourceIndex, targetIndex);
                setDisciplinas(updatedItems);
            } else {
                const updatedItems = swap(selectedDisciplinas, sourceIndex, targetIndex);
                setSelectedDisciplinas(updatedItems);
            }
        } else {
            if (sourceId === 'disciplinas' && targetId === 'selectedDisciplinas') {
                const item = disciplinas[sourceIndex];
                setCurrentDisciplina(item);
                setModalOpen(true);
                setDisciplinas(prev => prev.filter((_, idx) => idx !== sourceIndex));
            } else if (sourceId === 'selectedDisciplinas' && targetId === 'disciplinas') {
                const item = selectedDisciplinas[sourceIndex];
                const updatedSourceItems = selectedDisciplinas.filter((_, idx) => idx !== sourceIndex);
                const updatedTargetItems = [...disciplinas];
                updatedTargetItems.splice(targetIndex, 0, { id: item.id, nome: item.nome });
                setSelectedDisciplinas(updatedSourceItems);
                setDisciplinas(updatedTargetItems);
            }
        }
    };

    const handleModalSubmit = (horasObjetivo: number) => {
        if (currentDisciplina) {
            const updatedSelectedDisciplinas = [
                ...selectedDisciplinas,
                {
                    ...currentDisciplina,
                    horas_objetivo: horasObjetivo * 3600,
                    status: 'não iniciado',
                    indice: selectedDisciplinas.length
                }
            ];
            setSelectedDisciplinas(updatedSelectedDisciplinas);
            setCurrentDisciplina(null);
        }
        setModalOpen(false);
    };

    return (
        <div className='flex space-x-4 p-4'>
            <GridContextProvider onChange={onChange}>
                <div className='flex flex-col space-y-4'>
                    <Timercard nome={dadosTimer.disciplina} horasObjetivo={0} horasEstudadas={dadosTimer.progressoInicial} />
                    <GridDropZone id="disciplinas" boxesPerRow={1} rowHeight={40} className='h-96 mb-2 border rounded-lg bg-[#283046]'>
                        {disciplinas.map((disciplina, index) => (
                            <GridItem key={disciplina.id}>
                                <div className={`flex justify-center p-2 rounded-md ${draggingItem === disciplina.id ? 'bg-gray-700 text-white' : ''}`}>
                                    {disciplina.nome}
                                </div>
                            </GridItem>
                        ))}
                    </GridDropZone>
                </div>
                <div className='w-full'>
                    <GridDropZone id="selectedDisciplinas" boxesPerRow={5} rowHeight={150} className='bg-[#283046] text-gray-200  rounded-lg min-h-[600px] min-w-[600px]'>
                        {selectedDisciplinas.map((disciplina, index) => (
                            <GridItem key={disciplina.id}>
                                <CardBody
                                    nome={disciplina.nome}
                                    horasObjetivo={disciplina.horas_objetivo}
                                    status={disciplina.status}
                                    id={disciplina.id}
                                    indice={index}
                                    className='bg-transparent m-2 hover:bg-gray-700 '
                                />
                            </GridItem>
                        ))}
                    </GridDropZone>
                </div>
            </GridContextProvider>
            {modalOpen && (
                <Modal onClose={() => setModalOpen(false)} onSubmit={handleModalSubmit} />
            )}
        </div>
    );
}




// const router = useRouter();
    //Quando a página meus-ciclos esteja pronta, trocar ciclo_id por id
    //Alterar tambem o page.tsx para [id].tsx
    // const {id} = router.query;
