<template>
    <div class="newslist">
        <!-- 头部 -->
        <mt-header fixed title="新闻资讯">
            <a href="javascript:;" slot="left" @click="back">
                <mt-button icon="back">返回</mt-button>
            </a>
        </mt-header>
        <!-- 新闻列表 -->
        <div class="newsListWrap">
            <ul class="mui-table-view">
                <li class="mui-table-view-cell mui-media" v-for="(news,index) in newsList" :key="index" @click="goNewsDetail(news.id)">
                    <a href="javascript:;">
                        <img class="mui-media-object mui-pull-left" :src="news.img_url">
                        <div class="mui-media-body">
                            {{news.title}}
                            <p class='mui-ellipsis'>{{news.zhaiyao}}</p>
                            <div class="tui-ft">
                                <span>发表时间：{{news.add_time | formatDate}}</span>
                                <span class="last-click">点击数：{{news.click}}</span>
                            </div>
                        </div>
                    </a>
                </li>
            </ul>
        </div>
        <!-- 新闻详情的路由占位 -->
        <transition name="slide">
            <router-view></router-view>
        </transition>
    </div>
</template>
<script type="text/javascript">
    import {getNewsList} from 'api/index'
     export default{
        data(){
            return{
                newsList:[]
            }
        },
        mounted(){
            this.fetchNewsData();
        },
        methods:{
            fetchNewsData(){
                this.newsList = [];
                getNewsList().then((res)=>{
                    //console.log(res);
                    if(res.message.length){
                        this.newsList = res.message;
                    }
                }).catch((err)=>{
                    console.log(err);
                });
            },
            goNewsDetail(id){
                this.$router.push({
                    name:'newsDetail',
                    params:{
                        newid:id
                    }
                });
            },
            back(){
                this.$router.back();
            }
        }
     }
</script>
<style type="text/css" lang="less">
    .newsListWrap{
        background: #fff;
        padding-top: 40px;
        .mui-table-view{
           .mui-media-object{
                line-height: 70px;
                max-width: 75px;
                height: 70px;
            }
            .tui-ft{
                margin-top: 1em;
                font-size: 12px;
                color:#0094ff;
                .last-click{
                    margin-left: 20px;
                }
            }
        }
    }
    .slide-enter-active,.slide-leave-active{
        transition:0.7s;
    }
    .slide-enter,.slide-leave-to{
        transform: translate3d(100%,0,0);
    }
</style>