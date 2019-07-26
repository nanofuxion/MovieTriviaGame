window.onload = function () {
    $(".mdl-button").on("click", btnPressed);
};
isStarted = false;
var timePerQ = 30;
var questionNumb;
var QCheck = {};
var questionIncrement = 0;
var intervalId;


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
        nextQuestion(questionIncrement);
    } else {
        getQnA(parseInt($(this).attr('id').slice(-1)) - 1, questionIncrement-1, $("#question").html(), $(this).html());
    }

}

function getQnA(ans, val, Q, A) {
    var questionIncrement = val;
    console.log("the answer var" + ans);
    console.log("the correct answer var" + (parseInt(cAnswers[questionIncrement], 2) - 10));
    if (ans == (parseInt(cAnswers[questionIncrement], 2) - 10)) {
        console.log("correct");
        console.log("answer"+(questionIncrement + 1));
        QCheck[("q"+questionIncrement)]=[Q, A,"Correct"];
    } 
    else{
        QCheck[("q"+questionIncrement)]=[Q, A,"Wrong"];
    }
    nextQuestion(questionIncrement + 1);
}

function nextQuestion(questionNumb) {

    if (questions[questionNumb] != undefined) {
        startTimer();
        $("#question").html(questions[questionNumb].question);
        $("#bt1").html(questions[questionNumb].answer1);
        $("#bt2").html(questions[questionNumb].answer2);
        $("#bt3").html(questions[questionNumb].answer3);
        $("#bt4").html(questions[questionNumb].answer4);
        questionIncrement = questionNumb + 1;
    } else {
        clearInterval(intervalId);
        showScore();
    }


}


function startTimer() {
    clearInterval(intervalId);
    timePerQ = 30;
    intervalId = setInterval(function () {
        if (timePerQ > -1) {
            $("#display").html(timeConverter(timePerQ));
            timePerQ = timePerQ - 1;
        }
        else {
            QCheck[("q"+(questionIncrement-1))]=[$("#question").html(), "","Unanswered"];
            nextQuestion(questionIncrement);
            timePerQ = 30;
        }

    },
        500);

}

function showScore() {
    $("#outPopUp").css({
        "top": "15%",
        "left": "10%",
        "bottom": "5%",
        "right": "10%",
        "background-color": "#e9ecef",
        "border-width":  "4px",
        "border-color": "black"
    });
    var results = $("<div class='span mx-auto'>");
    var h1 = $("<h1>").html("Done!").appendTo(results);
    var tallyCorrct = 0;
    var tallyWrong = 0;
    var tallyUnanswered = 0;
    for (let i = 0; i < Object.keys(QCheck).length; i++) {

        
        // var span = $("<div class='span'>);
        $("<p>").html(QCheck["q"+i][0]).appendTo(results);
        $("<p>").html(QCheck["q"+i][2]).appendTo(results);    
        if(QCheck["q"+i][2] == "Correct") tallyCorrct = tallyCorrct + 1;
        if(QCheck["q"+i][2] == "Wrong") tallyWrong = tallyWrong + 1;
        if(QCheck["q"+i][2] == "Unanswered") tallyUnanswered = tallyUnanswered + 1;
        if (i == Object.keys(QCheck).length-1)  $("<p>").html("<hr>" + "Totall correct: " + tallyCorrct + "<br>" + "Totall Wrong: " + tallyWrong +  "<br>" + "Totall Unanswered: " + tallyUnanswered).appendTo(results);
        results.appendTo("#sonOFoutPopUp");  
    }


    // QCheck.forEach(element => {
    //    $("<p>").html(questions[questionNumb].question) .appendTo("#sonOFoutPopUp");
    // });



}



//not an assignment requirement
// function resetGame() {
//     var bodyDefault = $(body).html();
// }