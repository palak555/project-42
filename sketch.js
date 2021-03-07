var backImage,backgr;
var player, player_running;
var ground,ground_img;
var score=0;
var b1;

var END =0;
var PLAY =1;
var gameState = PLAY;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImg=loadImage("banana.png")
  stoneImg=loadImage("stone.png");
  gameOver=loadImage("gameOver.png");
}

function setup() {
  createCanvas(850,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-6;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.2;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  foodGroup=new Group();
  obstacleGroup=new Group();

  b1=createSprite(0,0,2000,5)
  b1.shapeColor="green"

  player.setCollider("rectangle",0,0,400,500);
  player.debug = false 
 
}

function draw() { 
  background(0);

  player.collide(b1)

  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space") ) {
      player.velocityY = -15  ;
    }
    player.velocityY = player.velocityY + 0.9  ;
  
    player.collide(ground);
    createBanana();
    createObstacle();

    if(foodGroup.isTouching(player)){
      foodGroup.destroyEach();
      score=score+2;
      player.scale+= +0.01;
    }


    if(obstacleGroup.isTouching(player)){
      gameState=END
    }

    
  }

  if(gameState===END){
    player.destroy();
    foodGroup.velocityX=0;
    obstacleGroup.velocity=0;
    foodGroup.destroyEach();
    obstacleGroup.destroyEach();
    var go=createSprite(425,200)
    go.addImage(gameOver)
    backgr.velocityX=0
  }

 

  
  drawSprites();
  fill(255)
  textSize(20)
  text("Score:"+score,760,30)
}


function createBanana(){
  if(frameCount%80===0){
    var banana=createSprite(900,200,10,10)
    banana.y=random(80,150)
    banana.addImage(bananaImg)
    banana.scale=0.05;
    banana.velocityX=-6;
    banana.lifetime=300;
    player.depth=banana.depth++;
    foodGroup.add(banana);
    text("hjfjhevdyif",200,200)

  }
}


function createObstacle(){
   if(frameCount%120===0){
     var stone=createSprite(900,300,10,10)
     stone.addImage(stoneImg)
     stone.scale=0.2;
     stone.velocityX=-7 ;
     stone.lifetime=300;
     obstacleGroup.add(stone);

   }
}