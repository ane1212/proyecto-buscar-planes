
const URL_BASE = "https://api.euskadi.eus/culture/events"

class APIEvent {
    constructor(event, provinceMap, municipalitiesMap) {
        this.id = event.id;
        this.title = event.nameEs;
        this.description = event.descriptionEs;
        this.startDate = new Date(event.startDate).toLocaleDateString();
        this.endDate = new Date(event.endDate).toLocaleDateString();
        this.municipality = event.municipalityEs;
        this.images = event.images[0]?.imageUrl;
        this.type = event.typeEs;
        this.price = event.priceEs;
        this.purchaseUrl = event.purchaseUrlEs;
        this.hour = event.openingHoursEs;
        this.province = provinceMap.get(Number(event.provinceNoraCode)) || '';
    }
}

class APIProvince {
    constructor(province) {
        this.id = province?.provinceId;
        this.name = province?.nameEs;
        this.latitude = null;
        this.longitude = null;
    }
}

class APIMunicipalities {
    constructor(municipality) {
        this.id = municipality?.municipalityId;
        this.name = municipality?.nameEs;
    }
}

class APIType {
    constructor(type) {
        this.id = type?.id;
        this.name = type?.nameEs;
    }
}


async function events(elemets, page, day, month, municipalityId, provinceId, type, year) {
    try {
        const provinceList = await provinces();
        const provinceMap = new Map(provinceList.map(p => [p.id, p]));

        const municipalitiesList = await municipalities();
        const municipalitiesMap = new Map(municipalitiesList.map(p => [p.id, p]));


        const params = new URLSearchParams();
        if (elemets != null) params.set('_elements', elemets);
        if (page != null) params.set('_page', page);
        if (day != null) params.set('day', day);
        if (month != null) params.set('month', month);
        if (municipalityId != null) params.set('municipalityNoraCode', municipalityId);
        if (provinceId != null) params.set('provinceNoraCode', provinceId);
        if (type != null) params.set('type', type);
        if (year != null) params.set('year', year);

        const res = await fetch(`${URL_BASE}/v1.0/events?${params.toString()}`);
        const data = await res.json();

        if (!data.items) return [];

        return data.items.map(item => new APIEvent(item, provinceMap, municipalitiesMap));

    } catch (err) {
        console.error("Error cargando eventos:", err);
        return [];
    }
}

async function eventTypes() {
    try {
        const res = await fetch(`${URL_BASE}/v1.0/eventType`);
        const data = await res.json();

        return data.map(item => new APIType(item));
    } catch (err) {
        console.error("Error cargando tipos:", err);
        return [];
    }

}

async function provinces() {
    try {
        const res = await fetch(`${URL_BASE}/v1.0/provinces`);
        const data = await res.json();

        return data.items.map(item => new APIProvince(item));
    } catch (err) {
        console.error("Error cargando provincias:", err);
        return [];
    }

}

async function municipalities() {
    try {
        const res = await fetch(`${URL_BASE}/v1.0/municipalities`);
        const data = await res.json();

        return data.items.map(item => new APIMunicipalities(item));
    } catch (err) {
        console.error("Error cargando municipios:", err);
        return [];
    }

}

async function eventById(id) {
    try {
        const provinceList = await provinces()
        const provinceMap = new Map(
            provinceList.map(p => [p.id, p])
        );
        const municipalitiesList = await municipalities()
        const municipalitiesMap = new Map(
            municipalitiesList.map(p => [p.id, p])
        );
        const res = await fetch(`${URL_BASE}/v1.0/events/${id}`);
        const data = await res.json();

        return new APIEvent(data, provinceMap, municipalitiesMap);
    } catch (err) {
        console.error("Error cargando municipios:", err);
        return [];
    }

}

export { events, eventTypes, provinces, municipalities, eventById };