requirejs(['common'],function(cm){
    jQuery(function($){
        var htmlindex = document.querySelector('#htmlindex');
        if(htmlindex){
            document.querySelector('.nav-typeList').style.display = 'block';
            document.querySelector('.nav-special').style.display = 'none';
        }


        cm.callbackCart();



        // 如果数据格式有错误,就不会执行success,尤其是json要严格符合格式。
        $.ajax({
            'url':'../data/typeItem.json',
            'success':function(dataAss){
                var $navTypeList = $('.nav-typeList');
                var $navTypeItem = $('.nav-typeItem');

                $navTypeList.on('mouseover',function(e){
                    var $t = $(e.target);
                    if(e.target.tagName == 'A'){
                        $navTypeItem.css({'display':'block'});
                        dataAss.some(function(v){
                            var terms = (v.types == $t.parent().attr('data-typeid'));
                            if(terms){
                                var items = ''
                                for(var i = 0;i < v.item.length;i++){
                                    items += `<a href="#">${v.item[i]}</a>`;
                                }

                                $navTypeItem.html(`
                                    <h4><a href="#">${v.types}</a></h4>
                                    <p>${items}</p>
                                    <a href="#">
                                        <img src="${v.navurl}"/>
                                    </a>
                                `);
                            };
                            return terms;
                        });
                    }
                });
                $navTypeList.on('mouseout',function(){
                    $navTypeItem.css({'display':'none'});
                });

                $navTypeItem.on('mouseenter',function(){
                    $navTypeItem.css({'display':'block'});
                });
                $navTypeItem.on('mouseleave',function(){
                    $navTypeItem.css({'display':'none'});
                });
            }
        });

        var $headCart = $('.header-cart');
        var $headCartL = $('.header-cartList');
        $headCart.hover(function(){
            /*同一个元素用finish直接点*/ 
            $headCartL.finish();
            $headCartL.css({'display':'block','opacity':0});
            $headCartL.animate({'opacity':1},300);
        },function(){
            $headCartL.animate({'opacity':0},300,function(){
                $headCartL.css({'display':'none'});  
            });
        });

    });
    
});

