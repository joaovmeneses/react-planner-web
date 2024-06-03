'use client'
import List from '@/components/meus-ciclos/List'
import ListItem from '@/components/meus-ciclos/ListItem'
import Modal from '@/components/meus-ciclos/ModalDelete'
import React, { useEffect, useState } from 'react'
import api from '../../../../axiosConfig'
import { useRouter } from 'next/navigation'

export interface Ciclo {
  id: string
  nome: string
}

const MeusCiclos = () => {
  const router = useRouter()

  const [ciclos, setCiclos] = useState<Ciclo[]>([])
  const [selectedCiclo, setSelectedCiclo] = useState<string>('')
  const [deletedCiclo, setDeletedCiclo] = useState<string>('')
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const getCiclos = async () => {
    const token = localStorage.getItem('token')
    const res = await api.get('/ciclo', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    const data = res.data
    setCiclos(data)
  }
  const handleDelete = async (id: string) => {
    const token = localStorage.getItem('token')
    setIsModalOpen(false)
    await api.delete(`/ciclo/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    setDeletedCiclo(id)
  }

  const handlePlay = (id: string) => {
    router.push(`/meu-ciclo/${id}`)
  }

  useEffect(() => {
    getCiclos()
  }, [deletedCiclo])

  return (
    <>
      <List title='Meus Ciclos' headers={['nomes', 'ações']}>
        {ciclos?.map((ciclo, key) => (
          <ListItem
            onPlay={handlePlay}
            onDelete={() => {
              setSelectedCiclo(ciclo.id)
              setIsModalOpen(true)
            }}
            item={ciclo}
            key={key}
          />
        ))}
      </List>
      {isModalOpen && <Modal id={selectedCiclo} onClose={() => setIsModalOpen(false)} onSubmit={handleDelete} />}
    </>
  )
}

export default MeusCiclos
