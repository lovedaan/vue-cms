<template>
    <div class="goodsDetail">
        <scrollView class="goodsDetailBox" ref="scroll" :data="goodsSlides">
        <!-- 轮播图 -->
        <div class="goodsCrousel">
            <mt-swipe :auto="5000" class="tui-goods-slide">
              <mt-swipe-item v-for="(item,index) in goodsSlides" :key="index"><img :src="item.src" alt="" /></mt-swipe-item>
            </mt-swipe>
        </div>
        <!-- 商品价格信息 -->
        <div class="goodsPriceWrap">
            <div class="goodsTitle">{{goodsInfo.title}}</div>
            <ul class="goodsInfo">
                <li>
                    <div>市场价：<i class="goods-sell">￥{{goodsInfo.market_price}}</i></div>
                    <div>销售价：<i class="goods-market">￥{{goodsInfo.sell_price}}</i></div>
                </li>
                <li>
                    <div style="line-height:35px;">
                        购买数量：
                    </div>
                    <div style="position:relative;">
                        <NumberCount @changeCount="carNumber"></NumberCount>
                        <transition name="ballmove" @enter="ballEnter" @before-enter="ballBeforeEnter" @after-enter="ballafterEnter">
                            <span v-if="isShowBall" class="ball"></span>
                        </transition>
                    </div>

                </li>
            </ul>
            <div style="padding-bottom:15px;">
                <mt-button type="primary">立即购买</mt-button>
                <mt-button type="danger" @click.native="addNumberToCar">加入购物车</mt-button>
            </div>
        </div>

        <div class="goodsParams">
            <div class="goodsParamsTitle">商品参数</div>
            <ul class="paramsList">
                <li>商品货号：{{goodsInfo.goods_no}}</li>
                <li>库存情况：{{goodsInfo.stock_quantity}}</li>
                <li>上架时间：{{goodsInfo.add_time | formatDate}}</li>
            </ul>
        </div>

        <div class="goodsFooter">
            <mt-button @click.native="showDesc" plain size="large" type="primary">图文介绍</mt-button>
            <mt-button @click.native="showComment" class="tui-comment-btn" plain size="large" type="danger">商品评论</mt-button>
        </div>


        <!-- 商品评论 -->
        <div class="goodsCommentWrap" v-show="isShowComment">
            <div class="goodsCommentCon">
                <!-- 评论组件 -->
                <CommentView :commentList="commentList" @sumitHandle="handleComment" ref="commentWrap"></CommentView>
            </div>
        </div>

        <!-- 商品评论 -->
        <div class="goodsDescWrap" v-show="isShowDesc">
            <div class="goodsCommentCon">
                <!-- 评论组件 -->
                <h4>{{descMessage.title}}</h4>
                <div v-html="descMessage.content"></div>
            </div>
        </div>
        </scrollView>
    </div>
