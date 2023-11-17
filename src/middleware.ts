import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
    try {
        // Obtiene el token de las cookies
        const token = request.cookies.get('auth_cookie')
        // Si no hay token, redirige al usuario a la página de inicio
        if (!token) {
            return NextResponse.redirect(new URL('/', request.url))
        }
        // Realiza una solicitud al servidor de autenticación para verificar el token
        const res = await fetch('http://localhost:3000/api/auth/check', {
            headers: {
                token: token.value
            }
        })

        const data = await res.json()

        // @ts-ignore
        if (!data.isAuthorized) {
            return NextResponse.redirect(new URL('/', request.url))
        }
        // Si está autorizado, permite que la solicitud continúe
        return NextResponse.next()
    } catch (error) {
        // En caso de error, redirige al usuario a la página de inicio
        return NextResponse.redirect(new URL('/', request.url))
    }
}
// Configuración del middleware con una ruta específica para coincidir
export const config = {
    matcher: '/home'
}