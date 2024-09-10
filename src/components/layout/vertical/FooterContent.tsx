'use client'
import { useEffect, useState } from 'react'

// Next Imports
import Link from 'next/link'

// Third-party Imports
import classnames from 'classnames'

// Hook Imports
import { useSettings } from '@core/hooks/useSettings'

// Util Imports
import { verticalLayoutClasses } from '@layouts/utils/layoutClasses'



interface IFooterContent {
  image: string;
  text: string;
  textColor: string;
}

const FooterContent = () => {
  // Hooks
  const { settings } = useSettings()

  const [content, setContent] = useState<IFooterContent>();

  const [preferedSystemMode, setPreferedSystemMode] = useState<'light' | 'dark'>('dark')

  const getSystemMode = (): 'light' | 'dark' => {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }


  useEffect(() => {
    const handleSystemModeChange = (e: MediaQueryListEvent) => {
      setPreferedSystemMode(e.matches ? 'dark' : 'light')
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    mediaQuery.addEventListener('change', handleSystemModeChange)

    return () => {
      mediaQuery.removeEventListener('change', handleSystemModeChange)
    }
  }, [])

  useEffect(() => {
    setPreferedSystemMode(getSystemMode())
  }, [settings.mode])

  useEffect(() => {
    setContent({
      text: `© ${new Date().getFullYear()}, Feito com ❤️ por `,
      image: `${settings.mode === 'dark' || settings.mode === 'system' && preferedSystemMode === 'dark' ? '/images/byron_logo.png' : '/images/byron_logo_claro.png'}`,
      textColor: `${settings.mode === 'dark' || settings.mode === 'system' && preferedSystemMode === 'dark' ? 'text-white' : 'text-black'}`
    })
  }, [settings.mode, preferedSystemMode])

  return (
    <div
      className={classnames(verticalLayoutClasses.footerContent, 'flex items-center justify-center md:justify-start flex-wrap gap-2')}
    >
      <p className='pb-1'>
        <span className={`${content?.textColor} text-lg`}>{content?.text}</span>
      </p>
      <p>
        <Link href='https://byronsolutions.com' target='_blank' className='text-primary lowercase flex justify-center md:justify-start'>
          <img src={content?.image} alt="byron.solutions" className='w-2/3 sm:w-11/12 md:w-3/5'/>
        </Link>
      </p>
    </div>
  )
}

export default FooterContent
