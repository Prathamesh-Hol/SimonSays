
//Declarations
let colorArr = ["green","blue","red","yellow"];
var incCounter = 0;
var seqArr = [];
var interval;
var guessArr = [];
var count = 3;
var prevScore = 0;
var score = 0;
var ms = 1300;
var level = 1;

//Event Listener for Start Button
document.querySelector(".start-btn").addEventListener("click",startGame);

//Start Game
function startGame(){
    document.querySelector(".start-btn").style.display = "none";
    document.querySelector(".replay-btn").style.display = "none";
    document.querySelector("#level").textContent = "Level - " + level;
    interval = setInterval(function(){
        let randNum = Math.floor(Math.random() * (3 - 0 + 1));
            if(seqArr[seqArr.length - 1] !== colorArr[randNum]){
                setColor(randNum);
            }else{
                randNum - 1 < 0 ? randNum += 1 : randNum -= 1;
                setColor(randNum);
            }
    }, ms);
};

//set color for the big box and small boxes
function setColor(randNum){
    if(incCounter > count){
        clearInterval(interval);
        document.querySelector(".color-seq").style.backgroundColor = "white";
        document.querySelector("#header").textContent="Guess the Color Sequence";

        //set color for small boxes
        for(let i = 1;i <= colorArr.length;i++){
            document.querySelector(".box.box" + i).style.cssText  = "visibility:visible;background-color:"+ colorArr[i-1];
        }
    }else{
        seqArr.push(colorArr[randNum]);
        document.querySelector(".color-seq").style.backgroundColor = colorArr[randNum]; //set color for big box
    }
    incCounter++;
}

// Event listener for 1st box 
document.querySelector(".box1").addEventListener("click",(e) => {
    let color = e.target.style.backgroundColor;
    guessArr.push(color);
    checkSeq();
});

// Event listener for 2nd box
document.querySelector(".box2").addEventListener("click",(e) => {
    let color = e.target.style.backgroundColor;
    guessArr.push(color);
    checkSeq();
});

// Event listener for 3rd box
document.querySelector(".box3").addEventListener("click",(e) => {
    let color = e.target.style.backgroundColor;
    guessArr.push(color);
    checkSeq();
});

// Event listener for 4th box
document.querySelector(".box4").addEventListener("click",(e) => {
    let color = e.target.style.backgroundColor;
    guessArr.push(color);
    checkSeq();
});

//check the color sequence
function checkSeq(){
    if(guessArr[guessArr.length - 1] === seqArr[guessArr.length - 1]){
        score++;
        document.querySelector(".score").textContent = "Score : " + score;
        document.querySelector(".lose").style.display = "none";
        guessArr.length === seqArr.length?
        (
            prevScore = score,
            document.querySelector(".win").style.display = "block",
            document.querySelector(".next-btn").style.display = "inline-block",
            clearBox()
        )
        :null;
    }else{
        document.querySelector(".score").textContent = "Score : " + prevScore;
        score = prevScore;
        guessArr.length = 0;
        document.querySelector(".win").style.display = "none";
        document.querySelector(".lose").style.display = "block";
        document.querySelector(".replay-btn").style.display = "inline-block";
        clearBox();
    }
};

//Next button click
document.querySelector(".next-btn").addEventListener("click",function(){
    document.querySelector(".next-btn").style.display = "none";
    document.querySelector(".replay-btn").style.display = "none";
    document.querySelector(".win").style.display = "none";
    seqArr.length = 0;
    guessArr.length = 0;
    incCounter = 0;
    count++;
    ms-=100;
    level++;
    clearBox();
    startGame();
});

//Replay Button click
document.querySelector(".replay-btn").addEventListener("click",function(){
    document.querySelector(".lose").style.display = "none";
    document.querySelector("#header").textContent="Watch the Color Sequence";
    seqArr.length = 0;
    guessArr.length = 0;
    incCounter = 0;
    clearBox()
    startGame();
});

//To clear small boxes
function clearBox(){
    for(let i = 1;i <= colorArr.length;i++){
        document.querySelector(".box.box" + i).style.cssText  = "visibility:hidden;transition: all .3s linear";
    }
}