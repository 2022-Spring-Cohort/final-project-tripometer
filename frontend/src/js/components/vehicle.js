import { VehicleController } from "../constants";
import Utility from "../utility";
import AllRequest from "../allRequest";



export default {
    GetVehicle,
    AddVehicle,
    GetVehicleList,
    vehiclesDetails
}

const appDiv = document.getElementById("app");



function GetVehicleList(ownerId) {
    //console.log("Getvehicle() called");
    AllRequest.allRequest(`${VehicleController}?ownerId=${ownerId}`, vehiclesList)
}


function GetVehicle(id) {
    AllRequest.allRequest(VehicleController + id, vehiclesDetails);
}

function DeleteVehicle(id) {
    console.log(VehicleController);
    AllRequest.allRequest(VehicleController + id, vehiclesList, "DELETE");
}




function vehiclesList(NewVehicle) {



    let vehicleView = document.createElement("div"); 
    
    let vehicleButtonDiv = document.createElement("div");
    vehicleButtonDiv.classList.add("addVehicleButtonDiv");

    let addvehicle= document.createElement('button');
    addvehicle.classList.add("addVehicleButton");

    addvehicle.innerHTML="Add Vehicle";
    addvehicle.id= "Add-Vehicle-button";

    vehicleButtonDiv.appendChild(addvehicle);

    vehicleView.appendChild(vehicleButtonDiv);

      
    for (let i = 0; i < NewVehicle.length; i++) {

        let vehicleDiv = document.createElement("div");
        vehicleDiv.classList.add("vehicleView");

        let vehicle = document.createElement("p");
        vehicle.setAttribute("id", i);

        let Delete = document.createElement("button");
        Delete.innerText = "Delete";

        Delete.setAttribute("id",'DeleteVehicleBtn'+i);



        vehicle.innerHTML = NewVehicle[i].year + " " + NewVehicle[i].make + "  " + NewVehicle[i].model; 

        vehicleDiv.appendChild(vehicle);
        vehicleDiv.appendChild(Delete);
        vehicleView.appendChild(vehicleDiv);
    }

    appDiv.innerHTML = vehicleView.innerHTML;



    const NewVehicleButton = document.getElementById('Add-Vehicle-button');

    NewVehicleButton.addEventListener('click', function(){
        console.log("works");
         AddVehicle();       
    });

    
    for (let i = 0; i < NewVehicle.length; i++) {
        let VehicleList = document.getElementById(i);
        let DeleteVehicles = document.getElementById('DeleteVehicleBtn' + i);

        VehicleList.addEventListener('click', function () {
            console.log("vehicleView was click");
            let Vehicleid = i + 1; //This method needs to use cookies 
            GetVehicle(Vehicleid);
        })

        DeleteVehicles.addEventListener('click', function () {
            console.log("Delete was click");
            console.log(NewVehicle[i].id);
            DeleteVehicle(NewVehicle[i].id);
        })
    }


     
}


function vehiclesDetails(NewVehicle) {

    appDiv.innerHTML = `
    <div class="vehiclelist">
    <p>Make: ${NewVehicle.make}</p>
    <p>Model: ${NewVehicle.model}</p>
    <p>Year: ${NewVehicle.year}</p>
    <p>Fuel Efficiency: ${NewVehicle.fuelEfficiency}</p>
    <p>Size of fuel tank: ${NewVehicle.fuelTank} gallons</p>
    
    <button id='UpdateVehicleBtn'>Update Vehicle</button>
    </div>
    `;
    UpdateVehicleButton(NewVehicle.id);
}

function UpdateVehicleButton(id) {
    const UpdateVehicleBtn = document.getElementById('UpdateVehicleBtn');
    UpdateVehicleBtn.addEventListener('click', function () {
        AllRequest.allRequest(VehicleController + id, UpdateVehicleView);
    })
}

