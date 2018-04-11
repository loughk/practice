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
        }
    };
});