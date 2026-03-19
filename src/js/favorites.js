import { getFavorites } from './storage.js';
import { createCard } from './definir-card.js';

const container = document.getElementById('favorites-container');
const currentUser = JSON.parse(localStorage.getItem('currentUser'));

if (!currentUser) {
    container.innerHTML = `
        <p>Debes iniciar sesión para ver tus favoritos.</p>
        <a href="login.html">Ir al login</a>
    `;
} else {
    const favorites = getFavorites();

    if (favorites.length === 0) {
        container.innerHTML = '<p>No tienes favoritos guardados aún.</p>';
    } else {
        container.innerHTML = favorites.map(e => createCard(e)).join('');
    }

    container.addEventListener('click', (e) => {
        const favBtn = e.target.closest('.icon-fav');
        const card = e.target.closest('.card');

        if (favBtn) {
            e.stopPropagation();
            const cardEl = favBtn.closest('.card');
            const eventData = JSON.parse(cardEl.dataset.event);
            toggleFavorite(eventData);
            cardEl.remove();

            if (container.querySelectorAll('.card').length === 0) {
                container.innerHTML = '<p>No tienes favoritos guardados aún.</p>';
            }
            return;
        }

        if (card) {
            window.location.href = `details-card.html?id=${card.id}`;
        }
    });
}