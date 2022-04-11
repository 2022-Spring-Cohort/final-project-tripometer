import { asyncRequest } from "../allRequest";
import { VehicleController } from "../constants";
import utility from "../utility";
import { getSelectedOwnerId } from "./header";
import { FlatArrayFactory } from "./flat-array-proxy";
import { decodePolyline } from "./decode-polyline";
import { decodePolylines } from "./decode-polyline";
import { getCoordinatesAtDistances } from "./geometry";
import { Vehicle } from "./vehicle-model"
import { getStepsAtDistances } from "./distance";
import { getCountyGeometry } from "./overpass";

export default{
    view,
}

class Trip{
    constructor(ownerId, vehicleId, request, map, initFuelGaugeReading = 1){
        this.map = map;
        this.vehicleId = vehicleId;
        this.ownerId = ownerId;
        this.request = request;
        this.initFuelGaugeReading = initFuelGaugeReading;
        //let vehiclePromise = asyncRequest(`${VehicleController}${this.vehicleId}`);
        let directionsPromise = this.map.directionsService.route(request);
        Promise.all([/*vehiclePromise, */ directionsPromise])
            .then(([/*vehicle,*/ directions]) =>{
                this.map.directionsRenderer.setDirections(directions);
                let overviewPolyline = directions.routes[0].overview_polyline;
                console.log(directions.routes[0]);
                let isInComponents = decodePolyline(overviewPolyline,5);
                getCountyGeometry(isInComponents)
                    .then(results => {
                        
                        const geojson = osmtogeojson(results);
                        console.log(geojson);
                        const objectURL = URL.createObjectURL(new Blob([new TextEncoder().encode(JSON.stringify(geojson))], {type: "application/json; charset='application/json;charset=utf8'"}));
                        this.map.map.data.loadGeoJson(objectURL);
                    });
                this.vehicle = new Vehicle();//vehicle;
                let legs = directions.routes[0].legs;
                let tripDistance = legs.map(leg => leg.distance.value).reduce((prev,next)=> prev+next);
                let refuelDistances = this.vehicle.getRefuelDistances(tripDistance);
                let distances = refuelDistances.map(refuelDistance => refuelDistance.distance);
                let fuelUsages = refuelDistances.map(refuelDistance => refuelDistance.fuel);
                let legSteps = legs.flatMap(leg => leg.steps);
                let stepsAtDistances = getStepsAtDistances(legSteps,distances);
                let steps = stepsAtDistances.map(stepAtDistance => legSteps[stepAtDistance.stepIndex]);
                let remainingDistances = stepsAtDistances.map(stepAtDistance => stepAtDistance.distanceRemaining);
                let polylines = steps.map(step => step.polyline.points);
                let decodedPolylines = decodePolylines(polylines);
                console.log(decodedPolylines);
                let coordinates = getCoordinatesAtDistances(remainingDistances,decodedPolylines);
                console.log(coordinates);
                //remove null coordinates (happens if final fuel stop is at the destination)
                let coordinatesToGeocode = coordinates.filter(coordinate => coordinate != null);
                console.log(coordinatesToGeocode);
                this.map.addMarkers(coordinatesToGeocode);
                this.map.reverseGeocodeAll(coordinatesToGeocode)
                    .then(allResults => {
                        let states = [];
                        states.push(directions.routes[0].legs[0].start_address.match(/([A-Z]{2}),\sUSA/)[1]);
                        for (let results of allResults){
                            states.push(results[results.length-2].address_components[0].short_name);
                        }
                        console.log(fuelUsages, states);
                        //calculate fuel cost by state
                        
                    });

            });
    }

    //getter functions can only be called after directions have responded
    //there will only be one leg unless we add stop over waypoints
    get refuelDistances(){
        this.vehicle.getRefuelDistances(this.tripDistance);
    }

    get legs() {
        return this.directions.routes[0].legs;
    }

    get tripDistance() {
        let distance = 0;
        if (this.legs.length < 2)
            distance = this.legs[0].distance.value
        else
            this.legs.reduce((prevLeg, currLeg) => { prevLeg.distance.value + currLeg.distance.value}, distance);
        return distance;
    }

    //generator that returns all steps of all legs
    get steps() {
        let legSteps = [];
        for (let i = 0; i < this.legs.length; ++i){
            legSteps.push(this.legs[i].steps);
        }
        return FlatArrayFactory(legSteps);
    }

    //generator, given array of distances (in meters), find all steps
    getStepsAtDistances(distances){
        if (distances.length < 1) return;
        let totalDistance = 0; //accumulators
        let prevDistance = 0;
        let totalDuration = 0;
        let prevDuration = 0;
        let stepsAtDistances = [];
        let j = 0;

        for (let i = 0; i < distances.length; i++) {
                while (j < this.steps.length && totalDistance < distances[i]){
                prevStep = this.steps[j];
                prevDistance = totalDistance;
                prevDuration = totalDuration;
                totalDistance += this.steps[j].distance.value;
                totalDuration += this.steps[j].duration.value;
                j++;
            }
            let distanceRemaining = distances[i] - prevDistance; //the distance needed to travel along the path of the prev step
            let intervalRatio = distances[i]/distanceRemaining; //used to calculate (very) rough ETA
            let eta = prevDuration * intervalRatio;
            stepsAtDistances.push({stepIndex: j-1, distanceRemaining: distanceRemaining, eta: eta});
            totalDistance = 0;
            prevDistance = 0;
            totalDuration = 0;
            prevDuration = 0;
        }
        return stepsAtDistances;
    }
}

const appDiv = document.getElementById("app");

function view(){
    document.getElementById(appDiv);
    appDiv.innerHTML = `
        <div id="container" style="min-height:100vh; display:flex">
            <google-map id="map"></google-map>
            <div id="sidebar" style="flex-basis: 15rem;flex-grow: 1;padding: 1rem;max-width: 30rem;height: 100%;box-sizing: border-box;overflow: auto;flex-direction: column;">
                <select id="vehicle-select">
                    <option selected disabled>---SELECT VEHICLE---</option>
                </select>
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
    const vehicleSelect = document.getElementById("vehicle-select");
    vehicleSelectInit(vehicleSelect);
    

    submitButton.addEventListener('click', function(){
        let request = {
            origin: origin.value,
            destination: destination.value,
            travelMode: 'DRIVING', //driving
            unitSystem: unitSystem.value,
            avoidHighways: avoidHighways.checked,
            avoidTolls: avoidTolls.checked
        };

        let ownerId = getSelectedOwnerId();
        let vehicleId = vehicleSelect.value;
        let trip = new Trip(ownerId,vehicleId,request,map);
        console.log(trip);
    });
}

//populate vehicle select
//create cards for vehicle info
async function vehicleSelectInit(vehicleSelect){
    let ownerId = getSelectedOwnerId();
    console.log('ownerId',ownerId);
    let vehicles = await asyncRequest(`${VehicleController}?ownerId=${ownerId}`);
    console.log('vehicles',vehicles);
    let options = {
        attributes: {"data-id": "id", "value": "id"},
        properties: {"text": "yearMakeModel"}
    };
    utility.populateSelect(vehicleSelect,vehicles,options);

}