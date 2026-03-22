export class Event{
    constructor(apiData, municipalityData){
        this.id=apiData.id;
        this.title=apiData.nameEs;
        this.type=apiData.typeEs;
        this.startDate=apiData.startDate?.split('T')[0];
        this.municipality=municipalityData?.name || "Desconocido";
        this.lat=apiData.municipalityLatitude;
        this.lon=apiData.municipalityLongitude;
        this.weather="";
    }
}