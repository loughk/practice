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
            },
            set:function(key,value,date,path){
                var str = key + '=' + value;
                if(date){
                    str += ';expires=' + date.toUTCString();
                }
                if(path){
                    str += ';path='+path;
                }
                document.cookie = str;
            },
            remove:function(key,path){
                var d = new Date();
                d.setDate(d.getDate()-1);
                this.set(key,'x',d,path);
            },
            clear:function(){
                var cookies = document.cookie;
                cookies = '';
            }
        }

    };
});