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
                    <span class="span-icon" id="span-icon-black">购物车</span>
                </div>
            </a>
            <a href="">
                <div class="top-fendaohang-r">
                    <span class="span-icon" id="span-icon-black">编辑</span>
                </div>
            </a>
        </div>
        <!--    收货时间制作开始-->
        <div class="time_box">
            <div class="time">
                <div class="time_left">
                    <p>收货时间</p>
                </div>
                <div class="time_right">
                    <div class="time_right_txt">
                        <p>今天30分钟可送达（可预订）</p>
                    </div>
                    <div class="time_right_icon">
                        <i class="iconfont iconzuoyoujiantou1"></i>
                    </div>
                </div>
            </div>
        </div>
        <!--    收获时间制作结束-->
        <!--    商品卡片一制作开始-->
        <div class="goodCar_list" v-if="cart">
            <div class="good-card_box" v-for="goods in cart.goods" :key="goods.id">
                <div class="good-card">
                    <div class="good-card_circle_box">
                        <div class="good-card_circle" @click="toggleStatus(goods)">
                            <img :style="{display:goods.status?'block':'none'}" src="../../assets/img/Car/check4.png"
                                 alt="">
                        </div>
                    </div>
                    <div class="good-card_img_box">
                        <div class="good-card_img">
                            <img :src="imageHost+goods.gthumb" :alt="goods.gname" :title="goods.gname">
                        </div>
                    </div>
                    <div class="good-card_txt_box">
                        <div class="good-card_title">
                            <p class="gname">{{goods.gname}}</p>
                        </div>
                        <div class="good-card_price">
                            <span>￥</span>
                            <p>{{goods.sale}}</p>
                        </div>
                        <div class="good-card_num">
                            <div class="good-card_num_del">
                                <img src="../../assets/img/Car/subtract.png" alt="">
                            </div>
                            <div class="good-card_num_txt" name="num1">{{goods.num}}</div>
                            <div class="good-card_num_add" @click="addGoods(goods)">
                                <img src="../../assets/img/Car/add.png" alt="">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--    商品卡片一制作结束-->
        <!--    结算 制作开始-->
        <div class="shopTotal_box" v-if="cart">
            <div class="shopTotal">
                <div class="shopTotal_left">
                    <div class="shopTotal_circle" :class="{active:isFullSelected}">
                        <img src="../../assets/img/Car/check4.png" alt="">
                    </div>
                    <div class="shopTotal_txt">
                        <div>全选</div>
                        <div>合计:<span>￥</span></div>
                        <div>0.00</div>
                        <div>总数:<span></span></div>
                        <div>0.00</div>
                    </div>
                </div>
                <div class="shopTotal_right">
                    <div class="shopTotal_btn" :class="{active:existSelectGoods}" @click="settlement">
                        去结算
                    </div>
                </div>
            </div>
        </div>
        <div class="kongs"></div>
        <!--    结算 制作结束-->
        <my-footer></my-footer>
        <div></div>
    </div>
</template>

<script>
    import vue from 'vue'
    import MyFooter from '../../components/my-footer/my-footer'
    import {IMAGEHOST} from "../../config/base";
    import {mapState, mapGetters} from 'vuex'
    import {SUCCESS} from "../../config/base";
    import {addCart,toggleGoodsStatus} from "../../api/cart";
    import {Toast} from 'vant'


    vue.use(Toast);
    export default {
        name: "Cart",
        components: {
            MyFooter,
        },
        data() {
            return {
                imageHost: IMAGEHOST,
            }
        },
        methods: {
            addGoods(item) {
                let {id, sale, gname, gthumb} = item;
                addCart('/api/cart', {gid: id, sale}).then(res => {
                    if (res.code == SUCCESS) {
                        // 修改Vuex cart
                        let {uid, cid} = res.data;
                        this.$store.commit('incGoods', {uid, cid, gid: id, gname, sale, gthumb});
                        this.$store.commit('calcTotal');
                        this.$store.commit('calcPrice');
                    }
                })
            },
            toggleStatus(goods){
                let {gid,sale}=goods;
                toggleGoodsStatus('/api/cart/12',{gid,sale}).then(res=>{
                    if (res.code==SUCCESS){
                        this.$store.commit('toggleGoodsStatus',{gid});
                        this.$store.commit('calcTotal');
                        this.$store.commit('calcPrice');
                    }
                })
            },
            settlement(){
                if (!this.existSelectGoods) {
                    Toast('请至少选中一件商品');
                    return;
                }
            }
        },
        computed: {
            ...mapState({
                cart: 'cart',

            }),
            ...mapGetters({
                isFullSelected: (['isFullSelected']),
                existSelectGoods:(['existSelectGoods'])
            })
        }
    }
</script>

