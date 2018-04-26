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

//Firebase logged state
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        console.log(user);
        var firebaseUser = firebase.auth().currentUser;
        logOutBtn.classList.remove("hide");
        singinBtn.classList.add("hide");
        signUpBtn.classList.add("hide");
        loginSpot.classList.add("hide");
        gameSection.classList.remove("hide");
        email = user.email;
        sendMsg(email);

    }
    else {
        console.log("not logged in");
        logOutBtn.classList.add("hide");
        singinBtn.classList.remove("hide");
        signUpBtn.classList.remove("hide");
        loginSpot.classList.remove("hide");
        gameSection.classList.add("hide");

    }
});



//Chat box here
function sendMsg() {
    $("#sendButton").on("click", function(event) {
        event.preventDefault();
        var message = $("#sendMessage").val();
        email = firebase.auth().currentUser.email;
        chat = email + ": " + message
        databaseRef.push().set(chat);
        $("#sendMessage").val("");  
    });
}

$("#sendButton").on("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        var message = $("#sendMessage").val();
        email = firebase.auth().currentUser.email;
        chat = email + ": " + message
        databaseRef.push().set(chat);
        $("#sendMessage").val("");
    } 
});

databaseRef.on("child_added", function(snapshot) {
    var chat = snapshot.val();
    $("#chatBox").append("<li>" + ": " + chat + "</li>");

})

  $("#singinBtn").on("click", function(event) {
    event.preventDefault();
    var email = $("#emailAddress").val();
    var pass = $("#userPW").val();
    var auth = firebase.auth();
    var promise = auth.signInWithEmailAndPassword(email, pass);
    $("#emailAddress").val("");
    $("#userPW").val("");

});

$("#signUpBtn").on("click", function(event) {
    event.preventDefault(); event.preventDefault();
    var email = $("#emailAddress").val();
    var pass = $("#userPW").val();
    var auth = firebase.auth();
    var promise = auth.createUserWithEmailAndPassword(email, pass);
    $("#emailAddress").val("");
    $("#userPW").val("");
});

$("#logOutBtn").on("click", function(event) {
    firebase.auth().signOut();
});

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