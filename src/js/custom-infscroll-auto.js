(function($){
  "use strict";

  $(".paging.manualtrigger .moreprevious").css("visibility","hidden");
  
  // Video thumbnails
  $('.blogitems .video').videoThumbs();
  $('article .video').videoThumbs({ maxres: true });



  // ______________ RETINA

  if (window.devicePixelRatio >= 1.2) {
    var images = document.getElementsByTagName('img');
    for (var i = 0; i < images.length; i++) {
      var attr = images[i].getAttribute('data-2x');
      if (attr) {
        images[i].src = attr;
      }
    }
  }



  // ______________ FIXED MENU AT SCROLL

  jQuery("document").ready(function($) {
    var nav = $('.main-nav');
    var header = $('.header');

    $(window).scroll(function() {
      if ($(this).scrollTop() > header.height()) {
        nav.addClass("f-nav").fadeIn('fast');
      } else {
        nav.removeClass("f-nav").fadeIn('fast');
      }
    });
  });



  // ______________ SOCIAL LIKES

  /*$('.social-likes').socialLikes({
    counters: true,
    zeroes: true,
    forceUpdate: true,
  });*/



  // ______________ MOBILE MENU

  $(function() {
    $('nav.mobile-menu').slicknav();
  });



  // ______________ ISOTOPE & INFINITE SCROLL

  var container = $('.itemContainer ul');

  if (conditionizr.safari && conditionizr.windows) {
    container.isotope({
      itemSelector: '.itemContainer ul li',
      layoutMode: 'masonry',
      masonry: { gutter: 15 }
    });
  } else {
    container.isotope({
      itemSelector: '.itemContainer ul li',
      layoutMode: 'masonry'
    });
  }

  container.imagesLoaded(function() {
    $('[data-toggle=infinitescroll]').each(function() {
      var target = $(this).data('target') || '#posts';
      
      container.infinitescroll({
        navSelector: '.paging',
        nextSelector: $(this).data('next-selector'),
        itemSelector: '.itemContainer ul li',
        maxPage: parseInt($(this).data('max-page')),
        loading: {
          finishedMsg: 'ALL POSTS LOADED',
          img: '/assets/images/chibimoth_loading.gif',
          msg: null,
          msgText: '',
        },
        pixelsFromNavToBottom: 10,
        behavior: undefined
      }, function(newElements) {
        /*$('.social-likes').socialLikes({
          counters: true,
          zeroes: true,
          forceUpdate: true
        });*/
        
        $(newElements).imagesLoaded(function() {
          container.isotope('appended', $(newElements));
          container.isotope('layout');
        });
        
        $(newElements).find('.video').videoThumbs();
      });
    });
    container.isotope('layout');
  });



  // ______________ BACK TO TOP BUTTON

  $(window).scroll(function() {
    if ($(this).scrollTop() > 200) {
      $('#back-to-top').fadeIn('slow');
    } else {
      $('#back-to-top').fadeOut('slow');
    }
  });
  $('#back-to-top').click(function() {
    $("html, body").animate({ scrollTop: 0 }, 600);
    return false;
  });



  // ______________ SUPERFISH MENU

  $(document).ready(function() {
    $("ul.sf-menu").superfish({
      animation: { opacity:'show', height:'show' },
      delay: 300,
      speed: 'fast'
    });
  });
  
  
  
  // Lightboxes for galleries
  
  $(document).ready(function() {
    $('.gallery img').css('cursor', 'pointer').featherlightGallery({
      targetAttr: 'src',
      galleryFadeOut: 0,
    });
  });
  
  
  
  // Preserve the search query
  
  $(document).ready(function() {
    window.location.search.substring(1).split('&').forEach(function(q) {
      if (q.indexOf('q=') == 0) {
        $('.search-container input').val(q.substring(2));
      }
    });
  });

})(jQuery);
