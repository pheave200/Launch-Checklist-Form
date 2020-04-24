window.addEventListener('load', function (){
   let form = document.querySelector("form");
   let pilotNameInput = document.querySelector('input[name=pilotName]');
   let copilotNameInput = document.querySelector('input[name=copilotName]');
   let fuelLevelInput = document.querySelector('input[name=fuelLevel]');
   let cargoMassInput = document.querySelector('input[name=cargoMass]');
   let faultyItems = document.getElementById('faultyItems')
   let pilotStatus = document.getElementById('pilotStatus');
   let copilotStatus = document.getElementById('copilotStatus');
   let fuelStatus = document.getElementById('fuelStatus');
   let cargoStatus = document.getElementById('cargoStatus');
   let launchStatus = document.getElementById('launchStatus');
   let planetData = document.getElementById('planetData')
   
   form.addEventListener("submit", function(event) {
      event.preventDefault();
      
      if (pilotNameInput.value === "" || copilotNameInput.value ==="" || fuelLevelInput.value === "" || cargoMassInput.value === ""){
         alert('All fields required!');
      } else if (isNaN(fuelLevelInput.value) || isNaN(cargoMassInput.value)){
         alert('Please enter a numeric value for fuel Level and cargo mass.');
      } else if (!isNaN(pilotNameInput.value) || !isNaN(copilotNameInput.value)) {
         alert('Numeric entries are not allow in th Pilot or Copilot fields.');
      } else {
         faultyItems.style.visibility = 'visible'
         pilotStatus.innerHTML = `Pilot ${pilotNameInput.value} is ready for launch`
         copilotStatus.innerHTML = `Co-pilot ${copilotNameInput.value} is ready for launch`

         if (fuelLevelInput.value <= 10000){
            fuelStatus.innerHTML = "Fuel level is too low for launch.";
         } else {
            fuelStatus.innerHTML = "Fuel level is ready for launch";
         }
         if (cargoMassInput.value >= 10000){
            cargoStatus.innerHTML = "Cargo mass is too high for launch";
         } else {
            cargoStatus.innerHTML = "Cargo mass is low enough for launch";
         }
         if (fuelLevelInput.value <= 10000|| cargoMassInput.value >= 10000){
            launchStatus.innerHTML = "Shuttle not ready to launch";
            launchStatus.style.color = "red";
         } else {
            launchStatus.innerHTML = "Shuttle ready for launch";
            launchStatus.style.color = "green";
         }
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
