// html references
var startBtn = document.getElementById("startBtn");
var gameContainer = document.getElementById("game-p");
var mapContainer = document.getElementById("map");
var currentTarget;
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
var questionCounter = 0;

// program code
startBtn.addEventListener("click", startGame);

// functions

function startGame() {
    console.log("game started!");
    gameContainer.style.display = "block";
    startBtn.style.display = "none";
    createPins();
    var shuffledLocations = locationNames.sort(() => Math.random() - 0.5);
    currentTarget = shuffledLocations[questionCounter];
}

function createPins() {
    locations.forEach(loc => {
        var pin = document.createElement("div");
        pin.setAttribute("class", "pin");
        pin.style.left = loc.x + '%';
        pin.style.top = loc.y + '%';
        pin.addEventListener("click", () => checkAnswer(loc.name));
        mapContainer.appendChild(pin);
    });
}

function checkAnswer(selectedName){ 
    if (selectedName === currentTarget) {
        alert("correct");
    } else {
        alert("try again");
    }
}