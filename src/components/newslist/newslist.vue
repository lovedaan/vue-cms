<template>
    <div class="newslist">
        <!-- 新闻列表 -->
        <div class="newsListWrap">
            <scrollView class="newsBox" :data="newsList">
                <ul class="tui-news-view">
                    <li class="tui-news-view-cell" v-for="(news,index) in newsList" :key="index" @click="goNewsDetail(news.id)">
                            <img class="tui-media-object" :src="news.img_url">
                            <div class="tui-media-body">
                                <h4>{{news.title}}</h4>
                                <p class='tui-ellipsis'>{{news.zhaiyao}}</p>
                                <div class="tui-ft">
                                    <span>发表时间：{{news.add_time | formatDate}}</span>
                                    <span class="last-click">点击数：{{news.click}}</span>
                                </div>
                            </div>
                    </li>
                </ul>
            </scrollView>
        </div>
        <!-- 新闻详情的路由占位 -->
        <transition name="slide">
            <router-view></router-view>
        </transition>
    </div>
</template>
<script type="text/javascript">
    import {getNewsList} from 'api/index'
    import scrollView from 'base/scroll/scroll'
    import {mapMutations} from 'vuex'
     export default{
        components:{
            scrollView
        },
        data(){
            return{
                newsList:[]
            }
        },
        mounted(){
            this.fetchNewsData();
            this.changeTitle('新闻资讯列表');
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
            ...mapMutations({
                changeTitle:'SETHEADERCOUNT'
            })
        },
        watch:{
            $route(to){
                if(to.path == '/newslist'){
                    this.changeTitle('新闻资讯列表');
                }
            }
        }
     }
</script>
<style type="text/css" lang="less">
    .newsListWrap{
        background: #fff;
        position: fixed;
        top: 40px;
        left: 0;
        bottom: 0;
        width: 100%;
        overflow: hidden;
        .newsBox{
            height: 100%;
        }
        .tui-news-view{
            .tui-news-view-cell{
                border-bottom: 1px solid #ccc;
                display: flex;
                padding: 5px;
                &:last-child{
                    border-bottom: none;
                }
                .tui-media-object{
                    flex:0 0 75px;
                    line-height: 70px;
                    max-width: 75px;
                    height: 70px;
                    margin-right: 8px;
                }
                .tui-media-body{
                    flex:1;
                    overflow: hidden;
                    display: flex;
                    flex-direction:column;
                    justify-content:space-around;
                    & h4, p{
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                    p{
                        margin-bottom:0;
                    }
                }
                .tui-ft{

                    font-size: 12px;
                    color:#0094ff;
                    .last-click{
                        margin-left: 20px;
                    }
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