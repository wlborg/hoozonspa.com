
      $(function(){
      // 项目轮播图需要
       var content=['纹眉、眼、唇','光电美肤','美容SPA','科技瘦身','美妆护肤'];
       var swiperMy = new Swiper('.swiper-container_pro', {
             slidesPerView: 3,
             slidesPerColumn: 2,
             slidesPerGroup : 3,
             spaceBetween:0,
             autoplay:false,
             noSwiping : true,
             pagination: {
              el: '.project-pagination',
              clickable: false,
              renderBullet: function (index, className) {
               return '<li class="'+className+' index_proIn">'+ content[index] + '</li>';
            }
            },
             navigation: {
             nextEl: '.next',
             prevEl: '.prev',
        },
         });
       swiperMy.slideTo(2);
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
         // 案例点击显示的轮播图1
        var swiper_caseSix1= new Swiper('.caseSix_container1', {
          spaceBetween: 30,
          centeredSlides: true,
          autoplay: {
            delay: 5000,
            disableOnInteraction: false,
          },
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        });
         // 案例点击显示的轮播图2
        var swiper_caseSix2= new Swiper('.caseSix_container2', {
          spaceBetween: 30,
          centeredSlides: true,
          autoplay: {
            delay: 5000,
            disableOnInteraction: false,
          },
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        });
         // 案例点击显示的轮播图3
        var swiper_caseSix3= new Swiper('.caseSix_container3', {
          spaceBetween: 30,
          centeredSlides: true,
          autoplay: {
             delay: 5000,
            disableOnInteraction: false,
          },
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        });
          // 案例点击显示的轮播图4
        var swiper_caseSix4= new Swiper('.caseSix_container4', {
          spaceBetween: 30,
          centeredSlides: true,
          autoplay: {
            delay: 5000,
            disableOnInteraction: false,
          },
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        });
        $(".swiper-slide").hover(function() {
             $(this).find(".front").fadeIn();
        }, function() {
            $(this).find(".front").fadeOut();
        });
        // 首页案例部分点击
        $('.cases-container .swiper-wrapper .swiper-slide').click(function() {
            // 案例轮播停止
            autoStop(swiperMy);
            var index_Sw = parseInt($(this).index());
            if (index_Sw >= 0 && index_Sw <= 5) {
                fullReShow('fullscreen');
                $('.fullscreen').eq(0).addClass('show');
                slideToFrom(swiper_caseSix1,index_Sw);
            } else if (index_Sw >= 6 && index_Sw <= 11) {
                fullReShow('fullscreen');
                $('.fullscreen').eq(1).addClass('show');
                index_Sw=index_Sw%6;
                slideToFrom(swiper_caseSix2,index_Sw);
            } else if (index_Sw >= 12 && index_Sw <= 17) {
                fullReShow('fullscreen');
                $('.fullscreen').eq(2).addClass('show');
                 index_Sw=index_Sw%6;
                slideToFrom(swiper_caseSix3,index_Sw);
            } else if (index_Sw >= 18 && index_Sw <= 23) {
                fullReShow('fullscreen');
                $('.fullscreen').eq(3).addClass('show');
                 index_Sw=index_Sw%6;
                slideToFrom(swiper_caseSix4,index_Sw);
            }
            $('.header').removeClass('fixed');
            function slideToFrom(caseSix,index_Sw) {
                caseSix.slideTo(index_Sw);
            }
            function fullReShow(obj){
               $(obj).removeClass('show');
               hiddBody();
            }
        });

            function hiddBody(){
              $("body").css("overflow-y","hidden")
            }
             function showBody(){
              $("body").css("overflow-y","visible")
            }
        $('.fullscreen .close').click(function() {
            showBody();
            autoStart(swiperMy);
            $('.fullscreen').removeClass('show');
            $('.header').addClass('fixed');
        });
        // 开始循环
        function autoStart(obj){
           obj.autoplay.start();
        }
         // 开始暂停循环
        function autoStop(obj){
           obj.autoplay.stop();
        }
       function startStopVideo(id){
        // 视频暂停和开始播放
        var video=document.getElementById(id);
        video.addEventListener("click",function(){
             if (this.paused) {
                this.play();
            } else {
                this.pause();
            }
        })
      }
      startStopVideo("video");
      // 为美容spa添加六个分类
      var html='<ul class="spaSon"><li>补水嫩肤</li><li>胸部护理</li><li>面部护理</li><li>护肤调养</li><li>美容spa</li><li>人气岩盘浴</li></ul>';
      $(".index_proIn").eq(2).append(html);
      $("spaSon>li").on("click",function(){
        var index=$(this).index;
        $(".hotproject .g-right .project-block .swiper-slide").find(".front").css("visibility","hidden");
        $(".hotproject .g-right .project-block .swiper-slide").eq(index).find(".front").css("visibility","visible");
      })
    });
