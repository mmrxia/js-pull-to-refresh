/*
 * 扩展方法
 * $.fn.
 * */
+function ($) {
    "use strict";

    $.support = (function() {
        var support = {
            touch: !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof window.DocumentTouch)
        };
        return support;
    })();

    $.touchEvents = {
        start: $.support.touch ? 'touchstart' : 'mousedown',
        move: $.support.touch ? 'touchmove' : 'mousemove',
        end: $.support.touch ? 'touchend' : 'mouseup'
    };

    $.getTouchPosition = function(e) {
        e = e.originalEvent || e;
        if(e.type === 'touchstart' || e.type === 'touchmove' || e.type === 'touchend') {
            return {
                x: e.targetTouches[0].pageX,
                y: e.targetTouches[0].pageY
            };
        } else {
            return {
                x: e.pageX,
                y: e.pageY
            };
        }
    };
}($);

/*
* Pull to refresh
* 使用方法示例：
* $('.dropload').pullToRefresh().on("pull-to-refresh", function () {
*   //do ajax...
*   $('.dropload').pullToRefreshDone();
* });
* */
+function ($) {
    "use strict";

    var PTR = function (el) {
        this.container = $(el);
        this.distance = 50;
        this.attachEvents();
    };

    PTR.prototype.touchStart = function (e) {
        if (this.container.hasClass("refreshing")) return;
        var p = $.getTouchPosition(e);
        this.start = p;
        this.diffX = this.diffY = 0;
    };

    PTR.prototype.touchMove = function (e) {
        if (this.container.hasClass("refreshing")) return;
        if (!this.start) return false;
        if (this.container.scrollTop() > 0) return;
        var p = $.getTouchPosition(e);
        this.diffX = p.x - this.start.x;
        this.diffY = p.y - this.start.y;
        if (this.diffY < 0) return;
        this.container.addClass("touching");
        e.preventDefault();
        e.stopPropagation();
        this.diffY = Math.pow(this.diffY, 0.8);
        this.statusArea.css("height", this.diffY);

        if (this.diffY < this.distance) {
            this.container.removeClass("pull-up").addClass("pull-down");
        } else {
            this.container.removeClass("pull-down").addClass("pull-up");
        }
        return false;
    };
    PTR.prototype.touchEnd = function () {
        this.start = false;
        if (this.diffY <= 0 || this.container.hasClass("refreshing")) return;
        this.container.removeClass("touching");
        this.container.removeClass("pull-down pull-up");

        if (Math.abs(this.diffY) <= this.distance) {
            this.statusArea.css("height", 0);
        } else {
            this.statusArea.css("height", 50);
            this.container.addClass("refreshing");
            this.container.trigger("pull-to-refresh");
        }
        return false;
    };

    PTR.prototype.attachEvents = function () {
        var el = this.container;
        el.addClass("dropload");

        var tpl = ['<div class="dropload-layer">', '<div class="inner">','<div class="arrow"></div>',
            '<div class="loader"></div>', '<div class="down">下拉刷新</div>',
            '<div class="up">释放刷新</div>', '<div class="refresh">正在刷新</div></div></div>'];
        this.statusArea = $(tpl.join('')).prependTo(el);

        el.on($.touchEvents.start, $.proxy(this.touchStart, this));
        el.on($.touchEvents.move, $.proxy(this.touchMove, this));
        el.on($.touchEvents.end, $.proxy(this.touchEnd, this));
    };

    var pullToRefresh = function (el) {
        new PTR(el);
    };

    var pullToRefreshDone = function (el) {
        $(el).removeClass("refreshing");
        $(el).find('.dropload-layer').css("height", 0);
    };

    $.fn.pullToRefresh = function () {
        return this.each(function () {
            pullToRefresh(this);
        });
    };

    $.fn.pullToRefreshDone = function () {
        return this.each(function () {
            pullToRefreshDone(this);
        });
    };

}($);