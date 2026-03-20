import { events, municipalities, eventTypes } from '../api/apiPlanes.js';
import { renderEvents } from './definir-card.js';
import loadWeatherByCoordinates, { isBadWeather } from '../api/apiTiempo.js';

const DEFAULT_LAT = 43.2630;
const DEFAULT_LON = -2.9350;
const municipalityCoords = new Map();

const INDOOR_TYPES = ['teatro', 'cine', 'exposición', 'exposicion', 'música', 'musica',
    'conferencia', 'danza', 'ópera', 'opera', 'circo', 'infantil'];

function isIndoor(event) {
    if (!event.type) return false;
    return INDOOR_TYPES.some(t => event.type.toLowerCase().includes(t));
}

function createCustomSelect(id, options) {
    const wrapper = document.createElement('div');
    wrapper.className = 'custom-select';
    wrapper.dataset.id = id;

    const selected = document.createElement('div');
    selected.className = 'custom-select__selected';
    selected.textContent = options[0].label;
    selected.dataset.value = options[0].value;

    const arrow = document.createElement('span');
    arrow.className = 'custom-select__arrow';
    arrow.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg>`;
    selected.appendChild(arrow);

    const list = document.createElement('ul');
    list.className = 'custom-select__list';

    options.forEach(opt => {
        const li = document.createElement('li');
        li.className = 'custom-select__option';
        li.textContent = opt.label;
        li.dataset.value = opt.value;
        if (opt.value === options[0].value) li.classList.add('active');
        li.addEventListener('click', () => {
            selected.childNodes[0].nodeValue = opt.label;
            selected.dataset.value = opt.value;
            list.querySelectorAll('li').forEach(l => l.classList.remove('active'));
            li.classList.add('active');
            wrapper.classList.remove('open');
            wrapper.dispatchEvent(new Event('change'));
        });
        list.appendChild(li);
    });

    selected.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = wrapper.classList.contains('open');
        document.querySelectorAll('.custom-select.open').forEach(s => s.classList.remove('open'));
        if (!isOpen) wrapper.classList.add('open');
    });

    wrapper.appendChild(selected);
    wrapper.appendChild(list);
    return wrapper;
}

function getCustomSelectValue(id) {
    const el = document.querySelector(`.custom-select[data-id="${id}"] .custom-select__selected`);
    return el ? el.dataset.value : 'todos';
}

document.addEventListener('click', () => {
    document.querySelectorAll('.custom-select.open').forEach(s => s.classList.remove('open'));
});

async function listTypes() {
    const allTypes = await eventTypes();
    const container = document.getElementById('type-container');
    if (!container) return;
    const options = [{ value: 'todos', label: 'Todos' },
        ...allTypes.map(t => ({ value: t.id, label: t.name }))];
    container.appendChild(createCustomSelect('type', options));
    container.querySelector('.custom-select').addEventListener('change', applyFilters);
}

async function listMunicipalities() {
    const allMunicipalities = await municipalities();
    const container = document.getElementById('municipalities-container');
    if (!container) return;
    const options = [{ value: 'todos', label: 'Todos' },
        ...allMunicipalities.map(m => ({ value: m.id, label: m.name }))];
    container.appendChild(createCustomSelect('municipalities', options));
    container.querySelector('.custom-select').addEventListener('change', applyFilters);

    allMunicipalities.forEach(m => {
        if (m.lat && m.lon) municipalityCoords.set(String(m.id), { lat: m.lat, lon: m.lon });
    });
}

function listDate() {
    const section = document.getElementById('date-filter');
    if (section) section.innerHTML = `<input type="date" id="filter-date">`;
}

async function applyFilters() {
    const type = getCustomSelectValue('type');
    const municipality = getCustomSelectValue('municipalities');
    const dateValue = document.getElementById('filter-date')?.value;

    let day = null, month = null, year = null;
    if (dateValue) {
        const [y, m, d] = dateValue.split('-');
        day = parseInt(d); month = parseInt(m); year = parseInt(y);
    }

    const municipalityId = municipality !== 'todos' ? municipality : null;
    const selectedType = type !== 'todos' ? type : null;

    const results = await events(10, 1, day, month, municipalityId, null, selectedType, year);

    let weatherCode = null;
    if (municipalityId && municipalityCoords.has(municipalityId)) {
        const { lat, lon } = municipalityCoords.get(municipalityId);
        updateWeatherTitle(municipalityId);
        weatherCode = await loadWeatherByCoordinates(lat, lon);
    } else if (results.length > 0 && results[0].lat && results[0].lon) {
        weatherCode = await loadWeatherByCoordinates(results[0].lat, results[0].lon);
        updateWeatherTitle(null);
    } else {
        weatherCode = await loadWeatherByCoordinates(DEFAULT_LAT, DEFAULT_LON);
        updateWeatherTitle(null);
    }

    let filteredResults = results;
    if (isBadWeather(weatherCode) && selectedType === null) {
        const indoorResults = results.filter(e => isIndoor(e));
        if (indoorResults.length > 0) {
            filteredResults = indoorResults;
            showWeatherBanner('bad');
        } else {
            showWeatherBanner('bad-no-indoor');
        }
    } else {
        showWeatherBanner('good');
    }

    renderEvents(filteredResults);
}

function showWeatherBanner(state) {
    let banner = document.getElementById('weather-filter-banner');
    if (!banner) {
        banner = document.createElement('div');
        banner.id = 'weather-filter-banner';
        const weatherSection = document.getElementById('weather');
        if (weatherSection) weatherSection.after(banner);
    }

    const messages = {
        'good': {
            icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5540C9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>`,
            text: 'Buen tiempo, te mostramos todos los planes disponibles',
            bg: '#f5f3ff',
            color: '#5540C9',
            border: '#c4b5fd'
        },
        'bad': {
            icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff4b5c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/><path d="M11 13v8M8 16v4M14 16v4"/></svg>`,
            text: 'Hoy llueve, te recomendamos solo planes de interior como teatro, cine o exposiciones',
            bg: '#fff1f2',
            color: '#ff4b5c',
            border: '#fecdd3'
        },
        'bad-no-indoor': {
            icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff4b5c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/><path d="M11 13v8M8 16v4M14 16v4"/></svg>`,
            text: 'Hoy llueve, no hemos encontrado planes de interior disponibles, mostrando todos',
            bg: '#fff1f2',
            color: '#ff4b5c',
            border: '#fecdd3'
        }
    };

    const { icon, text, bg, color, border } = messages[state];

    banner.style.cssText = `
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        padding: 0.85rem 1.5rem;
        background: ${bg};
        color: ${color};
        border-top: 3px solid ${border};
        border-bottom: 3px solid ${border};
        font-size: 0.95rem;
        font-weight: 600;
    `;

    banner.innerHTML = `${icon} <span>${text}</span>`;
}

function updateWeatherTitle(municipalityId) {
    const title = document.querySelector('.weather-card h2');
    if (!title) return;
    if (municipalityId) {
        const el = document.querySelector(`.custom-select[data-id="municipalities"] .custom-select__selected`);
        title.textContent = `Clima en ${el?.childNodes[0]?.nodeValue || 'Euskadi'}`;
    } else {
        title.textContent = 'Clima en Euskadi';
    }
}

window.addEventListener('DOMContentLoaded', async () => {
    await listMunicipalities();
    await listTypes();
    listDate();

    document.getElementById('filter-date')?.addEventListener('change', applyFilters);
    applyFilters();
});