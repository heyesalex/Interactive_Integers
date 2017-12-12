//Variables = [initRed, initBlue, addCounters?0:1, displayEquation?0:1]

var variables = window.location.hash.substr(1);
variables = variables.split('_')
var settings = {
    initRed: +variables[0],
    initBlue: +variables[1]
}

//Counter settings

var setWidth = 800;
var setHeight = 300;
var r = 35;

var addCounters, displayEquation;
var rbStack = true;//This should ultimately be subsumed under addCounters

//Check if adding counters and displaying equations has been specified. If not, default to having these ON
if(!variables[2]){
    settings.addCounters = true;
    settings.displayEquation = true;
} else{
    
    if(variables[2] == 0){
        settings.addCounters = false;
    } else {
        settings.addCounters = true;
    }
    
    if(variables[3] == 0){
        settings.displayEquation = false;
    } else {
        settings.displayEquation = true;
    }
}
