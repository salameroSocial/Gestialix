document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('a[data-route]');
    const content = document.getElementById('content');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const route = e.target.getAttribute('data-route');

            // Cargar contenido dinámico con Fetch API
            fetch(route + '?ajax=' + route)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error al cargar la vista');
                    }
                    return response.text();
                })
                .then(html => {
                    content.innerHTML = html; // Actualiza el contenido dinámicamente
                    window.history.pushState(null, '', route); // Cambia la URL sin recargar
                })
                .catch(error => {
                    content.innerHTML = `<p>Error: ${error.message}</p>`;
                });
        });
    });

    // Manejar el botón "atrás" del navegador
    window.addEventListener('popstate', () => {
        const currentRoute = window.location.pathname;
        fetch(currentRoute + '?ajax=' + currentRoute)
            .then(response => response.text())
            .then(html => {
                content.innerHTML = html;
            });
    });
});
