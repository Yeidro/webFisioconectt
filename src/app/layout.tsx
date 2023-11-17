import { NotificationProvider } from '@/context/NotificationContext'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import './globals.css'
// Configura la fuente Inter con el conjunto de caracteres 'latin'
const inter = Inter({ subsets: ['latin'] })
// Define la metadata de la aplicación
export const metadata: Metadata = {
  title: 'Auth Sena',
  description: 'Sistema de autenticacion con Nextjs 13'
}
// Define las propiedades del componente RootLayout
interface RootLayoutProps {
  children: React.ReactNode
}
// Define el componente RootLayout
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    // Configura la estructura HTML básica con la fuente Inter y el proveedor de notificaciones
    <html lang='en'>
      <body className={inter.className}>
        <NotificationProvider>
          <main className='min-h-screen flex flex-col items-center justify-center'>
            {children}
          </main>
        </NotificationProvider>
      </body>
    </html>
  )
}
