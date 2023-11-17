'use client'

import { Footer, Input, SubmitButton } from './components'
import { createContext, useState } from 'react'
import styles from './styles.module.scss'
// Define un tipo para las propiedades del formulario
type FormValues = Record<string, string>
// Define una interfaz para el contexto del formulario
interface FormContextType {
    formValues: FormValues
    setFormValues: React.Dispatch<React.SetStateAction<FormValues>>
}
// Define una interfaz para las propiedades del componente Form
interface FormProps {
    title: string
    description?: string
    onSubmit: (values: FormValues) => void
    children: React.ReactNode
}
// Crea el contexto del formulario
export const FormContext = createContext<FormContextType | undefined>(undefined)
// Define el componente funcional Form que toma las propiedades definidas en la interfaz
export function Form({ title, children, onSubmit, description }: FormProps) {
    const [formValues, setFormValues] = useState<FormValues>({})

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        onSubmit(formValues)
    }
    // Renderiza el formulario y proporciona el contexto a sus componentes hijos
    return (
        <FormContext.Provider value={{ formValues, setFormValues }}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.descriptionContainer}>
                    <h2>{title}</h2>
                    {description && <p>{description}</p>}
                </div>
                {children}
            </form>
        </FormContext.Provider>
    )
}

Form.Input = Input
Form.Footer = Footer
Form.SubmitButton = SubmitButton