import { TripController } from "../constants";
import { OwnerController } from "../constants";
import Utility from "../utility";
import AllRequest from "../allRequest";
import Receipt from "./receipt";
import Owner from "./owner";


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
                    <li class="trip">From ${t.embarkDate} to ${(t.disembarkDate == null)?"unfinished":t.disembarkDate}</li>
                    <li>${t.receipts.length} Receipts</li>   
                    <button class="deleteTripBtn">Delete this trip</button> 
                    <hr>  
                </ul>        
                `;
            }).join('')}  
        </section> 
    `;
    // SetupForViewingReceipts();
    SetupForCreatingNewReceipt();
    SetupForViewingTrip();
}
// function SetupForViewingReceipts(){
//     let receipts = document.getElementsByClassName('receipts');
//     for (let index = 0; index < receipts.length; index++) {
//         receipts[index].addEventListener('click',function(){
//             //Get all receipts
//             Receipt.GetReceipts(receipts[index].id);
//         });      
//     }
// }

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
        <p>MileageBefore ${trip.mileageBefore}</p>
        <p>MileageAfter ${trip.mileageAfter} </p>
        <p>ETA ${trip.eTA} </p>
        <p>Distance ${trip.distance} </p>
        <p>EstimatedGasCost ${trip.estimatedGasCost} </p>
        ${Receipt.DisplayAll(trip.receipts)}        
        <hr>  
    `;

    
    Receipt.SetupForButtons(trip.receipts);

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
    console.log("debugging");
    console.log(trip);
    appDiv.innerHTML = `
        <h2>Edit trip from ${trip.startAddress} to ${trip.endAddress}</h2>

        <label for="embarkDate">Embark Date</label>
        <input type="text" id="embarkDate" value="${trip.embarkDate}" placeholder="${trip.embarkDate}">
        <label for="disembarkDate">Disembark Date</label>
        <input type="text" id="disembarkDate" value="${(trip.disembarkDate==null||undefined)?'':trip.eTA}" placeholder="${(trip.disembarkDate==null||undefined)?'':trip.eTA}">

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
        <input id="owner" value="${trip.ownerId}" hidden>

        <button type="submit" id="saveUpdateTripBtn">Save</button>   
    `;
    
    SetupForUpdateProfile(trip.id);
}

function SetupForUpdateProfile(tripId){
    const saveUpdateTripBtn = document.getElementById('saveUpdateTripBtn');
    saveUpdateTripBtn.addEventListener('click',function(){
        UpdateTrip(tripId);
    });
}

function UpdateTrip(tripId){
    const error = document.getElementById('error');
    let embarkDate = document.getElementById('embarkDate').value;
    // const disembarkDate = document.getElementById('disembarkDate').value;
    let startAddress = document.getElementById('startAddress').value;
    let endAddress = document.getElementById('endAddress').value;
    let mileageBefore = document.getElementById('mileageBefore').value;
    let mileageAfter = document.getElementById('mileageAfter').value;
    let eTA = document.getElementById('eTA').value;
    let distance = document.getElementById('distance').value;
    let estimatedGasCost = document.getElementById('estimatedGasCost').value;
    let estimatedTotalCost = document.getElementById('estimatedTotalCost').value;
    let owner = document.getElementById('owner').value; 
    let vehicle = document.getElementById('vehicle').value;
    //excluded disembarkdate
    let values = [embarkDate,startAddress,endAddress,mileageBefore,mileageAfter,eTA,distance,estimatedGasCost,estimatedTotalCost];
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
            OwnerId:owner,
            VehicleId:vehicle,
            Id:tripId
        }
        // console.log(newTrip);
        AllRequest.allRequest(TripController+tripId,TripView,"PUT",newTrip);
    }else{
        //error view
        // error.hidden = false;
        // AllRequest.allRequest(TripController+tripId,TripView);
    }
}