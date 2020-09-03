window.addEventListener('DOMContentLoaded', function() {

    // tabs v 0.1

    let tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsContainer = document.querySelector('.tabheader__items');

    function hideTabs () {
        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });

        tabsContent.forEach(item => {
            item.style.display = 'none';
        });
    }

    function displayTab (index = 0) {
        if ( !tabs[index].classList.contains('tabheader__item_active')) {
            tabs[index].classList.add('tabheader__item_active');
        }

        tabsContent[index].style.display = 'block';
    }

    hideTabs();
    displayTab();

    tabsContainer.addEventListener('click', function(event) {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item'))
        {
            tabs.forEach((item,index) => {
                if (item == target) {
                    hideTabs();
                    displayTab(index);
                }
            });
        }
    });

    // timer v 0.1

    const endtime = "2020-08-18";

    function getTimeRemaining (endtime) {
        const total = Date.parse(endtime) - Date.parse(new Date()) + (new Date().getTimezoneOffset() * 60 * 1000),
            days = Math.floor(total / (1000 * 60 * 60 * 24)),
            hours = Math.floor((total / (1000 * 60 * 60)) % 24),
            minutes = Math.floor((total / (1000 * 60)) % 60),
            seconds = Math.floor((total / 1000) % 60);

        return {
            total,
            days,
            hours,
            minutes,
            seconds
        };
    }

    function addZero (num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock (timerSelector, endtime) {
        const timer = document.querySelector(timerSelector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds');

        const timerInterval = setInterval(updateClock, 1000, endtime);

        updateClock (endtime);

        function updateClock (endtime) {
            const time = getTimeRemaining(endtime);

            days.textContent = addZero(time.days);
            hours.textContent = addZero(time.hours);
            minutes.textContent = addZero(time.minutes);
            seconds.textContent = addZero(time.seconds);

            if (time.total < 1000) {
                clearInterval(timerInterval);
            }
        }
    }

    setClock('.timer', endtime);

    // modal 0.2

    function makeModal (modalTriggers, modal, pauseTime) {
        const modalCloseTrigger = modal.querySelector("[data-modal='close']");

        function showModal () {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            clearInterval(setModalTimer);
        }

        function hideModal () {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }

        modalTriggers.forEach(function (item) {
            item.addEventListener('click', () => {
                showModal();
            });
        });

        const setModalTimer = setTimeout(showModal, pauseTime);

        modalCloseTrigger.addEventListener('click', hideModal);

        modal.addEventListener('click', (e) => {
            if (modal === e.target) {
                hideModal();
            }
        });

        function showModalByScroll () {
            if(document.documentElement.scrollTop + document.documentElement.clientHeight >= 
                document.documentElement.scrollHeight - 1) {
                    showModal();
                    document.removeEventListener('scroll', showModalByScroll);
                }
        }

        document.addEventListener('scroll', showModalByScroll);
        
        document.addEventListener('keydown', (e) => {
            if(e.code === "Escape" && modal.style.display === 'block') {
            hideModal();
            }
        });
    }

    const modalTriggers = document.querySelectorAll("[data-modal='open']"),
        modal = document.querySelector("[data-modal='modal']");

    makeModal(modalTriggers, modal, 15000);

    // class for cards v 0.2

    class MenuItem {
        constructor (src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.parentSelector = parentSelector;
            this.classes = classes;
        }

        makeCard() {
            const element = document.createElement('div');

            element.innerHTML += `
                <img src="${this.src}" alt="${this.alt}">
                <h3 class="menu__item-subtitle">Меню "${this.title}"</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>`;
            if(this.classes.length === 0) {
                element.classList.add("menu__item");
            } else {
                this.classes.forEach(className => {
                    element.classList.add(className);
                });
            }

            this.parentSelector.append(element);
        }
    }

    let menu = document.querySelector('.menu .container');

    new MenuItem(
        'img/tabs/vegy.jpg',
        'vegy',
        'Фитнес',
        `Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей.
        Это абсолютно новый продукт с оптимальной ценой и высоким качеством!`,
        '229',
        menu,
        "menu__item",
        "fitness"
    ).makeCard();
    new MenuItem(
        'img/tabs/elite.jpg',
        'elite',
        'Премиум',
        `В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба,
        морепродукты, фрукты - ресторанное меню без похода в ресторан!`,
        '550',
        menu
    ).makeCard();
    new MenuItem(
        'img/tabs/post.jpg',
        'post',
        'Постное',
        `Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля,
        овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.`,
        '430',
        menu
    ).makeCard();

    // POST form v 0.2

    let messages = {
        loading: "Загрузка",
        success: "Спасибо, скоро мы с вами свяжемся!",
        failure: "Упс, что-то пошло не так..."
    };

    const forms = document.querySelectorAll("form");

    forms.forEach(item => postData(item));
    
    function postData (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            const statusMessage = document.createElement("div");
            statusMessage.classList.add = "status";
            statusMessage.textContent = messages.loading;
            form.append(statusMessage);

            const request = new XMLHttpRequest();
            request.open("POST", "server.php");

            request.setRequestHeader("Content-type", "multipart/form-data");
            const formData = new FormData(form),
                formObject = {};
            
            formData.forEach((item, value) => formObject[item] = value);
            const formJson = JSON.stringify(formObject);

            request.send(formJson);

            request.addEventListener('load', function () {
                if(request.status === 200) {
                    console.log(request.response);
                    statusMessage.textContent = messages.success;
                }
                else {
                    statusMessage.textContent = messages.failure;
                }
            });
        });
    }
    
});