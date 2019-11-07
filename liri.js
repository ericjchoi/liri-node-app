// LIRI Node App

// in order to use function #2: spotifyThisSong()
require("dotenv").config();
var keys = require("./keys");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var axios = require("axios");   // concert-this, movie-this
var moment = require("moment"); // concert-this
var targetValue = "";           // do-what-it-says

// function #1
function concertThis() {
    if (targetValue === "") {
        var artist = process.argv.slice(3);
    } else {
        var artist = targetValue;
    }
    axios
        .get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
        .then(function (response) {
            for (var i = 0; i < response.data.length; i++) {
                console.log(
                    "\n+-----------------------------------------------------------------------\n" +
                    "Name of the venue : " + response.data[i].venue.name + "\n" +
                    "Venue location    : " + response.data[i].venue.city + "," + response.data[i].venue.country + "\n" +
                    "Date of the event : " + moment(response.data[i].datetime).format("L") + "\n" +
                    "+-----------------------------------------------------------------------\n");
            }
        })
        .catch(function (err) {
            console.log("\n+-----------------------------------------------------------------------");
            console.log("ERROR : Please review the following error message and re-try.");
            console.log("        Please re-enter the artist(s) correctly.\n\n");
            console.log(err);
            console.log("\n+-----------------------------------------------------------------------\n");
        });
}

// function #2
function spotifyThisSong() {
    if (targetValue === "") {
        var song = process.argv.slice(3);
    } else {
        var song = targetValue;
    }
    spotify
        .search({ type: "track", query: song })
        .then(function (response) {
            console.log("\n+-----------------------------------------------------------------------");
            console.log("Artist(s)   : " + response.tracks.items[0].artists[0].name);
            console.log("Song name   : " + response.tracks.items[0].name);
            console.log("Album title : " + response.tracks.items[0].album.name);
            console.log("Preview URL : " + response.tracks.items[0].preview_url);
            console.log("+-----------------------------------------------------------------------\n");
            globalWait = false;
        })
        .catch(function (err) {
            console.log("ERROR : Please review the following error message and re-try.");
            console.log("        Please re-enter the song title correctly.\n\n");
            console.log(err);
            console.log("\n+-----------------------------------------------------------------------\n");
        });
}

// function #3
function movieThis() {
    if (targetValue === "") {
        var movieName = "";
        if (process.argv.length >= 4) {          // movie title entered
            movieName = process.argv.slice(3);
        } else {                                 // movie title not entered
            movieName = "Mr. Nobody";
        }
    } else {
        var movieName = targetValue;
    }
    axios
        .get("http://www.omdbapi.com/?apikey=trilogy&t=" + movieName)
        .then(function (response) {
            console.log("\n+-----------------------------------------------------------------------");
            console.log("Title of the movie      : " + response.data.Title);
            console.log("Year the movie came out : " + response.data.Year);
            console.log("IMDB Rating             : " + response.data.Ratings[0].Value);
            console.log("Rotten Tomatoes Rating  : " + response.data.Ratings[1].Value);
            console.log("Country of production   : " + response.data.Country);
            console.log("Language of the movie   : " + response.data.Language);
            console.log("Actors in the movie     : " + response.data.Actors);
            console.log("Plot of the movie       : " + response.data.Plot);
            console.log("+-----------------------------------------------------------------------\n");
        })
        .catch(function (err) {
            console.log(err);
        });
}
function doWhatItSays() {
    var fs = require("fs");

    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }

        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");
        // console.log("\n+-----------------------------------------------------------------------");
        // console.log('Content of "random.txt" file : \n' + data);

        // Carrage return should not be included in the content of the random.txt file.
        // Content of "random.txt"
        // spotify-this-song,"I Want it That Way",movie-this,"The Matrix",concert-this,"BTS"

        // (1) Processing one API search
        var j = 4; // manually select j. 0: first process, 2: second process, 4: third process
        switch (dataArr[j]) {
            case "concert-this":
                targetValue = dataArr[j + 1].slice(1, dataArr[j + 1].length - 1);
                concertThis();
                targetValue = "";
                break;
            case "spotify-this-song":
                targetValue = dataArr[j + 1].slice(1, dataArr[j + 1].length - 1);
                spotifyThisSong();
                targetValue = "";
                break;
            case "movie-this":
                targetValue = dataArr[j + 1].slice(1, dataArr[j + 1].length - 1);
                movieThis();
                targetValue = "";
                break;
            default:
                console.log(" ");
        }

        // (2) Processing multiple API search
        // Following for-loop works fine but the response sequence is ASYNCHRONOUS
        // not following the process sequence of the content of random.txt
        // for (var j = 0; j < dataArr.length; j += 2) {
        //     switch (dataArr[j]) {
        //         case "concert-this":
        //             targetValue = dataArr[j + 1].slice(1, dataArr[j + 1].length - 1);
        //             console.log(dataArr[j]);
        //             console.log(targetValue);
        //             concertThis();
        //             targetValue = "";
        //             break;
        //         case "spotify-this-song":
        //             targetValue = dataArr[j + 1].slice(1, dataArr[j + 1].length - 1);
        //             console.log(dataArr[j]);
        //             console.log(targetValue);
        //             spotifyThisSong();
        //             targetValue = "";
        //             break;
        //         case "movie-this":
        //             targetValue = dataArr[j + 1].slice(1, dataArr[j + 1].length - 1);
        //             console.log(dataArr[j]);
        //             console.log(targetValue);
        //             movieThis();
        //             targetValue = "";
        //             break;
        //         default:
        //             console.log(" ");
        //     }
        // }

    });
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
        break;
    default:
        console.log(" ");
}