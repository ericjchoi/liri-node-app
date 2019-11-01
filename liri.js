// LIRI Node App

// in order to use function #2: spotifyThisSong()
require("dotenv").config();
var keys = require("./keys");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);


// in order to use function #1: concertThis()
var axios = require("axios");
var moment = require("moment");

// function #1
function concertThis() {
    var artist = process.argv.slice(3);
    axios
        .get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
        .then(function (response) {
            for (var i = 0; i < response.data.length; i++) {
                console.log(
                    "\n+------------------------------------------------------------------\n" +
                    "Name of the venue : " + response.data[i].venue.name + "\n" +
                    "Venue location    : " + response.data[i].venue.city + "," + response.data[i].venue.country + "\n" +
                    "Date of the event : " + moment(response.data[i].datetime).format("L") + "\n" +
                    "+------------------------------------------------------------------\n");
            }
        })
        .catch(function (err) {
            console.log("\n+------------------------------------------------------------------");
            console.log("ERROR : Please review the following error message and re-try.");
            console.log("        Please re-enter the artist(s) correctly.\n\n");
            console.log(err);
            console.log("\n+------------------------------------------------------------------\n");

        });
}

// function #2
function spotifyThisSong() {
    var song = process.argv.slice(3);
    spotify
        .search({ type: "track", query: song })
        .then(function (response) {
                console.log("\n+------------------------------------------------------------------");
                console.log("Artist(s)   : " + response.tracks.items[0].artists[0].name);
                console.log("Song name   : " + response.tracks.items[0].name);
                console.log("Album title : " + response.tracks.items[0].album.name);
                console.log("Preview URL : " + response.tracks.items[0].preview_url);
                console.log("+------------------------------------------------------------------\n");
        })
        .catch(function (err) {
            console.log("ERROR : Please review the following error message and re-try.");
            console.log("        Please re-enter the song title correctly.\n\n");
            console.log(err);
            console.log("\n+------------------------------------------------------------------\n");
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