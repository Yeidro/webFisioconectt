// Define una función llamada isValidEmail que toma una cadena de correo electrónico y devuelve un booleano
export function isValidEmail(email: string): boolean {
    // Expresión regular para validar el formato básico de una dirección de correo electrónico
    const emailRegex = /\S+@\S+\.\S+/;

    // Devuelve true si la cadena coincide con la expresión regular, de lo contrario, devuelve false
    return emailRegex.test(email);
}
