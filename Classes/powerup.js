class Powerup {
    constructor() {
        //Generate Random Number which decides what powerup will spawn
        this.rand = Math.round(random(1, 3));

        //Load Powerup Images for Identification
        this.ShieldpowerImg = loadImage("https://techysharnav.github.io/SpaceShooter_Build3-Prototype/Sprite/Powerups/Shield.png");
        this.ScoreImg = loadImage("https://techysharnav.github.io/SpaceShooter_Build3-Prototype/Sprite/Powerups/Score.png");
        this.LifeImg = loadImage("https://techysharnav.github.io/SpaceShooter_Build3-Prototype/Sprite/Powerups/Life.png");

        //Load Shield Image
        this.shield = loadImage("https://techysharnav.github.io/SpaceShooter_Build3-Prototype/Sprite/shield.png");

        //Create Powerup Body Sprite
        this.body = createSprite(random(width * 0.1, width * 0.9), -10);
        this.body.scale = 0.2;
        //this.body.veloctiyY = 6;

        //Create Shield Body Sprite
        this.shieldBody = createSprite(50, 50);
        this.shieldBody.visible = false;
    }
    display() {
        if (gameState === 1) {
            //Spawn Shield Powerup if Random Number is 1
            if (this.rand === 1) {
                //Add image to shield powerup
                this.body.addImage("ShieldPowerup", this.ShieldpowerImg);

                //Conditions for powerup to show its effect
                if (this.body.isTouching(userShip.usership) && isTouch === false) {
                    this.body.destroy();
                    this.shieldBody.visible = true;
                    this.shieldBody.addImage("Shield", this.shield)

                    timeout = setTimeout(() => {
                        this.shieldBody.destroy();
                        Powerups = [];
                        isTouch = false;
                    }, 10000)
                }

                //Code for What Shield Does to Bullets and its Position
                this.shieldBody.x = userShip.usership.x;
                this.shieldBody.y = userShip.usership.y;

                for (var k = 0; k < RedBullets.length; k++) {
                    if (this.shieldBody.isTouching(RedBullets[k].body)) {
                        RedBullets[k].body.destroy();
                    }
                }

                //Destroy Shield if User collides into Enemy Ship
                for (var a = 0; a < EnemyShipGroup.length; a++) {
                    tempShip = EnemyShipGroup[a];
                    tempEneShip = EnemyShips[a];

                    if (this.shieldBody.isTouching(tempShip)) {
                        Score += 100;
                        tempEneShip.health = 0;
                        clearTimeout(timeout);
                        this.shieldBody.destroy();
                    }
                }
            }

            //Spawn Score Powerup if Random Number is 2
            if (this.rand === 2) {
                //Add Image to Powerup 
                this.body.addImage("ScorePowerup", this.ScoreImg);
                //Conditions for powerup to show its effect(Increase Score by 500)
                if (this.body.isTouching(userShip.usership) && isTouch === false) {
                    this.body.destroy();
                    Score += 500;
                    ScoreUpSound.play();
                }
            }

            //Spawn Life Up Powerup if Random Number is 3
            if (this.rand === 3) {
                this.body.visible = false;
                if (userShip.lives < 3) {
                    //Add Image to Powerup if user has less than 3 lives
                    this.body.visible = true;
                    this.body.addImage("LifePowerup", this.LifeImg);
                    //Conditions for powerup to show its effect(Increase User Lives by 1)
                    if (this.body.isTouching(userShip.usership) && isTouch === false) {
                        this.body.destroy();
                        LifeGainSound.play();
                        userShip.lives += 1;
                    }
                } else {
                    this.body.destroy();
                }
            }

            //Destroy the Powerup Sprite when Moved out of Screen
            if (this.body.y > height) {
                this.body.destroy();
            }

            drawSprites();
        } else {
            this.body.destroy();
        }
    }
}