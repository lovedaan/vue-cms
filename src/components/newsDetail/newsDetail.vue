<template>
    <div class="newsDetail">
        <div class="detailWrap">
            <h2 class="newsDetailTile">{{newsDetail.title}}</h2>
            <p class="newsDetailInfo">
                <span>发表于：{{newsDetail.add_time | formatDate}}</span>
                <span>点赞数：{{newsDetail.click}}</span>
            </p>
            <div class="newsDetailContend" v-html="newsDetail.content"></div>
            <!-- 评论组件 -->
            <CommentView :commentList="commentList" @sumitHandle="handleComment" ref="commentWrap"></CommentView>
        </div>
    </div>
</template>
<script type="text/javascript">
    import {getNewsDetail,getNewsComment,doNewsComment} from 'api/index'
    import { Toast } from 'mint-ui'
    import CommentView from 'base/comment/comment'
    export default{
        components:{
            CommentView
        },
        data(){
            return {
                newsDetail:{},
                newid:'',
                commentPageIndex:1,
                commentList:[]
            }
        },
        mounted(){
            this.newid = this.$route.params.newid;
            this.fetchNewsDetail();
            this.fetchCommentData();
        },
        methods:{
            fetchNewsDetail(){
                getNewsDetail(this.newid).then((res)=>{
                    //console.log(res);
                    if(res.message.length){
                        this.newsDetail = res.message[0];
                    }
                }).catch((err)=>{
                    console.log(err);
                });
            },
            handleComment(msg){
                doNewsComment(this.newid,msg).then((res)=>{
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
                getNewsComment(this.newid,this.commentPageIndex).then((res)=>{
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
    .newsDetail{
        position: fixed;
        left: 0;
        top: 40px;
        width: 100%;
        bottom: 0;
        z-index:5;
        background: #fff;
        overflow-y: scroll;
        padding:10px;
        box-sizing: border-box;
        .detailWrap{
            .newsDetailTile{
                font-size: 16px;
                line-height:25px;
                color:#0094ff;
            }
            .newsDetailInfo{
                span{
                    &:last-child{
                        margin-left:20px;
                    }
                }

            }
            .newsDetailContend{
                width: 100%;
                p{
                    color:#000;
                }
                img{
                    width: 100%;
                }
            }
        }
    }
</style>