const gridSize = 5;
var buttons = [],
    array_of_ids = [],
    resetCounter, firstMove;
for (var i = 1; i <= gridSize; i++) {
    for (var j = 1; j <= gridSize; j++) {
        id = 's' + i + '' + j;
        buttons.push('<button type="button" onclick="sc(' + i + ', ' + j + ')" id="' + id + '" class="but blue">X</button>');
        array_of_ids.push(id);
        if (j == gridSize) buttons.push('<br/>');
    }
}
document.querySelector("#container").innerHTML = buttons.join("")
/*----------------------------------------------------------------*/
var count = 0,
    nextSolution = 'O',
    totalTime = 0,
    bestTime = 0;
var time_string = "";
document.getElementById("nextSolution").innerHTML = "<font size='+2'>Turn Off <font size='+3' color='black'><b> GOLD LIGHTS</b></font>.";
changeColor();
randomize(gridSize * gridSize);
var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");

var totalSeconds = 0;
setInterval(setTime, 1000);

function setTime() {
    ++totalSeconds;
    secondsLabel.innerHTML = pad(totalSeconds % 60);
    minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
    var valString = val + "";
    if (valString.length < 2)
        return "0" + valString;
    else
        return valString;
}

var bgMusic = new Audio('sound/OYE.mp3'); // Background music
bgMusic.loop = true; // Loop the background music
var clickSound = new Audio('smallClick.wav'); // Click sound effect

function toggleSound() {
    clickSound.muted = !clickSound.muted;
}

function toggleMusic() {
    if (bgMusic.paused) {
        bgMusic.play();
        document.getElementById("toggleMusic").textContent = "Background Music: On";
    } else {
        bgMusic.pause();
        document.getElementById("toggleMusic").textContent = "Background Music: Off";
    }
}

function pause() {
    alert("Click OK when ready to continue");
}
/*-------------------RANDOMIZE-------------------------*/

function randomize(i) {
    for (var loop = 0; loop <= i; loop++) {
        sc(Math.floor(Math.random() * gridSize) + 1,
            Math.floor(Math.random() * gridSize) + 1);
        solve();
    }
}
/*-------------------INDIVIDUAL SQUARES--------------*/

function s(x) {
    if (document.getElementById(x).innerText == 'O')
        document.getElementById(x).innerText = 'X';
    else
        document.getElementById(x).innerText = 'O';
}
/*---------------------ON CLICK----------------------*/

function sc(row, col) {

    s("s" + row + col); //Square that is clicked
    if ((row - 1) > 0) // One Above
        s("s" + (row - 1) + col);

    if ((row + 1) <= gridSize) //One below
        s("s" + (row + 1) + col);

    if ((col - 1) > 0) //One left
        s("s" + row + (col - 1));

    if ((col + 1) <= gridSize) //One right
        s("s" + row + (col + 1));
    solve();
}
/*------------------------SOLVE---------------------------*/

function solve() {
    changeColor();

    var win = true;
    for (var i = 0; i < gridSize * gridSize; i++) {
        if (document.getElementById(array_of_ids[i]).innerText != "O") {
            win = false;
            break;
        }
    }

    if (win) {
        totalTime += totalSeconds;
        count += 1;
        document.getElementById("count").innerHTML = "You have solved this <b>" + count + "</b> times in: " + min_and_sec(totalTime);
        document.getElementById("stats").innerHTML = "Thats an average of: " + min_and_sec((totalTime / count));
        if (bestTime == 0 || totalSeconds < bestTime) bestTime = totalSeconds;
        document.getElementById("stats2").innerHTML = "Your best time is " + min_and_sec(bestTime);
        alert("You solved it!");
        totalSeconds = 0;
        randomize(gridSize * gridSize);
    }
}

function solveEnd() {
    if (bestTime == 0)
        bestTime = totalSeconds;

    if (bestTime > 0 && totalSeconds < bestTime)
        bestTime = totalSeconds

    totalTime += totalSeconds;
    count += 1;
    document.getElementById("count").innerHTML = "You have solved this <b>" + count + "</b> times in: " + min_and_sec(totalTime)
    document.getElementById("stats").innerHTML = "Thats an average of: " + min_and_sec((totalTime / count))
    document.getElementById("stats2").innerHTML = "Your best time is " + min_and_sec(bestTime)
    alert("You solved it!");
    totalSeconds = 0;
    randomize(gridSize * gridSize);
}

function changeColor() {

    var win_count = 0;
    for (i = 0; i < (gridSize * gridSize); i++) {
        if (document.getElementById(array_of_ids[i]).innerText == 'O') {
            document.getElementById(array_of_ids[i]).style.background = 'grey';
            document.getElementById(array_of_ids[i]).style.color = 'grey';
            if (nextSolution == 'O') win_count += 1
        } else {
            document.getElementById(array_of_ids[i]).style.background = 'gold';
            document.getElementById(array_of_ids[i]).style.color = 'gold';
            if (nextSolution == 'X') win_count += 1
        }
    }
    console.log(win_count);
    return win_count;
}

function min_and_sec(time) {
    if (time > 60)
        return time_string = "<b>" + (time / 60).toFixed(0) +
        "</b> minutes <b>" + (time % 60).toFixed(0) + "</b> seconds."
    else
        return "<b>" + time.toFixed(0) + "</b>" + " seconds."
}

function color1(id, color, id2, color2) {
    for (var i = 0; i < id.length; i++) {
        document.getElementById(id[i]).style.color = color;
    }
    for (var i = 0; i < id2.length; i++) {
        document.getElementById(id2[i]).style.color = color2;
    }
}

function color2(id, color) {
    document.getElementById(id).style.background = color;
}

function resetGame() {

    totalSeconds = 0;
    randomize(gridSize * gridSize);
}


window.restartGame = function() {

    const swalInstance = Swal.fire({
        title: "Restart?",
        text: "Are you sure you want to restart the game?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Restart",
        customClass: {
            popup: 'medium-dialog'
        }
    }).then((willRestart) => {
        if (willRestart.isConfirmed) {

            resetGame();
        }
    });
};

function showHint() {
  Swal.fire({
      title: "Hint",
      html: `
      <pre style="font-family: monospace;">
Bottom  Top
O---O  OO---
-O-O-  O--O-
OOO--  -O---
--OOO  ---O-
O-OO-  ----O
-OO-O  O----
OO-OO  --O--
      </pre>`,
      icon: "info",
      confirmButtonText: "OK",
      customClass: {
          popup: 'medium-dialog'
      }
  });
}