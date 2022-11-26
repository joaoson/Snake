let canvas = document.getElementById('snake');
let restart = document.getElementById('restart')
let context = canvas.getContext("2d");
let square = 32;
let snake= [];

let direction= "";

snake[0]={
    x: 8 * square,
    y: 8 * square
}

let food= {
    x: Math.floor(Math.random() *15 + 1) * square,
    y: Math.floor(Math.random() *15 + 1) * square
}

document.addEventListener('keydown',update);

function update(event){
    if(event.key == 'ArrowLeft' && direction != 'right') direction = 'left';
    if(event.key == 'ArrowUp' && direction != 'down') direction = 'up';
    if(event.key == 'ArrowRight' && direction != 'left') direction = 'right';
    if(event.key == 'ArrowDown' && direction != 'up') direction = 'down';
}

function createBg(){
    context.fillStyle= 'lightgreen';
    context.fillRect(0,0,16 * square, 16 * square)
}

function createSnake(){
    for(i=0; i<snake.length; i++){
        context.fillStyle= 'green';
        context.fillRect(snake[i].x,snake[i].y,square,square)
    }
}

function createFood(){
    context.fillStyle= 'red';
    context.fillRect(food.x,food.y,square,square)
}

function startGame(){
    if(snake[0].x > 15 * square && direction == 'right') snake[0].x = 0;
    if(snake[0].x < 0  && direction == 'left') snake[0].x = 16 * square;
    if(snake[0].y > 15 * square && direction == 'down') snake[0].y = 0;
    if(snake[0].y < 0 && direction == 'up') snake[0].y = 16 * square;

    for(i=1;i < snake.length;i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            gameOver();
        }
    }

    createBg();
    createSnake();
    createFood();

    console.log(snake.length)

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == "right") snakeX += square;
    if(direction == "left") snakeX -= square;
    if(direction == "up") snakeY -= square;
    if(direction == "down") snakeY += square;

    if(snakeX != food.x || snakeY != food.y){
        snake.pop()
    } else {
        food.x = Math.floor(Math.random() *15 + 1) * square;
        food.y = Math.floor(Math.random() *15 + 1) * square;
    }

    let newhead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newhead);

}

let iniciar = document.getElementById('start')
iniciar.addEventListener('click',iniciarJogo)

restart.addEventListener('click',iniciarJogo)

let jogo = '';
let title = document.getElementById('title')

function iniciarJogo(event){
    title.classList.add('ingame');
    canvas.removeAttribute("hidden");
    jogo = setInterval(startGame,80);
    iniciar.classList.add('hidden')
    restart.classList.add('hidden');
}

function gameOver(){
    title.classList.remove('ingame');
    tamanho= snake.length
    for(i=tamanho;i>1;i--){
       snake.pop() 
    }
    direction = '';
    canvas.setAttribute("hidden", "hidden");
    restart.classList.remove('hidden');
    clearInterval(jogo);
}




