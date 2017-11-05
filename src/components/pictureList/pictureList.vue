<template>
    <div class="pictureList">
        <!-- 头部 -->
        <mt-header fixed title="图片分享">
            <a href="javascript:;" slot="left" @click="back">
                <mt-button icon="back">返回</mt-button>
            </a>
        </mt-header>
        <!-- 头部导航 -->
        <div class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
            <div class="mui-scroll">
                <a v-for="(item,index) in typesList" @click="toggleTab(item.id)" class="mui-control-item" :class="{'mui-active': index == 0}">
                    {{item.title}}
                </a>
            </div>
        </div>
        <!-- 图片列表 -->
        <div class="picListWrap">
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
        </div>
        <!-- 图片详情的容器 -->
        <transition name="picslide">
            <router-view></router-view>
        </transition>

    </div>
</template>
<script type="text/javascript">
    import mui from 'mui'
    import {getPicTypesList,getPicList} from 'api/index'
    import { Lazyload } from 'mint-ui'
     export default {
        data(){
            return {
                typesList : [],
                typeId:'18',
                picList:[]
            }
        },
        mounted(){
            this.fetchTypesList();
        },
        methods:{
            fetchTypesList(){
                this.typesList = [];
                getPicTypesList().then((res)=>{
                    console.log(res);
                    if(res.message.length){
                        this.typesList = res.message;
                        mui('.mui-scroll-wrapper').scroll({
                            deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
                        });

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
            back(){
                this.$router.back();
            }
        }
     }
</script>
<style type="text/css" lang="less">
    .pictureList{
        padding-top:40px;
        .picListWrap{
            background: #fff;
            padding:10px;
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