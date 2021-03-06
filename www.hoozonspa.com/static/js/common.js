function XZSlide(options) {
    if (typeof options !== 'object') return false;
    this.speed = options.speed || 500;
    this.interval = options.interval || 3000;
    this.step = options.itemWidth || 0;
    this.slideWEle = options.cover || null;
    this.slideCEle = options.container || null;
    this.itemselector = options.itemselector || '.slider-item';
    this.itemCount = options.itemCount || null;
    this.num = 0;
    this.nextEle = options.nextBtn || null;
    this.prevEle = options.prevBtn || null;
    this.indicator = options.indicator || null;
    this.auto = options.auto || false;
    this.resp = options.resp || false;
    this.timer = 0;
    this.figure = options.figure || false;
    this.init();
}
XZSlide.prototype.init = function() {
    var self = this;
    if (this.slideCEle == null) return false;
    if (this.resp) {
        this.step = parseInt(this.slideWEle.find(this.itemselector).css("width"));
    }
    this.slideCEle.css("position", "relative");
    if (this.itemCount == null) {
        this.itemCount = this.slideCEle.find(this.itemselector).length;
    }
    this.slideCEle.find(this.itemselector + ":first").clone().appendTo(this.slideCEle);
    this.slideCEle.css("width", (this.itemCount + 1) * this.step + 10 + "px");
    if (this.auto) {
        this.timer = setInterval($.proxy(this.prev, this), this.interval);
        this.timerControl(this.slideWEle);
    }
    if (this.nextEle) {
        this.timerControl(this.nextEle);
        this.nextEle.click(function() {
            self.next();
        });
    }
    if (this.prevEle) {
        this.timerControl(this.prevEle);
        this.prevEle.click(function() {
            self.prev();
        });
    }
    if (this.indicator) {
        this.timerControl(this.indicator);
        this.indicator.find("li").click(function() {
            var index = $(this).index();
            self.prev(index + 1);
        });
    }
    if (this.figure) {
        this.orient();
    }
};
XZSlide.prototype.timerControl = function(ele) {
    var self = this;
    ele.mouseover(function(e) {
        var event = window.event || e;
        event.stopPropagation();
        clearTimeout(self.timer);
    }).mouseout(function(e) {
        var event = window.event || e;
        event.stopPropagation();
        self.timer = setInterval($.proxy(self.prev, self), self.interval);
    });
};
XZSlide.prototype.prev = function(number) {
    //indicator支持
    if (number) {
        this.num = number - 1;
    } else {
        this.num += 1;
    }
    if (this.num > this.itemCount) {
        var length = -this.step;
        this.slideCEle.css({
            left: 0
        }).stop().animate({
            left: length
        }, this.speed);
        this.num = 1;
    } else {
        var length = -this.num * this.step;
        this.slideCEle.stop().animate({
            left: length
        }, this.speed);
    }
    //indicator支持
    if (this.indicator) {
        this.indi();
    }
};
XZSlide.prototype.next = function() {
    this.num -= 1;
    if (this.num < 0) {
        var length1 = -this.step * (this.itemCount);
        var length2 = -this.step * (this.itemCount - 1);
        this.slideCEle.css({
            left: length1
        }).stop().animate({
            left: length2
        }, this.speed);
        this.num = this.itemCount - 1;
    } else {
        var length = -this.num * this.step;
        this.slideCEle.stop().animate({
            left: length
        }, this.speed);
    }
    //indicator支持
    if (this.indicator) {
        this.indi();
    }
};
XZSlide.prototype.indi = function() {
    if (this.num > this.itemCount - 1) {
        this.indicator.find("li").eq(0).addClass("active").siblings().removeClass("active");
        this.slideCEle.find("li").eq(this.num).addClass("active").siblings().removeClass("active");
    } else {
        this.indicator.find("li").eq(this.num).addClass("active").siblings().removeClass("active");
        this.slideCEle.find("li").eq(this.num).addClass("active").siblings().removeClass("active");
    }
};
XZSlide.prototype.orient = function() {
    var startX;
    var startY;
    var self = this;
    this.slideWEle.on("touchstart", function(e) {
        clearTimeout(self.timer);
        startX = e.originalEvent.changedTouches[0].pageX,
            startY = e.originalEvent.changedTouches[0].pageY;
    });
    this.slideWEle.on("touchend", function(e) {
        var moveEndX = e.originalEvent.changedTouches[0].pageX,
            moveEndY = e.originalEvent.changedTouches[0].pageY,
            X = moveEndX - startX,
            Y = moveEndY - startY;
        //左滑
        if (X > 0 && Math.abs(X) > Math.abs(Y)) {
            self.next();
        }
        //右滑
        else if (X < 0 && Math.abs(X) > Math.abs(Y)) {
            self.prev();
        }
        self.timer = setInterval($.proxy(self.prev, self), self.interval);
    });
}
function debounce(fn, delay) {
    var timer = null;
    return function() {
        var that = this;
        var args = arguments;
        clearTimeout(timer);
        timer = setTimeout(
            function() {
                fn.apply(that, arguments);
            }, delay)
    }
}
function ScrollToDo() {
    this.targets = [];
    this.scrollH = 0;
    this.viewportH = $(window).height();
    this.init();
}
ScrollToDo.prototype.add = function(classname, fn) {
    var offset = 0;
    var height = 0;
    if (typeof classname == "number") {
        offset = classname;
        height = 300;
    } else {
        var el = $(classname).eq(0);
        if (!el) return;
        offset = el.offset().top;
        height = el.height();
    }
    var target = { 'offset': offset, "height": height, "fn": fn, "state": 0 };
    // console.log(height);
    this.targets.push(target);
    // console.log(this.targets);
}
ScrollToDo.prototype.init = function() {
    var self = this;
    this.scrollH = $(document).scrollTop();
    $(window).scroll(function() { debounce(self.do(self), 200) });
};
ScrollToDo.prototype.do = function(self) {
    var scrollH = self.scrollH = $(document).scrollTop();
    var targets = self.targets;
    if (targets.length) {
        targets.forEach(function(el, i, a) {
            // if (scrollH > el.offset-el.height && scrollH < el.offset + self.viewportH) {
            if (scrollH >= el.offset - 100 && scrollH < el.offset) {
                if (el.state == 0) {
                    (el.fn)();
                    el.state = 1;
                }
            } else {
                el.state = 0;
                // console.log(el.state);
            }
        });
    }
}
function tabs(tabIndex, tab) {
    tabIndex.click(function(e) {
        var index = $(this).index();
        if (tab && tab.find('li')) {
            tab.find('li').removeClass('active');
        }
        $(this).addClass('active').siblings().removeClass('active');
        if (tab) {

            tab.eq(index).addClass('active').siblings().removeClass('active');

        }

    });
}
   function hiddBody(){
              $("body").css("overflow-y","hidden")
   }
   function showBody(){
              $("body").css("overflow-y","visible")
   }

