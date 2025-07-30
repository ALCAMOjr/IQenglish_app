import axios from "axios";

// Obtener la URL base de la variable de entorno o usar la URL local por defecto
const baseUrl = (import.meta.env.VITE_API || 'http://localhost:3001/api') + '/advisors/login';

export default async function login_user({ username, password }) {

    try {

        const response = await axios.post(baseUrl, {
            username,
            password
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (response.status !== 200) {
            throw new Error('Response is NOT ok');
        }

        const { token } = response.data; // Asume que el token se devuelve en la respuesta

        return { token }; // Devuelve el token

    } catch (error) {
        throw error;
    }
}
