import { TripController } from "../constants";
import { OwnerController } from "../constants";
import Utility from "../utility";
import AllRequest from "../allRequest";
import Receipt from "./receipt";
import Owner from "./owner";
import DateTime from "./dataTime";


//Gonna have to combine trip.js and trips.js for better format

export default{
    GetTrips,
    TripView
}

const appDiv = document.getElementById("app");


function GetTrips(ownerId){
    AllRequest.allRequest(TripController + `?ownerId=${ownerId}`, TripsView);
}


function TripsView(trips){
    console.log(trips);
    appDiv.innerHTML = `
        <button id="createNewReceiptBtn">Add a receipt to a trip</button>

        <section>
            ${trips.map(t=>{
                return `
                <ul id="${t.id}" class="trips">                   
                    <li class="trip">From ${t.startAddress} to ${t.endAddress}</li>
                    <li class="trip">${DateTime.FormatDate(t.embarkDate)} ${(t.disembarkDate == null)?" ":" to "+DateTime.FormatDate(t.disembarkDate)}</li>
                    <li>${t.receipts.length} Receipts</li>   
                    <button class="deleteTripBtn">Delete this trip</button> 
                    <hr>  
                </ul>        
                `;
            }).join('')}  
        </section> 
    `;

    SetupForCreatingNewReceipt();
    SetupForViewingTrip();
}

function SetupForCreatingNewReceipt(){
    const createNewReceiptBtn = document.getElementById('createNewReceiptBtn');
    createNewReceiptBtn.addEventListener('click',function(){
        let ownerId = Owner.GetId();
        AllRequest.allRequest(TripController + `?ownerId=${ownerId}`, Receipt.AddReceiptView);
        
    });
}

function SetupForViewingTrip(){
    const trips = document.getElementsByClassName('trips');
    Array.from(trips).forEach(t => {
        let trip = t.getElementsByClassName('trip')[0];
        let deleteTripBtn = t.getElementsByClassName('deleteTripBtn')[0];
        let id = t.id;

        console.log(id);
    
        trip.addEventListener('click',function(){
            GetTrip(id);
        });    
        
        deleteTripBtn.addEventListener('click',function(){
            DeleteTrip(id);
        }); 
    });
}

function GetTrip(id){
    AllRequest.allRequest(TripController+id,TripView)
}

function TripView(trip){
    appDiv.innerHTML = `

        <button id="updateTripBtn">Update Profile</button>


        <p id="">From ${trip.startAddress} to ${trip.endAddress}</p>
        <p>From ${DateTime.FormatDate(trip.embarkDate)} ${(trip.disembarkDate == null)?" ":" to "+DateTime.FormatDate(trip.disembarkDate)}</p>
        <p>Mileage on vehilce before trip ${trip.mileageBefore} miles</p>
        <p>Mileage on vehilce after trip ${trip.mileageAfter} miles</p>
        <p>ETA ${trip.eTA} </p>
        <p>Total miles traveled for the trip ${trip.distance} miles</p>
        <p>Amount of gas money needed to finish trip: $${trip.estimatedGasCost} </p>
        ${Receipt.DisplayAll(trip.receipts)}        
        <hr>  
    `;

    SetupForUpdateTrip(trip);
    // Receipt.SetupForButtons(trip.receipts);
}

function DeleteTrip(id){
    AllRequest.allRequest(TripController+id,TripsView,"DELETE");
}

function SetupForUpdateTrip(trip){
    const updateTripBtn = document.getElementById('updateTripBtn');
    updateTripBtn.addEventListener('click',function(){

        UpdateTripView(trip);
    });
}


