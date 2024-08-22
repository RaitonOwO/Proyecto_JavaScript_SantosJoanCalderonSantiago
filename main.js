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
        console.log('Personajes de Star Wars:');
        data.results.forEach(person => {
            console.log(`Nombre: ${person.name}`);
            console.log(`Altura: ${person.height}`);
            console.log(`Masa: ${person.mass}`);
            console.log(`Color de ojos: ${person.eye_color}`);
            console.log('---');
        });
    }
}

// Función para mostrar datos de planetas
async function displayPlanets() {
    const data = await fetchData('planets');
    if (data) {
        console.log('Planetas de Star Wars:');
        data.results.forEach(planet => {
            console.log(`Nombre: ${planet.name}`);
            console.log(`Clima: ${planet.climate}`);
            console.log(`Terreno: ${planet.terrain}`);
            console.log(`Población: ${planet.population}`);
            console.log('---');
        });
    }
}

// Función para mostrar datos de naves espaciales
async function displayStarships() {
    const data = await fetchData('starships');
    if (data) {
        console.log('Naves espaciales de Star Wars:');
        data.results.forEach(starship => {
            console.log(`Nombre: ${starship.name}`);
            console.log(`Modelo: ${starship.model}`);
            console.log(`Fabricante: ${starship.manufacturer}`);
            console.log(`Velocidad máxima: ${starship.max_atmosphering_speed}`);
            console.log('---');
        });
    }
}

// Función para mostrar datos de vehículos
async function displayVehicles() {
    const data = await fetchData('vehicles');
    if (data) {
        console.log('Vehículos de Star Wars:');
        data.results.forEach(vehicle => {
            console.log(`Nombre: ${vehicle.name}`);
            console.log(`Modelo: ${vehicle.model}`);
            console.log(`Fabricante: ${vehicle.manufacturer}`);
            console.log(`Velocidad máxima: ${vehicle.max_atmosphering_speed}`);
            console.log('---');
        });
    }
}

// Función para mostrar datos de especies
async function displaySpecies() {
    const data = await fetchData('species');
    if (data) {
        console.log('Especies de Star Wars:');
        data.results.forEach(species => {
            console.log(`Nombre: ${species.name}`);
            console.log(`Clasificación: ${species.classification}`);
            console.log(`Designación: ${species.designation}`);
            console.log(`Promedio de altura: ${species.average_height}`);
            console.log('---');
        });
    }
}

// Función para mostrar datos de películas
async function displayFilms() {
    const data = await fetchData('films');
    if (data) {
        console.log('Películas de Star Wars:');
        data.results.forEach(film => {
            console.log(`Título: ${film.title}`);
            console.log(`Episodio: ${film.episode_id}`);
            console.log(`Director: ${film.director}`);
            console.log(`Productores: ${film.producer}`);
            console.log(`Fecha de lanzamiento: ${film.release_date}`);
            console.log('---');
        });
    }
}

// Función para llamar todas las funciones de datos
async function displayAllData() {
    await displayPeople();
    await displayPlanets();
    await displayStarships();
    await displayVehicles();
    await displaySpecies();
    await displayFilms();
}

// Ejecutar la función para mostrar todos los datos
displayAllData();
