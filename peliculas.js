// Función para obtener datos de la API
async function fetchData(endpoint) {
    try {
        const response = await fetch(`https://swapi.py4e.com/api/${endpoint}/`);
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

// Función para mostrar datos de películas
async function displayFilms() {
    const data = await fetchData('films');
    if (data) {
        const resultados = document.getElementById('resultados');
        resultados.innerHTML = ''; // Limpiar resultados anteriores

        data.results.forEach(film => {
            const tarjeta = document.createElement('div');
            tarjeta.classList.add('tarjeta-opcion');

            tarjeta.innerHTML = `
                <h2>${film.title}</h2>
                <p><strong>Capítulo:</strong> ${film.episode_id}</p>
                <p><strong>Director:</strong> ${film.director}</p>
                <p><strong>Productores:</strong> ${film.producer}</p>
                <p><strong>Fecha de lanzamiento:</strong> ${film.release_date}</p>
            `;

            resultados.appendChild(tarjeta);
        });
    }
}

// Función para filtrar las películas
function filtrarFilms() {
    const input = document.getElementById('busqueda').value.toLowerCase();
    const tarjetas = document.querySelectorAll('.tarjeta-opcion');

    tarjetas.forEach(tarjeta => {
        const nombre = tarjeta.querySelector('h2').textContent.toLowerCase();
        const capitulo = tarjeta.querySelector('p:nth-child(2)').textContent.toLowerCase();
        const director = tarjeta.querySelector('p:nth-child(3)').textContent.toLowerCase();
        const productores = tarjeta.querySelector('p:nth-child(4)').textContent.toLowerCase();
        const fecha = tarjeta.querySelector('p:nth-child(5)').textContent.toLowerCase();

        if (
            nombre.includes(input) ||
            capitulo.includes(input) ||
            director.includes(input) ||
            productores.includes(input) ||
            fecha.includes(input)
        ) {
            tarjeta.style.display = '';
        } else {
            tarjeta.style.display = 'none';
        }
    });
}

// Evento de búsqueda
document.getElementById('busqueda').addEventListener('input', filtrarFilms);

// Ejecutar la función para mostrar todas las películas al cargar la página
displayFilms();
