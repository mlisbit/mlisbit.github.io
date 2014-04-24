/* My first jquery plugin */

(function( $ ) {
    $.fn.slideit = function(options){
        var settings = $.extend({
            // default settings
            width: '400px',
            width_int: 400,
            animation_speed: 200,
            debug: true,
        }, options );

        //console.log("Hello, Im a slider");
        function spawnOverlay() {
            if ($('#slide-it-overlay').length) {
                $('#slide-it-overlay').fadeIn();
            } else {
                $('body').prepend("<div id='slide-it-overlay'></div>");
                console.log("IT HAS BEEN SUMMONED")
                $('#slide-it-overlay').fadeIn()
            }
        }

        function killOverlay() {
            $('#slide-it-overlay').fadeOut()
            
        }
        /* Start complicated stuff */
        function openMenu() {
            $('#slideit-menu').animate({left: '0px'}, settings.animation_speed)
            $('html').css({overflowX: 'hidden'})
            $('body').css({overflowX: 'hidden'})
            //changed
            $('body').animate({left: settings.width}, settings.animation_speed);
            spawnOverlay()
        }

        function closeMenu() {
            $('#slideit-menu').animate({left: '-'+settings.width}, settings.animation_speed)
            $('body', 'html').animate({left: '0px'}, settings.animation_speed)
            killOverlay()
        }

        function findMatchingClass(clicked, callback) {
            for (var i = 0 ; i<$(clicked)[0].classList.length ; i++ ) {
                var current = clicked[0].classList[i];
                $('.slideit-panel').each(function() {
                    for (var i = 0 ; i<$(this)[0].classList.length ; i++ ) {
                        if (current === $(this)[0].classList[i]) {
                            //console.log("FOUND!");
                            hideAllClasses();
                            return matching = $(this);
                        }
                    };
                });
            };
            callback(matching);
        };

        function hideAllClasses() {
            $('.slideit-panel').each(function() {
                $(this).hide();
            });
        }

        function cssNumber(theNumber) {
            var v = parseInt(theNumber.slice(0, -2));
            return isNaN(v) ? 0 : v;
        }
    
        $('.toggle-slideit').click(function() {
            console.log("toggle button hit. left value: " + $('#slideit-menu').css("left"));
            if ($('#slideit-menu').css("left") === '-'+settings.width) {
                openMenu();
            } else {
                closeMenu();
            }
        });
        
        //close the slider when clicked outside. 
        $('body').click(function() {
            //console.log(cssNumber($('#slideit-menu').css("left")));
            if (cssNumber($('#slideit-menu').css("left")) === 0) {
                if (event.clientX > settings.width_int) {
                    closeMenu();
                }
            }
        });

        $('.trigger').click(function() {
            var clicked = $(this);
            if (cssNumber($('#slideit-menu').css("left")) != 0) {
                findMatchingClass(clicked, function() {
                    matching.show();
                });
            };
        });
        
        /* End complicated Stuff */
        return this;
    };
}( jQuery ));