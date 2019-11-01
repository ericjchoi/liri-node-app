// LIRI Node App

// in order to use function #2: spotifyThisSong()
require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);


// in order to use function #1: concertThis()
var axios = require("axios");
var moment = require("moment");

// function #1
function concertThis() {
    var artist = process.argv[3];

    axios.get("https://rest.bandsintown.com/artists/" + artist +
        "/events?app_id=codingbootcamp").then(function (response) {
            for (var i = 0; i < response.data.length; i++) {
                console.log(
                    "Name of the venue: " + response.data[i].venue.name + "\n" +
                    "Venue location: " + response.data[i].venue.city + "," + response.data[i].venue.country + "\n" +
                    "Date of the event: " + moment(response.data[i].datetime).format("L") + "\n" +
                    "+------------------------------------------------------------------\n");
            }
        });
}

// function #2
function spotifyThisSong() {
    var song = process.argv[3];

    spotify
        .search({ type: 'track', query: song })
        .then(function (response) {
            console.log(
                "Artist(s): " + response + "\n");
            // "Artist(s): " + response.tracks.items[0].artists.name + "\n");
            // "Artist(s): " + response + "\n");
        })
        .catch(function (err) {
            console.log(err);
        });




}
function movieThis() {
    console.log("3");
}
function doWhatItSays() {
    console.log("4");
}
switch (process.argv[2]) {
    case "concert-this":
        concertThis();
        break;
    case "spotify-this-song":
        spotifyThisSong();
        break;
    case "movie-this":
        movieThis();
        break;
    case "do-what-it-says":
        doWhatItSays();
}