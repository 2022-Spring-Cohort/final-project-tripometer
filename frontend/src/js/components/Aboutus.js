
export default {
    SetupFooter
}

const appDiv = document.getElementById("app");

function SetupFooter() {


    appDiv.innerHTML = `
        <div class="AboutUs">
            <div class="TopPart">
                <h2>Inspiration for our project</h2>

                <p>Recently gas prices have risen to unseen highs which can affect our travel experience.</p>

                <p>With our app you can easily plan: </p>
                <ul>
                    <li>-Where and when this trip takes place.</li>
                    <li>-How much gas would be needed.</li>
                    <li>-The total cost of the gas needed for the trip.</li>
                    <li>-How many miles will be driven.</li>
                    <li>-And record the details including receipts of the trip.</li>
                    <li>-And record of vehicle condition.</li>
                </ul>
            </div>    
            <div class="BottomLeft">    
                
                <h3>Connect with us:</h3>
                <section class="Links">
                    <a href="https://github.com/BradRWeir" target="_blank">Brad's Github</a> 
                    <a href="https://github.com/DenzaleM" target="_blank"> Denzale's Github</a> 
                    <a href="http://github.com/adia1bug"target="_blank" >Qadriyyah's Github</a> 
                    <a href="https://www.linkedin.com/in/jessica-yuting-wang/"target="_blank" >Jessica's LinkedIn</a> 
                    <a href="https://www.linkedin.com/in/darius-hmmond/" target="_blank">Daruis's LinkedIn</a> 
                    <a href="https://www.linkedin.com/in/rimma-girsheva" target="_blank">Rimma's LinkedIn</a> 
                </section>
            </div>
            <div class="BottomRight">
                <h3>Special Thanks</h3>
                <ul>
                    <li>Carlos Lopez- Lead Coding Instructor </li>
                    <li>Galvin Hensley- Coding Instructor </li>
                    <li>Kevin McDonald- Career Advancement Advisor</li>
                    <li>Staff of the WCCI program</li>
                </ul> 
            </div>       
        </div>
    `;
}