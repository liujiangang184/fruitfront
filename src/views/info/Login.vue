<template>
    <div class="box">
        <h1 style="text-align: center;color: white;padding-top: 1.3rem">欢迎来到果蔬鲜</h1>
        <van-cell-group>
            <van-field
                    v-model="form.nickname"
                    required
                    clearable
                    label="用户名"
                    right-icon="question-o"
                    placeholder="请输入用户名或手机号"
                    @click-right-icon="$toast('请输入用户名')"
            />

            <van-field
                    style="margin-top: 0.5rem"
                    v-model="form.password"
                    type="password"
                    label="密码"
                    placeholder="请输入密码"
                    required
            />

            <van-button plain hairline type="info" style="width:6rem;margin-top: 0.5rem;letter-spacing: 1rem;padding-left: 0.8rem" @click="handlelogin()">登录</van-button>
            <van-button plain hairline type="primary" style="width:6rem;margin-top: 0.5rem;letter-spacing: 1rem;padding-left: 0.8rem" @click="register()">注册</van-button>
        </van-cell-group>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {Field} from 'vant';
    import {login} from "../../api/users";

    Vue.use(Field);
    export default {
        name: "Login",
        data() {
            return {
                form:{
                    nickname:'',
                    password:''
                }
            }
        },
        methods:{
            register(){
                this.$router.push({name:'register'}) //点击之后推送到注册页面
            },
            handlelogin(){
                login('/api/login',this.form).then(res=>{
                    if(res.code == 200){
                        let names = this.$route.query.redirect || 'Index';
                        this.$store.dispatch('setCart');
                        this.$store.commit('changeToken',res.token);
                        console.log(res.token);
                        this.$router.push({name:names});
                    }else{
                        alert(res.msg);
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .box{
        padding-top: 30px;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        left: 0;
        background-image: url("fruitbg.jpg");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-position: center;
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
