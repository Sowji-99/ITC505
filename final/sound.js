var backgroundMusic = new Audio('sound/OYE.mp3');
backgroundMusic.loop = true;
backgroundMusic.volume = 0.5; // Adjust volume as needed

// Function to start playing background music
function startBackgroundMusic() {
    backgroundMusic.play();
}

// Function to stop playing background music
function stopBackgroundMusic() {
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
}

// Toggle background music based on its current state
function toggleBackgroundMusic() {
    if (backgroundMusic.paused) {
        startBackgroundMusic();
    }
}

// Attach toggleBackgroundMusic function to the toggle button
document.addEventListener('DOMContentLoaded', function() {
    var toggleMusicButton = document.getElementById('toggleMusicButton');
    if (toggleMusicButton) {
        toggleMusicButton.addEventListener('click', toggleBackgroundMusic);
    }

    var turnOffMusicButton = document.getElementById('turnOffMusicButton');
    if (turnOffMusicButton) {
        turnOffMusicButton.addEventListener('click', stopBackgroundMusic);
    }
});


// Play click sound when a light is clicked
function playClickSound() {
    var toggleSound = new Audio('sound/smallClick.wav');
    toggleSound.play();
}

// Attach click sound to each light
var lights = document.getElementsByClassName("lightit");
for (var i = 0; i < lights.length; i++) {
    lights[i].addEventListener("click", playClickSound);
}
