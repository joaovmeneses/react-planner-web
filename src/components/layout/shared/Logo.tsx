'use client'

// React Imports
import { useEffect, useRef, useState } from 'react'

// Next Imports
// import Img from 'next/image'
import Link from 'next/link'

// Hook Imports
import useVerticalNav from '@menu/hooks/useVerticalNav'
import { useSettings } from '@core/hooks/useSettings'


const Logo = () => {
  // Refs
  const logoTextRef = useRef<HTMLSpanElement>(null)

  // Hooks
  const { isHovered} = useVerticalNav()
  const { settings } = useSettings()

  // Vars
  const { layout } = settings

  useEffect(() => {
    if (layout !== 'collapsed') {
      return
    }

    if (logoTextRef && logoTextRef.current) {
      if (layout === 'collapsed' && !isHovered) {
        logoTextRef.current?.classList.add('hidden')
      } else {
        logoTextRef.current.classList.remove('hidden')
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHovered, layout])

  const [preferedSystemMode, setPreferedSystemMode] = useState<'light' | 'dark'>('dark')
  const [logo, setLogo] = useState<string>('')

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
    setLogo(settings.mode === 'dark' || settings.mode === 'system' && preferedSystemMode === 'dark' ? '/images/logo_dex.png' : '/images/logo_dex_allblack.png')
  }, [settings.mode, preferedSystemMode])

  // You may return any JSX here to display a logo in the sidebar header
  // return <Img src='/next.svg' width={100} height={25} alt='logo' /> // for example
  return (
    <Link href='/' className='flex items-center'>
      {/* <VuexyLogo className='text-2xl text-primary' /> */}
      {/*
      <LogoText
        ref={logoTextRef}
        isHovered={isHovered}
        isCollapsed={layout === 'collapsed'}
        transitionDuration={transitionDuration}
      >
        {themeConfig.templateName}
      </LogoText> */}
      <img src={logo} alt="" className='w-1/2'/>
    </Link>
  )
}

export default Logo
