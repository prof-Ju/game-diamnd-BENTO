var PLAY = 1;
var END = 0;
var gameState = PLAY;

var diamond, diamond_running, diamond_rip;
var ground, invisibleGround, groundImage;


var inimigosGroup, inimigo1, inimigo2, inimigo3;

var score;

var gameOverImg,restartImg


function preload(){
  trex_running = loadAnimation("diamond parado.png","diamond andando movimento 1.png","diamond andando movimento 2.png");
  //trex_rip = loadAnimation("trex_rip.png");
  
  groundImage = loadImage("ground2.png");
  
  
  inimigo1 = loadImage("inimigo parado.png");
  inimigo2 = loadImage("inimigo 3.png");
  inimigo3 = loadImage("inimigo parado ].png");
  
   restartImg = loadImage("restart.png")
  gameOverImg = loadImage("gameOver.png")
  

}

function setup() {
  createCanvas(600, 200);
  
  diamond = createSprite(50,180,20,50);
  diamond.addAnimation("andando", trex_running);
  diamond.addAnimation("collided" ,trex_rip);
  diamond.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
   gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  //criar grupos de obstáculos e nuvens
  inimigosGroup = createGroup();

  
  console.log("Olá" + 5);

  
  score = 0;
  
}

function draw() {
  
  background(180);
  //exibir pontuação
  text("Pontuação: "+ score, 500,50);
 
  
  console.log("isto é ",gameState)
  
  
  if(gameState === PLAY){
    gameOver.visible = false
    restart.visible = false
    //mover o solo
    ground.velocityX = -(4+score/100);
    //pontuação
    score = score + Math.round(frameCount/60);
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //pular quando a tecla de espaço for pressionada
    if(keyDown(LEFT_ARROW)&& diamond.x >= 100) {
        diamond.velocityX = -12;
     
    }
   if(keyDown(RIGHT_ARROW)&& daimond.x >= 100){
     diamond.velocityX = -12;
   }
  
  
  
    //gerar obstáculos no solo
    spawnInimigos();
    
    if(inimigosGroup.isTouching(diamond)){
       // gameState = END;
      diamond.velocityY =  -12
    }
  }
   else if (gameState === END) {
     console.log("hey")
      gameOver.visible = true;
      restart.visible = true;
     
      ground.velocityX = 0;
      diamond.velocityY = 0
     
      //mudar a animação do trex
      diamond.changeAnimation("destroy", inimigo_rip);
     
      //definir a vida útil dos objetos do jogo para que nunca sejam destruídos
      inimigosGroup.setLifetimeEach(-1);
   
     
      inimigosGroup.setVelocityXEach(0);
   }
  
 
  //impedir que o trex caia
  diamond.collide(invisibleGround);
  
  
  
  drawSprites();
}

function spawninimigo(){
 if (frameCount % 60 === 0){
   var inimigo = createSprite(600,165,10,40);
   inimigo.velocityX = -6;
   
    //gerar obstáculos aleatórios
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: inimigo.addImage(inimigo1);
              break;
      case 2: inimgo.addImage(inimigo2);
              break;
      case 3: inimgo.addImage(inimigo3);
              break;
      default: break;
    }
   
    //atribuir escala e vida útil ao obstáculo           
    inimigo.scale = 0.5;

   
  
 }
}






