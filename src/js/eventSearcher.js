import { events, municipalities, eventTypes, } from '../api/apiPlanes.js';
import { renderEvents } from './definir-card.js';
import loadWeatherByCoordinates from '../api/apiTiempo.js';

const DEFAULT_LAT = 43.2630;
const DEFAULT_LON = -2.9350;

const municipalityCoords = new Map();

function filterType(type) {
    return `<option value="${type.id}">${type.name}</option>`;
}

async function listTypes() {
    const allTypes = await eventTypes();
    const section = document.getElementById('type');
    section.innerHTML = `<option value="todos">Todos</option>`;
    section.innerHTML += allTypes.map(e => filterType(e)).join('');
}

function filterMunicipalities(municipality) {
    return `<option value="${municipality.id}">${municipality.name}</option>`;
}

async function listMunicipalities() {
    const allTypes = await municipalities();
    const section = document.getElementById('municipalities');
    section.innerHTML = `<option value="todos">Todos</option>`;
    section.innerHTML += allTypes.map(e => filterMunicipalities(e)).join('');

    allTypes.forEach(m => {
        if(m.lat && m.lon) {
            municipalityCoords.set(String(m.id), { lat: m.lat, lon: m.lon});
        }
        
    });
}

function date() {
    return `
    <input type="date" id="filter-date">
    `;
}
function listDate() {
    const section = document.getElementById('date-filter');
    if (section) {
        section.innerHTML = `<input type="date" id="filter-date">`;
    }
}

async function filterParameters(elemets, page, day, month, municipalityId, provinceId, type, year) {
    return await events(elemets, page, day, month, municipalityId, provinceId, type, year);
}

async function applyFilters() {
    const type = document.getElementById('type')?.value;
    const municipality = document.getElementById('municipalities')?.value;
    const dateValue = document.getElementById('filter-date')?.value;

    let day = null, month = null, year = null;
    if (dateValue) {
        const [y, m, d] = dateValue.split('-');
        day = parseInt(d);
        month = parseInt(m);
        year = parseInt(y);
    }

    const municipalityId = municipality !== 'todos' ? municipality : null;
    const selectedType = type !== 'todos' ? type : null;

    const results = await filterParameters(
        10, 1, day, month, municipalityId, null, selectedType, year
    );

    renderEvents(results);

    if (municipalityId && municipalityCoords.has(municipalityId)) {
        const { lat, lon } = municipalityCoords.get(municipalityId);
        updateWeatherTitle(municipality);
        loadWeatherByCoordinates(lat, lon);

    } else if (results.length > 0 && results[0].lat && results[0].lon) {
        loadWeatherByCoordinates(results[0].lat, results[0].lon);
        updateWeatherTitle(null);

    } else {
        loadWeatherByCoordinates(DEFAULT_LAT, DEFAULT_LON);
        updateWeatherTitle(null);
    }
}

function updateWeatherTitle(municipalityId) {
    const title = document.querySelector('.weather-card h2');
    if (!title) return;
    if (municipalityId) {
        const select = document.getElementById('municipalities');
        const selectedText = select?.options[select.selectedIndex]?.text;
        title.textContent = `Clima en ${selectedText || 'Euskadi'}`;
    } else {
        title.textContent = 'Clima en Euskadi';
    }
}

window.addEventListener('DOMContentLoaded', () => {
    listMunicipalities();
    listDate();
    listTypes();

    document.getElementById('type')
        ?.addEventListener('change', applyFilters);
    document.getElementById('municipalities')
        ?.addEventListener('change', applyFilters);
    document.getElementById('filter-date')
        ?.addEventListener('change', applyFilters);

    applyFilters();
});
