import { events, municipalities, eventTypes, } from '../api/apiPlanes.js';
//import {loadWeatherByCoordinates} from '../api/apiTiempo.js';
import { renderEvents } from './definir-card.js';

//  class EventSearcher {
//     constructor() {
//         this.allEvents = [];
//         this.allMunicipalities = [];
//         this.allEventTypes = [];
//     }





//     async loadInitialData() {
//         const [rawEvents, rawMunis] = await Promise.all([
//             events(),
//             municipalities()
//         ]);
//         this.allEvents = rawEvents;
//         this.allMunicipalities = rawMunis;
//         return this.allEvents;
//     }

//     getMunisByProvince(provinceId) {
//         return this.allMunicipalities;
//     }

//     getRecommendation(weatherCode) {
//         if (weatherCode >= 61 || weatherCode === 3) {
//             return {
//                 category: "Teatro",
//                 message: " Se prevé lluvia: te recomendamos planes a cubierto como Teatro."
//             };
//         }
//         return { category: null, message: "" };
//     }

//     applyFilters(criteria) {
//         return this.allEvents.filter(event => {
//             const matchType = criteria.type ? event.type === criteria.type : true;
//             const matchMuni = criteria.municipality ? event.municipality === criteria.municipality : true;

//             const eventDate = new Date(event.startDate).split('T')[0];
//             const matchDate = criteria.date ? eventDate === criteria.date : true;

//             return matchType && matchMuni && matchDate;
//         });
//     }

//     async fetchWeatherForDate(lat, lon, date) {
//         const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weathercode&timezone=auto`;
//         const res = await fetch(url);
//         const data = await res.json();
//         const index = data.daily.time.indexOf(date);
//         return index !== -1 ? data.daily.weathercode[index] : null;
//     }
// }



// function filterType(type) {
//     return `
//     <section class="">
//         <div class="filters-group">
//             <select id="types">

//                 <option value="${type.id}">${type.name}</option>
//             </select>
//         </div>
//     </section>
//     `;
// }

// async function listTypes() {
//     const allTypes = await eventTypes();
//     const section = document.getElementById('type');
//     section.innerHTML = `<option value="todos">Todos</option>`;
//     section.innerHTML += allTypes.map(e => filterType(e)).join('');
// }
// window.addEventListener('DOMContentLoaded', listTypes);





// export function filterMunicipalities(municipalities) {
//     return `
//     <section class="">
//         <div class="filters-group">
//             <select id="municipalities">
//                 <option value="${municipalities.id}">${municipalities.name}</option>
//             </select>
//         </div>
//     </section>
//     `;
// }

// async function listMunicipalities() {
//     const allTypes = await municipalities();
//     const section = document.getElementById('municipalities');
//     section.innerHTML = `<option value="todos">Todos</option>`;
//     section.innerHTML += allTypes.map(e => filterMunicipalities(e)).join('');
// }
// window.addEventListener('DOMContentLoaded', listMunicipalities);

// ✅ Solo el <option>
function filterType(type) {
    return `<option value="${type.id}">${type.name}</option>`;
}

async function listTypes() {
    const allTypes = await eventTypes();
    const section = document.getElementById('type');
    section.innerHTML = `<option value="todos">Todos</option>`;
    section.innerHTML += allTypes.map(e => filterType(e)).join('');
}

//window.addEventListener('DOMContentLoaded', listTypes);

// ✅ Solo el <option>
export function filterMunicipalities(municipalities) {
    return `<option value="${municipalities.id}">${municipalities.name}</option>`;
}

async function listMunicipalities() {
    const allTypes = await municipalities();
    const section = document.getElementById('municipalities');
    section.innerHTML = `<option value="todos">Todos</option>`;
    section.innerHTML += allTypes.map(e => filterMunicipalities(e)).join('');
}

//window.addEventListener('DOMContentLoaded', listMunicipalities);

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
//window.addEventListener('DOMContentLoaded', listDate);

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

// ✅ Al final los listeners
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
