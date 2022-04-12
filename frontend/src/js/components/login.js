import Utility from "../utility";
import AllRequest from "../allRequest";

export default {
    LoginVeiw
}

const appDiv = document.getElementById("app");

function LoginVeiw(){
    appDiv.innerHTML = `       
        <h2>Log in to Tripometer</h2>    
             
        <div>
       
        <ul><label for="Username">Username</label></ul>
        <ul><input type="text" id="Username"></ul>

        <ul><label for="Password">Password</label></ul>
        <ul><input type="text" id="Password"></ul>
        
        <ul><button id="LoginBtn">Log in</button></ul>
        
        </div>
    `;

}