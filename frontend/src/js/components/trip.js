import { asyncRequest } from "../allRequest";
//import { VehicleController } from "../constants";
import utility from "../utility";
import { getSelectedOwnerId } from "./header";;
import { decodePolyline } from "./decode-polyline";
import { decodePolylines } from "./decode-polyline";
import { getCoordinatesAtDistances } from "./geometry";
import { getVehicle } from "./vehicle-model";
import { getStepsAtDistances } from "./distance";
import { getCountyGeometry } from "./overpass";
import { TripController } from "../constants";

const VEHICLECONTROLLER = "https://localhost:44376/api/Vehicle"

export default{
    view,
}

async function mapTrip(vehicle, request, map, departureDT, odometerReading, initFuelGaugeReading = 1, isRoundTrip = false, disembarkmentDT=null, isReturnTrip=false){
    //let vehiclePromise = asyncRequest(`${VehicleController}${vehicleId}`);
    //hack
    if (isReturnTrip){
        vehicle.refuel();
        console.log("REFULED VEHICLE!!!!",vehicle,request);
    }
    console.log('DEPARTURE',departureDT);
    let directions = await map.directionsService.route(request);
    map.directionsRenderer.setOptions({PolylineOptions:{
        zIndex: 5
    }});
    map.directionsRenderer.setDirections(directions);
    let overviewPolyline = directions.routes[0].overview_polyline;
    console.log(directions);
    let isInComponents = decodePolyline(overviewPolyline,5);
    if (!isReturnTrip){
        getCountyGeometry(isInComponents)
            .then(results => {

                // markers = [];
                // results.elements.foreach(element => {
                //     const countyState = element.tags.wikipedia;
                //     let [,county,state] = countyState.match(/en:([a-z\s]+),\s([a-z\s]+)$/i);
                //     county = county.replace(/\scounty/i,'');
                //     //from global gas price obj see index.html
                //     gasPrice = gasPrices[state][county];
                //     const adminCentre = element.members.filter(member => member.role == "admin_centre")[0];
                // });

                let geojson = osmtogeojson(results);
                //filter points to avoid Marker hell
                const displayedFeatures = [];
                geojson.features.forEach(feature => {
                    if (feature.geometry.type == "Polygon"){
                        feature["style"] = {};
                        const countyState = feature.properties.wikipedia.match(/en:([a-z\s]+),\s([a-z\s]+)$/i);
                        const county = countyState[1].replace(/\scounty/i,'');
                        const state = countyState[2];
                        //console.log(state,county,gasPrices[state],gasPrices[state][county]);
                        const gasPrice = gasPrices[state][county];
                        feature.style["title"] = `${county} County, ${state}: ${gasPrice}`;
                        displayedFeatures.push(feature);
                    }
                });
                
                geojson.features = displayedFeatures;
                const objectURL = URL.createObjectURL(new Blob([new TextEncoder().encode(JSON.stringify(geojson))], {type: "application/json; charset='application/json;charset=utf8'"}));
                map.map.data.loadGeoJson(objectURL);
                map.map.data.setStyle({
                    fillColor: 'blue',
                    fillOpacity: 0,
                    zIndex: 1,
                    strokeColor: 'green',
                    strokeOpacity: 0.25,
                    strpleWeight: 1,
                    
                });
                
            });
    }
    let legs = directions.routes[0].legs;
    let tripDistance = legs.map(leg => leg.distance.value).reduce((prev,next)=> prev+next);
    let refuelDistances = vehicle.getRefuelDistances(tripDistance);
    if (isReturnTrip){
        console.log("RETURN TRIP VEHICLE INFO", vehicle,refuelDistances);
    }
    
    let distances = refuelDistances.map(refuelDistance => refuelDistance.distance);
    let fuelUsages = refuelDistances.map(refuelDistance => refuelDistance.fuel);
    let legSteps = legs.flatMap(leg => leg.steps);
    let stepsAtDistances = getStepsAtDistances(legSteps,distances);
    let steps = stepsAtDistances.map(stepAtDistance => legSteps[stepAtDistance.stepIndex]);
    let remainingDistances = stepsAtDistances.map(stepAtDistance => stepAtDistance.distanceRemaining);
    let polylines = steps.map(step => step.polyline.points);
    let decodedPolylines = decodePolylines(polylines);
    let coordinates = getCoordinatesAtDistances(remainingDistances,decodedPolylines);
    let startCoordinate = directions.routes[0].legs[0].start_location;
    //in seconds
    let tripDuration = legs.map(leg => leg.duration.value).reduce((prev,next)=> prev+next);
    let arrivalDate = departureDT.setSeconds(departureDT.getSeconds() + tripDuration);
    //remove null coordinates (happens if final fuel stop is at the destination)
    let coordinatesToGeocode = coordinates.filter(coordinate => coordinate != null);
    //console.log([startCoordinate, ...coordinatesToGeocode]);
    map.addMarkers(coordinatesToGeocode);
    const allResults = await map.reverseGeocodeAll([startCoordinate, ...coordinatesToGeocode]);
    //let counties = [];
    if (isReturnTrip){
        console.log('RETURN TRIP ALL RESULTS', allResults);
    }
    
    let fuelStops = [];
    for (let i = 0; i < distances.length; i++){
        const results = allResults[i];
        const fuelUsage = fuelUsages[i];
        const distance = distances[i];
        const countyComponents = results[results.length-3].address_components;
        const county = countyComponents[0].long_name.replace(/\scounty/i,'').trim();
        const state = countyComponents[1].long_name.trim();
        const gasPrice = parseFloat(gasPrices[state][county].replace('$',''));
        fuelStops.push({fuelUsage: fuelUsage, distance: distance, county: county, state: state, gasPrice: gasPrice, gasCost: gasPrice*fuelUsage});
    }

    if (isReturnTrip){
        console.log('fuel stops!', fuelStops);
    }

    // for (let results of allResults){
    //     const countyComponents = results[results.length-3].address_components;
    //     console.log(countyComponents);
    //     const county = countyComponents[0].long_name.replace(/\scounty/i,'').trim();
    //     const state = countyComponents[1].long_name.trim();
    //     counties.push({county: county, state: state, cost: parseFloat(gasPrices[state][county].replace('$',''))});
    // }
    // let fuelCosts = [];
    // for (let i = 0; i < fuelUsages.length; i++){
    //     console.log(fuelUsages[i], counties[i].cost);
    //     fuelCosts.push(fuelUsages[i] * counties[i].cost);
    // }
    
    const totals = {
        fuelUsage: fuelStops.map(fuelStop=>fuelStop.fuelUsage).reduce((prev,next)=>prev+next),
        distance: fuelStops.map(fuelStop=>fuelStop.distance).reduce((prev,next)=>prev+next),
        fuelCost: fuelStops.map(fuelStop=>fuelStop.gasCost).reduce((prev,next)=>prev+next),
    };
    
    const detailsId = (isReturnTrip) ? 'trip-disembarkment-details' : 'trip-embarkment-details';
    const tripDetails = document.getElementById(detailsId);
    tripDetails.innerHTML = `
        <h2>${(isReturnTrip)?'Embarkment Details':'Disembarkment Details'}</h2>
        <h3>Fuel Stops:</h3>
        <ol>
            ${fuelStops.map(fs=>{
                return `
                    <li>
                        <h4>Distance: ${utility.metersToMiles(fs.distance).toFixed(2)} mi. - Fuel Usage: ${fs.fuelUsage.toFixed(2)}</h4>
                        <h4>Fuel Price: <strong>$${fs.gasPrice.toFixed(2)}</strong>(${fs.county} County, ${fs.state})</h4>
                        <h4>Fuel Cost: <strong>$${fs.gasCost.toFixed(2)}</strong></h4>
                    </li>
                `;
            }).join('')}
        </ol>
        <h3>Total Distance: <strong>${utility.metersToMiles(totals.distance).toFixed(2)} mi.</strong></h3>
        <h3>Total Fuel Usage: <strong>${totals.fuelUsage.toFixed(2)} gal.</strong></h3>
        <h3>Total Fuel Cost: <strong>$${totals.fuelCost.toFixed(2)}</strong></h3>
        <h3>Total Trip Duration: <strong>${utility.secondsToDhms(tripDuration)}</strong></h3>
    `;
    const results = {startAddress: legs[0].startAddress,
        endAddress: legs[legs.length - 1].endAddress,
        mileageBefore: odometerReading,
        embarkmentDate: departureDT,
        //mileageAfter: odometerReading + metersToMiles(tripDistance),
        arrivalDate: arrivalDate,
        distance: utility.metersToMiles(tripDistance),
        estimatedGasCost: totals.fuelCost,
        estimatedFuelUsage: totals.fuelUsage,
        vehicleId: vehicle.id,
        disembarkmDate: disembarkmentDT,
        returnDate: null};

    let totalResults = Object.create(results);

    if (isRoundTrip){
        let nextRequest = Object.create(request);
        nextRequest.origin = request.destination;
        nextRequest.destination = request.origin;
        console.log('Before getring round trip results nextReq', nextRequest)
        const nextResults = await mapTrip(vehicle, nextRequest, map, disembarkmentDT, results.mileageAfter ,vehicle.gaugeReading, false, null, true);
        console.log(nextResults);

        totalResults.estimatedGasCost += nextResults.estimatedGasCost;
        totalResults.estimatedFuelUsage += nextResults.estimatedFuelUsage;
        totalResults.returnDate = nextResults.arrivalDate;
        totalResults.distance += nextResults.distance;
    }
    totalResults.arrivalDate = new Date(totalResults.arrivalDate).toISOString();
    totalResults.embarkmentDate = new Date(totalResults.embarkmentDate).toISOString();
    totalResults.returnDate = (totalResults.returnDate) ? new Date(totalResults.returnDate).toISOString() : null;
    totalResults.disembarkmDate = (totalResults.disembarkmentDate) ? new Date(totalResults.disembarkmentDate).toISOString() : null;
    console.log("POST RESULTS", totalResults);

    if (isReturnTrip == false){
        const tripTotalsDetails = document.getElementById('trip-totals-details');
        console.log("PRINTING TRIP TOTALS",tripTotalsDetails);
        tripTotalsDetails.innerHTML = `<h2>Round Trip Totals</h2>
        <h3>Total Distance: <strong>${totalResults.distance.toFixed(2)} mi.</strong></h3>
        <h3>Total Fuel Usage: <strong>${totalResults.estimatedFuelUsage.toFixed(2)} gal.</strong></h3>
        <h3>Total Fuel Cost: <strong>$${totalResults.estimatedGasCost.toFixed(2)}</strong></h3>`

        const saveButton = document.getElementById('save-button');
        saveButton.disabled = false;
    
        saveButton.addEventListener('click',function(){
            asyncRequest(TripController, "POST", totalResults);
        });
    }
    else {
        return results;
    }
}


