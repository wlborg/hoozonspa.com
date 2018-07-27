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
    tabs($('.shops .g-left').find('li'), $('.shops .block'));

    //Environmental Science
    //
    // tabs($('.environmental .g-left').find('li'), $('.environmental .item'));

    $('.environmental .g-left li').click(function(e) {
        $('.environmental .g-left li.active').removeClass('active');
        var index = $(this).data('id');
        $(this).addClass('active');
        $('.environmental .item.active').removeClass('active');
        $('.environmental .item' + index).addClass('active');

        $('.environmentalImgs .block.active').removeClass('active');
        $('.environmentalImgs .block' + index).addClass('active');

    });

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
    $('.environmental .item').click(function() {
        $('.fullscreen').addClass('show');

        $('.header ').removeClass('fixed');
        $('.fullscreen .close').click(function() {

            $('.header ').addClass('fixed');
            $('.fullscreen').removeClass('show');
        })
    });

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
        })
    });

    // Environmental display
    var sliders5 = $(".environmentaldisplay .block");
    var sliders5arr = [];
    for (var i5 = 0, len5 = sliders5.length; i5 < len5; i5++) {
        sliders5arr[i5] = new XZSlide({
            cover: sliders5.eq(i5).find(".slider-wraper"),
            container: sliders5.eq(i5).find(".slider-container"),
            speed: 300,
            auto: true,
            resp: true,
            itemselector: '.slider-item',
            nextBtn: sliders5.eq(i5).find(".next"),
            prevBtn: sliders5.eq(i5).find(".prev")
        });
    }
    tabs($('.environmentaldisplay ul').find('li'), $('.environmentaldisplay .block'));

    // developmenthistory
    var widthLen = window.fontreset * 34.2;
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
    tabs($('#beautyspa').find('li'), $('#beautyspa ul'));
    tabs($('#optoelectronic').find('li'), $('#optoelectronic ul'));
    tabs($('#embroidery').find('li'), $('#embroidery ul'));

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
        targetNav.eq(4).addClass("active").siblings().removeClass("active")
    });
    scrolldo.add("#embroidery", function() {
        targetNav.eq(5).addClass("active").siblings().removeClass("active")
    });
    scrolldo.add("#beautyskin", function() {
        targetNav.eq(6).addClass("active").siblings().removeClass("active")
    });
}
//all page
function fixnav() {
    var targetNav = $('.header');
    var scrolldo = new ScrollToDo();
    scrolldo.add(910, function() {
        targetNav.addClass('fixed');
        targetNav.fadeIn('slow');
    })

    scrolldo.add(810, function() {
        targetNav.removeClass('fixed');

    })
}
 // topbanner
function topbanner(argument) {

    var slide1 = new XZSlide({
        cover: $(".top-banner .slider-wraper"),
        container: $(".top-banner .slider-container"),
        speed: 500,
        itemWidth:1920,
        auto: true,
        itemselector: '.slider-item',
        indicator: $(".top-banner .slider-indicator")
    });
}
$(function() {
    topbanner();
    lightNav();
    fixnav();
    setTimeout(initSlider, 2000);
    // tag列表页导航栏不需要高亮显示prompt()
    var obj = null;
    var As = document.getElementById('nav').getElementsByTagName('a');
    for (i = 0; i < As.length; i++) {
        if (window.location.href.indexOf(As[i].href) >= 0) {
            obj = As[i];
        }
    }
    obj.parentNode.className = 'active';
});
