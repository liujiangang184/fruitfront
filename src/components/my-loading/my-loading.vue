<template>
    <div class="loading" v-show="isShow">
        <div class="loading-box">
        </div>
    </div>
</template>

<script>
    export default {
        name: "my-loading",
        computed:{
            isShow(){
                return this.$store.state.isShow;
            }
        }
    }
</script>

<style scoped>
.loading{
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.2);
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
}
    .loading > .loading-box{
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        background: #FF9201;
    }
</style>