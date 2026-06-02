// html references
var startBtn = document.getElementById("startBtn");
var startContainer = document.getElementById("startBtn-p");
var gameContainer = document.getElementById("game-p");
var mapContainer = document.getElementById("map");
var currentTargetHTML = document.querySelectorAll(".current-target");
var questionCounterHTML = document.getElementById("progress");
var cursorToolTip = document.getElementById("cursor-tooltip");
var timerHTML = document.getElementById("timer");
var scoreHTML = document.getElementById("score");
var quitBtn = document.getElementById("quitBtn");
var skipBtn = document.getElementById("skipBtn");
var endContainer = document.getElementById("end-p");
var finalScoreHTML = document.getElementById("final-score");
var finalTimeHTML = document.getElementById("final-time");
var restartBtn = document.getElementById("restartBtn");
var seeMapBtn = document.getElementById("seeMapBtn");

// variables
var locations = [
    {
        "name": "Kansas City",
        "x": 21,
        "y": 35
    },
    {
        "name": "Saint Louis",
        "x": 77,
        "y": 43
    },
    {
        "name": "Jefferson City",
        "x": 51,
        "y": 46
    },
    {
        "name": "Springfield",
        "x": 35,
        "y": 70
    },
    {
        "name": "Columbia",
        "x": 49.5,
        "y": 39
    },
    {
        "name": "Joplin",
        "x": 23,
        "y": 73
    },
    {
        "name": "Cape Girardeau",
        "x": 86,
        "y": 68
    },
    {
        "name": "Rolla",
        "x": 58.5,
        "y": 59.5
    },
    {
        "name": "Hannibal",
        "x": 61.25,
        "y": 22.25
    },
    {
        "name": "Branson",
        "x": 36.5,
        "y": 79
    },
    {
        "name": "Poplar Bluff",
        "x": 75,
        "y": 77.5
    },
    {
        "name": "Saint Joseph",
        "x": 17.75,
        "y": 21.5
    }
];
var locationNames = locations.map(loc => loc.name);
var shuffledLocations;
var currentTarget;
var questionCounter = 0;
var timer = 0;
var timerInterval;
var minutes = 0;
var seconds = 0;
var tries = 3;
var zeroTriesPinInterval;
var score = 0;
var cursorToolTipRef = (e) => positionToolTip(e, cursorToolTip, 12.5, 5);

// program code
startBtn.addEventListener("click", startGame);
quitBtn.addEventListener("click", restartQuitQuiz);
skipBtn.addEventListener("click", skipLoc);
restartBtn.addEventListener("click", restartQuitQuiz);
seeMapBtn.addEventListener("click", seeMap);

// functions
function startGame() {
    console.log("game started!");
    shuffledLocations = locationNames.sort(() => Math.random() - 0.5);
    questionCounter = 0;
    timer = 0;
    minutes = 0;
    seconds = 0;
    tries = 3;
    score = 0;
    timerInterval = setInterval(myTimer, 1000);
    timerHTML.innerHTML = minutes + ":0" + seconds;
    scoreHTML.innerHTML = updateScore(score) + "%";
    questionCounterHTML.innerHTML = questionCounter;
    gameContainer.style.display = "block";
    startContainer.style.display = "none";
    createPins();
    currentTarget = shuffledLocations[questionCounter];
    updateCurrentTargetHTML();
    mapContainer.addEventListener("mousemove", cursorToolTipRef);
}

function createPins() {
    locations.forEach(loc => {
        var pin = document.createElement("div");
        pin.setAttribute("class", "pin");
        pin.style.left = loc.x + '%';
        pin.style.top = loc.y + '%';
        pin.dataset.name = loc.name;
        pin.addEventListener("click", (e) => checkAnswer(e, loc.name));
        mapContainer.appendChild(pin);
    });
}

