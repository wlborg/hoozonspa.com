//PC端自适应
window.onresize = function () {
    rem()
}
// 进行rem的计算 因为是已1920px为基准进行计算的，所以为了方便，把1rem等于100px
function rem() {
    var whdef = 100/1920;// 表示1920的设计图,使用100PX的默认值
    var wH = window.innerHeight;// 当前窗口的高度
    var wW = window.innerWidth;// 当前窗口的宽度
    var rem = wW * whdef;// 以默认比例值乘以当前窗口宽度,得到该宽度下的相应FONT-SIZE值
    $('html').css('font-size', rem + "px");
}
rem();



var mySwiper = new Swiper('.swiper-container', {
    autoplay: 1800,//可选选项，自动滑动
    loop: true,
    effect : 'fade',
    fade: {
      crossFade: false,
            },
    prevButton:'.swiper-button-prev',
    nextButton:'.swiper-button-next',
})

$(".swiper-container").mouseenter(function () {//滑过悬停
    mySwiper.stopAutoplay();//mySwiper 为上面你swiper实例化的名称
}).mouseleave(function(){//离开开启
    mySwiper.startAutoplay();
})




new WOW().init(); 


//底部轮播开始
/*var mySwiper = new Swiper ('.swiper-container', {
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
})*/


//点击自定义分页器
/*$('.btn-item').click(function(){
    //滑动下标是从一开始的
    var index = $(this).index('.btn-item') + 1;
    mySwiper.slideTo(index);
    mySwiper.startAutoplay();
})*/



/*$('.btn-item').hover(function(){
    //滑动下标是从一开始的
    var index = $(this).index('.btn-item') + 1;
    mySwiper.slideTo(index);
    mySwiper.startAutoplay();
})*/




//part1图片效果
/*$('#part1-content .item').mouseover(function(){
    var index = $(this).index('#part1-content .item');
    console.log(index);
    $('.mask').eq(index).fadeIn();
}).mouseout(function(){
    var index = $(this).index('#part1-content .item');
    $('.mask').eq(index).fadeOut();
})*/




/*$("#part1-content .item").mouseenter(function(){
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
});*/
