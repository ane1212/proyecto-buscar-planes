import { events } from '../api/apiPlanes.js';
import { toggleFavorite, isFavorite, getFavorites } from './storage.js';

export function createCard(event) {
    const faved = isFavorite(event.id);
    return `
      <article class="card" id="${event.id}">
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
                <p class="card-location">${event.municipality} - ${event.province.name}</p>
                <p class="card-date">${event.startDate} - ${event.endDate}</p>
            </div>
        </div>
    </article>
    `;
}

export function renderEvents(data) {
    const container = document.getElementById('view-container');
    if (!data || data.length === 0) {
        container.innerHTML = `<p>No se encontraron eventos.</p>`;
        return;
    }
    container.innerHTML = data.map(e => createCard(e)).join('');
}

function renderFavorites() {
    const favContainer = document.getElementById('favorites-container');
    if (!favContainer) return;
    const favorites = getFavorites();
    if (favorites.length === 0) {
        favContainer.innerHTML = '<p id="no-favorites">No tienes favoritos</p>';
        return;
    }
    favContainer.innerHTML = favorites.map(e => createCard(e)).join('');
}

async function loadPlanSection() {
    const data = await events(10, 1, null, null, null, null, null, 2026);
    renderEvents(data);
}

window.addEventListener('DOMContentLoaded', () => {
    loadPlanSection();
    renderFavorites();
});

const container = document.getElementById('view-container');
container.addEventListener('click', (e) => {
    const favBtn = e.target.closest('.icon-fav');
    const card = e.target.closest('.card');

    if (favBtn) {
        e.stopPropagation();

        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser) {
            alert("Debes iniciar sesión para guardar favoritos");
            window.location.href = 'login.html';
            return;
        }

        const cardEl = favBtn.closest('.card');
        const eventData = JSON.parse(cardEl.dataset.event);
        const result = toggleFavorite(eventData);

        if (result.success) {
            favBtn.classList.toggle('active', result.isFavorite);
            renderFavorites();
        }

        favBtn.style.transform = 'scale(0.9)';
        setTimeout(() => { favBtn.style.transform = 'scale(1)'; }, 100);
        return;
    }

    if (card) {
        window.location.href = `details-card.html?id=${card.id}`;
    }
});