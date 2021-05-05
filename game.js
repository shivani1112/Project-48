class Game{
    constructor(){
        this.startButton = createSprite(width/2+200,height-100);
        this.startImg = loadImage("images/play.png");
        this.gameOver = createSprite(width/2,height/2);
        this.gameOverImg = loadImage("images/gameOver.png");
        this.gameOver.addImage(this.gameOverImg);
        this.castle = createSprite(7500,height/2);
        this.castleImg = loadImage("images/castle.png");
        this.castle.addImage(this.castleImg);
        // this.castle.debug = true;
        //this.castle.setCollider("rectangle",0,0,this.castle.width-50,this.castle.height);
        this.youWin = createSprite(width/2,height/2);
        this.youWinImg = loadImage("images/youWin.png");
        this.youWin.addImage(this.youWinImg);
        // this.gameOver.scale = 0.5;
        this.gameOver.visible = false; 
        this.startButton.addImage(this.startImg);
        this.startButton.scale = 0.5;
        this.wolfImg = loadImage("images/wolf.png");
        this.x = width;
        this.redImg = loadImage("images/red ridding hood.png");
        this.hoodArray = [];
        this.jumpHeight = 500;
        this.goingUp = 0;
        this.goingDown = 1;
        this.hoodGroup = new Group();
        this.wolfGroup = new Group();
        this.velocity = -10;

        this.winMusic = loadSound("sound/youwin.mp3");
        this.deathMusic = loadSound("sound/death.mp3");
    }
    start(){
        textSize(50);
        textFont("Amsterdam");
        noStroke();
        fill("yellow");
        text ("Cut And Run",width/2-200,height/2-200);
        player.sprite.visible = false;
        ground.visible = false;
        textSize(30);
    
        
        text ("You are Nova who is going to the capital to get a a job in the palace,  you",width/2-700,height/2);
        text("on your way there",width/2-200,height/2+50);
        text("you meet the demon wolf and his master who are coming in your way to", width/2-700,height/2+100);
        text("to save your life you have to reach the castel as soon as possible", width/2-300,height/2+150);
        if(mousePressedOver(this.startButton)){
            gameState = 1;
        }
        this.youWin.visible = false;
        }
    play(){
        player.sprite.visible = true;
        ground.visible = false;
        console.log(player.sprite.x);
        this.startButton.visible = false;
        camera.position.x = player.sprite.x;
        ground.x = camera.position.x; 
        if(keyIsDown (32)){
            player.sprite.velocityY = -20;    
        }
        player.gravity(0.6);
        player.sprite.collide(ground);
        this.spawnWolf();
        this.spawnHood();

        player.sprite.depth = this.castle.depth+1;
        for(var i =0; i<this.hoodArray.length;i++){
    
  
            if(this.hoodArray[i].y < height-200 - this.jumpHeight ){      //Going Up
                this.goingDown = 1;
                this.goingUp = 0;  
                }  
              //else if(player.y > playerYPosition + 50){ //Going Down
              if(this.hoodArray[i].y > height-200 + this.jumpHeight ){
                this.goingUp = 1;
                this.goingDown = 0;
                //atRest = 0;
                //player.shapeColor = "green";
               }
                if(this.goingUp == 1) this.hoodArray[i].y -= 5;
                if(this.goingDown == 1 ) this.hoodArray[i].y += 5;
             }
             if(player.sprite.isTouching(this.wolfGroup)|| player.sprite.isTouching(this.hoodGroup)){
                 gameState=2;
                 this.deathMusic.play();
             }
             if(player.sprite.isTouching(this.castle)){
                 gameState = 3;
                 this.winMusic.play();
             }
          
    }
    end(){
        player.sprite.velocityX = 0;
        player.sprite.velocityY = 0;
        player.gravity(0);
        player.sprite.changeAnimation("death",player.deathImg);
        this.gameOver.x = camera.position.x;
        this.gameOver.visible = true;
        this.hoodGroup.destroyEach();
        this.wolfGroup.destroyEach();
        this.gameOver.depth = player.sprite.depth+1;
    }
    win(){
        this.youWin.visible = true;
        this.youWin.x = camera.position.x;
        player.sprite.destroy();
        this.hoodGroup.destroyEach();
        this.wolfGroup.destroyEach();
        this.castle.destroy();
    }
    spawnWolf(){
        if(frameCount%60 === 0 && this.x<6000){
            this.x = this.x +600;
            var wolf = createSprite(this.x,height-75,10,10);
            wolf.addImage(this.wolfImg);
            //wolf.debug= true;
            wolf.setCollider("rectangle", 0,0,300,300);
            wolf.scale = 0.4;
            this.wolfGroup.add(wolf);
            
        }
    }
    spawnHood(){
        if(World.frameCount%10 === 0 && this.x<6000){
        this.x = this.x+750;
        var hood = createSprite(this.x,height-75,10,10);
        hood.addImage(this.redImg);
        //hood.debug = true;
        hood.setCollider("rectangle",0,0,200,200);
        hood.scale = 0.4;
        this.hoodGroup.add(hood);
        this.hoodArray.push(hood);
        }
      }
}
