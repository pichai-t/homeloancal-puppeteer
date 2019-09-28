const { Before, After } = require('cucumber');

Before( (scenario) => {
  this.scenarioName = scenario.pickle.name;
  console.log(this.scenarioName);
});
  
After(function() { 
  console.log("\nTest Scenario has ended.\n-------------------------------------\n ");
  return this.closeBrowser(); 
});
  