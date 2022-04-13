
export default{
    SetupFooter
}

const appDiv = document.getElementById("app");

function SetupFooter(){
 

    appDiv.innerHTML = `
        <div>
        
        <h1>Here is a list of our project members with links to either their respective Linkden or Github profiles </h1>
        
        <section class="Links">
       <ul><a href="https://github.com/BradRWeir" target="_blank">Link to Brad's Github</a> </ul>
       <ul><a href="https://github.com/DenzaleM" target="_blank"> Denzale's Github Link</a> </ul>
       <ul><a href="http://github.com/adia1bug"target="_blank" >Qadriyyah's Github Link </a> </ul>
       <ul><a href="https://www.linkedin.com/in/jessica-yuting-wang/"target="_blank" >Jessica's Linken </a> </ul>
       <ul><a href="https://www.linkedin.com/in/darius-hmmond/" target="_blank">Daruis Linken </a> </ul>
       <ul><a href="https://www.linkedin.com/in/rimma-girsheva" target="_blank">Rimma's Linken</a> </ul>
        </section>

            
        </div>
    `;
}