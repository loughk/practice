requirejs(['common','base'],function(cm,bs){
    ;(function(){
        var service = document.querySelector('.service');
        service.style.display = 'none';

        var objURI = cm.objURISearch(location.search);
        var signtitle = document.querySelector('.signheader h2');
        if(objURI.sign == 'in'){
            signtitle.innerText = '登录';
        }
    })();
});