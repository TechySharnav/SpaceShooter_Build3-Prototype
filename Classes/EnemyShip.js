class Enemyship {
    constructor(x, cond) {
        this.rand = Math.round(random(1, 4));
        this.image = loadAnimation("Sprite/enemyShip" + this.rand + ".png");
        this.explodeSound = loadSound("SFX/Explosion.mp3");

        //Load Explosion Animation
        this.explodeAnimation = loadAnimation("Sprite/Explosion/1.png", "Sprite/Explosion/2.png", "Sprite/Explosion/3.png",
            "Sprite/Explosion/4.png", "Sprite/Explosion/5.png", "Sprite/Explosion/6.png", "Sprite/Explosion/7.png", "Sprite/Explosion/8.png",
            "Sprite/Explosion/9.png", "Sprite/Explosion/10.png")

        this.enemyship = createSprite(random(width / 2 - 200, width / 2 + 200), -20, 50, 50);
        this.x = x;
        this.x1 = this.x;
        this.y = this.enemyship.y;
        this.enemyship.velocityY = 2;

        this.enemyship.addAnimation("Explosion", this.explodeAnimation);
        this.enemyship.addAnimation("EneShip", this.image);

        this.enemyship.visible = cond;

        this.health = 100;

        EnemyShipGroup.add(this.enemyship);
    }

    display() {
        background(0);
        this.enemyship.changeAnimation("EneShip", this.image);

        for (var ix = 0; ix < Meteors.length; ix++) {
            this.enemyship.depth = Meteors[ix].depth + 1;
        }

        this.enemyship.x = this.x;

        setTimeout(() => {
            this.enemyship.velocityY = 0;
        }, 2000);

        if (gameState === 1) {
            setTimeout(() => {
                this.enemyship.velocityY = 6;
            }, 10000)

        }


        if (this.enemyship.y > height + 20) {
            RedBulletsGroup.removeSprites();
            EnemyShipGroup.removeSprites();
        }



        if (maxEnemyCount < 0) {
            this.health = 100;
            maxEnemyCount = 5;
        }

        drawSprites();
    }

    explode() {
        if (this.health === 0) {
            this.enemyship.changeAnimation("Explosion", this.explodeAnimation);
            this.enemyship.velocityY = 0;
            this.explodeSound.play();
            setTimeout(() => {
                this.enemyship.destroy();
            }, 350);
        }
    }
}