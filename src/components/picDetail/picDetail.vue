<template>
    <div class="picDetail">
        <!-- 图片详情 -->
        <div id="desc">
            <!-- 标题信息 -->
            <div class="title">
                <h3>{{imageInfo.title}}</h3>
                <p>{{imageInfo.add_time | formatDate}}  <span>{{imageInfo.click}}次浏览</span></p>
            </div>
            <!-- 缩略图 -->
            <div class="desc-pic">
                <ul class="mui-table-view mui-grid-view">
                    <li class="mui-table-view-cell mui-media mui-col-xs-4" v-for="(imgs,index) in thumImages">
                        <p>
                            <img class="mui-media-object" data-preview-src="" data-preview-group="1" :src="imgs.src" />
                        </p>
                    </li>
                </ul>
            </div>
            <!-- 图片简介信息 -->
            <div class="pic_summry">
                <h5>简介：</h5>
                <p v-html="imageInfo.content"></p>
            </div>
        </div>
        <!-- 图片评论 -->
        <div id="comment">
            <!-- 评论组件 -->
            <CommentView :commentList="commentList" @sumitHandle="handleComment" ref="commentWrap"></CommentView>
        </div>
    </div>
</template>
<script type="text/javascript">
    import mui from 'mui'
    import './mui.zoom'
    import './mui.previewimage'
    import {getTimageInfo,getThumImages,getNewsComment,doNewsComment} from 'api/index'
    import { Toast } from 'mint-ui'
    import CommentView from 'base/comment/comment'
    export default{
        components:{
            CommentView
        },
        data(){
            return {
                imgId : '',
                imageInfo:{},
                thumImages:[],
                commentPageIndex:1,
                commentList:[]
            }
        },
        mounted(){
            this.imgId = this.$route.params.imgid;
            mui.previewImage();


            this.fetchTimageInfo();
            this.fetchThumImages();
            this.fetchCommentData();
        },
        methods:{
            //图片详情
            fetchTimageInfo(){
                getTimageInfo(this.imgId).then((res)=>{
                    console.log(res);
                    if(res.message.length){
                        this.imageInfo = res.message[0];
                    }
                });
            },
            //图片详情的缩略图
            fetchThumImages(){
                getThumImages(this.imgId).then((res)=>{
                    console.log(res);
                    if(res.message.length){
                        this.thumImages = res.message;
                    }
                });
            },
            handleComment(msg){
                doNewsComment(this.imgId,msg).then((res)=>{
                    Toast('评论成功！');
                    setTimeout(()=>{
                        this.fetchCommentData();
                        this.$refs.commentWrap.commentText = '';
                    },3000);
                }).catch((err)=>{
                    console.log(err);
                });
            },
            fetchCommentData(){
                this.commentList = [];
                getNewsComment(this.imgId,this.commentPageIndex).then((res)=>{
                    //console.log(res);
                    if(res.message.length){
                        this.commentList = res.message;
                    }
                }).catch((err)=>{
                    console.log(err);
                });
            }
        }
    }
</script>
<style type="text/css" lang="less">
    .picDetail{
        position: fixed;
        left: 0;
        width: 100%;
        top: 40px;
        bottom: 0;
        overflow-y:scroll;
        background: #fff;
        z-index: 77;
        #desc{
            padding: 10px;
            .title{
                h3{
                    color:#009fff;
                    text-align: center;
                    font-size: 18px;
                }
                p{
                    padding:5px;
                    span{
                        margin-left:20px;
                    }
                }
            }
        }
        .pic_summry{
            padding: 10px 0;
            p{
                color:#555;
            }
        }
        #comment{
            padding: 5px 10px;
        }
    }


    .mui-preview-image.mui-fullscreen {
        position: fixed;
        z-index: 2000000;
        background-color: #000;
    }
    .mui-preview-header,
    .mui-preview-footer {
        position: absolute;
        width: 100%;
        left: 0;
        z-index: 100000;
    }
    .mui-preview-header {
        height: 44px;
        top: 0;
    }
    .mui-preview-footer {
        height: 50px;
        bottom: 0px;
    }
    .mui-preview-header .mui-preview-indicator {
        display: block;
        line-height: 25px;
        color: #fff;
        text-align: center;
        margin: 15px auto 4;
        width: 70px;
        background-color: rgba(0, 0, 0, 0.4);
        border-radius: 12px;
        font-size: 16px;
    }
    .mui-preview-image {
        display: none;
        -webkit-animation-duration: 0.5s;
        animation-duration: 0.5s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
    }
    .mui-preview-image.mui-preview-in {
        -webkit-animation-name: fadeIn;
        animation-name: fadeIn;
    }
    .mui-preview-image.mui-preview-out {
        background: none;
        -webkit-animation-name: fadeOut;
        animation-name: fadeOut;
    }
    .mui-preview-image.mui-preview-out .mui-preview-header,
    .mui-preview-image.mui-preview-out .mui-preview-footer {
        display: none;
    }
    .mui-zoom-scroller {
        position: absolute;
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        -webkit-box-align: center;
        -webkit-align-items: center;
        align-items: center;
        -webkit-box-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        width: 100%;
        height: 100%;
        margin: 0;
        -webkit-backface-visibility: hidden;
    }
    .mui-zoom {
        -webkit-transform-style: preserve-3d;
        transform-style: preserve-3d;
    }
    .mui-slider .mui-slider-group .mui-slider-item img {
        width: auto;
        height: auto;
        max-width: 100%;
        max-height: 100%;
    }
    .mui-android-4-1 .mui-slider .mui-slider-group .mui-slider-item img {
        width: 100%;
    }
    .mui-android-4-1 .mui-slider.mui-preview-image .mui-slider-group .mui-slider-item {
        display: inline-table;
    }
    .mui-android-4-1 .mui-slider.mui-preview-image .mui-zoom-scroller img {
        display: table-cell;
        vertical-align: middle;
    }
    .mui-preview-loading {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        display: none;
    }
    .mui-preview-loading.mui-active {
        display: block;
    }
    .mui-preview-loading .mui-spinner-white {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -25px;
        margin-top: -25px;
        height: 50px;
        width: 50px;
    }
    .mui-preview-image img.mui-transitioning {
        -webkit-transition: -webkit-transform 0.5s ease, opacity 0.5s ease;
        transition: transform 0.5s ease, opacity 0.5s ease;
    }
    @-webkit-keyframes fadeIn {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
    @keyframes fadeIn {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
    @-webkit-keyframes fadeOut {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }
    @keyframes fadeOut {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }
    p img {
        max-width: 100%;
        height: auto;
    }
</style>