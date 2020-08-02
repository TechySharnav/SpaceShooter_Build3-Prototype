class laserBullet {
    constructor(x, y, color) {
        //Assign color and Load Bullet Image acc. to that
        this.color = color;
        this.img = loadImage("Sprite/laser" + this.color + ".png");

        //Create Bullet Sprite
        this.body = createSprite(x, y, 5, 20);

        //Add Bullet to respective group acc. to its color
        if (this.color === "Green") {
            GreenBulletsGroup.add(this.body);
        } else {
            RedBulletsGroup.add(this.body);
        }
    }

    display() {
        //Add image to bullet
        this.body.addImage("Bullet", this.img);

        //Make Bullet Move Upwards or downwards acc. to its color
        if (this.color === "Green") {
            this.body.velocityY = -7;
        } else {
            this.body.velocityY = 7;
        }

        //Destroy bullet when went out of screen
        if (this.body.y < -10 || this.body.y > height) {
            this.body.destroy();
        }

        //Check for Green bullet hitting the Enemy Ships
        for (var a = 0; a < EnemyShipGroup.length; a++) {
            tempShip = EnemyShipGroup[a];
            tempEneShip = EnemyShips[a];

            if (this.color === "Green") {
                if (this.body.isTouching(tempShip)) {
                    this.body.destroy();
                    Score += 100;
                    if (tempEneShip !== undefined) {
                        tempEneShip.health = 0;
                    }
                }
            }
            //Check for Red Bullet hitting userShip
            else {
                if (this.body.isTouching(userShip.usership)) {
                    this.body.destroy();
                    if (isTouch !== true) {
                        userShip.health -= 50;
                        halfDamageSound.play();
                        Score -= 50;
                    }
                }
            }
        }

        //Destroy the bullet if it touches the Meteors
        if (this.body.isTouching(MeteoriteGroup)) {
            this.body.destroy();
        }

        drawSprites();
    }
}