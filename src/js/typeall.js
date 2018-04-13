requirejs(['common','base'],function(cm,bs){
    jQuery(function($){
        var objURI = cm.objURISearch(location.search);

        $.ajax({
            'url':'../data/typeItem.json',
            'success':function(dataAss){
                var adpage = document.querySelector('.adpage');

                dataAss.some(function(v){
                    var terms = (v.typesid == objURI.typesid);
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


        var goodlist = document.querySelector('.goodlist');
        var gdpages = document.querySelector('.gdpages');
                
        var objList = {
            'aim':'make',
            'nums':12,
            'page':1,
            'order':'',
            'typesid':objURI.typesid
        }
        makelist(objList);

        var filter = document.querySelector('.filter');
        var filters = filter.children;
        filter.onclick = function(e){
            var t = e.target;
            if(t.tagName == 'P'){
                t.classList.add('filteron');
                for(var i = 0;i < filters.length;i++){
                    if(t != filters[i]){
                        filters[i].classList.remove('filteron');  
                    }
                }
                filters[1].children[0].style.backgroundPosition = '0 0';
                filters[2].children[0].style.backgroundPosition = '-20px 0';
                filters[3].children[0].style.backgroundPosition = '0 0';
                
                if(t.classList.contains('sortDefault')){
                    objList.aim = 'make';
                    makelist(objList);
                }
                else if(t.classList.contains('sortSaleVol')){
                    t.children[0].style.backgroundPosition = '-10px 0';
                    objList.order = 'DESC';
                    objList.aim = 'salevol';
                    makelist(objList);
                }
                else if(t.classList.contains('sortCommentNum')){
                    t.children[0].style.backgroundPosition = '-10px 0';
                    objList.order = 'DESC';
                    objList.aim = 'comment';
                    makelist(objList);
                }
                else if(t.classList.contains('sortPrice')){
                    if(t.dataset.order == 'DESC'){
                        objList.order = 'ASC';
                        t.dataset.order = 'ASC';
                        t.children[0].style.backgroundPosition = '-40px 0';
                    }
                    else{
                        objList.order = 'DESC';
                        t.dataset.order = 'DESC';
                        t.children[0].style.backgroundPosition = '-30px 0';
                    }
                    objList.aim = 'price';
                    makelist(objList);
                }
            }
        }

        function makelist(obj){
            /*post无缓存,数据不保留在php。检查：network的response有没输出。*/ 
            $.post('../api/typeall.php',obj,function(dataJSON){
                var dataArr = JSON.parse(dataJSON).data;

                goodlist.innerHTML = '';

                dataArr.map(function(v){
                    var li = document.createElement('li');
                    li.dataset.gdid = v.gdid;
                    li.dataset.gdinfo = v.gdinfo;

                    var a = document.createElement('a');
                    a.href = '#';
                    a.className = 'gl_img';
                    var img = document.createElement('img');
                    img.src = v.gdimg;
                    a.appendChild(img);
                    li.appendChild(a);

                    var dv1 = document.createElement('div');
                    dv1.className = 'gl_info';
                    var p1 = document.createElement('p');
                    p1.className = 'gl_name';
                    p1.innerText = v.gdname;
                    var p2 = document.createElement('p');
                    p2.className = 'gl_price';
                    p2.innerText = '￥' + v.gdprice;
                    dv1.appendChild(p1);
                    dv1.appendChild(p2);
                    li.appendChild(dv1);

                    var dv2 = document.createElement('div');
                    dv2.className = 'gl_buy';
                    var p3 = document.createElement('p');
                    p3.className = 'gl_title';
                    p3.innerText = v.gdtitle;
                    var p4 = document.createElement('p');
                    p4.className = 'gl_btnbuy';
                    p4.innerText = '加入购物车';
                    dv2.appendChild(p3);
                    dv2.appendChild(p4);
                    li.appendChild(dv2);

                    goodlist.appendChild(li);
                });
                
                
                gdpages.innerHTML = '';
                var pages = JSON.parse(dataJSON).pages;
                for(var i = 1;i <= pages;i++){
                    var li = document.createElement('li');
                    if(i == obj.page){
                        li.classList.add('gdpageson');
                    }
                    li.innerText = i;
                    gdpages.appendChild(li);
                }
            });
        }



        goodlist.onclick = function(e){
            var t = e.target;
            if(t.parentNode.className == 'gl_img'){
                var gdid = t.parentNode.parentNode.dataset.gdid;
                location.href = '../html/detail.html?typesid=' + objURI.typesid + '&gdid=' + gdid;
            }
        }

        gdpages.onclick = function(e){
            var t = e.target;
            if(t.tagName == 'LI'){
                var objList = {
                    'aim':'make',
                    'nums':12,
                    'page':t.innerText,
                    'order':'',
                    'typesid':objURI.typesid
                }
                var filternow = document.querySelector('.filteron');
                if(filternow.classList.contains('sortDefault')){
                    objList.aim = 'make';
                }
                else if(filternow.classList.contains('sortSaleVol')){
                    objList.order = 'DESC';
                    objList.aim = 'salevol';
                }
                else if(filternow.classList.contains('sortCommentNum')){
                    objList.order = 'DESC';
                    objList.aim = 'comment';
                }
                else if(filternow.classList.contains('sortPrice')){
                    objList.order = (filternow.dataset.order == 'DESC') ? 'DESC' : 'ASC';
                    objList.aim = 'price';
                }
                makelist(objList);
            }
        }
    });
});
