/* Slidal jquery plugin */
(function( $ ) {
    $.fn.slidal = function(options){
        var settings = $.extend({
            // default settings
            width: '400px',
            animation_speed: 200,
            debug: true,

            menu_selector: '#slidal-menu',
            panel_selector: '.slidal-panel',
            overlay_selector: '#slidal-overlay',

            onOpen: function() {},  
            onClose: function() {} 
        }, options );

        var isOpen = false;
        var isMoving = false;
        menu_selector = $(settings.menu_selector);
        panel_selector = $(settings.panel_selector);
        overlay_selector = $(settings.overlay_selector);
        
        function debugIt() {
            console.log("MENU SELECTOR");
            console.log("width: " + menu_selector.css("width") + " left: " + menu_selector.css("left") + " position: " + menu_selector.css("position"))
            console.log("open: "+ isOpen + " visible: " +menu_selector.is(':visible'));
        }

        //creates greyed out background on slide out.
        function spawnOverlay() {
            isMoving = true;
            if (!overlay_selector.length) {
                //the overlay element has not been added ye
                $('body').prepend("<div id="+settings.overlay_selector.slice(1)+"></div>");
                overlay_selector = $(settings.overlay_selector);  
            }
            overlay_selector.stop( true, true ).fadeIn(function() {
                isMoving = false;
            })
        }

        //hides the grey background on slide in.
        function killOverlay() {
            overlay_selector.stop( true, true ).fadeOut()   
        }
        
        function spawnExit() {
            $('#slidal-close').show()
        };

        function killExit() {
            $('#slidal-close').hide()
        };

        //open the menu.
        function openMenu() {
            isMoving = true;

            if (isMobile()) {
                //the windows too small to support the normal slidal.
                spawnExit();
                spawnOverlay();
                menu_selector.show();
                menu_selector.css({'top': $('body').scrollTop()+'px'});
            } else {
                menu_selector.css({'top': '0px'});
                killExit();
                menu_selector.show();
                menu_selector.stop( true, true ).animate({left: '0px'}, settings.animation_speed)
                $('html').css({overflowX: 'hidden'})
                $('body').css({overflowX: 'hidden'})
                //changed
                $('body').stop( true, true ).animate({left: settings.width}, settings.animation_speed, function() {
                    isMoving = false;
                });
                spawnOverlay()
            }
            isOpen = true;
            settings.onOpen();
        }

        function closeMenu() {
            if (isOpen || menu_selector.is(':visible') || (!isOpen && (window.innerWidth > 400) && menu_selector.css("left") === "0px")) {
                if (!isMobile()) {
                    menu_selector.stop( true, true ).animate({left: '-'+settings.width}, settings.animation_speed);
                    $('body', 'html').stop( true, true ).animate({left: '0px'}, settings.animation_speed, function() {
                        menu_selector.hide();
                    });
                    killOverlay();
                } else {
                    menu_selector.hide();
                    killOverlay();
                }
                hideAllClasses();
                isOpen = false;
                settings.onClose();
            }   
        }

        function isMobile() {
            if (window.innerWidth <= stringToNumber(settings.width)) {
                return true
            }
            return false
        }

        function hideAllClasses(callback) {
            panel_selector.each(function() {
                $(this).hide();
            }); 
            if (typeof callback == 'function') { 
                callback();
            }

        }

        function stringToNumber(theNumber) {
            var v = parseInt(theNumber.slice(0, -2));
            return isNaN(v) ? 0 : v;
        }
    
        $('.toggle-slidal').click(function() {
            var clicked = $(this);
            var filter = clicked.attr("data-filter");
            if (!isOpen) {
                hideAllClasses(function() {
                    $(filter).show();
                });
                
                openMenu();
            } else {
                closeMenu();
            }

        });
        
        $('#slidal-close').click(function() {
            closeMenu();
        });

        //close the slider when clicked outside. 
        $('body').click(function(event) {
            if (isOpen && isMoving === false) {
                if (event.clientX > stringToNumber(settings.width)) {
                    closeMenu();
                } else if (isMobile() && isOpen && isMoving === false) {
                    if (event.target.id === 'slidal-overlay') {
                        closeMenu();
                    }
                }
            } 
            
        });

        window.onresize = function(event) {
            if (isOpen) {
                openMenu();
            } else {
                closeMenu();
            }
            debugIt();
        };

        return this;
    };
}( jQuery ));