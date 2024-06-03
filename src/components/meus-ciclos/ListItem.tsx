import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Ciclo } from '@/app/(dashboard)/meus-ciclos/page'

interface ListItemProps {
  item: Ciclo
  onDelete: () => void
  onPlay: (id: string) => void
}

const ListItem = ({ item, onDelete, onPlay }: ListItemProps) => {
  return (
    <>
      <tr className='text-center'>
        <td className='border-t border-t-gray-500 border-opacity-30 py-3 px-7 font-light'>{item.nome}</td>
        <td className='border-t border-t-gray-500 border-opacity-30 py-3 px-7'>
          <button
            onClick={() => onPlay(item.id)}
            className='bg-transparent text-green-500 hover:text-green-600 hover:bg-green-600 hover:bg-opacity-10 hover:cursor-pointer w-8 h-8 text-center rounded-full'
          >
            <i className='tabler-player-play text-lg' />
          </button>
          <button
            onClick={onDelete}
            className='bg-transparent text-red-500 hover:text-red-600 hover:bg-red-600 hover:bg-opacity-10 hover:cursor-pointer w-8 h-8 rounded-full'
          >
            <i className='tabler-trash text-lg' />
          </button>
        </td>
      </tr>
    </>
  )
}

export default ListItem
