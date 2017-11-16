<template>
    <div class="main">
        <!-- 2.底部路由切换的显示的区域 -->
        <div id="main">
            <router-view></router-view>
        </div>
        <!-- 3.底部tab切换 -->
        <FooterView></FooterView>
    </div>
</template>
<script type="text/javascript">
    import FooterView from 'components/footer/footer'
    export default{
        components:{
            FooterView
        }
    }
</script>
<style type="text/css" lang="less">
    #main{
        position: absolute;
        top:40px;
        left: 0;
        right: 0;
        bottom: 50px;
        overflow: hidden;
        background: #fff;
    }
    /* .slide-enter-active,.slide-leave-active{
        transition:.8s;
    }
    .slide-enter,.slide-leave-to{
        transform: translate3d(100%,0,0);
    } */
</style>