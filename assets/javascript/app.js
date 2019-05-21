$(document).ready(function() {
//Global variables and function------------------
var questInterval;
var questTime;
var numCorrect = 0;
var numWrong = 0;
var numNoAns = 0;
var wasStartClicked = false;
var eachQuest = "";
var currAns = "";
var questTracker = 0;
var optionsArray;//array


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
    //don't update tracker yet; need it for corresponding options.
    
}

function getCurrOptions() {
    //update the options for the current question
    //use questTracker to get Array of corresponding questions
    var optionsAndFlagArray = Object.values(questBank[questTracker]);
    optionsArray = Object.keys(optionsAndFlagArray);
    //update questTracker for the next question
    questTracker++;


}
function dispQuests() {
    if (wasStartClicked) {
        $("#start-btn").remove();
    }
    //get and display current quest and options
    
}

//Timer is set to 30 seconds for each question.
var questTimer = setTimeout(dispQuests, 30000);

//attach a click event to the start button
$("#start-btn").click(function(){
    wasStartClicked = true;

})

})