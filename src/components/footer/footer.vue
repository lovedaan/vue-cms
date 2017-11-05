<template>
    <div class="footer">
        <nav class="mui-bar mui-bar-tab">
            <router-link class="mui-tab-item" :to="{name:'home'}">
                <span class="mui-icon mui-icon-home"></span>
                <span class="mui-tab-label">首页</span>
            </router-link>
            <router-link class="mui-tab-item" :to="{name:'member'}">
                <span class="mui-icon mui-icon-contact"></span>
                <span class="mui-tab-label">会员</span>
            </router-link>
            <router-link class="mui-tab-item" :to="{name:'cart'}">
                <span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge" v-show="count">{{count}}</span></span>
                <span class="mui-tab-label">购物车</span>
            </router-link>
            <router-link class="mui-tab-item" :to="{name:'search'}">
                <span class="mui-icon mui-icon-search"></span>
                <span class="mui-tab-label">搜索</span>
            </router-link>
        </nav>
    </div>
</template>
<script type="text/javascript">
     import bus from 'util/bus'
     export default{
        data(){
            return {
                count:0
            }
        },
        created(){
            bus.$on('countnumber',val=>{
                console.log('商品组件改变发过来的数据：========='+val);
                this.count = val;
                console.log('this.count:=========='+this.count);
            });
        },
        methods:{
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