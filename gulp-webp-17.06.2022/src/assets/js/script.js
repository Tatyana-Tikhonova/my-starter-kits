//проверка браузера на поддержку webp
function testWebP(callback) {
    var webP = new Image();
    webP.onload = webP.onerror = function () {
        callback(webP.height == 2);
    };
    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";

}

testWebP(function (support) {
    if (support == true) {
        document.querySelector('body').classList.add('webp');
    } else {
        document.querySelector('body').classList.add('no-webp');
    }

});
window.addEventListener('DOMContentLoaded', function () {

    let vw = window.innerWidth,
        vh = window.innerHeight,
        documentBody = document.body,
        scrollbarWidth = window.outerWidth - window.innerWidth;

    function activateMenu() {
        const menuBtn = document.querySelector('.menu-button'),
            headerMenu = document.querySelector('.menu'),
            menuLinks = headerMenu.querySelectorAll('.menu__link'),
            submenus = headerMenu.querySelectorAll('.submenu'),
            parentMenuItem = headerMenu.querySelectorAll('.menu__item-has-children');

        menuBtn.addEventListener('click', function (e) {
            if (menuBtn.classList.contains('active')) {
                menuBtn.classList.remove('active');
                headerMenu.classList.remove('active');
                documentBody.classList.remove('lock');
            } else {
                menuBtn.classList.add('active');
                headerMenu.classList.add('active');
                documentBody.classList.add('lock');
            }
        });
        menuLinks.forEach(function (el, i) {
            el.addEventListener('click', function (e) {

                menuLinks.forEach(function (el, i) {
                    el.classList.remove('active');
                });
                e.target.classList.add('active');
                if (!el.parentElement.classList.contains('menu__item-has-children') && menuBtn.classList.contains('active')) {
                    menuBtn.classList.remove('active');
                    headerMenu.classList.remove('active');
                    documentBody.classList.remove('lock');
                }
            });

        });
        parentMenuItem.forEach(function (el, i) {
            el.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                const submenu = el.lastElementChild;
                const submenuChildren = submenu.querySelectorAll('.submenu');

                if (submenu.classList.contains('active')) {
                    submenu.classList.remove('active');
                    if (submenuChildren) {
                        submenuChildren.forEach(function (el, i) {
                            el.classList.remove('active');
                        });
                    }
                } else {
                    submenu.classList.add('active');
                }
                if (submenu.style.maxHeight) {
                    submenu.style.maxHeight = null;
                    if (submenuChildren) {
                        submenuChildren.forEach(function (el, i) {
                            if (el.style.maxHeight) {
                                el.style.maxHeight = null;
                            }
                        });
                    }
                } else {
                    submenu.style.maxHeight = submenu.scrollHeight * 2 + "px";
                    if (e.target.parentNode.classList.contains('submenu')) {
                        const parentMenu = e.target.parentNode;
                        parentMenu.style.maxHeight = (parentMenu.scrollHeight + submenu.scrollHeight) * 2 + "px";


                    }
                }
            });
        });
        documentBody.addEventListener('click', function (e) {
            if (menuBtn.classList.contains('active') && !e.target.closest('.menu') && !e.target.classList.contains('menu-button') && !e.target.closest('.menu-button')) {
                submenus.forEach(function (el) {
                    el.classList.remove('active');
                });
                menuBtn.classList.remove('active');
                headerMenu.classList.remove('active');
                documentBody.classList.remove('lock');
            }

        });
    }
    activateMenu();
});