import {VehicleController} from "../constants";
import Utility from "../utility";
import AllRequest from "../allRequest";
import owner from "./owner";
// import AllRequest from "../allRequest";


export default{
    AddVehicle,
    SumbitVehicle,
    vehicleView
}

const appDiv = document.getElementById("app");


function GetVehicle(){

}

function vehicleView(NewVehicle){
console.log(NewVehicle);

    appDiv.innerHTML = `
    <h2>${NewVehicle}</h2> 

`;

}


function AddVehicle(){
    appDiv.innerHTML = `
    <h2>Add Vehicle</h2>

    <label for="Make ">Make of vehicle</label>
    <input type="text" id="Make"> 

    <label for="Model">Model of vehicle</label>
    <input type="text" id="Model">

    <label for="Year">Enter the Year of vehicle</label>
    <input type="text" id="Year">

    <label for="FuelEfficiency">Enter the mpg of vehicle </label>
    <input type="number" id="FuelEfficiency">

    <button type="submit" id="createNewVehicleBtn">Submit</button>
`;
}



function SumbitVehicle (){
    const SumbmitButton = document.getElementById("createNewVehicleBtn");

    SumbmitButton.addEventListener('click', function(){
    let Make = document.getElementById('Make').value;
    let Model = document.getElementById('Model').value;
    let Year = document.getElementById('Year').value;
    let FuelEfficiency = document.getElementById('FuelEfficiency').value;

    let NewVehicle = {
        Make: Make,
        Model: Model,
        Year: Year,
        FuelEfficiency: FuelEfficiency,
        ownerId: 1
    }

    console.log(NewVehicle);
    AllRequest.allRequest(VehicleController,vehicleView,"POST",NewVehicle);
    })


}

