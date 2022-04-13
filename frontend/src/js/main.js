//--Import Major Components--//
import header from "./components/header";
//import landingPage from "/.components/landingPage";
//import footer from "/.components/footer";

export default{
    setup,
    Home
}

function setup(){
    //call setup for major components
    header.setup();

    //landingPage.setup(); //default appDiv
    //footer.setup();
}

const appDiv = document.getElementById("app");

function Home(){
appDiv.innerHTML = `



<section class ="hero">
<img src="https://selectregistry.com/wp-content/uploads/2019/05/Couple-on-Road-Trip-1800x650.jpg" width="1800" height="600"> 
<div class="hero-text">


<h2>We hope this would help plan driving trips from family vacation to busniess trips</h2>
 <h4>by predicting how many miles would be driven</h4>
 <p> how long it would take and the cost of gas for the trip.</p>
<div>

</section>





`;

}

