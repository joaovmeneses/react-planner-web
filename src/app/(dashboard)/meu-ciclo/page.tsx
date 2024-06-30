'use client'

import React, { useEffect, useState, useContext } from 'react'
import api from '../../../../axiosConfig'
import { GridContextProvider, GridDropZone, GridItem, swap, move } from 'react-grid-dnd'
import CardBody from '@/components/meu-ciclo/CardBody'
import Timercard from '@/components/meu-ciclo/timer/Timer'
import Modal from './modalHoras/modalHoras'
import { SettingsContext } from '@/@core/contexts/settingsContext'
import { Disciplina, SelectedDisciplina } from '@/interfaces/meuCiclo'

export default function MeuCiclo() {
  const settingsContext = useContext(SettingsContext)
  const [disciplinas, setDisciplinas] = useState<Disciplina[]>([])
  const [selectedDisciplinas, setSelectedDisciplinas] = useState<SelectedDisciplina[]>([])
  const [dadosTimer, setDadosTimer] = useState<{ disciplina: string; progressoInicial: number }>({
    disciplina: '',
    progressoInicial: 0
  })
  const [currentDisciplina, setCurrentDisciplina] = useState<Disciplina | null>(null)
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [draggingItem, setDraggingItem] = useState<string | null>(null)
  const [searchText, setSearchText] = useState<string>('')
  const [editingDisciplina, setEditingDisciplina] = useState<SelectedDisciplina | null>(null)
  const [disciplinaToEditIndex, setDisciplinaToEditIndex] = useState<number | null>(null)

  const [disciplinasKeys, setDisciplinasKeys] = useState<number[]>([])
  const [selectedDisciplinasKeys, setSelectedDisciplinasKeys] = useState<number[]>([])

  const getSystemMode = (): 'light' | 'dark' => {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  const [systemMode, setSystemMode] = useState<'light' | 'dark'>(getSystemMode())

  const ciclo_id: string = '4ecb7ecf-c58d-4c87-a75b-af3f34dff50d'
  // const ciclo_id: string = 'd76f6b53-2a97-4852-8bb5-16d37b9cb309'

  useEffect(() => {
    api.get(`/disciplina`).then(response => {
      let disciplinasFiltradas = response.data.map((disciplina: any) => ({
        id: disciplina._id,
        nome: disciplina.nome
      }))
      disciplinasFiltradas.shift()
      setDisciplinas(disciplinasFiltradas)

      const keys = []
      for (let i = 0; i < disciplinasFiltradas.length; i++) keys.push(i)
      setDisciplinasKeys(keys)
    })

    api
      .get(`/disciplina/ciclo/${ciclo_id}`)
      .then(response => {
        if (Array.isArray(response.data)) {
          setSelectedDisciplinas(response.data)

          const keys = []
          for (let i = 0; i < response.data.length; i++) keys.push(response.data[i].indice)
          setSelectedDisciplinasKeys(keys)

          console.log('res:', response.data)
        } else {
          setSelectedDisciplinas([])
          console.error('API response is not an array:', response.data)
        }
      })
      .catch(error => {
        console.error('Error fetching selectedDisciplinas:', error)
        setSelectedDisciplinas([])
      })
  }, [ciclo_id])

  useEffect(() => {
    if (disciplinaToEditIndex) {
      handleEdit(disciplinaToEditIndex)
      setDisciplinaToEditIndex(null)
    }
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
    let temp = keys[sourceIndex]
    keys = keys.filter((_, i) => i !== sourceIndex)
    keys.splice(targetIndex, 0, temp)

    return keys
  }

  const onChange = (sourceId: string, sourceIndex: number, targetIndex: number, targetId?: string) => {
    const effectiveTargetId = targetId ?? sourceId
    // console.log(sourceId, sourceIndex, targetIndex, targetId, effectiveTargetId)

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
        const updatedWithIndices = updatedItems.map((item, index) => ({ ...item, indice: newKeys[index] }))
        setSelectedDisciplinas(updatedWithIndices)
      }
    } else {
      if (sourceId === 'disciplinas' && targetId === 'selectedDisciplinas') {
        const keys = selectedDisciplinasKeys
        keys.splice(targetIndex, 0, Math.max(...selectedDisciplinasKeys) + 1)
        setSelectedDisciplinasKeys(keys)

        const item = disciplinas[sourceIndex]
        setCurrentDisciplina(item)
        const updatedTargetItems = [...selectedDisciplinas]
        updatedTargetItems.splice(targetIndex, 0, {
          id: item.id,
          nome: item.nome,
          horas_objetivo: 0,
          horas_estudadas: 0,
          status: 'nao-iniciada',
          indice: keys[targetIndex]
        })

        const updatedWithIndices = updatedTargetItems.map((item, index) => ({ ...item, indice: keys[index] }))
        setSelectedDisciplinas(updatedWithIndices)
        setDisciplinaToEditIndex(keys[targetIndex])
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
        const updatedWithIndices = updatedSourceItems.map((item, index) => ({ ...item, indice: keys[index] }))
        setSelectedDisciplinas(updatedWithIndices)
        setDisciplinas(updatedTargetItems)
      }
    }
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
              horas_estudadas: horasEstudadas
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
  const handleDelete = (index: number) => {
    const keys = selectedDisciplinasKeys.filter(key => key !== index)
    setSelectedDisciplinasKeys(keys)

    const updatedSelectedDisciplinas = selectedDisciplinas.filter(disciplina => disciplina.indice !== index)
    const updatedWithIndices = updatedSelectedDisciplinas.map((item, index) => ({ ...item, indice: keys[index] }))
    setSelectedDisciplinas(updatedWithIndices)

    console.log(index, selectedDisciplinasKeys, keys, updatedWithIndices)
  }

  const handleEdit = (index: number) => {
    const disciplinaToEdit = selectedDisciplinas.find(disciplina => disciplina.indice === index)
    console.log(index, disciplinaToEdit)
    if (disciplinaToEdit) {
      setEditingDisciplina(disciplinaToEdit)
      setModalOpen(true)
    }
  }

  if (!settingsContext) {
    return <div>Carregando...</div>
  }

  const filteredDisciplinas = disciplinas.filter(disciplina =>
    disciplina.nome.toLowerCase().includes(searchText.toLowerCase())
  )

  const { settings, updateSettings } = settingsContext

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
          <Timercard nome={dadosTimer.disciplina} horasObjetivo={0} horasEstudadas={dadosTimer.progressoInicial} />
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
            {selectedDisciplinas.map((disciplina, index) => (
              <GridItem key={selectedDisciplinasKeys[index]}>
                <CardBody
                  nome={disciplina.nome}
                  horasObjetivo={disciplina.horas_objetivo}
                  status={disciplina.status}
                  id={disciplina.id}
                  indice={disciplina.indice}
                  className='bg-transparent m-2 cursor-pointer'
                  onDelete={handleDelete}
                  onEdit={handleEdit}
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
    </div>
  )
}
