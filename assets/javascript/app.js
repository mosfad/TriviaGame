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
//dynamically create question and options
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
    //use buttons for the options(w/no borders, and use hover pseudoclass to change its appearance=================================================================================================
    var optDivs = $("<div id='options-view'></div>");
    //dynamically create buttons for the options.
    for (var i = 0; i < optionsArray.length; i++) { 
        var buttn = $("<button>");
        buttn.addClass("btn-options");
        buttn.text(optionsArray[i]);
        //append button to the options div.
        optDivs.append(buttn);
    }
    //add time, question, and options to the question container.
    $("#quest-container").append(timeDisp, questDisp, optDivs);

}

function countDown() {
    //tracks the amount ot time alloted to each question.
    if (timer > 0) {
        timer--;
        $("#timer").text("Time Remaining: " + timer + "Seconds");
    }
    if (timer === 0){
        changeTimerZero();
    }
    console.log(timer);
   
}

function changeTimerZero() {

    clearInterval(questInterval);
    dispAnswerMessg("");
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
        var ansMessg = $("<p id='correct-ans'></p>").text("The correct answer was: " + currAns);// apppend them to the quest-containers!!!!!!!!!!!!!!!!!!!
        $("#quest-container").append(ansStatus, ansMessg);
    }
    else if (uOpt === currAns) {
        //message for a correct response
        var ansStatus = $("<p id='correct-ans'></p>").text("Correct!");
        $("#quest-container").append(ansStatus);
    }
    else if (uOpt !== currAns) {
        //message for a wrong response 
        var ansStatus = $("<p id='wrong-status'></p>").text("Nope!");
        var ansMessg = $("<p id='correct-ans'></p>").text("The correct answer was: " + currAns);// apppend them to the quest-containers!!!!!!!!!!!!!!!!!!!
        $("#quest-container").append(ansStatus, ansMessg);

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
        console.log("star-timer is: " + timer);
        /*if (timer === 0) {
            clearInterval(questInterval);
            dispAnswerMessg("");
        }*/
        //-----console.log("star-timer is: " + timer);
        //click event for the option the user picks.
        $(".btn-options").click(function(){
            clearInterval(questInterval);
            if (!optionChosen) {
                optionChosen = true;
            }
            userOptPick = $(this).text();
            console.log(userOptPick);
            console.log("btn-timer is: " + timer);
                //clear the timer if countdown is at 0 or the user chooses an option.
                //clearInterval(questInterval);
                //display the answer message for 6 seconds.
            dispAnswerMessg(userOptPick);
                //update tracker for the next question****************************************************************
            questTracker++
                //change the display to the next question and options after 6 seconds.
                //===========ansTimeOut = setTimeout(dispQuest,6000);
            
        })
        //----console.log("why is nothing happening");
        //if timer === 0 or option is selected(correct or wrong), change the display of the DOM to the answer message.
        //----console.log("timer is: " + timer);
        //-----console.log("Has option been chosen? " + optionChosen)
        /*if (timer === 0 || optionChosen) {
            //clear the timer if countdown is at 0 or the user chooses an option.
            //clearInterval(questInterval);
            //display the answer message for 6 seconds.
            dispAnswerMessg(userOptPick);
            //update tracker for the next question****************************************************************
            questTracker++*/
            //change the display to the next question and options after 6 seconds.
            //===========ansTimeOut = setTimeout(dispQuests, 6000);
            //-----console.log("why is nothing happening");
            
       
            //how do I repeat the above process until the last question?

        //}
    }
    //
    //if(wasStartClicked && (questTracker < questBank.length )){
    //display question and options if it is not the first one.
    //}

})

})