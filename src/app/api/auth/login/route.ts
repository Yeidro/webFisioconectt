import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/libs/mongodb";
import User, { IUser } from "@/models/User";
import { messages } from "@/utils/messages";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
    try {
        // Conectar a MongoDB
        await connectMongoDB();

        const body: IUser = await request.json();
        const { email, password } = body;

        // Validamos que se envien todos los campos
        if (!email || !password) {
            return NextResponse.json(
                { message: messages.error.needProps },
                { status: 400 }
            );
        }

        const userFind = await User.findOne({ email });

        // Validamos que exista el usuario por el correo
        if (!userFind) {
            return NextResponse.json(
                { message: messages.error.userNotFound },
                { status: 400 }
            );
        }

        const isCorrect: boolean = await bcrypt.compare(
            password,
            userFind.password
        );

        // Validamos que la contraseña sea la correcta
        if (!isCorrect) {
            return NextResponse.json(
                { message: messages.error.incorrectPassword },
                { status: 400 }
            );
        }
        // Eliminar la contraseña del objeto del usuario antes de enviar la respuesta
        const { password: userPass, ...rest } = userFind._doc;
        // Generar un token JWT
        const token = jwt.sign({ data: rest }, "secreto", {
            expiresIn: 86400,
        });
        // Configurar la respuesta exitosa
        const response = NextResponse.json(
            { userLogged: rest, message: messages.success.userLogged },
            { status: 200 }
        );
        // Configurar la cookie 'auth_cookie'
        response.cookies.set("auth_cookie", token, {
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 86400,
            path: "/",
        });
        // Enviar la respuesta
        return response;
    } catch (error) {
        // Enviar una respuesta de error sin revelar detalles internos
        return NextResponse.json(
            { message: messages.error.default, error },
            { status: 500 }
        );
    }
}