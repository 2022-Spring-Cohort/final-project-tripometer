//import appdiv and navigation views
//import constants from "../constants";
import trip from "./trip";
import Owner from "./owner";

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
                <button id="my-profile-button">My Profile</button>
            </li>
        </ul>
    </nav>
`;

function setup(){
    element.innerHTML = html;
    const newTripButton = document.getElementById('new-trip-button');
    const myprofileButton = document.getElementById('my-profile-button');


    //setup header navigation event listeners
    newTripButton.addEventListener('click', function(){
        trip.view();
    });

    myprofileButton.addEventListener('click', function(){
        //ToDo: Link an user id to get the specific profile
        let id = Owner.GetId();
        Owner.GetProfile(id);
    });
}