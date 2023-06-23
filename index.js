var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];

var started=false;
var level=0;

$(".play-button").click(function(){
    if(!started){
    nextSequence();
    started=true;
    $(".play-button").addClass("hidden");
    }
});



$(".btn").on("click" , function(){
    var userChosencolor=$(this).attr("id");
    userClickedPattern.push(userChosencolor);
    console.log(userClickedPattern);
    playsound(userChosencolor);
    animatepress(userChosencolor);

    checkanswer(userClickedPattern.length-1);

});



function nextSequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColours=buttonColours[randomNumber];
    gamePattern.push(randomChosenColours);
    $("#"+randomChosenColours).fadeIn(100).fadeOut(100).fadeIn(100);
    playsound(randomChosenColours);
    
}



function playsound(name){
    var music=new Audio(name+".mp3");
    music.play();
}

function animatepress(currentcolour){
    $("#"+currentcolour).addClass("pressed");

    setTimeout(function(){
        $("#"+currentcolour).removeClass("pressed");
    },150);
}

function checkanswer(currentlevel){
    if(gamePattern[currentlevel]===userClickedPattern[currentlevel]){
        console.log("success");

        if(gamePattern.length===userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        playsound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over,press the button to restart")
        $(".play-button").text("Restart").removeClass("hidden");
        startover();
    }
}
function startover(){
    level=0;
    gamePattern=[];
    started=false;
}

 


