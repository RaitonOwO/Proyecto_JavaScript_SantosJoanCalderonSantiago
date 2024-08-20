document.getElementById('search-button').addEventListener('click', function() {
    const query = document.getElementById('search-input').value;
    if (query.trim() !== "") {
        fetchResults(query);
    } else {
        alert("Por favor, ingresa un término de búsqueda.");
    }
});

async function fetchResults(query) {
    const url = `https://swapi.dev/api/people/?search=${query}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayResults(data.results);
    } catch (error) {
        console.error("Error al obtener los datos:", error);
        alert("Hubo un problema al obtener los datos. Inténtalo de nuevo.");
    }
}

function displayResults(results) {
    const resultsSection = document.getElementById('results-section');
    resultsSection.innerHTML = '';  // Limpiar resultados anteriores

    if (results.length > 0) {
        results.forEach(result => {
            const resultDiv = document.createElement('div');
            resultDiv.classList.add('result-item');
            resultDiv.innerHTML = `
                <h2>${result.name}</h2>
                <p><strong>Género:</strong> ${result.gender}</p>
                <p><strong>Altura:</strong> ${result.height} cm</p>
                <p><strong>Peso:</strong> ${result.mass} kg</p>
                <p><strong>Color de cabello:</strong> ${result.hair_color}</p>
                <p><strong>Color de piel:</strong> ${result.skin_color}</p>
                <p><strong>Año de nacimiento:</strong> ${result.birth_year}</p>
            `;
            resultsSection.appendChild(resultDiv);
        });
    } else {
        resultsSection.innerHTML = '<p>No se encontraron resultados</p>';
    }
}
