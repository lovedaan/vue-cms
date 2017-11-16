<template>
    <div class="footer">
        <nav class="tui-bar-tab">
            <a href="javascript:;" @click="goRouter('/home')" class="tui-bar-item" :class="{'tui-nav-active':str == '/home'}">
                <i class="iconfont icon-home icon-custom"></i>
                <span>主页</span>
            </a>
            <a href="javascript:;" @click="goRouter('/member')" class="tui-bar-item" :class="{'tui-nav-active':str == '/member'}">
                <i class="iconfont icon-account icon-custom"></i>
                <span>会员</span>
            </a>
            <a href="javascript:;" @click="goRouter('/cart')" class="tui-bar-item" :class="{'tui-nav-active':str == '/cart'}">
                <i class="iconfont icon-cart icon-custom"></i>
                <span class="cartBar" v-if="getCountNumber">{{getCountNumber}}</span>
                <span>购物车</span>
            </a>
            <a href="javascript:;" @click="goRouter('/search')" class="tui-bar-item" :class="{'tui-nav-active':str == '/search'}">
                <i class="iconfont icon-search icon-custom"></i>
                <span>搜索</span>
            </a>
        </nav>
    </div>
</template>
<script type="text/javascript">
     import {mapGetters} from 'vuex'
     export default{
        computed:{
            ...mapGetters(['getCountNumber'])
        },
        data(){
            return {
                str:'/home'
            }
        },
        created(){

        },
        mounted(){
            //console.log(this.getCountNumber);
        },
        methods:{
            goRouter(path){
                this.str = path;
                this.$router.push(path);
            }
        }
     }
</script>
<style type="text/css" lang="less">
    .footer{
        width: 100%;
        height: 50px;
        position: fixed;
        left: 0;
        bottom: 0;
        z-index:5;
        background: #d2d2d2;
        .tui-bar-tab{
            display: flex;
            .tui-bar-item{
                flex:1;
                text-align: center;
                height:50px;
                box-sizing:border-box;
                padding-top: 4px;
                position: relative;
                .icon-custom{
                    font-size: 22px;
                }
                .cartBar{
                    position: absolute;
                    width: 16px;
                    height: 16px;
                    background:red;
                    color:#fff;
                    border-radius: 100px;
                    top:-5px;
                    left: 60%;
                    font-size: 12px;
                    text-align: center;
                    line-height:16px;
                }
                & > span{
                    display: block;
                    width: 100%;
                    text-align: center;
                    font-size:14px;
                    margin-top: 2px;
                }
                &.tui-nav-active{
                    color:#0094ff;
                }
            }
        }
    }
</style>