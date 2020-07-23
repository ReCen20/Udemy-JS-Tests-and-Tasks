'use strict';

const advBlock = document.querySelector(".promo__adv"),
      advItems = advBlock.querySelectorAll("img"),
      promoBg = document.querySelector(".promo__bg"),
      promoGenre = promoBg.querySelector(".promo__genre"),
      promoInteractiveList = document.querySelector(".promo__interactive-list"),
      form = document.querySelector(".add"),
      formInput = form.querySelector(".adding__input"),
      formCheckbox = form.querySelector("[type = 'checkbox']");


advItems.forEach((adv) => adv.remove());

promoGenre.textContent = "ДРАМА";
promoBg.style.background = "url(\"./img/bg.jpg\") center center/cover no-repeat";

const movieDB = {
    movies: [
        "Логан",
        "Лига справедливости",
        "Ла-ла лэнд",
        "Одержимость",
        "Скотт Пилигрим против..."
    ]
};

promoInteractiveList.innerHTML = "";

form.addEventListener("submit", function(event) {
    event.preventDefault();
    const formValue = formInput.value;

    if (!formValue) {
        return;
    } else if (formValue.length > 21) {
        movieDB.movies.push(formValue.slice(0, 21) + "...");
    } else {
        movieDB.movies.push(formValue);
    }

    if(formCheckbox.checked) {
        console.log("Добавлен любимый фильм");
    }

    event.target.reset();
    presentMovies();
});

function presentMovies () {

    promoInteractiveList.innerHTML = "";
    movieDB.movies.sort();
    movieDB.movies.forEach(function(film, index) {
        promoInteractiveList.innerHTML += `
            <li class="promo__interactive-item"> ${index + 1} ${film}
                <div class="delete"></div>
            </li>`;
    });

    promoInteractiveList.querySelectorAll(".delete").forEach(function(item, index) {
        item.addEventListener("click", function(event) {
            event.target.parentElement.remove();
            movieDB.movies.splice(index, 1);
            presentMovies();
        });
    });
}



