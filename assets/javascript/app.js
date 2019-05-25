$(document).ready(function() {
//Global variables and function------------------
var questInterval;
var ansTimeOut;
//var questTime;
var numCorrect = 0;
var numWrong = 0;
var numNoAns = 0;
var wasStartClicked = false;   //how do i track last question?
var optionChosen = false; //tracks whether option was clicked.
var eachQuest = "";    
var currAns = "";
var questTracker = 0;  //Keeps track index of current question.
var optionsArray = [];
var flagsArray = [];
var timer = 30;//displays current time in seconds.
var userOptPick = "";


//resets the game.
function reset(){

}

//Object holds the game data
var questBank = [
            {quest1: {"OptionA":1, "OptionB":0, "OptionC":0, "OptionD":0}}
        , {quest2: {"OptionA":0, "OptionB":1, "OptionC":0, "OptionD":0}}
        , {quest3: {"OptionA":0, "OptionB":0, "OptionC":1, "OptionD":0}}
        , {quest4: {"OptionA":0, "OptionB":0, "OptionC":0, "OptionD":1}}
        , {quest5: {"OptionA":0, "OptionB":0, "OptionC":1, "OptionD":0}}
        , {quest6: {"OptionA":0, "OptionB":1, "OptionC":0, "OptionD":0}}
        , {quest7: {"OptionA":1, "OptionB":0, "OptionC":0, "OptionD":0}}
];

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
    //curAns = 
    console.log(flagsArray);
    console.log(optionsArray);
    //questTracker++;


}

function getCurrAns() {
    //store the answer for the current question.
    for (var i = 0; i < flagsArray.length; i++) {
        if (flagsArray[i] === 1) {
            currAns = optionsArray[i];
        }
    }
}
//
function questLayout() {
    getCurrQuest();
    getCurrOptions();
    //clear contents of the div holding questions, options, or other messages.
    $("#quest-container").empty();
    //organizes the layout of page so that questions and options are displayed.
    var timeDisp = $("<p id='timer'></p>").text("Time Remaining: " + timer + "Seconds");
    var questDisp = $("<p id= 'each-quest'></p>").text(eachQuest);
    console.log(timeDisp.text());
    console.log(questDisp.text());
    //how to show options in different lines and 
    var optionDisp;
    //use buttons for the options(w/no borders, and use hover pseudoclass to change its appearance=================================================================================================
    //Add an attribute each button to store and identify the right option
    var optDivs = $("<div id='options-view'></div>");
    for (var i = 0; i < optionsArray.length; i++) { 
        var buttn = $("<button>");
        buttn.addClass("btn-options");
        //buttn.attr(optionsArray[i]);
        buttn.text(optionsArray[i]);
        //append button to the options div.
        optDivs.append(buttn);
        //optDivs.append($("<p>").text(optionsArray[i]));
        /*if (i === 0) {
            optionDisp = $("<p class='options'></p>").text(optionsArray[i]);
        }
        else{
            optionDisp.append("<p class='options'>" + optionsArray[i] + "</p>");
        }*/
    }
    $("#quest-container").append(timeDisp, questDisp, optDivs);

}

function countDown() {
    //tracks the amount ot time alloted to each question.
    if (timer > 0) {
        timer--;
        $("#timer").text("Time Remaining: " + timer + "Seconds");
    }
    
    
}
function dispQuests() {
    //time alloted to each question is 30 seconds.
    timer = 30;
    if (wasStartClicked) {
        //display first question and options if start button was clicked
        $("#start-btn").remove();
        questLayout();
    }
    else{
        //display next question and options(after first question)
        questLayout();
    }
    
}

//function displays the appropriate answer message for 6 seconds.
function dispAnswerMessg(uText) {
    //message for a timed out response stays the same
    //remove the elements holding questions and options
    $("#each-quest").remove();
    $("btn-options").remove();
    if (uText === currAns) {
        //message for a correct response
        $("<p id='correct-ans'></p>").text("Correct!");
    }
    
    else if (userOption === 0) {
        //message for a wrong response
        $("<p id='correct-ans'></p>").text("Nope!");
        $("<p id='correct-ans'></p>").text("The correct answer was: " + currAns);
    }

    else {
        //message for timed out response
        $("<p id='correct-ans'></p>").text("Out of Time!");
        $("<p id='correct-ans'></p>").text("The correct answer was: " + currAns);
    }
    
}

//WHEN TO CLEAR THE setInterval() for a new question.

//Timer is set to 30 seconds for each question.
var questTimer;

//attach a click event to the start button
$("#start-btn").click(function(){
    //var timeDisp = $("p #timer").text("Time Remaining: " + timer + "Seconds");
    //$("#quest-container").text("my name is.......");
    console.log($("#quest-container").text());

    //wasStartClicked = true;
    //timer interval or
    if (wasStartClicked === false) {
        wasStartClicked = true;
        //display the questions and options
        dispQuests();
        //start the countdown
        questInterval = setInterval(countDown, 1000);
        //click event for the option the user picks.
        $(".btn-options").click(function(){
            if (!optionChosen) {
                optionChosen = true;
            }
            userOptPick = $(this).text();
            console.log(userOptPick);
        })
        //if timer === 0 or option is selected(correct or wrong), change the display of the DOM to the answer message.
        if (timer === 0 || optionChosen) {
            //clear the timer if countdown is at 0 or the user chooses an option.
            clearInterval(questInterval);
            //display the answer message for 6 seconds.
            dispAnswerMessg(userOptPick);
            //change the display to the next question and options after 6 seconds.
            ansTimeOut = setTimeout(dispQuests, 6000);
            //update tracker for the next question****************************************************************
            questTracker++;
            //how do I repeat the above process until the last question?

        }
    }
    //
    if(wasStartClicked && (questTracker < questBank.length )){
    //display question and options if it is not the first one.
    }

})

})