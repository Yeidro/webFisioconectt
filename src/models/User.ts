import mongoose, { Schema, Document, ObjectId } from "mongoose";


// Define una interfaz para la estructura de un usuario
export interface IUser {
    _id?: ObjectId | string | undefined;
    email: string;
    password: string;
    createdAt?: string;
    updatedAt?: string;
}

// Define una interfaz extendida de Document para el modelo de usuario
export interface IUserSchema extends Document {
    _id?: ObjectId | string | undefined;
    email: string;
    password: string;
    createdAt?: string;
    updatedAt?: string;
}

// Define el esquema (schema) del usuario con las propiedades y opciones necesarias
const UserSchema: Schema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
},

    {
        versionKey: false, // Desactiva la versión '__v' que Mongoose añade por defecto
        timestamps: true, // Añade campos createdAt y updatedAt automáticamente

    }

)
// Crea o recupera el modelo 'User' según exista o no
const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;