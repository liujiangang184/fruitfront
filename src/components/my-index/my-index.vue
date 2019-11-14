<template>
    <div>
        <div class="jingang">
            <ul class="jingang-list">
                <li class="jingang-item">
                    <a href="sg.html">
                        <div class="img">
                            <img src="./img/foot.png" alt="">
                        </div>
                        <div class="jingang-text">水果特惠</div>
                    </a>
                </li>
                <li class="jingang-item">
                    <a href="mr.html">
                        <div class="img" style="background-color: #E6C3BD">
                            <img src="./img/today.png" alt="">
                        </div>
                        <div class="jingang-text">每日必抢</div>
                    </a>
                </li>
                <li class="jingang-item">
                    <a href="hc.html">
                        <div class="img" style="background-color: #EED0B8">
                            <img src="./img/fuli.png" alt="">
                        </div>
                        <div class="jingang-text">嗨吃福利</div>
                    </a>
                </li>
                <li class="jingang-item">
                    <a href="xf.html">
                        <div class="img" style="background-color: #8CB2C5">
                            <img src="./img/good.png" alt="">
                        </div>
                        <div class="jingang-text">鲜蜂力荐</div>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "my-index"
    }
</script>

<style scoped>
    .jingang {
        width: 100%;
        height: 2.18rem;
        background-color: #fff;
        padding-bottom: 0.3rem;
    }

    .jingang>.jingang-list {
        display: flex;
        justify-content: space-around;
        overflow: hidden;
    }

    .jingang>.jingang-list>.jingang-item {
        width: 25%;
        color: black;
        text-align: center;
        margin-top: 0.3rem;
    }

    .jingang>.jingang-list>.jingang-item>a {
        color: black;
    }

    .jingang-item>a>.img {
        width: 50px;
        height: 50px;
        background-color: #9BCBB5;
        border-radius: 50%;
        margin: 0 auto;
    }

    .jingang-item>a>.jingang-text {
        margin-top: 0.2rem;
        font-size: 0.28rem;
    }

    .jingang-item>a>.img>img {
        width: 0.52rem;
        height: 0.52rem;
        margin-top: 0.24rem;
    }

</style>