function initSlider() {
    // Hot project
    var sliders1 = $(".hotproject .project-block");
    var sliders1arr = [];
    for (var i = 0, len = sliders1.length; i < len; i++) {
        sliders1arr[i] = new XZSlide({
            cover: sliders1.eq(i).find(".slider-wraper"),
            container: sliders1.eq(i).find(".slider-container"),
            speed: 300,
            auto: true,
            resp: true,
            itemselector: '.slider-item',
            indicator: sliders1.eq(i).find(".slider-indicator"),
            nextBtn: sliders1.eq(i).find(".next"),
            prevBtn: sliders1.eq(i).find(".prev")
        });
    }
    tabs($('.hotproject ul').find('li'), $('.hotproject .project-block'));
    // Classic case
    var slide2 = new XZSlide({
        cover: $(".classicCase .slider-wraper"),
        container: $(".classicCase .slider-container"),
        speed: 300,
        auto: true,
        resp: true,
        itemselector: '.slider-item',
        indicator: $(".classicCase .slider-indicator")
    });
    // environmentdisplay
    var slide3 = new XZSlide({
        cover: $(".environmentdisplay .slider-wraper"),
        container: $(".environmentdisplay ul"),
        speed: 300,
        auto: true,
        resp: true,
        itemselector: '.slider-item',
        nextBtn: $(".environmentdisplay .next"),
        prevBtn: $(".environmentdisplay .prev")
    });

    // presscenter
    var slide4 = new XZSlide({
        cover: $(".presscenter .slider-wraper"),
        container: $(".presscenter .slider-container"),
        speed: 300,
        auto: true,
        resp: true,
        itemselector: 'li',
        indicator: $(".presscenter .slider-indicator")
    });

    // Award
    var slide5 = new XZSlide({
        cover: $(".award .slider-wraper"),
        container: $(".award .slider-container"),
        speed: 300,
        auto: true,
        resp: true,
        itemselector: 'li',
        indicator: $(".award .slider-indicator")
    });

    //Public benefit activities
    var slide6 = new XZSlide({
        cover: $(".benefitactivities .slider-wraper"),
        container: $(".benefitactivities .slider-container"),
        speed: 300,
        auto: true,
        resp: true,
        itemselector: '.slider-item',
        nextBtn: $(".benefitactivities .next"),
        prevBtn: $(".benefitactivities .prev")
    });

    //beauty skin care
    var slide7 = new XZSlide({
        cover: $(".beautyskin .slider-wraper"),
        container: $(".beautyskin .slider-container"),
        speed: 300,
        auto: true,
        resp: true,
        itemselector: '.slider-item',
        indicator: $(".beautyskin .slider-indicator")
    });

    //shop

    var sliders2 = $(".shops .block");

    var sliders2arr = [];
    for (var i2 = 0, len2 = sliders2.length; i2 < len2; i2++) {
        sliders2arr[i2] = new XZSlide({
            cover: sliders2.eq(i2).find(".slider-wraper"),
            container: sliders2.eq(i2).find(".slider-container"),
            speed: 300,
            auto: true,
            resp: true,
            itemselector: '.slider-item',
            indicator: sliders2.eq(i2).find(".slider-indicator"),
            nextBtn: sliders2.eq(i2).find(".next"),
            prevBtn: sliders2.eq(i2).find(".prev")
        });
    }
    //美容分院部分
    tabs($('.shops .g-left').find('li'), $('.shops .block'));
    //默认显示第一个分院
    sliders2.eq(0).addClass('active').siblings().removeClass('active');
    $('.shops .g-left').find('li').eq(0).addClass('active').siblings().removeClass('active');
            function hiddBody(){
              $("body").css("overflow-y","hidden")
            }
             function showBody(){
              $("body").css("overflow-y","visible")
            }
    var sliders3 = $(".environmentalImgs .block");
    var sliders3arr = [];
    for (var i3 = 0, len3 = sliders3.length; i3 < len3; i3++) {
        sliders3arr[i3] = new XZSlide({
            cover: sliders3.eq(i3).find(".slider-wraper"),
            container: sliders3.eq(i3).find(".slider-container"),
            speed: 300,
            auto: true,
            resp: true,
            itemselector: '.slider-item',
            indicator: sliders3.eq(i3).find(".slider-indicator"),
        });
    }
    //casesImgs
    $('.cases .g-left li').click(function(e) {
        $('.cases .g-left li.active').removeClass('active');
        var index = $(this).data('id');
        $(this).addClass('active');
        $('.cases .block.active').removeClass('active');
        $('.cases .block' + index).addClass('active');

        $('.casesImgs .block.active').removeClass('active');
        $('.casesImgs .block' + index).addClass('active');

    });

    var sliders4 = $(".casesImgs .block");
    var sliders4arr = [];
    for (var i4 = 0, len4 = sliders4.length; i4 < len4; i4++) {
        sliders4arr[i4] = new XZSlide({
            cover: sliders4.eq(i4).find(".slider-wraper"),
            container: sliders4.eq(i4).find(".slider-container"),
            speed: 300,
            auto: true,
            resp: true,
            itemselector: '.slider-item',
            indicator: sliders4.eq(i4).find(".slider-indicator"),
        });
    }
    $('.cases .item').click(function() {
        $('.fullscreen').addClass('show');
        $('.header ').removeClass('fixed');
        $('.fullscreen .close').click(function() {

            $('.fullscreen').removeClass('show');
            $('.header ').addClass('fixed');
            showBody();
        })
    });
    function hiddBody(){
              $("body").css("overflow-y","hidden")
             }
             function showBody(){
              $("body").css("overflow-y","visible")
    }
    // developmenthistory
    var widthLen = window.fontreset * 42.46;
    var currLen = 0;
    var stop = false;
    var timer = null;
    var margueeTarget = $('.developmenthistory .slider-wraper');
    var marqueeTargetFun = function() {
        currLen++;
        if (currLen > widthLen) {
            margueeTarget.css({ 'left': 0 });
            currLen = 0;
        } else {
            margueeTarget.css({ 'left': -currLen });
        }
        if (window.requestAnimationFrame && !stop) {
            requestAnimationFrame(marqueeTargetFun);
        } else if (!window.requestAnimationFrame && timer == null) {
            timer = setInterval(marqueeTargetFun, 20);
        }
    };

    margueeTarget.hover(function() {
        if (window.requestAnimationFrame) {
            stop = true;
        } else {

            clearTimeout(timer);
        }
    }, function() {
        if (window.requestAnimationFrame) {
            stop = false;
            marqueeTargetFun()
        } else {

            setInterval(marqueeTargetFun, 20)
        }
    });
    marqueeTargetFun();

    //project.html
    function projectPageCustom() {
        var url = window.location.href;
        if (url.indexOf('project') >= 0) {
            lightNavCustom();
            addScrollToDo();
        }
    }
    projectPageCustom();

}
function lightNav() {
    var url = window.location.href;
    var paths = url.split("/");
    var lastpath1 = paths[paths.length - 1].split("#")[0] || "";
    var lastpath2 = paths[paths.length - 1].split("#")[1] || "";
    var targetNav = $('.header li');

    targetNav.each(function(e, i, a) {
        var href = $(this).find("a").attr("href");
        if (lastpath2 !== "") {

            if (href.indexOf(lastpath2) >= 0) {
                // $(this).addClass("active").siblings().removeClass("active");
                $(this).addClass("active").siblings().removeClass("active");
                $('.header').addClass('fixed');

            }
        } else if (lastpath1) {
            if (href.indexOf(lastpath1) >= 0) {
                $(this).addClass("active").siblings().removeClass("active");
            }
        }
    });

}
function lightNavCustom() {
    var targetNav = $('.header li');
    targetNav.click(function() {
        $(this).addClass("active").siblings().removeClass("active");
    });
}
function addScrollToDo() {
    var targetNav = $('.header li');
    var scrolldo = new ScrollToDo();

    scrolldo.add("#beautyspa", function() {
        targetNav.eq(3).addClass("active").siblings().removeClass("active");

    });
    scrolldo.add("#optoelectronic", function() {
        targetNav.eq(4).addClass("active").siblings().removeClass("active");
    });
    scrolldo.add("#embroidery", function() {
        targetNav.eq(5).addClass("active").siblings().removeClass("active");
    });
    scrolldo.add("#beautyskin", function() {
        targetNav.eq(6).addClass("active").siblings().removeClass("active");
    });
}
//all page
function fixnav() {
    var targetNav = $('.header');
    var scrolldo = new ScrollToDo();
    scrolldo.add(910, function() {
        targetNav.addClass('fixed');
        targetNav.fadeIn('slow');
    });

    scrolldo.add(810, function() {
        targetNav.removeClass('fixed');

    })
}
 // topbanner
