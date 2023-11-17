import { connectMongoDB } from "@/libs/mongodb";
import User from "@/models/User";
import { messages } from "@/utils/messages";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import jwt from "jsonwebtoken";


const resend = new Resend("re_SYQitRN2_GijyXy5B1bxEpQ9izcBci47C");

export async function POST(request: NextRequest) {

    try {
        const body: { email: string } = await request.json();
        const { email } = body;
        // Conectar a MongoDB
        await connectMongoDB();
        // Buscar el usuario por el correo
        const userFind = await User.findOne({ email });

        // validar que exista el usuario
        if (!userFind) {
            return NextResponse.json(
                { message: messages.error.userNotFound },
                { status: 404 }
            );
        }
        // Datos para el token
        const tokenData = {
            email: userFind.email,
            userId: userFind._id,
        }
        // Generar un token JWT
        const token = jwt.sign({ data: tokenData }, "secreto", {
            expiresIn: 86400,
        });

        const forgetUrl = `http://localhost:3000/change-password?token=${token}`;
        // Enviar correo electrónico
        // @ts-ignore
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            // to: email,
            to: "yeiddre@gmail.com",
            subject: "Cambio de contraseña",
            html: `<a href=${forgetUrl}>Cambiar contraseña`
        })
        // Enviar respuesta exitosa
        return NextResponse.json(
            { message: messages.success.emailSent },
            { status: 200 }
        );

    } catch (error) {
        // Enviar respuesta de error sin revelar detalles internos
        return NextResponse.json(
            { message: messages.error.default, error },
            { status: 500 }
        );

    }


}