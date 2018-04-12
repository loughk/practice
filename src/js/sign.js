requirejs(['common','base'],function(cm,bs){
    jQuery(function($){
        var service = document.querySelector('.service');
        service.style.display = 'none';

        var objURI = cm.objURISearch(location.search);
        var signtitle = document.querySelector('.signheader h2');
        var signin = document.querySelector('.signin');
        var signup = document.querySelector('.signup');

        if(objURI.sign == 'in'){
            signtitle.innerText = '登录';
            signin.style.display = 'block';
            vcode($('.sivcodes'));
        }
        else if(objURI.sign == 'up'){
            signtitle.innerText = '注册';
            signup.style.display = 'block';
            vcode($('.suvcodes'));
        }

        function vcode($e){
            var rdvcodes = '';
            for(var i = 1;i <= 4;i++){rdvcodes += parseInt(Math.random()*10);}
            $e.text(rdvcodes);
        }
        $('.sirdvcodes').on('click',function(){vcode($('.sivcodes'));});
        $('.surdvcodes').on('click',function(){vcode($('.suvcodes'));});



        var $siin = $('.siin');
        $siin.on('click',function(){
            $siuser = $('.siuser');
            $sipsw = $('.sipsw');

            var terms = ($('.sivcode').val() == $('.sivcodes').text());
            if(terms){
                $.post('../api/sign.php',{
                    'sign':'in',
                    'siuser':$siuser.val(),
                    'sipsw':$sipsw.val()
                },function(data){
                    alert(data);
                    if(data == '登录成功'){
                        location.href = '../index.html';
                    }
                });
            }
            else{
                alert('验证码错误');
            }
        });




        var isOK = {};

        var $suvcode = $('.suvcode');
        $suvcode.on('blur',function(){
            if($suvcode.val() == ''){
                tip($suvcode.parent(),'请输入验证码','tips');
                isOK.suvcode = 'no';
            }
            else{
                if($suvcode.val() == $('.suvcodes').text()){
                    tip($suvcode.parent(),'','ok');
                    isOK.suvcode = 'ok';
                }
                else{
                    tip($suvcode.parent(),'验证码错误','error');
                    isOK.suvcode = 'no';
                }
            }
        });

        var regMobile = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
        var $sumobile = $('.sumobile');
        $sumobile.on('blur',function(){
            if($sumobile.val() == ''){
                tip($sumobile.parent(),'请输入手机号','tips');
                isOK.sumobile = 'no';
            }
            else{
                if(!regMobile.test($sumobile.val())){
                    tip($sumobile.parent(),'请输入正确的手机号','error');
                    isOK.sumobile = 'no';
                }
                else{
                    $.post('../api/sign.php',{
                        'sign':'check',
                        'suuser':$sumobile.val()
                    },function(data){
                        if(data == 'repeat'){
                            tip($sumobile.parent(),'此手机号已被注册','error');
                            isOK.sumobile = 'no';
                        }
                        else{
                            tip($sumobile.parent(),'','ok');
                            isOK.sumobile = 'ok';
                        }
                    });
                }
            }
        });

        var $sumobileget = $('.sumobileget');
        $sumobileget.on('click',function(){
            var codes = '';
            for(var i = 1;i <= 4;i++){codes += parseInt(Math.random()*10);}
            $sumobileget.attr({'data-codes':codes});
            alert(codes);
        });
        var $sumobilecode = $('.sumobilecode');
        $sumobilecode.on('blur',function(){
            if($sumobilecode.val() == ''){
                tip($sumobilecode.parent(),'请输入手机验证码','tips');
                isOK.sumobilecode = 'no';
            }
            else{
                if($sumobilecode.val() == $sumobileget.attr('data-codes')){
                    tip($sumobilecode.parent(),'','ok');
                    isOK.sumobilecode = 'ok';
                }
                else{
                    tip($sumobilecode.parent(),'手机验证码错误','error');
                    isOK.sumobilecode = 'no';
                }
            }
        });


        var regPsw = /^(?=.*[A-Z])(?=.*[a-z])(?!.*[!@#$%^&*?:= ]).{6,20}$/;
        var $supsw = $('.supsw');
        $supsw.on('blur',function(){
            if($supsw.val() == ''){
                tip($supsw.parent(),'请输入密码','tips');
                isOK.supsw = 'no';
            }
            else{
                if(regPsw.test($supsw.val())){
                    tip($supsw.parent(),'','ok');
                    isOK.supsw = 'ok';
                }
                else if(!/^.{6,20}$/.test($supsw.val())){
                    tip($supsw.parent(),'密码长度要6~20位','tips');
                    isOK.supsw = 'no';
                }
                else if(/(?=.*[!@#$%^&*?:= ])/.test($supsw.val())){
                    tip($supsw.parent(),'不能有：,?,=,空格,$,&等特殊字符','tips');
                    isOK.supsw = 'no';
                }
                else if(!/(?=.*[A-Z])(?=.*[a-z])/.test($supsw.val())){
                    tip($supsw.parent(),'至少包含1个大写字母和1个小写字母','tips');
                    isOK.supsw = 'no';
                }
                else{
                    tip($supsw.parent(),'密码格式错误','error');
                    isOK.supsw = 'no';
                }
            }

            if($supsw.val() == $su2psw.val()){
                tip($su2psw.parent(),'','ok');
                isOK.su2psw = 'ok';
            }
            else{
                tip($su2psw.parent(),'两次密码不一致','tips');
                isOK.su2psw = 'no';
            }
        });

        var $su2psw = $('.su2psw');
        $su2psw.on('blur',function(){
            if($supsw.val() == $su2psw.val()){
                tip($su2psw.parent(),'','ok');
                isOK.su2psw = 'ok';
            }
            else{
                tip($su2psw.parent(),'两次密码不一致','tips');
                isOK.su2psw = 'no';
            }
        });

        var $suup = $('.suup');
        $suup.on('click',function(){
            var $suagree = $('#suagree');
            if($suagree.prop('checked')){
                tip($suagree.parent(),'');
                isOK.suagree = 'ok';
            }
            else{
                tip($suagree.parent(),'请同意《易果服务协议》','tips');
                isOK.suagree = 'no';
            }

            var i = 0;
            for(var k in isOK){
                if(isOK[k] == 'ok'){i++};
            }
            if(i == 6){
                $.post('../api/sign.php',{
                    'sign':'up',
                    'suuser':$sumobile.val(),
                    'supsw':$supsw.val(),
                },function(data){
                    if(data == 'ok'){
                        alert('注册成功！');
                        location.href = '../index.html';
                    }
                    else{
                        alert('请重新注册');
                    }
                });
            }
            else{
                alert('请填写正确信息');
            }
        });

        function tip($e,txt,bg){
            if($e.find('.sutip').length != 0){
                $e.find('.sutip').remove();
            }
            $sp = $('<span class="sutip">'+txt+'</span>');
            if(bg == 'ok'){
                $sp.addClass('sutipok');
            }
            else if(bg == 'error'){
                $sp.addClass('sutiperror');
            }
            else if(bg == 'tips'){
                $sp.addClass('sutiptips');
            }
            $e.append($sp);
        }

    });
});