const createDataElement = () => {
    const dataElement = document.createElement('div');

    dataElement.id = 'data';

    return dataElement;
}

export default class App {
    constructor() {
        this.data = {
            films: {},
            people: {},
            starships: {},
        }
        this.dataContainer = document.getElementById('data-container');
        this.api = 'https://swapi.co/api';
    }

    init() {
        const filmsBtn = document.getElementById('load-films');
        const peopleBtn = document.getElementById('load-people');
        const starshipBtn = document.getElementById('load-starships');

        filmsBtn.onclick = () => {
            this.renderFilms();
        }

        peopleBtn.onclick = () => {
            this.renderPeople();
        }

        starshipBtn.onclick = () => {
            this.renderStarships();
        }

        this.renderFilms();
    }

    insertToDOM(dataElement) {
        this.dataContainer.replaceChild(dataElement, document.getElementById('data'))
    }

    async callApi(collection, callback) {
        this.renderLoading();

        try {
            const response = await fetch(`${this.api}/${collection}/`);

            this.data[collection] = await response.json();

            return callback();
        } catch (error) {
            return this.renderError(error);
        }
    }

    renderLoading() {
        const dataElement = createDataElement();
        const loadingElement = document.createElement('div')

        loadingElement.className = 'loading'

        dataElement.appendChild(loadingElement);

        this.insertToDOM(dataElement);
    }

    renderError(error) {
        const dataElement = createDataElement();

        dataElement.innerText = `Nastala chyba při zpracování requestu. ${error}`

        this.insertToDOM(dataElement);
    }

    renderFilms() {
        const dataElement = createDataElement();

        if (this.data.films.results) {
            this.data.films.results.forEach((film) => {
                const filmElement = document.createElement('div');
                const filmTitle = document.createElement('h3');
                const filmDescription = document.createElement('p');

                filmTitle.innerText = film.title;
                filmDescription.innerText = film.opening_crawl;

                filmElement.appendChild(filmTitle);
                filmElement.appendChild(filmDescription);

                dataElement.appendChild(filmElement)
            });

            this.insertToDOM(dataElement);
        } else {
            this.callApi('films', this.renderFilms.bind(this));
        }
    }

    renderPeople() {
        const dataElement = createDataElement();

        if (this.data.people.results) {
            this.data.people.results.forEach((person) => {
                const personElement = document.createElement('div');
                const personName = document.createElement('h3');

                personName.innerText = person.name;

                personElement.appendChild(personName);

                dataElement.appendChild(personElement)
            });

            this.insertToDOM(dataElement);
        } else {
            this.callApi('people', this.renderPeople.bind(this));
        }
    }

    renderStarships() {
        const dataElement = createDataElement();

        if (this.data.starships.results) {
            this.data.starships.results.forEach((starship) => {
                const starshipElement = document.createElement('div');
                const starshipName = document.createElement('h3');

                starshipName.innerText = starship.name;

                starshipElement.appendChild(starshipName);

                dataElement.appendChild(starshipElement)
            });

            this.insertToDOM(dataElement);
        } else {
            this.callApi('starships', this.renderStarships.bind(this));
        }
    }
}
