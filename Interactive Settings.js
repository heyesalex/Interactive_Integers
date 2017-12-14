var variables = window.location.hash.substr(1);
variables = variables.split('_')
var settings = {};


//Check url hash settings. If not available, default to 4R, 2B, add=true and display = true
if(variables[0] && variables [1]){
    settings.initRed = variables[0];  
    settings.initBlue = variables[1];

    if(variables[2] && variables[3]){
        settings.addCounters=Boolean(variables[2]);
        settings.displayEquation = Boolean(variables[3]);
    } else {
        settings.addCounters = true;
        settings.displayEquation = true;
    }
    
} else {
    settings.initRed = 4;
    settings.initBlue = 2;
    settings.addCounters = true;
    settings.displayEquation = true;
}

var rbStack = true;//To be subsumed under addCounters

var setWidth = 800;
var setHeight = 300;
var r = 35;
