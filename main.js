window.onload = function() {
    $(".mdl-button").on("click", btnPressed);
};
isStarted = false;
questionNumb = {};
questionIncrement = 1;


function timeConverter(t) {

    var minutes = Math.floor(t / 60);
    var seconds = t - (minutes * 60);

    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    if (minutes === 0) {
        minutes = "00";
    } else if (minutes < 10) {
        minutes = "0" + minutes;
    }
    return minutes + ":" + seconds;
}

function btnPressed() {
    if (!isStarted) {
        isStarted = true;
        if ($(this).hasClass("mdl-js-ripple-effect")) alert("The button wasn't special sorry 😜");
        console.log($(this));
        //questionNumb.oof = "oof0";
        // console.log(questionNumb.oof);
    }

}

function getQnA() {
    questionNumb

}


function resetGame() {
    var bodyDefault = $(body).html();
}