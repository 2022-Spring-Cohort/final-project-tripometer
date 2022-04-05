import { GoogleMap, fetchDirections, fetchNearbyPlaces } from "./google-map";
import { decodePolyline } from "./decodePolyline";
import { Distance } from "./distance";
import { getCoordinateAtDistance } from "./distance";
import { FuelStop } from "./fuelStops";

export default{
    view,
}

//import {Car} from "./car";

//remove once we get car.js setup
//note most cars have 2.5 gallons left in the tank when their fuel gauge reads empty
const FUEL_LEFT_ON_EMPTY = 2, //below average in gallons
const tempCar = {
    ownerId = 1,
    fuelTankSize = 12, //average in gallons
    fuelEfficiency = 24.2, //average in mpg
    gaugeReading = 0.5, //percentage of starting fuel
    get fuel(){
        return this.fuelTankSize * this.gaugeReading;
    },
    get maxDistance(){  //max distance that can be traveled
        return this.fuel * this.fuelEfficiency; //initial maxDistance would be 145.2 miles
    },
    get maxDistanceOnEmpty(){
        return FUEL_LEFT_ON_EMPTY * this.fuelEfficiency;
    }
};

class Trip{
    vehicle;
    map;
    directions;
    constructor(vehicle, origin, destination, unitSystem = Distance.unitSystem.METRIC, initFuelGaugeReading = 1){
        this.vehicle = vehicle;
        this.unitSystem = unitSystem;
        this.initFuelGaugeReading = initFuelGaugeReading;
        this.directions = this.getDirections(origin,destination);
    }

    //virtual properties
    //Tripometer: send trip data from trip.js here
    async getDirections(origin, destination, unitSystem = this.unitSystem){
        this.directions = await fetchDirections(origin, destination, unitSystem); //initial directions
        this.waypoints = await this.fuelStops();
        //if fuelStops recalculate directions with fuelStops
        if (this.waypoints.length > 0) {
            this.#legs = null;
            this.#distance = null;
            this.#steps = null;
            this.#instructions = null;
            this.directions = getDirections(origin, destination, unitSystem, this.waypoints)
        }
        return await directions;
    }

    //memoize
    #legs = null;
    get legs(){
        return this.#legs ?? (this.#legs = this.directions.routes[0].legs.flatMap(leg => leg));
    }

    //sum distances of each leg
    //memoize
    #distance = null;
    get distance(){
        return this.#distance ?? (this.legs.reduce((prevLeg,nextLeg)=>
                                    prevLeg.distance.value + nextLeg.distance.value, this.#distance));
    }

    //memoize
    #steps = null;
    get steps(){
        return this.#steps ?? (this.#steps = this.legs.flatMap(leg => leg.steps));
    }

    //memoize
    #instructions = null;
    get instructions(){
        return this.#instructions ?? (this.#instructions = this.steps.map(step => `
            <div class="step">
                <div class="maneuver">
                    <object data="${getManeuverIconURL(step.maneuver)}" type="image/png>
                        <img src="./images/no_maneuver.png" />
                    </object>
                </div>
                <div class="instruction">${step.htmlInstruction}</div>
                <div class="duration-distance">${step.duration.text}(${step.distance.text})</div>
            </div>
        `));
    }

    //should be more accurate than the overview polyline for rendering
    get encodedPolylines(){
        return this.steps.map(step => step.polyline.points);
    }

    //route path
    get path(){
        return this.encodedPolylines.flatMap(encodedPolyline => decodePolyline(encodedPolyline));
    }

    //yields fuelStop (place details) as they're fetched
    async *fuelStops(){
        let currentDistance = 0;
        let remainingDistance = this.distance;
        let fuelGaugeReading = vehicle.initFuelGaugeReading;
        while (remainingDistance > vehicle.maxDistance){ //you need fuel
            currentDistance += vehicle.maxDistance;
            remainingDistance -= currentDistance;
            fuelGaugeReading = 1; //fulltank;
            if (remainingDistance < vehicle.maxDistance){ //we don't need a full tank
                fuelGaugeReading = remainingDistance/vehicle.maxDistance;
            }
            let stopLocation = getCoordinateAtDistance(currentDistance);
            let fuelStop = new FuelStop(stopLocation, new Date(Date.now())) //no clue how I am going to get date time
            yield await fuelStop.get();
        }
        return;
    }

    create(){
        //call backend post method

    }

    static index(){
        //called like Trip.read()
        //call backend get method
        //call frontend display
    }

    static read(id){
        //called like Trip.read(id);
        //call backend get method
        //call frontend display
    }

    update(){
        //call backend put method
    }

    delete(id){
        //call backend delete method
    }
}

const appDiv = document.getElementById("app");

function view(){
    document.getElementById(appDiv);
    appDiv.innerHTML = `
        <div id="container" style="min-height:100vh; display:flex">
            <google-map id="map"></google-map>
            <div id="sidebar" style="flex-basis: 15rem;flex-grow: 1;padding: 1rem;max-width: 30rem;height: 100%;box-sizing: border-box;overflow: auto;flex-direction: column;">
                <label for="origin">Origin:</label><input id="origin" />
                <label for="destination">Destination:</label><input id="destination" />
                <select id="unit-system">
                    <option selected disabled>---SELECT UNIT SYSTEM---</option>
                    <option value="0">Metric</option>
                    <option value="1">Imperial</option>
                </select>
                <label for="avoid-highways">Avoid Highways</label><input id="avoid-highways" type="checkbox" />
                <label for="avoid-tolls">Avoid Tolls</label><input id="avoid-tolls" type="checkbox" />
                <button id="submit-button">Submit</button>
            </div>
        </div>
    `;

    init();
}

function init(){
    const origin = document.getElementById("origin");
    const destination = document.getElementById("destination");
    const unitSystem = document.getElementById("unit-system");
    const submitButton = document.getElementById("submit-button");
    const avoidHighways = document.getElementById("avoid-highways");
    const avoidTolls = document.getElementById("avoid-tolls");
    const map = document.getElementById("map");

    //assuming Google API is loaded otherwise we'll have to setup some sort of script load event
    map.init();

    submitButton.addEventListener('click', function(){
        let request = {
            origins: [origin.value],
            destinations: [destination.value],
            travelMode: google.maps.TravelMode.DRIVING, //driving
            unitSystem: unitSystem.value,
            avoidHighways: avoidHighways.checked,
            avoidTolls: avoidTolls.checked
        };

        map.createTrip(request);
    });
}