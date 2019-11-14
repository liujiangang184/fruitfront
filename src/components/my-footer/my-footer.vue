<template>
    <div>
        <div class="footer-tab">
            <ul>
                <a href="">
                    <li>
                        <router-link :to="{path:'/index'}">
                        <img src="./img/public/index.png" alt="" id="img-icon2">
                        <span class="span-icon" style="color: #FF9201">首页</span>
                        </router-link>
                    </li>
                </a>
                <a href="">
                    <li>
                        <router-link :to="{path:'/Category'}">
                        <img src="./img/public/search.png" alt="" id="img-icon2">
                        <span class="span-icon" >分类</span>
                        </router-link>
                    </li>
                </a>
                <a href="">
                    <li>
                        <router-link :to="{path:'/Cart'}">
                        <img src="./img/public/car.png" alt="" id="img-icon2">
                        <span class="span-icon" id="span-icon-color" style="color: #A8A3A7">购物车</span>
                        </router-link>
                    </li>
                </a>
                <a href="">
                    <li>
                        <router-link :to="{path:'/my'}">
                        <img src="./img/public/my.png" alt="" id="img-icon2">
                        <span class="span-icon">我的</span>
                        </router-link>
                    </li>
                </a>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "my-footer"
    }
</script>

<style scoped>
    #img-icon2 {
          display: block;
          width: 0.4rem;
          height: 0.4rem;
          margin: 0 auto;
          opacity: 0.5;
            color: #000;
      }
    dd, dl, dt, li, ol, ul {
        margin: 0;
        padding: 0;
        list-style: none;
    }
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
</style>