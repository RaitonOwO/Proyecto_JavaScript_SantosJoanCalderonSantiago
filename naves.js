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

// Función para mostrar datos de naves espaciales
async function displayStarships() {
    const data = await fetchData('starships');
    if (data) {
        const resultados = document.getElementById('resultados');
        resultados.innerHTML = ''; // Limpiar resultados anteriores

        data.results.forEach(starship => {
            const tarjeta = document.createElement('div');
            tarjeta.classList.add('tarjeta-opcion');

            tarjeta.innerHTML = `
                <h2>${starship.name}</h2>
                <p><strong>Modelo:</strong> ${starship.model}</p>
                <p><strong>Fabricante:</strong> ${starship.manufacturer}</p>
                <p><strong>Velocidad máxima:</strong> ${starship.max_atmosphering_speed} km/h</p>
            `;

            resultados.appendChild(tarjeta);
        });
    }
}

// Función para filtrar las naves
function filtrarStarships() {
    const input = document.getElementById('busqueda').value.toLowerCase();
    const tarjetas = document.querySelectorAll('.tarjeta-opcion');

    tarjetas.forEach(tarjeta => {
        const nombre = tarjeta.querySelector('h2').textContent.toLowerCase();
        const modelo = tarjeta.querySelector('p:nth-child(2)').textContent.toLowerCase();
        const fabricante = tarjeta.querySelector('p:nth-child(3)').textContent.toLowerCase();
        const velocidad = tarjeta.querySelector('p:nth-child(4)').textContent.toLowerCase();

        if (
            nombre.includes(input) ||
            modelo.includes(input) ||
            fabricante.includes(input) ||
            velocidad.includes(input)
        ) {
            tarjeta.style.display = '';
        } else {
            tarjeta.style.display = 'none';
        }
    });
}

// Evento de búsqueda
document.getElementById('busqueda').addEventListener('input', filtrarStarships);

// Ejecutar la función para mostrar todas las naves al cargar la página
displayStarships();
