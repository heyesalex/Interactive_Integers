var counters=[];
var dx;
var dy;
var l = counters.length;
var toHighlight;
var toFade;
var dispA = settings.initRed;
var dispB = settings.initBlue;
var dispTot = dispA-dispB;
var toFade = [];

var addingRed = true;

var Red = {
    R: 232,
    G: 76,
    B: 61
}

var Blue = {
    R: 53,
    G: 152,
    B: 220
}

var Orange = {
    R: 251,
    G: 102, 
    B: 17
}

var rStack = [];
var bStack = [];
var topBlue;
var topRed;
var h1;

function setup() {

    var centeringDiv = createDiv('');
    centeringDiv.style("text-align","center");

    var canvas = createCanvas(setWidth, setHeight);
    canvas.parent(centeringDiv);

    var tot = settings.initRed+settings.initBlue;

    //If required, create the "bank" stacks on either side
    if(settings.addCounters || settings.subtractCounters){   

        for(let i=0 ; i < 10 ; i++){

            let newB = new Counter(width-r-10, height-50-i*10, r, Blue);
            let newR = new Counter(r+10, height-50-i*10, r, Red);

            if(i === 9){
                topBlue = newB;
                topRed = newR;
            }

            bStack.push(newB);
            rStack.push(newR);
            bStack.width = 2*r+20;
            rStack.width = 2*r+20;
        }
    }

    //Define initial array of red and blue counters, based on settings    
    for(let i=0 ; i < tot ; i++){

        //Set colour of i'th counter
        let col;
        if(i<settings.initRed){
            col = Red;
        } else {
            col = Blue;
        }

        var margin;
        if(settings.addCounters || settings.subtractCounters){
            margin = 10+3*r 
        } else {
            margin = 2*r;
        }

        var spacing = 0;
        if(tot>1){
            spacing = Math.floor((width-2*margin)/(tot+1-(2*tot%2)));
        }

        let c = new Counter(width/2+(i-(tot-1)/2)*spacing, random((i%2)/2*height+r, (1+i%2)/2*height-r), r, col, 255);

        l = counters.push(c);
    }

    //Define Equation Display as html element
    if(settings.displayEquation){
        createP('');
        h1 = createElement('h1' , dispA+' + (-'+dispB + ') = ' + dispTot);
        h1.parent(centeringDiv);        
    }
}

