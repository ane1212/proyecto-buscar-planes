function createNav() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    function navLink(href, label) {
        const isActive = currentPage === href ? 'class="active"' : '';
        return `<a href="${href}" ${isActive}>${label}</a>`;
    }

    return `
        <div class="nav-left">
            <a href="index.html" class="nav-logo">
                <img src="assets/img/planes.png" alt="Planes Fav logo" class="logo">
            </a>
        </div>

        <div class="nav-links">
            ${navLink('index.html', 'Inicio')}
            ${navLink('favorites.html', 'Favoritos')}
            ${navLink('about.html', 'Acerca de')}
        </div>

        <div class="nav-right">
            ${currentUser
                ? `<div class="nav-user">
                        <span class="nav-username">${currentUser.name}</span>
                        <button class="btn-logout" id="logout-btn">Cerrar sesión</button>
                   </div>`
                : `<button class="btn-login" onclick="location.href='login.html'">Iniciar sesión</button>`
            }
        </div>
    `;
}

async function loadNav() {
    const nav = document.getElementById('navbar');
    if (!nav) return;

    nav.innerHTML = createNav();

    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('currentUser');
            window.location.href = 'index.html';
        });
    }
}

window.addEventListener('DOMContentLoaded', loadNav);