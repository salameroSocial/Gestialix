import axios from 'axios';

// Crear una instancia de Axios
const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:8000/api', // Cambia a tu dominio de producción si es necesario
    withCredentials: true, // Incluye cookies para autenticación
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

// Configurar el token de autorización
export const setAuthToken = (token) => {
    if (token) {
        // Agregar el token a los encabezados por defecto
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        // Eliminar el encabezado de autorización si no hay token
        delete apiClient.defaults.headers.common['Authorization'];
    }
};

// Manejo de errores globales (opcional)
apiClient.interceptors.response.use(
    (response) => response,
    // Devolver la respuesta si es exitosa
    (error) => {
        // Manejo de errores global
        if (error.response?.status === 401) {
            console.error('No autorizado. Redirigiendo al inicio de sesión...');
            // Aquí puedes redirigir al login o manejar la sesión expirada


        }
        return Promise.reject(error); // Rechazar la promesa para manejo local
    }
);

export default apiClient;


// apiClient.js

export const client = axios.create({
    baseURL: 'http://127.0.0.1:8000', // Cambia a tu baseURL
    withCredentials: true, // Necesario para enviar cookies
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

