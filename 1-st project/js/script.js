window.addEventListener('DOMContentLoaded', function() {

    function addZero (num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function stringToNumber(string) {
        return +string.match(/\d/g).reduce((sum, current) => { return `${sum}${current}`;});
    }

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

    // slider 0.3.1 "carousel"

    const offerSlider = document.querySelector(".offer__slider"),
        offerSliderIndicate = document.createElement('ol'),
        offerSliderWrapper = offerSlider.querySelector(".offer__slider-wrapper"),
        offerSliderInner = offerSliderWrapper.querySelector(".offer__slider-inner"),
        offerSliderPrev = offerSlider.querySelector(".offer__slider-prev"),
        offerSliderNext = offerSlider.querySelector(".offer__slider-next"),
        offerSliderCurrent = offerSlider.querySelector("#current"),
        offerSliderTotal = +offerSlider.querySelector("#total").textContent,      
        offerSliderWidth = stringToNumber(window.getComputedStyle(offerSliderWrapper).width);

    let currentIndex = 0;

    offerSliderIndicate.classList.add("carousel-indicators");
    offerSliderIndicate.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;`;

    offerSlider.style.position = 'relative';
    offerSlider.prepend(offerSliderIndicate);

    offerSliderInner.style.transition = "1s all";
    offerSliderInner.style.display = "flex";
    offerSliderInner.style.width = `${100 * offerSliderTotal}%`;
    offerSliderWrapper.style.overflow = 'hidden';

    for( let i = 0; i < offerSliderTotal; i++) {
        const element = document.createElement("li");
        element.classList.add("dot");
        element.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;`;
        offerSliderIndicate.append(element);
    }
    const offerSliderIndicates = offerSliderIndicate.querySelectorAll(".dot");
    offerSliderIndicates[currentIndex].style.opacity = "1";

    const displayCurrentSlide = () => {
        offerSliderInner.style.transform = `translateX(-${currentIndex * offerSliderWidth}px)`;
        offerSliderCurrent.textContent = addZero(currentIndex + 1);
        offerSliderIndicates[currentIndex].style.opacity = "1";
    };
    
    offerSliderPrev.addEventListener("click", () => {
        offerSliderIndicates[currentIndex].style.opacity = ".5";

        if(currentIndex != 0) {
            currentIndex--;
        } else {
            currentIndex = offerSliderTotal - 1;
        }

        displayCurrentSlide();
    });

    offerSliderNext.addEventListener("click", ()=> {
        offerSliderIndicates[currentIndex].style.opacity = ".5";
        
        if(currentIndex != (offerSliderTotal - 1)){
            currentIndex++;
        } else {
            currentIndex = 0;
        }

        displayCurrentSlide();
    });

    offerSliderIndicates.forEach((item, index) => {
        item.addEventListener("click", ()=> {
            offerSliderIndicates[currentIndex].style.opacity = ".5";
            currentIndex = index;
            displayCurrentSlide();
        });
    });
});
