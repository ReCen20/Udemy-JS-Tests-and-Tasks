let redBoxes = document.querySelectorAll('.red-box');

function deleteFunction (e) {
    console.log("click");
}

redBoxes[0].addEventListener('click', deleteFunction);
redBoxes[0].removeEventListener('click', deleteFunction);