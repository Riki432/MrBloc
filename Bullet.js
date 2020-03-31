class Bullet {
    constructor(angle) {
        this.pos = p5.Vector.fromAngle(angle);
        this.moveCounter = 0;


        this.move = () => this.pos.setMag(this.moveCounter);

        this.draw = (ship) => {
            noStroke();
            this.moveCounter += enemySpeed;
            push();
            translate(width / 2, height / 2);
            imageMode(CENTER);
            image(bullet, this.pos.x, this.pos.y, 20, 20);
            pop();
        };
        
        this.isOutOfView = function () {
            return this.moveCounter > 2000;
        };
        
    }
}


