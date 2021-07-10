var trex, trex_running, edges;
var groundImage;
var ground;
var load1
var invisibleground;
var load2,load3,load4,load5,load6,load7,load7,restartimg; 
var gameover,restart,gameoverimg;
var score;
var cloudsGroup,obstaclesGroup;
var obstacles;
var PLAY=1;
var END=0;
var gameState=PLAY;
var trexco,restartb;
var diesound,checksound,jumpsound;


function preload(){
   trex_running = loadAnimation("trex1.png","trex2.png","trex3.png","trex4.png");
   groundImage = loadImage("ground2.png")
   load1 =loadImage("cloud.png");
   //load2 =  loadImage=random(["obstacle1.png","obstacle2.png","obstacle3.png","obstacle4.png","obstacle5.png","obstacle6.png"]);
   load2= loadImage("obstacle1.png")
   load3= loadImage("obstacle2.png")
   load4= loadImage("obstacle3.png")
   load5= loadImage("obstacle4.png")
   load6= loadImage("obstacle5.png")
   load7= loadImage("obstacle6.png")
   trexco=loadAnimation("trex_collided.png");
   restartimg=loadImage("restart.png");
   gameoverimg=loadImage("gameOver.png");
   diesound=loadSound("die.mp3");
   checksound=loadSound("checkpoint.mp3");
   jumpsound=loadSound("jump.mp3");

}

function setup(){
  createCanvas(windowWidth, windowHeight);
  
  score=0
  console.log("jashan " + "coding");
  // creating trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trexco);


  edges = createEdgeSprites();
  ground = createSprite(200,180,400,20)
  ground.addAnimation("walking",groundImage);
  invisibleground =createSprite(200,195,400,20);
  invisibleground.visible=false;

  restart=createSprite(300,110,20,20);
  restart.addImage(restartimg);
  restart.scale=0.5;
  
  gameover=createSprite(300,80,100,30);
  gameover.addImage(gameoverimg);
  gameover.scale=1;
  obstaclesGroup=new Group();
  cloudsGroup=new Group();
  // var ran =Math.round(random(10,60));
  //console.log(ran)

  //adding scale and position to trex
  trex.scale = 0.5;
  trex.x = 50
  trex.setCollider("circle",0,0,45);
  trex.debug=false;
  
  
  
}

function draw(){
  //set background color 
  background("white");

text("score:"+ score,40,60);


if(gameState===PLAY){
  spawnobstacles(); 
  restart.visible=false;
  gameover.visible=false;
  ground.velocityX = -2;
  score=score+Math.round(frameCount/60);
 
 if (ground.x <0){
    ground.x= ground.width/2;
}
  if(touches.length > 0 && trex.collide(invisibleground) ) {
  trex.velocityY = -10;
  jumpsound.play();
  touches=[]
 }
 trex.velocityY = trex.velocityY + 0.5;
  
  spawnclouds();
    if(obstaclesGroup.isTouching(trex)){
    gameState=END;
    diesound.play();
   }
}
else if(gameState===END){
  restart.visible=true;
  gameover.visible=true;
  ground.velocityX = 0;
  obstaclesGroup.setVelocityXEach(0);
 cloudsGroup.setVelocityXEach(0);
  trex.changeAnimation("collided",trexco);
  obstaclesGroup.setLifetimeEach(-1);
  cloudsGroup.setLifetimeEach(-1);
  if(touches.length>0) {      
    reset();
    touches = []
  }
} 
  //stop trex from falling down
  trex.collide(invisibleground);
  if(touches.length>0){

  }
  drawSprites();
}
function reset(){
  gameState=PLAY;
  restart.visible=false
  gameover.visible=false
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  score=0;
  trex.changeAnimation("running",trex_running);
}

// creating functions
   function spawnclouds(){
  if(frameCount % 60 ===0 ){
    clouds= createSprite(600,100,40,10)
    clouds.velocityX=-3;
    clouds.y=Math.round(random(10,60))
    clouds.addAnimation("running",load1);
    clouds.scale=0.5;  
    clouds.lifetime=180;
    cloudsGroup.add(clouds);
    
 }
}
function spawnobstacles(){ 

  if(frameCount % 120 ===0 ){
    obstacles = createSprite(600,160,100,100)
  obstacles.velocityX= - 3;
  var ran2 =Math.round(random(1,6));
  switch(ran2){
    case 1:obstacles.addImage(load2);
    break ;
    case 2:obstacles.addImage(load3);
    break ;
    case 3:obstacles.addImage(load4);
    break ;
    case 4:obstacles.addImage(load5);
    break ;
    case 5:obstacles.addImage(load6);
    break ;
    case 6:obstacles.addImage(load7);
    break ;
  }
  
obstacles.scale= 0.5;
obstacles.lifetime = 200;
obstacles.velocityX=-3;
obstacles.velocityX=-(3+3*score/500);
obstaclesGroup.add(obstacles);
trex.depth=obstacles.depth;
trex.depth=trex.depth+1;

  }




}
  
  


