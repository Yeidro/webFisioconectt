import { messages } from "@/utils/messages";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import jwt from "jsonwebtoken";
import { connectMongoDB } from "@/libs/mongodb";
import User from "@/models/User";

export async function GET() {
    try {
        const headersList = headers();
        const token = headersList.get("token");

        // Valido que haya token
        if (!token) {
            return NextResponse.json(
                { message: messages.error.notAuthorized },
                { status: 400 }
            );
        }

        try {
            // Verificar y decodificar el token
            const isTokenValid = jwt.verify(token, "secreto");
            // @ts-ignore
            const { data } = isTokenValid;

            await connectMongoDB();
            // Buscar al usuario por el ID
            const userFind = await User.findById(data._id);

            // Verificamos que exista el usuario
            if (!userFind) {
                return NextResponse.json(
                    { message: messages.error.userNotFound },
                    { status: 400 }
                );
            }
            // Enviar respuesta exitosa si el usuario está autorizado
            return NextResponse.json(
                { isAuthorized: true, message: messages.success.authorized },
                { status: 200 }
            );
        } catch (error) {
            // Manejar errores relacionados con el token
            return NextResponse.json(
                { message: messages.error.tokenNotValid, error },
                { status: 400 }
            );
        }
    } catch (error) {
        // Manejar errores generales
        return NextResponse.json(
            { message: messages.error.default, error },
            { status: 400 }
        );
    }
}