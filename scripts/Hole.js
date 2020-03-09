class Hole{

    constructor(x, y, r){
        this.x = x;
        this.y = y;
        this.r = r;
    }

    draw(){
        fill(255,0,0);
        ellipse(this.x , this.y , this.r * 2);
    }

}