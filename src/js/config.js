;(function(){
    require.config({
        paths:{
            // 用baseURL不能加文件后缀
            footer:'html_footer',
            jquery:'../lib/jquery-3.2.1',
            common:'common'
        },
        shim:{
            common:['footer','jquery']
        }
    });
})();