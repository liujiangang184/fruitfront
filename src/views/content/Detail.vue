<template>
    <div>
        <!-- 详情页头部开始 -->
        <div class="detail-header">
            <a href="./dayBuy.html">
                <div class="detail-point"></div>
            </a>
            <div class="detail-name">商品详情</div>

            <div class="detail-share"></div>

        </div>
        <!-- 详情页头部结束 -->
        <!--轮播图开始-->
        <div v-if="form">
            <van-swipe :autoplay="3000" indicator-color="white" @change="onChange">
                <van-swipe-item v-for="(item,index) in bannerArr" :key="index">
                    <a href="" style="width: 100%;height: 100%">
                        <img :src="imgHost + item" alt="" style="width: 100%;height: 100%">
                    </a>
                </van-swipe-item>
                <div class="custom-indicator" slot="indicator">
                    <div class="spot"></div>
                </div>
            </van-swipe>
            <!--轮播图结束-->
            <!-- 标题开始 -->
            <div class="detail-title">
                <div class="price">
                    <span class="text2"><del>原价:￥{{form.gprice}}</del></span>
                    <span class="text1">￥{{form.gsale}}</span>
                    <span class="text3">特价</span>
                </div>
                <div class="title">{{form.description}}</div>
            </div>
            <!-- 标题结束 -->
            <!-- 图文详情开始 -->
            <div class="display-title">商品详情</div>
            <div class="display-content">
            <span class="brand">
                <i>品牌：</i>
                {{form.brand}}
            </span><br>
                <span class="brand">
                <i>产品规格：</i>
                {{form.norms}}
            </span>
            </div>
            <div class="img-text">图文详情</div>
            <!-- 图文详情结束 -->
            <!-- 详情图片开始 -->
            <div class="detail-img" v-for="(item,index) in detailArr" :key="index">
                <img :src="imgHost + item" alt="">
            </div>
        </div>
        <!-- 详情图片结束 -->
        <!-- 详情页底部开始 -->
        <div class="detail-bottom">
            <a href="./index.html">
                <div class="Home-page-icon">
                    <div class="icon"></div>
                    <div class="word">首页</div>
                </div>
            </a>
            <a href="./buycar.html">
                <div class="shopping-car">
                    <div class="icon">
                        <div class="num-add"></div>
                    </div>
                    <div class="word">购物车</div>
                </div>
            </a>
            <div class="add-car">加入购物车</div>
            <div class="buy">立刻购买</div>
        </div>
        <!-- 详情页底部结束 -->
    </div>
</template>

<script>
    import {HOSTNAME, SUCCESS, FAIL, IMAGEHOST} from "../../config/base";

    export default {
        name: "detail",
        data() {
            return {
                form: [],
                imgHost: IMAGEHOST,
                bannerArr: [],
                detailArr: [],
                current: 0
            }
        },
        methods: {
            onChange(index) {
                this.current = index;
            },
            getGoods() {
                let gid = this.$route.query.gid;
                fetch(HOSTNAME + '/api/detail/' + gid, {
                    method: 'GET',
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.code == SUCCESS) {
                            this.form = data.data;
                            this.bannerArr = data.data.gbanner.split(',');
                            this.detailArr = data.data.gdetail.split(',');
                        } else if (data.code == FAIL) {
                            console.log(data.msg);
                        }
                    })
            },
        },
        beforeMount() {
            this.getGoods();
        }
    }
</script>

