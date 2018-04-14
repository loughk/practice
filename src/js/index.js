// 模块的return等于传参,传参顺序跟[模块]一样。
// 在config.js中配置了base的依赖模块为[jquery,footer,common],这里直接加载base就可以了。
requirejs(['common','base'],function(cm){
    jQuery(function($){
        var $banner = $('.banner');
        var $bannerLi = $('.banner li');
        var $bannerImg = $('.banner img');

        new Banner({
            '$bn':$banner,
            '$li':$bannerLi,
            '$img':$bannerImg
        });
        
        function Banner(opt){
            var defaults = {
                '$bn':{},
                '$li':{},
                '$img':{},
                'idx':0
            };
            opt = Object.assign({},defaults,opt);
            init(opt);

            function init(opt){
                opt.num = opt.$img.length;

                opt.$li.eq(opt.idx).css({'display':'block'});
                opt.$img.eq(opt.idx).css({'height':'120%'});
                opt.$img.eq(opt.idx).animate({'height':'100%'},6000);
                auto(opt);

                opt.$bn.on('mouseenter',function(){
                    clearInterval(opt.timer);
                });
                opt.$bn.on('mouseleave',function(){
                    auto(opt);
                });

                page(opt);
                pageOn(opt);
                direct(opt);
            };
            function move(opt){
                if(opt.idx < opt.num-1){
                    opt.$li.eq(opt.idx).css({'display':'none'});
                    opt.$img.eq(opt.idx).css({'height':'120%'});
                    opt.$li.eq(opt.idx+1).css({'display':'block'});
                    opt.$img.eq(opt.idx+1).css({'height':'120%'});
                    opt.$img.eq(opt.idx+1).animate({'height':'100%'},6000);
                    opt.idx++;
                }
                else{
                    opt.$li.eq(opt.idx).css({'display':'none'});
                    opt.$img.eq(opt.idx).css({'height':'120%'});
                    opt.$li.eq(0).css({'display':'block'});
                    opt.$img.eq(0).css({'height':'120%'});
                    opt.$img.eq(0).animate({'height':'100%'},6000);
                    opt.idx = 0;
                }
            };
            function auto(opt){
                opt.timer = setInterval(function(){
                    move(opt);
                    pageOn(opt);
                },7800);
            };
            function page(opt){
                opt.$page = $('<p></p>');
                opt.$page.addClass('banner-page clearfix');
                for(var i = 1;i <= opt.num;i++){
                    var $sp = $('<span></span>');
                    $sp.text(i);
                    opt.$page.append($sp);
                }
                opt.$bn.append(opt.$page);

                opt.$page.on('mouseenter','span',function(){
                    /*停止正在执行的动画。状态不会继续改变，要手动更改。*/ 
                    opt.$img.eq(opt.idx).stop();
                    opt.$li.eq(opt.idx).css({'display':'none'});
                    opt.$img.eq(opt.idx).css({'height':'120%'});

                    opt.idx = $(this).text()-1;
                    pageOn(opt);
                    opt.$li.eq(opt.idx).css({'display':'block'});
                    opt.$img.eq(opt.idx).css({'height':'120%'});
                    opt.$img.eq(opt.idx).animate({'height':'100%'},6000);
                });
            };
            function pageOn(opt){
                var $sp = opt.$page.find('span');
                $sp.map(function(){
                    if($(this).text()-1 == opt.idx){
                        $(this).addClass('banner-pageon');
                    }
                    else{
                        $(this).removeClass('banner-pageon');
                    }
                });
            };
            function direct(opt){
                var $pl = $('<p></p>');
                $pl.addClass('banner-direct banner-directL');
                opt.$bn.append($pl);
                $pl.on('click',function(){
                    opt.$img.eq(opt.idx).stop();
                    opt.$li.eq(opt.idx).css({'display':'none'});
                    opt.$img.eq(opt.idx).css({'height':'120%'});
                    if(opt.idx > 0){
                        opt.idx--;
                        opt.$li.eq(opt.idx).css({'display':'block'});
                        opt.$img.eq(opt.idx).css({'height':'120%'});
                        opt.$img.eq(opt.idx).animate({'height':'100%'},6000);
                    }
                    else{
                        opt.idx = opt.num-1;
                        opt.$li.eq(opt.idx).css({'display':'block'});
                        opt.$img.eq(opt.idx).css({'height':'120%'});
                        opt.$img.eq(opt.idx).animate({'height':'100%'},6000);
                    }
                    pageOn(opt);
                });

                var $pr = $('<p></p>');
                $pr.addClass('banner-direct banner-directR');
                opt.$bn.append($pr);
                $pr.on('click',function(){
                    opt.$img.eq(opt.idx).stop();
                    opt.$li.eq(opt.idx).css({'display':'none'});
                    opt.$img.eq(opt.idx).css({'height':'120%'});
                    if(opt.idx < opt.num-1){
                        opt.idx++;
                        opt.$li.eq(opt.idx).css({'display':'block'});
                        opt.$img.eq(opt.idx).css({'height':'120%'});
                        opt.$img.eq(opt.idx).animate({'height':'100%'},6000);
                    }
                    else{
                        opt.idx = 0;
                        opt.$li.eq(opt.idx).css({'display':'block'});
                        opt.$img.eq(opt.idx).css({'height':'120%'});
                        opt.$img.eq(opt.idx).animate({'height':'100%'},6000);
                    }
                    pageOn(opt);
                });
            };
        }
        
    });
});
