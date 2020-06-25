"use strict";

let numberOfFilms;

function start () {
    while(true) {
        numberOfFilms = prompt("How many films did you see?", "");

        if (numberOfFilms == "" || isNaN(+numberOfFilms) || numberOfFilms === null  ) {
            alert("Huston, you`ve problem!");
            continue;
        } else {
            break;
        }
    }
}

start();

let personalMovieDB = {
    count: numberOfFilms,
    movies: {},
    actors: {},
    genres: [],
    privat: false
};

function detectUserLevel () {
    if (personalMovieDB.count < 10) {
        alert("You seen a small number of films");
    } else if (personalMovieDB.count >= 10 && personalMovieDB.count <= 30) {
        alert("You are classic viewer");
    } else if (personalMovieDB.count > 30) {
        alert("You are film fan");
    } else {
        alert("Huston, you`ve problem!");
    }
}

function askFilmsAndRate () {
    let i = 0;
    while (i < 2) {
        let film = prompt("What one of the last films you had seen?", "");
        if (film === null || film === "" || film.length > 50) {
            console.log("Huston, you`ve problem!");
            continue;
        }

        let rate = prompt("What rate can you give?", "");
        if (rate === null || rate === "" || isNaN(+rate)) {
            console.log("Huston, you`ve problem!");
            continue;
        }
        
        personalMovieDB.movies[film] = +rate;
        i++;
    }
}

function showMyDB () {
    if(personalMovieDB.privat === false) {
        console.log(personalMovieDB);
    }
}

function writeYourGenres () {
    for(let i = 0; i < 3; i++) {
        let genre = prompt(`Your lovely genre is under number ${i}`, "");

        if (genre === null || genre === "") {
            i--;
            alert("Huston, you`ve problem!");
            continue;
        } else {
            personalMovieDB.genres[i] = genre;
        }
    }
}

writeYourGenres();
showMyDB();