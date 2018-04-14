define(function(){
    return {
        'objURISearch':function(strURISearch){
            var arrURI = location.search.slice(1).split('&');
            var objURI = {};
            arrURI.map(function(v){
                var arr = v.split('=');
                objURI[arr[0]] = arr[1];
            });
            return objURI;
        },
        'cookie':{
            get:function(key){
                var cookies = document.cookie;
                if(cookies.length === 0){
                    return '';
                }
                cookies = cookies.split('; ');

                for(var i=0;i<cookies.length;i++){
                    var arr = cookies[i].split('=');
                    if(arr[0] === key){
                        return arr[1];
                    }
                }
                return '';
            },
            set:function(key,value,date,path){
                var str = key + '=' + value;
                if(date){
                    var d = new Date();
                    d.setDate(d.getDate() + date);
                    str += ';expires=' + d.toUTCString();
                }
                if(path){
                    str += ';path='+path;
                }
                document.cookie = str;
            },
            remove:function(key,path){
                this.set(key,'',-1,path);
            }
        },
        callbackCart:function(){
            var cm = this;

            var headCartLUl = document.querySelector('.header-cartList ul');
            var headCartLP = document.querySelector('.header-cartList p');
            var headerCartQty = document.querySelector('.header-cartQty');
            var headerCartPrice = document.querySelector('.header-cartPrice');

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

                        headCartLUl.innerHTML = '';
                        headCartLP.innerHTML = '';
                        var allcost = 0;
                        var allnum = 0;
                        ass.map(function(v){
                            var li = document.createElement('li');
                            li.dataset.gdid = v.gdid;

                            var a = document.createElement('a');
                            a.className = 'cbcartname';
                            a.href = '../html/detail.html?typesid='+v.typesid+'&gdid='+v.gdid;
                            a.style.backgroundImage = 'url('+v.gdimg+')';
                            a.innerText = v.gdname;
                            li.appendChild(a);

                            var qty = '';
                            arr.some(function(k){
                                if(k.gdid == v.gdid){
                                    qty = k.qty;
                                    allnum += k.qty;
                                    allcost += k.qty*v.gdprice;
                                };
                                return k.gdid == v.gdid;
                            });

                            var span = document.createElement('span');
                            span.className = 'cbcartprice';
                            span.innerHTML = '<b>￥'+v.gdprice+'</b>&nbsp;&times;&nbsp;'+qty;
                            li.appendChild(span);

                            a = document.createElement('a');
                            a.className = 'cbcartdel';
                            a.href = 'javascript:void(0);';
                            a.innerText = '删除';
                            li.appendChild(a);
                            headCartLUl.appendChild(li);
                        });

                        allcost = allcost.toFixed(2);
                        headCartLP.innerHTML =`
                            <span>共计<strong>￥${allcost}</strong></span>
                            <span>共<strong>${allnum}</strong>件商品&emsp;</span>
                            <a class="cbcartgo" href="../html/cart.html">去购物车</a>
                        `;

                        headerCartQty.innerHTML = '<b>'+allnum+'</b>';
                        headerCartPrice.innerHTML = '￥'+allcost;

                    }
                };
            }
            else{
                headerCartQty.innerHTML = '<b>0</b>';
                headerCartPrice.innerHTML = '￥0.0';
                headCartLP.innerHTML = '';
            }

            headCartLUl.onclick = function(e){
                var t = e.target;
                if(t.className == 'cbcartdel'){
                    var delgdid = t.parentNode.dataset.gdid;
                    headCartLUl.removeChild(t.parentNode);

                    var arr = JSON.parse(cm.cookie.get('cart'));
                    arr.some(function(v,i){
                        if(v.gdid == delgdid){
                            arr.splice(i,1);
                            /*数组的判断用length以免记错,js数组都是对象。*/ 
                            if(arr.length > 0){
                                cm.cookie.set('cart',JSON.stringify(arr),7,'/');
                            }
                            else{
                                cm.cookie.remove('cart','/');
                            }
                            cm.callbackCart();
                        }
                        return v.gdid == delgdid;
                    });
                }
            }                       
        }

    };
});