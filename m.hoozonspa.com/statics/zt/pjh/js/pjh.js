$(document).ready(function() {
     var mySwiper1 = new Swiper('.box3_swiper', {
        direction: 'horizontal',
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        loop:true,
        navigation: {
            nextEl: '.box3_min .swiper-button-next',
            prevEl: '.box3_min .swiper-button-prev',
        },
        pagination: {
            el: '.box3_swiper .pagination2',
        },
    })
    var mySwiper = new Swiper('.box4_swiper', {
        direction: 'horizontal',
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },

        loop:true,
        pagination: {
            el: '.box4_swiper .pagination4',
        },
    })


})