// Indica que este archivo es para el lado del cliente (browser)
'use client';

import { useContext } from 'react'
import { FormContext } from '..'
import styles from './styles.module.scss'

// Define la interfaz para las propiedades del componente Input
interface InputProps {
    type?: 'text' | 'password'; // Tipo de input, por defecto es 'text'
    name: string; // Nombre del input
    label: string; // Etiqueta del input
    placeholder?: string; // Texto de marcador de posición opcional
}

// Define el componente funcional Input que toma las propiedades definidas en la interfaz
export function Input({ label, name, placeholder, type }: InputProps) {
    // Extrae formValues y setFormValues del contexto FormContext utilizando el hook useContext
    const { formValues, setFormValues } = useContext(FormContext)!;

    // Maneja el cambio en el input y actualiza el estado del formulario
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target
        setFormValues(prevValues => ({
            ...prevValues,
            [name]: value
        }))
    }
    // Devuelve el JSX del componente Input
    return (
        <div className={styles.inputContainer}>
            <label className={styles.label} htmlFor={name}>
                {label}
            </label>
            <input
                type={type}
                id={name}
                name={name}
                value={formValues[name] || ''}
                onChange={handleChange}
                placeholder={placeholder}
            />
        </div>
    )
}