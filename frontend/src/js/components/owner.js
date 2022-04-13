import {OwnerController} from "../constants";
import Utility from "../utility";
import AllRequest from "../allRequest";
import Trip from "./trips";
import Vehicle from "./vehicle";
import cookie from "./cookie";


export default{
    GetProfile,
    AddOwnerView,
    SetupForSubmitProfile,
    GetId
}


const appDiv = document.getElementById("app");


function GetProfile(id){
    AllRequest.allRequest(OwnerController+id,ProfileView);
    // addEventListenerForVirtualLists();
    // UpdateProfile(id);
}

function ProfileView(owner){
    console.log(owner);
    appDiv.innerHTML = `       
        <h2>${owner.fullName}</h2>    
        
        <p id="myVehicles">My Vehicles</p>
        <p id="myTrips">My trips</p>
        
        <button id="updateProfileBtn">Update Profile</button>
    `;
    addEventListenerForVirtualLists();
    UpdateProfile(owner.id);
}

function addEventListenerForVirtualLists(){
    const myVehicles = document.getElementById('myVehicles');
    const myTrips = document.getElementById('myTrips');
    let ownerId = GetId();
    myVehicles.addEventListener('click',function(){
        //fetch vehicle list
        Vehicle.GetVehicleList(ownerId);
    });
    myTrips.addEventListener('click',function(){
         //fetch trips list
         Trip.GetTrips(ownerId);
         
    });
}



function AddOwnerView(){
    appDiv.innerHTML = `
        <h2>Create Your Profile</h2>

        <label for="firstName">First Name</label>
        <input type="text" id="firstName">
        <label for="lastName">Last Name</label>
        <input type="text" id="lastName">

        <button type="submit" id="createNewProfileBtn">Save</button>
    `;
}

function ProcessUserInput(id,method){
    let firstName = document.getElementById('firstName').value;
    let lastName = document.getElementById('lastName').value;
    let UserId = document.getElementById('userId').value;
    if (!Utility.isEmpty(firstName) && !Utility.isEmpty(lastName)) {
        firstName = Utility.Capitalize(firstName.trim());
        lastName = Utility.Capitalize(lastName.trim());   
        
        let newOwner = {
            FirstName: firstName,
            LastName: lastName,
            UserId: UserId
            // FullName: firstName + " " + lastName
        }
        if (method == "PUT") {
            newOwner["Id"] = id;
        }
        console.log(newOwner);
        AllRequest.allRequest(OwnerController+id,ProfileView,method,newOwner);
    }else{
        //redirect to a view with error messages
    }
}

function SetupForSubmitProfile(){
    const submitBtn = document.getElementById('createNewProfileBtn');
    submitBtn.addEventListener('click',function(){
        ProcessUserInput("","POST");
        
    });
}

function UpdateProfile(id){
    const updateProfileBtn = document.getElementById('updateProfileBtn');
    updateProfileBtn.addEventListener('click',function(){
        AllRequest.allRequest(OwnerController+id,UpdateProfileView);
        
    });

}

function UpdateProfileView(owner){
    appDiv.innerHTML = `
        <h2>Edit Your Profile</h2>

        <input type="hidden" id="userId" value="${GetId()}">

        <label for="firstName">First Name</label>
        <input type="text" id="firstName" value="${owner.firstName}" placeholder="${owner.firstName}">
        <label for="lastName">Last Name</label>
        <input type="text" id="lastName" value="${owner.lastName}" placeholder="${owner.lastName}">

        <button type="submit" id="saveUpdateProfileBtn">Save</button>   
    `;
    SetupForUpdateProfile(owner);
}

function SetupForUpdateProfile(owner){
    const saveUpdateProfileBtn = document.getElementById('saveUpdateProfileBtn');
    saveUpdateProfileBtn.addEventListener('click',function(){
        ProcessUserInput(owner.id,"PUT");
    });
}


//Todo: Get Id from coockies later
function GetId(){
    return cookie.getCookie("UserId");
}



