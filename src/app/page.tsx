'use client'

import { Form } from '@/components/Form'
import { useAuthFetch } from '@/hooks/useAuthFetch'
import { useLoading } from '@/hooks/useLoading'
// Define el componente LoginPage
export default function LoginPage() {
  // Obtiene funciones y estados del hook useLoading
  const { finishLoading, isLoading, startLoading } = useLoading()
  // Obtiene la función de autenticación del hook useAuthFetch
  const authFetch = useAuthFetch()
  // Función para manejar el inicio de sesión
  const login = async (formData: any) => {
    // Inicia la carga
    startLoading()
    await authFetch({
      endpoint: 'login',
      redirectRoute: '/home',
      formData
    })

    window.location.href = 'https://yeisonbuitrago.wixsite.com/my-site';

    finishLoading()
  }
  // Renderiza el formulario de inicio de sesión
  return (
    <>
      <Form
        title='Inicia Sesión'
        onSubmit={login}
        description='Formulario para iniciar sesión'
      >
        <div className='my-[10px] flex flex-col gap-4'>
          <Form.Input
            label='Correo'
            name='email'
            placeholder='Ingresa tu correo...'
          />
          <Form.Input
            placeholder='Ingresa tu contraseña...'
            label='Contraseña'
            name='password'
            type='password'
          />
        </div>
        <Form.SubmitButton buttonText='Iniciar Sesión' isLoading={isLoading} />
        <Form.Footer
          description='Te olvidate tu contraseña?'
          link='/forget-password'
          textLink='Recuperar contraseña'
        />
        <Form.Footer
          description='Aun no tienes cuenta?'
          link='/register'
          textLink='Registrate'
        />
      </Form>
    </>
  )
}