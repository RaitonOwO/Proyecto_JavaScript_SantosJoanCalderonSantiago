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

// Función para mostrar datos de planetas
async function displayPlanets() {
    const data = await fetchData('planets');
    if (data) {
        const resultados = document.getElementById('resultados');
        resultados.innerHTML = ''; // Limpiar resultados anteriores

        data.results.forEach(planet => {
            const tarjeta = document.createElement('div');
            tarjeta.classList.add('tarjeta-opcion');

            tarjeta.innerHTML = `
                <h2>${planet.name}</h2>
                <p><strong>Clima:</strong> ${planet.climate}</p>
                <p><strong>Población:</strong> ${planet.population}</p>
                <p><strong>Terreno:</strong> ${planet.terrain}</p>
            `;

            resultados.appendChild(tarjeta);
        });
    }
}

// Función para filtrar los planetas
function filtrarPlanetas() {
    const input = document.getElementById('busqueda').value.toLowerCase();
    const tarjetas = document.querySelectorAll('.tarjeta-opcion');

    tarjetas.forEach(tarjeta => {
        const nombre = tarjeta.querySelector('h2').textContent.toLowerCase();
        const clima = tarjeta.querySelector('p:nth-child(2)').textContent.toLowerCase();
        const poblacion = tarjeta.querySelector('p:nth-child(3)').textContent.toLowerCase();
        const terreno = tarjeta.querySelector('p:nth-child(4)').textContent.toLowerCase();

        if (
            nombre.includes(input) ||
            clima.includes(input) ||
            poblacion.includes(input) ||
            terreno.includes(input)
        ) {
            tarjeta.style.display = '';
        } else {
            tarjeta.style.display = 'none';
        }
    });
}

// Evento de búsqueda
document.getElementById('busqueda').addEventListener('input', filtrarPlanetas);

// Ejecutar la función para mostrar todos los planetas al cargar la página
displayPlanets();
