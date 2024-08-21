document.getElementById('searchForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const searchInput = document.getElementById('searchInput').value;
    const apiUrl = `https://swapi.dev/api/people/?search=${searchInput}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const resultsSection = document.getElementById('results');
            resultsSection.innerHTML = '';

            if (data.results.length === 0) {
                resultsSection.innerHTML = '<p>No se encontraron personajes.</p>';
                return;
            }

            data.results.forEach(personaje => {
                const personContainer = document.createElement('div');
                personContainer.className = 'person-container';

                const detailsHTML = `
                    <h2>${personaje.name}</h2>
                    <p><strong>Altura:</strong> ${personaje.height} cm</p>
                    <p><strong>Peso:</strong> ${personaje.mass} kg</p>
                    <p><strong>Color de cabello:</strong> ${personaje.hair_color}</p>
                    <p><strong>Color de piel:</strong> ${personaje.skin_color}</p>
                    <p><strong>Color de ojos:</strong> ${personaje.eye_color}</p>
                    <p><strong>Año de nacimiento:</strong> ${personaje.birth_year}</p>
                    <p><strong>Género:</strong> ${personaje.gender}</p>
                `;

                personContainer.innerHTML = detailsHTML;
                resultsSection.appendChild(personContainer);
            });
        })
        .catch(error => {
            console.error('Error en la búsqueda:', error);
            document.getElementById('results').innerHTML = '<p>Hubo un error en la búsqueda. Por favor, intenta nuevamente.</p>';
        });
});
