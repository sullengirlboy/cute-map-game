// html references
var startBtn = document.getElementById("startBtn");
var gameContainer = document.getElementById("game-p");
var mapContainer = document.getElementById("map");
var currentTargetHTML = document.getElementById("current-target");
var questionCounterHTML = document.getElementById("progress");
var cursorToolTip = document.getElementById("cursor-tooltip");

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
var shuffledLocations = locationNames.sort(() => Math.random() - 0.5);
var currentTarget;
var questionCounter = 0;

// program code
startBtn.addEventListener("click", startGame);

// functions
function startGame() {
    console.log("game started!");
    gameContainer.style.display = "block";
    startBtn.style.display = "none";
    createPins();
    currentTarget = shuffledLocations[questionCounter];
    currentTargetHTML.innerHTML = currentTarget;
    mapContainer.addEventListener("mousemove", () => moveCursorToolTip(event));
    // cursorToolTip.innerHTML = "Click on <b>" + currentTarget + "</b>";
}

function createPins() {
    locations.forEach(loc => {
        var pin = document.createElement("div");
        pin.setAttribute("class", "pin");
        pin.style.left = loc.x + '%';
        pin.style.top = loc.y + '%';
        pin.addEventListener("click", () => checkAnswer(loc.name), { once: true });
        mapContainer.appendChild(pin);
    });
}

function checkAnswer(selectedPin){ 
    if (selectedPin === currentTarget) {
        
        questionCounterHTML.innerHTML = questionCounter + 1;
        event.target.setAttribute("class", "pin selected");
        var pinInside = document.createElement("div");
        pinInside.setAttribute("class", "pin-inside");
        event.target.appendChild(pinInside);
        if (questionCounter == locationNames.length - 1) {
            alert("quiz finished");
        } else {
            nextQuestion();
        }
    } else {
        alert("try again");
    }
}

function nextQuestion(){
    questionCounter += 1;
    currentTarget = shuffledLocations[questionCounter];
    currentTargetHTML.innerHTML = currentTarget;
}

function moveCursorToolTip(e){
    var rect = mapContainer.getBoundingClientRect();
    var xInsideDiv = e.clientX - rect.left;
    var yInsideDiv = e.clientY - rect.top;
    cursorToolTip.style.left = (xInsideDiv + 10) + "px";
    cursorToolTip.style.top = (yInsideDiv + 5) + "px";
}