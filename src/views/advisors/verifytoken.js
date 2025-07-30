import axios from "axios";

// Obtener la URL base de la variable de entorno o usar la URL local por defecto
const baseUrl = (import.meta.env.VITE_API || 'http://localhost:3001/api') + '/advisor/verify';

export default async function verifyToken(token) {
    try {
        const response = await axios.post(baseUrl, { token });

        if (response.status !== 200) {
            throw new Error('Response is NOT ok');
        }

        return response.data.valid;

    } catch (error) {
        throw error;
    }
}
