<template>
    <div>
        <div class="top-fendaohang">
            <a href="index.html">
                <div class="top-fendaohang-l">
                    <img src="../../assets/img/public/左箭头.png" alt="" id="img-icon-wuauto">
                </div>
            </a>
            <a href="">
                <div class="top-fendaohang-c">
                    <span class="span-icon" id="span-icon-black">{{cname}}</span>
                </div>
            </a>
            <a href="">
                <div class="top-fendaohang-r">
                </div>
            </a>
        </div>
        <div class="banner">
            <img src="../../assets/img/index/sg.jpg" alt="">
        </div>
        <!--商品列表开始-->
        <van-pull-refresh v-model="isLoading" @refresh="getGood(id)">
            <div
                    class="cp-box"
                    v-for="item in goods"
                    :key="'goods'+ item.id"
            >
                <div class="cp-box-img">
                    <img src="" style="width: 100%" alt="">
                </div>
                <div class="cp-box-left">
                    <img :src="imgHost + item.gthumb" :alt="item.gname" :title="item.gname">
                </div>
                <div class="cp-box-right">
                    <div class="cp-box-right-top">
                        <span>{{item.gname}}</span>
                    </div>
                    <div class="cp-box-right-center">
                        ￥{{item.sale}}
                        <i>￥{{item.mprice}}</i>
                    </div>
                    <button class="btn">
                        <router-link :to="{name:'detail',query:{gid:item.gid}}">立即购买</router-link>
                    </button>
                </div>
            </div>
        </van-pull-refresh>
    </div>
</template>

<script>
    import {HOSTNAME, SUCCESS, IMAGEHOST} from "../../config/base";
    import axios from 'axios';

    export default {
        name: "List",
        data() {
            return {
                getGoodsItem: [],
                imgHost: IMAGEHOST,
                thumb: '',
                cname: '',
                goods: [],
                id: 0,
                isLoading: false,
                current: 0,
                limit: 3,
                total: 0
            }
        },
        methods: {
            getGood() {
                this.isLoading = true;
                this.current++;
                if (this.current > 1 && this.current > this.total) {
                    this.isLoading = false;
                    this.$toast('暂无数据');
                    return;
                }
                axios.get(HOSTNAME + '/api/Goods', {
                    params: {
                        cid: this.id,
                        page: this.current,
                        limit: this.limit
                    }
                }).then(res => {
                    if (res.data.code == SUCCESS) {
                        let {total, goods} = res.data;
                        !this.total && (this.total = Math.ceil(total / this.limit));
                        // this.goods = this.goods.concat(goods);
                        this.goods.push(...goods);
                        this.$nextTick(() => {
                            this.isLoading = false;
                        })
                        // Array.prototype.push.apply(this.goods,goods)
                    }
                })
            },
            getCategory(id) {
                axios.get(HOSTNAME + '/api/category/' + id)
                    .then(res => {
                        if (res.data.code == SUCCESS) {
                            this.thumb = res.data.data.thumb;
                            this.cname = res.data.data.cname;
                            // console.log(this.category);
                        }
                    })
            }
        },
        mounted() {
            this.id = this.$route.query.id;
            console.log(this.id);
            this.getCategory(this.id);
            this.getGood();
            setTimeout(() => {
                this.$toast('刷新成功');
                this.isLoading = false;
            }, 500);
        }

    }
</script>

<style scoped>
    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        text-decoration: none;
        list-style: none;
    }

    #img-icon-wuauto {
        display: block;
        width: 0.4rem;
        height: 0.4rem;
        opacity: 0.5;
        margin-left: 0.2rem;
    }

    .top-fendaohang .top-fendaohang-c {
        width: 66%;
        float: left;
        height: 0.4rem;
        line-height: 0.4rem;
        text-align: center;
    }

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

    .top-fendaohang .top-fendaohang-l {
        width: 17%;
        height: 0.4rem;
        float: left;
    }

    #span-icon-black {
        color: #000;
        display: inline-block;
        font-size: 0.32rem;
    }

    .banner {
        width: 100%;
        overflow: hidden;
    }

    .banner > img {
        width: 100%;
        overflow: hidden;
    }

    .cp-box {
        position: relative;
        width: 94%;
        margin: 0.2rem 3% 0px 3%;
        float: left;
        height: 2.8rem;
        border: 1px solid #DEDEDE;
        display: block;
    }

    .cp-box-left {
        width: 2.8rem;
        height: 2.8rem;
        float: left;
    }

    .cp-box-left img {
        width: 2rem;
        height: 2rem;
        display: block;
        margin: 0.4rem auto;
    }

    .cp-box-right {
        width: calc(100% - 2.8rem);
        height: 2.8rem;
        float: left;
    }

    .cp-box-right-top {
        width: 95%;
        float: left;
        height: .8rem;
        line-height: 20px;
        font-size: .28rem;
        margin-top: .4rem;
    }

    .cp-box-right-center {
        width: 95%;
        float: left;
        margin-top: .1rem;
        font-size: .32rem;
        color: #EF7D00;
        height: .4rem;
    }

    .cp-box-right-center i {
        margin-left: .1rem;
        font-size: .28rem;
        color: #8D8D8D;
        text-decoration: line-through;
    }

    .btn {
        padding: 0 .3rem;
        float: left;
        height: .56rem;
        line-height: .56rem;
        border: none;
        outline: none;
        background: #F47C02;
        color: #fff;
        border-radius: .3rem;
        font-size: .28rem;
        margin-top: .16rem;
        margin-left: .2rem;
    }
    .btn a{
        color: white;
    }
    .cp-box-img {
        width: 1rem;
        height: 1rem;
        position: absolute;
        top: 0px;
        left: 0px;
        z-index: 22;
    }

</style>