function checkAnswer(e, selectedPin){
    var selectedPinHTML = e.currentTarget;
    var correctPinHTML = mapContainer.querySelector(`[data-name="${currentTarget}"]`);
    if (selectedPinHTML.classList.contains("selected") || selectedPinHTML.classList.contains("selected-red") || selectedPinHTML.classList.contains("selected-yellow")) {
        return;
    } else {
        tries = tries - 1;
        if (selectedPin === currentTarget) {
            questionCounterHTML.innerHTML = questionCounter + 1;
            if (tries == 2){
                selectedPinHTML.setAttribute("class", "pin selected");
            } else if (tries < 0){
                selectedPinHTML.setAttribute("class", "pin selected-red");
            } else if (tries < 2) {
                selectedPinHTML.setAttribute("class", "pin selected-yellow");
            }
            var pinInside = document.createElement("div");
            pinInside.setAttribute("class", "pin-inside");
            selectedPinHTML.appendChild(pinInside);
            if (questionCounter == locationNames.length - 1) {
                finishQuiz();
            } else {
                nextQuestion();
            }
        } else {
            var selectedPinToolTip = document.createElement("div");
            selectedPinToolTip.setAttribute("class", "tooltip");
            positionToolTip(e, selectedPinToolTip, 5, 2.5);
            selectedPinToolTip.style.opacity = 1;
            selectedPinToolTip.innerHTML = "<b>" + selectedPin + "</b>";
            mapContainer.appendChild(selectedPinToolTip);
            setTimeout(() => {
                selectedPinToolTip.setAttribute("class", "tooltip fade");
                setTimeout(() => {
                    selectedPinToolTip.remove();
                }, 300);
            }, 2000);
            if (tries == 0) {
                correctPinHTML.classList.toggle("alert");
                zeroTriesPinInterval = setInterval(() => zeroTriesPin(correctPinHTML), 750);
            }
        }
    }
}

function nextQuestion(){
    clearInterval(zeroTriesPinInterval);
    if (tries == 2){
        score += 1;
    } else if (tries == 1){
        score += 0.25;
    } else if (tries == 0){
        score += 0.5;
    } else if (tries < 0){
        score += 0;
    }
    scoreHTML.innerHTML = updateScore(score) + "%";
    tries = 3;
    questionCounter += 1;
    currentTarget = shuffledLocations[questionCounter];
    updateCurrentTargetHTML();
}

function positionToolTip(e, toolTip, xOffSet, yOffSet){
    var rect = mapContainer.getBoundingClientRect();
    var xInsideDiv = e.clientX - rect.left;
    var yInsideDiv = e.clientY - rect.top;
    toolTip.style.left = (xInsideDiv + xOffSet) + "px";
    toolTip.style.top = (yInsideDiv + yOffSet) + "px";
}

function updateCurrentTargetHTML(){
    currentTargetHTML.forEach(element => {
        element.innerHTML = currentTarget;
    });
}

function myTimer(){
    timer += 1;
    timerHTML.innerHTML = updateTimerHTML(timer);
}

function updateTimerHTML(timer){
    if (timer >= 60){
        minutes = Math.floor(timer / 60);
        seconds = timer - (minutes * 60);
    } else {
        seconds = timer;
    }
    if (seconds < 10) {
        seconds = seconds.toString().padStart(2, '0'); ;
    } else {
        seconds = seconds;
    }
    return minutes + ":" + seconds;
}

function zeroTriesPin(pin){
    pin.classList.toggle("alert");
}

function updateScore(s){
    return Math.round((s / (questionCounter + 1)) * 100);
}

function finishQuiz(){
    clearInterval(timerInterval);
    mapContainer.removeEventListener("mousemove", cursorToolTipRef);
    cursorToolTip.remove();
    endContainer.classList.add("fade");
    gameContainer.classList.add("blur");
    finalScoreHTML.innerHTML = Math.round((score / (questionCounter)) * 100) + "%";
    finalTimeHTML.innerHTML = updateTimerHTML(timer);
}

function restartQuitQuiz(){
    endContainer.classList.remove("fade");
    gameContainer.classList.remove("blur");
    gameContainer.style.display = "none";
    startContainer.style.display = "flex";
    clearInterval(timerInterval);
    cursorToolTip.remove();
}

function skipLoc(){
    var currentIndex = shuffledLocations.indexOf(currentTarget);
    shuffledLocations.push(shuffledLocations.splice(currentIndex, 1)[0]);
    currentTarget = shuffledLocations[currentIndex];
    tries = 3;
    updateCurrentTargetHTML();
}

function seeMap(){
    endContainer.classList.remove("fade");
    gameContainer.classList.remove("blur");
}