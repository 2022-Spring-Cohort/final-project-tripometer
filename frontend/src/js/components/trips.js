import { TripController } from "../constants";
import Utility from "../utility";
import AllRequest from "../allRequest";
import Receipt from "./receipt";
import Owner from "./owner";


//Gonna have to combine trip.js and trips.js for better format

export default{
    GetTrips
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
                    <li class="trip">From ${t.embarkDate} to ${(t.disembarkDate == null)?"Future":t.disembarkDate}</li>
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
    let createNewReceiptBtn = document.getElementById('createNewReceiptBtn');
    createNewReceiptBtn.addEventListener('click',function(){
        let ownerId = Owner.GetId();
        AllRequest.allRequest(TripController + `?ownerId=${ownerId}`, Receipt.AddReceiptView);
        
    });
}

function SetupForViewingTrip(){
    let trips = document.getElementsByClassName('trips');
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
    SetupForUpdateTrip(trip);
}

function DeleteTrip(id){
    AllRequest.allRequest(TripController+id,TripsView,"DELETE");
}

function SetupForUpdateTrip(trip){
    let updateTripBtn = document.getElementById('updateTripBtn');
    updateTripBtn.addEventListener('click',function(){
        UpdateTripView(trip);
    });
}

function UpdateTripView(trip){
    appDiv.innerHTML = `
        <h2>Edit Your Trip</h2>

        <label for="embarkDate">Embark Date</label>
        <input type="text" id="embarkDate" value="${trip.embarkDate}" placeholder="${trip.embarkDate}">
        <label for="disembarkDate">Disembark Date</label>
        <input type="text" id="disembarkDate" value="${trip.disembarkDate}" placeholder="${trip.disembarkDate}">

        <label for="StartAddress">StartAddress</label>
        <input type="text" id="StartAddress" value="${trip.StartAddress}" placeholder="${trip.StartAddress}">
        <label for="EndAddress">EndAddress</label>
        <input type="text" id="EndAddress" value="${trip.EndAddress}" placeholder="${trip.EndAddress}">

        <label for="MileageBefore">MileageBefore</label>
        <input type="text" id="MileageBefore" value="${trip.MileageBefore}" placeholder="${trip.MileageBefore}">
        <label for="MileageAfter">MileageAfter</label>
        <input type="text" id="MileageAfter" value="${trip.MileageAfter}" placeholder="${trip.MileageAfter}">

        <label for="MileageBefore">MileageBefore</label>
        <input type="text" id="MileageBefore" value="${trip.MileageBefore}" placeholder="${trip.MileageBefore}">
        <label for="MileageAfter">MileageAfter</label>
        <input type="text" id="MileageAfter" value="${trip.MileageAfter}" placeholder="${trip.MileageAfter}">

        <button type="submit" id="saveUpdateProfileBtn">Save</button>   
    `;
    SetupForUpdateProfile(owner);
}