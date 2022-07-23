"use strict";
$(document).ready(function () {
    $('.reviews__slider').slick({
        speed: 1000,
        slidesToShow: 3,
        centerMode: true,
        adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/prev-arrow.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/next-arrow.png"></button>',
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    centerMode: true,
                    slidesToShow: 1
                }
            },
            {
                breakpoint: 600,
                settings: {
                    arrows: false,
                    centerMode: true,
                    slidesToShow: 1
                }
            }
        ]
    });

    //hamburger
    $('.hamburger').on('click', () => {
        $('.hamburger').toggleClass('hamburger_active');
        $('.header__menu').toggleClass('header__menu_active');
    });

    $('.header__menu-item').each(function () {
        $(this).on('click', () => {
            $('.hamburger').toggleClass('hamburger_active');
            $('.header__menu').toggleClass('header__menu_active');
        });
    });

    //map

    DG.then(function () {
        let myIcon = DG.icon({
            iconUrl: 'icons/map-marker.png'
        });
        let map = DG.map('map-wrap', {
            center: [55.748226, 37.628134],
            zoom: 16.73,
            scrollWheelZoom: false,
            zoomControl: false,
            doubleClickZoom: false,
            boxZoom: false
        });

        let marker = DG.marker([55.748435, 37.6269], {icon: myIcon}).addTo(map);

    });
    $('.map__info').removeClass('moved');
    $('#map-wrap').on('mousedown', (event) => {
        $('.map__info').addClass('moved').css('opacity', '.5');
    });
    $('#map-wrap').on('mouseup', (event) => {
        $('.map__info').css('opacity', '1');
    });

    function mapInfoMove() {
        $(window).width() < 1000 ?
            $('.map__info').addClass('moved') :
            $('.map__info').removeClass('moved');
    }

    mapInfoMove();

    $(window).resize(function () {
        mapInfoMove();
    });

    //pageup

    let debounceTimer;


    $(window).scroll(function () {
        if (debounceTimer) {
            window.clearTimeout(debounceTimer);
        }
        debounceTimer = window.setTimeout(() => {
            if ($(this).scrollTop() > 800) {
                $('.pageup').fadeIn(0);
                $('.pageup__circle').removeClass('rotate180');
                $('.pageup__circle').addClass('rotate-back');

            } else {
                $('.pageup__circle').removeClass('rotate-back');
                $('.pageup__circle').addClass('rotate180');
                $('.pageup').fadeOut(1000);
            }
        }, 50);

    });


    //Smooth scroll

    $("a[href^='#up']").click(function () {
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top + "px"});
        return false;
    });

    $('.header__menu-link').click(event => {
        const data = (event.target.dataset.to).slice(0, -3);
        event.preventDefault();
        $("html, body").animate({scrollTop: $(`.${data}`).offset().top}, 1000);
    });

    //modal
    $('[data-modal=consultation]').on('click', function () {
        $('.overlay, #consultation').fadeIn('slow');
        $(document.body).css('overflow', 'hidden');
    });
    $('.modal__close').on('click', function () {
        $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
        $(document.body).css('overflow', '');
    });
    //на esc тоже закрываем
    $(document).keydown(function (e) {
        if (e.keyCode === 27) {
            $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
            $(document.body).css('overflow', '');
        }
    });
    document.querySelector('.overlay').addEventListener('click', (event) => {
        if (event.target === document.querySelector('.overlay')) {
            $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
            $(document.body).css('overflow', '');
        }
    });

    function validateForms(form) {
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 3
                },
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: {
                    required: "Введите своё имя",
                    minlength: jQuery.validator.format("Имя должно состоять минимум из {0} символов")
                },
                phone: "Введите свой номер телефона",
                email: {
                    required: "Введите свою почту",
                    email: "Неправильно введен адрес почты"
                }
            }
        });
    }

    validateForms('#consultation form');
    validateForms('.any-questions__content');
    validateForms('.prices__form');
    $('input[name=phone]').mask("+7 (999) 999-99-99");

});


