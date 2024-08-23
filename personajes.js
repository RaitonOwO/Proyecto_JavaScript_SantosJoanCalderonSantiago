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

// Función para mostrar datos de personajes
async function displayPeople() {
    const data = await fetchData('people');
    if (data) {
        const resultados = document.getElementById('resultados');
        resultados.innerHTML = '';
        data.results.forEach(person => {
            const tarjeta = document.createElement('div');
            tarjeta.classList.add('tarjeta-opcion');
            tarjeta.innerHTML = `
                <h2>${person.name}</h2>
                <p>Género: ${person.gender}</p>
                <p>Altura: ${person.height} cm</p>
                <p>Masa: ${person.mass} kg</p>
                <p>Color de ojos: ${person.eye_color}</p>
                <p>Color de pelo: ${person.hair_color}</p>
            `;
            resultados.appendChild(tarjeta);
        });
    }
}

// Función para filtrar los personajes
function filtrarPersonajes(event) {
    const textoBusqueda = event.target.value.toLowerCase();
    const tarjetas = document.querySelectorAll('.tarjeta-opcion');
    tarjetas.forEach(tarjeta => {
        const nombre = tarjeta.querySelector('h2').textContent.toLowerCase();
        const genero = tarjeta.querySelector('p:nth-child(2)').textContent.toLowerCase();
        const colorPelo = tarjeta.querySelector('p:nth-child(5)').textContent.toLowerCase();

        if (nombre.includes(textoBusqueda) || genero.includes(textoBusqueda) || colorPelo.includes(textoBusqueda)) {
            tarjeta.style.display = 'flex';
        } else {
            tarjeta.style.display = 'none';
        }
    });
}

// Inicializar el evento de búsqueda
document.getElementById('busqueda').addEventListener('input', filtrarPersonajes);

// Ejecutar la función para mostrar todos los datos
displayPeople();
