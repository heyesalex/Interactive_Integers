var counters=[];
var dx;
var dy;
var l = counters.length;
var toHighlight;
var toFade;
var dispA = settings.initialRedCounters;
var dispB = settings.initialBlueCounters;
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

var topBlue;
var topRed;
var h1;
var redStack = undefined;
var blueStack = undefined;

function setup() {

    var centeringDiv = createDiv('');
    centeringDiv.style("text-align","center");

    var canvas = createCanvas(setWidth, setHeight);
    canvas.parent(centeringDiv);

    var tot = settings.initialRedCounters+settings.initialBlueCounters;

    //If required, define the "bank" stacks on either side

    //Define the red stack
    if(settings.addRedCounters ||  settings.subtractRedCounters){
        redStack = [];
        for(let i=0 ; i < 10 ; i++){
            let newR = new Counter(r+10, height-50-i*10, r, Red);
            redStack.push(newR);
            if(i === 9){
                topRed = newR;
            }
        }
    }

    //Define the blue stack
    if(settings.addBlueCounters || settings.subtractBlueCounters){   
        blueStack = [];
        for(let i=0 ; i < 10 ; i++){
            let newB = new Counter(width-r-10, height-50-i*10, r, Blue);
            blueStack.push(newB);
            if(i === 9){
                topBlue = newB;
            }
        }
    }

    //Define margin on each side for bank stacks
    var margin;
    if(settings.addRedCounters ||  settings.subtractRedCounters || settings.addBlueCounters || settings.subtractBlueCounters){
        margin = 10+3*r 
    } else {
        margin = 2*r;
    }

    //Define spacing between counters
    var spacing;
    if(tot>1){
        spacing = Math.floor((width-2*margin)/(tot+1-(2*tot%2)));
    } else {
        spacing = 0;
    }

    //Define initial array of red/blue counters  
    for(let i=0 ; i < tot ; i++){

        //Set colour of i'th counter
        var col;
        if(i<settings.initialRedCounters){
            col = Red;
        } else {
            col = Blue;
        }

        //Counter y position random, alternates between top and bottom half
        var yposition = random((i%2)/2*height+r, (1+i%2)/2*height-r);  

        //Define counters
        let c = new Counter(width/2+(i-(tot-1)/2)*spacing, yposition, r, col, 255);

        //Push to stack and update stack length l
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

    //Draw the red "bank" stacks on either side, excluding the top counter
    if(settings.addRedCounters || settings.subtractRedCounters){
        for(let i=0 ; i < redStack.length ; i++){
            push();
            redStack[i].show();      
            pop();
        }
        //Draw a very lazy wash-out rectangle over the "banked" counters... wow this is lazy
        push();
        fill(255, 100);
        noStroke();
        rectMode(CENTER);
        rect(topRed.x, height/2, 2*r, height);
        pop();
    }

    //Draw the blue "bank" stacks on either side, excluding the top counter
    if(settings.addBlueCounters || settings.subtractBlueCounters){
        for(let i=0 ; i < blueStack.length ; i++){
            push();
            blueStack[i].show();    
            pop();
        }   
        //Draw a very lazy wash-out rectangle over the "banked" counters... wow this is lazy
        push();
        fill(255, 100);
        noStroke();
        rectMode(CENTER);
        rect(topBlue.x, height/2, 2*r, height);
        pop();
    }

    

    //If there is a top counter and it's moving, look to cancel or subtract
    if(counters[l-1] && counters[l-1].moving){
        //If moving counter overlaps another of opposite colour, both are highlighted ORANGE
        let overlappingFreeCounter = false;
        for(let i = l-2 ; i>=0 ; i--){
            if(counters[l-1].overlap(counters[i])){
                overlappingFreeCounter = true;
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
        //If not overlapping a Free counter, check if moving counter is overlapping opposite-coloured stack; highlight BLUE for subtraction, and set to fade
        if(!overlappingFreeCounter){
            if(settings.subtractBlueCounters && counters[l-1].col == Blue && counters[l-1].overlap(topBlue)){
                counters[l-1].highlight(Blue);
                toFade = [l-1];
            }
        } else if(settings.subtractRedCounters && counters[l-1].col == Red && counters[l-1].overlap(topRed)){
            counters[l-1].highlight(Blue);
            toFade = [l-1];
        }
    }
    
    

    //If there are no counters, or none moving, check to see if were're hovering over the bank counters
    if(settings.addRedCounters || settings.addBlueCounters){

        if(!(counters[l-1] && counters[l-1].moving)){
            var bank = {
                highlightCounter: undefined
            };           


            if(settings.addBlueCounters && topBlue.touching(mouseX, mouseY)){
                bank.highlightCounter = topBlue;
            } else if(settings.addRedCounters && topRed.touching(mouseX, mouseY)){
                bank.highlightCounter = topRed;
            }

            if(bank.highlightCounter){
                //check to see if there's a free counter between us and the stack; if there is, don't grab a new counter
                if(counters.length != 0){
                    for(let i = l-1 ; i >= 0 ; i--){
                        if(counters[i].touching(mouseX, mouseY)){
                            bank.highlightCounter = undefined;
                            break;
                        }
                    }
                }
            }

            //Redraw top stack counter as highlighted
            if(bank.highlightCounter){
                bank.highlightCounter.highlight(Red);
                push();
                bank.highlightCounter.show();
                pop();
            }
        }

        //Reset highlighting
        bank = {};
        if(settings.addBlueCounters || settings.subtractBlueCounters){
            topBlue.highlighted = false;
        }
        if(settings.addRedCounters || settings.subtractRedCounters){
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
        } else if((settings.addRedCounters && topRed.touching(mouseX, mouseY)) || (settings.addBlueCounters && topBlue.touching(mouseX, mouseY))){
            cursor(HAND);
        }
    }



    //Update displayed equation
    if(settings.displayEquation){
        if(dispB == 0){         
            h1.html(dispA);
        } else if(dispA == 0){
            h1.html('-'+dispB);
        } else {
            h1.html(dispA+' + (-'+dispB + ')');
        }
    }

    //Reset count of red and blue counters
    dispA = 0;
    dispB = 0;
}




//When mouse is pressed, check whether to move counters, or add counters
function mousePressed(){
    moveCounter();
}
function touchStarted(){
    moveCounter();    
}

function moveCounter(){
    if(!(mouseButton && mouseButton == LEFT)){
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

        if(!isSomethingMoving && (settings.addRedCounters || settings.addBlueCounters)){
            //If clicking inside the top of a bank stack, create a new counter of that colour

            let bankCounter = undefined;

            if(settings.addBlueCounters && topBlue.touching(mouseX, mouseY)){
                bankCounter = topBlue;
            } else if(settings.addRedCounters && topRed.touching(mouseX, mouseY)){
                bankCounter = topRed;
            }

            if(bankCounter){
                let col = bankCounter.col;
                let c = new Counter(bankCounter.x, bankCounter.y, r, col);
                c.moving = true;
                dx = 0;
                dy = 0;
                counters.push(c);
                l = counters.length;
            }
            //Reset bank details
            bankCounter = undefined;
        }

    }
}




function mouseReleased(){
    releaseCounter();
}
function touchEnded(){
    releaseCounter();
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
    return false;
}
