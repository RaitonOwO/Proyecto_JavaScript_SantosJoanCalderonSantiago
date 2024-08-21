document.getElementById('searchForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const searchInput = document.getElementById('searchInput').value;
    const apiUrl = `https://swapi.dev/api/starships/?search=${searchInput}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const resultsSection = document.getElementById('results');
            resultsSection.innerHTML = '';

            if (data.results.length === 0) {
                resultsSection.innerHTML = '<p>No se encontraron naves.</p>';
                return;
            }

            data.results.forEach(nave => {
                const starshipContainer = document.createElement('div');
                starshipContainer.className = 'person-container';

                const detailsHTML = `
                    <h2>${nave.name}</h2>
                    <p><strong>Modelo:</strong> ${nave.model}</p>
                    <p><strong>Fabricante:</strong> ${nave.manufacturer}</p>
                    <p><strong>Costo en créditos:</strong> ${nave.cost_in_credits}</p>
                    <p><strong>Longitud:</strong> ${nave.length} m</p>
                    <p><strong>Velocidad atmosférica máxima:</strong> ${nave.max_atmosphering_speed}</p>
                `;

                starshipContainer.innerHTML = detailsHTML;
                resultsSection.appendChild(starshipContainer);
            });
        })
        .catch(error => {
            console.error('Error en la búsqueda:', error);
            document.getElementById('results').innerHTML = '<p>Hubo un error en la búsqueda. Por favor, intenta nuevamente.</p>';
        });
});
