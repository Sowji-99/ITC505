const gridSize = 5;
var buttons=[], array_of_ids=[], resetCounter, firstMove;
for (var i=1;i<=gridSize;i++) {
  for (var j=1;j<=gridSize;j++) {
    id = 's'+i+''+j;
    buttons.push('<button type="button" onclick="sc('+i+', '+j+')" id="'+id+'" class="but blue">X</button>');
    array_of_ids.push(id);
    if (j==gridSize) buttons.push('<br/>');
  }  
}
document.querySelector("#container").innerHTML=buttons.join("")
/*----------------------------------------------------------------*/
var count = 0, nextSolution = 'O', totalTime = 0, bestTime = 0;
var time_string = "";
document.getElementById("nextSolution").innerHTML = "<font size='+2'>Solve for<font size='+3' color='blue'><b> BLUE</b></font>.";
changeColor();
randomize (gridSize*gridSize);
/* Found this online: https://stackoverflow.com/questions/20035357/display-current-time-from-javascript-count-up-timer/20035778#20035778 */
        var minutesLabel = document.getElementById("minutes");
        var secondsLabel = document.getElementById("seconds");
        
        var totalSeconds = 0; 
        setInterval(setTime, 1000);
        function setTime(){
            ++totalSeconds;   
            secondsLabel.innerHTML = pad(totalSeconds%60);
            minutesLabel.innerHTML = pad(parseInt(totalSeconds/60));
        }
        function pad(val){
            var valString = val + "";
            if(valString.length < 2)
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
		
function pause(){
  alert("Click OK when ready to continue");
}
/*-------------------RANDOMIZE-------------------------*/
function randomize(i){  
       for (var loop =0; loop <= i; loop++){
       sc(Math.floor(Math.random() * gridSize) + 1,
       Math.floor(Math.random() * gridSize) + 1);     
       solve();
       }
}
/*-------------------INDIVIDUAL SQUARES--------------*/
       
function s(x){
 if (document.getElementById(x).innerText == 'O')
      document.getElementById(x).innerText = 'X';
  else 
     document.getElementById(x).innerText = 'O';
}
/*---------------------ON CLICK----------------------*/
function sc(row, col){
 
  s("s" + row + col);  //Square that is clicked
  if((row-1) > 0) // One Above
    s("s" + (row-1) + col); 
  
  if((row + 1) <= gridSize) //One below
    s("s" + (row+1) +col); 
  
  if((col - 1) > 0) //One left
    s("s" + row + (col-1));
  
  if((col + 1) <= gridSize) //One right
    s("s" + row +(col+1));
  solve();
}
/*------------------------SOLVE---------------------------*/
/*------------------------SOLVE---------------------------*/
function solve() {
	      /*------------IF BLUE NEXT SOLUTION IS RED--------*/
if (nextSolution == 'O' && totalSeconds > 0 && changeColor()==(gridSize*gridSize)){   
  nextSolution = 'X';
  document.getElementById("nextSolution").innerHTML = "<font size='+2'>Solve for<font size='+3' font color='red'><b> RED</font></b>";
  
  //document.getElementById("time").style.color = "red";
  color1(["time","minutes","seconds","title"],"red",["count","stats","stats2"],"blue");
  color2("button1","red"); color2("button2","blue");

  // https://stackoverflow.com/questions/15071062/using-javascript-to-edit-css-gradient/15071347
  var dom = document.getElementById('background'); dom.style.backgroundImage = " radial-gradient(red,blue)";
  solveEnd();
  }   
  changeColor();   
}

          /*----PROVIDES STATS AND STARTS BOARD OVER---*/
          
function solveEnd(){
	console.log("Inside solveEnd() function");
  if (bestTime == 0)
    bestTime = totalSeconds;
    
  if (bestTime > 0 && totalSeconds < bestTime)
     bestTime = totalSeconds
     
  totalTime += totalSeconds;
  count += 1;
  document.getElementById("count").innerHTML = "You have solved this <b>" + count +"</b> times in: " + min_and_sec(totalTime)
  document.getElementById("stats").innerHTML = "Thats an average of: " + min_and_sec((totalTime / count))
  document.getElementById("stats2").innerHTML = "Your best time is " + min_and_sec(bestTime)
  alert("You solved it!");  
  totalSeconds = 0;
  randomize(gridSize*gridSize);   
}
    /*----------GIVES BOARD COLOR AND COUNTS FOR WIN--------------*/
/*----------GIVES BOARD COLOR AND COUNTS FOR WIN--------------*/
function changeColor() {
    var win_count = 0;
    for (var i = 0; i < (gridSize * gridSize); i++) {
        var square = document.getElementById(array_of_ids[i]);
        if (square.innerText == 'O') {
            square.style.background = 'gold';
            square.style.color = 'gold';
            if (nextSolution == 'O') win_count++;
        } else {
            square.style.background = 'grey';
            square.style.color = 'grey';
            if (nextSolution == 'X') win_count++;
        }
    }
    return win_count;
}


 
function min_and_sec(time){
  if (time > 60)
    return time_string = "<b>" + (time / 60).toFixed(0) + 
    "</b> minutes <b>" + (time % 60).toFixed(0) + "</b> seconds."
  else 
    return "<b>" + time.toFixed(0) + "</b>" + " seconds."
}

function color1(id, color, id2, color2){
    for(var i=0; i< id.length; i++) {
      document.getElementById(id[i]).style.color = color; 
    }
    for(var i=0; i< id2.length; i++) {
      document.getElementById(id2[i]).style.color = color2;  
    }
  }

function color2(id, color){
   document.getElementById(id).style.background=color;
    }

	function resetGame() {
		// Reset timer and start new game
		totalSeconds = 0;
		randomize(gridSize * gridSize);
	
		if (resetCounter === 0 && firstMove === true && hintCounter === 0) {
			// If conditions are met, show a simple restart confirmation
			const swalInstance = Swal.fire({
				title: "Restart?",
				text: "Are you sure you want to restart the game?",
				icon: "warning",
				showCancelButton: true,
				confirmButtonText: "Restart",
			}).then((willRestart) => {
				if (willRestart.isConfirmed) {
					// If user confirms, reset the game counters
					resetCounters();
				}
			});
		}
	}
	
	function resetCounters() {
		resetCounter = 0;
		firstMove = true;
		hintCounter = 0;
	}
	
	// Define the publicRestartGame function
	window.restartGame = function() {
		// Show a confirmation dialog for restarting the game
		const swalInstance = Swal.fire({
			title: "Restart?",
			text: "Are you sure you want to restart the game?",
			icon: "warning",
			showCancelButton: true,
			confirmButtonText: "Restart",
		}).then((willRestart) => {
			if (willRestart.isConfirmed) {
				// If user confirms, reset the game
				resetGame();
			}
		});
	};
	