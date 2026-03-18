import { events, municipalities, eventTypes, } from '../api/apiPlanes.js';

import { renderEvents } from './definir-card.js';

function filterType(type) {
    return `<option value="${type.id}">${type.name}</option>`;
}

async function listTypes() {
    const allTypes = await eventTypes();
    const section = document.getElementById('type');
    section.innerHTML = `<option value="todos">Todos</option>`;
    section.innerHTML += allTypes.map(e => filterType(e)).join('');
}

export function filterMunicipalities(municipalities) {
    return `<option value="${municipalities.id}">${municipalities.name}</option>`;
}

async function listMunicipalities() {
    const allTypes = await municipalities();
    const section = document.getElementById('municipalities');
    section.innerHTML = `<option value="todos">Todos</option>`;
    section.innerHTML += allTypes.map(e => filterMunicipalities(e)).join('');
}

function date() {
    return `
    <input type="date" id="filter-date">
    `;
}
function listDate() {
    const section = document.getElementById('date-filter');
    if (section) {
        section.innerHTML = date();
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
