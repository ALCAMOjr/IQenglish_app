import axios from "axios";

// Obtener la URL base de la variable de entorno o usar la URL local por defecto
const baseUrlForm = (import.meta.env.VITE_API || 'http://localhost:3001/api') + '/prospects/create';

export default async function createProspectForm({ name, lastname, email, phone_number, age, address }) {
    try {
        const response = await axios.post(baseUrlForm, {
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
