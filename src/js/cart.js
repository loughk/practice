requirejs(['common','base'],function(cm){
    jQuery(function($){
        $('.header').css({'display':'none'});
        $('.nav').css({'display':'none'});

        var $mycarthead = $('.mycarthead');
        var $topNavCity = $('.topNav-city');
        $('<ul></ul>').addClass('mycartheadul').append($topNavCity).appendTo($mycarthead);



        var $mycartul = $('.mycartlist');
        if(cm.cookie.get('cart')){
            var arr = JSON.parse(cm.cookie.get('cart'));
            var arrgdid = [];
            arr.map(function(v){
                arrgdid.push(v.gdid);
            });
            jsongdid = JSON.stringify(arrgdid);

            var xhr = new XMLHttpRequest();
            xhr.open('post','../api/base.php',true);
            xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
            xhr.send('jsongdid='+jsongdid);

            xhr.onload = function(){
                if([200,304].includes(xhr.status)){
                    var ass = JSON.parse(xhr.responseText);

                    var costall = 0;
                    ass.map(function(v,i){
                        var qty = 0;
                        var cost = 0;
                        arr.some(function(k,n){
                            if(k.gdid == v.gdid){
                                qty = k.qty;
                                cost = k.qty*v.gdprice;
                                costall += cost;
                            }
                            return k.gdid == v.gdid;
                        });
                        cost = cost.toFixed(2);

                        var $li = $('<li></li>');
                        $li.html(`
                            <span>
                                <input class="mcbtncks" type="checkbox"/>
                            </span>
                            <span style="background-image:url(${v.gdimg});">
                                <a href="../html/detail.html?typesid=${v.typesid}&gdid=${v.gdid}">${v.gdname}</a>
                            </span>
                            <span>￥${v.gdprice}</span>
                            <span>
                                <input class="mcbtnminus" type="button" value="-"/>
                                <input class="mcbtnnums" type="text" value="${qty}"/>
                                <input class="mcbtnplus" type="button" value="+"/>
                            </span>
                            <span>￥${cost}</span>
                            <span>3kg/箱</span>
                            <span>
                                <input class="mcbtndel" type="button" value="删除"/>
                            </span>
                        `);
                        $mycartul.append($li);
                    });
                    
                    $('.mycartdo strong').text(costall.toFixed(2));
                }
            }

            
        }
        
    });
});