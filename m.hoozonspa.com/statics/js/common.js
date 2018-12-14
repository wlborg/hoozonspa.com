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
}

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

function initSlider() {

    // Classic case
    var slide1 = new XZSlide({
        cover: $(".award .slider-wraper"),
        container: $(".award .slider-container"),
        speed: 300,
        auto: true,
        resp: true,
        itemselector: '.slider-item',
        indicator: $(".award .slider-indicator")
    });
    var slide2 = new XZSlide({
        cover: $(".benefitactivities .slider-wraper"),
        container: $(".benefitactivities .slider-container"),
        speed: 300,
        auto: true,
        resp: true,
        itemselector: '.slider-item',
        nextBtn: $(".benefitactivities .next"),
        prevBtn: $(".benefitactivities .prev")
    });
    // var slide3 = new XZSlide({
    //     cover: $(".hotproject .slider-wraper"),
    //     container: $(".hotproject .slider-container"),
    //     speed: 300,
    //     auto: true,
    //     resp: true,
    //     itemselector: '.slider-item',
    //     nextBtn: $(".hotproject .next"),
    //     prevBtn: $(".hotproject .prev")
    // });
    var slide4 = new XZSlide({
        cover: $(".environmentdisplay .slider-wraper"),
        container: $(".environmentdisplay .slider-container"),
        speed: 300,
        auto: true,
        resp: true,
        itemselector: '.slider-item',
        nextBtn: $(".environmentdisplay .next"),
        prevBtn: $(".environmentdisplay .prev")
    });
    var slide5 = new XZSlide({
        cover: $(".shopslider .slider-wraper"),
        container: $(".shopslider .slider-container"),
        speed: 300,
        auto: true,
        resp: true,
        itemselector: '.slider-item',
        indicator: $(".shopslider .slider-indicator")
    });
    var slide6 = new XZSlide({
        cover: $(".environmental .slider-wraper"),
        container: $(".environmental .slider-container"),
        speed: 300,
        auto: true,
        resp: true,
        itemselector: '.slider-item',
        indicator: $(".environmental .slider-indicator")
    });



    //首页案例
    $('.classiccase .item').click(function() {
        $('.classiccase .item.active').removeClass('active');
        $(this).addClass('active');
    });
    //首页设备
    $('.equipmenttechnology .item').click(function() {

        $(this).addClass('active').siblings().removeClass('active');
    });
    //连锁店
    $('#chain-full li h4').click(function() {
        $('#chain-full li h4.active').removeClass('active');
        $(this).addClass('active');
    });

    //案例列表页
    if ($('.casenav')) {
        var navuls = $('.casenav ul');
        var count = navuls.length;
        var num = 1;
        // alert(count);

        $('.casenav .btn').click(function() {
            if (num < count) {

                navuls.eq(num).addClass('active').siblings().removeClass('active');
                num++;
            } else {
                num = 0;
                navuls.eq(num).addClass('active').siblings().removeClass('active');
                num++;
            }
        })
    }
}


// topbanner
function topbanner(argument) {

    var slide1 = new XZSlide({
        cover: $(".top-banner .slider-wraper"),
        container: $(".top-banner .slider-container"),
        speed: 500,
        auto: true,
        resp: true,
        figure: true,
        itemselector: '.slider-item',
        indicator: $(".top-banner .slider-indicator")
    });
}
// developmenthistory
function brandhistory() {
    if (!$('.developmenthistory')) return;
    var widthLen = $('.developmenthistory .slider-wraper').width() / 2;
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
    var startX;
    var startY;
    margueeTarget.on("touchstart", function(e) {
        startX = e.originalEvent.changedTouches[0].pageX;
        if (window.requestAnimationFrame) {
            stop = true;
        } else {

            clearTimeout(timer);
        }
    });

    margueeTarget.on("touchend", function(e) {
        var moveEndX = e.originalEvent.changedTouches[0].pageX,
            X = moveEndX - startX;
        currLen = currLen - X;

        margueeTarget.animate({ 'left': -currLen }, 300);

        setTimeout(function() {
            if (window.requestAnimationFrame) {
                stop = false;
                marqueeTargetFun()
            } else {

                setInterval(marqueeTargetFun, 20)
            }
        }, 300);

    });

    marqueeTargetFun();
}
// 案列页导航高亮
function caseListNavHightlight() {
    if (!$('.casenav')) return;
    var href = window.location.href;

    $('.casenav').find("li").each(function() {
        var targetHref = $(this).find("a").attr("href");
        if (href.indexOf(targetHref) >= 0) {

            $(this).addClass("active");

            $('.casenav ul.active').removeClass('active');
            $(this).parent().addClass('active');
        }
    });
}
//底部导航高亮
function footerNavHightlight() {
    if (!$('#footer')) return;
    var href = window.location.href;

    $('#footer').find("a").each(function() {
        var targetHref = $(this).attr("href");
        if (href.indexOf(targetHref) >= 0) {
            $(this).addClass("active").siblings().removeClass('active');
        }
    });
}
function headerBtnClick() {
    $('#header .btn').click(function() {
        $('#header').toggleClass('open');
    });
}

function bindConsultHref() {
    //专题快商通
    var consultEs = $('.j-consult');
    //专题内容区快商通链接总数
    var linkCount = consultEs.length;
    if (linkCount > 0) {
        //给每个咨询元素绑定单击事件
        consultEs.each(function(index) {
            $(this).on('click', function() {
                var href = "https://hztk5.kuaishang.cn/bs/im.htm?cas=56596___868330&fi=65110&ism=1";
                window.location.href = href;
            })
        });
    } else {
        console.log('若专题中需要咨询按钮请给元素添加"j-consult"类以激活');
    }
}

function addScript(src) {
    var bldyE = document.getElementsByTagName("body");
    var scriptE = document.createElement("script");
    scriptE.setAttribute("type", "text/javascript");
    scriptE.setAttribute("src", src);
    if (bldyE.length) {
        bldyE[0].appendChild(scriptE);
    } else {
        document.documentElement.appendChild(scriptE);
    }
}
function div19Add(){
     var timer = null
            //  检查dom是否执行完成
        function check() {
            var dom = document.getElementById('div19')
            if(dom) {
                  $("#div19").addClass('j-consult');
                  $("#div19").addClass('div19');
                  // 点击稍后咨询按钮隐藏，12秒后出现
                 $(document).on("click",".div19",function(){
                    var href = "https://hztk5.kuaishang.cn/bs/im.htm?cas=56596___868330&fi=65110&ism=1";
                    window.location.href = href;
                     // TwShow();
                 });
                //  清除定时器
                if(!timer) {
                    clearTimeout(timer);

                }
            } else {
                //  自我调用
                timer = setTimeout(check, 0)
            }
        }
        //  首次执行
        check();
}
$(function() {
    topbanner();
    brandhistory();
    setTimeout(initSlider, 2000);
    caseListNavHightlight();
    footerNavHightlight();
    headerBtnClick();
    bindConsultHref();
    addScript("https://hztk5.kuaishang.cn/bs/ks.j?cI=868330&fI=65110&ism=1");
    div19Add();//给立即咨询框加自定义事件
});
