import { useState } from 'react'

// Define la interfaz para el estado del loader
interface LoaderState {
    isLoading: boolean
    startLoading: () => void
    finishLoading: () => void
}
// Define el hook personalizado useLoading
export function useLoading(): LoaderState {
    // Utiliza el estado local para gestionar el estado de carga
    const [isLoading, setIsLoading] = useState(false)
    // Función para iniciar la carga
    const startLoading = () => {
        setIsLoading(true)
    }
    // Función para finalizar la carga
    const finishLoading = () => {
        setIsLoading(false)
    }
    // Devuelve el estado y las funciones asociadas
    return {
        isLoading,
        startLoading,
        finishLoading
    }
}