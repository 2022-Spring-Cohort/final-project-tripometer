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
    Home();
}

const appDiv = document.getElementById("app");

function Home(){
appDiv.innerHTML = `
    <section class="hero-image">
        <div class="hero-text">
            <h2 class="hero-title">Tripometer is the best way to plan family vacations or business trips.</h2>
            <h4 class="pd-lf-50">Our app will let you keep track of your mileage and expenses.</h4>
            <p class="pd-lf-50">View fuel price data for ALL counties along your route.</p>
        </div>
</section>

`;

}

{/*  */}