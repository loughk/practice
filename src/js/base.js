// 依赖模块我在config.js统一写。
jQuery(function($){
    var htmlindex = document.querySelector('#htmlindex');
    if(htmlindex){
        document.querySelector('.nav-typeList').style.display = 'block';
    }
    else{
        document.querySelector('.nav-special').style.display = 'block';
    }



    // 如果数据格式有错误,就不会执行success,尤其是json要严格符合格式。
    $.ajax({
        'url':'../data/typeItem.json',
        'success':function(dataAss){
            var $navTypeListLi = $('.nav-typeList li');
            var $navTypeItem = $('.nav-typeItem');

            $navTypeListLi.map(function(){
                var $that = $(this);

                $that.hover(
                    function(){
                        $navTypeItem.css({'display':'block'});
                        dataAss.some(function(v){
                            var terms = (v.type == $that.attr('data-typeId'));
                            if(terms){
                                var items = ''
                                for(var i = 0;i < v.item.length;i++){
                                    items += `<a href="#">${v.item[i]}</a>`;
                                }

                                $navTypeItem.html(`
                                    <h4><a href="#">${v.type}</a></h4>
                                    <p>${items}</p>
                                    <a href="#">
                                        <img src="${v.navurl}"/>
                                    </a>
                                `);
                            };
                            return terms;
                        });
                    },
                    function(){
                        $navTypeItem.css({'display':'none'});
                    }
                );
            });

            $navTypeItem.hover(
                function(){
                    $navTypeItem.css({'display':'block'});
                },
                function(){
                    $navTypeItem.css({'display':'none'});
                }
            );
        }
    });

});

