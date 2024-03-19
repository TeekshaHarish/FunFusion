let words = 
[
    "glide", "house", "aside", "fried", "igloo", "photo", "cried", "slide", "snake", "tiger", "fight", "right", "night", "sight", "lives", "video",
    "knife", "mouse", "truck", "about", "alert", "argue", "beach", "about", "alert", "argue", "beach", "above", "alike", "arise", "began", "abuse", "alive",
    "array", "begin", "actor", "allow", "aside", "begun", "acute", "alone", "asset", "being", "admit", "along", "audio", "below", "adopt", "alter", "audit",
    "bench", "adult", "among", "avoid", "after", "anger", "award", "those", "undue", "worse", "while", "youth", "virus", "worst", "white", "solve", "story",
    "birth", "again", "angle", "aware", "black", "agent", "angry", "badly", "blame", "agree", "apart", "baker", "blind", "ahead", "apple", "block", "alarm",
    "apply", "basic", "blood", "album", "arena", "basis", "board", "boost", "buyer", "visit", "cover", "booth", "cable", "chose", "craft", "bound", "calif",
    "civil", "crash", "brain", "carry", "claim", "cream", "brand", "catch", "class", "crime", "bread", "cause", "clean", "cross", "break", "chain", "clear",
    "crowd", "breed", "chair", "click", "crown", "brief", "chart", "clock", "curve", "bring", "chase", "close", "cycle", "broad", "cheap", "coach", "daily",
    "broke", "check", "coast", "dance", "brown", "chest", "could", "worth", "build", "chief", "count", "dealt", "built", "child", "court", "death", "debut",
    "entry", "forth", "group", "delay", "equal", "forty", "grown", "depth", "error", "forum", "guard", "doing", "event", "found", "guess", "doubt", "every",
    "frame", "guest", "dozen", "exact", "frank", "guide", "draft", "exist", "fraud", "happy", "drama", "extra", "fresh", "drawn", "faith", "front", "heart",
    "dream", "fruit", "heavy", "dress", "fault", "fully", "hence", "drill", "fibre", "funny", "night", "drink", "field", "giant", "horse", "drive", "fifth",
    "given", "hotel", "drove", "fifty", "glass", "house", "dying", "fight", "globe", "human", "eager", "final", "going", "ideal", "early", "first", "grace",
    "image", "earth", "fixed", "grade", "index", "eight", "flash", "grand", "inner", "elite", "fleet", "grant", "input", "empty", "floor", "grass", "issue",
    "enemy", "fluid", "great", "irony", "enjoy", "focus", "green", "juice", "enter", "force", "gross", "joint", "judge", "metal", "media", "newly", "known",
    "local", "might", "noise", "label", "logic", "minor", "north", "large", "loose", "minus", "noted", "laser", "lower", "mixed", "novel", "later", "lucky",
    "model", "nurse", "laugh", "lunch", "money", "occur", "layer", "lying", "month", "ocean", "learn", "magic", "moral", "offer", "lease", "major", "motor",
    "often", "least", "maker", "mount", "order", "leave", "march", "mouse", "other", "legal", "music", "mouth", "level", "match", "movie", "paint", "light",
    "mayor", "needs", "paper", "limit", "meant", "never", "party", "peace", "power", "radio", "round", "panel", "press", "raise", "route", "phase", "price",
    "range", "royal", "phone", "pride", "rapid", "rural", "photo", "prime", "ratio", "scale", "piece", "print", "reach", "scene", "pilot", "prior", "ready",
    "scope", "pitch", "prize", "refer", "score", "place", "proof", "right", "sense", "plain", "proud", "rival", "serve", "plane", "prove", "river", "seven",
    "plant", "queen", "quick", "shall", "plate", "sixth", "stand", "shape", "point", "quiet", "roman", "share", "pound", "quite", "rough", "sharp", "sheet",
    "spare", "style", "times", "shelf", "speak", "sugar", "tired", "shell", "speed", "suite", "title", "shift", "spend", "super", "today", "shirt", "spent",
    "sweet", "topic", "shock", "split", "table", "total", "shoot", "spoke", "taken", "touch", "short", "sport", "taste", "tough", "shown", "staff", "would",
    "tower", "sight", "stage", "teach", "track", "since", "stake", "teeth", "trade", "sixty", "start", "voice", "treat", "sized", "state", "thank", "trend",
    "skill", "steam", "theft", "trial", "sleep", "steel", "their", "tried", "slide", "stick", "theme", "tries", "small", "still", "their", "truck", "smart",
    "stock", "these", "truly", "smile", "stone", "thick", "trust", "smith", "stood", "thing", "truth", "smoke", "store", "think", "twice", "solid", "storm",
    "third", "under", "sorry", "strip", "three", "union", "sound", "stuck", "threw", "unity", "south", "study", "throw", "until", "space", "stuff", "tight",
    "upper", "upset", "whole", "waste", "wound", "urban", "whose", "watch", "write", "usage", "woman", "wrong", "water", "usual", "train", "wheel", "wrote",
    "valid", "world", "where", "yield", "value", "worry", "which", "young"
];

