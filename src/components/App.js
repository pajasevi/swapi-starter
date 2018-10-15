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
            ships: {},
        }
        this.dataContainer = document.getElementById('data-container');
    }

    init() {
        const filmsBtn = document.getElementById('load-films');

        filmsBtn.onclick = () => {
            this.renderFilms();
        }
    }

    renderLoading() {
        const dataElement = createDataElement();
        const loadingElement = document.createElement('div')

        loadingElement.className = 'loading'

        dataElement.appendChild(loadingElement);

        this.dataContainer.replaceChild(dataElement, document.getElementById('data'))
    }

    renderError(error) {
        const dataElement = createDataElement();

        dataElement.innerText = `Nastala chyba při zpracování requestu. ${error}`

        this.dataContainer.replaceChild(dataElement, document.getElementById('data'))
    }

    renderFilms() {
        const dataElement = createDataElement();

        this.renderLoading();
        fetch('https://swapi.co/api/films/').
            then((response) => response.json()).
            then((data) => {
                data.results.forEach((film) => {
                    const filmElement = document.createElement('div');
                    const filmTitle = document.createElement('h3');
                    const filmDescription = document.createElement('p');

                    filmTitle.innerText = film.title;
                    filmDescription.innerText = film.opening_crawl;

                    filmElement.appendChild(filmTitle);
                    filmElement.appendChild(filmDescription);

                    dataElement.appendChild(filmElement)
                });

                this.dataContainer.replaceChild(dataElement, document.getElementById('data'))
            }).
            catch((error) => {
                this.renderError(error);
            })
    }
}