<style scoped>
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

    #span-icon-black {
        color: #000;
        display: inline-block;
        font-size: 0.32rem;
    }

    .top-fendaohang .top-fendaohang-r span {
        margin-right: 0.4rem;
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

    .time_box {
        width: 100%;
        height: 0.8rem;
        margin-bottom: 0.1rem;
        font-size: 0.28rem;
        background-color: #fff;
        margin-top: 1rem;
    }

    .time {
        width: 7.02rem;
        height: 100%;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .time_right {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .time_right_txt {
        color: #379EDE;
    }

    .time_right_icon > .iconzuoyoujiantou1 {
        color: rgba(126, 126, 121, 0.5);
    }

    .goodCar_list {
        width: 100%;
        padding-bottom: 1rem;
        margin-top: 1rem;
    }

    .good-card_box {
        width: 100%;
        height: 2.62rem;
        background-color: #FFFFFF;
        border-top: 1px solid #F9F9F9;
    }

    .good-card {
        width: 7.02rem;
        height: 100%;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .good-card_circle_box {
        width: 0.6rem;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .good-card_circle {
        width: 0.42rem;
        height: 0.42rem;
        border-radius: 50%;
        border: solid 0.03rem rgba(154, 154, 152, 0.4);
        line-height: 0.42rem;
        text-align: center;
    }

    .good-card_circle > img {
        width: 0.44rem;
        height: 0.44rem;
        display: none;
    }

    .good-card_img_box {
        width: 2rem;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .good-card_img {
        width: 2rem;
        height: 2.1rem;
    }

    .good-card_img > img {
        width: 100%;
        height: 100%;
    }

    .good-card_txt_box {
        width: 4.4rem;
        height: 100%;
        padding: 0.15rem 0;
        box-sizing: border-box;
        overflow: hidden;
    }

    .good-card_title {
        line-height: 0.42rem;
        color: #333;
        font-size: 0.33rem;
    }

    .good-card_price {
        color: #FF9201;
        margin-top: 0.1rem;
        font-size: 0.44rem;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .good-card_num {
        width: 1.8rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 0.1rem;
    }

    .good-card_num_del {
        width: 0.6rem;
        height: 0.6rem;
    }

    .good-card_num_del > img {
        width: 100%;
        height: 100%;
    }

    .good-card_num_txt {
        width: 0.6rem;
        line-height: 0.6rem;
        text-align: center;
    }

    .good-card_num_add {
        width: 0.6rem;
        height: 0.6rem;
    }

    .good-card_num_add > img {
        width: 100%;
        height: 100%;
    }

    .sum_box {
        width: 100%;
        height: 0.84rem;
        background: #fff;

    }

    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        text-decoration: none;
        list-style: none;
    }

    .sum {
        width: 7.02rem;
        height: 100%;
        line-height: 0.84rem;
        margin: 0 auto;
        font-size: 0.28rem;
        border-top: 1px solid #F9F9F9;
        border-bottom: 1px solid #F9F9F9;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-top: 1rem;
    }

    .sum_txt {
        padding-right: 0.1rem;
    }

    .sum_price {
        font-weight: bolder;
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }

    .shopTotal_box {
        width: 100%;
        height: 0.92rem;
        background-color: #FFFFFF;
        overflow: hidden;
        position: fixed;
        left: 0;
        bottom: 1rem;
    }

    .shopTotal {
        width: 7.02rem;
        height: 100%;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .shopTotal_circle {
        width: 0.42rem;
        height: 0.42rem;
        border-radius: 50%;
        border: solid 0.03rem rgba(154, 154, 152, 0.4);
    }

    .shopTotal_circle > img {
        width: 100%;
        height: 100%;
        display: none;
    }

    .shopTotal_left {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .shopTotal_txt {
        text-align: center;
        line-height: 0.92rem;
    }

    .shopTotal_txt > div {
        display: inline-block;
    }

    .shopTotal_txt > div:nth-child(1) {
        padding-left: 0.1rem;
        font-size: 0.32rem;
        color: #000;

    }

    .shopTotal_txt > div:nth-child(2) {
        padding-left: 0.14rem;
        font-size: 0.28rem;
        color: #a3a3a3;
    }

    .shopTotal_txt > div:nth-child(3) {
        color: #ff9201;
        font-size: 0.32rem;
        font-weight: bolder;
    }

    .shopTotal_txt > div:nth-child(2) > span {
        padding-left: 0.15rem;
        font-size: 0.31rem;
        color: #a3a3a3;
    }

    .shopTotal_btn {
        padding: 0.1rem 0.25rem;
        background-color: #F6F6F4;
        color: #fff;
        font-size: 0.28rem;
        border-radius: 0.3rem;
    }
    .shopTotal_btn :active{
        background-color: #ff9201;
    }
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


    .gname {
        font-size: 0.32rem;
        line-height: 1.5;
        color: #333333;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        text-overflow: ellipsis;
        overflow: hidden;
    }
</style>