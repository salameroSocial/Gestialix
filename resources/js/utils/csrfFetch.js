// resources/js/utils/csrfFetch.js
const csrfFetch = async (url, options = {}) => {
    // Obtén el token CSRF desde el meta tag
    const csrfToken = document.querySelector('meta[name="csrf-token"]').content;

    // Fusiona los headers existentes con el token CSRF
    const headers = {
        ...options.headers,
        'X-CSRF-TOKEN': csrfToken,
        'Content-Type': 'application/json', // Asegúrate de incluir este para JSON
    };

    // Retorna la solicitud fetch con los headers fusionados
    return fetch(url, {
        ...options,
        headers,
    });
};

export default csrfFetch;
