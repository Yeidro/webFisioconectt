import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/libs/mongodb";
import { messages } from "@/utils/messages";
import { headers } from "next/headers";
import jwt from "jsonwebtoken";
import User from "@/models/User";
import bcrypt from "bcryptjs";

interface BodyProps {
    newPassword: string;
    confirmPassword: string;
}
export async function POST(request: NextRequest) {

    try {
        const body: BodyProps = await request.json();

        const { newPassword, confirmPassword } = body;

        //validamos que esten los campos

        if (!newPassword || !confirmPassword) {
            return NextResponse.json(
                { message: messages.error.needProps },
                { status: 400 }
            );

        }

        await connectMongoDB();

        const headersList = headers()
        const token = headersList.get("token")
        // verificar que hay token
        if (!token) {

            return NextResponse.json({
                message: messages.error.notAuthorized
            },
                { status: 400 })

        }

        try {
            const isTokenValid = jwt.verify(token, 'secreto');

            // @ts-ignore
            const { data } = isTokenValid;

            const userFind = await User.findById(data.userId);
            // validamos que exista el usuario
            if (!userFind) {
                return NextResponse.json(
                    { message: messages.error.userNotFound },
                    { status: 404 }
                );
            }
            // validamos que la nueva contraseña sea igual a la confirmacion
            if (newPassword !== confirmPassword) {
                return NextResponse.json(
                    { message: messages.error.userNotFound },
                    { status: 404 }
                );
            }
            // Cifrar y actualizar la contraseña
            const hashedPassword = await bcrypt.hash(newPassword, 10);

            userFind.password = hashedPassword

            await userFind.save();

            return NextResponse.json(
                { message: messages.success.passwordChanged },
                { status: 404 }
            );
        } catch (error) {
            return NextResponse.json(
                { message: messages.error.tokenNotValid, error },
                { status: 400 }
            );

        }
    } catch (error) {
        return NextResponse.json(
            { message: messages.error.default, error },
            { status: 400 }
        );

    }
}