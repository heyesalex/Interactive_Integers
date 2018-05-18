class Counter{

    //Each counter is an ellipse with centre (x, y), radius r, colour RGB, and it knows if it should be moving. 
    constructor(x, y, r, col, alpha, string){
        this.x=x;
        this.y=y;
        this.r=r;
        this.col = col;
        this.moving = false;
        this.highlighted = false;
        this.fading = false;
        this.highlighting = {R: 0, G:0, B:0};

        if(!alpha){
            this.alpha = 255;
        } else {
            this.alpha = alpha;
        }

        if(string){
            this.string = string;
        } else {
            this.string = '';
        }
    }

    //Each ellipse gets drawn with its specified colour.    
    show(){        
        //Draw a dropshadow, with a stroke if not fading
        if(this.fading){
            noStroke();
        } else {
            stroke(68, this.alpha);
        }        
        fill(68, this.alpha);
        ellipse(this.x, this.y+3, 2*this.r-1); 

        //If fading, highlight the next circle in orange
        if(this.fading){
            noStroke();
        } else if(this.highlighted){
            strokeWeight(7);
            stroke(this.highlighting.R, this.highlighting.G, this.highlighting.B, this.alpha);
        }  

        //Draw the top circle
        fill(this.col.R, this.col.G, this.col.B, this.alpha);
        ellipse(this.x, this.y, 2*this.r);

        //Add text
        if(this.string){
            noStroke();
            textSize(50);
            textAlign(CENTER, CENTER);
            fill(68, this.alpha);
            if(this.string == '-'){
                text(this.string, this.x, this.y-5);   
            } else {
                text(this.string, this.x, this.y);   
            }
        }      
    }

    //This moves the counter by redefining its position.   
    drag(newx, newy){
        if(this.moving){
            this.x=newx;
            this.y=newy;
        }
    }

    overlap(counter){
        let d=dist(this.x, this.y, counter.x, counter.y);
        return Boolean(d <= 2*this.r);
    }

    touching(x, y){
        let d=dist(x, y, this.x, this.y);
        return Boolean(d <= r);
    }

    fade(){
        this.alpha-=10;
    }

    highlight(col){ 
        this.highlighted = true;
        this.highlighting = col;
    }
}
