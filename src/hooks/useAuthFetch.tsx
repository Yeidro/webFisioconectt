import NotificationContext from '@/context/NotificationContext'
import axios, { AxiosRequestConfig } from 'axios'// Importa axios y AxiosRequestConfig de las bibliotecas correspondientes
import { useRouter } from 'next/navigation'// Importa el hook useRouter de next/navigation
import { useContext } from 'react'

// Define las propiedades que acepta el hook useAuthFetch
interface AuthFetchProps {
    endpoint: string
    redirectRoute?: string
    formData: any
    options?: AxiosRequestConfig<any>
}
// Define el hook personalizado useAuthFetch
export function useAuthFetch() {
    // Extrae la función showNotification del contexto NotificationContext
    const { showNotification } = useContext(NotificationContext)
    // Utiliza el hook useRouter para obtener acceso al enrutador de Next.js
    const router = useRouter()
    // Define la función authRouter que realiza la solicitud de autenticación
    const authRouter = async ({
        endpoint,
        formData,
        redirectRoute,
        options
    }: AuthFetchProps) => {
        try {
            // Realiza una solicitud POST a la ruta `/api/auth/${endpoint}`
            const { data } = await axios.post(
                `/api/auth/${endpoint}`,
                formData,
                options
            )
            // Muestra una notificación de éxito con el mensaje recibido
            showNotification({
                msj: data.message,
                open: true,
                status: 'success'
            })
            // Redirecciona a la ruta especificada si se proporciona
            if (redirectRoute) router.push(redirectRoute)
        } catch (error: any) {
            // Muestra una notificación de error con el mensaje de error recibido
            showNotification({
                msj: error.response.data.message as string,
                open: true,
                status: 'error'
            })
        }
    }
    // Devuelve la función authRouter para su uso
    return authRouter
}