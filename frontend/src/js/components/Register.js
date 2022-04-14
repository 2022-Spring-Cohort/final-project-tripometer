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
        <section class="Input">      
        <div class="Login">
            <h2>Register as a New User</h2>  
        </div>
        <div class="text-danger" id="ErrorMessage"></div>
        <div id="loginpage">
            
            <lable class="Username logininfo" for="Username">Username</lable>
            <input type="text" id="Username">

            <label class="Password logininfo" for="Password">Password</label>
            <input type="password" id="Password">
        </div>

        <button id="SubmitBtn">Register</button>

        </section>
    `;
    RegisterSubmit();
}

function RegisterSubmit(){

 const SubmitBtn = document.getElementById("SubmitBtn");
 SubmitBtn.addEventListener('click',function(){

    console.log("log register");
    let Username = document.getElementById("Username").value;
    let Password = document.getElementById("Password").value;

    let User = {
        Username: Username,
        Password: Password
    }

    if(Username == "" || Password == ""){
        document.getElementById("ErrorMessage").innerText = "Invalid entries.";
    }else{
        AllRequest.allRequest(UsersController + "register", postRegister ,"POST",User );
    }
   
   

 });

}

function postRegister(User){

    if(!User.hasOwnProperty('message')){
        console.log(User);
        owner.AddOwnerView(User);
        header.setup();
    }
    //login failed
    else{
    
        document.getElementById("ErrorMessage").innerText = "That username is already taken. Please try a different username.";
    
    }

    
}
