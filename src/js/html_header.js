;(function(){
    document.write(`
    <div class="topNav">
        <div class="container">
            <ul class="fl">
                <li class="fl">欢迎光临易果生鲜！</li>
                <li class="fl topNav-city">
                    <span class="fl topNav-citySend">配送至：</span>
                    <span class="topNav-cityName">广州市<b></b></span>
                </li>
            </ul>
            <ul class="fr">
                <li class="fl topNav-login">
                    <a href="../html/sign.html?sign=in">[登录]</a>
                </li>
                <li class="fl topNav-register">
                    <a href="../html/sign.html?sign=up">[注册]</a>
                </li>
                <li class="fl topNav-mine">
                    <i></i>
                    <a href="#">我的易果</a>
                    <b></b>
                </li>
                <li class="fl topNav-mobile">
                    <i></i>
                    <a href="#">手机</a>
                    <b></b>
                </li>
                <li class="fl topNav-pay">
                    <i></i>
                    <a href="#">储蓄卡</a
                </li>
                <li class="fl topNav-gift">
                    <i></i>
                    <a href="#">礼品兑换券入口</a
                </li>
            </ul>
        </div>
    </div>
    <div class="header">
        <div class="container">
            <a class="header-logo" href="../index.html"></a>
            <div class="header-search">
                <p class="clearfix">
                    <input class="header-searchTxt" type="text" placeholder="输入商品名／编号／拼音"/>
                    <input class="header-searchBtn" type="submit" value="搜索"/>
                </p>
                <p class="header-searchKeyword">
                    <a href="#">奇异果</a>
                    <a href="#">澳大利亚脐橙</a>
                    <a href="#">西瓜</a>
                    <a href="#">蓝莓</a>
                    <a href="#">黑猪肉</a>
                    <a href="#">鳕鱼</a>
                    <a href="#">贝类</a>
                    <a href="#">小龙虾</a>
                    <a href="#">三文鱼</a>
                </p>
            </div>
            <div class="header-cart">
                <a href="../html/cart.html" class="header-cartBtn">
                    <span class="header-cartQty"></span>
                    <span class="header-cartPrice"></span>
                </a>
                <div class="header-cartList">
                    <ul></ul>
                    <p></p>
                </div>
            </div>
        </div>
    </div>
    <div class="nav">
        <div class="container">
            <div class="nav-type">
                <a href="#" class="nav-typeTitle">全部商品分类 ▼</a>
                <ul class="nav-typeList">
                    <li data-typeId="国产水果">
                        <a href="../html/typeall.html?typesid=01fruit">
                            <i></i>
                            国产水果
                            <b>&gt;</b>
                        </a>
                    </li>
                    <li data-typeId="精选肉类">
                        <a href="#">
                            <i></i>
                            精选肉类
                            <b>&gt;</b>
                        </a>
                    </li>
                    <li data-typeId="禽类蛋品">
                        <a href="#">
                            <i></i>
                            禽类蛋品
                            <b>&gt;</b>
                        </a>
                    </li>   
                    <li data-typeId="海鲜水产">
                        <a href="#">
                            <i></i>
                            海鲜水产
                            <b>&gt;</b>
                        </a>
                    </li>    
                    <li data-typeId="乳品糕点">
                        <a href="#">
                            <i></i>
                            乳品糕点
                            <b>&gt;</b>
                        </a>
                    </li>   
                    <li data-typeId="方便速食">
                        <a href="#">
                            <i></i>
                            方便速食
                            <b>&gt;</b>
                        </a>
                    </li>   
                    <li data-typeId="粮油杂货">
                        <a href="#">
                            <i></i>
                            粮油杂货
                            <b>&gt;</b>
                        </a>
                    </li>
                </ul>
                <div class="nav-typeItem"></div>
            </div>
            <ul class="nav-special">
                <li><a href="#">新品专区</a></li>
                <li><a href="#">优质生活</a></li>
                <li><a href="#">银行专区</a></li>
                <li><a href="#">菜谱专栏</a></li>
            </ul>
        </div>
    </div>
    `);
})();