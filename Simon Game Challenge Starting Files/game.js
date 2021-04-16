var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
$(document).keypress(function(){
    if(!started){
        nextSequence();
        started = true;
    }
    
})

$(".btn").click(function(e){
    var userChosenColour = e.target.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
    
});

function playSound(name){     
    var clickSound = new Audio("sounds/"+ name+".mp3");
    clickSound.play();
}


function nextSequence(){
    $("h1").text("Level " + level)
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level = level +1;
    userClickedPattern = [];
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);

}

function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel]=== gamePattern[currentLevel]){
        
        if(userClickedPattern.length == gamePattern.length){
            
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }else{
        var wrongClick = new Audio("sounds/wrong.mp3");
        wrongClick.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over")
        },200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

//start over function when you get the sequence wrong

function startOver(){
    level = 0;
    gamePattern=[];
    started=false;
}
