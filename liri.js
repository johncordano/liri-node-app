require("dotenv").config();

var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require("fs");
var keys = require("./keys.js");

// console.log("keys", keys);
// console.log(keys.twitter);

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var action = process.argv[2];
var userInput = process.argv;


switch (action) {
  case "my-tweets":
    myTweets();
    break;
  case "spotify-this-song":
    spotifyThisSong();
    break;
  case "movie-this":
    movieThis();
    break;
  case "do-what-it-says":
    doWhatItSays();
    break;
  default:
    console.log("Sorry, I can't help you :(");
}

function myTweets() {
  
  var twitterHandle;

  if (userInput[3] === ""){
    twitterHandle = "realDonaldTrump"
  }
  else if(userInput - 3 > 1){
    var arr = [];
    for (var i = 3; i > userInput.length; i++) {
      arr.push(userInput[i]);// push each item from userInput array to empty array  
    }
    twitterHandle = arr.join("") //the array on ""
  }else{
    // 
    twitterHandle = userInput[3]
  }

 
  var params = {screen_name: twitterHandle};
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log("tweets", tweets);
  }
  else{
     console.log("error", error);
  }
});
}

// function spotifyThisSong() {
//   // var songName = process.argv[3];
//   spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
//   if (err) {
//     return console.log('Error occurred: ' + err);
//   }
//  console.log(data); 
// });
// }

// function movieThis() {
//   // var movieName = process.argv[3];
//   request('http://www.google.com', function (error, response, body) {
//   // Print the error if one occurred  
//   console.log('error:', error);
//   // Print the response status code if a response was received
//   console.log('statusCode:', response && response.statusCode); 
//   console.log('body:', body);
// });
// http://www.omdbapi.com/?apikey=trilogy&t=" + movieName + "
//}

// function doWhatIsSays() {
//   fs.readFile("random.txt", "utf8", function(err, data) {
//     if (err) {
//       return console.log(err);
//     }
//     // Use data from random text in spotifyThisSong function
//   });	
// }