const appDiv = document.getElementById("app");

/* <select id="unit-system">
<option selected disabled>---SELECT UNIT SYSTEM---</option>
<option value="0">Metric</option>
<option value="1">Imperial</option>
</select>
<label for="avoid-highways">Avoid Highways</label><input id="avoid-highways" type="checkbox" />
<label for="avoid-tolls">Avoid Tolls</label><input id="avoid-tolls" type="checkbox" /> */

function view(){
    document.getElementById(appDiv);
    appDiv.innerHTML = `
        <div id="container" style="min-height:100vh; display:flex">
            <google-map id="map"></google-map>
            <div id="sidebar" style="flex-basis: 15rem;flex-grow: 1;padding: 1rem;max-width: 30rem;height: 100%;box-sizing: border-box;overflow: auto;flex-direction: column;">
                <select id="vehicle-select">
                    <option selected disabled>---SELECT VEHICLE---</option>
                </select>
                <label for="departure-dt">Departure Date<label>
                <input type="datetime-local" id="departure-dt" min="${new Date().toISOString()}" />
                <label for="round-trip">Round Trip</label><input id="round-trip" type="checkbox" />
                <input type="datetime-local" id="disembarkment-dt" disabled min="${new Date().toISOString()}" />
                <label for="origin">Origin:</label><input id="origin" />
                <label for="destination">Destination:</label><input id="destination" />
                <label for="odometer-reading">Initial Odometer Reading:<label>
                <input id="odometer-reading" />
                <label for="fuel-gauge-reading">Initial Fuel Gauge Reading:<strong id="fuel-gauge-percentage">100%</strong></label>
                <input id="fuel-gauge-reading" type="range" min="0.0" max="1.0" step="0.1" value="1.0" />
                
                <button id="submit-button">Submit</button>
                <button id="save-button" disabled">Save</button>
                <div id="car-details"></div>
                <div id="trip-embarkment-details"></div>
                <div id="trip-disembarkment-details"></div>
                <div id="trip-totals-details"></div>
            </div>
        </div>
    `;

    init();
}

