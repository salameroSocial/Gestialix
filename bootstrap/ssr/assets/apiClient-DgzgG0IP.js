import axios from "axios";
const apiClient = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  // Cambia a tu dominio de producción si es necesario
  withCredentials: true,
  // Incluye cookies para autenticación
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  }
});
apiClient.interceptors.response.use(
  (response) => response,
  // Devolver la respuesta si es exitosa
  (error) => {
    var _a;
    if (((_a = error.response) == null ? void 0 : _a.status) === 401) {
      console.error("No autorizado. Redirigiendo al inicio de sesión...");
    }
    return Promise.reject(error);
  }
);
axios.create({
  baseURL: "http://127.0.0.1:8000",
  // Cambia a tu baseURL
  withCredentials: true,
  // Necesario para enviar cookies
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  }
});
export {
  apiClient as a
};
