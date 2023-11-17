// Importa el componente Link de Next.js para la navegación entre páginas
import Link from 'next/link';

// Define la interfaz para las propiedades del componente Footer
interface FooterProps {
    description: string; // Descripción que se mostrará en el pie de página
    textLink: string; // Texto del enlace
    link: string; // Ruta a la que apunta el enlace
}

// Define el componente funcional Footer que toma las propiedades definidas en la interfaz
export function Footer({ description, link, textLink }: FooterProps) {
    return (
        <div className='w-full flex justify-center mt-3'>
            <span className='text-[12px]'>
                {description}{' '}
                <Link href={link} className='font-bold'>
                    {textLink}
                </Link>
            </span>
        </div>
    )
}