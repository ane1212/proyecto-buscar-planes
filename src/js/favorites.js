import { getFavorites, toggleFavorites } from './storage.js';
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
        container.querySelectorAll('.icon-fav').forEach(btn => btn.classList.add('active'));
    }

    container.addEventListener('click', (e) => {
        const favBtn = e.target.closest('.icon-fav');
        const card = e.target.closest('.card');

        if (favBtn) {
            e.stopPropagation();
            const cardEl = favBtn.closest('.card');
            const eventId = cardEl.id;
            const allFavorites = getFavorites();
            const eventData = allFavorites.find(f => String(f.id) === String(eventId));

            if (eventData) {
                toggleFavorites(eventData);
            }
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