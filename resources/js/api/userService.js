import apiClient from '../apiClient';


export const fetchUserData = async () => {
    try {
        // Llamada a la API
        const response = await apiClient.get('/user');
        // Retorna los datos del usuario, roles y permisos
        return response.data;
    } catch (error) {
        // Manejo de errores
        console.error('Error al cargar datos del usuario:', error);

        // Si el error es de autenticación (401), puedes redirigir al login si es necesario
        if (error.response?.status === 401) {
            console.error('No autenticado. Redirigiendo al login...');
            // Aquí puedes redirigir al login
            window.href = '/login';
        }

        return null; // Maneja errores devolviendo null
    }
};
