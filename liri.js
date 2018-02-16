// Set the environmental variables to the global process.env object in the node.
require("dotenv").config();

// Create variables for the required node packages so that the node packages are available in this file.
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require("fs");

// Create a variable to make the keys.js file available in this file.
var keys = require("./keys.js");
// Create the variables to access the Spotify and Twitter keys.
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

// Create a global variable that myTweets function uses. 
var twitterHandle = "";
// Create a global variable the spotifyThisSong function and the doWhatItSays function use.
var songName = "";
// Create a global variable that the movieThis function uses.
var movieName = "";
// Create a global variable for process.argv[2] of the node. 
var action = process.argv[2];
// Create a global variable for process.argv[3] and any subsequent process.argv's of the node. 
var userInput = process.argv;

// Create switch statement that determines the action (or case) that the user enters.
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
    console.log("Sorry, I can't help you.");
  };

// Process the my-tweets action
function myTweets() {
  // If the user doesn't enter a Twitter handle, use the Donald Trump handle as the Twitter handle.
  if (userInput[3] === undefined || userInput[3] === ""){
    twitterHandle = "realDonaldTrump";
  }
  // If the user enters spaces in the Twitter handle, push the entered text strings into an array, join the text strings, and use the joined strings as the Twitter handle.
  else if (userInput.length - 3 > 1) {
    var arr = [];
    for (var i = 3; i > userInput.length; i++) {
      arr.push(userInput[i]);  
    }
    twitterHandle = arr.join("");
  // If the user enters the Twitter handle correcly, use the user input as the Twitter handle.
  } else { 
    twitterHandle = userInput[3];
  }

  // Forward the Twitter handle to the Twitter node package (or API).
  var params = {screen_name: twitterHandle};
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    // If there are no errors in API processing, loop through the 20 returned tweets to display the tweet date and text in the console log.
    if (!error) {
      for (var i = 0; i < 20; i++) {
        console.log("\n########################################################");
        console.log("Tweet date: " + tweets[i].created_at)
        console.log("Tweet text: " + tweets[i].text);
      }
    // If there are errors in API processing, display an error message in the console log.
    } else {
       console.log("An error occurred.")
    }
  });
};

// Process the spotify-this-song action
function spotifyThisSong() {
  // If the user doesn't enter a song name, use "The Sign" as the song name.
  if (userInput[3] === undefined || userInput[3] === ""){
    songName = "The Sign";
  }
  // If the user enters a song name with more than one word, concatinate the words followed by spaces to create the song name that is used.
  else if (userInput.length - 3 > 1) {
    for (var i = 3; i < userInput.length; i++) {
      if (userInput[i] === userInput.length) {
         songName = songName + userInput[i];  
      } else {
        songName = songName + userInput[i] + " ";
      } 
    }
  // If the user enters a song name with one word, use the user input as the song name.
  } else { 
    songName = userInput[3];
  }

  // Forward the song name to the Spotify node package (or API).
  spotify.search({ type: 'track', query: songName }, function (err, data) {
    // If there are errors in API processing, display an error message in the console log.
    if (err) {
      return console.log("An error occurred.", err);
    // If there are no errors in API processing, loop through the 20 returned songs to display the song URL, song name, album name, and artists in the console log.
    } else {
      var trackArr = data.tracks.items;
      for (var i = 0; i < trackArr.length; i++){
        console.log("\n########################################################");
        console.log("Song name: " + data.tracks.items[i].name);
        console.log("Song URL: " + data.tracks.items[i].album.artists[0].external_urls.spotify);
        console.log("Album name: " + data.tracks.items[i].album.name);
        console.log("Artists: " + data.tracks.items[i].album.artists[0].name);
        console.log("########################################################");
      }
    } 
  });
};

// Process the movie-this action
function movieThis() {
  // If the user doesn't enter a movie name, use "Mr Nobody" as the movie name.
  if (userInput[3] === undefined || userInput[3] === ""){
    movieName = "Mr Nobody";
  }
  // If the user enters a movie name with more than one word, add a + between each word to create the movie name that is used.
  else if (userInput.length - 3 > 1) {
    for (var i = 3; i < userInput.length; i++) {
      if (userInput[i] === userInput.length) {
        movieName = movieName + userInput[i];  
      } else {
        movieName = movieName + userInput[i] + "+";
      } 
    }
  // If the user enters a movie name with one word, use the user input as the movie name.
  } else { 
    movieName = userInput[3];
  }

  // Forward the movie name to the request node package (or API).
  var queryURL = "http://www.omdbapi.com/?apikey=trilogy&t=" + movieName;
  request(queryURL, function (error, response, body) {
    // If there are no errors in API processing, display the movie information in the console log.
    var results = JSON.parse(body);
    if (!error && response.statusCode === 200) {
    console.log("Title: " + results.Title);
    console.log("Year: " + results.Year);
    console.log("Ratings - Internet Movie Database: " + results.Ratings[0].Value);
    console.log("Ratings - Rotten Tomatoes: " + results.Ratings[1].Value);
    console.log("Country: " + results.Country);
    console.log("Language: " + results.Language);
    console.log("Plot: " + results.Plot);
    console.log("Actors: " + results.Actors);
    // If there are errors in API processing, display an error message in the console log.
    } else {
     console.log("An error occurred.", error);
    }  
  });
};

// Process the do-what-it-says action
function doWhatItSays() {
  // Read the text in the random.txt file.   
  fs.readFile("random.txt", "utf8", function(error, data) {
    // If there are errors in reading the file, display an error messaage in the console log.
    if (error) {
      console.log("An error occurred.", error);
    // If there are no errors in reading the file, create a variable that splits the spotify-this-song action and the default song name in the random.txt file.
    } else {
      var dataArr = data.split(",");
      var data = dataArr[0];
      var defaultSongName = dataArr[1];
      // Forward the default song name to the Spotify node package (or API).
      spotify.search({ type: 'track', query: defaultSongName }, function (err, data) {
      // If there are errors in API processing, display an error message in the console log.
      if (err) {
        return console.log("An error occurred.", err);
      }
      // If there are no errors in API processing, loop through the 20 returned songs to display the song URL, song name, album name, and artists in the console log.
      var trackArr = data.tracks.items;
      for (var i = 0; i < trackArr.length; i++){
        console.log("\n########################################################");
        console.log("URL for Song: " + data.tracks.items[i].album.artists[0].external_urls.spotify);
        console.log("Song name: " + data.tracks.items[i].name);
        console.log("Album name: " + data.tracks.items[i].album.name);
        console.log("Artists: " + data.tracks.items[i].album.artists[0].name);
        console.log("########################################################");
      }
    });
    }
  });
};
