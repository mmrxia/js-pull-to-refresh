### pull-to-refresh
  
  `javascript`实现移动端下拉刷新或加载功能，兼容`jQuery`和`Zepto`。

###使用方法示例：

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

> 栗子中简单做了一层封装，这样没有设置下拉回调函数时也会有一个500ms加载的效果。

代码如下所示：

```javascript

 /*下拉刷新*/
 $.dropLoad = function (args) {
     var $target = $(args.container) || $('.dropload');
     $target[0] && $target.pullToRefresh().on("pull-to-refresh", function () {
         args.callback ? args.callback.call(this, $target) : (function () {
             var timer = setTimeout(function () {
                 clearTimeout(timer);
                 $target.pullToRefreshDone();
             }, 500);
         })()
     });
 };
 
 
 /*调用*/
 $.dropLoad({
     container: $("body"),
     callback: function (me) {
         setTimeout(function () {
             //do something... eg:ajax
             console.log('end');
 
             me.pullToRefreshDone();
         }, 1000);
     }
 });
   
```

### 演示地址

[点我查看演示](https://rawgit.com/mmrxia/js-pull-to-refresh/master/demo.html)

扫描下方二维码，手机上查看

![扫一扫](demo.png)

欢迎PR，看到后会第一时间回复。^_^
