const player = document.getElementById("player");
player.classList.add("hover");
const obstacle = document.getElementById("obstacle");
const grass = document.getElementById("grass");
var currentScore = 0;
var currentScore_Span = document.getElementById("current-score");
var bestScore = 0;
var bestScore_Span = document.getElementById("best-score");

var timerValue;
var count = 4;
var activateTimer = 0;
var timer_div = document.getElementById("timer");

var tag_div = document.getElementById("tag");

//tag_div.classList.add('hidden');



function handleTimer() {
    
    if(activateTimer === 1) {
        if (count === 0) {
            clearInterval(timerValue);
            initialize()
            timer_div.classList.add('hidden');
            tag_div.classList.add('hidden');
        }
        else {
            count--;
            timer_div.innerHTML = count;
            timer_div.classList.remove('hidden');
            tag_div.classList.remove('hidden');

            if(count === 0) {timer_div.innerHTML = "GO!"};
        }
    }
}


function initialize() {
    if (currentScore > 0) {
        currentScore = 0;
        currentScore_Span.innerHTML = currentScore;
    }

    activateTimer = 0;
    count = 4;
    obstacle.classList.add("move");
    grass.classList.add("grass-move");

}

function jump() {
    player.classList.remove("hover")
    if (player.classList != "jump") {
        player.classList.add("jump");

        setTimeout(function() {
            player.classList.remove("jump");
        }, 650);
    }
    player.classList.add("hover")
}

function gameOver() {
    player.classList.remove("jump");
    obstacle.classList.remove("move");
    grass.classList.remove("grass-move");
    updateBestScore();
}

function checkObstacleX() {
    let obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue("left"));
    return obstacleLeft;
}


let isAlive = setInterval( function() {
    // get current player y position
    let playerTop = parseInt(window.getComputedStyle(player).getPropertyValue("top"));
    
    // get current obstacle x position
    obstacleLeft = checkObstacleX();
    
    // detect collision
    if(obstacleLeft <= 158 && obstacleLeft >= 50 && playerTop > 92){
        gameOver();
    }
}, 10)


let updateScoreboard = setInterval( function() {
    console.log(obstacleLeft);
    if(obstacleLeft <= 70) {
        currentScore++;
        currentScore_Span.innerHTML = currentScore;
    }

    if (currentScore >= 15) {
        tag_div.classList.remove('hidden');
        tag_div.innerHTML = "TAG U IT!";
    }
},100)

function updateBestScore() {
    if(currentScore > bestScore) {
        bestScore = currentScore;
        bestScore_Span.innerHTML = bestScore;
        console.log("HI");
    }
    //console.log("HI");
}



document.addEventListener("keydown", function (e) {
    if (e.code === 'Space') {
        jump();
        console.log(currentScore);
    }
})

document.addEventListener("keypress", function (e) {
    if (e.key === 'r') {
        activateTimer = 1;
        timerValue = setInterval(function() { handleTimer (count); }, 1000);
        //clearInterval(timerValue);
    }
})


