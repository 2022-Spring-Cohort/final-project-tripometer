import { asyncRequest } from "../allRequest";
import { VehicleController } from "../constants";
import utility from "../utility";
import { getSelectedOwnerId } from "./header";
import { FlatArrayFactory } from "./flat-array-proxy";
import { decodePolylines } from "./decode-polyline";
import { getCoordinatesAtDistances } from "./geometry";

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
        let vehiclePromise = asyncRequest(`${VehicleController}${this.vehicleId}`);
        let directionsPromise = this.map.directionsService.route(request);
        Promise.all([vehiclePromise, directionsPromise])
            .then(([vehicle, directions]) => {
                this.vehicle = vehicle;
                this.directions = directions;
                let refuelDistances = this.refuelDistances;
                let distances = refuelDistances.map(refuelDistance => refuelDistance.distance);
                let fuelUsages = refuelDistances.map(refuelDistance => refuelDistance.fuel);
                let stepsAtDistances = this.getStepsAtDistances(distances);
                let steps = stepsAtDistances.map(stepAtDistance => this.steps[stepAtDistance.stepIndex]);
                let remainingDistances = stepsAtDistances.map(stepAtDistance => stepAtDistance.remainingDistance);
                let polylines = steps.map(step => step.polyline.points);
                let decodedPolylines = decodePolylines(polylines);
                let coordinates = getCoordinatesAtDistances(remainingDistances,decodedPolylines);
                this.map.reverseGeocodeAll(coordinates)
                    .then(allResults => {
                        //address_components[5].short_name should be state abrev
                        states = allResults.map(results => results[0].address_components[5].short_name);
                        console.log(fuelUsages, states);
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
        return this.legs.reduce(prevLeg, currLeg => prevLeg.distance.value + currLeg.distance.value);
    }

    //generator that returns all steps of all legs
    get steps() {
        let legSteps = [];
        for (let i = 0; i < this.legs.length; ++i){
            legSteps.push(legs[i].steps);
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
    });
}

//populate vehicle select
//create cards for vehicle info
async function vehicleSelectInit(vehicleSelect){
    let ownerId = getSelectedOwnerId();
    console.log('ownerId',ownerId);
    let vehicles = await asyncRequest(`https://localhost:44376/api/vehicle?ownerId=${ownerId}`);
    console.log('vehicles',vehicles);
    let options = {
        attributes: {"data-id": "id", "value": "id"},
        properties: {"text": "yearMakeModel"}
    };
    utility.populateSelect(vehicleSelect,vehicles,options);

}