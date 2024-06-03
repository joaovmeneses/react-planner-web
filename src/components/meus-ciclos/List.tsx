import { ChildrenType } from '@/@core/types'
import React, { ReactNode } from 'react'

interface ListProps {
  children: ReactNode
  title: string
  headers: string[]
}

const List = ({ children, title, headers }: ListProps) => {
  return (
    <div className='bg-backgroundPaper rounded-md shadow-secondaryMd'>
      <div className='p-5'>
        <h2 className='text-lg font-normal'>{title}</h2>
      </div>
      <div className='p-5 pt-0'>
        <table className='w-full border-t border-t-gray-500 border-opacity-30' cellSpacing={0}>
          <thead>
            <tr className='bg-backgroundDefault text-xs'>
              {headers.map((header, key) => (
                <th key={key} className='py-3 px-7 font-semibold w-1/2'>
                  {header.toUpperCase()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>
    </div>
  )
}

export default List
