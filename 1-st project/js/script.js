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
});