</template>
<script type="text/javascript">
    import {getThumImages,getGoodsDetailInfo,getNewsComment,doNewsComment,getGoodsDescMessage} from 'api/index'
    import NumberCount from 'base/number/number'
    import CommentView from 'base/comment/comment'
    import { Toast } from 'mint-ui'
    import {mapMutations} from 'vuex'
    import scrollView from 'base/scroll/scroll'
    export default{
        components:{
            NumberCount,
            CommentView,
            scrollView
        },
        data(){
            return {
                goodsId:'',
                goodsSlides:[],
                count:1,
                carNumbers:1,
                goodsInfo:{},
                isShowComment:false,
                isShowDesc:false,
                commentPageIndex:1,
                commentList:[],
                descMessage:{},
                isAddCart:false,
                isShowBall:false
            }
        },
        mounted(){
            this.goodsId = this.$route.params.goodsid;

            this.changeTitle('商品详情');

            Promise.all([getThumImages(this.goodsId),getGoodsDetailInfo(this.goodsId)]).then(res=>{
                console.log(res);
                this.goodsSlides = res[0].message;
                this.goodsInfo = res[1].message[0];
            });

        },
        methods:{
            getGoodsSlides(){
                this.goodsSlides = [];
                getThumImages(this.goodsId).then(res=>{
                    console.log(res);
                    if(res.message.length){
                        this.goodsSlides = res.message;
                    }
                });
            },
            getDetailsInfo(){
                getGoodsDetailInfo(this.goodsId).then(res=>{
                    console.log(res);
                    this.goodsInfo = res.message[0];
                });
            },
            addNumberToCar(){
                Toast('添加购物车成功');
                this.isShowBall = true;
                this.addCountToCart({
                    count:this.carNumbers,
                    id:this.goodsId
                });
            },
            ballBeforeEnter(el){
                //设置小球的初始位置
                el.style.transform = 'translate(0,0)';
                el.style.webKitTransform = 'translate(0,0)';
            },
            ballEnter(el,done){
                el.offsetWidth;
                el.style.transform = 'translate(70px,300px)';
                done();
            },
            ballafterEnter(){
                this.isShowBall = false;
            },
            showDesc(){
                this.isShowDesc = true;
                this.changeTitle('商品图文详情');
                this.getGoodsDescMsg();

                setTimeout(()=>{
                    this.$refs.scroll.refresh();
                },100);
            },
            hideDesc(){
                this.changeTitle('商品详情');
                this.isShowDesc = false;
                setTimeout(()=>{
                    this.$refs.scroll.refresh();
                },100);
            },
            getGoodsDescMsg (){
                getGoodsDescMessage(this.goodsId).then(res=>{
                    console.log(res);
                    this.descMessage = res.message[0];
                });
            },
            handleComment(msg){
                doNewsComment(this.goodsId,msg).then((res)=>{
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
                getNewsComment(this.goodsId,this.commentPageIndex).then((res)=>{
                    //console.log(res);
                    if(res.message.length){
                        this.commentList = res.message;
                    }
                }).catch((err)=>{
                    console.log(err);
                });
            },
            showComment(){
                this.changeTitle('商品评论');
                this.isShowComment = true;
                this.fetchCommentData();
                setTimeout(()=>{
                    this.$refs.scroll.refresh();
                },100);
            },
            hideComment(){
                this.changeTitle('商品详情');
                this.isShowComment = false;
                setTimeout(()=>{
                    this.$refs.scroll.refresh();
                },100);
            },
            carNumber(val){
                console.log('一共选了：'+val+'件商品');
                this.carNumbers = val;
            },
            ...mapMutations({
                addCountToCart:'SETCOUNT',
                changeTitle:'SETHEADERCOUNT'
            })
        }
    }
</script>
<style type="text/css" lang="less">
    .goodsDetail{
        position: fixed;
        top: 50px;
        left: 0;
        bottom: 0;
        overflow:hidden;
        width: 100%;
        background: #fff;
        box-sizing: border-box;
        z-index: 888;
        .goodsDetailBox{
            height: 100%;
        }
        .goodsCrousel{
            width: 100%;
            height:300px;
            margin-bottom:5px;
            .tui-goods-slide{
                border: 1px solid #888;
                border-radius: 8px;
            }
            .mint-swipe-item{
                img{
                    width: 100%;
                    height: 220px;
                    border:none;
                    vertical-align: top;
                }
            }
        }
        .goodsPriceWrap{
            margin-bottom:5px;
            border: 1px solid #ccc;
            padding: 10px;
            border-radius:8px;
            .goodsTitle{
                padding:10px 0;
                text-align: center;
                border-bottom: 1px solid #ccc;
                margin-bottom:8px;
                color:#26a2ff;
            }
            .goodsInfo{
                padding:10px;
                & > li{
                    display: flex;
                    margin-bottom:15px;
                    position: relative;
                    .ball{
                        position: absolute;
                        left: 50%;
                        top: 50%;
                        margin-top:-10px;
                        margin-left: -20px;
                        width: 20px;
                        height: 20px;
                        background:red;
                        border-radius:50%;
                        transition: all 2s ease 0s;
                    }
                    & > div{
                        flex:1;
                        color:#666;
                        font-size: 14px;
                        .goods-sell{
                            text-decoration: line-through;
                        }
                        .goods-market{
                            color:red;
                            font-size:24px;
                        }
                    }
                }
            }
        }
        .goodsParams{
            margin-bottom:5px;
            border: 1px solid #ccc;
            padding: 0 10px 20px 10px;
            border-radius:8px;
            .goodsParamsTitle{
                padding: 10px 0;
                font-size:15px;
                border-bottom: 1px solid #ccc;
                margin-bottom:15px;
            }
            .paramsList{
                padding-left: 20px;
                li{
                    font-size:15px;
                    color:#888;
                    margin-bottom:5px;
                }
            }
        }
        .goodsFooter{
            margin-bottom:5px;
            border: 1px solid #ccc;
            padding: 12px 8px;
            border-radius:8px;
            .tui-comment-btn{
                margin-top:15px;
            }
        }
        .goodsCommentWrap{
            position: fixed;
            left: 0;
            top: 0px;
            bottom: 0;
            width: 100%;
            background:#fff;
            z-index:77;
            .goodsCommentCon{
                padding: 10px;
            }
        }
        .goodsDescWrap{
            position: fixed;
            left: 0;
            top: 0px;
            bottom: 0;
            width: 100%;
            background:#fff;
            z-index:77;
            .goodsCommentCon{
                padding: 10px;
                h4{
                    font-size:16px;
                    color:#0094ff;
                    padding: 10px 0;
                }
                img{
                    width: 100%;
                }
            }
        }
    }
</style>