'use client'

// React Imports
import { useState } from 'react'

// Next Imports
import { useRouter } from 'next/navigation'

// MUI Imports
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'

import classnames from 'classnames'

import api from '../../axiosConfig'

// Third-party Imports

// Type Imports
import type { SystemMode } from '@core/types'

// Component Imports
import Link from '@components/Link'
import CustomTextField from '@core/components/mui/TextField'
import ModalError from '@/components/layout/shared/ModalError'

// Config Imports
import themeConfig from '@configs/themeConfig'

// Hook Imports
import { useImageVariant } from '@core/hooks/useImageVariant'
import { useSettings } from '@core/hooks/useSettings'
import Loading from '@/components/Loading/Loading'

// Styled Custom Components
const LoginIllustration = styled('img')(({ theme }) => ({
  zIndex: 2,
  blockSize: 'auto',
  maxBlockSize: 680,
  maxInlineSize: '100%',
  margin: theme.spacing(12),
  [theme.breakpoints.down(1536)]: {
    maxBlockSize: 550
  },
  [theme.breakpoints.down('lg')]: {
    maxBlockSize: 450
  }
}))

const MaskImg = styled('img')({
  blockSize: 'auto',
  maxBlockSize: 355,
  inlineSize: '100%',
  position: 'absolute',
  insetBlockEnd: 0,
  zIndex: -1
})

const LoginV2 = ({ mode }: { mode: SystemMode }) => {
  // States
  const [isPasswordShown, setIsPasswordShown] = useState(false)

  // Vars
  const darkImg = '/images/pages/auth-mask-dark.png'
  const lightImg = '/images/pages/auth-mask-light.png'
  const darkIllustration = '/images/logo_dex.png'
  const lightIllustration = '/images/logo_dex_claro.png'
  const borderedDarkIllustration = '/images/illustrations/auth/v2-login-dark-border.png'
  const borderedLightIllustration = '/images/illustrations/auth/v2-login-light-border.png'

  // Hooks
  const router = useRouter()
  const { settings } = useSettings()
  const theme = useTheme()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))
  const authBackground = useImageVariant(mode, lightImg, darkImg)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = { email, password }
    setIsLoading(true)
    api
      .post('/auth/login', data)
      .then(response => {
        localStorage.setItem('token', response.data.access_token)
        localStorage.setItem('email', email)
        router.push('/home')
      })
      .catch(error => {
        setIsLoading(false)
        if (error.response && error.response.status === 400 && error.response.data.message === 'Senha incorreta.') {
          setError('Email ou senha errado.')
        } else if (
          error.response &&
          error.response.status === 404 &&
          error.response.data.message === 'Usuário não cadastrado.'
        ) {
          setError('Email ou senha errado.')
        }
      })
  }

  const characterIllustration = useImageVariant(
    mode,
    lightIllustration,
    darkIllustration,
    borderedLightIllustration,
    borderedDarkIllustration
  )

  const handleClickShowPassword = () => setIsPasswordShown(show => !show)

  const handleClose = () => {
    setError('')
  }



  return (
    <div className='flex bs-full justify-center'>
      <div
        className={classnames(
          'flex bs-full items-center justify-center flex-1 min-bs-[100dvh] relative p-6 max-md:hidden bg-gradient-to-tl',
          {
            'border-ie': settings.skin === 'bordered'
          },
          `${settings.mode === 'light' ? 'bg-gradient-to-tl from-light-gradient-min via-light-gradient-med to-light-gradient-max' : 'bg-gradient-to-l from-dark-gradient-min via-dark-gradient-med bg-dark-gradient-max'}`
        )}
      >
        <LoginIllustration src={characterIllustration} alt='character-illustration' />
        {!hidden && (
          <MaskImg
            alt='mask'
            src={authBackground}
            className={classnames({ 'scale-x-[-1]': theme.direction === 'rtl' })}
          />
        )}
      </div>
      <div className='flex justify-center items-center bs-full bg-backgroundPaper !min-is-full p-6 md:!min-is-[unset] md:p-12 md:is-[480px]'>
        {/* <div className='absolute block-start-5 sm:block-start-[33px] inline-start-6 sm:inline-start-[38px]'>
          <Logo />
        </div> */}
        <div className='flex flex-col gap-6 is-full sm:is-auto md:is-full sm:max-is-[400px] md:max-is-[unset] mbs-11 sm:mbs-14 md:mbs-0'>
          <div className='flex flex-col gap-1'>
            <Typography variant='h4'>{`Bem-vindo(a) a ${themeConfig.templateName}! 👋🏻`}</Typography>
            <Typography>Por favor, faça login para dar início aos seus estudos</Typography>
          </div>
          <form noValidate autoComplete='off' onSubmit={handleSubmit} className='flex flex-col gap-5'>
            <CustomTextField
              autoFocus
              fullWidth
              label='Email ou Nome de Usuário'
              placeholder='Insira seu Email ou Nome de Usuário'
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
            />
            <CustomTextField
              fullWidth
              label='Senha'
              placeholder='············'
              id='outlined-adornment-password'
              type={isPasswordShown ? 'text' : 'password'}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      onClick={handleClickShowPassword}
                      onMouseDown={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => e.preventDefault()}
                    >
                      <i className={isPasswordShown ? 'tabler-eye-off' : 'tabler-eye'} />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <div className='flex justify-between items-center gap-x-3 gap-y-1 flex-wrap'>
              <FormControlLabel control={<Checkbox />} label='Lembrar de mim' />
              <Typography className='text-end' color='primary' component={Link}>
                Esqueceu sua senha?
              </Typography>
            </div>
            <Button fullWidth variant='contained' type='submit' className='overflow-hidden'>
              {!isLoading ? `Login` : <div className='text-white text-3xl animate-spin rounded-full tabler-loader-2' />}
            </Button>
            <div className='flex justify-center items-center flex-wrap gap-2'>
              <Typography>Você é novo por aqui?</Typography>
              <Typography color='primary'>
              <Link href='/register'> Crie uma conta </Link>
              </Typography>
            </div>
          </form>
        </div>
      </div>
      <ModalError error={error} handleClose={handleClose} />
    </div>
  )
}

export default LoginV2
