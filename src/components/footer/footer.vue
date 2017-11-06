<template>
    <div class="footer">
        <nav class="mui-bar mui-bar-tab">
            <router-link class="mui-tab-item" :to="{path:'/home'}">
                <span class="mui-icon mui-icon-home"></span>
                <span class="mui-tab-label">首页</span>
            </router-link>
            <router-link class="mui-tab-item" :to="{path:'/member'}">
                <span class="mui-icon mui-icon-contact"></span>
                <span class="mui-tab-label">会员</span>
            </router-link>
            <router-link class="mui-tab-item" :to="{path:'/cart'}">
                <span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge" v-show="getCountNumber">{{getCountNumber}}</span></span>
                <span class="mui-tab-label">购物车</span>
            </router-link>
            <router-link class="mui-tab-item" :to="{path:'/search'}">
                <span class="mui-icon mui-icon-search"></span>
                <span class="mui-tab-label">搜索</span>
            </router-link>
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

            }
        },
        created(){

        },
        mounted(){
            //console.log(this.getCountNumber);
        },
        methods:{
            fn(){
                alert(123);
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
        background: #888;
    }
</style>