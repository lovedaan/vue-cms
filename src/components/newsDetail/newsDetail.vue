<template>
    <div class="newsDetail">
        <scrollView class="newsDeBox" :data="commentList">
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
        </scrollView>
    </div>
</template>
<script type="text/javascript">
    import {getNewsDetail,getNewsComment,doNewsComment} from 'api/index'
    import { Toast } from 'mint-ui'
    import CommentView from 'base/comment/comment'
    import scrollView from 'base/scroll/scroll'
    import {mapMutations} from 'vuex'
    export default{
        components:{
            CommentView,
            scrollView
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
            this.changeTitle('新闻详情');
            Promise.all([getNewsDetail(this.newid),getNewsComment(this.newid,this.commentPageIndex)]).then(res=>{
                console.log(res);
                this.newsDetail = res[0].message[0];
                this.commentList = res[1].message;
            }).catch((err)=>{
                console.log(err);
            });
        },
        methods:{
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
            ...mapMutations({
                changeTitle:'SETHEADERCOUNT'
            })
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
        padding:10px;
        box-sizing: border-box;
        overflow: hidden;
        .newsDeBox{
            height: 100%;
        }
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