class Cue{
    constructor(){
        this.angle = 0;
        this.power = 0;
        this.shotPower = 0;
    }

    draw(){        
        push();
            fill(100);
            stroke(0);
            translate(bomb.position.x, bomb.position.y);
            rotate(this.angle);
            rect(-160 - 25, 0, 320,6);
        pop();
    }

    shot(){
        if(mouseIsPressed){
            if(mouseButton == LEFT && this.power <= 99){
                this.power += 1;
            }
        }

        push();
        fill(255,0,0);
        translate(bomb.position.x, bomb.position.y);
        rotate(this.angle);
        rect(-25 -this.power/2, 10,this.power,10);
        pop();
    }


}