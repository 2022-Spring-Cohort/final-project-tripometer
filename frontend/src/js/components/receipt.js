import { ReceiptController } from "../constants";
import Utility from "../utility";
import AllRequest from "../allRequest";


export default{
    DisplayAll,
    GetReceipt


}

const appDiv = document.getElementById("app");

function GetReceipt(id){
AllRequest.allRequest(ReceiptController + id, DisplayAll);

}



function DisplayAll(receipts){
    console.log(receipts);
     
    
    
    appDiv.innerHTML = `
    ${receipts.map(receipt=>{
        return `<p>Date and Time: ${receipt.date}</p>
        <p>City the gas station is located in: ${receipt.gasStation}</p>
        <p>Gas price by the gallon: $${receipt.pricePerGallon} per gallon</p>
        <p>Total Cost of the trip: $${receipt.totalCost} dollars</p>
      ------------------------------------------------------------------------
        
        
        `;
        
    }).join('')}


    `
 }


