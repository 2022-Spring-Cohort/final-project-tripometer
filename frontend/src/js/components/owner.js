import {OwnerController} from "../constants";
import Utility from "../utility";
import AllRequest from "../allRequest";


export default{
    GetProfile,
    AddOwnerView,
    SetupForSubmitProfile
}



const appDiv = document.getElementById("app");

function GetProfile(id){
    AllRequest.allRequest(OwnerController+id,ProfileView);
    addEventListenerForVirtualLists();
}

function ProfileView(owner){
    console.log(owner);
    appDiv.innerHTML = `       
        <h2>${owner.fullName}</h2>    
        
        <p id="myVehicles">My Vehicles</p>
        <p id="myTrips">My trips</p>
    `;
}

function addEventListenerForVirtualLists(){
    const myVehicles = document.getElementById('myVehicles');
    const myTrips = document.getElementById('myTrips');
    myVehicles.addEventListener('click',function(){
        //fetch vehicle list
    });
    myTrips.addEventListener('click',function(){
         //fetch trips list
    });

}


function AddOwnerView(){
    appDiv.innerHTML = `
        <h2>Edit Your Profile</h2>

        <label for="firstName">First Name</label>
        <input type="text" id="firstName">
        <label for="lastName">First Name</label>
        <input type="text" id="lastName">

        <button type="submit" id="createNewProfileBtn">Save</button>
    `;
}

function SetupForSubmitProfile(){

    const submitBtn = document.getElementById('createNewProfileBtn');
    submitBtn.addEventListener('click',function(){
        
        let firstName = document.getElementById('firstName').value;
        let lastName = document.getElementById('lastName').value;
        if (!Utility.isEmpty(firstName) && !Utility.isEmpty(lastName)) {
            firstName = Utility.Capitalize(firstName.trim());
            lastName = Utility.Capitalize(lastName.trim());
           
            let newOwner = {
                FirstName: firstName,
                LastName: lastName,
                FullName: firstName + " " + lastName
            }

            console.log(newOwner);
            AllRequest.allRequest(OwnerController,ProfileView,"POST",newOwner);

        }else{
            //redirect to a view with error messages
        }

  
    });
}

