'use client'

import React, { useEffect, useState, useContext } from 'react'

import { GridContextProvider, GridDropZone, GridItem, swap } from 'react-grid-dnd'

// eslint-disable-next-line import/named
import { v4 as uuidv4 } from 'uuid'

import api from '../../../../../axiosConfig'
import CardBody from '@/components/meu-ciclo/CardBody'
import Timercard from '@/components/meu-ciclo/timer/Timer'

import Modal from '../modalHoras/modalHoras'
import ModalStatus from '../modalTipoEstudos/ModalTipoEstudos'
import { SettingsContext } from '@/@core/contexts/settingsContext'
import type { Disciplina, SelectedDisciplina } from '@/interfaces/meuCiclo'
import StatusDisciplina from '@/enums/Status'
import ModalReset from '../modalReset/ModalReset'
import Loading from '@/components/Loading/Loading'
import ModalTimeout from './modalTimeout/ModalTimeout'


const MeuCiclo: React.FC<{ params: { id: string } }> = ({ params }) => {
  const { id } = params
  const settingsContext = useContext(SettingsContext)
  const [disciplinas, setDisciplinas] = useState<Disciplina[]>([])
  const [selectedDisciplinas, setSelectedDisciplinas] = useState<SelectedDisciplina[]>([])
  const [currentDisciplina, setCurrentDisciplina] = useState<Disciplina | null>(null)
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [draggingItem] = useState<string | null>(null)
  const [searchText, setSearchText] = useState<string>('')
  const [editingDisciplina, setEditingDisciplina] = useState<SelectedDisciplina | null>(null)
  const [disciplinaToEditIndex, setDisciplinaToEditIndex] = useState<number | null>(null)
  const [disciplinaSelecionada, setDisciplinaSelecionada] = useState<SelectedDisciplina | null>()
  const [resetTimer, setResetTimer] = useState(false)

  const [disciplinasKeys, setDisciplinasKeys] = useState<number[]>([])
  const [selectedDisciplinasKeys, setSelectedDisciplinasKeys] = useState<number[]>([])

  const [statusModalOpen, setStatusModalOpen] = useState<boolean>(false)

  const [resetModalOpen, setResetModalOpen] = useState<boolean>(false)
  const [canReset, setCanReset] = useState<boolean>(true)
  const [reseted, setReseted] = useState<number>(0)

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isEditMode, setIsEditMode] = useState(false);

  const [isFinishModalOpen, setIsFinishModalOpen] = useState<boolean>(false)

  const getSystemMode = (): 'light' | 'dark' => {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  const [systemMode, setSystemMode] = useState<'light' | 'dark'>(getSystemMode())

  useEffect(() => {

    const token = localStorage.getItem('token');

    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    api.get(`/disciplina`, config).then(response => {

      const disciplinasFiltradas = response.data.map((disciplina: any) => ({
        id: disciplina._id,
        nome: disciplina.nome,
        qtd_questoes: disciplina.qtd_questoes
      }));

      disciplinasFiltradas.shift();
      setDisciplinas(disciplinasFiltradas);

      const keys = [];

      for (let i = 0; i < disciplinasFiltradas.length; i++) keys.push(i);
      setDisciplinasKeys(keys);
    });

    api
      .get(`/disciplina/ciclo/${id}`, config)
      .then(response => {
        if (Array.isArray(response.data)) {
          setSelectedDisciplinas(response.data);
          setDisciplinaSelecionada(response.data[0]);

          const keys = [];

          for (let i = 0; i < response.data.length; i++) keys.push(response.data[i].indice);
          setSelectedDisciplinasKeys(keys);

        } else {
          setSelectedDisciplinas([]);
          console.error('API response is not an array:', response.data);
        }

        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching selectedDisciplinas:', error);
        setSelectedDisciplinas([]);

      });
  }, [id, reseted]);

  useEffect(() => {
    if (disciplinaToEditIndex !== null) {
      handleEdit(disciplinaToEditIndex)
      setDisciplinaToEditIndex(null)
    }

    const disciplinasFinalizadas = selectedDisciplinas.filter(
      disciplina => disciplina.status === StatusDisciplina.FINALIZADA
    )

    if (selectedDisciplinas.length === 0 || disciplinasFinalizadas.length !== selectedDisciplinas.length || !canReset)
      return

    setResetModalOpen(true)
  }, [selectedDisciplinas])

  useEffect(() => {
    const handleSystemModeChange = (e: MediaQueryListEvent) => {
      setSystemMode(e.matches ? 'dark' : 'light')
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    mediaQuery.addEventListener('change', handleSystemModeChange)

    return () => {
      mediaQuery.removeEventListener('change', handleSystemModeChange)
    }
  }, [])

  const keysSwap = (keys: number[], sourceIndex: number, targetIndex: number) => {
    const temp = keys[sourceIndex]

    keys = keys.filter((_, i) => i !== sourceIndex)
    keys.splice(targetIndex, 0, temp)

    return keys
  }

  const updateIndex = async (disciplina: SelectedDisciplina) => {
    const token = localStorage.getItem('token');
    const config = { headers: { Authorization: `Bearer ${token}` } };

    try {
      const res = await api.patch(`/ciclo/${id}/disciplinas/${disciplina.id}/indice`, {
        novoIndice: disciplina.indice
      }, config);

      console.log('res:', res.data);
    } catch (error) {
      console.error('Erro ao atualizar índice:', error);
    }
  }

  const onChange = async (sourceId: string, sourceIndex: number, targetIndex: number, targetId?: string) => {
    const effectiveTargetId = targetId ?? sourceId

    if (sourceId === effectiveTargetId) {
      if (sourceId === 'disciplinas') {
        if (targetIndex === disciplinas.length) return

        const newKeys = keysSwap(disciplinasKeys, sourceIndex, targetIndex)

        setDisciplinasKeys(newKeys)

        const updatedItems = swap(disciplinas, sourceIndex, targetIndex)

        setDisciplinas(updatedItems)
      } else {
        if (targetIndex === selectedDisciplinas.length) return

        const newKeys = keysSwap(selectedDisciplinasKeys, sourceIndex, targetIndex)

        setSelectedDisciplinasKeys(newKeys)

        const updatedItems = swap(selectedDisciplinas, sourceIndex, targetIndex)
        const updatedWithIndices = updatedItems.map((item, index) => ({ ...item, indice: index }))

        setSelectedDisciplinas(updatedWithIndices)

        const changedDisciplina = updatedWithIndices[targetIndex];

        await updateIndex(changedDisciplina);
      }
    } else {
      if (sourceId === 'disciplinas' && targetId === 'selectedDisciplinas') {
        const keys = selectedDisciplinasKeys;
        const newKey = Math.max(...keys, -1) + 1;

        keys.splice(targetIndex, 0, newKey);
        setSelectedDisciplinasKeys(keys);

        const item = disciplinas[sourceIndex];

        setCurrentDisciplina(item);

        const tempDisciplina = {
          id: uuidv4(),
          nome: item.nome,
          horas_objetivo: 0,
          horas_estudadas: 0,
          status: 'nao-iniciada',
          indice: targetIndex,
          tipo_estudo: []
        };

        let updatedTargetItems = [...selectedDisciplinas];

        updatedTargetItems = updatedTargetItems.map(disciplina => {
          if (disciplina.indice >= targetIndex) {
              return { ...disciplina, indice: disciplina.indice + 1 };
          }

          return disciplina;
      });

        updatedTargetItems.splice(targetIndex, 0, tempDisciplina);
        setSelectedDisciplinas(updatedTargetItems);

        try {
          const newDisciplina = {
            nome: item.nome,
            horas_objetivo: 0,
            indice: targetIndex
          };

          const token = localStorage.getItem('token');

          const config = {
            headers: { Authorization: `Bearer ${token}` }
          };

          const response = await api.post(`/ciclo/${id}/disciplinas`, newDisciplina, config);
          const savedDisciplina = response.data.disciplinas.find((item : any) => item.indice === targetIndex);

          const finalUpdatedTargetItems = updatedTargetItems.map(disciplina =>
            disciplina.id === tempDisciplina.id
              ? { ...savedDisciplina }
              : disciplina
          );

          setDisciplinaToEditIndex(targetIndex);
          setSelectedDisciplinas(finalUpdatedTargetItems);

          if (savedDisciplina) {
            await updateIndex(savedDisciplina);
          }

          console.log(finalUpdatedTargetItems)

        } catch (error) {
          console.error('Erro guardando a disciplina:', error);
        }
      } else if (sourceId === 'selectedDisciplinas' && targetId === 'disciplinas') {
        const selectedKeys = selectedDisciplinasKeys.filter((_, i) => i !== sourceIndex)

        setSelectedDisciplinasKeys(selectedKeys)

        const keys = disciplinasKeys

        keys.splice(targetIndex, 0, Math.max(...disciplinasKeys) + 1)
        setDisciplinasKeys(keys)

        const item = selectedDisciplinas[sourceIndex]
        const updatedSourceItems = selectedDisciplinas.filter((_, idx) => idx !== sourceIndex)
        const updatedTargetItems = [...disciplinas]

        const qtd_questoes = disciplinas.find(disciplina => disciplina.nome === item.nome)?.qtd_questoes

        updatedTargetItems.splice(targetIndex, 0, { id: item.id, nome: item.nome, qtd_questoes: qtd_questoes? qtd_questoes : 0 })
        const updatedWithIndices = updatedSourceItems.map((item, index) => ({ ...item, indice: index }))

        setSelectedDisciplinas(updatedWithIndices)
        setDisciplinas(updatedTargetItems)

        try {
          const token = localStorage.getItem('token');

          const config = {
              headers: { Authorization: `Bearer ${token}` }
          };

          await api.delete(`/ciclo/${id}/disciplinas/${item.id}`, config);

      } catch (error) {
          console.error('Erro: ', error);
      }

        const changedDisciplina = updatedWithIndices[targetIndex];

        await updateIndex(changedDisciplina);
      }
    }
  }

  const handleTimeOverflow = () => {
    setIsFinishModalOpen(true);
  }

  const handleStatusChange = (status: string, tipoEstudo?: string[]) => {
    const handleRequest = async (editingDisciplina: SelectedDisciplina) => {
      const token = localStorage.getItem('token')

      const disciplina = disciplinas.find(disciplina => disciplina.nome === editingDisciplina.nome)

      await api.put(
        `/disciplina/${editingDisciplina.id}`,
        {
          ...editingDisciplina,
          qtd_questoes: disciplina?.qtd_questoes,
          status: status
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
    }

    if (editingDisciplina) {

      const updatedSelectedDisciplinas = selectedDisciplinas.map(disciplina =>
        disciplina.indice === editingDisciplina.indice
          ? {
              ...disciplina,
              status: status,
              tipo_estudo: tipoEstudo ? tipoEstudo : disciplina.tipo_estudo
            }
          : disciplina
      )

      const requestDisciplina = updatedSelectedDisciplinas.find(
        disciplina => disciplina.indice === editingDisciplina.indice
      )

      const nextDisciplina = updatedSelectedDisciplinas.find(
        disciplina => disciplina.status !== StatusDisciplina.FINALIZADA
      )

      requestDisciplina && handleRequest(requestDisciplina)
      setSelectedDisciplinas(updatedSelectedDisciplinas)
      nextDisciplina && setDisciplinaSelecionada(nextDisciplina)
      setEditingDisciplina(null)
      setResetTimer(!resetTimer);
      setCanReset(true);
    }

    setStatusModalOpen(false)
  }

  const handleModalSubmit = (horasObjetivo: number, horasEstudadas: number) => {
    const handleEditionRequest = async (editingDisciplina: SelectedDisciplina) => {
      const token = localStorage.getItem('token')

      const disciplina = disciplinas.find(disciplina => disciplina.nome === editingDisciplina.nome)

      await api.put(
        `/disciplina/${editingDisciplina.id}`,
        {
          ...editingDisciplina,
          qtd_questoes: disciplina?.qtd_questoes
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

    }

    if (editingDisciplina) {
      const updatedSelectedDisciplinas = selectedDisciplinas.map(disciplina =>
        disciplina.indice === editingDisciplina.indice
          ? {
              ...disciplina,
              horas_objetivo: horasObjetivo,
              horas_estudadas: horasEstudadas,
              status: horasEstudadas > horasObjetivo ? StatusDisciplina.FINALIZADA : disciplina.status
            }
          : disciplina
      )

      const requestDisciplina = updatedSelectedDisciplinas.find(
        disciplina => disciplina.indice === editingDisciplina.indice
      )

      requestDisciplina && handleEditionRequest(requestDisciplina)
      setSelectedDisciplinas(updatedSelectedDisciplinas)
      setEditingDisciplina(null)
    }

    setModalOpen(false)
  }

  const handleDelete = async (index: number) => {
    try {

      const disciplinaToDelete = selectedDisciplinas.find(disciplina => disciplina.indice === index);

      if (!disciplinaToDelete) {
        console.error('Disciplina não encontrada');

        return;
      }

      const token = localStorage.getItem('token');

      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };


      const updatedSelectedDisciplinas = [...selectedDisciplinas];

      updatedSelectedDisciplinas.splice(index, 1);
      disciplinaToDelete.indice = updatedSelectedDisciplinas.length;
      updatedSelectedDisciplinas.push(disciplinaToDelete);

      await updateIndex(disciplinaToDelete);


      const finalSelectedDisciplinas = selectedDisciplinas.filter((_, i) => i !== index);
      const updatedWithIndices = finalSelectedDisciplinas.map((item, i) => ({ ...item, indice: i }));


      let nulo = false;

      if (index === disciplinaSelecionada?.indice) {
        setDisciplinaSelecionada(null);
        setResetTimer(true);
        nulo = true;
      }


      const updatedKeys = selectedDisciplinasKeys.filter(key => key !== index);

      setSelectedDisciplinasKeys(updatedKeys);


      setSelectedDisciplinas(updatedWithIndices);


      await api.delete(`/ciclo/${id}/disciplinas/${disciplinaToDelete.id}`, config);


      if (nulo && updatedWithIndices.length > 0) {
        setDisciplinaSelecionada(updatedWithIndices[0]);
      }
    } catch (error) {
      console.error('Error deleting disciplina:', error);
    }
  };

  const handleEdit = (index: number) => {
    const disciplinaToEdit = selectedDisciplinas.find(disciplina => disciplina.indice === index)

    if (disciplinaToEdit) {
      setEditingDisciplina(disciplinaToEdit)
      setModalOpen(true)
    }
  }

  // const handleCheck = (index: number) => {
  //   const disciplinaToEdit = selectedDisciplinas.find(disciplina => disciplina.indice === index)

  //   if (disciplinaToEdit) {
  //     setEditingDisciplina(disciplinaToEdit)
  //     setStatusModalOpen(true)
  //   }
  // }

  const handleReset = () => {
    setIsLoading(true)

    const handleResetRequest = async () => {
      const token = localStorage.getItem('token')

      try {
        await api.patch(`/ciclo/${id}/resetar`, null, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        setReseted(reseted + 1)
        setResetTimer(!resetTimer)
      } catch (error) {
        console.error('Error resetting:', error)
      } finally {
        setIsLoading(false)
        setResetModalOpen(false)
      }
    }

    handleResetRequest()
  }

  const handleSelect = async (indice: number) => {
    const disciplinaSelecionada = selectedDisciplinas.find(disciplina => disciplina.indice === indice)
  
    if (disciplinaSelecionada) {
      const token = localStorage.getItem('token')
  

      setEditingDisciplina(disciplinaSelecionada)
      setStatusModalOpen(true)
      const disciplina = disciplinas.find(d => d.nome === disciplinaSelecionada.nome)
  
      try {
        await api.put(
          `/disciplina/${disciplinaSelecionada.id}`,
          {
            ...disciplinaSelecionada,
            qtd_questoes: disciplina?.qtd_questoes,
            status: 'finalizada' 
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
  
        const updatedSelectedDisciplinas = selectedDisciplinas.map(d =>
          d.indice === indice ? { ...d, status: 'finalizada' } : d
        )
  
        setSelectedDisciplinas(updatedSelectedDisciplinas)
        
        setResetTimer(true)
        setIsFinishModalOpen(true);
      } catch (error) {
        console.error("Erro atualizando o status", error)
      }
    }
  }

  const onUpdateHorasEstudadas = async (id: string, horas_estudadas: number) => {
    const token = localStorage.getItem('token');
  
    const disciplinaSelecionada = selectedDisciplinas.find(disciplina => disciplina.id === id);
    
    if (disciplinaSelecionada) {
     
      const disciplina = disciplinas.find(d => d.nome === disciplinaSelecionada.nome);
    
      try {
        await api.put(
          `/disciplina/${id}`, 
          {
            ...disciplinaSelecionada, 
            qtd_questoes: disciplina?.qtd_questoes, 
            horas_estudadas, 
            status: 'rodando' 
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        console.log(`Horas atualizadas para a disciplina ${id}: ${horas_estudadas}`);
    
        const updatedSelectedDisciplinas = selectedDisciplinas.map(d =>
          d.id === id ? { ...d, horas_estudadas,  status: 'rodando' } : d
        );

        setSelectedDisciplinas(updatedSelectedDisciplinas);
  
      } catch (error) {
        console.error("Erro ao atualizar horas estudadas", error);
      }
    }
  };
  

  const onCompleteDisciplina = () => {
    setDisciplinaSelecionada((prevDisciplina) => {
      if (!prevDisciplina || prevDisciplina.indice === undefined) {
        console.log("Sem disciplina anterior.");

        return prevDisciplina;
      }
  
      const nextIndex = prevDisciplina.indice + 1;
  
    
      if (nextIndex < disciplinas.length) {
        
        return { ...prevDisciplina, indice: nextIndex };
      } else {
        console.log("Todas as disciplinas têm sido completadas.");

        return prevDisciplina; 
      }
    });
  
    setResetTimer(true);
  };
  
  

  useEffect(() => {
    const getPrimeiraDisciplinaNaoFinalizada = (disciplinas: SelectedDisciplina[]) => {
      return disciplinas.find(
        disciplina => disciplina.status !== 'finalizada'
      );
    };
  
    const disciplinaComHorasRestantes = getPrimeiraDisciplinaNaoFinalizada(selectedDisciplinas);
  
    if (disciplinaComHorasRestantes) {
      setDisciplinaSelecionada(disciplinaComHorasRestantes);
    }
  }, [selectedDisciplinas]);
  

  if (!settingsContext) {
    return <div>Carregando...</div>
  }

  const filteredDisciplinas = disciplinas.filter(disciplina =>
    disciplina.nome.toLowerCase().includes(searchText.toLowerCase())
  )

  const { settings } = settingsContext

  const getThemeClass = () => {
    if (settings.mode === 'system') {
      return systemMode === 'dark' ? 'dark' : ''
    }

    return settings.mode === 'dark' ? 'dark' : ''
  }

  return (
    <div className={`flex space-x-4 ${getThemeClass()}`}>
      
      <GridContextProvider onChange={onChange}>
        <div className='flex flex-col space-y-4'>
          <Timercard
            id={disciplinaSelecionada?.id}
            horas_objetivo={disciplinaSelecionada?.horas_objetivo}
            horas_estudadas={disciplinaSelecionada?.horas_estudadas}
            timeOut={handleTimeOverflow}
            resetTimer={resetTimer}
            isDisabled = {isEditMode}
            status={disciplinaSelecionada?.status}
            onUpdateHorasEstudadas={onUpdateHorasEstudadas}
            onCompleteDisciplina={onCompleteDisciplina}
          />
          <div className='p-4 rounded-lg dark:bg-dark text-light-text bg-white dark:text-dark-text'>
            <h2 className='dark:bg-dark bg-white text-[#5c55bb] text-base'>Todas as Disciplinas</h2>
            <input
              type='text'
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              placeholder='Pesquisar'
              className='w-full rounded-lg bg-light dark:bg-dark text-light-text dark:text-dark-text p-2 border border-[#373d50] focus:outline-none focus:border-[#6960da] my-4'
            />
            <GridDropZone id='disciplinas' boxesPerRow={1} rowHeight={40} className='h-96 mb-2 overflow-y-auto' disableDrag={!isEditMode}
            disableDrop={!isEditMode}>
              {filteredDisciplinas.map((disciplina, index) => (
                <GridItem key={disciplinasKeys[index]}>
                  <div
                    onMouseDown={e => e.preventDefault()}
                    className={`flex justify-center p-2 rounded-md ${draggingItem === disciplina.id ? 'bg-gray-700 text-white' : ''} cursor-pointer`}
                  >
                    {disciplina.nome}
                  </div>
                  <div className='border border-[#373d50]'></div>
                </GridItem>
              ))}
            </GridDropZone>
          </div>
        </div>
        <div className='w-full dark:bg-dark bg-white p-4 rounded-lg'>
          <div className='flex justify-between dark:bg-dark bg-white p-4 text-[#5c55bb] text-base'>
            <h2 className='pt-1'>Ciclo de estudo</h2>
            <div className="flex justify-end">
              <img
                src={isEditMode ? '/images/ativado.svg' : '/images/desativado.svg'}
                alt="Switch de edicão"
                onClick={() => setIsEditMode(!isEditMode)}
                className="cursor-pointer w-10 h-10"
              />
            </div>  
          </div>
          <GridDropZone
            id='selectedDisciplinas'
            boxesPerRow={5}
            rowHeight={150}
            className='dark:bg-dark text-light-text bg-white dark:text-dark-text min-h-[600px] min-w-[800px]'
            disableDrag={!isEditMode}
            disableDrop={!isEditMode} 
          >
            {selectedDisciplinas
              .sort((a, b) => a.indice - b.indice)
              .map((disciplina, index) => (
                <GridItem key={selectedDisciplinasKeys[index]}>
                  <CardBody
                    nome={disciplina.nome}
                    horasObjetivo={disciplina.horas_objetivo}
                    horasEstudadas={disciplina.horas_estudadas}
                    id={disciplina.id}
                    indice={disciplina.indice}
                    status={disciplina.status}
                    className={`bg-transparent m-2 cursor-pointer ${disciplina.id === disciplinaSelecionada?.id ? (disciplina.status == 'finalizada' ? 'border-gray-400' : 'border-green-500') : ''}`}
                    onDelete={isEditMode ? handleDelete:null}
                    onEdit={isEditMode ? handleEdit:null}
                    onSelect={isEditMode ? handleSelect:null}
                  />
                </GridItem>
              ))}
          </GridDropZone>
        </div>
      </GridContextProvider>
      {modalOpen && (
        <Modal
          onClose={() => {
            setCurrentDisciplina(null)
            setModalOpen(false)
          }}
          onSubmit={handleModalSubmit}
          nomeDisciplina={currentDisciplina ? currentDisciplina.nome : editingDisciplina ? editingDisciplina.nome : ''}
          initialHorasObjetivo={editingDisciplina ? editingDisciplina.horas_objetivo : undefined}
          initialHorasEstudadas={editingDisciplina ? editingDisciplina.horas_estudadas : undefined}
        />
      )}
      {statusModalOpen && (
        <ModalStatus
          onClose={() => {
            setStatusModalOpen(false)
          }}
          onSubmit={handleStatusChange}
        />
      )}
      {resetModalOpen && (
        <ModalReset
          onClose={() => {
            setResetModalOpen(false)
            setCanReset(false)
          }}
          onSubmit={handleReset}
        />
      )}
      {isFinishModalOpen && (
        <ModalTimeout
          disciplina={disciplinaSelecionada?.nome as string}
          onClose={() => setIsFinishModalOpen(false)}
        />
      )}
      {<Loading isLoading={isLoading} />}
    </div>
  )
}

export default MeuCiclo
