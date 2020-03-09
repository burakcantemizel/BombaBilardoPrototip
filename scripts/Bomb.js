class Bomb{

    constructor(x, y, r){
        let options = {
            restitution: 1,
            friction: 1,
            frictionAir: 0.01,
        }
        this.body = Bodies.circle(x, y, r, options);
        World.add(world, this.body);
        this.r = r;
    }

    draw(){
        this.position = this.body.position;
        this.angle = this.body.angle;
        
        fill(0);

        push();
        translate(this.position.x, this.position.y);
        rotate(this.angle);
        ellipse(0, 0, this.r * 2);

        noFill();
        stroke(255,0,0,100);
        strokeWeight(3);
        ellipse(0, 0, 300, 300);
        pop();
    }


}