$(".green").css("background-color", "green");
$(".red").css("background-color", "red");
$(".yellow").css("background-color", "yellow");
$(".blue").css("background-color", "blue");

var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var functionCallCount = 0;
var started = false;

// Başlangıçta arka plan rengini sarı yap

$(".btn").click(function() {
    if (started) {
        var userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour);

        // Butona tıklandığında sesi çal
        playSound(userChosenColour);

        // Butona tıklandığında animasyonu uygula
        animatePress(userChosenColour);

        // Kullanıcı girişini kontrol et
        checkAnswer(userClickedPattern.length - 1);
    }
});

$(document).keypress(function() {
    if (!started) {
        startGameSequence();
    }
});

function startGameSequence() {
    var countDown = ["3", "2", "1", "Start"];
    var delay = 1000; // 1 saniye aralıklarla geri sayım

    countDown.forEach((text, index) => {
        setTimeout(() => {
            $("h1").text(text);
            if (index === countDown.length - 1) {
                setTimeout(() => {
                    nextSequence();
                    started = true;
                }, 1000); // "Start" gösterildikten sonra 1 saniye bekle ve oyunu başlat
            }
        }, index * delay);
    });
}

function nextSequence() {
    userClickedPattern = [];
    functionCallCount++;
    $("h1").text("Level " + functionCallCount);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    // Butonu seçip animasyonu uygula
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    // Ses dosyasını çal
    playSound(randomChosenColour);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("wrong");
        $("h1").text("Game Over, Press Any Key to Restart");

        $("body").addClass("game-over");

        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        startOver();
    }
}

function startOver() {
    functionCallCount = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false; // Oyun tekrar başlatılabilir hale gelir
}
