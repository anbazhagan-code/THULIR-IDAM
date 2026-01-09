// Premium Services JavaScript
$(document).ready(function() {
    // Animate elements on scroll
    function animateOnScroll() {
        $('[data-animation]').each(function() {
            var element = $(this);
            var animation = element.data('animation');
            var delay = element.data('delay') || 0;
            
            if (element.visible(true)) {
                setTimeout(function() {
                    element.addClass('animate__animated animate__' + animation);
                }, delay * 1000);
            }
        });
    }

    // Initialize animations
    animateOnScroll();
    $(window).on('scroll', animateOnScroll);

    // Animated counter
    function animateCounter() {
        $('.stat-number').each(function() {
            var $this = $(this);
            var countTo = $this.data('count');
            
            if ($this.visible(true)) {
                $({ countNum: 0 }).animate({
                    countNum: countTo
                }, {
                    duration: 2000,
                    easing: 'swing',
                    step: function() {
                        $this.text(Math.floor(this.countNum));
                    },
                    complete: function() {
                        $this.text(this.countNum);
                    }
                });
            }
        });
    }

    // Initialize counter
    animateCounter();
    $(window).on('scroll', animateCounter);

    // Testimonials carousel
    $('.testimonials-carousel').owlCarousel({
        loop: true,
        margin: 30,
        nav: true,
        dots: false,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            },
            1200: {
                items: 3
            }
        }
    });

    // Back to top button
    $('#backToTop').click(function() {
        $('html, body').animate({ scrollTop: 0 }, 800);
        return false;
    });

    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            $('#backToTop').fadeIn();
        } else {
            $('#backToTop').fadeOut();
        }
    });

    // Add active class to current nav item
    $('.nav-link').each(function() {
        if (this.href === window.location.href) {
            $(this).addClass('active');
        }
    });

    // Smooth scroll for anchor links
    $('a[href^="#"]').on('click', function(event) {
        var target = $(this.getAttribute('href'));
        if (target.length) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 80
            }, 1000);
        }
    });

    // Add hover effect to service cards
    $('.service-card').hover(
        function() {
            $(this).find('.card-inner').css('transform', 'rotateY(180deg)');
        },
        function() {
            $(this).find('.card-inner').css('transform', 'rotateY(0)');
        }
    );

    // Parallax effect for hero shapes
    $(window).scroll(function() {
        var scrolled = $(this).scrollTop();
        $('.shape-1').css('transform', 'translateY(' + (scrolled * 0.5) + 'px)');
        $('.shape-2').css('transform', 'translateY(' + (scrolled * -0.3) + 'px)');
        $('.shape-3').css('transform', 'translateY(' + (scrolled * 0.2) + 'px)');
    });
});

// Visibility check function
$.fn.visible = function(partial) {
    var $t = $(this),
        $w = $(window),
        viewTop = $w.scrollTop(),
        viewBottom = viewTop + $w.height(),
        _top = $t.offset().top,
        _bottom = _top + $t.height(),
        compareTop = partial === true ? _bottom : _top,
        compareBottom = partial === true ? _top : _bottom;
    
    return ((compareBottom <= viewBottom) && (compareTop >= viewTop));
};