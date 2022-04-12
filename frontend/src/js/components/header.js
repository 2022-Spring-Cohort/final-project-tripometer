//import appdiv and navigation views
//import constants from "../constants";
import trip from "./trip";
import Owner from "./owner";
import { allRequest, asyncRequest } from "../allRequest";
import { OwnerController } from "../constants";
import utility from "../utility";
import vehicle from "./vehicle";
import receipt from "./receipt";
import Time from "./dataTime";


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
            <li>
                <button id="my-profile-button">My Profile</button>
                <button id="Add-Vehicle-button">Add New Vehicle</button>


               

            </li>
            <li>
                <select id="owner-select">
                    <option selected disabled>---SELECT OWNER---</option>
                </select>
            </li>
        </ul>
    </nav>
`;

function setup(){
    element.innerHTML = html;
    const newTripButton = document.getElementById('new-trip-button');
    const myprofileButton = document.getElementById('my-profile-button');
    const NewVehicleButton = document.getElementById('Add-Vehicle-button');


    //setup header navigation event listeners
    newTripButton.addEventListener('click', function(){
        trip.view();
    });

    myprofileButton.addEventListener('click', function(){
        //ToDo: Link an user id to get the specific profile
        let id = Owner.GetId();
        Owner.GetProfile(id);

    });


    const ownerSelect = document.getElementById('owner-select');
    populateOwnerSelect(ownerSelect);



    NewVehicleButton.addEventListener('click', function(){
        console.log("works");
        vehicle.AddVehicle();
        vehicle.SubmitVehicle();
        
    })
}





//---TEMP---//
//use this until we get proper log-in functions

async function populateOwnerSelect(ownerSelect){
    let owners = await asyncRequest(OwnerController);
    let options = {
        attributes: {"data-id": "id", "value": "id"},
        properties: {"text":"fullName"},
    };
    utility.populateSelect(ownerSelect,owners,options);
}

export function getSelectedOwnerId(){
    const ownerSelect = document.getElementById('owner-select');
    return ownerSelect.value;
}
