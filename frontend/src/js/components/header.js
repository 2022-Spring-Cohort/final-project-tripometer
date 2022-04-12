//import appdiv and navigation views
//import constants from "../constants";
import trip from "./trip";
import Owner from "./owner";
import vehicle from "./vehicle";
import login from "./login";

export default {
    setup
}

const appDiv = document.getElementById('app');

const element = document.getElementById('header');
const html = `
    <nav>
        <ul>
            <li>
                <button id="login-button">Login</button>
                <button id="new-trip-button">New Trip</button>
                <button id="my-profile-button">My Profile</button>
                <button id="Add-Vehicle-button">Add New Vehicle</button>
            </li>
        </ul>
    </nav>
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

    NewVehicleButton.addEventListener('click', function(){
        console.log("works");
        vehicle.AddVehicle();
    })

    LoginButton.addEventListener('click', function(){
        console.log("works");
        login.LoginVeiw();
    })

}


