function createFooter() {
    return `
        <p>Planes Fav © 2026</p>
        <p><a href="about.html">Acerca de</a></p>
    `;
}

async function loadFooter() {
    const footer = document.getElementById('footer');
    footer.innerHTML = createFooter();
}

window.addEventListener('DOMContentLoaded', loadFooter);

