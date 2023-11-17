import styles from "./styles.module.scss";
// Define el componente funcional Loader que acepta un tamaño opcional
export const Loader = ({ size = 25 }: { size?: number }) => {
    return (
        // Utiliza un div para representar el spinner, con un tamaño basado en la propiedad size
        <div style={{ width: size, height: size }} className={styles.spinner} />
    );
};