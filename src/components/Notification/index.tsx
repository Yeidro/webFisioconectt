import { StatusNotification } from '@/interfaces'
import styles from './styles.module.scss'
// Importa el tipo StatusNotification
interface Props {
    status: StatusNotification
    msj: string | null
}
// Define el componente funcional Notification que toma las propiedades definidas en la interfaz Props
export const Notification = ({ status, msj }: Props) => {
    return (
        // Utiliza plantillas de cadena para combinar las clases de estilo con el status
        <div className={`${styles.notification} ${styles[status!]}`}>
            <p>{msj}</p>
        </div>
    )
}