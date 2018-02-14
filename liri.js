require("dotenv").config();

var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require("fs");
var keys = require("./keys.js");
var twitterHandle = "";
var songName = "";
var movieName = "";

// console.log("keys", keys);
// console.log(keys.twitter);

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var action = process.argv[2];
var userInput = process.argv;

function startBot(action){
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
}
startBot(action)  


function myTweets() {
  if (userInput[3] === undefined || userInput[3] === ""){
    twitterHandle = "realDonaldTrump"
  }
  else if(userInput.length - 3 > 1){
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
      //console.log("tweets", tweets);
      for (var i = 0; i < 20; i++) {
        //console.log(i)
        console.log("\nTweet date" + tweets[i].created_at + "\nTweet text: " + tweets[i].text);
      }


      // tweets is an array we only want 20 tweets
        // created_at
        // text
    }
    else{
       //console.log("error", error);
       console.log("oh no, something is not right!")
    }
  });
};

function spotifyThisSong() {
  if (userInput[3] === undefined || userInput[3] === ""){
    songName = "Close to You";
  }
  else if(userInput.length - 3 > 1){
    for (var i = 3; i < userInput.length; i++) {
      if(userInput[i] === userInput.length){
         songName = songName + userInput[i];  
      }else {
        songName = songName + userInput[i] + " ";
      } 
    }
  }else{ 
    songName = userInput[3]
  }

 //console.log(songName);

  spotify.search({ type: 'track', query: songName }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    //console.log(data.tracks.items); 
    // console.log(data.tracks.items[0].album);
    var trackArr = data.tracks.items;

    for (var i = 0; i < trackArr.length; i++){
      // spotify url
      console.log("\n########################################################")
      console.log("URL for song: " + data.tracks.items[i].album.artists[0].external_urls.spotify);
      // song name
      console.log("Song name: " + data.tracks.items[i].name);
      // album name
      console.log("Album name: " + data.tracks.items[i].album.name);

      console.log("Artists: " + data.tracks.items[i].album.artists[0].name);
      console.log("########################################################")
    }
  });
}

function movieThis() {

  if (userInput[3] === undefined || userInput[3] === ""){
    movieName = "Mr Nobody";
  }
  else if(userInput.length - 3 > 1){
    for (var i = 3; i < userInput.length; i++) {
      if(userInput[i] === userInput.length){
         movieName = movieName + userInput[i];  
      }else {
        movieName = movieName + userInput[i] + "+";
      } 
    }
  }else{ 
    movieName = userInput[3]
  }

  var queryURL = "http://www.omdbapi.com/?apikey=trilogy&t=" + movieName;
  request(queryURL, function (error, response, body) {
    var results = JSON.parse(body);
  // Print the error if one occurred 
  if (!error && response.statusCode === 200) {
   //console.log('statusCode:', response && response.statusCode); 
    console.log('Title:', results.Title);
    console.log('Year:', results.Year);
    console.log('Ratings - Internet Movie Database:', results.Ratings[0].Value);
    console.log('Ratings - Rotten Tomatoes', results.Ratings[1].Value);
    console.log('Country:', results.Country);
    console.log('Language:', results.Language);
    console.log('Plot:', results.Plot);
    console.log('Actors:', results.Actors);
  } else{
     console.log('error:', error);
  }
  // Print the response status code if a response was received
  
});
//
}

function doWhatItSays() {
  // if (userInput[3] === undefined || userInput[3] === ""){}
    
  fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      console.log(error);
    }
    else{
      var dataArr = data.split(",");
      var data = dataArr[0];
      songName = dataArr[1];
      startBot(data)
    }
  })
}
