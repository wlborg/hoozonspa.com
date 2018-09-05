//底部轮播开始
var mySwiper = new Swiper ('.swiper-container', {
    autoplay: 2000,
    loop: true,
    pagination: '.swiper-pagination',
    paginationType: "custom",
    paginationClickable: true,
    paginationCustomRender: function (swiper, current, total) {
        for(var i= 0; i< total; i++) {
            if(i == (current-1)) {
                $('.btn-item').eq(i).addClass('swiper-pagination-customs active');
            }else{
                $('.btn-item').eq(i).removeClass('swiper-pagination-customs active');
            }
        }
    }
})

$('.swiper-slide').mouseenter(function () {
    mySwiper.stopAutoplay();
}).mouseleave(function () {
    mySwiper.startAutoplay();
})


//点击自定义分页器
/*$('.btn-item').click(function(){
    //滑动下标是从一开始的
    var index = $(this).index('.btn-item') + 1;
    mySwiper.slideTo(index);
    mySwiper.startAutoplay();
})*/
$('.btn-item').hover(function(){
    //滑动下标是从一开始的
    var index = $(this).index('.btn-item') + 1;
    mySwiper.slideTo(index);
    mySwiper.startAutoplay();
})
//part1图片效果
/*$('#part1-content .item').mouseover(function(){
    var index = $(this).index('#part1-content .item');
    console.log(index);
    $('.mask').eq(index).fadeIn();
}).mouseout(function(){
    var index = $(this).index('#part1-content .item');
    $('.mask').eq(index).fadeOut();
})*/

$("#part1-content .item").mouseenter(function(){
    var index = $(this).index('#part1-content .item');
    $('.mask').eq(index).show();
    $('.pic-title').eq(index).hide();
}).mouseleave(function(){
    var index = $(this).index('#part1-content .item');

    if(index == 4) {
        $('.mask').eq(index).show();
    }else {
        $('.mask').eq(index).hide();
    }
    $('.pic-title').eq(index).show();
});
