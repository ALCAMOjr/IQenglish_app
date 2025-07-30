import axios from "axios";

// Obtener la URL base de la variable de entorno o usar la URL local por defecto
const baseUrl = (import.meta.env.VITE_API || 'http://localhost:3001/api') + '/reviews';

export default async function createReview({ puntuacion, titulo, description, nombre }) {
    try {
        const response = await axios.post(baseUrl, {
            puntuacion,
            titulo,
            description,
            nombre
        });

        if (response.status !== 200) {
            throw new Error('Response is NOT ok');
        }

        return response.data;
    } catch (error) {
        throw error;
    }
}
