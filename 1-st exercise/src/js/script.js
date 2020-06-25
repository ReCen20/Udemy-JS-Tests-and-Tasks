"use strict";

let numberOfFilms = prompt("How many films did you see?", "");

let personalMovieDB = {
    count: numberOfFilms,
    movies: {},
    actors: {},
    genres: [],
    privat: false
};

let firstFilm = prompt("What one of the last films you had seen?", "");
let firstRate = +prompt("What rate can you give?", "");
let secondFilm = prompt("What one of the last films you had seen?", "");
let secondRate = +prompt("What rate can you give?", "");

personalMovieDB.movies[firstFilm] = firstRate;
personalMovieDB.movies[secondFilm] = secondRate;

console.log(personalMovieDB.movies);