function UpdateTripView(trip){
    console.log("updating");
    appDiv.innerHTML = `
        <h2>Edit trip from ${trip.startAddress} to ${trip.endAddress}</h2>

        <label for="embarkDate">Embark Date</label>
        <select id="monthOptions"></select>
        <select id="dateOptions"></select>
        <select id="yearOptions"></select>
        <select id="hourOptions"></select>
        <select id="minOptions"></select>


      
        <label for="disembarkDate">Disembark Date</label>
        <input type="text" id="disembarkDate" value="${(trip.disembarkDate==null||undefined)?'':new Date(trip.embarkDate).getDate()}" placeholder="${(trip.disembarkDate==null||undefined)?'':new Date(trip.embarkDate).getDate()}">

        <label for="startAddress">StartAddress</label>
        <input type="text" id="startAddress" value="${trip.startAddress}" placeholder="${trip.startAddress}">
        <label for="endAddress">EndAddress</label>
        <input type="text" id="endAddress" value="${trip.endAddress}" placeholder="${trip.endAddress}">

        <label for="mileageBefore">MileageBefore</label>
        <input type="text" id="mileageBefore" value="${trip.mileageBefore}" placeholder="${trip.mileageBefore}">
        <label for="mileageAfter">MileageAfter</label>
        <input type="text" id="mileageAfter" value="${trip.mileageAfter}" placeholder="${trip.mileageAfter}">

        <span id="error" hidden>A number is needed here!</span>
        <label for="eTA">ETA</label>
        <input type="text" id="eTA" value="${(trip.eTA==null||undefined)?'':trip.eTA}" placeholder="${(trip.eTA==null||undefined)?'':trip.eTA}">
        <label for="distance">Distance</label>
        <input type="text" id="distance" value="${trip.distance}" placeholder="${trip.distance}">

        <label for="estimatedGasCost">EstimatedGasCost</label>
        <input type="text" id="estimatedGasCost" value="${trip.estimatedGasCost}" placeholder="${trip.estimatedGasCost}">
        <label for="estimatedTotalCost">EstimatedTotalCost</label>
        <input type="text" id="estimatedTotalCost" value="${trip.estimatedTotalCost}" placeholder="${trip.estimatedTotalCost}">






        <input id="vehicle" value="${trip.vehicleId}" hidden>
        

        <button type="submit" id="saveUpdateTripBtn">Save</button>   
    `;
    let year = new Date(trip.embarkDate).getFullYear();
    let month = (new Date(trip.embarkDate).getMonth()+1<10)?`0${new Date(trip.embarkDate).getMonth()+1}`:new Date(trip.embarkDate).getMonth()+1;
    let date = (new Date(trip.embarkDate).getDate()<10)?`0${new Date(trip.embarkDate).getDate()}`:new Date(trip.embarkDate).getDate();
    let hour = (new Date(trip.embarkDate).getHours()<10)?`0${new Date(trip.embarkDate).getHours()}`:new Date(trip.embarkDate).getHours();
    console.log(`controller hour ${hour}`);
    let min = (new Date(trip.embarkDate).getMinutes()<10)?`0${new Date(trip.embarkDate).getMinutes()}`:new Date(trip.embarkDate).getMinutes();
    console.log(`controller min ${min}`);
   
    const monthOptions = document.getElementById('monthOptions');
    const yearOptions = document.getElementById('yearOptions');
    const dateOptions = document.getElementById('dateOptions');
    const hourOptions = document.getElementById('hourOptions');
    const minOptions = document.getElementById('minOptions');
    DateTime.PopulateMonth(monthOptions,month);
    DateTime.PopulateYear(yearOptions,year);
    DateTime.PopulateHour(hourOptions,hour);
    DateTime.PopulateMin(minOptions,min);
    DateTime.PopulateDates(date,year,month,dateOptions);
    
    SetupForDatePopulation();
    SetupForUpdateProfile(trip.id);
}

function SetupForDatePopulation(){
    const monthOptions = document.getElementById('monthOptions');
    const yearOptions = document.getElementById('yearOptions');
    const dateOptions = document.getElementById('dateOptions');
  
    monthOptions.addEventListener('focusout',function(){
        let month = monthOptions.value;
        let year = yearOptions.value;
        DateTime.PopulateDates(100,year,month,dateOptions);
    });
    yearOptions.addEventListener('focusout',function(){
        let month = monthOptions.value;
        let year = yearOptions.value;
        DateTime.PopulateDates(100,year,month,dateOptions);
    });
}

function SetupForUpdateProfile(tripId){
    const saveUpdateTripBtn = document.getElementById('saveUpdateTripBtn');
    saveUpdateTripBtn.addEventListener('click',function(){
        UpdateTrip(tripId);
    });
}

function UpdateTrip(tripId){
    const monthOptions = document.getElementById('monthOptions').value;
    const yearOptions = document.getElementById('yearOptions').value;
    const dateOptions = document.getElementById('dateOptions').value;
    const hourOptions = document.getElementById('hourOptions').value;
    const minOptions = document.getElementById('minOptions').value;
    let embarkDate = `${yearOptions}-${monthOptions}-${dateOptions}T${hourOptions}:${minOptions}:00.0000000`;

    const error = document.getElementById('error');
    // let embarkDate = document.getElementById('embarkDate').value;
    // const disembarkDate = document.getElementById('disembarkDate').value;
    let startAddress = document.getElementById('startAddress').value;
    let endAddress = document.getElementById('endAddress').value;
    let mileageBefore = document.getElementById('mileageBefore').value;
    let mileageAfter = document.getElementById('mileageAfter').value;
    let eTA = document.getElementById('eTA').value;
    let distance = document.getElementById('distance').value;
    let estimatedGasCost = document.getElementById('estimatedGasCost').value;
    let estimatedTotalCost = document.getElementById('estimatedTotalCost').value;
    // let owner = document.getElementById('owner').value; 
    let vehicleId = document.getElementById('vehicle').value;
    //excluded disembarkdate
    let values = [startAddress,endAddress,mileageBefore,mileageAfter,eTA,distance,estimatedGasCost,estimatedTotalCost];
    let undefinedCount = 0;
    for (let i = 0; i < values.length; i++) {
        if(values[i] == null){
            undefinedCount++;
        }  
    }
    if (undefinedCount == 0) {
        let newTrip = {
            EmbarkDate:embarkDate,
            // Disembark:disembark,
            StartAddress:startAddress,
            EndAddress:endAddress,
            MileageBefore:mileageBefore,
            MileageAfter:mileageAfter,
            // ETA:eTA,
            Distance:distance,
            EstimatedGasCost:estimatedGasCost,
            EstimatedTotalCost:estimatedTotalCost,
            VehicleId:vehicleId,
            Id:tripId
        }
        console.log(newTrip);
        AllRequest.allRequest(TripController+tripId,TripView,"PUT",newTrip);
    }else{
        //error view
        // error.hidden = false;
        // AllRequest.allRequest(TripController+tripId,TripView);
    }
}


