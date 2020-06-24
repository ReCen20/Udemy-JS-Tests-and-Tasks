"use strict";

let numberOfFilms = prompt("How many films did you see?", "");

let personalMovieDB = {
    count: numberOfFilms,
    movies: {},
    actors: {},
    genres: [],
    privat: false
};

if (personalMovieDB.count < 10) {
    alert("You seen a small number of films");
} else if (personalMovieDB.count >= 10 && personalMovieDB.count <= 30) {
    alert("You are classic viewer");
} else if (personalMovieDB.count > 30) {
    alert("You are film fan");
} else {
    alert("Error");
}

// 1-st solution

/* for (let i = 0; i < 2; i++) {
    let film = prompt("What one of the last films you had seen?", "");
    if (film === null || film === "" || film.length > 50) {
        i--;
        continue;
    }

    let rate = prompt("What rate can you give?", "");
    if (rate === null || rate === "" || rate.length > 50) {
        i--;
        continue;
    }
    personalMovieDB.movies[film] = +rate;
} */

// 2-nd solution
let i = 0;
while (i < 2) {
    let film = prompt("What one of the last films you had seen?", "");
    if (film === null || film === "" || film.length > 50) {
        continue;
    }

    let rate = prompt("What rate can you give?", "");
    if (rate === null || rate === "" || rate.length > 50) {
        continue;
    }
    
    personalMovieDB.movies[film] = +rate;
    i++;
}

console.log(personalMovieDB.movies);