function init(){
    const origin = document.getElementById("origin");
    const destination = document.getElementById("destination");
    const submitButton = document.getElementById("submit-button");
    const map = document.getElementById("map");
    
    const vehicleSelect = document.getElementById("vehicle-select");
    vehicleSelectInit(vehicleSelect);
    
    const carDetails = document.getElementById('car-details');
    const fuelGaugeReading = document.getElementById('fuel-gauge-reading');
    const fuelGaugePercentage = document.getElementById('fuel-gauge-percentage');

    const departureDT = document.getElementById('departure-dt');

    const roundTrip = document.getElementById('round-trip');
    const disembarkmentDT = document.getElementById('disembarkment-dt');
    
    roundTrip.addEventListener('change', function(){
        if (roundTrip.checked){
            disembarkmentDT.disabled = false;
        }
        else {
            disembarkmentDT.disabled = true;
        }
    });

    let vehicle = null;
    vehicleSelect.addEventListener('change', function(){
        getVehicle(vehicleSelect.value, parseFloat(fuelGaugeReading.value), carDetails)
            .then(v => {
                vehicle=v;
                vehicle.render();
                });
    })

    fuelGaugeReading.addEventListener('change', function(){
        if (vehicle){
            vehicle.gaugeReading = fuelGaugeReading;
        }
        fuelGaugePercentage.innerText = `${fuelGaugeReading.value*100}%`;
    });

    const odometerReading = document.getElementById("odometer-reading");

    submitButton.addEventListener('click', function(){
        let request = {
            origin: origin.value,
            destination: destination.value,
            travelMode: 'DRIVING', //driving
            unitSystem: 1,
            avoidHighways: false,
            avoidTolls: false,
        };

        const roundTripDate = (roundTrip.checked) ? new Date(disembarkmentDT.value) : null;

        mapTrip(vehicle, request, map, new Date(departureDT.value), odometerReading.value, fuelGaugeReading.value, roundTrip.checked, roundTripDate);
    });
}

//populate vehicle select
//create cards for vehicle info
async function vehicleSelectInit(vehicleSelect){
    let ownerId = getSelectedOwnerId();
    let vehicles = await asyncRequest(`${VEHICLECONTROLLER}?ownerId=${ownerId}`);
    let options = {
        attributes: {"data-id": "id", "value": "id"},
        properties: {"text": "yearMakeModel"}
    };
    utility.populateSelect(vehicleSelect,vehicles,options);

}