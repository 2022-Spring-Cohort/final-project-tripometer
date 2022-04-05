import main from './js/main';

//Maps API
import 'dotenv/config';
import {Client} from "@googlemaps/google-maps-services-js";

main.setup();

//Maps API
export class GoogleMapsService extends Client {
    static #apiKey = process.env.GOOGLE_MAPS_API_KEY;
    
    //https://googlemaps.github.io/google-maps-services-js/interfaces/DirectionsRequest.html
    async directions(directionsRequest){
        directionsRequest.key = GoogleMapsService.#apiKey;
        return super.directions(directionsRequest);
    }

    //https://googlemaps.github.io/google-maps-services-js/interfaces/PlacesNearbyRequest.html
    async placesNearby(placesNearbyRequest){
        placesNearbyRequest.key = GoogleMapsService.#apiKey;
        return super.placesNearby(placesNearbyRequest); 
    }
}

const client = new GoogleMapsService();
let places = await client.placesNearby({});
for (let place of places){
    place.opening_hours.isOpen();
}