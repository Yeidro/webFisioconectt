'use client'
// Importa el componente Notification y el tipo StatusNotification desde los módulos especificados
import { Notification } from '@/components/Notification'
import { StatusNotification } from '@/interfaces'
// Importa createContext y useState de React
import { createContext, useState } from 'react'
// Define una interfaz para el estado de la notificación
interface IState {
    open: Boolean
    status: StatusNotification
    msj: string | null
}
// Define una interfaz para la notificación que incluye las propiedades de IState y un método showNotification
interface INotification extends IState {
    showNotification: (props: IState) => void
}
// Define las propiedades del componente NotificationProvider
interface Props {
    children: JSX.Element | JSX.Element[]
}
// Define un estado inicial por defecto para la notificación
const defaultState: IState = {
    open: false,
    status: null,
    msj: null
}
// Crea el contexto de notificación
export const NotificationContext = createContext<INotification>(
    {} as INotification
)
// Define el componente funcional NotificationProvider que toma las propiedades definidas en la interfaz Props
export const NotificationProvider: React.FC<Props> = ({ children }) => {
    // Utiliza el estado local para gestionar el estado de la notificación
    const [notification, setNotification] = useState<IState>(defaultState)
    // Función para mostrar la notificación y ocultarla después de un tiempo
    const showNotification = (props: IState) => {
        if (props) {
            setNotification(props)
            // Oculta la notificación después de 3000 milisegundos (3 segundos)
            setTimeout(() => {
                setNotification({ open: false, msj: null, status: null })
            }, 3000)
        }
    }
    // Renderiza el proveedor de contexto y los componentes hijos
    return (
        <NotificationContext.Provider value={{ ...notification, showNotification }}>
            {children}
            {notification.open && (
                <>
                    <Notification status={notification.status} msj={notification.msj} />
                </>
            )}
        </NotificationContext.Provider>
    )
}

export default NotificationContext