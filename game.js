const buttonColours=["red", "blue", "green", "yellow"];
const gamePattern = [];
const userClickedPattern = [];
const redSound = new Audio("sounds/red.mp3");
const blueSound = new Audio("sounds/blue.mp3");
const greenSound = new Audio("sounds/green.mp3");
const yellowSound = new Audio("sounds/yellow.mp3");
const wrongSound = new Audio("sounds/wrong.mp3");

var started = false;
var level = 0;

//game starter
$(document).keypress(function(){
  if(started){return;}
  started=true;
  $("#level-title").text("Level 0");
  nextSequence();
});

//event handler buttom clicked
$(".btn").click(function(){
  if(!started){return;}
  let userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

//checkAnswer
function checkAnswer(currentLevel){
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    console.log("success at "+currentLevel);
    if(currentLevel == gamePattern.length-1){
      setTimeout(nextSequence ,1000);
    }
  }
  else{
    wrongSound.play();
    $("body").addClass("game-over");
    setTimeout(()=>{$("body").removeClass("game-over");}, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

//randomly generate next sequence color
function nextSequence(){
  userClickedPattern.splice(0,userClickedPattern.length);

  level++;
  $("#level-title").text( "Level "+level);
  let randomNumber = Math.floor(Math.random()*4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  //buttom flash
  $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
  //make sound
  playSound(randomChosenColour);

  console.log("game pattern is " + gamePattern);
  console.log("user pattern is " + userClickedPattern);
}


//playSound
function playSound(name){
  switch(name){

    case "red":
      redSound.play();
      break;

    case "blue":
      blueSound.play();
      break;

    case "green":
      greenSound.play();
      break;

    case "yello":
      yellowSound.play();
      break;

    default:
      
  }
}


//animate button pressed
function animatePress(currentColour){
  let currButton = $("#"+currentColour);
  currButton.addClass("pressed");
  setTimeout(()=>{currButton.removeClass("pressed");}, 100);
}




function startOver(){
  started=false;
  gamePattern.splice(0,gamePattern.length);
  level=0;
}
