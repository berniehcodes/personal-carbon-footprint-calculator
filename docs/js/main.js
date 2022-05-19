//retrieve real time information from AESO
//allow for user input of energy consumed per year
//number of people in household
//output the carbon intensity per capita in the household

//combine with carbon interface (https://docs.carboninterface.com/#/)

class ProvTerrElec{
  constructor(hydro, natGas, petroleum, wind, biomassGeothermal, solar, coalCoke, uranium){
    
    this.hydro = hydro
    this.hydro = natGas
    this.petrol = petroleum
    this.wind = wind
    this.biomassGeothermal = biomassGeothermal
    this.solar = solar
    this.coalCoke = coalCoke
    this.uranium = uranium
  }
}
  let ytEnergy = new ProvTerrElec(0.8,0.2,0,0,0,0,0,0)
  let nuEnergy = new ProvTerrElec(0.47,0.14,0.37,0.02,0,0,0,0 )
  let ntEnergy = new ProvTerrElec(0,0,1,0,0,0,0,0)
  let bcEnergy = new ProvTerrElec(0.87,0.04,0.005,0.026,0.05,0.001,0,0)
  let abEnergy = new ProvTerrElec(0.03,0.54,0.001,0.06,0.02,0.001,0.36,0)
  let skEnergy = new ProvTerrElec( 0.15,0.4,0.001,0.03,0.005,0,0.41,0)
  let mbEnergy = new ProvTerrElec(0.97,0.001,0.001,0.03,0.002,0,0,0)
  let onEnergy = new ProvTerrElec(0.24,0.07,0.003,0.08,0.01,0.01,0,0.59)
  let qcEnergy = new ProvTerrElec(0.94,0.001,0.002,0.05,0.007,0.001,0,0)
  let nbEnergy = new ProvTerrElec(0.22,0.15,0.01,0.07,0.04,0,0.14,0.38)
  let nlEnergy = new ProvTerrElec(0.96,0.006,0.03,0.004,0,0,0,0)
  let nsEnergy = new ProvTerrElec(0.1,0.22,0.02,0.11,0.03,0,0.52,0)
  let peEnergy = new ProvTerrElec(0,0,0.005,0.99,0.005,0,0,0)
  
  let canada = {}
  canada = {ytEnergy, nuEnergy, ntEnergy, bcEnergy, abEnergy, skEnergy, mbEnergy, onEnergy, qcEnergy, nbEnergy, nlEnergy, nsEnergy, peEnergy}

//used Carbon Interface Discord for JS method
 function calcInputs(unit, value, state, numOfPeople){
  let appKey = 'TTHW8FVg0wgxlRYpybhnQ'
    fetch('https://www.carboninterface.com/api/v1/estimates', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${appKey}`,
    },
    body: JSON.stringify({ //converts object to a string
      'type': "electricity",
      'electricity_unit': unit,
      'electricity_value': value, //enter the value of how much electricity is generated 
      'country': 'ca',
      'state': state,
      
    }),
  }).then(res => res.json())
    .then((data) => { 
      console.log(data);
      let cEstimate = data.data
      let cEstimateAtt = cEstimate.attributes
      let carbonTonnes = cEstimateAtt.carbon_mt
      console.log(carbonTonnes)
      document.querySelector('.total').innerText = ` ${carbonTonnes} tonnes CO2`;
      document.querySelector('.perCapita').innerText = ` ${carbonTonnes/numOfPeople} tonnes CO2`;

  })
.catch(err => {
 console.log(`error ${err}`)
});


}

//assign retrieve values from the inputs
 
document.querySelector('#calc').addEventListener('click', calcCarbon)
document.querySelector('#clear').addEventListener('click', clearForm)

function calcCarbon(){
  let unit = document.querySelector('#electricityUnit').value
  let value = document.querySelector('#usage').value
  let state = document.querySelector('#location').value
  let numOfPeople = document.querySelector('#people').value
  //document.querySelector('h4').classList.toggle('hidden') //show results section

  let energyMixState = `${state}Energy`
  console.log(canada[energyMixState])

  
  for (const [key, value] of Object.entries(canada[energyMixState])){
    document.querySelector('.energyMix').innerText = ` ${key}: ${Math.floor(value*100)}%; `;
  }
  
  //calcInputs(unit,value,state, numOfPeople)
  //Add same energy but different province/territory
}

function clearForm(){

  document.querySelector('#location').value = ''
  document.querySelector('#usage').value = ''
  document.querySelector('#electricityUnit').value = ''
  document.querySelector('#people').value = ''
  document.querySelector('.energyMix').innerText = ''
  document.querySelector('.total').innerText = ''
  document.querySelector('.perCapita').innerText = ''

}





