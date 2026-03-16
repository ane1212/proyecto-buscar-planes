import { events, provinces } from './api/apiPlanes.js';

function createCard(event, province) {
    return `
    <article class="card">
        <div class="card-header">
            <img src="${event.images}" class="card-img" alt="${event.title}">
            
            <div class="icon-fav">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                </svg>
            </div>
            
            <div class="type-badge">
                <span>${event.type || 'Evento'}</span>
            </div>
        </div>

        <div class="card-content">
            <div class="content-top">
                <h2 class="card-title">${event.title}</h2>
                <p class="card-location">${event.municipality} - ${event.province}</p>
            </div>

            <div class="card-dates">
                <div class="date-item">
                    <small>INICIO</small>
                    <span>${event.startDate}</span>
                    <span>${event.hour}</span>
                </div>
                <div class="date-sep"></div>
                <div class="date-item">
                    <small>FIN</small>
                    <span>${event.endDate}</span>
                </div>
            </div>

            <p class="card-description">${event.description}</p>
            
            <div class="card-footer">
                <div class="price-tag">${event.price}</div>
                <a href="${event.purchaseUrl}" class="btn-buy" target="_blank">Entradas</a>
            </div>
        </div>
    </article>
    `;
}


async function loadPlanSection() {
    const data = await events()
    const container = document.getElementById('view-container');

    container.innerHTML = data.map(e => createCard(e)).join('');

}
window.addEventListener('DOMContentLoaded', loadPlanSection);
