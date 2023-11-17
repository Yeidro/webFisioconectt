import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/libs/mongodb";
import { messages } from "@/utils/messages";
import User from "@/models/User";

export async function GET(request: NextRequest) {
    try {
        // Conectar a MongoDB
        await connectMongoDB();
        // Obtener la lista de usuarios
        const users = await User.find();
        // Enviar la lista de usuarios como respuesta exitosa
        return NextResponse.json({ users }, { status: 200 });
    } catch (error) {
        // Manejar errores
        // Enviar una respuesta de error sin revelar detalles internos
        return NextResponse.json(
            { message: messages.error.default, error },
            { status: 500 }
        );
    }
}