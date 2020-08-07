class Usership {
    constructor(cond) {
        //Load Graphics and Sound
        this.image = loadImage("https://techysharnav.github.io/SpaceShooter_Build3-Prototype/Sprite/player.png");
        this.damageImg = loadImage("https://techysharnav.github.io/SpaceShooter_Build3-Prototype/Sprite/playerDamaged.png");
        this.LifeImg = loadImage("https://techysharnav.github.io/SpaceShooter_Build3-Prototype/Sprite/life.png");
        this.explodeSound = loadSound("https://techysharnav.github.io/SpaceShooter_Build3-Prototype/SFX/Explosion.mp3");

        //Load Explosion Animation
        this.explodeAnimation = loadAnimation("https://techysharnav.github.io/SpaceShooter_Build3-Prototype/Sprite/Explosion/1.png", "https://techysharnav.github.io/SpaceShooter_Build3-Prototype/Sprite/Explosion/2.png", "https://techysharnav.github.io/SpaceShooter_Build3-Prototype/Sprite/Explosion/3.png",
            "https://techysharnav.github.io/SpaceShooter_Build3-Prototype/Sprite/Explosion/4.png", "https://techysharnav.github.io/SpaceShooter_Build3-Prototype/Sprite/Explosion/5.png", "https://techysharnav.github.io/SpaceShooter_Build3-Prototype/Sprite/Explosion/6.png", "https://techysharnav.github.io/SpaceShooter_Build3-Prototype/Sprite/Explosion/7.png", "https://techysharnav.github.io/SpaceShooter_Build3-Prototype/Sprite/Explosion/8.png",
            "https://techysharnav.github.io/SpaceShooter_Build3-Prototype/Sprite/Explosion/9.png", "https://techysharnav.github.io/SpaceShooter_Build3-Prototype/Sprite/Explosion/10.png")

        //Create User Ship Sprite
        this.usership = createSprite(width / 2, height - 70, 50, 50);
        this.usership.visible = cond;

        //Create Life1 sprite
        this.Life1 = createSprite(width * 0.1 - 60, height * 0.05);
        this.Life1.addImage("Life1", this.LifeImg);
        this.Life1.visible = false;

        //Create Life2 sprite
        this.Life2 = createSprite(width * 0.13 - 50, height * 0.05);
        this.Life2.addImage("Life2", this.LifeImg);
        this.Life2.visible = false;

        //Create Life3 sprite    
        this.Life3 = createSprite(width * 0.16 - 40, height * 0.05);
        this.Life3.addImage("Life3", this.LifeImg);
        this.Life3.visible = false;


        //Set User Ship's initial health to 100 and User Lives to 3
        this.health = 100;
        this.lives = 3;
    }

    display() {
        background(0);
        //Add Graphics to user ship
        this.usership.addAnimation("userExplode", this.explodeAnimation);
        this.usership.addImage("Damage", this.damageImg);
        this.usership.addImage("Ship", this.image);

        //Change User Ship Image when user takes 50 Damage
        if (this.health <= 50) {
            this.usership.changeImage("Damage", this.damageImg);
        } else {
            this.usership.changeImage("Ship", this.image);
        }

        //Make Life Sprites Visible while gamestate is 1
        if (gameState === 1) {
            this.Life1.visible = true;
            this.Life2.visible = true;
            this.Life3.visible = true;
        }
        if (this.lives > 3) {
            this.lives = 3;
        }

        //Conditions to display which Life Sprite acc. to number of User Lives
        if (this.lives === 3) {
            this.Life1.visible = true;
            this.Life2.visible = true;
            this.Life3.visible = true;
        } else if (this.lives === 2) {
            this.Life1.visible = true;
            this.Life2.visible = true;
            this.Life3.visible = false;
        } else if (this.lives === 1) {
            this.Life1.visible = true;
            this.Life2.visible = false;
            this.Life3.visible = false;
        } else if (this.lives === 0) {
            this.Life1.visible = false;
            this.Life2.visible = false;
            this.Life3.visible = false;
        }


        //Set of code to Execute when UserShip's health reaches to 0
        if (this.health <= 0) {
            LifeLostSound.play();
            this.health = 100;
            this.lives -= 1;
            touch.length = 1;
            this.usership.x = width / 2;
            this.usership.y = height - 70;
            //User Gets Stunned for 5 Seconds i.e User can't move ship 
            setTimeout(() => {
                if (gameState === 1 && isTouch === true) {
                    this.health = 100;
                    isTouch = false;
                }
            }, 5000)
        }

        //Make UserShip move with the mouse
        if (gameState === 1 && isTouch === false) {
            if (touch.length === 0) {
                this.usership.x = touch[0].x;
                this.usership.y = touch[0].y;
            } else {
                for (var t = 1; t < touch.length; t++) {
                    if (touch[t][0] !== undefined) {
                        this.usership.x = touch[t][0].x;
                        this.usership.y = touch[t][0].y;
                    }
                    /* else {
                                           this.usership.x = width / 2;
                                           this.usership.y = height - 70;
                                       } */
                }
            }
        }


        //Check Collision between UserShip and EnemyShip and Code to execute when it happens
        for (var b = 0; b < EnemyShips.length; b++) {
            if (this.usership.isTouching(EnemyShips[b].enemyship) && isTouch === false) {
                isTouch = true;
                Score -= 100;
                EnemyShips[b].health = 0;
                this.health = 0;
                setTimeout(() => {
                    this.health = -10;
                    this.lives += 1;
                }, 50)
            }
        }



        drawSprites();
    }
}