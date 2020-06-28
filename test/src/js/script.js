"use strict";

let array = [1, 12, 3, 9, 17, 24];

// array[9] = 167;

array.forEach(function(item, index, arr){
    console.log(`${index} element of \"${arr}\" is ${item}`);
});