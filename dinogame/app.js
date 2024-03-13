let score=0;
let cross=true;
let gameIsOver=false;

const bgaudio=new Audio('music.mp3');
const audiogo=new Audio('gameover.mp3');
setTimeout(()=>{
    bgaudio.play();
    //play audio after 1 sec
},1000);

document.onkeydown=function(e){
    // console.log("key code is: ",e.keyCode);
    if(e.keyCode==38){ //up key
        const dino=document.querySelector('.dino');
        dino.classList.add("animateDino");
        setTimeout(()=>{
            dino.classList.remove("animateDino");
        },700);
    }

    //left key
    if(e.keyCode==39){
        const dino=document.querySelector('.dino');
        const dinoX=parseInt(window.getComputedStyle(dino,null).getPropertyValue('left'));
        dino.style.left=dinoX+110+'px';
    }
    if(e.keyCode==37){
        const dino=document.querySelector('.dino');
        const dinoX=parseInt(window.getComputedStyle(dino,null).getPropertyValue('left'));
        dino.style.left=(dinoX-110)+'px';
    }
}

setInterval(()=>{
    const dino=document.querySelector('.dino');
    const gameOver=document.querySelector('.gameOver');
    const obstacle=document.querySelector('.obstacle');

    const dx=parseInt(window.getComputedStyle(dino,null).getPropertyValue('left'));
    const dy=parseInt(window.getComputedStyle(dino,null).getPropertyValue('bottom'));

    const ox=parseInt(window.getComputedStyle(obstacle,null).getPropertyValue('left'));
    const oy=parseInt(window.getComputedStyle(obstacle,null).getPropertyValue('bottom'));

    let offsetX=Math.abs(dx-ox);
    let offsetY=Math.abs(oy-dy);
    // console.log(offsetX,offsetY);

    if(!gameIsOver && offsetX<70 && offsetY<52){
        gameOver.innerText="Game Over- Reload to play again";
        obstacle.classList.remove('obstacleAni');
        gameIsOver=true;
        audiogo.play();
        setTimeout(()=>{
            audiogo.pause();
            bgaudio.pause();
        },1000)
    }
    else if(!gameIsOver && offsetX<70 && cross){
        score+=1;
        updateScore(score);
        cross=false;
        setTimeout(()=>{
            //so that it upadtes score only once for each successful jump
            cross=true;
        },1000);
        setTimeout(()=>{
            aniDur=parseFloat(window.getComputedStyle(obstacle,null).getPropertyValue('animation-duration'));
            newDur=aniDur-0.1;
            obstacle.style.animationDuration=newDur+'s';
        },500);
        
    }
},100);

function updateScore(score){
    const scoreCount=document.querySelector('#scoreCount');
    scoreCount.innerText=score;
}