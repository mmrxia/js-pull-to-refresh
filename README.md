# pull-to-refresh
js实现移动端下拉刷新或加载功能，兼容jQuery和Zepto

#使用方法示例：


```javascript
  var $target = $('.dropload');
  $target.pullToRefresh().on("pull-to-refresh", function () {
    //do ajax...
    var timer = setTimeout(function () {
        clearTimeout(timer);
        $target.pullToRefreshDone();
    }, 500);
  });
```

#演示地址
https://rawgit.com/mmrxia/js-pull-to-refresh/master/demo.html
