requirejs(['common','base'],function(cm,bs){
    jQuery(function($){
        var objURI = cm.objURISearch(location.search);

        $.ajax({
            'url':'../data/typeItem.json',
            'success':function(dataAss){
                var adpage = document.querySelector('.adpage');

                dataAss.some(function(v){
                    var terms = (v.typeid == objURI.typeid);
                    if(terms){
                        for(var i = 0;i < v.pageurl.length;i++){
                            var a = document.createElement('a');
                            a.href = "#";
                            var img = document.createElement('img');
                            img.src = v.pageurl[i];
                            a.appendChild(img);
                            adpage.appendChild(a);
                        }
                    }
                    return terms;
                });
            }
        });

        $.post('../api/typeall.php',{'typeid':objURI.typeid},function(data){
            
        });
    });
});
