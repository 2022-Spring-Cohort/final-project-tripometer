//import appdiv and navigation views
//import constants from "../constants";
import trip from "./trip";
import Owner from "./owner";
import { allRequest, asyncRequest } from "../allRequest";
import { OwnerController } from "../constants";
import utility from "../utility";
import vehicle from "./vehicle";
import login from "./login";


export default {
    setup
}

const appDiv = document.getElementById('app');

const element = document.getElementById('header');
const html = `
    <nav>
    <h1 class="logo">Tripometer</h1>
        <ul class="nav">
    
            
                <button class="div1" id="login-button">Login</button>
                <button class="div2" id="new-trip-button">New Trip</button>
            
            
                <button class="div3" id="my-profile-button">My Profile</button>
                <button class="div4" id="Add-Vehicle-button">Add New Vehicle</button>
            
            
                <select id="owner-select">
                    <option selected disabled>---SELECT OWNER---</option>
                </select>
            
        </ul>
    </nav>

    <footer class="footer"> 
           <p>&copy;</p>
    </footer>
`;

function setup(){
    element.innerHTML = html;
    const newTripButton = document.getElementById('new-trip-button');
    const myprofileButton = document.getElementById('my-profile-button');
    const NewVehicleButton = document.getElementById('Add-Vehicle-button');
    const LoginButton = document.getElementById('login-button');
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
    })


    LoginButton.addEventListener('click', function(){
        console.log("works");
        login.LoginVeiw();
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
