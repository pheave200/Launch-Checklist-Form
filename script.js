// Write your JavaScript code here!
window.addEventListener("load", function() {
   let form = document.querySelector("form");
   let pilotName = document.querySelector("input[name=pilotName]");
   let copilotName = document.querySelector("input[name=copilotName]");
   let fuelLevel = document.querySelector("input[name=fuelLevel]");
   let cargoMass = document.querySelector("input[name=cargoMass]");
   let status = document.getElementById("launchStatusCheck");
   let launchStatus = document.getElementById("launchStatus");
   let faultyItems = document.getElementById("faultyItems");
   form.addEventListener("submit", function(event) {
      event.preventDefault();
      status.visibility = "visible";
      if(pilotName.value==="" || copilotName.value==="" || fuelLevel.value==="" || cargoMass.value==="") { 
         alert("All Fields Are Required!");
      } else if( isNaN(Number(fuelLevel.value)) || isNaN(Number(cargoMass.value))) {
         alert("Fuel amd Mass must be a number!")
      } else if(fuelLevel.value>=10000 && cargoMass.value<10000) {
         status.innerHTML = `
            <h2 id="launchStatus">Shuttle is Ready for Launch!</h2>
            <div  id="faultyItems">
               <ol>
                  <li id="pilotStatus">Pilot ${pilotName.value} is Ready</li>
                  <li id="copilotStatus">Co-pilot ${copilotName.value} is Ready</li>
                  <li id="fuelStatus">Fuel level high enough for launch</li>
                  <li id="cargoStatus">Cargo mass low enough for launch</li>
               </ol>
            </div>
         `;
      } else if (fuelLevel.value<10000 && cargoMass>=10000) {
         luanchStatus.style.color = "red";
         status.innerHTML = `
            <h2 id="launchStatus">Shuttle Cannot Launch!</h2>
            <div  id="faultyItems">
               <ol>
                  <li id="pilotStatus">Pilot ${pilotName.value} is Ready</li>
                  <li id="copilotStatus">Co-pilot ${copilotName.value} is Ready</li>
                  <li id="fuelStatus">Fuel level is to low to launch!</li>
                  <li id="cargoStatus">Cargo mass is to high launch!</li>
               </ol>
            </div>
         `;
         
      } else if (fuelLevel.value<10000) {
         status.innerHTML = `
            <h2 id="launchStatus">Shuttle Cannot Launch!</h2>
            <div  id="faultyItems">
               <ol>
                  <li id="pilotStatus">Pilot ${pilotName.value} is Ready</li>
                  <li id="copilotStatus">Co-pilot ${copilotName.value} is Ready</li>
                  <li id="fuelStatus">Fuel level is to low to launch!</li>
                  <li id="cargoStatus">Cargo mass low enough for launch</li>
               </ol>
            </div>
         `;
      } else if (cargoMass.value>10000) {
         status.innerHTML = `
            <h2 id="launchStatus">Shuttle Cannot Launch!</h2>
            <div  id="faultyItems">
               <ol>
                  <li id="pilotStatus">Pilot ${pilotName.value} is Ready</li>
                  <li id="copilotStatus">Co-pilot ${copilotName.value} is Ready</li>
                  <li id="fuelStatus">Fuel level is high enough to launch</li>
                  <li id="cargoStatus">Cargo mass is to low to launch!</li>
               </ol>
            </div>
         `;
      }   

   });
   fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response) {
      response.json().then(function(json) {
         let div = document.getElementById("missionTarget");
         div.innerHTML = `
            <h2>Mission Destination</h2>
            <ul>
               <li>Name: ${json[2].name}</li>
               <li>Diameter: ${json[2].diameter}</li>
               <li>Star: ${json[2].star}</li>
               <li>Distance From Earth:${json[2].distance}</li>
               <li>Number of Moons: ${json[2].moons}</li>
            </ul>
            <img src="${json[2].image}">
         `;
      });
   });


});


/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/
