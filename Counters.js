class Counter{

//Each counter is an ellipse with centre (x, y), radius r, colour RGB, and it knows if it should be moving. 
    constructor(x, y, r, col, alpha){
        this.x=x;
        this.y=y;
        this.r=r;
        this.col = col;
        this.moving = false;
        this.highlighted = false;
        this.fading = false;
        
        if(!alpha){
            this.alpha = 255;
        } else {
            this.alpha = alpha;
        }
    }
    
//Each ellipse gets drawn with its specified colour.    
    show(){
        
        if(this.fading){
            noStroke();
        } else if(this.highlighted){
            strokeWeight(6);
            stroke(251, 102, 17, this.alpha);
        }
        
        fill(this.col.R, this.col.G, this.col.B, this.alpha);
        ellipse(this.x, this.y, 2*this.r);
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
}
