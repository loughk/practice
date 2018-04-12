requirejs(['common','base'],function(cm,bs){
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

                $('.navdetails li:nth-child(2) a').attr({'href':'../html/typeall.html?typesid='+obj.typesid})
                $('.navdetails li:last-child a').text(obj.gdname);

                var $picbig = $('.picbig');
                var $piczoom = $('.piczoom');
                $picbig.on('mouseenter',function(){
                    $piczoom.css({'display':'block'});
                    var $picview = $('.picbig img').clone();
                    $piczoom.append($picview);
                    $picview.addClass('picview');

                    $picbig.get(0).onmousemove = function(e){
                        $picview.css({
                            'left':-(2*e.offsetX-250),
                            'top':-(2*e.offsetY-250)
                        });
                        console.log($picview.css('left'))
                    };
                });
                $picbig.on('mouseleave',function(){
                    $piczoom.css({'display':'none'});
                    $piczoom.html(null);
                });
            }
        });
    });
});