let stars = [];
let angle = -1.7;
let bloc;

let bullets = [];
let enemies = [];


let goodSq;
let badSq;
let bullet;


let score = 0;
let level = 1;

let enemySpeed = 1;
let angleSpeed = 0.2;

let maxEnemySize = 120;
let minEnemySize = 80;


function setup() {
    createCanvas(displayWidth - 200, displayHeight - 300);
    
    // Loading assets
    goodSq = loadImage("/assets/good.png");
    badSq = loadImage("/assets/bad.png");
    bullet = loadImage("/assets/bullet.png");
    
    //Initializing mr bloc

    bloc = new Bloc();
    
    //Initializing stars
    for(let i = 0; i< 200; i++){
        stars.push({
            x: random(0, width), 
            y : random(0, height)
        });
    }

    //Initializing enemies
    for(let i= 0; i < 10; i++)
        enemies.push(new Enemy());
    
}


function draw() {
    background(0);
    drawStars();
    
    //Check if key is being pressed to adjust the angle accordiny=ky
    if(keyIsDown(LEFT_ARROW)) angle -= angleSpeed;
    if(keyIsDown(RIGHT_ARROW)) angle += angleSpeed;
    
    // Draw the bullets and compare the bullets against the enemies.
    bullets.forEach((bullet) => {
        bullet.draw(bloc);
        bullet.move();
        enemies.forEach((enemy)=> {
            enemy.gotHit(bullet);
        })
    });

    //Draw Mr Bloc
    bloc.draw(angle);
    
    //Filter out bullets that are out of screen;
    bullets = bullets.filter((bullet) => !bullet.isOutOfView());


    // Check if the enemies have hit Mr. Bloc or bullets
    // If they have hit Mr. Bloc then the game ends and max score yet is displayed.
    // IF they have hit by bullets they are swapped out for new enemies.
    // The total number of enemies on the canvas remains constant.

    for(let i = 0; i < enemies.length; i++){
        const enemy = enemies[i];
        if(bloc.isHit(enemy)) {
            let prevScore = localStorage.getItem("Score");
            createElement("p", `Max score yet : ${max(prevScore, score)}`);
            if(prevScore > score){
                localStorage.setItem("Score", prevScore);
            }
            else{
                localStorage.setItem("Score", score);
            }
        
            noLoop();
            background(0);
            textSize(32);
            stroke(255, 0, 0);
            fill(255, 0, 0)
            strokeWeight(1);
            text(`Score: ${score}`, width/2, height/2);
        };
        if(!enemy.dead){
            enemy.draw();
            enemy.move();
        }
        else{
            score++;
            if(score % 50 == 0){
                level++;
                if(angleSpeed > 0.07) angleSpeed -= 0.01;
                if(minEnemySize > 50) minEnemySize -= 10;
                if(maxEnemySize < 150) maxEnemySize += 10;
            } 
            enemies.splice(i, 1);
            enemies.push(new Enemy());
        }
    }

    // Draw the score and level
    textSize(30);
    fill(255);
    strokeWeight(1);
    text(`Score: ${score}`, 100, 100);
    text(`Level : ${level}`, 100, 150);
}


// If you have an extra hand u can use it to shoot bullets as well
function mouseClicked(){
    console.log("Shot bullet : ");
    let b = new Bullet(angle);
    bullets.push(b);
}



// Space bar bullet trigger
function keyPressed(){
    if(keyCode === 32){
        console.log("Shot bullet : ");
        let b = new Bullet(angle);
        bullets.push(b);
    }
}



function drawStars(){
    ///It draws stars, duh!
    for(let i = 0; i < stars.length; i++){
        strokeWeight(7);
        stroke(255, 240, 240);
        point(stars[i].x, stars[i].y);
        stars[i].x += 1;
        if(stars[i].x > width){
            stars[i].x = 0;
            stars[i].y = random(0, height)
        }
    }
}