requirejs(['common','base'],function(cm){
    jQuery(function($){
        $('.header').css({'display':'none'});
        $('.nav').css({'display':'none'});

        var $mycarthead = $('.mycarthead');
        var $topNavCity = $('.topNav-city');
        $('<ul></ul>').addClass('mycartheadul').append($topNavCity).appendTo($mycarthead);



        var $mycartul = $('.mycartlist');
        function makeMyCart(){
            if(cm.cookie.get('cart')){
                var arr = JSON.parse(cm.cookie.get('cart'));
                if(arr.length > 0){
                    $mycartul.html('');

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
                                        <input class="mcbtndel" type="button" value="删除" />
                                    </span>
                                `);
                                $li.attr({'data-gdid':v.gdid});
                                $mycartul.append($li);
                            });
                            
                            $('.mycartdo strong').text('￥'+costall.toFixed(2));
                        }
                    }
                }
                else{
                    $mycartul.html('');
                    $('.mycartdo strong').text('￥0');
                }            
            }
            else{
                $mycartul.html('');
                $('.mycartdo strong').text('￥0');
            }         
        };
        makeMyCart();

        $mycartul.on('click',function($E){
            var t = $E.target;
            if(cm.cookie.get('cart')){
                var arr = JSON.parse(cm.cookie.get('cart'));
                if(t.className == 'mcbtnminus'){
                    var mcbtnnums = $(t).siblings('.mcbtnnums').get(0);
                    mcbtnnums.value = (mcbtnnums.value > 1) ? mcbtnnums.value*1-1 : 1;

                    var $mcbtnsp = $(t).parent().parent().find('span');
                    var mcbtnprice = $mcbtnsp.eq(2).text().slice(1)*1;
                    var $mcbtncost =  $mcbtnsp.eq(4);
                    $mcbtncost.text('￥' + (mcbtnprice*mcbtnnums.value*1).toFixed(2));

                    $mycostall = $('.mycartdo strong');
                    var mycostall = $mycostall.text().slice(1)*1 - mcbtnprice;
                    $mycostall.text('￥' + (mycostall*1).toFixed(2));

                    arr.some(function(v,i){
                        if(v.gdid == t.parentNode.parentNode.dataset.gdid){
                            v.qty = mcbtnnums.value;
                        }
                    });
                    cm.cookie.set('cart',JSON.stringify(arr),7,'/');
                }
                else if(t.className == 'mcbtnplus'){
                    var mcbtnnums = $(t).siblings('.mcbtnnums').get(0);
                    mcbtnnums.value = mcbtnnums.value*1+1;

                    var $mcbtnsp = $(t).parent().parent().find('span');
                    var mcbtnprice = $mcbtnsp.eq(2).text().slice(1)*1;
                    var $mcbtncost =  $mcbtnsp.eq(4);
                    $mcbtncost.text('￥' + (mcbtnprice*mcbtnnums.value*1).toFixed(2));

                    $mycostall = $('.mycartdo strong');
                    var mycostall = $mycostall.text().slice(1)*1 + mcbtnprice;
                    $mycostall.text('￥' + (mycostall*1).toFixed(2));

                    arr.some(function(v,i){
                        if(v.gdid == t.parentNode.parentNode.dataset.gdid){
                            v.qty = mcbtnnums.value;
                        }
                    });
                    cm.cookie.set('cart',JSON.stringify(arr),7,'/');
                }
                else if(t.className == 'mcbtndel'){
                    arr.some(function(v,i){
                        if(v.gdid == t.parentNode.parentNode.dataset.gdid){
                            arr.splice(i,1);
                        }
                    });
                    if(arr.length > 0){
                        cm.cookie.set('cart',JSON.stringify(arr),7,'/');
                    }
                    else{
                        cm.cookie.remove('cart','/');
                    }
                    makeMyCart();
                }
                else if(t.className == 'mcbtncks'){
                    var mcckall = document.querySelector('#mcckall');
                    if(t.checked){
                        var $mcbtncks = $mycartul.find('.mcbtncks');
                        var $mcbtncksnum = $mycartul.find('.mcbtncks:checked');
                        if($mcbtncks.length == $mcbtncksnum.length){
                            mcckall.checked = true;
                        }
                    }
                    else{
                        mcckall.checked = false;
                    }
                }            
            }
        });
        

        var $mycartdo = $('.mycartdo');
        $mycartdo.on('click',function($E){
            var t = $E.target;
            if(t.id == 'mccklabel' || t.id == 'mcckall'){
                var mcckall = document.querySelector('#mcckall');
                var $mcbtncks = $mycartul.find('.mcbtncks');
                if(mcckall.checked){
                    $mcbtncks.map(function(i,v){
                        v.checked = true;
                    });
                }
                else{
                    $mcbtncks.map(function(i,v){
                        v.checked = false;
                    });
                }
            }
            else if(t.parentNode.classList.contains('mcbtndsome')){
                var $mcbtncks = $mycartul.find('.mcbtncks:checked');
                if(cm.cookie.get('cart')){
                    var arr = JSON.parse(cm.cookie.get('cart'));
                    $mcbtncks.map(function(n,k){
                        arr.some(function(v,i){
                            if(v.gdid == k.parentNode.parentNode.dataset.gdid){
                                arr.splice(i,1);
                            }
                        });
                        if(arr.length > 0){
                            cm.cookie.set('cart',JSON.stringify(arr),7,'/');
                        }
                        else{
                            cm.cookie.remove('cart','/');
                            var mcckall = document.querySelector('#mcckall');
                            mcckall.checked = false;
                        }
                    });
                    makeMyCart();
                }
            }
            else if(t.parentNode.classList.contains('mcbtndall')){
                if(cm.cookie.get('cart')){
                    cm.cookie.remove('cart','/');
                    makeMyCart();
                }
            }
        });
    });
});