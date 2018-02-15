# LIRI Node App

LIRI is a Language Interpretation and Recognition Interface. 

In this interface, the user can enter any one of the following commands in a terminal followed by another argument to see some information returned from a node package:
- my-tweets followed by a tweet handle.
  This command returns a tweet date and tweet text from the Twitter node package for the last 20 tweets on the tweet handle.
- spotify-this-song followed by a song name.
  This command returns the song name, song URL, album, and artist from the Spotify node package for 20 songs that match the user-entered song name.
- movie-this followed by a movie name.
  This command uses the request node package to return movie information for the movie name from the Open Movie Database (OMDB) API.
- do-what-it-says.
  This command uses the readFile function in the file system node package to read a text file and return the file's default song information from the Spotify node package.

# Tools Used

- JavaScript
- node.js
- Twitter node package
- Spotify node package
- request node package
