<template>
    <div class="pictureList">
        <!-- 头部导航 -->
        <div class="tui-scroll-wrapper" ref="scrollWrapper">
            <div class="tui-scroll" ref="tuiScroll">
                <a v-for="(item,index) in typesList" @click="toggleTab(item.id)" class="tui-control-item" :class="{'mui-active': index == 0}">
                    {{item.title}}
                </a>
            </div>
        </div>
        <!-- 图片列表 -->
        <div class="picListWrap">
            <scrollView class="picListBox" :data="picList">
                <ul v-if="picList.length" class="picList">
                    <li v-for="(it,index) in picList" @click="toPicDetai(it.id)" :data-id="it.id">
                        <img v-lazy="it.img_url" alt="" />
                        <div class="dark">
                            <p>{{it.title}}</p>
                            <p>{{it.zhaiyao}}</p>
                        </div>
                    </li>
                </ul>
                <h2 class="noData" v-else>暂无数据！</h2>
            </scrollView>
        </div>
        <!-- 图片详情的容器 -->
        <transition name="picslide">
            <router-view></router-view>
        </transition>

    </div>
</template>
<script type="text/javascript">
    import {getPicTypesList,getPicList} from 'api/index'
    import { Lazyload } from 'mint-ui'
    import BScroll from 'better-scroll'
    import scrollView from 'base/scroll/scroll'
    import {mapMutations} from 'vuex'
     export default {
        components:{
            scrollView
        },
        data(){
            return {
                typesList : [],
                typeId:'18',
                picList:[]
            }
        },
        mounted(){
            this.changeTitle('图片分享列表');
            setTimeout(()=>{
                this.initScrollOri();
            },50);

            this.fetchTypesList();
        },
        methods:{
            initScrollOri(){
                this.scroll = new BScroll(this.$refs.scrollWrapper,{
                    scrollX:true,
                    scrollY:false,
                    click:true,
                    probeType:2
                });
            },
            refreshScroll(){
                this.scroll && this.scroll.refresh();
            },
            fetchTypesList(){
                this.typesList = [];
                getPicTypesList().then((res)=>{
                    console.log(res);
                    if(res.message.length){
                        let tuiScroll = this.$refs.tuiScroll;
                        let w = document.documentElement.clientWidth;
                        this.typesList = res.message;
                        setTimeout(()=>{
                            let scrollChildren = tuiScroll.children;
                            for(let i = 0;i<scrollChildren.length;i++){
                                scrollChildren[i].style.width = w/4+'px';
                            }
                            tuiScroll.style.width = w/4 * scrollChildren.length + 'px';
                            this.refreshScroll();
                        },500);
                        this.getPicDetailList();
                    }
                });
            },
            getPicDetailList(){
                this.picList = [];
                getPicList(this.typeId).then((res)=>{
                    if(res.message.length){
                        this.picList = res.message;
                    }else{

                    }
                });
            },
            toggleTab(id){
                this.typeId = id;
                this.getPicDetailList();
            },
            toPicDetai(id){
                this.$router.push({
                    name:'picDetail',
                    params:{
                        imgid:id
                    }
                });
            },
            ...mapMutations({
                changeTitle:'SETHEADERCOUNT'
            })
        },
        watch:{
            typesList(){
                setTimeout(()=>{

                },50);
            },
            $route(to){
                if(to.path == '/picList'){
                    this.changeTitle('图片分享列表');
                }
            }
        }
     }
</script>
<style type="text/css" lang="less">
    .pictureList{

        .tui-scroll-wrapper{
            width: 100%;
            overflow: hidden;
            .tui-control-item{
                display: inline-block;
                text-align: center;
                height: 35px;
                line-height:35px;
            }
        }
        .picListWrap{
            background: #fff;
            padding:10px;
            position: fixed;
            left: 0;
            top: 75px;
            bottom: 0;
            width: 100%;
            overflow: hidden;
            box-sizing:border-box;
            .picListBox{
                height: 100%;
            }
            .noData{
                text-align: center;
                padding: 15px 0;
            }
            li{
                width: 100%;
                margin-bottom: 5px;
                position: relative;
                img{
                    width: 100%;
                }
                .dark{
                    position: absolute;
                    left: 0;
                    bottom: 0;
                    width: 100%;
                    padding:7px 5px;
                    box-sizing: border-box;
                    background:rgba(0,0,0,0.7);
                    p{
                        color:#fff;
                        font-size: 12px;
                        margin: 0;
                        &:first-child{
                            font-weight: bold;
                            font-size:14px;
                        }
                    }
                }
            }
        }
    }
    .picslide-enter-active,.picslide-leave-active{
        transition:0.7s;
    }
    .picslide-enter,.picslide-leave-to{
        transform: translate3d(100%,0,0);
    }
</style>