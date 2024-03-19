let batsman = "";
let bowler = "";

let tossRandomNumber = Math.floor(Math.random() * 2);
let tossResult = "";
if(tossRandomNumber == 0){
    tossResult = "Heads";
}
else{
    tossResult = "Tails"
}

for(let i=0; i<2; i++){
    document.querySelectorAll(".coin")[i].addEventListener("click", toss);
}

function toss(){
    document.querySelectorAll(".coin")[0].removeEventListener("click", toss);
    document.querySelectorAll(".coin")[1].removeEventListener("click", toss);
    if(this.textContent === tossResult){
        document.querySelector(".notice").textContent = "You won the toss:Bat or Bowl";
        document.querySelectorAll(".coin")[0].textContent = "Bat";
        document.querySelectorAll(".coin")[1].textContent = "Bowl";
        for(let i=0; i<2; i++){
            document.querySelectorAll(".coin")[i].addEventListener("click", choose);
        }
    }
    else{
        let decide = Math.floor(Math.random() * 2);
        if(decide == 0){
            batsman = "pc";
            bowler = "user";
            document.querySelector(".notice").textContent = "PC won the toss and elected to Bat first";
        }
        else{
            batsman = "user";
            bowler = "pc";
            document.querySelector(".notice").textContent = "PC won the toss and elected to Bowl first";
        }
        let hide = document.querySelector(".tossSection");
        hide.style.display = "none";
        let show = document.querySelector(".option");
        show.style.display = "flex";
    }
}

function choose(){   
    document.querySelectorAll(".coin")[0].removeEventListener("click", choose);
    document.querySelectorAll(".coin")[1].removeEventListener("click", choose);
    let hide = document.querySelector(".tossSection");
    hide.style.display = "none";
    let show = document.querySelector(".option");
    show.style.display = "flex";
    if(this.textContent == "Bat"){
        batsman = "user";
        bowler = "pc";
        document.querySelector(".notice").textContent = "You Bat first";
    }
    else{
        batsman = "pc";
        bowler = "user";
        document.querySelector(".notice").textContent = "You Bowl first";
    }
}

let userRun, pcRun;
let score = 0, target = 0;

for(let i=0; i<6; i++){
    document.querySelectorAll(".number")[i].addEventListener("click", general);
}

function general(){
    userRun = getNumber(this);
    getImage(userRun, ".userImage");
    addEffect(this);
    pcRun = Math.floor(Math.random() * 6) + 1;
    getImage(pcRun,".pcImage");
    updateScoreBoard();
}

function getNumber(num){
    return num.textContent;
}

function getImage(num, destination){
    let image = "Images/"+num+".jpg";
    document.querySelector(destination).setAttribute("src", image);
}

function addEffect(num){
    num.classList.add("selected");
    setTimeout(function(){
        num.classList.remove("selected");
    }, 100);
}

function updateScoreBoard(){

    if(batsman == "user"){
        if(pcRun == userRun){
            document.querySelector(".notice").textContent = "User OUT!";
            target = score + 1;
            document.querySelector(".target").textContent = "Target: "+target;
            batsman = "pc";
            bowler = "user";
            secondInnings();
        }
        else{
            score = score + parseInt(userRun);
            playSound("hit");
            document.querySelector(".score").textContent = "Score: "+score;
        }
    }
    else{
        if(pcRun == userRun){
            document.querySelector(".notice").textContent = "PC OUT!";
            target = score + 1;
            document.querySelector(".target").textContent = "Target: "+target;
            playSound("win");
            batsman = "user";
            bowler = "pc";
            secondInnings();
        }
        else{
            score = score + parseInt(pcRun);
            playSound("hit");
            document.querySelector(".score").textContent = "Score: "+score;
        }
    }
}

function secondInnings(){
    for(let i=0; i<6; i++){
        document.querySelectorAll(".number")[i].removeEventListener("click", general);
    }
    score = 0;
    document.querySelector(".score").textContent = "Score: "+score;
    for(let i=0; i<6; i++){
        document.querySelectorAll(".number")[i].addEventListener("click", startSecondInning);
    }
}

function startSecondInning(){
    userRun = this.textContent;
    getImage(userRun, ".userImage");
    addEffect(this);
    pcRun = Math.floor(Math.random() * 6) + 1;
    getImage(pcRun,".pcImage");
    checkWinner();
}

function checkWinner(){
    if(batsman == "user"){
        document.querySelector(".notice").textContent = "User Batting";
        if (pcRun == userRun){
            if(score >= target){
                document.querySelector(".notice").textContent = "User Wins";
                playSound("win");
                endGame();
            }
            else if(score == target-1){
                document.querySelector(".notice").textContent = "Match Draw";
                endGame();
            }
            else{
                document.querySelector(".notice").textContent = "PC Wins";
                endGame();
            }
        }
        else{
            score = score + parseInt(userRun);
            document.querySelector(".score").textContent = "Score: "+score;
            playSound("hit");
            if(score >= target){
                document.querySelector(".notice").textContent = "User Wins";
                playSound("win");
                endGame();
            }
        }
    }
    else{
        document.querySelector(".notice").textContent = "PC Batting";
        if (pcRun == userRun){
            if(score >= target){
                document.querySelector(".notice").textContent = "PC Wins";
                endGame();
            }
            else if(score == target-1){
                document.querySelector(".notice").textContent = "Match Draw";
                endGame();
            }
            else{
                document.querySelector(".notice").textContent = "User Wins";
                playSound("win");
                endGame();
            }
        }
        else{
            score = score + parseInt(pcRun);
            document.querySelector(".score").textContent = "Score: "+score;
            if(score >= target){
                document.querySelector(".notice").textContent = "PC Wins";
                endGame();
            }
        }
    }
}

function endGame(){
    for(let i=0; i<6; i++){
        document.querySelectorAll(".number")[i].removeEventListener("click", startSecondInning);
    }
    setTimeout(function(){
        document.querySelector(".notice").textContent = "Refresh to continue playing";
    }, 2000);
}

function playSound(name){
    let audio = new Audio("Audio/"+name+".wav");
    audio.play();
}