(function ($) {
    'use strict';

    $('.portfolio-filter li').on('click', function (event) {
        $(this).siblings('.active').removeClass('active');
        $(this).addClass('active');
        event.preventDefault();
    });


    // Port. Filtering
    $('.portfolio-filter').on('click', 'a', function () {
        $(this).addClass('current');
        var filterValue = $(this).attr('data-filter');
        $(this).parents('.portfolio-filter-wrap').next().isotope({
            filter: filterValue
        });
    });


    // Scroll button
    $('body').append('<a id="back-to-top" class="to-top-btn" href="#"><i class="ti-arrow-up"></i></a>');
    if ($('#back-to-top').length) {
        var scrollTrigger = 100, // px
            backToTop = function () {
                var scrollTop = $(window).scrollTop();
                if (scrollTop > scrollTrigger) {
                    $('#back-to-top').addClass('to-top-show');
                } else {
                    $('#back-to-top').removeClass('to-top-show');
                }
            };
        backToTop();
        $(window).on('scroll', function () {
            backToTop();
        });
        $('#back-to-top').on('click', function (e) {
            e.preventDefault();
            $('html,body').animate({
                scrollTop: 0
            }, 500);
        });
    };

    //  Responsive menu
    $('.mobile-menu').meanmenu();



    /* CONTACT FORM VALIDATIONS SETTINGS */
    var CTForm = $('#contact_form');
    CTForm.validate({
        onfocusout: false,
        onkeyup: false,
        rules: {
            name: "required",
            email: {
                required: true,
                email: true
            }
        },
        errorPlacement: function (error, element) {
            error.insertBefore(element);
        },
        messages: {
            name: "What's your name?",
            email: {
                required: "What's your email?",
                email: "Please, enter a valid email"
            }
        },

        highlight: function (element) {
            $(element)
                .text('').addClass('error')
        },

        success: function (element) {
            element
                .text('').addClass('valid')
        }
    });


    /* CONTACT FORM SCRIPT */
    var CTSubmit = $('#contact_submit');
    CTForm.submit(function () {
        // submit the form
        if ($(this).valid()) {
            CTSubmit.button('loading');
            var action = $(this).attr('action');
            $.ajax({
                url: action,
                type: 'POST',
                data: {
                    contactname: $('#contact_name').val(),
                    contactemail: $('#contact_email').val(),
                    contactmessage: $('#contact_message').val()
                },
                success: function () {
                    CTSubmit.button('reset');
                    CTSubmit.button('complete');
                },
                error: function () {
                    CTSubmit.button('reset');
                    CTSubmit.button('error');
                }
            });
            // return false to prevent normal browser submit and page navigation 
        } else {
            CTSubmit.button('reset')
        }
        return false;
    });





})(jQuery);