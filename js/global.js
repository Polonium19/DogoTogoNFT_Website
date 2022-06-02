/*--------------------------------------------------------*/
/* TABLE OF CONTENTS: */
/*--------------------------------------------------------*/
/* 01 - variables */
/* 02 - page calculations */
/* 03 - function on document ready */
/* 04 - function on page load */
/* 05 - function on page resize */
/* 06 - function on page scroll */
/* 07 - swiper sliders */
/* 08 - buttons, clicks, hovers */
/* 09 - pop-up */
/* 10 - smooth scroll*/
/* 11 - upload file */

var _functions = {};

jQuery(function($) {

	"use strict";

	/*================*/
	/* 01 - variables */
	/*================*/
	var swipers = [], winW, winH, headerH, winScr, second, $container, footerTop, _isresponsive, _ismobile = navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i);
	
	/*========================*/
	/* 02 - page calculations */
	/*========================*/
	_functions.pageCalculations = function(){
		winW = $(window).width();
		winH = $(window).height();
	};

	/*=================================*/
	/* 03 - function on document ready */
	/*=================================*/
	if(_ismobile){
		$('body').addClass('mobile');
		_functions.pageCalculations();
	}

	pageScrolled();

	setTimeout( function() {
		$('#loader-wrapper').fadeOut();
		_functions.initSwiper();
		if ( $('.select-box').length){
			$('.SelectBox').SumoSelect();
		}
	}, 500);

	/*============================*/
	/* 04 - function on page load */
	/*============================*/

	/*==============================*/
	/* 05 - function on page resize */
	/*==============================*/
	_functions.resizeCall = function(){
		_functions.pageCalculations();
	};
	if(!_ismobile){
		$(window).resize(function(){
			_functions.resizeCall();
		});
	} else{
		window.addEventListener("orientationchange", function() {
			_functions.resizeCall();
		}, false);
	}

	/*==============================*/
	/* 06 - function on page scroll */
	/*==============================*/	
	$(window).scroll(function(){	
		_functions.scrollCall();
	});

	_functions.scrollCall = function(){
		winScr = $(window).scrollTop();
		pageScrolled();
		anchorSection();
	};

	function pageScrolled() {
		if ($(window).scrollTop() > 50){
			$("header").addClass("scroll");
		} else {
			$("header").removeClass("scroll");
		}
	};

	function anchorSection() {
	  var section_scroll = $(".section-scroll"),
    sections = {},
    i = 0,
    scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;
	  Array.prototype.forEach.call(section_scroll, function(e) {
	      sections[e.id] = e.offsetTop - 70;
	  });
	  for (i in sections) {
	    if (sections[i] <= scrollPosition) {
	      $('nav li a').attr('class', ' ');
	      $('nav li a[href*=' + i + ']').attr('class', 'active');
	    }
			else if(($(window).scrollTop() == 0) || ($(window).scrollTop() < $('.main-banner').outerHeight() - 70)){
				$('nav li').closest('li').find('a').removeClass('active');
			}
	  }
	};

	/*=====================*/
	/* 07 - swiper sliders */
	/*=====================*/
	var initIterator = 0;
	_functions.initSwiper = function(){
		$('.swiper-container').not('.initialized').each(function(){								  
			var $t = $(this);								  

			var index = 'swiper-unique-id-'+initIterator;

			$t.addClass('swiper-'+index+' initialized').attr('id', index);
			$t.find('.swiper-pagination').addClass('swiper-pagination-'+index);
			$t.closest('.arrow-wrapp').find('.swiper-button-prev').addClass('swiper-button-prev-'+index);
			$t.closest('.arrow-wrapp').find('.swiper-button-next').addClass('swiper-button-next-'+index);

			var slidesPerViewVar = ($t.data('slides-per-view'))?$t.data('slides-per-view'):1;
			if(slidesPerViewVar!='auto') slidesPerViewVar = parseInt(slidesPerViewVar, 10);

			swipers['swiper-'+index] = new Swiper('.swiper-'+index,{
				pagination: '.swiper-pagination-'+index,
				paginationType: ($t.is('[data-pagination-type]'))?($t.data('pagination-type'), 10):'bullets',
				paginationClickable: true,
				nextButton: '.swiper-button-next-'+index,
				prevButton: '.swiper-button-prev-'+index,
				slidesPerView: slidesPerViewVar,
				autoHeight:($t.is('[data-auto-height]'))?parseInt($t.data('auto-height'), 10):0,
				loop: ($t.is('[data-loop]'))?parseInt($t.data('loop'), 10):0,
				autoplay: ($t.is('[data-autoplay]'))?parseInt($t.data('autoplay'), 10):0,
				breakpoints: ($t.is('[data-breakpoints]'))? { 767: { slidesPerView: parseInt($t.attr('data-xs-slides'), 10) }, 991: { slidesPerView: parseInt($t.attr('data-sm-slides'), 10) }, 1199: { slidesPerView: parseInt($t.attr('data-md-slides'), 10) } } : {},
				initialSlide: ($t.is('[data-ini]'))?parseInt($t.data('ini'), 10):0,
				speed: ($t.is('[data-speed]'))?parseInt($t.data('speed'), 10):500,
				keyboardControl: true,
				preloadImages: !($t.is('[data-lazy]'))?parseInt($t.data('lazy'), 10):0,
				lazyLoading: ($t.is('[data-lazy]'))?parseInt($t.data('lazy'), 10):0,
				watchSlidesVisibility: ($t.is('[data-lazy]'))?parseInt($t.data('lazy'), 10):0,
				mousewheelControl: ($t.is('[data-mousewheel]'))?parseInt($t.data('mousewheel'), 10):0,
				mousewheelReleaseOnEdges: true,
				direction: ($t.is('[data-direction]'))?$t.data('direction'):'horizontal',
				spaceBetween: ($t.is('[data-space-between]'))?parseInt($t.data('space-between'), 10):0,
				centeredSlides: ($t.is('[data-centered]'))?parseInt($t.data('centered'), 10):0,
				parallax: ($t.is('[data-parallax]'))?parseInt($t.data('parallax'), 10):0,
				effect: ($t.is('[data-effect]'))?($t.data('effect'), 'fade'):0,
                fade: {
					crossFade: true
				},
				onTransitionEnd: function(swiper){
				   	$t.find('.swiper-slide-current').text(swiper.activeIndex+1);
				},
				paginationFractionRender: function (swiper, currentClassName, totalClassName) {
				  	return '<span class="' + currentClassName + '"></span>' +
				         ' ' +
				         '<span class="' + totalClassName + '"></span>';
				}
/*				onSlideChangeStart: function(swiper){
					if ( $t.hasClass('swiper-control-top') ) {
						var activeIndex = swiper.activeIndex,
						slidersWrapper = $t.closest('.swipers-wrapper');
						swipers['swiper-'+slidersWrapper.find('.swiper-control-bottom').attr('id')].slideTo(activeIndex);
						slidersWrapper.find('.swiper-control-bottom').find('.active').removeClass('active');
          	slidersWrapper.find('.swiper-control-bottom').find('.swiper-slide').eq(activeIndex).addClass('active');
					}
				}*/
			});
			swipers['swiper-'+index].update();
			initIterator++;		

		});
		/* two sliders control: control bottom slider to top slider */
		$('.swiper-container.swiper-control-top').each(function(){
			swipers['swiper-swiper-unique-id-0'].params.control = swipers['swiper-'+$(this).closest('.swipers-wrapper').find('.swiper-control-bottom').attr('id')];
		});
		$('.swiper-container.swiper-control-bottom').each(function(){
			swipers['swiper-swiper-unique-id-1'].params.control = swipers['swiper-'+$(this).closest('.swipers-wrapper').find('.swiper-control-top').attr('id')];
		});
	};

	/*==============================*/
	/* 08 - buttons, clicks, hovers */
	/*==============================*/
	$('.mobile-button').on('click', function(e){
		$(this).toggleClass('active');
		$(this).parents('header').find('.toggle-block').toggleClass('open-menu');
		$(this).parents().find('.top-mobile-menu').toggleClass('fix-menu');
		$('html').toggleClass('overflow-menu');
		e.preventDefault();
	});

	$('nav i').on('click', function(e){
		$(this).parent().find('> ul').slideToggle(350);
		$(this).toggleClass('return-arrow');
		e.preventDefault();	
	});

	//clear-selection
	$('.clear-selection .button-link').on('click', function(e){
		$(this).parents('.search-block').find('.input-field-wrapp input').val("");
		$('.search-block .sumoselect-wrapp select').each(function(){
			$(this)[0].selectedIndex = 0;
			$(this)[0].sumo.reload();
		});
		$('.search-block select')[0].sumo.reload();
		$(this).closest('.clear-selection').addClass('remove')
		e.preventDefault();
	});

	/*==============================*/
	/* 09 - pop-up */
	/*==============================*/
	$(document).on('click', '.open-popup', function(){
		$('.popup-content').removeClass('active');
		$('.popup-wrapper, .popup-content[data-rel="'+$(this).data('rel')+'"]').addClass('active');
		$('html').addClass('overflow-hidden');
		return false;
	});

	$(document).on('click', '.popup-wrapper .button-close, .popup-wrapper .layer-close, .popup-wrapper .popup-close', function(){
		$('.popup-wrapper, .popup-content').removeClass('active');
		$('html').removeClass('overflow-hidden');
		setTimeout(function(){
			$('.ajax-popup').remove();
		},300);
		return false;
	});

	//close popup with ESCAPE key
	$(document).keyup(function(e) {
		if (e.keyCode === 27 ) {
			$('.popup-wrapper, .popup-content').removeClass('active');
			$('html').removeClass('overflow-hidden');
		}
	});

	/*==============================*/
	/* 10 - smooth scroll*/
	/*==============================*/
	$(function() {
	  $('a[href*="#"]:not([href="#"])').click(function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
		  var target = $(this.hash);
		  target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
		  if (target.length) {
			$('html, body').animate({
			  scrollTop: target.offset().top
			}, 1000);
			$('.mobile-button').removeClass('active');
			$('.toggle-block').removeClass('open-menu');
			$('html').removeClass('overflow-menu');
			return false;
		  }
		}
	  });
	});

	/*==============================*/
	/* 11 - upload file */
	/*==============================*/
	$('body').on('change', '.up-file', function(){
	  var format = $(this).val();
	  var fileName = format.substring(format.lastIndexOf("\\")+1);
		if(format == ''){
			$('.file-name').text('Upload Document');
		}else{
	  	$('.file-name').text(fileName);
		}
	});

});


