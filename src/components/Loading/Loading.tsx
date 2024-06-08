import React from 'react'

interface LoadingProps {
  isLoading: boolean
}

const Loading = ({ isLoading }: LoadingProps) => {
  return (
    <>
      {isLoading && (
        <>
          <div className='fixed inset-0 z-40 flex justify-center items-center bg-black bg-opacity-40' />
          <div className='fixed lg:absolute inset-0 flex flex-col justify-center items-center text-center z-50'>
            <div className='text-white text-8xl animate-spin rounded-full tabler-loader-2' />
            <p className='text-white text-xl font-semibold'>Loading...</p>
          </div>
        </>
      )}
    </>
  )
}

export default Loading
