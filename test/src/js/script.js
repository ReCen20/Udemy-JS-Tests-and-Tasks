let button = document.querySelector("button"),
    box = document.querySelector(".box");

button.addEventListener('click', function () {
    box.scrollTop = 0;
    console.log(box.scrollTop);
});