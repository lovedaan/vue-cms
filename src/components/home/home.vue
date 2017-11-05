<template>
    <div class="home">
        <!-- 轮播图 -->
        <div class="carousel">
            <mt-swipe :auto="5000">
              <mt-swipe-item v-for="(item,index) in bannerList" :key="index"><img :src="item.img" alt="" /></mt-swipe-item>
            </mt-swipe>
        </div>
        <!-- 导航菜单 -->
        <div class="grid-wrap">
            <ul class="mui-table-view mui-grid-view mui-grid-9">
                <router-link tag="li" to="/newslist" class="mui-table-view-cell mui-media mui-col-xs-4"><a href="#">
                        <span class="tui-nav-icon"><img src="./1.png" alt="" /></span>
                        <div class="mui-media-body">新闻资讯</div></a></router-link>
                <router-link tag="li" to="/picList" class="mui-table-view-cell mui-media mui-col-xs-4"><a href="#">
                        <span class="tui-nav-icon"><img src="./2.png" alt="" /></span>
                        <div class="mui-media-body">图片分享</div></a></router-link>
                <router-link tag="li" to="/goodslist" class="mui-table-view-cell mui-media mui-col-xs-4"><a href="#">
                        <span class="tui-nav-icon"><img src="./3.png" alt="" /></span>
                        <div class="mui-media-body">商品购买</div></a></router-link>
                <router-link tag="li" to="/feedback" class="mui-table-view-cell mui-media mui-col-xs-4"><a href="#">
                        <span class="tui-nav-icon"><img src="./4.png" alt="" /></span>
                        <div class="mui-media-body">留言反馈</div></a></router-link>
                <router-link tag="li" to="/videos" class="mui-table-view-cell mui-media mui-col-xs-4"><a href="#">
                        <span class="tui-nav-icon"><img src="./5.png" alt="" /></span>
                        <div class="mui-media-body">视频专区</div></a></router-link>
                <router-link tag="li" to="/callme" class="mui-table-view-cell mui-media mui-col-xs-4"><a href="#">
                        <span class="tui-nav-icon"><img src="./6.png" alt="" /></span>
                        <div class="mui-media-body">联系我们</div></a>
                </router-link>
            </ul>
        </div>
    </div>
</template>
<script type="text/javascript">
     import {getHomeBanner} from 'api/index'
     export default{
        data(){
            return {
                bannerList:[]
            }
        },
        mounted(){
            this.fetchBanner();
        },
        methods:{
            fetchBanner(){
                this.bannerList = [];
                getHomeBanner().then((res)=>{
                    //console.log(res);
                    if(res.message.length){
                        this.bannerList = res.message;
                    }
                }).catch((err)=>{

                });
            }
        }
     }
</script>
<style type="text/css" lang="less">
    .home{
        width: 100%;
        height: 100%;
        .carousel{
            width: 100%;
            height:220px;
            .mint-swipe-item{
                img{
                    width: 100%;
                    height: 220px;
                    border:none;
                    vertical-align: top;
                }
            }
        }
        .grid-wrap{
            .mui-grid-view.mui-grid-9{
                background:#fff;
                border-top: none;
                border-left: none;
                .tui-nav-icon{
                    display: inline-block;
                    width:20vw;
                    height:20vw;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
            }
        }
    }
</style>
