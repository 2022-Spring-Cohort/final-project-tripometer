import { ReceiptController } from "../constants";
import { TripController } from "../constants";
import Utility from "../utility";
import AllRequest from "../allRequest";


export default{
    DisplayAll,
    GetReceipts,
    AddReceiptView


}

const appDiv = document.getElementById("app");

function GetReceipts(tripId){
AllRequest.allRequest(ReceiptController + tripId, DisplayAll);

}


function DisplayAll(receipts){
    if(receipts == null){
        receipts = [];
    }
    return`
    <ul>
        ${receipts.map(receipt=>{
            return `<li>Date and Time: ${receipt.date}</li>
                    <li>City the gas station is located in: ${receipt.gasStation}</li>
                    <li>Gas price by the gallon: $${receipt.pricePerGallon} per gallon</li>
                    <li>Total Cost of the trip: $${receipt.totalCost} dollars</li>
                ------------------------------------------------------------------------  
            `;      
        }).join('')}
    </ul>
    `
 }

// function DisplayAll(receipts){
//     appDiv.innerHTML = `
//     ${receipts.map(receipt=>{
//         return `<p>Date and Time: ${receipt.date}</p>
//                 <p>City the gas station is located in: ${receipt.gasStation}</p>
//                 <p>Gas price by the gallon: $${receipt.pricePerGallon} per gallon</p>
//                 <p>Total Cost of the trip: $${receipt.totalCost} dollars</p>
//             ------------------------------------------------------------------------  
//         `;      
//     }).join('')}

//     `
//  }


 function AddReceiptView(trips){
    appDiv.innerHTML = `
        <label for="PricePerGallon">PricePerGallon</label>
        <input type="text" id="PricePerGallon">
        <label for="TotalCost">TotalCost</label>
        <input type="text" id="TotalCost">
        <label for="GasStation">GasStation</label>
        <input type="text" id="GasStation">

        <label for="Trip">Trip</label>
        <select id="tripId">
            ${trips.map(t=>{
                return `
                    <option value="${t.id}">From ${t.startAddress} To ${t.endAddress}</option>
                `
            }).join('')}
            <option selected disabled>Please select a trip</option>
        </select>


        <button type="submit" id="createNewReceiptBtn">Save</button>
    `;


    SetupForSubmitReceipt();
 }

function SetupForSubmitReceipt(){
    let createNewReceiptBtn = document.getElementById('createNewReceiptBtn');
    createNewReceiptBtn.addEventListener('click',function(){
        let pricePerGallon = document.getElementById('PricePerGallon').value;
        let totalCost = document.getElementById('TotalCost').value;
        let gasStation = document.getElementById('GasStation').value;
        let tripId = document.getElementById('tripId').value;
        if (!Utility.isEmpty(pricePerGallon)&&!Utility.isEmpty(totalCost)&&!Utility.isEmpty(gasStation)&&!Utility.isEmpty(tripId)) {
            let newReceipt = {
                PricePerGallon: pricePerGallon,
                TotalCost: totalCost,
                AdditionalCosts: 0,
                GasStation: Utility.Capitalize(gasStation),
                TripId: tripId
            }
            AllRequest.allRequest(ReceiptController,ReceiptView,"POST",newReceipt);
        }else{
            //error View
        }
  
    });
}

function GetReceipt(id){
    AllRequest.allRequest(ReceiptController_id,ReceiptView);
}

function ReceiptView(receipt){
    appDiv.innerHTML = `
        <p>Date and Time: ${receipt.date}</p>
        <p>City the gas station is located in: ${receipt.gasStation}</p>
        <p>Gas price by the gallon: $${receipt.pricePerGallon} per gallon</p>
        <p>Total Cost of the trip: $${receipt.totalCost} dollars</p>
    
    `;
}