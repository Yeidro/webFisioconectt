// Define una función llamada dateTransform que toma una cadena de fecha y devuelve otra cadena formateada
export function dateTransform(date: string): string {
    // Divide la cadena de fecha en base al carácter 'T' y toma la primera parte (la fecha)
    const formattedDate = date.split("T")[0];

    // Devuelve una cadena formateada indicando que el usuario fue creado en la fecha proporcionada
    return `El usuario fue creado el ${formattedDate}`;
}