let currentLetter = 0;
let guessNumber = 0;

let randomNumber = Math.floor(Math.random() * words.length);
let randomWord = words[randomNumber];
console.log(randomWord); 

document.addEventListener("keydown", checkKey);

for(let i=0; i<26; i++){
    document.querySelectorAll(".key")[i].addEventListener("click", keyboardInput);
}

function keyboardInput(){
    document.getElementById("clear").addEventListener("click", clearRow);
    currentLetter++;
    document.getElementById(currentLetter).textContent = this.textContent;
    if(currentLetter % 5 == 0){
        for(let i=0; i<26; i++){
            document.querySelectorAll(".key")[i].removeEventListener("click", keyboardInput);
        }
        document.removeEventListener("keydown", checkKey);
        document.getElementById("submit").addEventListener("click", checkAnswer);   
    }
}

function checkKey(key){
    document.getElementById("clear").addEventListener("click", clearRow);
    if(key.keyCode >= 65 && key.keyCode <= 90){
        currentLetter++;
        document.getElementById(currentLetter).textContent = key.key;
        if(currentLetter % 5 == 0){
            document.removeEventListener("keydown", checkKey);
            for(let i=0; i<26; i++){
                document.querySelectorAll(".key")[i].removeEventListener("click", keyboardInput);
            }
            document.getElementById("submit").addEventListener("click", checkAnswer);   
        }
    }
    else if(key.key == "Backspace"){
        if(currentLetter >= (5*guessNumber) + 1){
            document.getElementById(currentLetter).textContent = "";
            currentLetter--;
        }
    }
}

function checkAnswer(){
    document.getElementById("clear").removeEventListener("click", clearRow);
    document.getElementById("submit").removeEventListener("click", checkAnswer);
    let inputWords = [
        document.getElementById(currentLetter-4).textContent, document.getElementById(currentLetter-3).textContent,
        document.getElementById(currentLetter-2).textContent, document.getElementById(currentLetter-1).textContent,
        document.getElementById(currentLetter).textContent
        ];
    let selectedWord = [
        randomWord[0], randomWord[1], randomWord[2], randomWord[3], randomWord[4]
    ];
    for(let i=0; i<5; i++){
        if(inputWords[i] == selectedWord[i]){
            document.getElementById(guessNumber*5+1+i).classList.add("rightPlace");
            selectedWord[i] = "-";
        }
    }
    for(let i=0; i<5; i++){
        let letterPresent = "false";
        for(let j=0; j<5; j++){
            if(inputWords[i] == selectedWord[j]){
                letterPresent = "true";
                selectedWord[j] = "-";
                document.getElementById(guessNumber*5+1+i).classList.add("present");
                break;
            }
        }
        if(letterPresent == "false"){
            document.getElementById(guessNumber*5+1+i).classList.add("notPresent");
        }
    }
    checkWinner();
}

function checkWinner(){
    let row = guessNumber * 5;
    if((document.getElementById(row+1).textContent === randomWord[0]) && (document.getElementById(row+2).textContent === randomWord[1]) 
        && (document.getElementById(row+3).textContent === randomWord[2]) && (document.getElementById(row+4).textContent === randomWord[3]) 
        && (document.getElementById(row+5).textContent === randomWord[4]))
    {
        document.querySelector(".notice").textContent = "YOU WON";
        endgame();
    }
    else{
        guessNumber++;
        nextChance();
    }
}

function nextChance(){
    if(guessNumber != 6){
        document.addEventListener("keydown", checkKey);
        for(let i=0; i<26; i++){
            document.querySelectorAll(".key")[i].addEventListener("click", keyboardInput)
        }
    }
    else{
        document.querySelector(".notice").textContent = "YOU Lost. The word was " + randomWord + ".";
        endgame();
    }
}

function endgame(){
    for(let i=0; i<26; i++){
        document.querySelectorAll(".key")[i].removeEventListener("click", keyboardInput);
    }
    document.removeEventListener("keydown", checkKey);
    document.getElementById("submit").removeEventListener("click", checkAnswer);
    document.getElementById("clear").removeEventListener("click", clearRow);
}

function clearRow(){
    while(currentLetter % 5 != 1){
        document.getElementById(currentLetter).textContent = "";
        currentLetter--;
    }
    document.getElementById(currentLetter).textContent = "";
    currentLetter--;
    document.getElementById("clear").removeEventListener("click", clearRow);
    document.getElementById("submit").removeEventListener("click", checkAnswer); 
    document.addEventListener("keydown", checkKey);
    for(let i=0; i<26; i++){
        document.querySelectorAll(".key")[i].addEventListener("click", keyboardInput);
    }
}