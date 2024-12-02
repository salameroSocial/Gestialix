const csrfFetch = async (url, options = {}) => {
  const csrfToken = document.querySelector('meta[name="csrf-token"]').content;
  const headers = {
    ...options.headers,
    "X-CSRF-TOKEN": csrfToken,
    "Content-Type": "application/json"
    // Asegúrate de incluir este para JSON
  };
  return fetch(url, {
    ...options,
    headers
  });
};
export {
  csrfFetch as c
};
