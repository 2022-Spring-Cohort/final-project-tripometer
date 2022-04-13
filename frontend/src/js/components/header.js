//import appdiv and navigation views
//import constants from "../constants";
import trip from "./trip";
import Owner from "./owner";
import { allRequest, asyncRequest } from "../allRequest";
import { OwnerController } from "../constants";
import utility from "../utility";
import vehicle from "./vehicle";

import receipt from "./receipt";
import Aboutus from "./Aboutus";
import main from "../main";


import login from "./login";
import cookie from "./cookie";



export default {
    setup
}

const appDiv = document.getElementById('app');

const element = document.getElementById('header');
const html = `

    <h1 class="logo">Tripometer</h1>
    
    
    <section class="nav">
        
            <p id="login-button">Login</p>
            <p id="new-trip-button">New Trip</p>
            <p id="my-profile-button">My Profile</p>
            <p id="Aboutus">About Us</p>
            <p id="Home">Home</p>
    </section>
    
    
`;


function setup(){
    element.innerHTML = html;
    const newTripButton = document.getElementById('new-trip-button');
    const myprofileButton = document.getElementById('my-profile-button');

   
    const HomeButton = document.getElementById('Home');
    const AboutusButton = document.getElementById('Aboutus');



    const LoginButton = document.getElementById('login-button');

    //setup header navigation event listeners
    newTripButton.addEventListener('click', function(){
        trip.view();
    });

    myprofileButton.addEventListener('click', function(){
        //ToDo: Link an user id to get the specific profile
        let id = Owner.GetId();
        Owner.GetProfile(id);
    });


    AboutusButton.addEventListener('click', function(){
        console.log("works");
        Aboutus.SetupFooter();
   
        
    });

    HomeButton.addEventListener('click', function(){
        console.log("works");
        main.Home();
   
        
    });

    LoginButton.addEventListener('click', function(){
        console.log("works");
        login.LoginVeiw(); 
    })
     
    //will talk about it later not working
    // const NavItems = document.getElementsByClassName('nav')[0];
    // const Items = NavItems.getElementsByTagName('p');
    // console.log(NavItems);
    // for( var i=0; i<Items.length; i++){
    //         Items[i].addEventListener('mouseover', function(){
    //         Items[i].style.borderBottom = '2px solid black';
    //     }); 
    // }


}


//---TEMP---//
//use this until we get proper log-in functions

async function populateOwnerSelect(ownerSelect){
    let owners = await asyncRequest(OwnerController);
    let options = {
        attributes: {"data-id": "id", "value": "id"},
        properties: {"text":"fullName"},
    };
    utility.populateSelect(ownerSelect,owners,options);
}

export function getSelectedOwnerId(){
    const ownerSelect = document.getElementById('owner-select');
    return ownerSelect.value;
}
