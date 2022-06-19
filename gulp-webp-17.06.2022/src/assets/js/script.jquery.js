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
jQuery(function ($) {
    let vw = window.innerWidth,
        vh = window.innerHeight,
        documentBody = $('body'),
        scrollbarWidth = window.outerWidth - window.innerWidth;
    function activateMenu() {
        const menuBtn = $('.menu-button'),
            headerMenu = $('.menu'),
            menuLinks = headerMenu.find('.menu__item a'),
            submenus = headerMenu.find('.submenu'),
            parentMenuItem = headerMenu.find('.menu__item-has-children');
        menuBtn.on('click', function () {
            if (menuBtn.hasClass('active')) {
                menuBtn.removeClass('active');
                headerMenu.removeClass('active');
                documentBody.removeClass('lock');
            } else {
                menuBtn.addClass('active');
                headerMenu.addClass('active');
                documentBody.addClass('lock');
            }
        });
        menuLinks.on('click', function (e) {
            if (menuBtn.hasClass('active') && !$(e.target).parent().hasClass('menu__item-has-children')) {
                menuBtn.removeClass('active');
                headerMenu.removeClass('active');
                documentBody.removeClass('lock');
            }
        });
        parentMenuItem.on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            let submenu = $(e.target).parent().children('.submenu');
            if (e.target === e.currentTarget) {
                submenu = $(e.target).children('.submenu');


            }
            const submenuChildren = $(submenu).find('.submenu');
            if (submenu.hasClass('active')) {
                submenu.slideUp(600).removeClass('active');
                if (submenuChildren) {
                    submenuChildren.slideUp(600).removeClass('active');
                }

            } else {
                submenu.addClass('active').slideDown(600);
            }
        });
        documentBody.on('click', function (e) {
            if (menuBtn.hasClass('active')) {
                if (!$(e.target).hasClass('menu') && !$(e.target).parents().hasClass('menu') && !$(e.target).hasClass('menu-button') && !$(e.target).parents().hasClass('menu-button')) {
                    menuBtn.removeClass('active');
                    headerMenu.removeClass('active');
                    documentBody.removeClass('lock');
                }

            }
        });
    }
    activateMenu();
});