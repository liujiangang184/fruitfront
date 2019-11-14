<template>
    <div>
        <div class="minetop">
            <div class="me"></div>
            <p>www.jsdaima.com</p>
        </div>
        <ul class="mine-jg">
            <a href="pay.html">
                <li>
                    <img src="../../assets/img/mine/daifukuan.png" alt="">
                    <p>待付款</p>
                </li>
            </a>
            <a href="send.html">
                <li>
                    <img src="../../assets/img/mine/代发货.png" alt="">
                    <p>待发货</p>
                </li>
            </a>
            <a href="receive.html">
                <li>
                    <img src="../../assets/img/mine/个人中心-订单-待收货.png" alt="">
                    <p>待收货</p>
                </li>
            </a>
            <a href="comment.html">
                <li>
                    <img src="../../assets/img/mine/daipingjia.png" alt="">
                    <p>待评价</p>
                </li>
            </a>
            <a href="all.html">
                <li>
                    <img src="../../assets/img/mine/全部订单.png" alt="">
                    <p>全部订单</p>
                </li>
            </a>
        </ul>

        <!-- 优惠券 -->
        <a href="">
            <div class="mine-youhui">
                <img src="../../assets/img/mine/youhuijuan.png" alt="">
                <span>我的优惠券</span>
            </div>
        </a>
        <a href="receivingAddressList.html">
            <div class="mine-youhui">
                <img src="../../assets/img/mine/地址管理.png" alt="">
                <span>收货地址</span>
            </div>
        </a>

        <a href="">
            <div class="mine-youhui">
                <img src="../../assets/img/mine/售后.png" alt="">
                <span>售后服务</span>
            </div>
        </a>

        <!-- 退出登录 -->
        <a href="">
            <div class="mine-tui">
                退出登录
            </div>
        </a>
        <my-footer></my-footer>
    </div>
</template>

<script>
    import {queryDetail} from "../../api/users";
    import {SUCCESS,IMAGEHOST} from "../../config/base";
    import MyFooter from '../../components/my-footer/my-footer';
    import Toast from 'vant'

    export default {
        name: "my",
        components:{
            MyFooter
        },
        data(){
            return{
                imagehost:IMAGEHOST,
            }
        },
        methods:{
            setDetail(){
                queryDetail('api/users/1').then(res=>{
                  let {code,msg,data}=res;
                  if (code==SUCCESS){
                      this.detail=data;
                      Toast(msg);
                  } else {
                        Toast(msg);
                  }
                })
            }
        },
        beforeMount() {
            this.setDetail();
        }
    }
</script>

<style scoped>
    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        list-style: none;
    }

    body {
        background: #F7F7F7;
    }

    .minetop {
        width: 100%;
        height: 2.6rem;
        background: url("../../assets/img/mine/mine-bg.jpg") no-repeat center center/100% 100%;
        padding: 0 3%;
        overflow: hidden;
    }

    .minetop .me {
        width: 1.4rem;
        height: 1.4rem;
        border-radius: 50%;
        background: url("../../assets/img/mine/mine-wo.jpg") no-repeat center center/100% 100%;
        margin-top: 0.6rem;
        float: left;
    }

    .minetop p {
        font-size: 0.32rem;
        float: left;
        margin-left: 0.1rem;
        line-height: 2.6rem;
        color: #fff;
    }

    .mine-jg {
        width: 100%;
        height: 1.52rem;
        padding: 0.3rem 3%;
        margin: 0.1rem 0;
        background: #fff;
        display: flex;
        justify-content: space-between;
    }

    .mine-jg a li {
        height: 0.92rem;
        font-size: 0.28rem;
        color: #797778;
        text-align: center;
    }

    .mine-jg a:last-child li img {
        width: 0.48rem;
        height: 0.48rem;
        margin-bottom: 0.1rem;
    }

    .mine-jg a:nth-child(4) li img {
        width: 0.48rem;
        height: 0.48rem;
        margin-bottom: 0.1rem;
    }

    .mine-jg a:nth-child(3) li img {
        width: 0.56rem;
        height: 0.56rem;
        margin-bottom: 0.01rem;
    }

    .mine-jg a li img {
        width: 0.52rem;
        height: 0.52rem;
        display: block;
        margin: 0 auto;
        margin-bottom: 0.06rem;
        opacity: 0.4;
    }

    .mine-youhui {
        width: 100%;
        height: 0.9rem;
        line-height: 0.9rem;
        padding-left: 3%;
        background: #fff;
        margin: 0.1rem 0;
        font-size: 0.28rem;
    }

    .mine-youhui img {
        width: 0.4rem;
        height: 0.4rem;
        margin-right: 0.2rem;
        float: left;
        margin-top: 0.22rem;
        opacity: 0.4;
    }

    .mine-youhui span {
        color: #797778;
        float: left;
    }

    .mine-tui {
        width: 90%;
        height: 0.84rem;
        line-height: 0.84rem;
        font-size: 0.28rem;
        color: #797778;
        border: 0.02rem solid #E6E6E6;
        border-radius: 0.1rem;
        margin: 0.2rem 5%;
        background: #fff;
        text-align: center;
    }
</style>