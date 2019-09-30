
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var start = false;
var level = 0;



// Is used to choose the next color in the sequence, display it and add it to the gamePattern array
function nextSequence(){
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
  $("#level-title").text("Level "+level);
  level ++;
}

// Registers the user input on the clicks on the colors and saves it to the userClickedPattern array
$(".btn").click(function (){
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length -1);
});

// To play the sound of the button presses
function playSound(name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}

// Animation of the buton presses
function animatePress(currentColor){
  $("."+currentColor).addClass("pressed");
  setTimeout(function (){
  $("."+currentColor).removeClass("pressed");
  }, 100);
}

// Keypress to start the game
$(document).keypress(function (){
  if (!start){
    nextSequence();
    start = true;
  }
});

// Used to check if the user input matches the gamePattern
function checkAnswer(currentLevel){
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    if (gamePattern.length === userClickedPattern.length){
      setTimeout(function(){
      nextSequence();
      },1000);
      userClickedPattern = [];
    }
  }else{
    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("#level-title").text("Game-Over, Press Any Key to Restart");
    startOver();
  }
}

// To restart game when wrong
function startOver(){
  level = 0;
  start = false;
  gamePattern = [];
  userClickedPattern = [];
}
