import { ReceiptController } from "../constants";
import { TripController } from "../constants";
import Utility from "../utility";
import AllRequest from "../allRequest";
import Trip from "./trips";


export default{
    DisplayAll,
    GetReceipts,
    AddReceiptView,
    DeleteAReceipt,
    SetupForButtons,
    UpdateReceiptView,
    GetReceipt
    
}

const appDiv = document.getElementById("app");


function GetReceipts(tripId){
AllRequest.allRequest(ReceiptController + tripId, DisplayAll);

}


function DisplayAll(receipts){
   
    return`
    <ul>
        ${receipts.map(receipt=>{
            return `<li>Date and Time: ${receipt.date}</li>
                    <li>City the gas station is located in: ${receipt.gasStation}</li>
                    <li>Gas price by the gallon: $${receipt.pricePerGallon} per gallon</li>
                    <li>Total Cost of the trip: $${receipt.totalCost} dollars</li>
                    <section id="${receipt.id}" class="receipts">
                        <button class="DeleteReceipt"> Delete Receipt</button>
                        <button class="EditReceipt">Edit Receipt</button>
                    </section>
                ------------------------------------------------------------------------ 
                ------------------------------------------------------------------------ 
            `;      
        }).join('')}
    </ul>
    `
   

 }

function SetupForButtons(receiptid){
    let receipts = document.getElementsByClassName("receipts");
    
    Array.prototype.forEach.call(receipts,function(r){
        console.log(r);
        let id = r.id;
        let DeleteReceipt = r.getElementsByClassName("DeleteReceipt")[0];
        let EditReceipt = r.getElementsByClassName("EditReceipt")[0];
    
        DeleteReceipt.addEventListener('click', function(){
            console.log(r);
            DeleteAReceipt(id);

        });
        EditReceipt.addEventListener('click', function(){
            console.log("edit click");
            console.log(receiptid[receiptid.length-1]);
            UpdateReceiptView(receiptid[receiptid.length-1])
        });

});
 }


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
            console.log()
            AllRequest.allRequest(ReceiptController,ReceiptView,"POST",newReceipt);
        }else{
            //error View
        }
  
    });
}

function GetReceipt(id){
    
    AllRequest.allRequest(ReceiptController+id,SetupForButtons )
}

function ReceiptView(receipt){
    console.log(receipt);
    appDiv.innerHTML = `
        <p>Date and Time: ${receipt.date}</p>
        <p>City the gas station is located in: ${receipt.gasStation}</p>
        <p>Gas price by the gallon: $${receipt.pricePerGallon} per gallon</p>
        <p>Total Cost of the trip: $${receipt.totalCost} dollars</p>
    
        
    `;

}

function DeleteAReceipt(id){
    console.log(id);
    AllRequest.allRequest(ReceiptController+id,Trip.TripView,"DELETE");

}



function UpdateReceiptView(id){
    console.log("h")
    console.log(id);
    console.log(id.pricePerGallon);
    appDiv.innerHTML = `
    <h2>Edit Receipt</h2>

    <label for="PricePerGallon">Price of gas per gallon</label>
    <input type="text" id="PricePerGallon" value="${id.pricePerGallon}">

    <label for="TotalCost">Total cost of trip</label>
    <input type="text" id="TotalCost" value="${id.totalCost}">

    <label for="GasStation">Gas Station</label>
    <input type="text" id="GasStation" value="${id.gasStation}">

    <button type="submit" id="saveUpdateReceiptbtn">Update</button>   
    `;
    EditAReceipt(id);
}

 function EditAReceipt (newReceipt){
const saveUpdateBtn = document.getElementById('saveUpdateReceiptbtn');

  console.log("ffffff");

  saveUpdateBtn.addEventListener('click',function(){
         ReceiptUserInput(newReceipt.id,"PUT");
   });
 }


function ReceiptUserInput(id, method) {
  

        let PricePerGallon = document.getElementById('PricePerGallon').value;
        let TotalCost = document.getElementById('TotalCost').value;
        let GasStation = document.getElementById('GasStation').value;
       

        let GetReceipts = {
            PricePerGallon: PricePerGallon,
            TotalCost :TotalCost,
            GasStation: GasStation,
        
            ownerId: 1
        }

        if (method == "PUT") {
            GetReceipts["Id"] = id;
        }

        console.log(GetReceipts);
        AllRequest.allRequest(ReceiptController+id, ReceiptView,method, GetReceipts);
}



