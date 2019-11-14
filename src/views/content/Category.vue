<template>
    <div>
        <my-header></my-header>
        <!-- 分类选项卡开始 -->
        <main class="main">
            <ul class="list">
                <div class="list-box">
                    <van-list>
                        <div class="van-cell" style="display: none"></div>
                        <van-cell v-for="item in categorys" :key="'categorys'+item.id"
                                  @click="changeCate(item.id)" :class="{active:item.id==currentCate}"
                        >
                            <li> {{item.cname}}</li>
                        </van-cell>
                    </van-list>
                </div>
            </ul>
            <ul class="list-right" ref="container">
                <div class="list-right-box">
                    <van-sticky :offset-top="50">
                        <div class="content-top">
                            <span class="heise">综合排序</span>
                            <span class="price">按价格
                                <img src="image/sort/quanhui.png" alt="">
                                <img src="image/sort/topy.png" class="topy" style="display:none;" alt="">
                                <img src="image/sort/downy.png" class="downy" style="display:none;" alt="">
                        </span>
                            <span class="top-sort">分类</span>
                        </div>
                    </van-sticky>
                    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
                        <van-list
                                v-model="loading"
                                :finished="finished"
                                finished-text="没有更多了"
                                @load="onLoad"
                                :immediate-check="false"
                        >
                            <van-cell
                                    v-for="item in goods"
                                    :key="'goods'+item.id"
                            >
                                <li class="content-item">
                                    <router-link :to="{name:'detail',query:{id:item.id}}" class="tupian">
                                        <img v-lazy="imgHostName+item.gthumb" :alt="item.gname" :title="item.gname">
                                    </router-link>
                                    <div class="chanpin-information">
                                        <a href="" class="infor-top">{{item.gname}}</a>
                                        <div class="infor-bottom">
                                            <div class="infor-bottom-left">
                                                ￥{{item.sale}}
                                            </div>
                                            <div class="infor-bottom-right">
                                                <span class="jian">
                                                    <img src="../../assets/img/classify/subtract.png" alt="">
                                                </span>
                                                <span class="num">{{$store.getters.goodsNumber(item.id)}}</span>
                                                <span class="jia" @click="addGoods(item)">
                                                    <img src="../../assets/img/classify/add.png" alt="">
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </van-cell>
                        </van-list>
                    </van-pull-refresh>
                </div>
            </ul>
        </main>
        <my-footer :active="2"></my-footer>
    </div>
</template>

<script>
    import Vue from 'vue'
    import {Lazyload, Sticky} from 'vant';
    import {addCart} from "../../api/cart";

    Vue.use(Lazyload);
    Vue.use(Sticky);
    import MyHeader from '../../components/my-header/my-header';
    import MyFooter from '../../components/my-footer/my-footer';
    import axios from 'axios'
    import {SUCCESS, HOSTNAME, IMAGEHOST} from "../../config/base";

    export default {
        name: "Category",
        components: {
            MyHeader, MyFooter
        },
        data() {
            return {
                imgHostName: IMAGEHOST,
                categorys: [],
                isLoading: false,
                loading: false,
                finished: false,
                currentCate: 0,
                goods: [],
                current: 0,
                limit: 5,
                total: 0,
                container: null
            }
        },
        methods: {
            getCateGoods() {
                axios.get(HOSTNAME + '/api/category')
                    .then(res => {
                        let data = res.data;
                        if (data.code == SUCCESS && data.data) {
                            this.categorys = data.data;
                            this.currentCate = this.categorys[0].id;
                        }
                    })
            },
            changeCate(id) {
                this.currentCate = id;
            },
            onRefresh() {
                setTimeout(() => {
                    this.$toast('刷新成功');
                    this.isLoading = false;
                    this.count++;
                }, 500);
            },
            onLoad() {
                this.current++;
                axios.get(HOSTNAME + '/api/good', {
                    params: {
                        page: this.current,
                        limit: this.limit,
                        cid: this.currentCate
                    }
                }).then(res => {
                    let data = res.data;
                    if (data.code === SUCCESS) {
                        !this.total && (this.total = Math.ceil(data.total / this.limit));
                        this.goods.push(...data.goods);
                    }

                    this.$nextTick(() => {
                        this.isLoading = false;
                        this.loading = false;
                    });
                    if (this.current >= this.total) {
                        this.finished = true;
                    }
                })
            },
            addGoods(item) {
                let {id,sale,gname,gthumb}=item;
                addCart('/api/cart', {gid:id,sale}).then(res=>{
                    if (res.code==SUCCESS){
                        // 修改Vuex cart
                        let {uid,cid}=res.data;
                        this.$store.commit('incGoods',{uid,cid,gid:id,gname,sale,gthumb});
                        this.$store.commit('calcTotal');
                        this.$store.commit('calcPrice');
                    }
                })
            }
        },
        beforeMount() {
            this.getCateGoods();
        },
        mounted() {
            this.container = this.$refs.container;
        },
        watch: {
            currentCate() {
                this.current = 0;
                this.total = 0;
                this.goods = [];
                this.finished=false;
                this.onLoad();
            }
        }
    }
</script>

