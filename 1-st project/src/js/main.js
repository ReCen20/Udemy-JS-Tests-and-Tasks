window.addEventListener('DOMContentLoaded', function() {

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
});