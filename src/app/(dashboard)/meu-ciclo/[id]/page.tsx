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
        nome: disciplina.nome
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
  
          console.log('res:', response.data);
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
      const res = await api.patch(`/disciplina/${disciplina.id}/atualiza-indice`, {
        novo_indice: disciplina.indice
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

        console.log('Disciplina alterada:', changedDisciplina)

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
    
        // Crear la disciplina temporal con el índice correcto
        const tempDisciplina = {
          id: uuidv4(),
          nome: item.nome,
          horas_objetivo: 0,
          horas_estudadas: 0,
          status: 'nao-iniciada',
          indice: targetIndex,
          tipo_estudo: []
        };
    
        const updatedTargetItems = [...selectedDisciplinas];

        updatedTargetItems.splice(targetIndex, 0, tempDisciplina);
        setSelectedDisciplinas(updatedTargetItems);
    
        setDisciplinaToEditIndex(targetIndex);
    
        try {
          const newDisciplina = {
            ciclo_id: id,
            nome: item.nome,
            horas_objetivo: 0,
            indice: targetIndex // Establece el índice correcto desde el principio
          };
    
          const token = localStorage.getItem('token');
    
          const config = {
            headers: { Authorization: `Bearer ${token}` }
          };
    
          // Enviar la nueva disciplina al backend
          const response = await api.post('/disciplina', newDisciplina, config);
          const savedDisciplina = response.data;
    
          // Actualiza la disciplina en el frontend con los datos del backend
          const finalUpdatedTargetItems = updatedTargetItems.map(disciplina =>
            disciplina.id === tempDisciplina.id
              ? { ...savedDisciplina } // Sustituye el temporal por el guardado en el backend
              : disciplina
          );
    
          setSelectedDisciplinas(finalUpdatedTargetItems);
    
          if (savedDisciplina) {
            // Actualiza solo la disciplina que ha cambiado de índice en el backend
            await updateIndex(savedDisciplina);
          }
    
          console.log('Disciplina guardada, actualizada y índice sincronizado:', savedDisciplina);
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

        updatedTargetItems.splice(targetIndex, 0, { id: item.id, nome: item.nome })
        const updatedWithIndices = updatedSourceItems.map((item, index) => ({ ...item, indice: index }))

        setSelectedDisciplinas(updatedWithIndices)
        setDisciplinas(updatedTargetItems)
        
        const changedDisciplina = updatedWithIndices[targetIndex];
        
        await updateIndex(changedDisciplina);
      }
    }
  }

  const handleStatusChange = (status: string, tipoEstudo?: string[]) => {
    const handleRequest = async (editingDisciplina: SelectedDisciplina) => {
      const token = localStorage.getItem('token')

      await api.put(
        `/disciplina/${editingDisciplina.id}`,
        {
          ...editingDisciplina,
          qtd_questoes: 1
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
    }

    if (editingDisciplina) {
      console.log(editingDisciplina.indice)

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

      requestDisciplina && handleRequest(requestDisciplina)
      setSelectedDisciplinas(updatedSelectedDisciplinas)
      setEditingDisciplina(null)
    }

    setStatusModalOpen(false)
  }

  const handleModalSubmit = (horasObjetivo: number, horasEstudadas: number) => {
    const handleEditionRequest = async (editingDisciplina: SelectedDisciplina) => {
      const token = localStorage.getItem('token')

      const res = await api.put(
        `/disciplina/${editingDisciplina.id}`,
        {
          ...editingDisciplina,
          qtd_questoes: 1
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      console.log(res)
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
      // Encuentra la disciplina que se va a eliminar
      const disciplinaToDelete = selectedDisciplinas.find(disciplina => disciplina.indice === index);
  
      if (!disciplinaToDelete) {
        console.error('Disciplina no encontrada');

        return;
      }
  
      const token = localStorage.getItem('token');

      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
  
      // Crea una copia de la lista de disciplinas y mueve la que se eliminará al final de la lista
      const updatedSelectedDisciplinas = [...selectedDisciplinas];

      updatedSelectedDisciplinas.splice(index, 1); // Elimina la disciplina de su posición actual
      disciplinaToDelete.indice = updatedSelectedDisciplinas.length; // Asigna el nuevo índice (último)
      updatedSelectedDisciplinas.push(disciplinaToDelete); // La agrega al final
  
      // Actualiza el índice en el backend sin modificar el estado en el frontend
      await updateIndex(disciplinaToDelete);
  
      // Después de actualizar el backend, realiza la eliminación en el frontend
      const finalSelectedDisciplinas = selectedDisciplinas.filter((_, i) => i !== index);
      const updatedWithIndices = finalSelectedDisciplinas.map((item, i) => ({ ...item, indice: i }));
      
      // Si la disciplina eliminada es la seleccionada, manejar la lógica de resetear el cronómetro
      let nulo = false;

      if (index === disciplinaSelecionada?.indice) {
        setDisciplinaSelecionada(null);
        setResetTimer(true);
        nulo = true;
      }
  
      // Actualiza las claves
      const updatedKeys = selectedDisciplinasKeys.filter(key => key !== index);

      setSelectedDisciplinasKeys(updatedKeys);
  
      // Actualiza el estado en el frontend
      setSelectedDisciplinas(updatedWithIndices);
  
      // Elimina la disciplina del backend ahora que su índice ha sido actualizado
      await api.delete(`/disciplina/${disciplinaToDelete.id}`, config);
  
      // Si la disciplina eliminada era la seleccionada, selecciona la primera en la lista actualizada
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

  const handleCheck = (index: number) => {
    const disciplinaToEdit = selectedDisciplinas.find(disciplina => disciplina.indice === index)

    if (disciplinaToEdit) {
      setEditingDisciplina(disciplinaToEdit)
      setStatusModalOpen(true)
    }
  }

  const handleReset = () => {
    setIsLoading(true)

    const handleResetRequest = async () => {
      const token = localStorage.getItem('token')

      try {
        const response = await api.patch(`/ciclo/${id}/resetar`, null, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        console.log('reset', response)
        setReseted(reseted + 1)
      } catch (error) {
        console.error('Error resetting:', error)
      } finally {
        setIsLoading(false)
        setResetModalOpen(false)
      }
    }

    handleResetRequest()
  }

  const handleSelect = (indice: number) => {
    const disciplina = selectedDisciplinas.find(disciplina => disciplina.indice === indice)

    if (disciplina) {
      setDisciplinaSelecionada(disciplina)
      setResetTimer(true)
    }
  }

  const handleHorasEstudadasUpdate = (id: string, novasHorasEstudadas: number) => {
    const updatedSelectedDisciplinas = selectedDisciplinas.map(disciplina =>
      disciplina.id === id ? { ...disciplina, horas_estudadas: novasHorasEstudadas } : disciplina
    )

    setSelectedDisciplinas(updatedSelectedDisciplinas)
  }

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
            horasObjetivo={disciplinaSelecionada?.horas_objetivo}
            horasEstudadas={disciplinaSelecionada?.horas_estudadas}
            onHorasEstudadasUpadate={handleHorasEstudadasUpdate}
            resetTimer={resetTimer}
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
            <GridDropZone id='disciplinas' boxesPerRow={1} rowHeight={40} className='h-96 mb-2 overflow-y-auto'>
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
          <h2 className='dark:bg-dark bg-white p-4 text-[#5c55bb] text-base'>Ciclo de estudo</h2>
          <GridDropZone
            id='selectedDisciplinas'
            boxesPerRow={5}
            rowHeight={150}
            className='dark:bg-dark text-light-text bg-white dark:text-dark-text min-h-[600px] min-w-[800px]'
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
                    className={`bg-transparent m-2 cursor-pointer ${disciplina.id === disciplinaSelecionada?.id ? 'border-green-500' : ''}`}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                    onCheck={handleCheck}
                    onSelect={handleSelect}
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
      {<Loading isLoading={isLoading} />}
    </div>
  )
}

export default MeuCiclo
