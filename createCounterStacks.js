function createCounterStacks(number, vspacing, margin){ 
    
    
    for(let i=0 ; i<number ; i++){
        
        let newB = new Counter(width-r-margin, height-50-i*vspacing, r, Blue);
        let newR = new Counter(r+margin, height-50-i*vspacing, r, Red);
        
        if(i === number-1){
            topBlue = newB;
            topRed = newR;
        }
        
        bStack.push(newB);
        rStack.push(newR);
        bStack.width = 2*r+2*margin;
        rStack.width = bStack.width;
    }
}
