class Counter{

//Each counter is an ellipse with centre (x, y), radius r, colour RGB, and it knows if it should be moving. 
    constructor(x, y, r, R, G, B){
        this.x=x;
        this.y=y;
        this.r=r;
        this.R=R;
        this.G=G;
        this.B=B;
        this.moving = false;
        this.highlighted = false;
        this.fading = false;
        this.alpha = 255;
    }
    
//Each ellipse gets drawn with its specified colour.    
    show(){
        fill(this.R, this.G, this.B, this.alpha);
        ellipse(this.x, this.y, 2*this.r);
    }

//This moves the counter by redefining its position.   
    drag(newx, newy){
            if(this.moving){
                this.x=newx;
                this.y=newy;
            }
    }
    
    overlap(x, y){
        let d=dist(this.x, this.y, x, y);
        return Boolean(d <= 2*this.r);
    }
    
    touching(x, y){
        let d=dist(x, y, this.x, this.y);
        return Boolean(d <= r);
    }
    
    fade(){
            this.alpha-=10;
    }
    
    highlight(){
        if(this.highlighted){
            strokeWeight(6);
            stroke(251, 102, 17, this.alpha);
        }
    }
}