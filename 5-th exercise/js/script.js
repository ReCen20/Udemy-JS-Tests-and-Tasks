'use strict';

const advBlock = document.querySelector(".promo__adv"),
      advItems = advBlock.querySelectorAll("img"),
      promoBg = document.querySelector(".promo__bg"),
      promoGenre = promoBg.querySelector(".promo__genre"),
      promoInteractiveList = document.querySelector(".promo__interactive-list");

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

movieDB.movies.sort();
movieDB.movies.forEach(function(film, index) {
    promoInteractiveList.innerHTML += `
        <li class="promo__interactive-item"> ${index + 1} ${film}
            <div class="delete"></div>
        </li>`;
});



