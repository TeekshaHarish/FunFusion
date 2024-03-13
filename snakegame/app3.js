//Game constants
let inputDir={x:0,y:0};

const foodSound=new Audio('music/food.mp3');
const gameOverSound= new Audio('./music/gameover.mp3');
const moveSound=new Audio('music/move.mp3');
const musicSound=new Audio('music/music.mp3');

let lastPaintTime=0;
let speed=18;
let snakeArr=[
    {x:13,y:15}
];
let food={x:3,y:6};
let score=0;
let highScore=0;

//Game functions
function main(ctime){
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if((ctime-lastPaintTime)/1000 < 1/speed){
        //1000 as ctime in mili seconds
        return;
    }
    lastPaintTime=ctime;
    gameEngine();
}
function isCollide(snakearr){
    for(let i=1;i<snakeArr.length;i++){
        if(snakeArr[0].x==snakeArr[i].x && snakeArr[0].y==snakearr[i].y){
            return true;
        }
    }
    if(snakeArr[0].x<=0 || snakeArr[0].x>=18 || snakeArr[0].y<=0 || snakeArr[0].y>=18){
        return true;
    }
}
function gameEngine(){
    //Update snake and food array
    if(isCollide(snakeArr)){
        //Game Over
        gameOverSound.play();
        musicSound.pause();
        inputDir={x:0,y:0};
        alert("Game Over. Press any key to play again!");
        snakeArr=[{x:13,y:15}];
        food={x:3,y:6};
        musicSound.play();
        score=0;
        scoreBox.innerText="Score: "+score;

    }

    //if snake eats the food, increment score and regenerate food
    if(snakeArr[0].x==food.x && snakeArr[0].y==food.y){
        score+=1;
        const scoreBox=document.getElementById('scoreBox');
        scoreBox.innerText="Score: "+score;

        if(score>highScore){
            highScore=score;
            const highScoreBox=document.getElementById('highScoreBox');
            highScoreBox.innerText="HighScore: "+highScore;
        }


        let newele={x:snakeArr[0].x+inputDir.x, y:snakeArr[0].y+inputDir.y};
        console.log(newele.x,newele.y);
        snakeArr.unshift(newele);
        let a=2,b=16;
        food={x: Math.round(a+(b-a)*Math.random()),y: Math.round(a+(b-a)*Math.random())}
        console.log("food" ,food.x,food.y);
    }

    //Moving the snake
    for(let i=snakeArr.length-2;i>=0;i--){
        snakeArr[i+1]={...snakeArr[i]};  
        //spread to avoid all pointers pointing at the same location
    }
    snakeArr[0].x+=inputDir.x;
    snakeArr[0].y+=inputDir.y;
    // console.log(inputDir.x,inputDir.y);

    //Display snake
    const board=document.getElementById('board');
    board.innerHTML=""; //reset

    snakeArr.forEach((e,index)=>{
        let snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        if(index==0){
            snakeElement.classList.add('head');
        }else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    })

    //Display food
    let foodElement=document.createElement('div');
    foodElement.style.gridRowStart=food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}



//Game main logic
window.requestAnimationFrame(main);

window.addEventListener('keydown',e=>{
    inputDir={x:1,y:0}; //Start the game
    moveSound.play();
    switch(e.key){
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x=0;
            inputDir.y=-1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x=0;
            inputDir.y=1;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x=1;
            inputDir.y=0;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x=-1;
            inputDir.y=0;
            break;
        default:
            break;
    }
})