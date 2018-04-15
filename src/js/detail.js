requirejs(['common','base'],function(cm){
    jQuery(function($){
        var objURI = cm.objURISearch(location.search);

        $.ajax({
            'url':'../api/detail.php',
            'type':'POST',
            'data':{
                'typesid':objURI.typesid,
                'gdid':objURI.gdid
            },
            'success':function(dataJSON){
                var obj = JSON.parse(dataJSON)[0];

                function initNavdetails(){
                    var $navdetails = $('.navdetails');
                    $navdetails.html(null);

                    var $li = $('<li></li>');
                    var $a = $('<a></a>');
                    var $b = $('<b>&gt;</b>');
                    $a.attr({'href':'../index.html'});
                    $a.html('首页');
                    $li.append($a).append($b).appendTo($navdetails);

                    $li = $('<li></li>');
                    $a = $('<a></a>');
                    $b = $b.clone();
                    $a.attr({'href':'../html/typeall.html?typesid='+obj.typesid});
                    $a.html(obj.types);
                    $li.append($a).append($b).appendTo($navdetails);

                    $li = $('<li></li>');
                    $a = $('<a></a>');
                    $b = $b.clone();
                    $a.html(obj.typeskey);
                    $li.append($a).append($b).appendTo($navdetails);

                    $li = $('<li></li>');
                    $a = $('<a></a>');
                    $a.html(obj.gdname);
                    $li.append($a).appendTo($navdetails);
                }
                initNavdetails();


                function initPic(){
                    var $picbig = $('.picbig');
                    $picbig.html(null);
                    var imgbig = new Image();
                    imgbig.src = obj.gdimg;
                    $picbig.append(imgbig);

                    var $pics = $('.pics');
                    function initPics(){
                        $pics.html(null);

                        var $li = $('<li></li>');
                        var img = new Image();
                        img.src = obj.gdimg;
                        $li.append(img).appendTo($pics);
                        $li.addClass('picon');

                        $li = $('<li></li>');
                        img = new Image();
                        img.src = '../img/database/'+obj.typesid+'/'+obj.typesid+'_gdid02.jpg';
                        $li.append(img).appendTo($pics);
                        
                        $li = $('<li></li>');
                        img = new Image();
                        img.src = '../img/database/'+obj.typesid+'/'+obj.typesid+'_gdid03.jpg';
                        $li.append(img).appendTo($pics);
                    }
                    initPics();

                    $pics.on('mouseover',function($E){
                        var t = $E.target;
                        if(t.tagName == 'IMG'){
                            $lis = $('.pics li');
                            $.map($lis,function(e){
                                if(e.classList.contains('picon')){
                                    e.classList.remove('picon');
                                }
                            });
                            t.parentNode.classList.add('picon');

                            $picbig.html(null);
                            var imgbig = new Image();
                            imgbig.src = t.src;
                            $picbig.append(imgbig);
                        }
                    });

                    var $piczoom = $('.piczoom');

                    $picbig.get(0).onmouseenter = function(e1){
                        $piczoom.css({'display':'block'});
                        var $picview = $('.picbig img').clone();
                        $piczoom.append($picview);
                        $picview.addClass('picview');

                        var $pictool = $('<span class="pictool"></span>');
                        $pictool.css({
                            'left':e1.offsetX-62.5,
                            'top':e1.offsetY-62.5
                        });
                        $picbig.append($pictool);


                        $picbig.get(0).onmousemove = function(e2){
                            var t2 = e2.target;
                            var x = e2.pageX - $('.pictures').get(0).offsetLeft;
                            var y = e2.pageY - $('.pictures').get(0).offsetTop;
                            if(x <= 62.5){
                                $pictool.css({'left':0});
                            }
                            else if(x > 62.5 && x < (500-62.5)){
                                $pictool.css({'left':(x-62.5)});
                            }
                            else{
                                $pictool.css({'left':(500-125)})
                            }
                            if(y <= 62.5){
                                $pictool.css({'top':0});
                            }
                            else if(y > 62.5 && y < (500-62.5)){
                                $pictool.css({'top':(y-62.5)});
                            }
                            else{
                                $pictool.css({'top':(500-125)})
                            }

                            $picview.css({
                                'left':-$pictool.get(0).offsetLeft/500*1500,
                                'top':-$pictool.get(0).offsetTop/500*1500
                            });
                        };
                    };
                    $picbig.on('mouseleave',function(){
                        $piczoom.css({'display':'none'});
                        $piczoom.html(null);
                        $('.pictool').remove();
                    });


                    var $infosname = $('.infosname');
                    var $infosprice = $('.infosprice');
                    function initInfos(){
                        $infosname.find('h3').text(obj.gdname);
                        $infosname.find('p').text(obj.gdtitle);

                        $infosprice.find('b').text(obj.gdprice);
                        $infosprice.find('span').text(obj.gdsatisfy);
                        $infosprice.find('p').text(obj.gdcommentnum);

                        var $infosP = $('.infosright p');
                        $infosP[0].innerHTML = obj.gdmanu;
                        $infosP[1].innerHTML = obj.gdidnum;
                        $infosP[3].innerHTML = obj.gdsend;
                    }
                    initInfos();
                }
                initPic();

            }
        });


        var infosleft = document.querySelector('.infosleft');
        infosleft.onclick = function(e){
            var t = e.target;
            var infosnum = document.querySelector('.infosnum');
            if(t.className == 'infosplus'){
                infosnum.value = infosnum.value*1 + 1;
            }
            else if(t.className == 'infosminus'){
                infosnum.value = (infosnum.value == 1) ? 1 : infosnum.value*1 - 1;
            }
            else if(t.className == 'infosbuy' || t.parentNode.className == 'infosbuy'){
                var obj = {
                    'typesid':objURI.typesid,
                    'gdid':objURI.gdid,
                    'qty':infosnum.value*1
                };
                var arr = [];
                if(cm.cookie.get('cart')){
                    arr = JSON.parse(cm.cookie.get('cart'));
                    var terms = arr.some(function(v){
                        if(v.gdid == objURI.gdid){
                            v.qty = v.qty*1 + infosnum.value*1;
                        }
                        return v.gdid == objURI.gdid;
                    });
                    if(!terms){
                        arr.push(obj);
                    }
                }
                else{
                    arr.push(obj);
                }
                cm.cookie.set('cart',JSON.stringify(arr),7,'/');

                cm.callbackCart();
            }
        }

    });
});