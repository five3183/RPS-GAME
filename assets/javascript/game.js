  // Initialize Firebase
var config = {
    apiKey: "AIzaSyDZF_RpupNNdfaf2qVYOCh7Zy8CCNZ6xa8",
    authDomain: "rps-game-8536b.firebaseapp.com",
    databaseURL: "https://rps-game-8536b.firebaseio.com",
    projectId: "rps-game-8536b",
    storageBucket: "rps-game-8536b.appspot.com",
    messagingSenderId: "973949416284"
};

// get the firebase app and all the primitives to use
var app = firebase.initializeApp(config);
var database = app.database();
var auth = app.auth();
var storage = app.storage();

//Get a reference to our chat "room" in the data base
var databaseRef = database.ref().child("message");

//Chat box here

$("#sendButton").on("click", function(event) {
    event.preventDefault();
    var message = $("#sendMessage").val();
    databaseRef.push().set(message);
    $("#sendMessage").val("");  
});

databaseRef.on("child_added", function(snapshot) {
    var chat = snapshot.val();
    $("#chatBox").append("<li>" + chat + "</li>");

})

var user1 = {
    "wins": "0",
    "losses": "0",
    "tie": "0",
    "item": "",
}

var user2 = {
    "wins": "0",
    "losses": "0",
    "tie": "0",
    "item": "",
}


var user1wins = 0;
var user2wins = 0;
var user1losses = 0;
var user2losses = 0;
var user1ties = 0;
var user2ties = 0;
var user1Guess 
var user2Guess




$(".item").on("click", function(event) {
    $("#user1").append(this);
    guess = $(this).data("item")
    console.log(guess)
})

function checkItem() {
    if (user1Guess === "rock" && user2Guess === "scissor") {
        user1wins++;
        user2losses++;
        console.log("user1Guess wins")
    }
    else if (user1Guess === "rock" && user2Guess === "paper") {
        user1losses++;
        user2wins++;
        console.log("user2Guess wins")
    }
    else if (user1Guess === "rock" && user2Guess === "rock") {
        user1ties++;
        user2ties++;
        console.log("TIE")
    }

    else if (user1Guess === "paper" && user2Guess === "rock") {
        user1wins++;
        user2losses++;
        console.log("user1Guess wins");
    }
    else if (user1Guess === "paper" && user2Guess === "scissor") {
        user1losses++;
        user2wins++;
        console.log("user2Guess wins");
    }
    else if (user1Guess === "paper" && user2Guess === "paper") {
        user1ties++;
        user2ties++;
        console.log("TIE");
    }

    else if (user1Guess === "scissor" && user2Guess === "paper") {
        user1wins++;
        user2losses++;
        console.log("user1Guess wins");
    }
    else if (user1Guess === "scissor" && user2Guess === "rock") {
        user1losses++;
        user2wins++;
        console.log("user2Guess wins");
    }
    else if (user1Guess === "scissor" && user2Guess === "scissor") {
        user1ties++;
        user2ties++;
        console.log("TIE");
    }
}
//end check answers

function takeItem(){
    user1Guess = prompt("user1: RPS")
    user2Guess = prompt("user2: RPS")
    checkItem();
    if (user1wins < 5 && user2wins < 5) {
        takeItem()
    }
}

// $(document).ready(function() {
//     takeItem();
// });