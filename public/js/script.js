(function ($) {
    'use strict';

    var $window = $(window);

     // :: Sticky Active Code
    $window.on("scroll", function(){
        if
      ($(document).scrollTop() > 86){
          $("#banner").addClass("shrink");
        }
        else
        {
            $("#banner").removeClass("shrink");
        }
    });


    // :: Carousel Active Code
    if ($.fn.owlCarousel) {

        $(".client_slides").owlCarousel({
            responsive: {
            0: {
                items: 1
            },
            991: {
                    items: 2
                },
            767:{
                    items: 1
                }
            },
            loop: true,
            autoplay: true,
            smartSpeed: 700,
            dots: true
        });

        var dot = $('.client_slides .owl-dot');
        dot.each(function () {
            var index = $(this).index() + 1;
            if (index < 10) {
                $(this).html('0').append(index);
            } else {
                $(this).html(index);
            }
        });
    }

    // :: Magnific-popup Video Active Code
    if ($.fn.magnificPopup) {
        $('#videobtn').magnificPopup({
            type: 'iframe'
        });
        $('.open-popup-link').magnificPopup({
          type:'inline',
          midClick: true 
        });
        $('.open-signup-link').magnificPopup({
          type:'inline',
          midClick: true 
        });
        $('.gallery_img').magnificPopup({
            type: 'image',
            gallery: {
                enabled: true
            },
            removalDelay: 300,
            mainClass: 'mfp-fade',
            preloader: true
        });
    }

     // :: Preloader Active Code
    $window.on('load', function () {
        $('#preloader').fadeOut('1000', function () {
            $(this).remove();
        });
    });

    
    // :: ScrollUp Active Code
    if ($.fn.scrollUp) {
        $.scrollUp({
            scrollSpeed: 1500,
            scrollText: 'Scroll Top'
        });
    }

    // :: onePageNav Active Code
    if ($.fn.onePageNav) {
        $('#nav').onePageNav({
            currentClass: 'active',
            scrollSpeed: 1500,
            easing: 'easeOutQuad'
        });
    }

    // :: CounterUp Active Code
    if ($.fn.counterUp) {
        $('.counter').counterUp({
            delay: 10,
            time: 2000
        });
    }



    // :: Wow Active Code
    if ($window.width() > 767) {
        new WOW().init();
    }

    // :: Accordian Active Code
    (function () {
        var dd = $('dd');
        dd.filter(':nth-child(n+3)').hide();
        $('dl').on('click', 'dt', function () {
            $(this).next().slideDown(500).siblings('dd').slideUp(500);
        })
    })();

    // :: niceScroll Active Code
    if ($.fn.niceScroll) {
        $(".timelineBody").niceScroll();
    }


    $('.simple_timer').syotimer({
        year: 2024,
        month: 11,
        day: 9,
        hour: 20,
        minute: 30
    })

function pad(num, size) {
    var s = "0" + num;
    return s.substr(s.length-size);
}

// window.onload = function () {
//               var dataPoints = [];
//               var stockChart = new CanvasJS.StockChart("stockChartContainer",{
//                 theme: "dark2",
//                 colorSet: "colorSet3",
//                 exportEnabled: false, //false
//                 charts: [{
//                     toolTip:{
//                         content: "{y}"
//                     },
//                   axisX: {
//                     crosshair: {
//                       enabled: true,
//                     }
//                   },
//                   axisY: {
//                     prefix: "€",
//                     suffix: "",
//                     title: "BAKTAT Price in €",
//                     titleFontSize: 14
//                   },
//                   data: [{
//                     type: "area",
//                     xValueFormatString: "MMM YYYY",
//                     yValueFormatString: "€#,##0.00",
//                     dataPoints : dataPoints
//                   }]
//                 }],
//                 navigator: {
//                   slider: {
//                     minimum: new Date(2022, 11, 21),
//                     maximum: new Date()
//                   }
//                 }

//               });
//               $.getJSON("files/chartdata.json", function(data) {
//                 for(var i = 0; i < data.length; i++){
//                   dataPoints.push({x: new Date(data[i].date), y: Number(data[i].sale)});
//                 }
                
//                 var fromData = new Date(data[data.length-1].date);
//                 fromData.setHours(0,0,0,0);
//                 var currentDate = new Date();
//                 currentDate.setHours(0,0,0,0);

//                 if(fromData < currentDate){
//                     dataPoints.push({x: new Date(), y: Number(data[data.length-1].sale)});
//                 }

//                 stockChart.render();
//               });
//             } 

})(jQuery);
