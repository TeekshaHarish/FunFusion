console.log("Welcome to My Tic Tac Toe");
let turnaudio = new Audio("ting.mp3");
let gameOveraudio = new Audio("gameover.mp3");

let turn = 'X';
let gameOver = false;
const changeTurn = () => {
    return turn === 'X' ? '0' : 'X';
    // use triple=
}

let boxes = document.getElementsByClassName('box');
let win = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]];

let boxtext = document.getElementsByClassName('boxtext');
const checkWin = () => {
    win.forEach(ele => {
        // also works with box[ele[0]].innerText
        if (boxtext[ele[0]].innerText === boxtext[ele[1]].innerText && boxtext[ele[1]].innerText === boxtext[ele[2]].innerText && boxtext[ele[0]].innerText !== '') {
            gameOver = true;
            gameOveraudio.play();
            document.querySelector('.info').innerText = boxtext[ele[0]].innerText + " Won";
            document.querySelector('.excited').style.width = "200px";
        }
    })
}
let btn = document.querySelector('#reset');
btn.addEventListener('click', () => {
    Array.from(boxtext).forEach(ele => {
        ele.innerText = '';
    })
    turn = 'X';
    document.getElementsByClassName('info')[0].innerText = "Turn for " + turn;
    document.querySelector('.excited').style.width = "0px";
})
Array.from(boxes).forEach(element => {
    let boxtext = element.getElementsByTagName('span');
    boxtext = boxtext[0];
    element.addEventListener('click', () => {
        if (boxtext.innerText === "") {
            boxtext.innerText = turn;
            turn = changeTurn();
            turnaudio.play();
            checkWin();
            if (!gameOver) {
                document.getElementsByClassName('info')[0].innerText = "Turn for " + turn;
            }else{
                gameOver=false;
            }

        }
    })
});