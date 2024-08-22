document.querySelector('.buscador button').addEventListener('click', function (e) {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value.toLowerCase();
    const edad = document.getElementById('edad').value.toLowerCase();
    const genero = document.getElementById('genero').value.toLowerCase();
    const colorCabello = document.getElementById('color-cabello').value.toLowerCase();

    const apiUrl = `https://swapi.dev/api/people/?search=${nombre}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const seccionResultados = document.getElementById('seccion-resultados');
            seccionResultados.innerHTML = '';

            if (data.results.length === 0) {
                seccionResultados.innerHTML = '<p>No se encontraron personajes.</p>';
                return;
            }

            // Filtrado adicional basado en los otros campos
            const personajesFiltrados = data.results.filter(personaje => {
                return (edad === '' || personaje.birth_year.toLowerCase() === edad) &&
                       (genero === '' || personaje.gender.toLowerCase() === genero) &&
                       (colorCabello === '' || personaje.hair_color.toLowerCase().includes(colorCabello));
            });

            if (personajesFiltrados.length === 0) {
                seccionResultados.innerHTML = '<p>No se encontraron personajes con los filtros aplicados.</p>';
                return;
            }

            personajesFiltrados.forEach(personaje => {
                const tarjetaPersonaje = document.createElement('div');
                tarjetaPersonaje.className = 'tarjeta-item';

                const detallesHTML = `
                    <h2>${personaje.name}</h2>
                    <p><strong>Altura:</strong> ${personaje.height} cm</p>
                    <p><strong>Peso:</strong> ${personaje.mass} kg</p>
                    <p><strong>Color de cabello:</strong> ${personaje.hair_color}</p>
                    <p><strong>Color de piel:</strong> ${personaje.skin_color}</p>
          
                    <p><strong>Color de ojos:</strong> ${personaje.eye_color}</p>
                    <p><strong>Año de nacimiento:</strong> ${personaje.birth_year}</p>
                    <p><strong>Género:</strong> ${personaje.gender}</p>
                `;

                tarjetaPersonaje.innerHTML = detallesHTML;
                seccionResultados.appendChild(tarjetaPersonaje);
            });
        })
        .catch(error => {
            console.error('Error en la búsqueda:', error);
            document.getElementById('seccion-resultados').innerHTML = '<p>Hubo un error en la búsqueda. Por favor, intenta nuevamente.</p>';
        });
});
