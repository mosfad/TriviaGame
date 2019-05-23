$(document).ready(function() {
//Global variables and function------------------
var questInterval;
var ansInterval;
//var questTime;
var numCorrect = 0;
var numWrong = 0;
var numNoAns = 0;
var wasStartClicked = false;   //how do i track last question?
var eachQuest = "";    
var currAns = "";
var questTracker = 0;
var optionsArray = [];
var timer = 30;//displays current time in seconds.


//resets the game.
function reset(){

}

//Object holds the game data
var questBank = [
            {quest1: {"OptionA":0, "OptionB":1, "OptionC":0, "OptionD":0}}
        , {quest2: {"OptionA":0, "OptionB":1, "OptionC":0, "OptionD":0}}
        , {quest3: {"OptionA":0, "OptionB":1, "OptionC":0, "OptionD":0}}
        , {quest4: {"OptionA":0, "OptionB":1, "OptionC":0, "OptionD":0}}
        , {quest5: {"OptionA":0, "OptionB":1, "OptionC":0, "OptionD":0}}
        , {quest6: {"OptionA":0, "OptionB":1, "OptionC":0, "OptionD":0}}
        , {quest7: {"OptionA":0, "OptionB":1, "OptionC":0, "OptionD":0}}
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
    //update questTracker for the next question
    console.log(optionsArray);
    questTracker++;


}
//
function questLayout() {
    getCurrQuest();
    getCurrOptions();
    //organizes the layout of page so that questions and options are displayed.
    var timeDisp = $("<p id='timer'></p>").text("Time Remaining: " + timer + "Seconds");
    var questDisp = $("<p id= 'each-quest'></p>").text(eachQuest);
    console.log(timeDisp.text());
    console.log(questDisp.text());
    //how to show options in different lines and 
    var optionDisp;
    //use buttons for the options(w/no borders, and use hover pseudoclass to change its appearance=================================================================================================
    for (var i = 0; i < optionsArray.length; i++) { 
        if (i === 0) {
            optionDisp = $("<p class='options'></p>").text(optionsArray[i]);
        }
        else{
            optionDisp.append("<p class='options'>" + optionsArray[i] + "</p>");
        }
    }
    $("#quest-container").append(timeDisp, questDisp, optionDisp);

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
        $("#start-btn").remove();
        questLayout();
    }
    //get and display current quest and options
    
}

//WHEN TO CLEAR THE setInterval() for a new question.

//Timer is set to 30 seconds for each question.
var questTimer;

//attach a click event to the start button
$("#start-btn").click(function(){
    var timeDisp = $("p #timer").text("Time Remaining: " + timer + "Seconds");
    $("#quest-container").text("my name is.......");
    console.log($("#quest-container").text());

    //wasStartClicked = true;
    //timer interval or
    if (wasStartClicked === false) {
        wasStartClicked = true;
        //display the questions and options
        dispQuests();
        //start the countdown
        questInterval = setInterval(countDown, 1000);
        if (timer === 0) {
            //clear the timer if countdown is at 0.
            clearInterval(questInterval);

        }
    }

})

})