$(document).ready(function(){
	$('.reviews__slider').slick({
        speed: 1200,
        adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/prev-arrow.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/next-arrow.png"></button>',
        
    });

    //Клик на карту - карта активна, клик куда угодно, но не на карту - карта не активна
    
    document.addEventListener('click', function(e) {
        let map = document.querySelector('#map-wrap iframe')
        if(e.target.id === 'map-wrap') {
          map.style.pointerEvents = 'all'
        } else {
          map.style.pointerEvents = 'none'
        }
      })

    //pageup and  
    $(window).scroll(function() {
      if ($(this).scrollTop() > 800) {
          $('.pageup').fadeIn();
      } else {
          $('.pageup').fadeOut();
      }
      
  });
  //Smooth scroll 
  $("a[href^='#up']").click(function(){
      const _href = $(this).attr("href");
      $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
      return false;
  });
});
