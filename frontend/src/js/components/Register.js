import Utility from "../utility";
import AllRequest from "../allRequest";
import {UsersController} from "../constants";
import cookie from "./cookie"
import header from "./header";
import owner from "./owner";


export default {
    RegisterView

}


const appDiv = document.getElementById("app");

function RegisterView(){
    appDiv.innerHTML = `       
        <h2>Register</h2>    
             
        <div>
       
        <ul><label for="Username">Username</label></ul>
        <ul><input type="text" id="Username"></ul>

        <ul><label for="Password">Password</label></ul>
        <ul><input type="text" id="Password"></ul>
        
        <ul><button id="SubmitBtn">Submit</button></ul>
        
        </div>
    `;
    RegisterSubmit();
}

function RegisterSubmit(){

 const SubmitBtn = document.getElementById("SubmitBtn");
 SubmitBtn.addEventListener('click',function(){

    console.log("log click");
    let Username = document.getElementById("Username").value;
    let Password = document.getElementById("Password").value;

    let User = {
        Username: Username,
        Password: Password
    }

    
   
   AllRequest.allRequest(UsersController + "register", postRegister ,"POST",User );

 });

}

function postRegister(User){
    console.log(User);
    owner.AddOwnerView(User);
    header.setup();
}
