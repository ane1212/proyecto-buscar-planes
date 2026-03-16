
const URL_BASE = "https://api.euskadi.eus/culture/events"

class APIEvent {
    constructor(event) {
        this.id = event.id;
        this.title = event.nameEs;
        this.description = event.descriptionEs;
        this.startDate = new Date(event.startDate).toLocaleDateString();
        this.endDate = new Date(event.endDate).toLocaleDateString();
        this.municipality = event.municipalityEs;
        this.images = event.images[0].imageUrl;
        this.type = event.typeEs;
    }
}


async function events() {
    try {
        const res = await fetch(`${URL_BASE}/v1.0/events?_elements=20&_page=1&month=03&year=2026`);
        const data = await res.json();

        return data.items.map(item => new APIEvent(item));
    } catch (err) {
        console.error("Error cargando eventos:", err);
        return [];
    }
}

function eventTypes() {

    fetch(`${URL_BASE}/v1.0/eventType`)
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.error(err));

}

export { events, eventTypes, APIEvent };