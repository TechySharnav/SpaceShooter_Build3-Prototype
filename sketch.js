//All Variable Declarations
var gameState = 1;
var dial1, dial2, dial3, dial4, dial5, dial6;
var bgImg;
var restartBtn, bg, restartBtnImg;
var touchCount = 0;
var userShip, usership, enemyship, body, tempShip, tempEneShip, timeout;
var EnemyShips = [];
var EnemyShipGroup, GreenBulletsGroup, MeteoriteGroup, RedBulletsGroup, temp, rand;
var maxEnemyCount = 4;
var Meteors = [];
var GreenBullets = [];
var RedBullets = [];
var Powerups = [];
var explodeAnimation;
var Score = 0;
var isTouch = false;
var displayRule = true;
var shootBtn, shootBtnImage;
var isPressed = false;
var isTouched = false;
var touch = []
var isShooting = false;
var time = 30;

function preload() {
  //Load Disalouges 
  dial1 = loadSound("https://techysharnav.github.io/SpaceShooter_Build3-Prototype/SFX/d1.mp3");
  dial2 = loadSound("https://techysharnav.github.io/SpaceShooter_Build3-Prototype/SFX/d2_1.mp3");
  dial3 = loadSound("https://techysharnav.github.io/SpaceShooter_Build3-Prototype/SFX/d3_3.mp3");
  dial4 = loadSound("https://techysharnav.github.io/SpaceShooter_Build3-Prototype/SFX/d4.mp3");
  dial5 = loadSound("https://techysharnav.github.io/SpaceShooter_Build3-Prototype/SFX/d5.mp3");
  dial6 = loadSound("https://techysharnav.github.io/SpaceShooter_Build3-Prototype/SFX/d6_6.mp3");

  //Load SFX
  RedBulletSound = loadSound("https://techysharnav.github.io/SpaceShooter_Build3-Prototype/SFX/EnemyShoot.mp3");
  GreenBulletSound = loadSound("https://techysharnav.github.io/SpaceShooter_Build3-Prototype/SFX/Shoot.mp3");
  MeteorSound = loadSound("https://techysharnav.github.io/SpaceShooter_Build3-Prototype/SFX/MeteorSwoosh.mp3");
  halfDamageSound = loadSound("https://techysharnav.github.io/SpaceShooter_Build3-Prototype/SFX/half_damaged.mp3")
  LifeLostSound = loadSound("https://techysharnav.github.io/SpaceShooter_Build3-Prototype/SFX/LifeLost.mp3");
  LifeGainSound = loadSound("https://techysharnav.github.io/SpaceShooter_Build3-Prototype/SFX/LifeGain.mp3");
  ScoreUpSound = loadSound("https://techysharnav.github.io/SpaceShooter_Build3-Prototype/SFX/ScoreUp.mp3");

  //Load NextButton Image
  restartBtnImg = loadImage("https://techysharnav.github.io/SpaceShooter_Build3-Prototype/Sprite/restartBtn.png");

  //Load BG Image
  bgImg = loadImage("https://techysharnav.github.io/SpaceShooter_Build3-Prototype/Sprite/Background/BG2.png");

  //Load ShootButton Image
  shootBtnImage = loadImage("https://techysharnav.github.io/SpaceShooter_Build3-Prototype/Sprite/shootBtn.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  //Create a Background Sprite
  bg = createSprite(width / 2, height / 2, width, height);
  bg.addImage("Background", bgImg);
  bg.visible = false;

  //Create a User ship with no visibility
  userShip = new Usership(false);

  //Create Groups for Various Objects
  EnemyShipGroup = Group();
  GreenBulletsGroup = Group();
  RedBulletsGroup = Group();
  MeteoriteGroup = Group();

  //Spawn Enemies
  if (maxEnemyCount === 5) {
    for (var i = 0; i < maxEnemyCount; i++) {
      EnemyShips.push(new Enemyship(width / 5 + i * 175, false));
    }
  }
  //Add Initial Fixed Point
  touch = [{
    x: width / 2,
    y: height - 70
  }];

  //Shoot Button Sprite
  shootBtn = createSprite(width * 0.1, height - 150);
  shootBtn.addImage("Shoot", shootBtnImage);
  shootBtn.scale = 0.5;
  shootBtn.visible = false;

  //Restart Button Sprite
  restartBtn = createSprite(width / 2, height / 2);
  restartBtn.addImage("Restart", restartBtnImg);
  restartBtn.visible = false;
}

function draw() {
  if (gameState === 0) {

    //Display Rules
    if (displayRule === true) {
      textSize(50);
      text("Rules", width / 2 - 70, height * 0.1);
      textSize(25);
      text("1. You have Total of 4 lives to play the Game", width / 2 - 280, height * 0.2);
      text("2. You can Control Ship using Mouse", width / 2 - 280, height * 0.3);
      text("3. User has ability to pickup power-ups", width / 2 - 280, height * 0.4);
      text("4. You Have to destroy As many Enemy Ships as Possible", width / 2 - 280, height * 0.5);
      text("5. Shields only protect you from the bullets.", width / 2 - 280, height * 0.6);
    } else {
      noFill();
    }

    textSize(25);
    strokeWeight(3);

    dialTouch();

    //Play Dialogues after Clicking Next Button
    if (touches.length === 1 && isPressed === false && touchCount === 1) {
      displayRule = false;
      isPressed = true;
      background(0);
      fill("white");
      text("Colonel: Unusal Space Activity is Detected in Outer Atmosphere. \n  Action Order need to be released ASAP.", width / 3 - 200, height / 2);
      dial1.play();
      setTimeout(() => {
        isPressed = false;
        isTouched = false;
      }, 7000);

    }
    if (touches.length === 1 && isPressed === false && touchCount === 2) {
      background(0);
      isPressed = true;
      fill("white");
      text("Alien Ship Captain: Let's invade this Primitive Ball of Mud, so called Earth. \n Establish Connection with Earth Space Observatory.", width / 3 - 300, height / 2);
      dial2.play();
      setTimeout(() => {
        isPressed = false;
        isTouched = false;
      }, 7000);
    }
    if (touches.length === 1 && isPressed === false && touchCount === 3) {
      isPressed = true;
      background(0);
      fill("white");
      dial2.stop();
      text("Alien Ship Captain (to Colonel): Surrender to us as our planet's servant or \n we would invade Earth Happily.", width / 2 - 400, height / 2);
      dial3.play();
      setTimeout(() => {
        isPressed = false;
        isTouched = false;
      }, 4000);

    }
    if (touches.length === 1 && isPressed === false && touchCount === 4) {
      isPressed = true;
      background(0);
      dial3.stop();
      fill("white");
      text("Colonel (to Alien Ship Captain): No mercies in war. Equal on both sides, we \n would rather choose to fight, than to serve.", width / 2 - 400, height / 2);
      dial4.play();
      setTimeout(() => {
        isPressed = false;
        isTouched = false;
      }, 6000);
    }
    if (touches.length === 1 && isPressed === false && touchCount === 5) {
      isPressed = true;
      background(0);
      fill("white");
      dial4.stop();
      text("Colonel (to others): Assemble a Team of our best fighters and spaceships, \n to attack those Beings.", width / 2 - 400, height / 2);
      dial5.play();
      setTimeout(() => {
        isPressed = false;
        isTouched = false;
      }, 5000);
    }
    if (touches.length === 1 && isPressed === false && touchCount === 6) {
      isPressed = true;
      dial5.stop();
      background(0);
      fill("white");
      text("Alien Ship Captain: As your wish, be ready for an Interplanetary War.", width / 2 - 350, height / 2);
      dial6.play();
      setTimeout(() => {
        isPressed = false;
        isTouched = false;
      }, 3000);
    }

    //Set GameState to 1 after All the Dialogues
    if (touches.length === 1 && isPressed === false && touchCount === 7) {
      gameState = 1;
      dial6.stop();
      frameCount = 0;
      EnemyShipGroup.removeSprites();
      EnemyShips = [];
      RedBullets = [];
      RedBulletsGroup.removeSprites();
      MeteoriteGroup.removeSprites();
      Meteors = [];
    }
  }

  if (gameState === 1) {
    background(255);

    //Scroll BG upwards to give the Moving Effect
    bg.visible = true;
    bg.velocityY = 3;

    //Set Shoot Button's Visibility to true
    shootBtn.visible = true;

    restartBtn.visible = false;

    //Reset BG to center after moving out of Screen
    if (bg.y > height * 0.54) {
      bg.y = height / 2;
    }

    if (frameCount % 30 === 0) {
      time = time - 1;
    }
    if (time < 0) {
      time = 0;
    }
    if (time === 0) {
      gameState = 3;
    }

    // userShip.usership.changeImage("userShip", userShipImage);

    //Display UserShip
    userShip.usership.visible = true;
    userShip.display();

    //Display EnemyShips
    for (var j = 0; j < EnemyShips.length; j++) {
      EnemyShips[j].enemyship.visible = true;
      EnemyShips[j].display();
      EnemyShips[j].explode();
    }

    //Function Called
    EnemyShipHealth();

    if (isShooting === false && GreenBullets.length >= 0) {
      touchStarted();
    }


    //Spawn New Meteor every 20 seconds
    if (frameCount > 0 && frameCount % 600 === 0) {
      MeteorSound.play();
      Meteors.push(new Meteorite(random(width * 0.25, width * 0.75), -30, false));
    }

    //Make Random Enemy Shoot Bullet Every Second
    if (frameCount > 0 && frameCount % 30 === 0 && EnemyShipGroup.length !== 0) {
      rand = Math.round(random((0, EnemyShipGroup.length - 1)));
      if (EnemyShipGroup[rand].health !== 0) {
        RedBulletSound.play();
        RedBullets.push(new laserBullet(EnemyShipGroup[rand].x, EnemyShipGroup[rand].y + 20, "Red"));
      }
    }

    //Spawn Powerups Every 30 seconds
    if (frameCount % 900 === 0) {
      Powerups.push(new Powerup());
    }

    //Display Powerupps and make it move towards the user
    for (var c = 0; c < Powerups.length; c++) {
      if (Powerups.length !== 0) {
        Powerups[c].display();
        Powerups[c].body.velocityY = 6;
      }
    }

    //Empty all the arrays and Groups when all Enemy Ships are killed
    //(Memory Management) and Spawn New EnemyShips again
    if (EnemyShipGroup.length === 0) {
      EnemyShipGroup.removeSprites();
      RedBulletsGroup.removeSprites();
      GreenBulletsGroup.removeSprites();
      EnemyShips = [];
      GreenBullets = [];
      RedBullets = [];
      touch.length = 1;
      for (var i = 0; i < maxEnemyCount; i++) {
        EnemyShips.push(new Enemyship(width / 5 + i * 175, true));
      }
    }

    //Display Meteors
    for (var i = 0; i < Meteors.length; i++) {
      Meteors[i].body.visible = true;
      Meteors[i].display();
    }



    //Display User Shot Green Bullets and remove them from array, if went out of Screen
    for (var z = 0; z < GreenBullets.length; z++) {
      GreenBullets[z].display();
      if (GreenBullets[z].body.y < -10) {
        GreenBullets.splice(z, 1);
      }
    }

    //Display Enemy Shot Red Bullets and remove them from array, if went out of Screen
    for (var b = 0; b < RedBullets.length; b++) {
      RedBullets[b].display();
      if (RedBullets[b].body.y > height) {
        RedBullets.splice(b, 1);
      }
    }

    //Change GameState to 2 when user has no lives left
    if (userShip.lives < 0 && userShip.lives > -10) {
      userShip.lives = -11;
      userShip.explodeSound.play();
      gameState = 2;
    }
  }

  if (gameState === 2) {
    //Make UserShip Explode
    userShip.usership.changeAnimation("userExplode", userShip.explodeAnimation);
    setTimeout(() => {
      userShip.usership.visible = false;
    }, 350)
    //Remove all the Sprites from Group and Empty the Array
    RedBulletsGroup.removeSprites();
    GreenBulletsGroup.removeSprites();
    MeteoriteGroup.removeSprites();
    Powerups = [];
    RedBullets = [];
    GreenBullets = [];
    Meteors = [];

    bg.velocityY = 0;

    restartBtn.visible = true;

    if (touches.length === 1) {
      if (touches[0].x !== undefined) {
        if (touches[0].x > restartBtn.x - 64 && touches[0].x < restartBtn.x + 64) {
          if (touches[0].y > restartBtn.y - 32 && touches[0].y < restartBtn.x + 32) {
            gameState = 1;
            EnemyShips = [];
            EnemyShipGroup.removeSprites();
            userShip.lives = 3;
            Score = 0;
            frameCount = 0;
            isTouch = false;
            userShip.health = 100;
            time = 30;
          }
        }
      }
    }

  }

  if (gameState === 3) {
    //Remove all the Sprites from Group and Empty the Array
    RedBulletsGroup.removeSprites();
    GreenBulletsGroup.removeSprites();
    MeteoriteGroup.removeSprites();
    Powerups = [];
    RedBullets = [];
    GreenBullets = [];
    Meteors = [];

    bg.velocityY = 0;

    restartBtn.visible = true;

    if (touches.length === 1) {
      if (touches[0].x !== undefined) {
        if (touches[0].x > restartBtn.x - 64 && touches[0].x < restartBtn.x + 64) {
          if (touches[0].y > restartBtn.y - 32 && touches[0].y < restartBtn.x + 32) {
            gameState = 1;
            EnemyShips = [];
            EnemyShipGroup.removeSprites();
            userShip.lives = 3;
            Score = 0;
            frameCount = 0;
            isTouch = false;
            userShip.health = 100;
            time = 30;
          }
        }
      }
    }

  }


  drawSprites();
  fill("White")
  //Display Scores when game is in Play state
  if (gameState === 1) {
    textSize(20);
    text("Score: " + Score, width - 150, height * 0.1);
    text("TIME REMAINING: \n" + time + " sec", width *0.02, height * 0.8)
  }
  //Display Score and Game Over text when game is in Over State
  if (gameState === 2) {
    textSize(25);
    text("Score: " + Score, width / 2, height * 0.25);
    text("GAME OVER!!", width / 2, height / 2 - 40);
    textSize(18);
  }
  if (gameState === 3) {
    textSize(25);
    text("Score: " + Score, width / 2, height * 0.25);
    text("TIME UP!!", width / 2, height / 2 - 40);
    textSize(18);
  }
}


/* function keyPressed() {
  //Make UserShip shoot Bullet when user Presses SPACE key
  if (keyCode === 32) {
    GreenBulletSound.play();
    GreenBullets.push(new laserBullet(userShip.usership.x - 30, userShip.usership.y + 10, "Green"));
  }

  //Reset the GameState to 1 when user presses R key
  if (keyIsDown(82) && gameState === 2) {
    gameState = 1;
    EnemyShips = [];
    EnemyShipGroup.removeSprites();
    userShip.lives = 3;
    Score = 0;
    frameCount = 0;
    isTouch = false;
    userShip.health = 100;
  }
} */

//Remove the Enemy Ships from array, if their Health reaches zero
function EnemyShipHealth() {
  for (var g = 0; g < EnemyShips.length; g++) {
    if (EnemyShips[g].health === 0) {
      EnemyShips.splice(g, 1);
    }
  }
}

function dialTouch() {
  if (touches.length === 1 && isTouched === false) {
    isTouched = true;
    touchCount += 1;
    //console.log(touches);
  }
}

function touchMoved() {
  if (gameState === 1) {
    touch.push(touches);
  }
  return false;
}

function touchStarted() {
  if (gameState === 1) {
    if (touches[touches.length - 1] !== undefined) {
      if (touches[touches.length - 1].x > shootBtn.x - 64 && touches[touches.length - 1].x < shootBtn.x + 64) {
        if (touches[touches.length - 1].y >= shootBtn.y - 64 && touches[touches.length - 1].y <= shootBtn.y + 64) {
          GreenBulletSound.play();
          GreenBullets.push(new laserBullet(userShip.usership.x - 30, userShip.usership.y + 10, "Green"));
          isShooting = true;
        }
      }
    }
  }

}

function touchEnded() {
  isShooting = false;
}
