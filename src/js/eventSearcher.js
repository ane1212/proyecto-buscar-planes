import { events, municipalities } from '../api/apiPlanes.js';
import loadWeatherByCoordinates from '../api/apiTiempo.js'; 

export class EventSearcher {
    constructor() {
        this.allEvents = [];
    }

    async loadInitialData() { 
        const rawData = await events(20, 1);
        this.allEvents = rawData;
        return this.allEvents;
    }

    async applyFilters(criteria) {
        
        let filtered = this.allEvents.filter(event => {
            const matchType = criteria.type ? event.type === criteria.type : true;
            const matchPlace = criteria.place ?
                event.municipality?.name.toLowerCase().includes(criteria.place.toLowerCase()) : true;
            const matchDate = criteria.date ? event.startDate.includes(criteria.date) : true;

            return matchType && matchPlace && matchDate;
        });

        
        if (criteria.weather && filtered.length > 0) {
            const resultsWithWeather = [];
            
            for (const event of filtered) { 
                const weatherData = await this._getWeather(event.municipality.latitude, event.municipality.longitude);
                
                if (weatherData.includes(criteria.weather)) {
                    resultsWithWeather.push(event);
                }
            }
            return resultsWithWeather; 
        }

        return filtered; 
    }

    async _getWeather(lat, lon) {
        const url = `https://api.open-meteo.com{lat}&longitude=${lon}&current_weather=true`;
        const res = await fetch(url);
        const data = await res.json();
        
       
        return "Soleado"; 
    }
}
