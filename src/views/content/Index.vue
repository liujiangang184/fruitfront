<template>
    <div>
        <my-header></my-header>
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <van-swipe :autoplay="3000" indicator-color="white" style="margin-top: 1.3rem">
                <van-swipe-item>
                    <a href="">
                        <img src="./img/banner-img2.jpg" alt="">
                    </a>
                </van-swipe-item>
                <van-swipe-item>
                    <a href="">
                        <img src="./img/banner-img3.jpg" alt="">
                    </a>
                </van-swipe-item>
                <van-swipe-item>
                    <a href="">
                        <img src="./img/banner-img2.jpg" alt="">
                    </a>
                </van-swipe-item>
            </van-swipe>
            <my-index></my-index>
            <!-- 优选开始 -->
            <div v-if="cateGoods.length">
                <div class="youxuan" v-for="cate in cateGoods" :key="cate.id">
                    <div class="temai-text">
                        <router-link tag="span" :to="{path:'/Goods',query:{id:cate.id}}">{{cate.cname}}</router-link>
                        <img src="../../assets/img/index/right.png" alt="">
                    </div>
                    <div class="temai-img">
                        <div class="img-item">
                            <img :src="imgHostName+cate.thumb" :alt="cate.cname" :title="cate.cname">
                        </div>
                    </div>
                    <ul class="furit-list">

                        <li class="fruit-item" v-for="goods in cate.goods" :key="goods.id">
                            <div class="fruit-img">
                                <router-link :to="{path:'/detail'}">    </router-link>
                                <img :src="imgHostName+goods.gthumb" alt="">

                            </div>
                            <div class="fruit-title">{{goods.gname}}</div>
                            <div class="fruit-price">￥{{goods.sale}}
                                <del style="font-size: 12px;color: #979797; margin-left:0.04rem;">￥{{goods.mprice}}
                                </del>
                            </div>
                        </li>

                    </ul>
                </div>
            </div>
        </van-pull-refresh>
        <!-- 优选结束 -->
        <my-footer></my-footer>
    </div>
</template>

<script>
    import {HOSTNAME, FAIL, SUCCESS, IMAGEHOST} from "../../config/base";
    import MyHeader from '../../components/my-header/my-header'
    import MyFooter from '../../components/my-footer/my-footer'
    import MyIndex from '../../components/my-index/my-index'

    export default {
        name: "Index",
        components: {
            MyHeader,
            MyFooter,
            MyIndex
        },
        data() {
            return {
                isLoading: false,
                imgHostName: IMAGEHOST,
                cateGoods: [
                    {id: '', cname: '', thumb: '', goods: [{id: '', gthumb: '', sale: '', mprice: '', gname: ''}]}
                ]
            }
        },
        methods: {
            getCate() {
                fetch(HOSTNAME + '/api/index', {
                    method: 'GET',
                    headers: {
                        'content-type': 'application/json',
                    }
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.code == SUCCESS) {
                            this.cateGoods = data.data;
                        } else if (data.code == FAIL) {
                            console.log(data.msg);
                        }
                    })
            },
            onRefresh() {
                setTimeout(() => {
                    this.$toast('刷新成功');
                    this.isLoading = false;
                }, 500);
            },
        },
        beforeMount() {
            this.getCate();
        }
    }
</script>

