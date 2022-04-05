//import appdiv and navigation views
//import constants from "../constants";
import trip from "./trip";
import Owner from "./owner";
import vehicle from "./vehicle";

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
                <button id="Add-Vehicle-button">Add New Vehicle</button>
                <button id="Veiw-Vehicle-button">My Vehicles</button>
            </li>
        </ul>
    </nav>
`;

function setup(){
    element.innerHTML = html;
    const newTripButton = document.getElementById('new-trip-button');
    const myprofileButton = document.getElementById('my-profile-button');
    const NewVehicleButton = document.getElementById('Add-Vehicle-button');
    const ViewVehicleButton = document.getElementById('Veiw-Vehicle-button');

    //setup header navigation event listeners
    newTripButton.addEventListener('click', function(){
        trip.view();
    });

    myprofileButton.addEventListener('click', function(){
        //ToDo: Link an user id to get the specific profile
        let id = Owner.GetId();
        Owner.GetProfile(id);
    });

    NewVehicleButton.addEventListener('click', function(){
        console.log("works");
        vehicle.AddVehicle();
        vehicle.SumbitVehicle();
        
    })
    ViewVehicleButton.addEventListener('click', function(){
         console.log("works");
         let id = vehicle.GetId();
         vehicle.GetVehicle(id);
    })

}