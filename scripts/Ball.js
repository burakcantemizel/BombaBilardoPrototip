class Ball{

    constructor(x, y, r){
        let options = {
            restitution: 1,
            friction: 1,
            frictionAir: 0.01,
        }
        this.body = Bodies.circle(x, y, r, options);
        World.add(world, this.body);
        this.r = r;
        this.color = color(random(0,255), random(0,255), random(0,255));
    }

    draw(){
        this.position = this.body.position;
        this.angle = this.body.angle;
        
        fill(this.color);
        stroke(0);

        push();
        translate(this.position.x, this.position.y);
        rotate(this.angle);
        ellipse(0, 0, this.r * 2);
        pop();
    }



}