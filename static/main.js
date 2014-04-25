

/* FOUNDATION ORBIT ===================================== */
$(document).foundation({
    orbit: {
        slide_number: false,
        animation_speed: 100,
        bullets: false,
    }
});

/* MIXITUP ============================================== */
$(function(){
    $('.row').mixItUp({
        load: {
            filter: '.web'
        },
        callbacks: {
            onMixEnd: function(state){
                s.refresh($('.portfolioSlide'));
		  }
	   }
    });
});
        
/* MENU INTERACTIONS =============================== */
$('.menu').css({width: 0})
$('.contact').css({width: 0})

$('.menu-button').click(function() {
    if ($('.menu').css("width") === "0px") {
        $('.contact').css("height","200px;");
        $('.contact').animate({width: 0}, 100);
        $('.menu').animate({width: 200}, 100);
    } else {
        $('.menu').animate({width: 0}, 100)
        $('.contact').animate({width: 0}, 100);
    }
})
$('.nav-contact-link').click(function() {
    if ($('.contact').css("width") === "0px") {
        $('.contact').css("height","auto");
        $('.menu').animate({width: 0}, 100);
        $('.contact').animate({width: 300}, 100);
    } else {
        $('.contact').animate({width: 0}, 100)
    }
})

/* SCROLL TO ANCHOR ================================= */
$('a[href*=#]:not([href=#])').click(function () {
console.log("heyhey");
if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') || location.hostname == this.hostname) {
    var target = $(this.hash);

    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
    console.log(target.selector);
    if (target.length) {
        $('html,body').animate({
            scrollTop: target.offset().top
        }, 300);
        return false;
    }
}
});
            
/* THUMBNAIL ANIMATION =============================== */
$('.thumb').hover(function() {
    $('.overlay', this).toggle()
});

/*
$('a.orbit-prev').css('background', 'black');
$('a.orbit-prev').css('opacity', '0.3');
*/

$('.orbit-next').click(function() {
    console.log("CLICKED!");
});



/* SKROLLR ============================================= */

// Setup variables
$window = $(window);
$slide = $('.homeSlide');

$body = $('body');

// Init Skrollr
var s = skrollr.init({
    render: function(data) {},
    forceHeight: true,
});


// Get window size
winH = $window.height();

// Keep minimum height 550
if(winH <= 550) {
    winH = 550;
} 

// Resize our slides
$slide.height(winH);

// Refresh Skrollr after resizing our sections
s.refresh($('.homeSlide'));


$('.filter').click(function() {
    console.log("filter has been hit!");
    s.refresh($('.portfolioSlide'));
})

if($('#Container').mixItUp('isLoaded')){
	s.refresh($('.portfolioSlide'));
}



