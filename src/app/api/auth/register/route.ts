import { connectMongoDB } from "@/libs/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { messages } from "@/utils/messages"
import { isValidEmail } from "@/utils/isValidEmail";
import User, { IUserSchema } from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"



export async function POST(request: NextRequest) {
    try {
        // Conectar a MongoDB
        await connectMongoDB();

        const body = await request.json()
        const { email, password, confirmPassword } = body;

        // validar que esten todos los campos enviados
        if (!email || !password || !confirmPassword) {
            return NextResponse.json(
                {
                    message: messages.error.needProps,

                },
                {
                    status: 400,
                }
            )
        }
        // validar si el email es un email
        if (!isValidEmail(email)) {
            return NextResponse.json(
                {
                    message: messages.error.emailNotvalid
                },
                {
                    status: 400,
                }
            );
        }
        // validar que las contraseñas sean iguales
        if (password !== confirmPassword) {
            return NextResponse.json(
                {
                    message: messages.error.passwordNotMatch
                },
                {
                    status: 400,
                }
            );

        }
        // Verificar si el email ya existe en la base de datos
        const userFind = await User.findOne({ email });
        if (userFind) {
            return NextResponse.json(
                {
                    message: messages.error.emalExist
                },
                {
                    status: 200,
                }
            );
        }
        // Hash de la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);
        // Crear un nuevo usuario
        const newUser: IUserSchema = new User({
            email,
            password: hashedPassword,
        });

        // @ts-ignore
        const { password: userPass, ...rest } = newUser._doc;
        // Guardar el nuevo usuario en la base de datos
        await newUser.save()
        // Generar un token JWT
        const token = jwt.sign({ data: rest }, 'secreto', {
            expiresIn: 86400,
        });
        // Configurar la respuesta exitosa
        const response = NextResponse.json({
            newUser: rest,
            message: messages.success.userCreated,
        }, {
            status: 200,
        })
        // Configurar la cookie 'auth_cookie'
        response.cookies.set('auth_cookie', token, {
            secure: process.env.NODE_ENV === 'production',
            sameSite: "strict",
            maxAge: 86400,
            path: "/",
        })
        // Enviar la respuesta
        return response;

    } catch (error) {
        // Enviar una respuesta de error sin revelar detalles internos
        return NextResponse.json(
            { message: messages.error.default, error },
            { status: 500 }
        )
    }
}

