import App from './components/App'

import 'normalize.css/normalize.css';
import './styles/index.scss';

document.addEventListener("DOMContentLoaded", () => {
    const Application = new App();

    Application.init();
});
