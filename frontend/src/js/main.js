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
<h1>Class of 2022 C# Cohort presents the "Trip-o-meter"</h1>

<h2>Inspiration for our project</h2>

<p> Over the years gas prices have risen to unseen highs which affect where we go, how often, and what we are able to experience during the adventure</p>

<p>The idea of our project was to be able to plan a trip from one destination to another returning an estimate of..</p>

<li>-Where and when this trip took place</li>
<li>-How much gas would be needed</li>
<li>-The total cost of the gas needed for the trip</li>
<li>-How many miles were driven during the trip</li>
<li>-How many stops to refill at gas stations would be needed and where they are</li>
<li>-And finally to record and print the details of the trip</li>

<p>The data for the trip is then stored and recorded in the form of receipts for later use. While also keeping track of the trips taken, where the driver went and what type of car was driven.</p>

<p>We hope this would help plan driving trips from family vacation to busniess trips by predicting how many miles would be driven, how long it would take and the cost of gas for the trip. </p>




<h3>Special Thanks</h3>

<li>Carlos Lopez- Lead Coding Instructor </li>
<li>Galvin Hensley- Coding Instructor / Exit Ticket Man </li>
<li>Kevin McDonald- Career Advancement Advisor</li>
<li>Staff of the WCCI program</li>

`;

}

