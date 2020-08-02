class Meteorite {
    constructor(x, y, cond) {
        //Generate Random Number and Load image to meteor acc. to that
        this.rand = Math.round(random(1, 2));
        this.image = loadImage("Sprite/meteor" + this.rand + ".png");

        //Create a Meteorite Sprite
        this.body = createSprite(x, y, 20, 20);
        this.x = x;
        this.y = y;
        this.body.visible = cond;

        //Add Meteor to the Meteorite Group
        MeteoriteGroup.add(this.body);
    }

    display() {
        //Add Image to the meteor
        this.body.addImage("Meteor", this.image);

        //Make Meteorite move left or right acc. to its X position
        if (this.x > width / 2) {
            this.body.velocityX = -random(1, 5);
            this.body.velocityY = random(1, 5);
        } else {
            this.body.velocityX = random(1, 5);
            this.body.velocityY = random(1, 5);
        }

        //Destroy the meteorite when went out of screen
        if (this.body.x < -20 || this.body.x > width + 20) {
            this.body.destroy();
            Meteors = [];
        }

        //Reduce User's Health acc. to size of spawned meteor

        //Large Meteor
        if (this.body.isTouching(userShip.usership)) {
            if (this.rand === 1 && isTouch === false) {
                isTouch = true;
                userShip.health = 0;
                setTimeout(() => {
                    //userShip.health = -10;
                    //isTouch = false;
                }, 50)
            }
            //Small Meteor 
            else if (this.rand === 2 && isTouch === false) {
                isTouch = true;
                userShip.health -= 50;
                setTimeout(() => {
                    userShip.health = -10;
                }, 50)
            }
        }

        //Make EnemyShips Draw Over the Meteorites
        for (var x = 0; x < EnemyShips.length; x++) {
            if (EnemyShips[x] !== undefined) {
                EnemyShips[x].enemyship.depth = EnemyShips[x].enemyship.depth + 1 + this.body.depth;
            }
        }

        drawSprites();
    }
}