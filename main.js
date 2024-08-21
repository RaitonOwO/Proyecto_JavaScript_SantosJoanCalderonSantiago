document.addEventListener('DOMContentLoaded', () => {
    const apiUrls = {
        people: 'https://swapi.dev/api/people/',
        planets: 'https://swapi.dev/api/planets/',
        starships: 'https://swapi.dev/api/starships/'
    };

    const resultsSection = document.getElementById('results');

    function fetchData(url, category) {
        return fetch(url)
            .then(response => response.json())
            .then(data => {
                const container = document.createElement('div');
                container.className = 'category-container';

                const header = document.createElement('h2');
                header.textContent = category.charAt(0).toUpperCase() + category.slice(1);
                container.appendChild(header);

                data.results.forEach(item => {
                    const itemContainer = document.createElement('div');
                    itemContainer.className = 'item-container';

                    let detailsHTML = '';
                    for (const key in item) {
                        detailsHTML += `<p><strong>${key.charAt(0).toUpperCase() + key.slice(1)}:</strong> ${item[key]}</p>`;
                    }

                    itemContainer.innerHTML = detailsHTML;
                    container.appendChild(itemContainer);
                });

                resultsSection.appendChild(container);

                // Handle pagination
                if (data.next) {
                    fetchData(data.next, category);
                }
            })
            .catch(error => {
                console.error(`Error fetching ${category}:`, error);
                resultsSection.innerHTML += `<p>Hubo un error al cargar ${category}. Intenta nuevamente.</p>`;
            });
    }

    // Fetch all data
    Object.keys(apiUrls).forEach(category => fetchData(apiUrls[category], category));
});
