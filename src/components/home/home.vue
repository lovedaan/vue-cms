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
            <ul class="tui-table-view">
                <router-link tag="li" to="/newslist" class="tui-table-view-cell"><a href="#">
                        <span class="tui-nav-icon"><img src="./1.png" alt="" /></span>
                        <div class="tui-media-body">新闻资讯</div></a></router-link>
                <router-link tag="li" to="/picList" class="tui-table-view-cell"><a href="#">
                        <span class="tui-nav-icon"><img src="./2.png" alt="" /></span>
                        <div class="tui-media-body">图片分享</div></a></router-link>
                <router-link tag="li" to="/goodslist" class="tui-table-view-cell"><a href="#">
                        <span class="tui-nav-icon"><img src="./3.png" alt="" /></span>
                        <div class="tui-media-body">商品购买</div></a></router-link>
                <router-link tag="li" to="/feedback" class="tui-table-view-cell"><a href="#">
                        <span class="tui-nav-icon"><img src="./4.png" alt="" /></span>
                        <div class="tui-media-body">留言反馈</div></a></router-link>
                <router-link tag="li" to="/videos" class="tui-table-view-cell"><a href="#">
                        <span class="tui-nav-icon"><img src="./5.png" alt="" /></span>
                        <div class="tui-media-body">视频专区</div></a></router-link>
                <router-link tag="li" to="/callme" class="tui-table-view-cell"><a href="#">
                        <span class="tui-nav-icon"><img src="./6.png" alt="" /></span>
                        <div class="tui-media-body">联系我们</div></a>
                </router-link>
            </ul>
        </div>
		<div style="display:none;"><mt-button type="primary" size="large" @click.native="openPicker">primary</mt-button></div>
		<mt-datetime-picker
		ref="picker"
		type="time"
		v-model="pickerValue">
	  </mt-datetime-picker>
    </div>
</template>
<script type="text/javascript">
     import {getHomeBanner} from 'api/index'
     import {mapMutations} from 'vuex'
     export default{
        data(){
            return {
                bannerList:[],
				pickerValue:''
            }
        },
        mounted(){
            this.fetchBanner();
            this.changeTitle('vue cms新闻站点');
        },
        methods:{
			openPicker() {
			this.$refs.picker.open();
		  },
            fetchBanner(){
                this.bannerList = [];
                getHomeBanner().then((res)=>{
                    //console.log(res);
                    if(res.message.length){
                        this.bannerList = res.message;
                    }
                }).catch((err)=>{

                });
            },
            ...mapMutations({
                changeTitle:'SETHEADERCOUNT'
            })
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
            .tui-table-view{
                background:#fff;
                overflow: hidden;
                padding-top: 10px;
                .tui-table-view-cell{
                    width:33.33%;
                    float: left;
                    text-align: center;
                    margin-bottom:14px;
                    & > a{
                        display: block;
                        width: 100%;
                        .tui-media-body{
                            padding: 8px 0;
                        }
                    }
                }
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