<style scoped>
    /* 优选开始 */

    .youxuan {
        width: 100%;
        height: 7.14rem;
        background-color: #fff;
        margin-top: 0.1rem;
    }

    .temai-text {
        width: 100%;
        height: 0.9rem;
        text-align: center;
        font-size: 0.32rem;
        line-height: 0.9rem;
    }

    .temai-text > img {
        width: 0.3rem;
        height: 0.3rem;
        margin-left: 0.1rem;
    }

    .youxuan > .temai-img {
        width: 100%;
        height: 2.36rem;
        padding: 0 3% 0.2rem 3%;
        box-sizing: border-box;
    }

    .youxuan > .temai-img > .img-item {
        width: 100%;
        height: 100%;
    }

    .youxuan > .temai-img > .img-item > img {
        width: 100%;
        height: 100%;
        border-radius: 1rem;
        display: block;
        margin: 0 auto;
    }

    .furit-list {
        width: 100%;
        height: 3.88rem;
        display: flex;
        justify-content: space-between;
    }

    .furit-list > .fruit-item {
        width: 33.333333%;
        height: 1.5rem;
    }

    .fruit-item > .fruit-img {
        width: 100%;
        height: 100%;
    }

    .fruit-item > .fruit-img > img {
        width: 60%;
        height: 100%;
        display: block;
        margin: 0.01rem auto;
    }

    .fruit-item > .fruit-title {
        width: 100%;
        padding: 0 5%;
        box-sizing: border-box;
        height: 0.8rem;
        line-height: 0.4rem;
        font-size: 0.28rem;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
    }

    .fruit-item > .fruit-price {
        width: 100%;
        padding: 0 5%;
        box-sizing: border-box;
        font-size: 14px;
        color: #EA4D13;
        line-height: 0.36rem;
        height: 0.8rem;
        margin-top: 0.16rem;
    }

    .fruit-item > .zeng {
        width: 100%;
        height: 0.36rem;
        padding: 0 5%;
        box-sizing: border-box;
    }


    /* 优选结束 */
    .van-swipe {
        height: 160px;
    }

    .van-swipe .van-swipe-item {
        width: 100%;
        height: 100%;
    }

    .van-swipe .van-swipe-item a {
        width: 100%;
        height: 100%;
        display: block;
    }

    .van-swipe .van-swipe-item a img {
        width: 100%;
        height: 100%;
    }

    .special-sale {
        width: 100%;
        margin-top: 0.1rem;
        background-color: #fff;
    }

    .sale-title {
        width: 100%;
        text-align: center;
        background-color: #fff;
        height: 0.9rem;
        justify-content: center;
        display: flex;
        align-items: center;
        margin: 60px auto;
    }


    .sale-title > .brand-text {
        font-size: 0.32rem;
        display: inline-block;
        line-height: 0.9rem;
    }

    .sale-title > .brand-img {
        width: 0.36rem;
        height: 0.36rem;
        display: inline-block;
    }

    .sale-title > .brand-img > img {
        width: 100%;
        height: 100%;
        margin-left: 0.1rem;
    }

    .special-sale > .sale-goods {
        width: 94%;
        padding: 0px 3% 0.2rem 3%;
        background-color: #fff;
    }

    .special-sale > .sale-goods > .sale-box2 {
        display: inline-block;
        float: left;
        width: 33.3%;
        text-align: center;
    }

    .special-sale > .sale-goods > .sale-box2 > img {
        width: 93%;
        display: inline-block;
    }

    .brand-box {
        margin-top: 0.1rem;
    }

    .brand-box > .brand-banner {
        width: 94%;
        padding: 0 3% 0.2rem 3%;
        background-color: #fff;
    }

    .brand-box > .brand-banner > img {
        width: 100%;
        border-radius: 1rem;
    }

    .brand-box > .goods-list {
        width: 100%;
        padding: 0 3%;
        box-sizing: border-box;
    }

    .brand-box > .goods-list > .item {
        width: 33.3%;
        float: left;
        background-color: #fff;
    }

    .brand-box > .goods-list > .item > .good-img {
        width: 100%;
        float: left;
        text-align: center;
    }

    .brand-box > .goods-list > .item > .good-img > img {
        width: 60%;
        display: inline-block;
        margin: 0.1rem 0;
    }

    .brand-box > .goods-list > .item > .good-name {
        display: inline-block;
        width: 90%;
        padding: 0 0.1rem;
        line-height: 0.4rem;
        height: 0.4rem;
        font-size: 0.28rem;
        -webkit-display: webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
    }

    .brand-box > .goods-list > .item > .good-tab {
        width: 90%;
        height: 0.36rem;
        padding: 0 5%;
    }

    .brand-box > .goods-list > .item > .good-tab > span {
        display: inline-block;
        padding: 0 0.14rem;
        font-size: 0.24rem;
        color: #fff;
        background-color: #ff8950;
        border-radius: 0.06rem;
        height: 0.36rem;
        line-height: 0.36rem;
        margin-top: 0.04rem;
    }

    .brand-box > .goods-list > .item > .good-price {
        float: left;
        color: #ea4d13;
        width: 90%;
        margin-top: 0.16rem;
        padding: 0 0.1rem;
        line-height: 18px;
        height: 0.8rem;
    }

    .brand-box > .goods-list > .item > .good-price > i {
        font-size: 0.24rem;
        color: #979797;
        text-decoration: line-through;
        margin-left: 0.04rem;
    }

    /* 金刚区开始 */

    .classify-menu {
        width: 100%;
        display: flex;
        align-items: center;
        background: #fff;
        padding-bottom: 0.3rem;
    }

    .classify-menu > .item-icon {
        display: block;
        width: 25%;
        text-align: center;
        margin-top: 0.3rem;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
    }

    .classify-menu > .item-icon > .menu-img1 {
        width: 1rem;
        height: 1rem;
        display: inline-block;
        border-radius: 50%;
        background-color: #9bcbb5;
    }

    .classify-menu > .item-icon > .menu-img1.two {
        background-color: #E6C3BD;
    }

    .classify-menu > .item-icon > .menu-img1.three {
        background-color: #EED0B8;
    }

    .classify-menu > .item-icon > .menu-img1.four {
        background-color: #8CB2C5;
    }

    .classify-menu > .item-icon > .menu-img1 > img {
        width: 0.52rem;
        height: 0.52rem;
        margin-top: 0.24rem;
    }

    .classify-menu > .item-icon > .menu-text1 {
        margin-top: 0.2rem;
        font-size: 0.28rem;
        color: #232326;
    }

    .dayBuy {
        width: 0.52rem;
        height: 0.52rem;
        margin-top: 0.24rem;
    }
</style>
