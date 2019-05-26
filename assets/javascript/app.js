$(document).ready(function() {
//Global variables and function------------------
var questInterval;
var ansTimeOut;
//var questTime;
var numCorrect = 0;
var numWrong = 0;
var numNoAns = 0;
var wasStartClicked = false;   //how do i track last question?
//var optionChosen = false; //tracks whether option was clicked.
var eachQuest = "";    
var currAns = "";
var questTracker = 0;  //Keeps track index of current question.
var optionsArray = [];
var flagsArray = [];
var timer = 30;//displays current time in seconds.
var userOptPick = "";




//Object holds the game data
var questBank = [
            {"How many countries are in Africa?": {"54":1, "25":0, "22":0, "38":0}}
        , {"Which of these cities is the most populous in North America?": {"Los Angeles, United States":0, "Mexico City, Mexico":1, "New York City, United States":0, "Toronto, Canada":0}}
        , {"Which of these countries is not a member of the European Union?": {"France":0, "Sweden":0, "Switzerland":1, "Latvia":0}}
        , {"Which country has the largest landmass in North America?": {"United States":0, "Nicaragua":0, "Mexico":0, "Canada":1}}
        , {"What is the population of the largest country in Africa?": {"50 million":0, "300 million":0, "200 million":1, "150 million":0}}
        , {"What is the population of the largest country in Europe?": {"138 million":0, "143 million":1, "82 million":0, "65 million":0}}
        , {"Which of these countries has the largest oil reserves?": {"Venezuela":1, "Saudi Arabia":0, "Iran":0, "Canada":0}}
];
var questGif = ['<iframe src="https://giphy.com/embed/kWKwwVxyhJ7A4" width="480" height="350" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>',
'<iframe src="https://giphy.com/embed/3ohuAvEfJ9GrpBgQw0" width="480" height="264" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>', 
'<iframe src="https://giphy.com/embed/ZcW4W6fbSX9aU1FolZ" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>',
'<iframe src="https://giphy.com/embed/TM9k3mdYgeudi" width="480" height="313" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>',
'<iframe src="https://giphy.com/embed/74iHYeuF74YCI" width="480" height="350" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>',
'<iframe src="https://giphy.com/embed/98962YSKX9Ely" width="360" height="350" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>',
'<iframe src="https://giphy.com/embed/Y3SCFPA3ctXn6K9WVF" width="480" height="350" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>'
]

//resets the game.
function resetGame(){
    numCorrect = 0;
    numWrong = 0;
    wasStartClicked = false;
    eachQuest = "";
    currAns = "";
    questTracker = 0;
    optionArray = [];
    flagsArray = [];
    timer = 30;
    userOptPick = "";
}

function getCurrQuest() {
    //update the current question
    var questArray = Object.keys(questBank[questTracker]); 
    eachQuest = questArray[0];
    console.log(eachQuest);
    //don't update tracker yet; need it for corresponding options.
    
}

function getCurrOptions() {
    //update the options for the current question
    //use questTracker to get Array of corresponding questions
    var optionsAndFlagArray = Object.values(questBank[questTracker]);
    var optionsAndFlagObj = optionsAndFlagArray[0];
    optionsArray = Object.keys(optionsAndFlagObj);
    flagsArray = Object.values(optionsAndFlagObj);
    //get the current answer for this question.
    console.log(flagsArray);
    console.log(optionsArray);



}

function getCurrAns() {
    //store the answer for the current question.
    for (var i = 0; i < flagsArray.length; i++) {
        if (flagsArray[i] === 1) {
            currAns = optionsArray[i];
        }
    }
}
//dynamically create question and options
function questLayout() {
    getCurrQuest();
    getCurrOptions();
    //clear the user pick for the current question
    userOptPick = "";
    //clear contents of the div holding questions, options, or other messages.
    $("#quest-container").empty();
    //organizes the layout of page so that questions and options are displayed.
    var timeDisp = $("<p id='timer'></p>").text("Time Remaining: " + timer + " Seconds");
    var questDisp = $("<p id= 'each-quest'></p>").text(eachQuest);
    console.log(timeDisp.text());
    console.log(questDisp.text());
    var optDivs = $("<div class='options-view'></div>");
    //dynamically create buttons for the options.
    for (var i = 0; i < optionsArray.length; i++) { 
        var buttn = $("<button>");
        buttn.addClass("btn-options");
        buttn.text(optionsArray[i]);
        //append button to the options div.
        optDivs.append(buttn);
    }
    //add time, question, and options to the question container.
    $("#quest-container").append(timeDisp, "<br/>", questDisp, optDivs);
    
}

function countDown() {
    //tracks the amount ot time alloted to each question.
    if (timer > 0) {
        timer--;
        $("#timer").text("Time Remaining: " + timer + " Seconds");
        console.log("the user pick is " + userOptPick);
    }
    else if (timer === 0 && userOptPick === ""){
        //this conditional statement fixes display when user gives no answer.
        console.log("the timer is " + timer);
        console.log("the user pick is " + userOptPick);
        noUserAnswer();
        //clearInterval(questInterval);
    }
    console.log("the user pick is " + userOptPick);
    console.log(timer);
   
}

function noUserAnswer() {

    clearInterval(questInterval);
    dispAnswerMessg("");
    //Go to the next question
    questTracker++;
    if (questTracker < questBank.length) {
        setTimeout(dispQuest, 5000);
    }
    else {
        setTimeout(resultDisp, 5000);
    }
}
function dispQuest() {
    //time alloted to each question is 30 seconds.
    timer = 30;
    if (wasStartClicked) {
        //remove start button before displaying elements.
        $("#start-btn").remove();
    }
    //display next question and option.
    questLayout();
    questInterval = setInterval(countDown, 1000);
       
}

//function displays the appropriate answer message for 5 seconds.
function dispAnswerMessg(uOpt) {
    //get the current answer.
    getCurrAns();
    //remove the elements holding questions and options
    $("#each-quest").remove();
    $(".btn-options").remove();
    console.log("User picked this option: " + uOpt);
    console.log("The current answer is " + currAns);
    if (uOpt === "") {
        //message for timed out response
        var ansStatus = $("<p id='timedOut-status'></p>").text("Out of Time!");
        var ansMessg = $("<p id='correct-ans'></p>").text("The correct answer was: " + currAns);
        var ansGif = $(questGif[questTracker]);
        $("#quest-container").append(ansStatus, ansMessg, ansGif);
        //update number of questions unanswered
        numNoAns++;
    }
    else if (uOpt === currAns) {
        //message for a correct response
        var ansStatus = $("<p id='correct-ans'></p>").text("Correct!");
        var ansGif = $(questGif[questTracker]);
        $("#quest-container").append(ansStatus, ansGif);
        //update number of questions answered correctly
        numCorrect++;
    }
    else if (uOpt !== currAns) {
        //message for a wrong response 
        var ansStatus = $("<p id='wrong-status'></p>").text("Nope!");
        var ansMessg = $("<p id='correct-ans'></p>").text("The correct answer was: " + currAns);// apppend them to the quest-containers!!!!!!!!!!!!!!!!!!!
        var ansGif = $(questGif[questTracker]);
        $("#quest-container").append(ansStatus, ansMessg, ansGif);
        //update number of questions incorrectly answered
        numWrong++;

    }

    
}
//shows the result of the end of the game.
function resultDisp() {
//remove all content of #quest-container, except time)
$("#timedOut-status").remove();
$("#correct-ans").remove();
$("#wrong-status").remove();
$(".giphy-embed").remove();
//include the elements that will display results.
var resMessg = $("<p id='res-messg'></p>").text("All done, here is how you did!");
var rightAns = $("<p id='right-ans'></p>").text("Correct Answers: " + numCorrect);
var wrongAns = $("<p id='wrong-ans'></p>").text("Incorrect Answers: " + numWrong);
var noAns = $("<p id='no-ans'></p>").text("Unanswered: " + numNoAns);
var buttn = $("<button>");//.text("Start Over?");
buttn.addClass("start-buttons");
buttn.text("Start Over?");
$("#quest-container").append(resMessg, rightAns, wrongAns, noAns, buttn);

}


//attach a click event to the start button
$("#game-container").on("click", ".start-buttons", function(){
    console.log($("#quest-container").text());

    //reset the game to play again.
    resetGame();
    if (wasStartClicked === false) {
        wasStartClicked = true;
        //display the questions and options
        dispQuest();
        console.log("star-timer is: " + timer);
        //click event for the option the user picks. use default
        $("#quest-container").on("click", ".btn-options", function(){
            console.log("Is this button event being registered?????");
            clearInterval(questInterval);
            /*if (!optionChosen) {
                optionChosen = true;
            }*/
            userOptPick = $(this).text();
            console.log(userOptPick);
            console.log("btn-timer is: " + timer);
            dispAnswerMessg(userOptPick);
            //update tracker for the next question****************************************************************
            questTracker++;
            if (questTracker < questBank.length) {
                //display next question if it's not the last one.
                
                //display question after 5 seconds.
                setTimeout(dispQuest, 5000);
                console.log("start*****-timer is: " + timer);

            }
            else {
                //display the results of the game after last question.
                setTimeout(resultDisp, 5000);
            }
        });
    }
    
});

});