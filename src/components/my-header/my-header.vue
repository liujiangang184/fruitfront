<template>
    <div>
        <div class="top-daohang">
            <a href="">
                <div class="top-daohang-l">
                    <img src="./img/public/ad.png" alt="" id="img-icon1">
                    <span class="span-icon">地址</span>
                </div>
            </a>
            <a href="">
                <div class="top-daohang-c">
                    <span class="span-icon">北京石景山</span>
                    <img src="./img/public/xiala.png" alt="">
                </div>
            </a>
            <a href="搜索.html">
                <div class="top-daohang-r">
                    <img src="./img/public/ad.png" alt="" id="img-icon">
                    <span class="span-icon">搜索</span>
                </div>
            </a>
        </div>
    </div>
</template>

<script>
    export default {
        name: "my-header"
    }
</script>

<style>


    #img-icon1 {
        display: block;
        width: 0.4rem;
        height: 0.4rem;
        margin: 0 auto;
        opacity: 0.5;
    }
    #img-icon {
        display: block;
        width: 0.4rem;
        height: 0.4rem;
        margin: 0 auto;
        opacity: 0.5;
    }

    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        text-decoration: none;
        list-style: none;
    }


    /* 公共的icon样式 */

    #img-icon {
        display: block;
        width: 0.4rem;
        height: 0.4rem;
        margin: 0 auto;
        opacity: 0.5;
    }

    #img-icon-wuauto {
        display: block;
        width: 0.4rem;
        height: 0.4rem;
        opacity: 0.5;
        margin-left: 0.2rem;
    }

    #img-icon-wuauto-r {
        display: block;
        float: right;
        width: 0.4rem;
        height: 0.4rem;
        opacity: 0.5;
        margin-right: 0.2rem;
    }

    #img-icon-color {
        display: block;
        width: 0.4rem;
        height: 0.4rem;
        margin: 0 auto;
        opacity: 1;
    }


    /* 公共的span样式 */

    .span-icon {
        font-size: 0.24rem;
        color: #A8A3A7;
    }

    #span-icon-color {
        color: #FF9201;
    }

    #span-icon-black {
        color: #000;
        display: inline-block;
        font-size: 0.32rem;
    }


    /* 底部TAB栏 开始 */

    .footer-tab {
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 9999;
        width: 100%;
        height: 1rem;
        background: #fff;
        border-top: 0.02rem solid #DCDCDC;
        z-index: 9999;
    }

    .footer-tab ul a li {
        width: 25%;
        padding-top: 0.12rem;
        float: left;
        text-align: center;
    }


    /* 底部TAB栏 结束 */


    /* 首页顶部导航栏 开始 */

    .top-daohang {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 1.3rem;
        padding: 0.24rem 0;
        z-index: 9999;
        background: #fff;
        border-bottom: 0.02rem solid #f1f1f1;
    }

    .top-daohang .top-daohang-l {
        float: left;
        width: 17%;
        height: 100%;
        text-align: center;
    }

    .top-daohang .top-daohang-c {
        float: left;
        width: 66%;
        height: 100%;
        text-align: center;
        overflow: hidden;
    }

    .top-daohang .top-daohang-c img {
        display: inline-block;
        opacity: 0.5;
        width: 0.26rem;
        height: 0.54rem;
        margin-left: 0.2rem;
        padding-top: 0.24rem;
    }

    .top-daohang .top-daohang-c span {
        color: #000;
        display: inline-block;
        /* margin-top: -10px; */
        font-size: 0.32rem;
    }

    .top-daohang .top-daohang-r {
        float: left;
        width: 17%;
        height: 100%;
        text-align: center;
    }


    /* 首页顶部导航栏 结束 */


    /* 其他顶部导航样式 开始 */

    .top-fendaohang {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 9999;
        width: 100%;
        height: 0.9rem;
        padding: 0.25rem 0;
        background: #fff;
        border-bottom: 0.02rem solid rgba(220, 220, 220, 0.5);
    }

    .top-fendaohang.wuborder {
        border-bottom: none;
    }

    .top-fendaohang .top-fendaohang-l {
        width: 17%;
        height: 0.4rem;
        float: left;
    }

    .top-fendaohang .top-fendaohang-c {
        width: 66%;
        float: left;
        height: 0.4rem;
        line-height: 0.4rem;
        text-align: center;
    }

    .top-fendaohang .top-fendaohang-c img {
        display: inline-block;
        opacity: 0.5;
        width: 0.26rem;
        height: 0.26rem;
        margin-left: 0.2rem;
    }

    .top-fendaohang .top-fendaohang-r {
        width: 17%;
        height: 0.4rem;
        float: left;
        text-align: right;
    }

    .top-fendaohang .top-fendaohang-r span {
        margin-right: 0.4rem;
    }


    /* 其他顶部导航样式 结束 */


    /* 顶部搜索 开始 */

    .top-sousuo {
        width: 66%;
        float: left;
        border-left: 0.04rem solid rgb(226, 226, 226);
        padding-left: 0.2rem;
    }

    .top-sousuo input {
        border: none;
        outline: none;
        line-height: 0.44rem;
        vertical-align: top;
        font-size: 0.24rem;
    }


    /* 顶部搜索 结束 */
</style>