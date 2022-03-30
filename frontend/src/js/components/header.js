//import appdiv and navigation views
//import constants from "../constants";
import trip from "./trip";

export default {
    setup
}

const appDiv = document.getElementById('app');

const element = document.getElementById('header');
const html = `
    <nav>
        <ul>
            <li>
                <button id="new-trip-button">New Trip</button>
            </li>
        </ul>
    </nav>
`;

function setup(){
    element.innerHTML = html;
    const newTripButton = document.getElementById('new-trip-button');

    //setup header navigation event listeners
    newTripButton.addEventListener('click', function(){
        trip.view();
    });
}