function Bullet(angle){
    this.pos = p5.Vector.fromAngle(angle);
    this.moveCounter = 0;
    this.color = color(200, 0, 255);
    this.move = () =>  this.pos.setMag(this.moveCounter);
    
    this.draw = (ship) => {
        noStroke();
        this.moveCounter+=10;
        push();
        translate(width/2, height/2);
        // fill(this.color);
        imageMode(CENTER);
        image(bullet, this.pos.x, this.pos.y, 20, 20);
        // ellipse(this.pos.x, this.pos.y, 20, 20 );
        pop();
        
    }

    this.isOutOfView = function(){
        return this.moveCounter > 2000;
    }

    // this.hitEnemy = function(enemy){
    //     let d = p5.Vector.dist(enemy.pos, this.pos);
    //     if(d < 50) {
    //         console.log(this.pos);
    //         console.log(d);
    //         // this.color = color(255, 0, 0);
    //     }
    // }

}


