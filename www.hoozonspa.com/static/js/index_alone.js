
var video=document.getElementById('video');
    video.onclick=function(){
        alert("pl")
        if(this.paused){
        this.play();
        }else{
             alert("pa")
        this.pause();
        }
    }

    var swiper = new Swiper('.swiper-container', {
      slidesPerView: 3,
      slidesPerColumn: 2,
       slidesPerGroup : 3,
      spaceBetween: 30,
       autoplay:true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });
    swiper.slideTo(1);
      $(function(){
        $(".swiper-slide").hover(function() {
             $(this).find(".front").fadeIn();
        }, function() {
           $(this).find(".front").fadeOut();
        });
        // 首页案例部分点击
        $('.swiper-wrapper .swiper-slide').click(function() {

           swiper.autoplay.stop();
           var index_Sw=parseInt($(this).index());
           console.log(index_Sw)
           if(index_Sw>=0&&index_Sw<=5){
                  $('.fullscreen').removeClass('show');
                 $('.fullscreen').eq(0).addClass('show');
                 slideTo(index_Sw);
           }else  if(index_Sw>=6&&index_Sw<=11){
                 $('.fullscreen').removeClass('show');
                 console.log($('.fullscreen').eq(1).html());
                $('.fullscreen').eq(1).addClass('show');
                 slideTo(index_Sw);
           }else  if(index_Sw>=12&&index_Sw<=17){
                 $('.fullscreen').removeClass('show');
                 $('.fullscreen').eq(2).addClass('show');
                  slideTo(index_Sw);
           }else  if(index_Sw>=18&&index_Sw<=23){
                 $('.fullscreen').removeClass('show');
                 $('.fullscreen').eq(3).addClass('show');
                slideTo(index_Sw);
           }
           function slideTo(index_Sw){
            swiper_caseSix.slideTo(index_Sw);
           }
        $('.header').removeClass('fixed');
        $('.fullscreen .close').click(function() {
             swiper.autoplay.start();
            $('.fullscreen').removeClass('show');
            $('.header ').addClass('fixed');
        })
    });

      })

