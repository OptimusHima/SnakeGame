
//board
var blocksize = 25;
// let tileSize = board.width / blocksize - 2;
var rows = 20;
var cols = 20;
var board;
var context;

let speed = 6;


//snake Head
var snakeX = blocksize * 5;
var snakeY = blocksize * 5;

//velocity
var velocityX = 0;
var velocityY = 0;

var snakeBody = [];
//food  
var foodX ;
var foodY ;

let score = -1;

const gulpSound = new Audio("food.mp3");

//Game Over
var gameover = false;

window.onload = function() {
    board = document.getElementById("board");
    board.height = rows * blocksize;
    board.width = cols * blocksize;
    context = board.getContext("2d");

    placeFood();
    document.addEventListener("keyup", changeDirection);
    // update();

    if(score > 2){
        speed = 11;
    }
    
    if(score > 5){
        speed = 13;
    }
    setInterval(update, 1000/speed); 
}



function update(){
    if(gameover){
        return;
    }

    context.fillStyle = ("black     ");
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle="Red";
    context.fillRect(foodX, foodY, blocksize-2, blocksize-2);

    if(snakeX == foodX && snakeY == foodY){
        snakeBody.push([foodX, foodY])
        placeFood();
    }

    for(let i = snakeBody.length-1; i>0; i--){
        snakeBody[i]=snakeBody[i-1];
    }
    if(snakeBody.length){
        snakeBody[0] = [snakeX, snakeY]
    }


    context.fillStyle ="orange";
    snakeX += velocityX * blocksize;
    snakeY += velocityY * blocksize;
    context.fillRect(snakeX , snakeY, blocksize-2, blocksize-2);
 
    
    for(let i=0; i<snakeBody.length; i++){
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blocksize-2, blocksize-2); 
    }
    

        //game over condition
        //condition 1. 
        if(snakeX < 0 || snakeX > cols*blocksize || snakeY < 0 || snakeY > rows*blocksize ){
            gameover = true;
            // alert("Game Over! Reload this Page to Play Again");
        }

        if (gameover) {
            context.fillStyle = "white";
            context.font = "50px Verdana";
        
            if (gameover) {
              context.fillStyle = "white";
              context.font = "50px Verdana";
        
              var gradient = context.createLinearGradient(0, 0, board.width, 0);
              gradient.addColorStop("0.1", " magenta");
              gradient.addColorStop("0.5", "blue");
              gradient.addColorStop("0.8", "red");
              // Fill with gradient
              context.fillStyle = gradient;
        
              context.fillText("Game Over!", board.width / 6.5, board.height / 2);
            }
        
            context.fillText("Game Over!", board.width / 6.5, board.height / 2);
          }


        //condition 2.
        for(let i =0; i<snakeBody.length; i++){
            if(snakeX === snakeBody[i][0] && snakeY === snakeBody[i][1]){
                gameover = true;
                // alert("Game Over! Reload this Page to Play Again")
            }
        } 

}

function changeDirection(e){
    if(e.code === "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.code === "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }
    else if (e.code === "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
    else if (e.code === "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

function placeFood(){
score = score + 1;
scoreBox.innerHTML = `Score: ${score}`;

    foodX = Math.floor(Math.random() * cols) * blocksize;
    foodY = Math.floor(Math.random() * rows) * blocksize;

    gulpSound.play();
}