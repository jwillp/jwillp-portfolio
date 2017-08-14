$(document).ready(function(){  
    console.log("PSR READY");
    // Utility
    if(typeof(String.prototype.trim) === "undefined") {
        String.prototype.trim = function() {
            return String(this).replace(/^\s+|\s+$/g, '');
        };
    }

    if(typeof(String.prototype.contains) === "undefined") {
        String.prototype.contains = function(it) { return this.indexOf(it) != -1; };
    }   
    // Animation
    AOS.init({
        offset: 200,
        duration: 1000,
        delay: 100,
        once: true,
    });


    // browser window scroll (in pixels) after which the "back to top" link is shown
    var OFFSET = 500;
    //browser window scroll (in pixels) after which the "back to top" link opacity is reduced
    var OFFSET_OPACITY = 1200;
    //duration of the top scrolling animation (in ms)
    var SCROLL_TOP_DURATION = 700;
    //grab the "back to top" link
    var backToTopBtn = $('.scroll-up-icon');
    backToTopBtn.hide();
    //hide or show the "back to top" link
    $(window).scroll(function(){
        var scrollDistance = $(this).scrollTop();
        if(scrollDistance >= OFFSET){
            backToTopBtn.fadeIn("slow");
        } else {
            backToTopBtn.fadeOut("slow");
        }

    });

    //smooth scroll to top
    $('.scroll-icon').on('click', function(event){
        event.preventDefault();
        $('body,html').animate({
            scrollTop: $( $.attr(this, 'href') ).offset().top,
            }, SCROLL_TOP_DURATION
        );
    });

    // scrool icon down animation
    var scrollDownBtn = $('.scroll-down-icon');
    scrollDownBtn.bind('cusfadeOut',function() {
            $(this).fadeOut(2000,function() {
                    $(this).trigger('cusfadeIn');
            });
    });
    scrollDownBtn.bind('cusfadeIn',function() {
            $(this).fadeIn(2000, function() {
                    $(this).trigger('cusfadeOut');
            });
    });
    scrollDownBtn.trigger('cusfadeOut');


});
