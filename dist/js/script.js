"use strict";
$(document).ready(function () {
  $('.reviews__slider').slick({
    speed: 1200,
    adaptiveHeight: true,
    prevArrow: '<button type="button" class="slick-prev"><img src="icons/prev-arrow.png"></button>',
    nextArrow: '<button type="button" class="slick-next"><img src="icons/next-arrow.png"></button>',

  });

  //hamburger
    $('.hamburger').on('click', () => {
      $('.hamburger').toggleClass('hamburger_active');
      $('.header__menu').toggleClass('header__menu_active');
    });

  $('.header__menu-item').each(function(){
    $(this).on('click', () => {
      $('.hamburger').toggleClass('hamburger_active');
      $('.header__menu').toggleClass('header__menu_active');
    });
  });

  //map
  //Клик на карту - карта активна, клик куда угодно, но не на карту - карта не активна
  
  // $(document).on('click', function (e) {
  //   if (e.target.id === 'map-wrap') {
  //     $('#map-wrap iframe').css('pointer-events', 'all');
  //   } else {
  //     $('#map-wrap iframe').css('pointer-events', 'none');
  //   }
  // });

  DG.then(function() {
    let myIcon = DG.icon({
      iconUrl: 'icons/map_marker.png'
    });
    let map = DG.map('map-wrap', {
        center: [55.748226, 37.628134],
        zoom: 16.73,
        scrollWheelZoom: false
        });
    DG.marker([55.748335, 37.6269], {icon: myIcon}).addTo(map);
  });

  $('#map-wrap').mousedown(function () {
    $('.map__info').css({'transition': '.5s all', 'opacity': '0.3'});
  });
  $('#map-wrap').mouseup(function () {
    $('.map__info').css('opacity', '1');
  });


  //pageup and  
  $(window).scroll(function () {
    if ($(this).scrollTop() > 800) {
      $('.pageup').fadeIn();
    } else {
      $('.pageup').fadeOut();
    }
  });
  //Smooth scroll 
  $("a[href^='#up']").click(function () {
    const _href = $(this).attr("href");
    $("html, body").animate({ scrollTop: $(_href).offset().top + "px" });
    return false;
  });

  // let goTop = document.querySelector('.pageup');

  // goTop.addEventListener('click', function() {
  // 	window.scrollTo({
  // 		top: 0,
  // 		behavior: "smooth"
  // 	});

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
  $(document).keydown(function(e) {
    if (e.keyCode === 27) {
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
  $('input[name=phone]').mask("+7 (999) 999-99-99");


});


