let player1 = "Red";
let player2 = "Yellow";
let currentPlayer = player1;

//Gravity Effect
let currentArea = [6,6,6,6,6,6,6];

//Array for all circles
let circle = [0];
for(let i=1; i<=42; i++){
    circle[i] = document.querySelectorAll(".circle")[i-1];
}

//All Winning Combinations
let winningCombination = [
    //HORIZONTAL
    [1,2,3,4], [2,3,4,5], [3,4,5,6], [4,5,6,7],
    [8,9,10,11], [9,10,11,12], [10,11,12,13], [11,12,13,14],
    [15,16,17,18], [16,17,18,19], [17,18,19,20], [18,19,20,21],
    [22,23,24,25], [23,24,25,26], [24,25,26,27], [25,26,27,28],
    [29,30,31,32], [30,31,32,33], [31,32,33,34], [32,33,34,35],
    [36,37,38,39], [37,38,39,40], [38,39,40,41], [39,40,41,42],
    //VERTICAL
    [1,8,15,22], [8,15,22,29], [15,22,29,36],
    [2,9,16,23], [9,16,23,30], [16,23,30,37],
    [3,10,17,24], [10,17,24,31], [17,24,31,38],
    [4,11,18,25], [11,18,25,32], [18,25,32,39],
    [5,12,19,26], [12,19,26,33], [19,26,33,40],
    [6,13,20,27], [13,20,27,34], [20,27,34,41],
    [7,14,21,28], [14,21,28,35], [21,28,35,42],
    //DIAGONAL 1
    [4,10,16,22], [5,11,17,23], [6,12,18,24], [7,13,19,25],
    [11,17,23,29], [12,18,24,30], [13,19,25,31], [14,20,26,32],
    [18,24,30,36], [19,25,31,37], [20,26,32,38], [21,27,33,39],
    //DIAGONAL -1
    [1,9,17,25], [2,10,18,26], [3,11,19,27], [4,12,20,28],
    [8,16,24,32], [9,17,25,33], [10,18,26,34], [11,19,27,35],
    [15,23,31,39], [16,24,32,40], [17,25,33,41], [18,26,34,42],
]

//Event Listener
for(let i=0; i<42; i++){
    document.getElementsByClassName("circle")[i].addEventListener("click", playerClick);
}

//Main Function
function playerClick(){
    if(this.classList[1] % 7 == 1){
        let eligibleCircle = ((currentArea[0] - 1) * 7) + 1;
        addColor(eligibleCircle - 1);
        currentArea[0] = currentArea[0] - 1;
        checkWinner();
    }
    else if(this.classList[1] % 7 == 2){
        let eligibleCircle = ((currentArea[1] - 1) * 7) + 2;
        addColor(eligibleCircle - 1);
        currentArea[1] = currentArea[1] - 1;
        checkWinner();
    }
    else if(this.classList[1] % 7 == 3){
        let eligibleCircle = ((currentArea[2] - 1) * 7) + 3;
        addColor(eligibleCircle - 1);
        currentArea[2] = currentArea[2] - 1;
        checkWinner();
    }
    else if(this.classList[1] % 7 == 4){
        let eligibleCircle = ((currentArea[3] - 1) * 7) + 4;
        addColor(eligibleCircle - 1);
        currentArea[3] = currentArea[3] - 1;
        checkWinner();
    }
    else if(this.classList[1] % 7 == 5){
        let eligibleCircle = ((currentArea[4] - 1) * 7) + 5;
        addColor(eligibleCircle - 1);
        currentArea[4] = currentArea[4] - 1;
        checkWinner();
    }
    else if(this.classList[1] % 7 == 6){
        let eligibleCircle = ((currentArea[5] - 1) * 7) + 6;
        addColor(eligibleCircle - 1);
        currentArea[5] = currentArea[5] - 1;
        checkWinner();
    }
    else{
        let eligibleCircle = ((currentArea[6] - 1) * 7) + 7;
        addColor(eligibleCircle - 1);
        currentArea[6] = currentArea[6] - 1;
        checkWinner();
    }
}

//Adding Color To Circle 
function addColor(area){
    if(currentPlayer == player1){
        document.getElementsByClassName("circle")[area].classList.add("red");
        currentPlayer = player2;
        document.getElementById("notice").textContent = `${currentPlayer} Plays`;
    }
    else{
        document.getElementsByClassName("circle")[area].classList.add("yellow");
        currentPlayer = player1;
        document.getElementById("notice").textContent = `${currentPlayer} Plays`;
    }
}

//Checking Winner
function checkWinner(){
    for(let i=0; i<winningCombination.length; i++){
        let temp = [];
        for(let j=0; j<4; j++){
            temp[j] = circle[winningCombination[i][j]].classList[2];
        }
        if(temp[0] === temp[1] && temp[1] === temp[2] && temp[2] === temp[3] && temp[1] != undefined){
            if(currentPlayer == player1){
                document.getElementById("notice").textContent = "Yellow Wins";
                circle[winningCombination[i][0]].classList.add("black")
                circle[winningCombination[i][1]].classList.add("black")
                circle[winningCombination[i][2]].classList.add("black")
                circle[winningCombination[i][3]].classList.add("black")
                endGame();
                break;
            }
            else{
                document.getElementById("notice").textContent = "Red Wins";
                circle[winningCombination[i][0]].classList.add("black")
                circle[winningCombination[i][1]].classList.add("black")
                circle[winningCombination[i][2]].classList.add("black")
                circle[winningCombination[i][3]].classList.add("black")
                endGame();
                break;
            }
            
        }
    }
}

//Ending Game
function endGame(){
    for(let i=0; i<42; i++){
        document.getElementsByClassName("circle")[i].removeEventListener("click", playerClick);
    }
}
