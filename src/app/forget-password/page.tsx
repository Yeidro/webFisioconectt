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
  // Función para manejar la recuperación de contraseña
  const forgetPassword = async (formData: any) => {
    // Inicia la carga
    startLoading()
    // Realiza la solicitud de recuperación de contraseña utilizando authFetch
    await authFetch({
      endpoint: 'forget-password',
      formData
    })
    // Finaliza la carga después de la solicitud exitosa
    finishLoading()
  }
  // Renderiza el formulario de recuperación de contraseña
  return (
    <>
      <Form
        title='Recuperar contraseña'
        description='Formulario para recuperar tu contraseña'
        onSubmit={forgetPassword}
      >
        <div className='my-[10px] flex flex-col gap-4'>
          <Form.Input
            label='Correo'
            name='email'
            placeholder='Ingresa tu correo...'
          />
        </div>
        <Form.SubmitButton
          buttonText='Recuperar Contraseña'
          isLoading={isLoading}
        />
        <Form.Footer
          description='Volver al inicio'
          textLink='Inicio'
          link='/'
        />
      </Form>
    </>
  )
}