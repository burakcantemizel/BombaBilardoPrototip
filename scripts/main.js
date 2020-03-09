//Matter.js Sınıfları
var Engine = Matter.Engine;
//Render İçin Processing Kullanıcaz.
//var Render = Matter.Render;
var World = Matter.World;
var Bodies = Matter.Bodies;
var Mouse = Matter.Mouse;
var MouseConstraint = Matter.MouseConstraint;
var Constraint = Matter.Constraint;

//Matter.js Türetilmiş Nesnelerimiz
var engine;
var world;

var balls = [];

function setup(){
  //Canvası Oluşturuyoruz.
  const canvas = createCanvas(960, 540);

  //Fizik Motorunu Oluşturuyoruz.
  engine = Engine.create();
  world = engine.world;
  
  //Fizik Motoru Ayarlamaları
  engine.world.gravity.y = 0;

  //P5.js Renderer Ayarlamaları
  rectMode(CENTER);
  ellipseMode(CENTER);
  imageMode(CENTER);
  noSmooth();

  
  //Fizik Nesnelerini Oluşturuyoruz.
  //Duvarlar
  bottomWallLeft = new Wall(width / 4 + 10, height - 10 , width/2 - 60, 20);
  bottomWallRight = new Wall(width - (width / 4 + 10), height - 10 , width/2-60, 20);
  topWallLeft = new Wall(width / 4 + 10, 10 , width/2-60, 20);
  topWallRight = new Wall(width - (width / 4 + 10), 10 , width/2-60, 20);
  leftWall = new Wall(10, height / 2 , 20, height-80);
  rightWall = new Wall(width - 10 , height / 2, 20 ,height-80);

  //Delikler
  leftTopHole = new Hole(20,20,20);
  leftBottomHole = new Hole(20,height-20,20);
  rightTopHole = new Hole(width-20,20,20);
  rightBottomHole = new Hole(width-20,height-20,20);
  topMiddleHole = new Hole(width/2, 20, 20);
  bottomMiddleHole = new Hole(width/2, height-20, 20);

  //Toplar
  balls.push(new Ball(width / 1.5 , height / 2, 10));
  balls.push(new Ball(width / 1.5 + 30, height / 2 + 15, 10));
  balls.push(new Ball(width / 1.5 + 30, height / 2 - 15, 10));
  balls.push(new Ball(width / 1.5 + 60, height / 2, 10));
  balls.push(new Ball(width / 1.5 + 60, height / 2 - 30, 10));
  balls.push(new Ball(width / 1.5 + 60, height / 2 + 30, 10));
  balls.push(new Ball(width / 1.5 + 90, height / 2 - 15, 10));
  balls.push(new Ball(width / 1.5 + 90, height / 2 + 15, 10));
  balls.push(new Ball(width / 1.5 + 90, height / 2 - 45, 10));
  balls.push(new Ball(width / 1.5 + 90, height / 2 + 45, 10));
  //Bomba
  bomb = new Bomb(width / 3.5, height/2, 20);
  //Bilardo İstekası
  cue = new Cue();

  /*
  //MouseConstraint
  const mouse = Mouse.create(canvas.elt);
  const mouseOptions = {
    mouse: mouse,
  }

  mConstraint = MouseConstraint.create(engine, mouseOptions);
  World.add(world, mConstraint);
  */


  //Fizik Motorunu Çalıştırıyoruz.
  Engine.run(engine);
}

function draw(){
  //Arkaplanı Çizdiriyoruz.
  background(200);

  //Topları Çizdiriyoruz.
  for(let i = 0; i < balls.length; i++){
    balls[i].draw();
  }

  //Bombayı Çizdiriyoruz.
  bomb.draw();

  //Kenarlıklar
  fill(0,0,255);
  noStroke();
  rect(width/2, 10 , width, 20);
  rect(width/2, height-10, width, 20);
  rect(10, height/2, 20, height);
  rect(width-10, height/2, 20, height);

  //Duvarları Çizdiriyoruz.
  bottomWallLeft.draw();
  bottomWallRight.draw();
  topWallLeft.draw();
  topWallRight.draw();
  leftWall.draw();
  rightWall.draw();


  //Delikleri Çizdiriyoruz.
  leftTopHole.draw();
  leftBottomHole.draw();
  rightTopHole.draw();
  rightBottomHole.draw();
  topMiddleHole.draw();
  bottomMiddleHole.draw();

  //Bilardo İstekasını Çizdiriyoruz.
  cue.draw();
  cue.shot();

  //Açıklama Yazısı
  fill(0);
  text("Prototip 2", 50, 40);
  text("İsteka 'mouse tekerleği' ile döndürülebilir ve basılı tutarak güç ayarlanabilir.", 50, 60);
  text("'Boşluk' tuşu ile bombanın menzili içerisinde patlama gerçekleştirebilirsiniz.", 50, 80);
  text("Renkli toplara değmeden deliklere sokmaya çalışın!", 50, 100);
}


//Fizik Etkileşimleri
function keyPressed(){
  /****Bomba Patlaması***/
  if(keyCode == 32){
    for(let i= 0; i < balls.length; i++){
      let distance = dist(bomb.position.x, bomb.position.y, balls[i].position.x, balls[i].position.y);

      if(distance <= 150){
        let targetAngle = Matter.Vector.angle(bomb.position, balls[i].position);
        var force =  0.30 / distance; // max uzaklık 100px min > 0
        print(force);
    
        Matter.Body.applyForce(balls[i].body, balls[i].position,{
          x: cos(targetAngle) * force,
          y: sin(targetAngle) * force
        });
      }
    }
  }
}

function mouseWheel(event){
  /****İsteka Açısı***/
  cue.angle += event.delta/2000;
}

function mouseReleased(){
  /****Vuruş***/
  cue.shotPower = cue.power;
  cue.power = 0;

  Matter.Body.applyForce(bomb.body, bomb.position,{
    x: cos(cue.angle) * cue.shotPower/1000,
    y: sin(cue.angle) * cue.shotPower/1000
  });

  print(cue.shotPower);
}