document.querySelector('.buscador button').addEventListener('click', function (e) {
    e.preventDefault();

    const inputBusqueda = document.querySelector('.buscador input[type="text"]').value;
    const apiUrl = `https://swapi.dev/api/people/?search=${inputBusqueda}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const seccionResultados = document.getElementById('seccion-resultados');
            seccionResultados.innerHTML = '';

            if (data.results.length === 0) {
                seccionResultados.innerHTML = '<p>No se encontraron personajes.</p>';
                return;
            }

            data.results.forEach(personaje => {
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
