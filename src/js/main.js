//= jquery-3.2.1.js
//= slider.js
//= magnific.js



$(document).ready(function() {
	$('.slider-one').owlCarousel({
		loop:false,
		margin:10,
		nav:false,
		autoplay:false,
		smartSpeed:1000,
		autoplayTimeout:2000,
		responsive:{
			0:{
				items:1
			},
			600:{
				items:1
			},
			1000:{
				items:1
			}
		}
	});
});

$(document).ready(function() {
	$('.slider-two').owlCarousel({
		loop:false,
		margin:10,
		nav:false,
		autoplay:false,
		smartSpeed:1000,
		autoplayTimeout:2000,
		responsive:{
			0:{
				items:1
			},
			600:{
				items:1
			},
			1000:{
				items:1
			}
		}
	});
});

$(document).ready(function() {
	$('.slider-three').owlCarousel({
		loop:false,
		margin:10,
		nav:false,
		autoplay:false,
		smartSpeed:1000,
		autoplayTimeout:2000,
		responsive:{
			0:{
				items:1
			},
			600:{
				items:1
			},
			1000:{
				items:1
			}
		}
	});
});

var owl = $('.slider-one');
$('.advantages__btn--next').click(function() {
    owl.trigger('next.owl.carousel');
})
$('.advantages__btn--prev').click(function() {
    owl.trigger('prev.owl.carousel', [300]);
});

var owl2 = $('.slider-two');
$('.reviews__btn--next').click(function() {
    owl2.trigger('next.owl.carousel');
})
$('.reviews__btn--prev').click(function() {
    owl2.trigger('prev.owl.carousel', [300]);
});

var owl3 = $('.slider-three');
$('.accordeon__btn--next').click(function() {
    owl3.trigger('next.owl.carousel');
})
$('.accordeon__btn--prev').click(function() {
    owl3.trigger('prev.owl.carousel', [300]);
});



 $('.image-popup-zoom').magnificPopup({
 type: 'image',
 zoom: {
     enabled: true,
     duration: 300
 }
 });

 $('.letters__link').magnificPopup({
     items: [
       {
         src: '.letters__letter',
         type: 'inline'
       }
     ],
     gallery: {
       enabled: true
     },
 	 type: 'image'
 });



 var nav = document.querySelector(".nav"),
     navToggle = document.querySelector(".btn--nav");
     nav.classList.remove("nav--nojs");
 navToggle.addEventListener("click", function(){
   if(nav.classList.contains("nav--closed")){
     nav.classList.remove("nav--closed");
     nav.classList.add("nav--opened");
   } else {
     nav.classList.remove("nav--opened");
     nav.classList.add("nav--closed");
   }
 });

 	var popUp = document.querySelector(".popup"),
 	    btnOpen = document.querySelector(".page-header__user-link"),
 	    btnClose = document.querySelector(".popup__btn--close"),
 			overlay = document.querySelector(".overlay");
 	btnOpen.addEventListener("click", function(event){
 	  event.preventDefault();
 	  popUp.classList.toggle("popup--opened");
 		overlay.classList.toggle("overlay--opened");
 	    nav.classList.remove("nav--opened");
 	    nav.classList.add("nav--closed");
 	});
 	btnClose.addEventListener("click", function(){
 	  if(popUp.classList.contains("popup--opened")){
 	    popUp.classList.remove("popup--opened");
 	  }
 		if(overlay.classList.contains("overlay--opened")){
 			overlay.classList.remove("overlay--opened");
 		}
 	});
 	window.addEventListener("keydown", function(event){
 	  if(event.keyCode == 27){
			if(popUp.classList.contains("popup--opened")){
	 	    popUp.classList.remove("popup--opened");
	 	  }
	 		if(overlay.classList.contains("overlay--opened")){
	 			overlay.classList.remove("overlay--opened");
	 		}
 	  }
 	});
