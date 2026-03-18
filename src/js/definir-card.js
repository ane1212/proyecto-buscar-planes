import { events } from '../api/apiPlanes.js';

function createCard(event) {
    return `
    <article class="card" id="${event.id}">
        <div class="card-header">
            <img src="${event.images}" class="card-img" alt="${event.title}">            
            <div class="icon-fav">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                </svg>
            </div>
            
            <div class="type-event">
                <span>${event.type || 'Evento'}</span>
            </div>
        </div>

        <div class="card-content">
            <h3 class="card-title">${event.title}</h3>             
            <p class="card-date">${event.startDate} - ${event.endDate}</p>
            <p class="card-location">${event.municipality} - ${event.province.name}</p>                  
        </div>
    </article>
    `;
}


async function loadPlanSection() {
    const data = await events();
    const container = document.getElementById('view-container');

    container.innerHTML = data.map(e => createCard(e)).join('');

}
window.addEventListener('DOMContentLoaded', loadPlanSection);


const container = document.getElementById('view-container');
container.addEventListener('click', (e) => {
    const favBtn = e.target.closest('.icon-fav');
    const card = e.target.closest('.card');

    if (favBtn) {
        e.stopPropagation();
        favBtn.classList.toggle('active');

        favBtn.style.transform = 'scale(0.9)';
        setTimeout(() => {
            favBtn.style.transform = 'scale(1)';
        }, 100);
        return;
    }

    if (card) {
        const id = card.id;
        window.location.href = `details-card.html?id=${id}`;
    }
});


