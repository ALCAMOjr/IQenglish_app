import axios from "axios";

// Obtener la URL base de la variable de entorno o usar la URL local por defecto
const baseUrl = (import.meta.env.VITE_API || 'http://localhost:3001/api') + '/prospects';

export default async function createProspect({ name, lastname, email, phone_number, age, address }) {
    try {
        const response = await axios.post(baseUrl, {
            name,
            lastname,
            email,
            phone_number,
            age,
            address
        });

        if (response.status !== 200) {
            throw new Error('Response is NOT ok');
        }

        return response.data;
        
    } catch (error) {
        throw error;
    }
}
