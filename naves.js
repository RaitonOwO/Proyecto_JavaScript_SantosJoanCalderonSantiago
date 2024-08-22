document.querySelector('.buscador button').addEventListener('click', function (e) {
    e.preventDefault();

    const inputBusqueda = document.querySelector('.buscador input[type="text"]').value;
    const apiUrl = `https://swapi.dev/api/starships/?search=${inputBusqueda}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const seccionResultados = document.getElementById('seccion-resultados');
            seccionResultados.innerHTML = '';

            if (data.results.length === 0) {
                seccionResultados.innerHTML = '<p>No se encontraron naves.</p>';
                return;
            }

            data.results.forEach(nave => {
                const tarjetaNave = document.createElement('div');
                tarjetaNave.className = 'tarjeta-item';

                const detallesHTML = `
                    <h2>${nave.name}</h2>
                    <p><strong>Modelo:</strong> ${nave.model}</p>
                    <p><strong>Fabricante:</strong> ${nave.manufacturer}</p>
                    <p><strong>Costo en créditos:</strong> ${nave.cost_in_credits}</p>
                    <p><strong>Longitud:</strong> ${nave.length} m</p>
                    <p><strong>Velocidad atmosférica máxima:</strong> ${nave.max_atmosphering_speed}</p>
                `;

                tarjetaNave.innerHTML = detallesHTML;
                seccionResultados.appendChild(tarjetaNave);
            });
        })
        .catch(error => {
            console.error('Error en la búsqueda:', error);
            document.getElementById('seccion-resultados').innerHTML = '<p>Hubo un error en la búsqueda. Por favor, intenta nuevamente.</p>';
        });
});
