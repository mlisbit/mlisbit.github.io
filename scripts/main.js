//instantiate foundation
$(document).foundation();

//instantiate headroom.js
$("nav").headroom();

//prevent filter button hrefs scrolling to top
$('a.filter').click(function(e) {
	 return false; 
	 e.preventDefault(); 
});

//contact button container always in center of about.
$('.contact').height($('.about').height());
$( window ).resize(function() {
	$('.contact').height($('.about').height());
});

//single page scroll yo.
$('nav section ul li a').on('click', function() {
	$("html, body").animate({ scrollTop: $($(this).attr("href")).position().top }, 200)
	window.location.hash = $(this).attr("href");
})

//resize the modal on open (fixes image height issues with orbit)
$('#myModal').on('opened', function () { 
  $(window).trigger('resize');
});

//sigma.js data visualization stuff.
sigma.parsers.json('/json/sigma_data.json', {
	container: 'sigma-container',
	settings: {
	  defaultNodeColor: '#ec5148',
	  zoomMin: 0.5,
	  sideMargin: 0.5,
	  zoomingRatio: 1.1,
	  labelThreshold: 4
	}
  });

//check if clients on mobile to initialize skrollr
 var isDesktop = window.screenX != 0 || (screen.width - $(window).width() >= 20 && screen.height - $(window).height() >= 20) || ($(window).width() >= 900 && $(window).height() >= 800)
if (isDesktop) {var s = skrollr.init();}


