// Next Imports
import type { Metadata } from 'next'

// Component Imports
import Register from '@views/Register'

// Server Action Imports
import { getServerMode } from '@core/utils/serverHelpers'

export const metadata: Metadata = {
  title: 'Cadastrar-se',
  description: 'Cadastre-se na plataforma'
}

const LoginPage = () => {
  // Vars
  const mode = getServerMode()

  return <Register mode={mode} />
}

export default LoginPage
