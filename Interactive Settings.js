//The variables hash is in the format #n1_n2_B1_B2_B3 where the first two give the initial number of counters, and the remaining

var variables = window.location.hash.substr(1);
variables = variables.split('_');
var settings = {};


//Check url hash settings. If not available, default to 4R, 2B, add=true and display = true
if(variables[0] && Number.isInteger(+variables[0])){
    settings.initRed = +variables[0];
} else {
    settings.initRed = Math.floor(Math.random()*5+1);
}

if(variables[1] && Number.isInteger(+variables[1])){
    settings.initBlue = +variables[1];
} else {
    settings.initBlue = Math.floor(Math.random()*5+1);
}

if(variables[2] == '0' || variables[2] == '1'){
    settings.addCounters=Boolean(+variables[2]);
} else {
    settings.addCounters = true;
}

if(variables[3] == '0' || variables[3] == '1'){
    settings.subtractCounters = Boolean(+variables[3]);
} else {
    settings.subtractCounters = true;
}

if(variables[4] == '0' || variables[4] == '1'){
    settings.displayEquation = Boolean(+variables[4]);        
} else {
    settings.displayEquation = true;
}

var setWidth = 800;
var setHeight = 300;
var r = 35;
