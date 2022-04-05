import { fetchNearbyPlaces, GoogleMap } from "./google-map";
import { getCoordinateAtDistance } from "./distance";

//need to use this
const placesService = new google.maps.places.PlacesService();

//initial request format
/*
    {
        location: {lat:-37.56,lng:40.01},
        rankBy: 'DISTANCE',
        type: 'gas_station',
    }
*/

//detail request format
/*
    placeId: 'PlAc3ID',
    fields: ['geometry','opening_hours']
*/

export class FuelStop{
    //location is a LatLng obj, dateTime is estimated arrival time as a Date obj
    constructor(location, dateTime){
        this.dateTime = dateTime;
        this.location = location;
    }

    async get(){
        let request = {
            location: this.location,
            rankBy: 'DISTANCE',
            type: 'gas_station',
        };
        let [places, status] = await placesService.nearbySearch(request);
        if (status !== 'OK') throw new Error('Request to Google Places service was not successful.');
        return nearestOpen = await this.getNearestOpen(places);
    }

    async getNearestOpen(places){
        for (let place of places){
            let request = {
                placeId: place.placeId,
                fields: ['geometry','opening_hours']
            };
            let [placeDetails, status] = await placesService.getDetails(request);
            if (status !== 'OK') throw new Error('Request to Google Places service was not successful.');
            if (placeDetails.opening_hours.isOpen(this.dateTime)) {
                return placeDetails;
            }
        }
    }
}