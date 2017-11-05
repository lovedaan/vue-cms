<template>
    <div class="commentWrap">
        <div class="sumitBox">
            <h2 class="submitTitle">提交评论</h2>
            <mt-field placeholder="请输入评论内容" type="textarea" rows="3" v-model="commentText"></mt-field>
            <mt-button type="primary" @click.native="handleComment" size="large">提交</mt-button>
        </div>
        <div class="commentListWrap">
            <h2 class="submitTitle">评论列表</h2>
            <ul class="commentList">
                <li v-for="(it,index) in commentList">
                    <p>{{it.content}}</p>
                    <p class="commentInfo">
                        <span>{{it.user_name}}</span>
                        <span>{{it.add_time | formatDate}}</span>
                    </p>
                </li>
            </ul>
        </div>
    </div>
</template>
<script type="text/javascript">
     export default{
        props:{
            commentList:{
                type:Array,
                default:[]
            }
        },
        data(){
            return {
                commentText : ''
            }
        },
        methods:{
            handleComment(){
                if(this.commentText){
                    this.$emit('sumitHandle',this.commentText);
                }
            }
        }
     }
</script>
<style type="text/css" lang="less">
    .commentWrap{
        .submitTitle{
            font-size: 18px;
            padding:4px 0;
            border-bottom: 1px solid #ccc;
            margin-bottom: 5px;
        }
        .mint-cell-wrapper{
            padding:0;
            .mint-cell-value{
                border: 1px solid #ccc;
                border-radius: 5px;
                margin-bottom:10px;
            }
        }
        .commentListWrap{
            .commentList{
                padding:10px 0;
                li{
                    border-bottom: 1px solid #ccc;
                    .commentInfo{
                        display: flex;
                        span{
                            flex:1;
                            &:last-child{
                                text-align: right;
                            }
                        }
                    }
                }
            }
        }
    }
</style>