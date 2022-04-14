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
          
    <section class="Input">    
            <div class="Login">
                <h2>Log in to Tripometer</h2>  
            </div>
            <div id="loginpage">
                <lable class="Username logininfo" for="Username">Username</lable>
                <input type="text" id="Username">

                <label class="Password logininfo" for="Password">Password</label>
                <input type="text" id="Password">
            </div>
            
            <button id="LoginBtn">Log in</button>

        
    </section>
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