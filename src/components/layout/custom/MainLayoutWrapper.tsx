import { ChildrenType } from '@/@core/types'
import React from 'react'

const LoadingPageWrapper = ({ children }: ChildrenType) => {
  return <div className='relative w-full h-full'>{children}</div>
}

export default LoadingPageWrapper