<style scoped>
    /* 分类选项卡开始 */
    a {
        text-decoration: none;
        color: #333;
    }

    .main {
        width: 100%;
        height: calc(100vh - 2.12rem);
    }


    ul.list {
        width: 2.4rem;
        height: 100%;
        border-right: 1px solid #F4F4F4;
        box-sizing: border-box;
        float: left;
        overflow-y: scroll;
        margin-top: 1.3rem;
    }

    li.item {
        position: relative;
        width: 100%;
        height: 0.8rem;
        text-align: center;
        line-height: 0.8rem;
        color: black;
        font-size: 0.28rem;
        border-top: 1px solid #F4F4F4;
    }

    li.item:nth-child(12) {
        border-bottom: 1px solid #f4f4f4;
    }

    .list-right {
        position: relative;
        float: right;
        width: 5.1rem;
        height: 100%;
        overflow-y: scroll;
        margin-top: 1.3rem;

    }

    .content-top {
        width: 5.1rem;
        height: 0.8rem;
        border-top: 1px solid #f4f4f4;
        display: flex;
        justify-content: space-around;
        align-items: center;
        font-size: 0.24rem;
        color: black;
        background-color: white;
        border-bottom: 1px solid #f4f4f4;
        z-index: 999;
        border-left: 1px solid #f4f4f4;
    }

    .price img {
        width: 0.3rem;
        height: 0.3rem;
        display: inline-block;
        background-size: 100%;
        vertical-align: middle;
        margin-top: -3px;
        position: fixed;
        top: 1.26rem;
        left: 5.5rem;
    }

    .bianse {
        color: #FF9201;
    }

    .content-item {
        width: 5.1rem;
        height: 1.7rem;
        border-bottom: 1px solid #f4f4f4;
    }

    .content-bottom > .content-item:nth-child(1) {
        margin-top: 0.81rem;
    }

    .tupian {
        width: 1.6rem;
        height: 1.6rem;
        float: left;
    }

    .tupian img {
        width: 1.2rem;
        height: 1.2rem;
        display: inline-block;
        margin-top: 0.2rem;
    }

    .tupian img .img {
        width: 100%;
    }

    .chanpin-information {
        width: 3.5rem;
        height: 1.5rem;
        float: left;
        line-height: 0.4rem;
        text-align: left;
        font-size: 0.27rem;
        overflow: hidden;
        margin-top: 0.1rem;
    }

    .infor-top {
        width: 3.5rem;
        height: 0.8rem;
    }

    .infor-bottom {
        width: 3.5rem;
        height: 0.8rem;
    }

    .infor-bottom-left {
        float: left;
        line-height: 0.8rem;
        color: #FF9201;
        font-size: 0.28rem;
    }

    .infor-bottom-right {
        float: right;
        width: 1.2rem;
        height: 0.8rem;
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin-right: 35px;
    }

    .infor-bottom-right .jian {
        display: block;
        width: 0.4rem;
        height: 0.4rem;
        /*background: url(./img/thumb/-.png) no-repeat center center;*/
        background-size: 100%;
    }

    .num {
        font-size: 0.28rem;
        line-height: 0.4rem;
        width: 0.4rem;
        border: none;
        outline: none;
        text-align: center;
    }

    .infor-bottom-right .jia {
        display: block;
        width: 0.4rem;
        height: 0.4rem;
        /*background: url(./img/thumb/+.png) no-repeat center center;*/
        background-size: 100%;
    }


    /* 下拉菜单开始 */

    .classify {
        width: 5.1rem;
        height: 1.5rem;
        padding-top: 0.1rem;
        box-sizing: border-box;
        border-bottom: 0.02rem solid #EFEAEE;
        position: fixed;
        top: 1.75rem;
        right: 0;
        background-color: #fff;
        border-left: 1px solid #F4F4F4;
        display: none;
        transition: all 2s;
    }

    .classify span {
        width: 30%;
        text-align: center;
        border: 0.02rem solid #EFEFEF;
        font-size: 0.24rem;
        height: 0.44rem;
        line-height: 0.44rem;
        margin-bottom: 0.2rem;
        border-radius: 0.06rem;
        float: left;
        margin-left: 2%;
    }

    .classify > .all {
        color: #FF9201;
        border-color: #FF9201;
    }

    .pitch:after {
        content: "";
        width: 0.06rem;
        height: 0.6rem;
        background-color: #FF9201;
        position: absolute;
        top: 0.1rem;
        left: 0;
    }


    .van-cell.active::after {
        content: '';
        width: 0.06rem;
        height: 0.6rem;
        position: absolute;
        left: 0.06rem;
        top: 0.1rem;
        background: #42b983;
    }

    .van-sticky--fixed {
        left: 2.4rem;
    }

    /* 下拉菜单结束 */

    /* 分类选项卡结束 */
</style>
<style>
    .van-sticky--fixed {
        left: 2.4rem;
    }
    .center-item-num {
        float: right;
        margin-top: 0.3rem;
        margin-right: 0.1rem;
    }

    .jian {
        width: 0.4rem;
        height: 0.4rem;
        float: left;
    }

    .jia {
        width: 0.4rem;
        height: 0.4rem;
        float: right;
    }

    .jian>img {
        width: 100%;
    }

    .jia>img {
        width: 100%;
    }

    .shuliang {
        text-align: center;
        font-size: 0.28rem;
        line-height: 0.4rem;
        float: left;
    }
</style>