function topbanner(argument) {
    var slide1 = new XZSlide({
        cover: $(".top-banner .slider-wraper"),
        container: $(".top-banner .slider-container"),
        speed: 500000,
        itemWidth:1920,
         autoplay: {
                delay: 500000,
                disableOnInteraction: false,
              },
        itemselector: '.slider-item',
        indicator: $(".top-banner .slider-indicator")
    });
}

// tag列表页导航栏不需要高亮显示prompt()
function nav(){
    var obj = null;
    var As = document.getElementById('nav').getElementsByTagName('a');
    for (i = 0; i < As.length; i++) {
        if (window.location.href.indexOf(As[i].href) >= 0) {
            obj = As[i];
        }
    }
    obj.parentNode.className = 'active';
}
// 处理流程内容为空,移除对应流程
function setpNull(obj){
 var len=$(obj).length;
 if(len>4){
  for(var i=0;i<len;i++){
        var liOb=$(obj).eq(i);
        var pVal=liOb.find("p").text();
        if(pVal==""){
              var liIndex=liOb.index();
              $(obj).eq(liIndex).remove();
              setp4(obj,4);
        }
    }
 }
 function setp4(obj,num){
     var len=$(obj).length;
     if(len<=num){
        $(obj).css("display","block");
        $(obj).eq(1).css("float","inherit");
        $(".process .g-left .step ul").css("width","100%");
    }
}
}
// 设备详情页的设备展示模块
function equipShow(){
      var environmentLi=$(".environmentaldisplay .g-left ol li");
      var environmentLen=$(".environmentaldisplay .g-left ol li").length;
       var content=[];
      for(i=0;i<environmentLen;i++){
           content.push(environmentLi.eq(i).text());
      }
      var swiper = new Swiper('.environmentaldisplay .swiper-container', {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      pagination: {
        el: '.environmentaldisplay ul',
        clickable: true,
        renderBullet: function (index, className) {
             return '<li class="'+className+'"><span>'+ content[index] + '</span></li>';
        }
      },
      navigation: {
        nextEl: '.environmentaldisplay .swiper-container .next',
        prevEl: '.environmentaldisplay .swiper-container .prev',
      }
   });
}
// 设备详情页的设备展示模块
function chainBShow(){
      var swiper = new Swiper('.environmentalImgs .swiper-container', {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
    autoObj(swiper);
}
 function autoObj(obj){
         $('.environmental .item img').bind("click",function(){
             var environmentalLen=$(".environmental_full").length;
             autoStopEN(obj,environmentalLen);
             var index=parseInt($(this).index())+1;
             slideToFrom(obj,index,environmentalLen);
         })
}
      // 开始暂停循环
        function autoStopEN(obj,environmentalLen){
               for(var i=0;i<environmentalLen;i++){
                    obj[0].autoplay.stop();
           }
        }
        function slideToFrom(caseSix,index_Sw,environmentalLen) {
                for(var i=0;i<environmentalLen;i++){
                     caseSix[i].slideTo(index_Sw);
                }
        }

function award(){
      //荣誉证书模块轮播图
      var swiperMy = new Swiper('.swiper-container_award', {
                               slidesPerView: 4,
                               slidesPerColumn: 2,
                               slidesPerGroup : 4,
                               spaceBetween:0,
                               swiperloop: true,
                               autoplay:true,
                               pagination: {
                                el: '.swiper-pagination',
                                clickable: true,
                              },
    });
}
function beautyskin(){
      //美妆护肤模块轮播图
      var swiperMy = new Swiper('.swiper-container_beautyskin', {
                               slidesPerView: 4,
                               slidesPerColumn: 2,
                               slidesPerGroup : 4,
                               spaceBetween:0,
                               swiperloop: true,
                               autoplay:true,
                               pagination: {
                                el: '.swiper-pagination',
                                clickable: true,
                              },
      });
}
function SUActivityFN(){
      var benefitactivities=$(".benefitactivities .g-left ol li");//获取li元素
      var benefitactivitiesLen=benefitactivities.length;//获取li的长度
      var arr= new Array();//创建一个数组
      for(i=0;i<benefitactivitiesLen;i++){
            arr[i] = new Array();//创建多维数组
            var a1=benefitactivities.eq(i).text().split("&")[0];//分割标题
            var a2=benefitactivities.eq(i).text().split("&")[1];//分割链接
            arr[i][0]=a1;
            arr[i][1]=a2;
      }
      var swiper_benefitactivities= new Swiper('.benefitactivities-container', {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
        autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.benefitactivities ul',
        clickable: true,
        renderBullet: function (index, className) {
             return '<li class="'+className+'"><a href="'+arr[index][1]+'" target="_blank">'+ arr[index][0] + '<span>【详情】</span></a></li>';
        }
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
}
function  list_case_sw(){
      // 开始循环
            function autoStart(obj){
               obj.autoplay.start();
            }
             // 开始暂停循环
            function autoStop(obj){
               obj.autoplay.stop();
            }
       // 案例轮播图需要
       var content=['面部护理','纹绣(眉，唇)'];
       var swiperMy_List = new Swiper('.case_list_swiper', {
             slidesPerView: 3,
             slidesPerColumn: 2,
             slidesPerGroup : 3,
             spaceBetween:30,
             autoplay:true,
             pagination: {
             el: '.cases_list ul',
             clickable: true,
              renderBullet: function (index, className) {
               return '<li class="'+className+'"><span>'+ content[index] + '</span></li>';
            }
            },
             navigation: {
             nextEl: '.next',
             prevEl: '.prev',
            },
        });
        $('.fullscreen_list .close').click(function() {
            showBody();
            autoStart(swiperMy_List);
            $('.fullscreen').removeClass('show');
            $('.header').addClass('fixed');
        });
        case_list_full(".cases_list .g-right .swiper-slide");
        function case_list_full(clickObj){
            // 案例列表页点击案例切换大图
            $(clickObj).click(function() {
                // 案例轮播停止
                autoStop(swiperMy_List);

                var index_Sw = parseInt($(this).index());
                if (index_Sw >= 0 && index_Sw <= 5) {
                    fullReShow('fullscreen');
                    $('.fullscreen').eq(0).addClass('show');
                    slideToFrom(case_list_full_sw1,index_Sw);
                } else if (index_Sw >= 6 && index_Sw <= 11) {
                    fullReShow('fullscreen');
                    $('.fullscreen').eq(1).addClass('show');
                    index_Sw=index_Sw%6;
                    slideToFrom(case_list_full_sw2,index_Sw);
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

                  function hiddBody(){
                  $("body").css("overflow-y","hidden")
                 }
                 function showBody(){
                  $("body").css("overflow-y","visible")
                }
            });
             // 案例列表页点击显示的面部护理大图
            var case_list_full_sw1= new Swiper('.case_list_full_sw1', {
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
             // 案例列表页点击显示的纹绣(眉，唇)大图
            var case_list_full_sw2= new Swiper('.case_list_full_sw2', {
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
        }
}
function swiper_slide_hover(obj){
     $(obj).hover(function() {
             $(this).find(".front").fadeIn();
        }, function() {
            $(this).find(".front").fadeOut();
     });
}
// 检查是否已经跳转到项目列表页
function checkProHrefM(){
       $(".header .nav a").click(function(){
            var ELval=window.location.href.split("#")[1];
               var obj=$(this);
                 if(ELval=="beautyspa"||ELval=="optoelectronic"||ELval=="embroidery"||ELval=="beautyskin"){

                   var hrefMap=obj.prop("href").split("#")[1];
                     // if(currHref.indexOf("/project")>0){
                    if(hrefMap=="beautyspa"){
                        // 美容SPA
                             var beautyspaTopVal=$('#beautyspa').offset().top;
                             sTop(beautyspaTopVal,obj);
                    }else if(hrefMap=="optoelectronic"){
                       //光电美肤
                              var optoelectronicTopVal=$('#optoelectronic').offset().top;
                              sTop(optoelectronicTopVal,obj)
                    }else if(hrefMap=="embroidery"){
                        //艺术纹绣
                                 var embroideryTopVal=$('#embroidery').offset().top;
                                 sTop(embroideryTopVal,obj);
                    }else if(hrefMap=="beautyskin"){
                             //美妆护肤
                                 var beautyskinTopVal=$('#beautyskin').offset().top;
                                 sTop(beautyskinTopVal,obj);

                    }
                }

        })
}
function topBannerFn(){
     var swiper_banner = new Swiper('.top-banner .bannerswiper-wrapper', {
          slidesPerView: 1,
          spaceBetween: 30,
          autoplay:5000,
          loop: true,
          pagination: {
            el: '.slider-indicator',
            clickable: true,
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
          on: {
            slideChangeTransitionStart: function(){
              // alert(this.activeIndex);
              var num=(this.realIndex)+1;
              animateBanner(num);
            },
          },
         });
    console.log(swiper_banner);
// 留联
        function animateBanner(num){
            $('.bannerswiper-wrapper .swiper-slide').find(".textimgFont").fadeOut();
            $('.bannerswiper-wrapper .swiper-slide').find(".textimgFont img").fadeOut();
            $('.bannerswiper-wrapper .swiper-slide').find(".textimgFont p").fadeOut();
            $('.bannerswiper-wrapper .swiper-slide').find(".textimgFont a").fadeOut();
            $('.bannerswiper-wrapper .swiper-slide').find(".textimgFont span").fadeOut();
            $('.bannerswiper-wrapper .swiper-slide').find(".textimg").css({"opacity":"0","right":"-400px"});
                setTimeout(function(){
                  t(num);
               },100)
            }
               function t(num){
                         $('.bannerswiper-wrapper .swiper-slide').eq(num).find(".textimg").css({"opacity":"1","right":"-400px"});
                         $('.bannerswiper-wrapper .swiper-slide').eq(num).find(".textimg").animate(
                            {
                               right:"0"
                               // opacity :1,
                            },
                            {
                              duration: 1000,
                              easing: "easeInCirc",
                              complete:function(){
                                   // $(".textimgFont").eq(num).fadeOut();
                                    setTimeout(function(){
                                       $('.bannerswiper-wrapper .swiper-slide').eq(num).find(".textimgFont").fadeIn(700);
                                       $('.bannerswiper-wrapper .swiper-slide').eq(num).find(".textimgFont img").fadeIn(700);
                                       $('.bannerswiper-wrapper .swiper-slide').eq(num).find(".textimgFont span").fadeIn(700);
                                       $('.bannerswiper-wrapper .swiper-slide').eq(num).find(".textimgFont p").fadeIn(700);

                                       for(var i=1;i<$('.bannerswiper-wrapper .swiper-slide').length-2;i++){
                                              if(i!=num){
                                                     $('.bannerswiper-wrapper .swiper-slide').eq(i).find(".textimgFont").fadeOut();
                                                     $('.bannerswiper-wrapper .swiper-slide').eq(i).find(".textimgFont img").fadeOut();
                                                     $('.bannerswiper-wrapper .swiper-slide').eq(i).find(".textimgFont span").fadeOut();
                                                     $('.bannerswiper-wrapper.swiper-slide').eq(i).find(".textimgFont p").fadeOut();
                                              }
                                       }

                                   },900)
                             }
                            }
                       )
               }

}
function Senvironmental(){
    $('.environmental .g-left li').eq(0).addClass('active');
    $('.environmental .item').eq(0).addClass('active');
    var k=0;
    $(".item:eq("+k+")>img").each(function(index,value){
        $(value).attr('src',$(value).data("src"));
    });
    $('.environmental .g-left li').click(function(e) {
        $('.environmental .g-left li.active').removeClass('active');
        var index=$(".environmental .g-left").find("li").index($(this));
        $(this).addClass('active');
        $('.environmental .item.active').removeClass('active');
        $('.environmental .item').eq(index).addClass('active');
        $('.environmentalImgs .block.active').removeClass('active');
        $('.environmentalImgs .block').eq(index).addClass('active');
        $(".item:eq("+index+")>img").each(function(index,value){
            $(value).attr('src',$(value).data("src"));
        });
    });
}
 function sTop(objTop,obj){
       var hrefCon=["project.html/#beautyspa","project.html/#optoelectronic","project.html/#embroidery","project.html/#beautyskin"];
       for(var i=0;i<4;i++){
        var res=i+3;
         $(".header .nav li").eq(res).find("a").prop("href",hrefCon[i]);
       }
       obj.attr("href","javascript:;");
        // alert("ss");
        $("html,body").scrollTop(objTop);

         return false;
    }

$(function() {
    function BigSenvironmental(){
        // 环境详情页点击小图出现大图
        $('.environmental .item').click(function() {
            var index=$(this).index();
            // $('.fullscreen').hide();
            $('.fullscreen').eq(index).addClass('show');
            $('.header ').removeClass('fixed');
            hiddBody();
            tool.showEach(".environmental_full",index);
            $('.fullscreen .close').click(function() {
                $('.header ').addClass('fixed');
                $('.fullscreen').removeClass('show');
                showBody();
            })
        });
    }
    function showEmbroideryLS(){
        // 鼠标经过切换
        function tabsHov(tabIndex, tab) {
            $('#beautyspa').find('li').eq(0).addClass('active');
            tool.showThis($('#beautyspa').find('li').eq(0),"img");
            $('#optoelectronic').find('li').eq(0).addClass('active');
            tool.showThis($('#optoelectronic').find('li').eq(0),"img");
            $('#embroidery').find('li').eq(0).addClass('active');
            tool.showThis($('#embroidery').find('li').eq(0),"img");
            tabIndex.click(function(e) {
                var index = $(this).index();
                if (tab && tab.find('li')) {
                    tab.find('li').removeClass('active');
                }
                $(this).addClass('active').siblings().removeClass('active');
                if (tab) {
                    tab.eq(index).addClass('active').siblings().removeClass('active');
                }
                tool.showThis($(this),"img");
            });
        }
        tabsHov($('#beautyspa').find('li'), $('#beautyspa ul'));
        tabsHov($('#optoelectronic').find('li'), $('#optoelectronic ul'));
        tabsHov($('#embroidery').find('li'), $('#embroidery ul'));
    }
    //进入到项目列表页，懒加载第一张图片
    function showEmMore(){
        var lazyLoad = (function(){
            var clock;
            function init(){
                $(window).on("scroll", function(){
                    if (clock) {
                        clearTimeout(clock);
                    }
                    clock = setTimeout(function(){
                        checkShow();
                    }, 200);
                });
                checkShow();
            }
            function checkShow(){
                var eachObj="$(#optoelectronic li).eq(0).find(img)";
                    eachObj.each(function(){
                    var $cur =$(this);
                    if($cur.attr('isLoaded')){
                        return;
                    }
                    if(shouldShow($cur)){
                        showImg($cur);
                    }
                })
            }
            function shouldShow($node){
                var scrollH = $(window).scrollTop(),
                    winH = $(window).height(),
                    top = $node.offset().top;
                if(top < winH + scrollH){
                    return true;
                }else{
                    return false;
                }
            }
            function showImg($node){
                $node.attr('src', $node.attr('data-img'));
                $node.attr('isLoaded', true);
            }
            return {
                init: init
            }
        })();
        lazyLoad.init();
    }
    // 包含快商通链接
    var tool={
         // 快商通链接跳转
                   kst:function(){
                        $(".j-consult").bind("click",function(){
                            // var href="https://hztk5.kuaishang.cn/bs/im.htm?cas=56596___868330&fi=65110";
                             var href="https://www.hoozonspa.com/kst.html";
                            window.open(href,"_blank");
                        })
                    },
                    SUActivity:function(){
                          SUActivityFN();
                    },
                    list_case:function(){
                         list_case_sw();
                    },
                    checkProHref:function(){
                       checkProHrefM();
                    },
                    topBannerObj:function(){
                        // 顶部banner轮播
                        topBannerFn();
                    },
                    showEnvironmental:function(){
                        //分院环境click事件
                        Senvironmental();
                    },
                    showRightEnvironmental:function(){
                        //分院环境click事件出现大图
                        BigSenvironmental();
                    },
                    showEach:function(obj,index){
                        //对应下标遍历下标对应添加src
                        $(obj+":eq("+index+") img").each(function(index,value){
                            $(value).attr('src',$(value).data("src"));
                        });
                    },
                    showThis:function(obj,dom){
                        obj.find(dom).each(function(index,value){
                            $(value).attr('src',$(value).data("src"));
                        });
                    },
                    showEmbroideryL:function(){
                        showEmbroideryLS();
                    },
                   showEm:function(){
                       showEmMore();
                   }
                };
    tool.kst();
    // topbanner();
    lightNav();
    fixnav();
    setTimeout(initSlider, 2000);
    nav();
    setpNull(".process ul li");
    // 设备详情页的设备展示模块
    equipShow();
    //环境详情页大图切换效果
    chainBShow();
    // 品牌页面荣誉证书
     award();
    // 美妆护肤
     beautyskin();
     tool.SUActivity();//调用公益活动swiper
     tool.list_case();//调用案例列表页案例轮播图
     swiper_slide_hover(".cases_list .g-right .swiper-slide");
     tool.checkProHref();//调用判断如果在列表页，不重复跳转
     tool.topBannerObj();//顶部banner轮播
     tool.showEnvironmental();//环境分院展示
     tool.showRightEnvironmental();//环境分院click出现大图
     tool.showEmbroideryL();//项目列表页click显示对应图片
     //tool.showEm();//项目列表页进入视图
     //全站跳转维护页面
        widows.location.href="https://www.hoozonspa.com/";
});

// 增加PC端公告

$(document).ready( function(){
    // 隐藏专题案例，加类名 zt_case
    $(".zt_case").hide();
    //$( '#howdy' ).howdyDo({
    //    action      : 'hover',
    //    effect      : 'slide',
    //    easing      : 'easeInOutExpo',
    //    duration    : 600,
    //    openAnchor  : '<img src="/static/images/down-arr-16x16.png" border=0 />',
    //    closeAnchor : '<img src="/static/images/close-16x16.png" border=0 />'
    //});
});


//google quicklink
//https://github.com/GoogleChromeLabs/quicklink
!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?module.exports=n():"function"==typeof define&&define.amd?define(n):e.quicklink=n()}(this,function(){var e={};function n(e){return new Promise(function(n,t){var r=new XMLHttpRequest;r.open("GET",e,r.withCredentials=!0),r.onload=function(){200===r.status?n():t()},r.send()})}var t,r,i=(t="prefetch",((r=document.createElement("link")).relList||{}).supports&&r.relList.supports(t)?function(e){return new Promise(function(n,t){var r=document.createElement("link");r.rel="prefetch",r.href=e,r.onload=n,r.onerror=t,document.head.appendChild(r)})}:n);function o(t,r,o){if(!(e[t]||(o=navigator.connection)&&((o.effectiveType||"").includes("2g")||o.saveData)))return(r?function(e){return null==self.fetch?n(e):fetch(e,{credentials:"include"})}:i)(t).then(function(){e[t]=!0})}var u=u||function(e){var n=Date.now();return setTimeout(function(){e({didTimeout:!1,timeRemaining:function(){return Math.max(0,50-(Date.now()-n))}})},1)},c=new Set,f=new IntersectionObserver(function(e){e.forEach(function(e){if(e.isIntersecting){var n=e.target.href;c.has(n)&&a(n)}})});function a(e){c.delete(e),o(new URL(e,location.href).toString(),f.priority)}return function(e){e=Object.assign({timeout:2e3,priority:!1,timeoutFn:u,el:document},e),f.priority=e.priority;var n=e.origins||[location.hostname],t=e.ignores||[];e.timeoutFn(function(){e.urls?e.urls.forEach(a):Array.from(e.el.querySelectorAll("a"),function(e){f.observe(e),n.length&&!n.includes(e.hostname)||function e(n,t){return Array.isArray(t)?t.some(function(t){return e(n,t)}):(t.test||t).call(t,n.href,n)}(e,t)||c.add(e.href)})},{timeout:e.timeout})}});

window.addEventListener('load', () =>{
   quicklink({
       priority:true,
           origins:[
                'www.hoozonspa.com',
                'm.hoozonspa.com',
                '3gimg.qq.com'
       ]
   });
});




//注册  serviceWorker
if('serviceWorker'in navigator){navigator.serviceWorker.register('/serviceworker.js');}


//显示service worker缓存占用情况
if ('storage' in navigator && 'estimate' in navigator.storage) {
  navigator.storage.estimate().then(estimate => {
    console.log(`Using ${estimate.usage/1024/1024} out of ${estimate.quota/1024/1024} MB.And the proportion is ${estimate.usage/estimate.quota*100}%`);
  });
}
