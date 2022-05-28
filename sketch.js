var PLAY = 1;
var END = 0;
var gameState = PLAY;

var diamond, diamond_running, diamond_rip;
var ground, invisibleGround, groundImage;


var inimigosGroup, inimigo1, inimigo2, inimigo3;

var score;

var gameOverImg,restartImg


function preload(){
  diamond_running = loadAnimation("assets/diamondparado.png","assets/diamondandandomovimento1.png","assets/diamondandandomovimento2.png");
  
  groundImage = loadImage("assets/ground2.png");
  
  
  inimigo1 = loadImage("assets/inimigoparado.png");
  inimigo2 = loadImage("assets/inimigo2.png");
  inimigo3 = loadImage("assets/inimigoparado.png");
  
  restartImg = loadImage("assets/restart.png")
  gameOverImg = loadImage("assets/gameOver.png")
  

}

function setup() {
  createCanvas(600, 200);
  
  diamond = createSprite(50,180,20,50);
  diamond.addAnimation("andando", diamond_running);
  //diamond.addAnimation("collided" ,trex_rip);
  diamond.scale = 0.5;
  diamond.debug = true
  diamond.setCollider("circle", 0,0,50)
  
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
    spawninimigo();
    
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
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: inimigo.addImage(inimigo1);
              break;
      case 2: inimigo.addImage(inimigo2);
              break;
      case 3: inimigo.addImage(inimigo3);
              break;
      default: break;
    }
   
    //atribuir escala e vida útil ao obstáculo           
    inimigo.scale = 0.5;

   
  
 }
}



/*                 notas da prof
Oii Bento, tudo bem?

 Seu jogo está ficando muito bom, eu consertei TODOS os bugs que encontrei,
 mas ainda falta fazer bastante coisa no jogo, vi que você fez muita coisa na base do Trex
 e ta tudo bem!! mas tente evitar de usar o copia e cola demais ok? A maioria dos bugs
 que encontrei era relacionado a "sintaxe", ou seja, tente prestar um pouco mais de atenção
 quando for digitar ok? Você já esta no caminho certo, continue assim!


 OBS: Na hora de criar arquivos de imagem evite usar tracinhos e espaços ok? 
 se underline_para_separar_as_palavras, o pc fica bem mais feliz assim! :D

 Até a proxima aula.

 HAAAAAAPY HACKING!
*/


