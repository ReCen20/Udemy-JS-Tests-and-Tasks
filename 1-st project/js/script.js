window.addEventListener('DOMContentLoaded', function() {

    // tabs v 0.1.1

    let tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsContainer = document.querySelector('.tabheader__items');

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });

        tabsContent.forEach(item => {
            item.style.display = 'none';
        });

    function hideTab (index) {
        tabs[index].classList.remove('tabheader__item_active');
        tabsContent[index].style.display = 'none';
    }

    function displayTab (index = 0) {
        if ( !tabs[index].classList.contains('tabheader__item_active')) {
            tabs[index].classList.add('tabheader__item_active');
        }

        tabsContent[index].style.display = 'block';
    }

    displayTab();

    tabsContainer.addEventListener('click', function(event) {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item'))
        {
            tabs.forEach((item,index) => {
                if (item == target) {
                    displayTab(index);
                } else if (item.classList.contains('tabheader__item_active')) {
                    hideTab(index);
                }
            });
        }
    });

    // timer v 0.2

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

            if (time.total < 1000) {
                clearInterval(timerInterval);
                return;
            }

            days.textContent = addZero(time.days);
            hours.textContent = addZero(time.hours);
            minutes.textContent = addZero(time.minutes);
            seconds.textContent = addZero(time.seconds);
        }
    }

    setClock('.timer', endtime);

    // modal 0.4

    const modalTriggers = document.querySelectorAll("[data-modal='open']"),
        modal = document.querySelector("[data-modal='modal']");

    function showModal () {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        clearInterval(setModalTimer);
        document.removeEventListener('scroll', showModalByScroll);
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

    const setModalTimer = setTimeout(showModal, 15000);

    modal.addEventListener('click', (e) => {
        if (modal === e.target || e.target.getAttribute("data-modal") == "close") {
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
    
    // class for cards v 0.3

    class MenuItem {
        constructor (src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.parentElement = document.querySelector(parentSelector);
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

            this.parentElement.append(element);
        }
    }

    let menu = '.menu .container';

    const getResourses = async (url) => {
        const response = await fetch(url);

        if(!(response.ok)) {
            throw new Error();
        }

        return await response.json();
    };

    getResourses("http://localhost:3000/menu").then(response => {
        console.log(response);
        response.forEach(({img, altimg, title, descr, price}) => {
            new MenuItem(img, altimg, title, descr, price, menu).makeCard();
        });
    }).catch(response => {
        console.log(response);
        showStatusModal(messages.failure);
    });

    // POST form v 0.6

    let messages = {
        loading: "img/form/spinner.svg",
        success: "Спасибо, скоро мы с вами свяжемся!",
        failure: "Упс, что-то пошло не так..."
    };

    const forms = document.querySelectorAll("form");
    forms.forEach(item => bindPostData(item));

    const postData = async (url, data) => {
        const response = await fetch (url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        });

        if(!response.ok) {
            throw new Error("Ups...");
        }

        return await response.json();
    };
    
    function bindPostData (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            const statusMessage = document.createElement("img");
            statusMessage.src = messages.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;`;
            form.insertAdjacentElement("afterend", statusMessage);

            const formData = JSON.stringify(Object.fromEntries((new FormData(form)).entries()));

            postData("http://localhost:3000/requests", formData).finally(() => {
                statusMessage.remove();
            })
            .then( response => {
                console.log(response);
                showStatusModal(messages.success);
            })
            .catch(response => {
                console.log(response);
                showStatusModal(messages.failure);
            });       
        });
    }
    
    function showStatusModal (message) {
        const prevModalDialog = document.querySelector(".modal__dialog");
        prevModalDialog.style.display = "none";
        showModal();

        const newModalDialog = document.createElement("div");
        newModalDialog.classList.add("modal__dialog");
        newModalDialog.innerHTML = `
        <div class="modal__content">
                <form action="#">
                    <div class="modal__close" data-modal="close">&times;</div>
                    <div class="modal__title">${message}</div>
                </form>
            </div>`;
        document.querySelector(".modal").append(newModalDialog);

        setTimeout(() => {
            newModalDialog.remove();
            hideModal();
            prevModalDialog.style.display = "block";
        }, 2000); 
    }

    // slider 0.0.1

    const offerSlides = document.querySelectorAll(".offer__slide"),
        offerSliderPrev = document.querySelector(".offer__slider-prev"),
        offerSliderNext = document.querySelector(".offer__slider-next"),
        offerSliderCurrent = document.querySelector("#current");

    const hideSlides = () => {
        of
    };
    offerSliderPrev.addEventListener("click", (e)=> {

    })
});