function UpdateVehicleView(EditVehicle) {
    appDiv.innerHTML = `
    <div id="add-vehicle-container">
    <div class="add-vehicle-op">
        <h2>Edit Vehicle</h2>
    </div>
    <div class="add-vehicle-op">
        <input type="text" id="Make" value="${EditVehicle.make}" placeholder="${EditVehicle.make}">
    </div>

    <div class="add-vehicle-op">
    <input type="text" id="Model" value="${EditVehicle.model}" placeholder="${EditVehicle.model}">
    </div>
    <div class="add-vehicle-op">
    <input type="text" id="Year" value="${EditVehicle.year}" placeholder="${EditVehicle.year}">
    </div>
    <div class="add-vehicle-op">
    <input type="text" id="FuelEfficiency" value="${EditVehicle.fuelEfficiency}" placeholder="${EditVehicle.fuelEfficiency}">
    </div>
    <div class="add-vehicle-op">
    <input type="text" id="FuelTank" value="${EditVehicle.fuelTank}" placeholder="${EditVehicle.fuelTank}">
    </div>
    <div class="add-vehicle-op">
    <button type="submit" id="saveUpdateVehicleBtn">Update</button> 
    </div>
    </div> 
    `;
    SumbitEditVehicle(EditVehicle);

}

function SumbitEditVehicle(EditVehicle) {
    const saveUpdateVehicleBtn = document.getElementById('saveUpdateVehicleBtn');


    saveUpdateVehicleBtn.addEventListener('click', function () {
        VehicleUserInput(EditVehicle.id, "PUT");
    });
}



function AddVehicle() {
    let MakeOptions = null;
    let ModelOptions = "";


    fetch('https://parseapi.back4app.com/classes/Carmodels_Car_Model_List', {
        headers: {
            'X-Parse-Application-Id': 'iqVulf4rcnwk8v3YC71FGKNkUrY7mzNJosyQzpUA', // This is your app's application id
            'X-Parse-REST-API-Key': 'ugWIeOKk3FQoATqdZaR7Gv4jTsc2tsFzLjDNST5a', // This is your app's REST API key
        }
    })
        .then(response => response.json())
        .then(data => {               // Here you have the data that you need
            console.log(data);
            console.log(data.results);
            console.log(data.results.length);
           
           

            for (let i = 0; i < data.results.length; i++) {
                console.log("makeList");
                console.log(data.results[i].Make);
                ModelOptions += `<option value='${data.results[i].Model}'>${data.results[i].Model}</option>`;
                MakeOptions += `<option value='${data.results[i].Make}'>${data.results[i].Make}</option>`;

            }

            

            appDiv.innerHTML = `
    <div id="add-vehicle-container">
    <div class="add-vehicle-op">
    <h2>Add New Vehicle</h2>
    </div>
    <div class="add-vehicle-op">
    <select class="MakeOptions" id="Make">
    <option selected disabled>--Select Vehicle Make--</option>
    ${MakeOptions}
    </select>
    </div>
    
    <div class="add-vehicle-op">
    <select class="ModelOptions" id="Model">
    <option selected disabled>--Select Vehicle Model--</option>
    ${ModelOptions}
    </select> 
    </div>
    
    <div class="add-vehicle-op">
    <input type="number" id="Year" placeholder="Year" />
    </div>

    <div class="add-vehicle-op">
    <input type="number" id="FuelEfficiency" placeholder="Fuel Efficiency (m.p.g.)" />
    </div>

    <div class="add-vehicle-op">
    <input type="number" id="FuelTank" placeholder="Fuel Capacity (gal.)" />
    </div>
    <div class="add-vehicle-op">
    <button type="submit" id="createNewVehicleBtn">Submit</button>
    </div>
    </div>
`;
            var MakeList = document.getElementById("Make");

            [].slice.call(MakeList.options)
                .map(function (a) {
                    if (this[a.value]) {
                        MakeList.removeChild(a);
                    } else {
                        this[a.value] = 1;
                    }
                }, {});

            EventListener(data);

        }).catch(err => console.log(err));
    //}); // end of the async




} //end of function



function VehicleUserInput(id, method) {


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
        ownerId: 1
    }

    if (method == "PUT") {
        NewVehicle["Id"] = id;
    }

    console.log(NewVehicle);
    AllRequest.allRequest(VehicleController + id, vehiclesDetails, method, NewVehicle);
}

function EventListener(data) {

    console.log("eventListener");


    const SumbmitButton = document.getElementById("createNewVehicleBtn");

    SumbmitButton.addEventListener('click', function () {
        VehicleUserInput("", "POST");
    })

}



