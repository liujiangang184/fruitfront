import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";
import {getCart} from "../api/cart";
import {SUCCESS} from "../config/base";

Vue.use(Vuex);
// state 数据唯一来源
// mutations 状态修改得唯一方法
/*
* cart:{}
* */
let store = new Vuex.Store({
    //
    state: {
        token: '',
        isShow: false,
        cart:null,

    },
    // 获取购物车里面某一件商品的数量
    getters: {
        goodsNumber:function (state) {
            return function (gid) {
                let num=0;
                if (!state.cart){
                    return 0;
                }
                let goods=state.cart.goods.filter(ele=>ele.gid==gid)[0];
                if (goods){
                    num=goods.num;
                }
                return num;
            }
        },
        goodsTotal(state){
            if (!state.cart){
                return;
            }
            return state.cart.total;
        },
        cartPrice(state){
            if (!state.cart){
                return;
            }
            return state.cart.price;
        },
        isFullSelected(state){
            return state.cart && state.cart.goods.every(ele=>ele.status);
        },
        existSelectGoods(state){
            let flag=state.cart && state.cart.goods.some(ele=>ele.status);
            return flag;
        }
    },
    mutations: {
        changeToken(state,token) {
            state.token = token;
        },
        toggleIsShow(state,bool){
            state.isShow=bool;
        },
        setCart(state,cart){
            state.cart=cart;
        },
        // 累加
        incGoods(state,payload){
            let {gid,gname,gthumb,sale}=payload;
            // 判断是否存在购物车
            if (!state.cart){
                // 初始化购物车
                state.cart={
                    cid:'',
                    total:1,
                    price:'sale',
                    uid:'',
                    goods:[
                        {gid:gid,num:1,status:1}
                    ]
                }
            }
            // 购物车里面是否存在这件商品
            let goods=state.cart.goods.filter(ele=>ele.gid==gid)[0];
            if (goods){
                // +1
                goods.num++;
            } else {
                // push
                state.cart.goods.push({gid:gid,num:1,status:1,gname,sale,gthumb});
            }
        },
        calcTotal(state){
            let total=0;
            let goods=state.cart.goods.filter(ele=>ele.status);
            if (goods.length>0){
                total = goods.map(ele=>ele.num).reduce((prev,current)=>prev+current);
            }
            state.cart.total=total;
        },
        calcPrice(state){
            let price=0;
            let goods=state.cart.goods.filter(ele=>ele.status);
            if (goods.length>0){
                price = goods.reduce(function (prev,current) {
                    return prev + current.sale * current.num
                },0)
            }
            state.cart.price=price;

        },
        toggleGoodsStatus(state,payload){
            let gid=payload.gid;
            let goods=state.cart.goods.filter(ele=>ele.gid==gid)[0];
            goods.status=!goods.status*1 ; //隐式类型转换
        }
    },
    // 异步操作
    actions:{
        setCart({commit}){
            getCart('/api/cart/12').then(res=>{
                if (res.code==SUCCESS){
                    let data=res.data?res.data:null;
                    commit('setCart',data);
                }
            })
        }
    },

    plugins:[createPersistedState()]
})
export default store;