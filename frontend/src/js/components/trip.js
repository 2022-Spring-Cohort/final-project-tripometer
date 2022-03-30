import { GoogleMap } from "./google-map";

export default{
    view,
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