"use strict";

let personalMovieDB = {
    count: 0,
    movies: {},
    actors: {},
    genres: [],
    privat: false,
    start: function () {
        while(true) {
            personalMovieDB.count = prompt("How many films did you see?", "");

            if (personalMovieDB.count == "" || isNaN(+personalMovieDB.count) || personalMovieDB.count === null  ) {
                alert("Huston, you`ve problem!");
                continue;
            } else {
                break;
            }
        }
    },
    toggleVisibleMyDB: function () {
        if(personalMovieDB.privat) {
            personalMovieDB.privat = false;
        } else {
            personalMovieDB.privat = true;
        }
    },
    detectUserLevel: function () {
        if (personalMovieDB.count < 10) {
            alert("You seen a small number of films");
        } else if (personalMovieDB.count >= 10 && personalMovieDB.count <= 30) {
            alert("You are classic viewer");
        } else if (personalMovieDB.count > 30) {
            alert("You are film fan");
        } else {
            alert("Huston, you`ve problem!");
        }
    },
    askFilmsAndRate: function () {
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
    },
    showMyDB: function () {
        if(personalMovieDB.privat === false) {
            console.log(personalMovieDB);
        }
    },
    writeYourGenres: function () {
        for(let i = 0; i < 3; i++) {
            let genre = prompt(`Your lovely genre is under number ${i + 1}`, "");
    
            if (genre === null || genre === "") {
                i--;
                alert("Huston, you`ve problem!");
                continue;
            } else {
                personalMovieDB.genres[i] = genre;
            }
        }

        personalMovieDB.genres.forEach(function(item, index) {
            alert(`Your ${index + 1} lovely genre is: ${item}.`);
        });
    }
};