function draw(){

    background(255);    
    cursor(ARROW);
    toFade = [];

    //Draw the "bank" stacks on either side, excluding the top counter
    if(settings.addCounters || settings.subtractCounters){
        for(let i=0 ; i < rStack.length ; i++){
            push();
            bStack[i].show();
            rStack[i].show();      
            pop();
        }   

        //Draw a very lazy wash-out rectangle over the "banked" counters... wow this is lazy. 
        push();
        fill(255, 100);
        noStroke();
        rectMode(CENTER);
        rect(topBlue.x, height/2, 2*r, height);
        rect(topRed.x, height/2, 2*r, height);
        pop();
    }

    //If there is a top counter and its moving, check its highlighting
    if(counters[l-1] && counters[l-1].moving){


        //If moving counter overlaps another of opposite colour, both are highlighted ORANGE
        let overlapping = false;
        for(let i = l-2 ; i>=0 ; i--){

            if(counters[l-1].overlap(counters[i])){
                overlapping = true;
            } else {
                continue;
            }

            if(counters[l-1].col != counters[i].col){
                counters[l-1].highlight(Orange);
                counters[i].highlight(Orange);

                //Set counters i and l-1 as marked to fade out
                toFade = [i, l-1];
                break;
            }
        }

        //If moving counter is overlapping corresponding stack, highlight BLUE for subtraction, and set to fade
        if(!overlapping && settings.subtractCounters){        
            if(counters[l-1].overlap(topBlue) && counters[l-1].col == Blue){

                counters[l-1].highlight(Blue);
                toFade = [l-1];

            } else if(counters[l-1].overlap(topRed) && counters[l-1].col == Red){            
                counters[l-1].highlight(Blue);
                toFade = [l-1];

            }
        }
    }

    //If there are no counters, or none moving, check to see if were're hovering over the bank counters
    if(settings.addCounters){
        if(!counters[l-1] || !counters[l-1].moving){

            let bank = {};

            if(topBlue.touching(mouseX, mouseY)){
                bank.counter = topBlue;
            } else if(topRed.touching(mouseX, mouseY)){
                bank.counter = topRed;
            }

            if(bank.counter){
                bank.highlight = true;

                if(counters.length != 0){
                    for(let i = l-1 ; i >= 0 ; i--){
                        if(counters[i].touching(mouseX, mouseY)){
                            bank.highlight = false;
                            break;
                        }
                    }
                }

                if(bank.highlight){
                    bank.counter.highlight(Red);
                    push();
                    bank.counter.show();
                    pop();
                }
            }
            //Reset highlighting
            bank = {};
            topBlue.highlighted = false;
            topRed.highlighted = false;
        }
    }

    //  Update moving counter's position
    if(counters.length != 0){
        if(counters[l-1].moving){             
            counters[l-1].drag(mouseX+dx, mouseY+dy);
        }

        if(counters[l-1].x<=r+1){
            counters[l-1].x = r+1;
        }
        if(counters[l-1].x>=width-r-1){
            counters[l-1].x = width-r-1;
        }
        if(counters[l-1].y<=r+1){
            counters[l-1].y = r+1;
        }
        if(counters[l-1].y>=height-r-1){
            counters[l-1].y = height-r-1;
        }       
    }

    //Update each counter in turn, from 'bottom' to 'top'
    for(let i=0 ; i<counters.length ; i++){
        push();

        //Update fading counters
        if(counters[i].fading){
            counters[i].fade();

            //If fully faded, remove counter from array and update array length.
            if(counters[i].alpha <= 0){
                counters.splice(i, 1);
                i--;
                l = counters.length;
                pop();
                continue;
            }
        }

        //Draw counters
        counters[i].show();

        //reset highlighting
        counters[i].highlighted = false;
        pop();

        //Update red and blue count for displayed equation
        if(settings.displayEquation){
            if(counters[i].fading == false){	
                switch(counters[i].col.R){
                    case Red.R: dispA++;
                        break;
                    case Blue.R: dispB++;
                        break;
                }
            }
        }

        //Update cursor
        if(counters[l-1].moving){
            cursor(MOVE);
        } else if(counters[i].touching(mouseX, mouseY)){
            cursor(HAND);
        } else if(settings.addCounters && (topBlue.touching(mouseX, mouseY) || topRed.touching(mouseX, mouseY))){
            cursor(HAND);
        }
    }

    //Update displayed equation
    if(settings.displayEquation){
        dispTot = dispA - dispB;

        if(dispB==0){
            h1.html(dispA+' + '+dispB + ' = ' + dispTot)
        } else {
            h1.html(dispA+' + (-'+dispB + ') = ' + dispTot)
        }
    }

    //Reset count of red and blue counters
    dispA = 0;
    dispB = 0;
}

//When mouse is pressed, we check to move counters, or add counters
function mousePressed(){
    moveCounter();
}

function touchStarted(){
    moveCounter();    
}

function moveCounter(){
    if(mouseButton == LEFT){

        let isSomethingMoving = false;

        //If clicking inside an existing counter, define dx, dy as position of counter relative to mouse, and move to end of counters array (this is the 'top' counter, as it's the last drawn) 
        for(let i = l-1 ; i >= 0 ; i--){            
            if((counters[i].touching(mouseX, mouseY)) && (!counters[i].fading)){

                counters[i].moving = true;
                isSomethingMoving = true;

                //Store relative position between mouse and counters centre
                dx = counters[i].x - mouseX;
                dy = counters[i].y - mouseY;

                //Move counter to the end of the array
                counters.push(counters.splice(i, 1)[0]);                

                break;
            }
        }

        if(!isSomethingMoving && settings.addCounters){
            //If clicking inside the top of a bank stack, create a new counter of that colour

            let bank = {};

            if(topBlue.touching(mouseX, mouseY)){
                bank.counter = topBlue;
            } else if(topRed.touching(mouseX, mouseY)){
                bank.counter = topRed;
            }

            if(bank.counter){
                let col = bank.counter.col;
                let c = new Counter(bank.counter.x, bank.counter.y, r, col);
                c.moving = true;
                dx = 0;
                dy = 0;
                counters.push(c);
                l = counters.length;
            }
            //Reset bank details
            bank = {};
        }

    }
}

function mouseReleased(){
    releaseCounter();
    return false;
}

function touchEnded(){
    releaseCounter();
    return false;
}

function releaseCounter(){

    //If there are any counters, everything should stop moving, and those set toFade should start fading
    if(counters.length != 0){

        for(let i = 0 ; i < toFade.length ; i++){
            counters[toFade[i]].fading = true;
        }

        //Reset counters in toFade
        toFade = [];

        //Stop counters moving and being highlighted
        counters[l-1].moving = false;
        counters[l-1].highlighted = false;

    }
}
