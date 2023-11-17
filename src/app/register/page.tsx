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

  // Función para manejar el registro de usuario
  const register = async (formData: any) => {
    startLoading()
    // Realiza la solicitud de registro utilizando authFetch
    await authFetch({
      endpoint: 'register',
      redirectRoute: '/home',
      formData
    })
    window.location.href = 'https://yeisonbuitrago.wixsite.com/my-site';
    // Finaliza la carga después de la solicitud exitosa
    finishLoading()
  }
  // Renderiza el formulario de registro
  return (
    <>
      <Form
        title='Registrate'
        onSubmit={register}
        description='Formulario para crear una cuenta'
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
          <Form.Input
            placeholder='Repite tu contraseña...'
            label='Contraseña'
            name='confirmPassword'
            type='password'
          />
        </div>
        <Form.SubmitButton buttonText='Crear cuenta' isLoading={isLoading} />
        <Form.Footer
          description='Ya tienes cuenta?'
          textLink='Inicia Sesión'
          link='/'
        />
      </Form>
    </>
  )
}