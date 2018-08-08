
      $(function(){
        //案例显示 24条数据
       var swiperMy = new Swiper('.swiper-containerMy', {
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
        $(".swiper-slide").hover(function() {
             $(this).find(".front").fadeIn();
        }, function() {
            $(this).find(".front").fadeOut();
        });
        // 首页案例部分点击
        $('.swiper-wrapper .swiper-slide').click(function() {
            autoStop(swiperMy);
            var index_Sw = parseInt($(this).index());
            if (index_Sw >= 0 && index_Sw <= 5) {
                $('.fullscreen').removeClass('show');
                $('.fullscreen').eq(0).addClass('show');
                slideTo(index_Sw);
            } else if (index_Sw >= 6 && index_Sw <= 11) {
                $('.fullscreen').removeClass('show');
                console.log($('.fullscreen').eq(1).html());
                $('.fullscreen').eq(1).addClass('show');
                slideTo(index_Sw);
            } else if (index_Sw >= 12 && index_Sw <= 17) {
                $('.fullscreen').removeClass('show');
                $('.fullscreen').eq(2).addClass('show');
                slideTo(index_Sw);
            } else if (index_Sw >= 18 && index_Sw <= 23) {
                $('.fullscreen').removeClass('show');
                $('.fullscreen').eq(3).addClass('show');
                slideTo(index_Sw);
            }
            function slideTo(index_Sw) {
                swiper_caseSix.slideTo(index_Sw);
            }

            $('.header').removeClass('fixed');
        });
        $('.fullscreen .close').click(function() {
            autoStart(swiperMy);
            $('.fullscreen').removeClass('show');
            $('.header ').addClass('fixed');
        });
        // 开始循环
        function autoStart(obj){
           obj.autoplay.start();
        }
         // 开始暂停循环
        function autoStop(obj){
           obj.autoplay.stop();
        }
        // 案例点击显示的轮播图
        var swiper_caseSix= new Swiper('.caseSix_container', {
          spaceBetween: 30,
          centeredSlides: true,
          autoplay: {
            delay: 2500,
            disableOnInteraction: false,
          },
          pagination: {
            el: '.caseSix_container .swiper-pagination',
            clickable: true,
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        });
    })
