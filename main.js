document.addEventListener('DOMContentLoaded', () => {
    const urlsApi = {
        personajes: 'https://swapi.dev/api/people/',
        planetas: 'https://swapi.dev/api/planets/',
        naves: 'https://swapi.dev/api/starships/'
    };

    const seccionResultados = document.getElementById('seccion-resultados');

    function obtenerDatos(url, categoria) {
        return fetch(url)
            .then(response => response.json())
            .then(data => {
                const contenedorCategoria = document.createElement('div');
                contenedorCategoria.className = 'contenedor-categoria';

                const encabezado = document.createElement('h2');
                encabezado.textContent = categoria.charAt(0).toUpperCase() + categoria.slice(1);
                contenedorCategoria.appendChild(encabezado);

                data.results.forEach(item => {
                    const contenedorItem = document.createElement('div');
                    contenedorItem.className = 'tarjeta-item';

                    let detallesHTML = '';
                    for (const key in item) {
                        detallesHTML += `<p><strong>${key.charAt(0).toUpperCase() + key.slice(1)}:</strong> ${item[key]}</p>`;
                    }

                    contenedorItem.innerHTML = detallesHTML;
                    contenedorCategoria.appendChild(contenedorItem);
                });

                seccionResultados.appendChild(contenedorCategoria);

                // Manejo de la paginación
                if (data.next) {
                    obtenerDatos(data.next, categoria);
                }
            })
            .catch(error => {
                console.error(`Error al obtener ${categoria}:`, error);
                seccionResultados.innerHTML += `<p>Hubo un error al cargar ${categoria}. Intenta nuevamente.</p>`;
            });
    }

    // Obtener todos los datos
    Object.keys(urlsApi).forEach(categoria => obtenerDatos(urlsApi[categoria], categoria));
});
