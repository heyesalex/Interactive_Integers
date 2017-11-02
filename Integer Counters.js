let counters=[];
//let r=40;
let dx;
let dy;
let l = counters.length;
let toHighlight;
let toFade;
let oneZero;
let dispA = initRed;
let dispB = initBlue;
let dispTot = dispA-dispB;
var h1;
var addRed = true;
var colourButton;


function setup() {
	createCanvas(setWidth, setHeight);
    
//Define initial array of counters    
    for(let i=0 ; i< initRed+initBlue ; i++){
        let col;
        if(i<initRed){
            col = 0;
        } else {
            col = 1;
        }
        let c = new Counter(i*100+100, random(100, height-100), r, (1-col)*255, 0, col*255);
        l = counters.push(c);
    }
    
    if(toggleColour){
        colourButton = createButton('Add Blue Counters');
        colourButton.style('background-colour', (255, 0, 0));
        colourButton.style('colour', 'white');
        colourButton.style('text-align', 'center');
        colourButton.style('display', 'inline-block');
        colourButton.style('font-size', '20px');
        colourButton.mousePressed(changeColour)
    }

    
//Define Equation Display as html element
    if(displayEquation){
        h1 = createElement('h1' , dispA+'+(-'+dispB + ')=' + dispTot);    
    }
    
}

if(toggleColour){
    function changeColour(){
        addRed = !addRed;
        if(addRed){
         colourButton.html('Add Blue Counters');
        } else {
         colourButton.html('Add Red Counters');
        }
    }
}


function draw(){
    
    background(255);    
    cursor(ARROW);
    
//Looking at each counter in the array in turn, from bottom to top.
    for(let i=0 ; i<l ; i++){
            
//Check if counters should be highlighted.
        push();
        if(l>0){
            if(counters[l-1].highlighted){
               if(i==toHighlight || i==l-1){
                   counters[i].highlight();
               }
            }
        }
        
//Check if counters should be fading out. 
        if(counters[i].fading){
            noStroke();
            counters[i].fade();
            
//If fully faded, remove counter from array and update array length.
            if(counters[i].alpha <=0){
                counters.splice(i, 1);
                i--;
                l=counters.length;
                pop();
                continue;
            }
        }
            
//Draw counters.
        if(counters[i].touching(mouseX, mouseY)){
            cursor(HAND)
               }
        if(counters[l-1].moving){
            cursor(MOVE)
        }
        counters[i].show();
        pop();
        
//Update red and blue count for display.
        if(displayEquation){
            if(counters[i].alpha == 255){	
                if(counters[i].R==255){
                    dispA++;
                }
                if(counters[i].B==255){
                    dispB++;
                }
            }
        }
    }
    
//Update displayed equation
    if(displayEquation){
        dispTot = dispA - dispB;
        if(dispB==0){
            h1.html(dispA+'+'+dispB + '=' + dispTot)
        } else {
            h1.html(dispA+'+(-'+dispB + ')=' + dispTot)
        }
    //Reset displayed equation
        dispA = 0;
        dispB = 0;
    }
    
    
//  Move counter within boundaries.
    if(l>0){
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
    
 //Check if overlapping. Set highlighting as true, set toHighlight as i, and break.
    if(l>0){
        if(counters[l-1].moving){
            for(let i=l-2 ; i>=0 ; i--){
                counters[l-1].highlighted = false;            
                if(counters[l-1].overlap(counters[i].x, counters[i].y) && !counters[i].fading && (abs(counters[l-1].B - counters[i].B)==255)){
                    counters[l-1].highlighted = true;
                    toHighlight = i;
                    break;
                }
            }
        }
    }
}






function mousePressed(){
    if(mouseButton == LEFT){
    
//If click inside, define dx, dy as position of counter relative to mouse. Move to end of array. 
        for(i = l-1 ; i>=0 ; i--){
            if((counters[i].touching(mouseX, mouseY)) && (!counters[i].fading)){
                if(top!==l-1){
                    counters.push(counters.splice(i, 1)[0]);
                }
                counters[l-1].moving = true;
                dx = counters[l-1].x - mouseX;
                dy = counters[l-1].y - mouseY;
                break;
            }
        }
        if(addCounters && mouseX>=r+1 && mouseX<=width-r-1 && mouseY>=r+1 && mouseY<=height-r-1){
            if(l==0 || !counters[l-1].moving){
                if(addRed){
                    let c = new Counter(mouseX, mouseY, r, 255, 0, 0);
                    l = counters.push(c);
                    counters[l-1].moving = true;
                    dx=0;
                    dy=0;
                } else {
                    let c = new Counter(mouseX, mouseY, r, 0, 0, 255);
                    l = counters.push(c);
                    counters[l-1].moving = true;
                    dx=0;
                    dy=0;                
                }
            }
        }
    }
}

function mouseReleased(){
    if(l>0){
        counters[l-1].moving = false;
        if(counters[l-1].highlighted){
            toFade=toHighlight;
            counters[toFade].fading = true;
            counters[l-1].fading = true;
        }
        counters[l-1].highlighted = false;
    }
}
