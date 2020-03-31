function Ship(){
    this.pos = createVector(width/2, height/2);


    this.draw = function(angle){
        push();
        translate(this.pos.x, this.pos.y);
        rotate(angle);
        fill(255,0,0);
        rectMode(CENTER);
        rect(0, 0, 70, 70);
        imageMode(CENTER);
        image(goodSq, 0, 0, 70, 70);
        pop();
        // fill(255, 0, 0)
    }

    this.isHit = function(enemy){
         return abs(enemy.pos.x) < 70 && abs(enemy.pos.y) < 60
    }

    
}