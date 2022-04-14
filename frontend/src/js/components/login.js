import Utility from "../utility";
import AllRequest from "../allRequest";
import {UsersController} from "../constants";
import cookie from "./cookie"
import header from "./header";
import Owner from "./owner"


export default {
   
    LoginVeiw
}


const appDiv = document.getElementById("app");

function LoginVeiw(id){
    console.log(UsersController);
    console.log(id);
    appDiv.innerHTML = `       
        <h2>Log in to Tripometer</h2>    
             
        <div>
       
        <ul><label for="Username">Username</label></ul>
        <ul><input type="text" id="Username"></ul>

        <ul><label for="Password">Password</label></ul>
        <ul><input type="Password" id="Password"></ul>
        
        <ul><button id="LoginBtn">Log in</button></ul>
        
        </div>
    `;
    LoginSubmit();
}

function LoginSubmit(){

 const LoginBtn = document.getElementById("LoginBtn");
 LoginBtn.addEventListener('click',function(){
    console.log("log click");
    let Username = document.getElementById("Username").value;
    let Password = document.getElementById("Password").value;

    let User = {
        Username: Username,
        Password: Password
    }

    
   
   AllRequest.allRequest(UsersController + "authenticate",postLogin,"POST",User);
 })

}

function postLogin(user){
console.log(user);
     
//login was sucess
if(!user.hasOwnProperty('message')){
    cookie.setCookie("UserId",user.id,100);
    cookie.setCookie("UserName",user.id,100);
    let id = Owner.GetId();
    Owner.GetProfile(id);

}
//login failed
else{

alert(user.message);

}

}