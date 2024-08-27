'use client'

// React Imports
import { useEffect, useState } from 'react'

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
import Divider from '@mui/material/Divider'

import classnames from 'classnames'

import api from '../../axiosConfig'

// Third-party Imports

// Type Imports
import type { SystemMode } from '@core/types'

// Component Imports
import Link from '@components/Link'
import Logo from '@components/layout/shared/Logo'
import CustomTextField from '@core/components/mui/TextField'
import ModalError from '@/components/layout/shared/ModalError'

// Config Imports
import themeConfig from '@configs/themeConfig'

// Hook Imports
import { useImageVariant } from '@core/hooks/useImageVariant'
import { useSettings } from '@core/hooks/useSettings'
import { SettingsContext } from '@/@core/contexts/settingsContext'

import { object, ref, Schema, string, StringSchema } from 'yup'

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

interface IGradient {
  dir: string,
  from: string,
  via: string,
  to: string
}

interface IFormField
{
  schema: StringSchema,
  error: string,
  seen?: boolean,
  focused: boolean
}

const LoginV2 = ({ mode }: { mode: SystemMode }) => {
  // States
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [isPasswordConfirmationShown, setIsPasswordConfirmationShown] = useState(false)

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
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [error, setError] = useState('')

  const [nameField, setNameField] = useState<IFormField>({
    schema: string().required("Campo não pode estar vazio.").min(4, 'Campo deve conter ao menos 4 caracteres'),
    error: '',
    seen: false,
    focused: false
  })

  useEffect(() => {
    nameField.schema.validate(name).then(()=>{
      setNameField({...nameField, error: ''})
    }).catch((err) => {
      setNameField({...nameField, error: err.message})
    })
  }, [name])

    const [lastNameField, setLastNameField] = useState<IFormField>({
    schema: string().required("Campo não pode estar vazio.").min(4, 'Campo deve conter ao menos 4 caracteres'),
    error: '',
    seen: false,
    focused: false
  })

  useEffect(() => {
    lastNameField.schema.validate(lastName).then(()=>{
      setLastNameField({...lastNameField, error: ''})
    }).catch((err) => {
      setLastNameField({...lastNameField, error: err.message})
    })
  }, [lastName])

  const [emailField, setEmailField] = useState<IFormField>({
    schema: string().required("Campo não pode estar vazio.").matches(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Esse campo deve ser preenchido com um email valido"),
    error: '',
    seen: false,
    focused: false
  })

  useEffect(() => {
    emailField.schema.validate(email).then(()=>{
      setEmailField({...emailField, error: ''})
    }).catch((err) => {
      setEmailField({...emailField, error: err.message})
    })
  }, [email])

  const [passwordField, setPasswordField] = useState<IFormField>({
    schema: string().required("Campo não pode estar vazio."),
    error: '',
    seen: false,
    focused: false
  })

  useEffect(() => {
    passwordField.schema.validate(password).then(()=>{
      setPasswordField({...passwordField, error: ''})
    }).catch((err) => {
      setPasswordField({...passwordField, error: err.message})
    })
  }, [password])

  const [passwordConfirmationField, setPasswordConfirmationField] = useState<IFormField>({
    schema: string().required("Campo não pode estar vazio.").oneOf([password], "Os campos de senha não coincidem."),
    error: '',
    seen: false,
    focused: false
  })

  useEffect(() => {

    passwordConfirmationField.schema = string().required("Campo não pode estar vazio.").oneOf([password], "Os campos de senha não coincidem.")

    passwordConfirmationField.schema.validate(passwordConfirmation).then(()=>{
      setPasswordConfirmationField({...passwordConfirmationField, error: ''})
    }).catch((err) => {
      setPasswordConfirmationField({...passwordConfirmationField, error: err.message})
    })
  }, [passwordConfirmation, password])

  // fazer requisição certa e revisar a presença de erros antes de permitir a requisição

  const validateFields = async () => {

    const schema = object({
      name: nameField.schema,
      last_name: lastNameField.schema,
      email: emailField.schema,
      password: passwordField.schema,
      password_confirmation: passwordConfirmationField.schema
    })

    return await schema.validate({name: name, last_name: lastName, email: email, password: password, password_confirmation: passwordConfirmation})
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = { email, password, name, last_name: lastName }


    validateFields().then(() => {

      api
      .post('/auth/register', data)
      .then(response => {
        localStorage.setItem('token', response.data.access_token)
        localStorage.setItem('email', email)
        router.push('/home')

      })
      .catch(error => {

        if (
          error.response
       && error.response.status === 400
       && error.response.data.message === 'E-mail já cadastrado.'
      ) {
          setError('Email inválido para cadastro. Tente outro email.')
        } else if (
          error.response &&
          error.response.status === 400 &&
          error.response.data.message.includes('email must be an email')
        ) {
          setError('Formato inválido para email.')
        }

      })

    }).catch(() => {

      setError("Campos Inválidos. Verifique o preenchimento e tente novamente.")

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
  const handleClickShowPasswordConfirmation = () => setIsPasswordConfirmationShown(show => !show)

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
            <Typography>Por favor, cadastre-se para dar início aos seus estudos</Typography>
          </div>
          <form noValidate autoComplete='off' onSubmit={handleSubmit} className='flex flex-col gap-5'>
            <div>
              <CustomTextField
                autoFocus
                fullWidth
                label='Nome'
                placeholder='Insira seu Nome'
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setName(event.target.value)
                  setNameField({...nameField, focused: true})
                }}
                required
                onBlur={() => {
                  setNameField({...nameField, seen: true, focused: false})
                }}
                error={(nameField.seen || nameField.focused) && nameField.error !== ''}
              />
              <p className='text-red-500'>{(nameField.seen || nameField.focused) && nameField.error}</p>
            </div>
            <div>
              <CustomTextField
                fullWidth
                label='Sobrenome'
                placeholder='Insira seu Sobrenome'
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setLastName(event.target.value)
                  setLastNameField({...nameField, focused: true})
                }}
                required
                onBlur={() => {
                  setLastNameField({...lastNameField, seen: true, focused: false})
                }}
                error={(lastNameField.seen || lastNameField.focused) && lastNameField.error !== ''}
              />
               <p className='text-red-500'>{(lastNameField.seen || lastNameField.focused) && lastNameField.error}</p>
            </div>
            <div>
              <CustomTextField
                fullWidth
                label='Email'
                placeholder='Insira seu Email'
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setEmail(event.target.value)
                  setEmailField({...emailField, focused: true})
                }}
                required
                onBlur={() => {
                  setEmailField({...emailField, seen: true, focused: false})
                }}
                error={(emailField.seen || emailField.focused) && emailField.error !== ''}
              />
              <p className='text-red-500'>{(emailField.seen || emailField.focused) && emailField.error}</p>
            </div>
            <div>
              <CustomTextField
                fullWidth
                label='Senha'
                placeholder='············'
                id='outlined-adornment-password'
                type={isPasswordShown ? 'text' : 'password'}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setPassword(event.target.value)
                  setPasswordField({...passwordField, focused: true})
                }}
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
                required
                onBlur={() => {
                  setPasswordField({...passwordField, seen: true, focused: false})
                }}
                error={(passwordField.seen || passwordField.focused) && passwordField.error !== ''}
              />
              <p className='text-red-500'>{(passwordField.seen || passwordField.focused) && passwordField.error}</p>
            </div>
            <div>
              <CustomTextField
                fullWidth
                label='Confirmar senha'
                placeholder='············'
                id='outlined-adornment-password-confirmation'
                type={isPasswordConfirmationShown ? 'text' : 'password'}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setPasswordConfirmation(event.target.value)
                  setPasswordConfirmationField({...passwordConfirmationField, focused: true})
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        onClick={handleClickShowPasswordConfirmation}
                        onMouseDown={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => e.preventDefault()}
                      >
                        <i className={isPasswordConfirmationShown ? 'tabler-eye-off' : 'tabler-eye'} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                required
                onBlur={() => {
                  setPasswordConfirmationField({...passwordConfirmationField, seen: true, focused: false})
                }}
                error={(passwordConfirmationField.seen || passwordConfirmationField.focused) && passwordConfirmationField.error !== ''}
              />
              <p className='text-red-500'>{(passwordConfirmationField.seen || passwordConfirmationField.focused) && passwordConfirmationField.error}</p>
            </div>
            <p className='text-center text-secondary'>Ao se cadastrar, você concorda com os termos e políticas de privacidade</p>
            <Button fullWidth variant='contained' type='submit'>
              Cadastrar
            </Button>
            <div className='flex justify-center items-center flex-wrap gap-2'>
              <Typography>Já tem uma conta?</Typography>
              <Typography color='primary'>
              <Link href='/login'> Entre </Link>
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
