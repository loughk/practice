// 模块的return等于传参,传参顺序跟[模块]一样。
// 在config.js中配置了common的依赖模块为[jquery,footer],这里直接加载common就可以了。
requirejs(['common'],function(cm){
    jQuery(function($){
        var $bannerLi = $('.banner li');
        var imgNum = $bannerLi.length;
        var timer;
        var idx = 0;

        $bannerLi.eq(idx).css({'display':'list-item'});
        $bannerLi.eq(idx).animate({'width':1920,'height':500},1000);
        
        timer = setInterval(function(){
            move();
        },1500);

        function move(){
            if(idx < imgNum){
                $bannerLi.eq(idx).css({'display':'none','width':2880,'height':750});
                $bannerLi.eq(idx+1).css({'display':'list-item'});
                $bannerLi.eq(idx+1).animate({'width':1920,'height':500},1000);
                idx++;
            }
            else{
                $bannerLi.eq(idx).css({'display':'none','width':2880,'height':750});
                $bannerLi.eq(0).css({'display':'list-item'});
                $bannerLi.eq(0).animate({'width':1920,'height':500},1000);
                idx = 0;
            }
        }
    });
});
