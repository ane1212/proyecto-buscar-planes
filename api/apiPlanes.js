
const URL_BASE = "https://api.euskadi.eus/culture/events"

class APIEvent {
    constructor(event) {
        this.id = event.id;
        this.title = event.nameEs;
        this.description = event.descriptionEs;
        this.startDate = event.startDate;
        this.endDate = event.endDate;
        this.municipality = event.municipalityEs;
        this.images = event.images[0].imageUrl;
        this.type = event.typeEs;
        this.price = event.priceEs;
        this.purchaseUrl = event.purchaseUrlEs;
        this.hour = event.openingHoursEs;
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
function eventTypeDate(type, year, month, day) {
    //https://api.euskadi.eus/culture/events/v1.0/events/byType/1/byDate/2020/10/20?_elements=20&_page=1
    fetch(`${URL_BASE}/v1.0/events/byType/${type}/byDate/${year}/${month}/${day}`)
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.error(err));
}

function yearByMunicipality(year, province, municipality) {
    //https://api.euskadi.eus/culture/events/v1.0/events/byYear/2020/byMunicipality/48/20?_elements=20&_page=1
    fetch(`${URL_BASE}/v1.0/events/byYear/${year}/byMunicipality/${province}/${municipality}`)
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.error(err));
}

export { events, eventTypes, eventTypeDate, yearByMunicipality, APIEvent };