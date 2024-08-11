import React from 'react'
 
import type { ChildrenType } from '@/@core/types'

const LoadingPageWrapper = ({ children }: ChildrenType) => {
  return <div className='relative w-full h-full'>{children}</div>
}

export default LoadingPageWrapper
