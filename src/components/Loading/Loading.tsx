import React, { useEffect, useRef, useState } from 'react'

interface LoadingProps {
  isLoading: boolean
}

const Loading = ({ isLoading }: LoadingProps) => { 
  const positionRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState<number>()

  useEffect(() => {
    const handlePosition = () => {
      if (!positionRef.current) return
      const parentRect = positionRef.current.getBoundingClientRect()

      setPosition(parentRect.left)
    }
  
    handlePosition()
  
    if (positionRef.current === null) return
  
    
    const currentRef = positionRef.current
  
    const resizeObserver = new ResizeObserver(handlePosition)
  
    resizeObserver.observe(currentRef)
  
    return () => {
      
      if (currentRef === null) return
      resizeObserver.unobserve(currentRef)
    }
  }, [isLoading])

  return (
    <>
      {isLoading && (
        <>
          <div className='fixed inset-0 z-40 flex justify-center items-center bg-black bg-opacity-40' />
          <div ref={positionRef} className='fixed lg:absolute inset-0 z-50'>
            <div
              className='fixed inset-x-0 inset-y-0 flex flex-col justify-center items-center text-center'
              style={{
                left: `${position}px`
              }}
            >
              <div className='text-white text-8xl animate-spin rounded-full tabler-loader-2' />
              <p className='text-white text-xl font-semibold'>Loading...</p>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Loading
