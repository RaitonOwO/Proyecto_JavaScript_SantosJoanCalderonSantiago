document.querySelector('.buscador button').addEventListener('click', function (e) {
    e.preventDefault();

    const searchInput = document.querySelector('.buscador input[type="text"]').value;
    const apiUrl = `https://swapi.dev/api/planets/?search=${searchInput}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const resultsSection = document.getElementById('seccion-resultados');
            resultsSection.innerHTML = '';

            if (data.results.length === 0) {
                resultsSection.innerHTML = '<p>No se encontraron planetas.</p>';
                return;
            }

            data.results.forEach(planeta => {
                const planetContainer = document.createElement('div');
                planetContainer.className = 'tarjeta-item';

                const detailsHTML = `
                    <h2>${planeta.name}</h2>
                    <p><strong>Clima:</strong> ${planeta.climate}</p>
                    <p><strong>Terreno:</strong> ${planeta.terrain}</p>
                    <p><strong>Diámetro:</strong> ${planeta.diameter} km</p>
                    <p><strong>Población:</strong> ${planeta.population}</p>
                `;

                planetContainer.innerHTML = detailsHTML;
                resultsSection.appendChild(planetContainer);
            });
        })
        .catch(error => {
            console.error('Error en la búsqueda:', error);
            document.getElementById('seccion-resultados').innerHTML = '<p>Hubo un error en la búsqueda. Por favor, intenta nuevamente.</p>';
        });
});
