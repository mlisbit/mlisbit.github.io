//instantiate foundation
$(document).foundation();

//instantiate headroom.js
var myElement = document.querySelector("nav");
var headroom  = new Headroom(myElement);
headroom.init()

//fix mobile navbar attempted collapse.
//disable headroom if nav menu is showing.
var expandend_menu = false;
$(".menu-icon a").on("click", function() {
	expandend_menu = !expandend_menu;
	if (expandend_menu) {
		headroom.offset = 10000
	} else {
		headroom.offset = 1
	}
})

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


//google analytics
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-48973861-3', 'auto');
ga('send', 'pageview');

