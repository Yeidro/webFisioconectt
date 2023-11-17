
'use client'

import { Form } from '@/components/Form'
import { useAuthFetch } from '@/hooks/useAuthFetch'
import { useLoading } from '@/hooks/useLoading'
import { AxiosRequestConfig } from 'axios'
import { useSearchParams } from 'next/navigation'

// Define el componente LoginPage
export default function LoginPage() {
  // Obtiene funciones y estados del hook useLoading
  const { finishLoading, isLoading, startLoading } = useLoading()
  // Obtiene los parámetros de búsqueda de la URL
  const searchParams = useSearchParams()
  // Obtiene la función de autenticación del hook useAuthFetch
  const authFetch = useAuthFetch()
  // Función para manejar el cambio de contraseña
  const changePassword = async (formData: any) => {
    startLoading()
    // Obtiene el token de los parámetros de búsqueda
    const token = searchParams.get('token')
    // Configuración de opciones para la solicitud (headers con token)
    const options: AxiosRequestConfig<any> = {
      headers: {
        token
      }
    }
    // Realiza la solicitud de cambio de contraseña utilizando authFetch
    await authFetch({
      endpoint: 'change-password',
      redirectRoute: '/', // Puedes ajustar la ruta de redirección
      formData,
      options
    })
    // Finaliza la carga después de la solicitud exitosa
    finishLoading()
  }
  // Manejo de errores: podrías mostrar un mensaje de error al usuario
  return (
    <>
      <Form
        title='Cambiar tu contraseña'
        description='Formulario para cambiar tu contraseña'
        onSubmit={changePassword}
      >
        <div className='my-[10px] flex flex-col gap-4'>
          <Form.Input
            placeholder='Ingresa tu nueva contraseña...'
            label='Contraseña'
            name='newPassword'
            type='password'
          />
          <Form.Input
            placeholder='Repite tu contraseña...'
            label='Confirmar contraseña'
            name='confirmPassword'
            type='password'
          />
        </div>
        <Form.SubmitButton
          buttonText='Cambiar Contraseña'
          isLoading={isLoading}
        />
      </Form>
    </>
  )
}