
export default {
    SetupFooter
}

const appDiv = document.getElementById("app");

function SetupFooter() {


    appDiv.innerHTML = `
        <div>

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
        
        <h1>Here is a list of our project members with links to either their respective Linkden or Github profiles </h1>
        
        <section class="Links">
       <ul><a href="https://github.com/BradRWeir" target="_blank">Link to Brad's Github</a> </ul>
       <ul><a href="https://github.com/DenzaleM" target="_blank"> Denzale's Github Link</a> </ul>
       <ul><a href="http://github.com/adia1bug"target="_blank" >Qadriyyah's Github Link </a> </ul>
       <ul><a href="https://www.linkedin.com/in/jessica-yuting-wang/"target="_blank" >Jessica's Linken </a> </ul>
       <ul><a href="https://www.linkedin.com/in/darius-hmmond/" target="_blank">Daruis Linken </a> </ul>
       <ul><a href="https://www.linkedin.com/in/rimma-girsheva" target="_blank">Rimma's Linken</a> </ul>
        </section>

        <h3>Special Thanks</h3>

        <li>Carlos Lopez- Lead Coding Instructor </li>
        <li>Galvin Hensley- Coding Instructor / Exit Ticket Man </li>
        <li>Kevin McDonald- Career Advancement Advisor</li>
        <li>Staff of the WCCI program</li>
                    
        </div>
    `;
}