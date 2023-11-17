import mongoose from "mongoose";
// URL de conexión a MongoDB
const MONGO_URL = "mongodb://127.0.0.1/auth";
// Función asincrónica para conectar a MongoDB
export const connectMongoDB = async () => {
    try {
        // Intenta conectarse a MongoDB utilizando la URL proporcionada
        await mongoose.connect(MONGO_URL);
        // Imprime un mensaje en la consola indicando que se ha conectado a MongoDB con éxito
        console.log("Connected to MongoDB.");

    } catch (error) {
        // En caso de error, imprime el error en la consola
        console.log(error);
    }
};