import { Loader } from '@/components/Loader'
import styles from './styles.module.scss'

// Define la interfaz para las propiedades del componente SubmitButton
interface SubmitButtonProps {
    buttonText: string
    isLoading?: boolean
}
// Define el componente funcional SubmitButton que toma las propiedades definidas en la interfaz
export function SubmitButton({ buttonText, isLoading }: SubmitButtonProps) {
    return ( // Botón que utiliza la clase de estilo submitButton y tiene el tipo 'submit'
        <button className={styles.submitButton} type='submit' disabled={isLoading}>
            {isLoading ? <Loader /> : buttonText}
        </button>
    )
}