<style scoped>
    body {
        margin: 0;
        padding: 0;
    }

    i {
        font-style: normal;
    }

    ul,
    li {
        list-style: none;
    }

    a {
        text-decoration: none;
    }


    /* 详情页头部开始 */

    .detail-header {
        position: fixed;
        left: 0;
        top: 0;
        z-index: 20;
        box-sizing: border-box;
        padding: 0 3%;
        width: 100%;
        height: 0.9rem;
        display: flex;
        justify-content: space-between;
        background: #fff;
    }

    .spot {
        width: 0.15rem;
        height: 0.15rem;
        border-radius: 50%;
        background-color: darkgray;
    }

    .detail-point {
        width: 0.8rem;
        height: 0.9rem;
        background: url(../../assets/img/detail/arrow-left.png) no-repeat left center;
        background-size: 60%;
    }

    .detail-name {
        margin: 0 0.8rem;
        height: 100%;
        line-height: 0.9rem;
        font-size: 0.3rem;
        text-align: center;
        font-family: 'helvetica neue', tahoma, 'hiragino sans gb', stheiti, 'wenquanyi micro hei', \5FAE\8F6F\96C5\9ED1, \5B8B\4F53, sans-serif;
    }

    .detail-share {
        width: 0.8rem;
        height: 0.9rem;
        background: url(../../assets/img/detail/share.png) no-repeat right center;
        background-size: 50%;
    }


    /* 详情页头部结束 */

    .box {
        width: 100%;
        height: 0.9rem;
    }


    /* 详情页内容部分开始 */

    .detail-content {
        background-color: #f7f7f7;
    }

    /* 标题开始 */

    .detail-title {
        width: 100%;
        padding: 0 3% 0.3rem;
        box-sizing: border-box;
        border-top: 1px solid #f6f6f6;
        background-color: white;
    }

    .detail-title > .price {
        width: 100%;
        margin-bottom: 0.24rem;
    }

    .detail-title > .price > .text1 {
        font-size: 0.52rem;
        color: #ffb34e;
    }

    .detail-title > .price > .text2 {
        font-size: 0.24rem;
        color: #747474;
        margin: 0.24rem 0.1rem 0 0.1rem;
    }

    .detail-title > .price > .text3 {
        padding: 0 0.16rem;
        height: 0.36rem;
        line-height: 0.36rem;
        font-size: 0.24rem;
        color: white;
        margin-top: 0.18rem;
        background-color: #ffb34e;
    }

    .detail-title > title {
        width: 100%;
        margin-bottom: 0.24rem;
        line-height: 0.44rem;
        font-size: 0.32rem;
    }


    /* 标题结束 */


    /* 图文详情开始 */

    .display-title {
        width: 100%;
        height: 0.9rem;
        background-color: white;
        margin-top: 0.2rem;
        line-height: 0.9rem;
        text-align: center;
        border-bottom: 1px solid #f9f9f9;
        box-sizing: border-box;
    }

    .display-content {
        width: 100%;
        padding: 0.2rem 3%;
        box-sizing: border-box;
        background-color: white;
    }

    .display-content > .brand {
        width: 100%;
        font-size: 0.28rem;
        line-height: 0.6rem;
    }

    .display-content > .brand > i {
        color: #8a8d93;
    }

    .img-text {
        width: 100%;
        height: 0.9rem;
        background-color: white;
        margin-top: 0.2rem;
        line-height: 0.9rem;
        text-align: center;
        border-bottom: 1px solid #f9f9f9;
        box-sizing: border-box;
    }


    /* 图文详情结束 */

    /* 详情图片开始 */
    .detail-img {
        width: 100%;
        height: 7.5rem;
    }

    .detail-img > img {
        width: 100%;
        height: 100%;
    }

    .detail-wordFamily {
        width: 100%;
        height: 1rem;
        font-size: 0.4rem;
        color: black;
        line-height: 1rem;
        text-align: center;
        font-weight: bold;
    }

    /* 详情图片结束 */
    /* 详情页内容部分结束 */

    .box-2 {
        width: 100%;
        height: 1.2rem;
    }


    /* 详情页底部开始 */

    .detail-bottom {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 1.2rem;
        background-color: white;
    }

    .Home-page-icon {
        float: left;
        width: 17%;
        height: 1.2rem;
        text-align: center;
        font-size: 0.28rem;
    }

    .Home-page-icon > .icon {
        width: 0.56rem;
        height: 0.56rem;
        background: url(../../assets/img/detail/home2.png) no-repeat center center;
        background-size: 100%;
        margin-top: 0.14rem;
        display: inline-block;
    }

    .Home-page-icon > .word {
        width: 100%;
        font-size: 0.28rem;
        color: #828282;
    }

    .shopping-car {
        float: left;
        width: 17%;
        height: 1.2rem;
        text-align: center;
        font-size: 0.28rem;
    }

    .shopping-car > .icon {
        width: 0.56rem;
        height: 0.56rem;
        background: url(../../assets/img/detail/shop-cart1.png) no-repeat center center;
        background-size: 100%;
        margin-top: 0.14rem;
        display: inline-block;
    }

    .shopping-car > .icon > .num-add {
        width: 0.3rem;
        height: 0.3rem;
        background-color: red;
        border-radius: 50%;
        font-size: 0.24rem;
        color: white;
        display: none;
    }

    .shopping-car > .word {
        width: 100%;
        font-size: 0.28rem;
        color: #828282;
    }

    .add-car {
        float: left;
        width: 33%;
        height: 1.2rem;
        background-color: black;
        color: #eeeeee;
        font-size: 0.32rem;
        line-height: 1.2rem;
        text-align: center;
    }

    .buy {
        float: left;
        width: 33%;
        height: 1.2rem;
        background-color: #ffb34e;
        color: #eeeeee;
        font-size: 0.32rem;
        line-height: 1.2rem;
        text-align: center;
    }


    /* 详情页底部结束 */
</style>