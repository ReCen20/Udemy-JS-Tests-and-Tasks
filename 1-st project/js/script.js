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
});