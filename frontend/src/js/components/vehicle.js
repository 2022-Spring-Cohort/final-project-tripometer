import {VehicleController} from "../constants";
import Utility from "../utility";
import AllRequest from "../allRequest";



export default{
    GetVehicle,
    AddVehicle,
    SumbitVehicle,
    vehicleView,
    GetId
}

const appDiv = document.getElementById("app");


function GetVehicle(id){
    AllRequest.allRequest(VehicleController+id,vehicleView);

}

function vehicleView(NewVehicle){
console.log(NewVehicle);

    appDiv.innerHTML = `
    <p>${NewVehicle.make}</p> 
    <p>${NewVehicle.model}</p>
    <p>${NewVehicle.year}</p>
    <p>${NewVehicle.fuelEfficiency}</p>
    <p>${NewVehicle.fuelTank}</p>
    
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
    <input type="number" id="Year">

    <label for="FuelEfficiency">Enter the mpg of vehicle </label>
    <input type="number" id="FuelEfficiency">

    <label for="FuelTank">Enter the mpg of vehicle </label>
    <input type="number" id="FuelTank">

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
    let FuelTank = document.getElementById('FuelTank').value;

    let NewVehicle = {
        Make: Make,
        Model: Model,
        Year: Year,
        FuelEfficiency: FuelEfficiency,
        FuelTank: FuelTank,
        ownerId: 1,
        Id: 1,

    }

    console.log(NewVehicle);
    AllRequest.allRequest(VehicleController,vehicleView,"POST",NewVehicle);
    })


}
function GetId(){
    return 1;
}