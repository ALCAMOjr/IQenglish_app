import axios from "axios";

// Obtener la URL base de la variable de entorno o usar la URL local por defecto
const baseUrl = (import.meta.env.VITE_API || 'http://localhost:3001/api') + '/reviews';

export default async function getReviews() {
    try {
        const response = await axios.get(baseUrl);

        if (response.status !== 200) {
            throw new Error('Response is NOT ok');
        }

        return response.data;
    } catch (error) {
        throw error;
    }
}
