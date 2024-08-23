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

// Función para mostrar datos de especies
async function displaySpecies() {
    const data = await fetchData('species');
    if (data) {
        const resultados = document.getElementById('resultados');
        resultados.innerHTML = ''; // Limpiar resultados anteriores

        data.results.forEach(species => {
            const tarjeta = document.createElement('div');
            tarjeta.classList.add('tarjeta-opcion');

            tarjeta.innerHTML = `
                <h2>${species.name}</h2>
                <p><strong>Designación:</strong> ${species.designation}</p>
                <p><strong>Clasificación:</strong> ${species.classification}</p>
                <p><strong>Promedio de Estatura:</strong> ${species.average_height} cm</p>
            `;

            resultados.appendChild(tarjeta);
        });
    }
}

// Función para filtrar las especies
function filtrarEspecies() {
    const input = document.getElementById('busqueda').value.toLowerCase();
    const tarjetas = document.querySelectorAll('.tarjeta-opcion');

    tarjetas.forEach(tarjeta => {
        const nombre = tarjeta.querySelector('h2').textContent.toLowerCase();
        const designacion = tarjeta.querySelector('p:nth-child(2)').textContent.toLowerCase();
        const clasificacion = tarjeta.querySelector('p:nth-child(3)').textContent.toLowerCase();
        const estatura = tarjeta.querySelector('p:nth-child(4)').textContent.toLowerCase();

        if (
            nombre.includes(input) ||
            designacion.includes(input) ||
            clasificacion.includes(input) ||
            estatura.includes(input)
        ) {
            tarjeta.style.display = '';
        } else {
            tarjeta.style.display = 'none';
        }
    });
}

// Evento de búsqueda
document.getElementById('busqueda').addEventListener('input', filtrarEspecies);

// Ejecutar la función para mostrar todas las especies al cargar la página
displaySpecies();
