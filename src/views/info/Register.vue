<template>
    <div  class="box" >
        <h1 style="text-align: center;color: white;padding-top: 1.3rem">果蔬鲜注册</h1>
        <van-cell-group>
            <van-field
                    v-model="form.nickname"
                    required
                    clearable
                    label="昵称"
                    right-icon="question-o"
                    placeholder="请输入昵称"
                    @click-right-icon="$toast('昵称只能输入一次，请谨慎')"
            ></van-field>
            <van-field
                    v-model="form.password"
                    required
                    type="password"
                    label="密码"
                    placeholder="请输入密码"
            ></van-field>
            <van-field
                    v-model="form.tel"
                    type="number"
                    label="手机号"
                    placeholder="请添加手机号"
                    required
            ></van-field>
            <van-button plain hairline type="info" style="width:6rem;margin-top: 0.5rem;letter-spacing: 1rem;padding-left: 0.8rem" @click="handleRegister">注册</van-button>
        </van-cell-group>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {Field} from 'vant';
    import {register} from '../../api/users'
    import {SUCCESS} from "../../config/base";

    Vue.use(Field);

    export default {
        name: "Register",
        data() {
            return {
                form:{
                    nickname: '',
                    password: '',
                    tel: ''
                }

            }
        },
        methods:{
            handleRegister(){
                register('/api/users',this.form).then(res=>{
                    let data = res.data;
                    if (data.code === SUCCESS) {
                        this.$router.push({name:'login'})
                    }
                })
            },
            login(){
                this.$router.push({name:'login'});
            }
        }
    }
</script>

<style scoped>

    .box{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        left: 0;
        padding-top: 0.5rem;
        width: 100%;
        height: 100%;
        padding: 0.5rem;
        background-image: url("fruitbg.jpg");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-position: center;
        box-sizing: border-box;
    }
    .van-cell-group {
        width: 6rem;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        border-radius: 5px;
        background-color: rgba(255, 255, 255, 0.5);
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
        padding: 0.5rem;
        border-radius: 0.3rem;
    }
</style>
