class Wall{

    constructor(x, y, w, h){
        let options = {
            isStatic: true,
        }
        this.body = Bodies.rectangle(x, y, w, h, options);
        World.add(world, this.body);
        this.w = w;
        this.h = h;
    }

    draw(){
        this.position = this.body.position;
        this.angle = this.body.angle;
        
       

        push();
        fill(140);
        noStroke();
        translate(this.position.x, this.position.y);
        rotate(this.angle);
        rect(0, 0, this.w, this.h);
        pop();
    }



}