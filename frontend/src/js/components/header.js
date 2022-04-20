//import appdiv and navigation views
//import constants from "../constants";
import trip from "./trip";
import Owner from "./owner";
import Aboutus from "./Aboutus";
import main from "../main";
import login from "./login";
import owner from "./owner";
import Register from "./Register";
import SignOut from "./SignOut";





export default {
    setup
}

const appDiv = document.getElementById('app');

const element = document.getElementById('header');

function setup(){
    element.innerHTML = `



    <h1 class="logo">Tripometer</h1>
    
    <section class="nav">
            ${owner.isLoggedIn()
                ? `<p id="Sign-Out-button">Sign Out</p>
                    <p id="new-trip-button">New Trip</p>
                    <p id="my-profile-button">My Profile</p>`
                : `<p id="Register-button">Register</p>
                    <p id="login-button">Login</p>`
            }
            
            <p id="Aboutus">About Us</p>
            <p id="Home">Home</p>

    </section>


`;
    let newTripButton = document.getElementById('new-trip-button');
    let myprofileButton = document.getElementById('my-profile-button');

   
    let HomeButton = document.getElementById('Home');
    let AboutusButton = document.getElementById('Aboutus');

    let RegisterButton = document.getElementById('Register-button');
    let LoginButton = document.getElementById('login-button');

    let SignOutButton = document.getElementById('Sign-Out-button');

    //setup header navigation event listeners


    AboutusButton.addEventListener('click', function(){
        console.log("works");
        Aboutus.SetupFooter();
    });

    HomeButton.addEventListener('click', function(){
        console.log("works");
        main.Home();
    });
    console.log("CHECK LOGGED IN STATE",owner.isLoggedIn());
    console.log("LOGIN BUTTON EL",LoginButton);
    if (!owner.isLoggedIn()){
        console.log("INSIDE IF STATEMENT: FALSE");
            LoginButton.addEventListener('click', function(){
            console.log("works");
            login.LoginVeiw(); 
        });
        RegisterButton.addEventListener('click', function(){
            console.log("works");
            Register.RegisterView();
        });
    }
    else {
        console.log("INSIDE IF STATEMENT: TRUE");
        SignOutButton.addEventListener('click', function(){
            console.log("works");
            let id = Owner.GetId();
            SignOut.SignOut();
            
        });
        newTripButton.addEventListener('click', function(){
            trip.view();
        });
    
        myprofileButton.addEventListener('click', function(){
            //ToDo: Link an user id to get the specific profile
            let id = Owner.GetId();
            Owner.GetProfile(id);
    
        });
    }

}

export function getSelectedOwnerId(){
    const ownerSelect = document.getElementById('owner-select');
    return ownerSelect.value;
}
