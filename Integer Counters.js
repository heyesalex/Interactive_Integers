let counters=[];
let r=50;
let dx;
let dy;
let l = counters.length;
let toHighlight;
let toFade;

function setup() {
	createCanvas(640, 480);
    
    for(let i=0 ; i<3 ; i++){
        let c = new Counter(100, i*150+100, r, 0, 0, 255);
        l = counters.push(c);
    }
}

function draw(){
	
    background(255);    
    
    for(let i=0 ; i<l ; i++){
            
        push();
        if(l>0){
            if(counters[l-1].highlighted){
               if(i==toHighlight || i==l-1){
                   counters[i].highlight();
               }
            }
        }
	    
        if(counters[i].fading){
                counters[i].fade();
//             if(counters[i].alpha <=0){
//                 counters.splice(i, 1);
//                 i--;
// 		l = counters.length;
//                 continue;
//             }
        }
        counters[i].show();
        pop();
        l = counters.length;
    }
    
//  Move counter
    if(l>0){
        if(counters[l-1].moving){
        counters[l-1].drag(mouseX+dx, mouseY+dy);
        }
    }
    
 //Check if overlapping. Set highlighting as true, set toHighlight as i, and break.
    if(l>0){
        if(counters[l-1].moving){
            for(let i=l-2 ; i>=0 ; i--){
                counters[l-1].highlighted = false;            
                if(counters[l-1].overlap(counters[i].x, counters[i].y) && !counters[i].fading && (counters[l-1].R!==counters[i].R)){
                    counters[l-1].highlighted = true;
                    toHighlight = i;
                    break;
                }
            }
        }
    }
}


function mousePressed(){
    
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
    
    if(l==0 || !counters[l-1].moving){
            let c = new Counter(mouseX, mouseY, r, 255, 0, 0)
            l = counters.push(c);
            counters[l-1].moving = true;
            dx=0;
            dy=0;
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
