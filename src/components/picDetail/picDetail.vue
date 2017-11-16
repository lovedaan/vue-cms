<template>
    <div class="picDetail">
        <scrollView class="picScroll" :data="commentList">
            <!-- 图片详情 -->
            <div id="desc">
                <!-- 标题信息 -->
                <div class="title">
                    <h3>{{imageInfo.title}}</h3>
                    <p>{{imageInfo.add_time | formatDate}}  <span>{{imageInfo.click}}次浏览</span></p>
                </div>
                <!-- 缩略图 -->
                <div class="desc-pic">
                    <ul class="tui-pic-view">
                        <li class="tui-pic-view-cell" v-for="(imgs,index) in thumImages">
                            <img class="tui-media-object" data-preview-src="" data-preview-group="1" :src="imgs.src" />
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
        </scrollView>
    </div>
</template>
<script type="text/javascript">
    import {getTimageInfo,getThumImages,getNewsComment,doNewsComment} from 'api/index'
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
                imgId : '',
                imageInfo:{},
                thumImages:[],
                commentPageIndex:1,
                commentList:[]
            }
        },
        mounted(){
            this.imgId = this.$route.params.imgid;
            this.changeTitle('图片详情');
            Promise.all([getTimageInfo(this.imgId),getThumImages(this.imgId),getNewsComment(this.imgId,this.commentPageIndex)]).then(res=>{
                console.log(res);
                this.imageInfo = res[0].message[0];
                this.thumImages = res[1].message;
                this.commentList = res[2].message;
            }).catch(err=>{
                console.log(err)
            });
        },
        methods:{
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
            ...mapMutations({
                changeTitle:'SETHEADERCOUNT'
            })
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
        overflow:hidden;
        background: #fff;
        z-index: 77;
        .picScroll{
            height: 100%;
        }
        #desc{
            padding: 10px 0 10px 10px;
            .tui-pic-view{
                overflow: hidden;
                padding-top:8px;
                .tui-pic-view-cell{
                    width: 33.33%;
                    border-right: 8px solid #fff;
                    margin-bottom: 8px;
                    box-sizing: border-box;
                    float: left;
                    img{
                        width: 100%;
                    }
                }
            }
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



</style>