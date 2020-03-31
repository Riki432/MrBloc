function Enemy(){
    let side = random(0, 100);
    let x, y;
    let target = createVector(0, 0);
    this.dead = false;
    this.radius = random(minEnemySize, maxEnemySize);
    
    if(side < 25){
        /// From the left side for the display
        x = random(-width/2 - 50, -width/2 - 10);
        y = random(0, height);        
    }
    else if(side < 50){
        // From the bottom side
        x = random(-width/2, width/2);
        y = random(height/2 + 10, height/2 + 50)        
    }else if(side < 75){
        // From the right side
        x = random(width/2 + 10, width/2 + 50)
        y = random(-height/2, height/2);
    }else{
        // From the top side
        x = random(-width/2, width/2);
        y = random(-height/2 -10, -height/2 - 50);
    }

    this.pos = createVector(x, y);
    this.direction = p5.Vector.sub(this.pos, target); 
    this.direction.mult(-1);
    this.direction.setMag(enemySpeed);
    this.draw = function(){
        noStroke();
        push();
        translate(width/2, height/2);
        imageMode(CENTER);
        image(badSq, this.pos.x, this.pos.y, this.radius, this.radius);
        fill(255);
        point(0, 0)
        pop();
    }

    this.move = function(ship){
        stroke(255);
        strokeWeight(2);
        this.pos.add(this.direction);
    }

    this.gotHit = function(bullet){
        // console.log("Checking hit: " + p5.Vector.dist(this.pos, bullet.pos) );
        if(p5.Vector.dist(this.pos, bullet.pos) < 50){
            console.log("Hit");
            this.color = color(255, 100, 100);
            this.dead = true;
        }

    }

    
}