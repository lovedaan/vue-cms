<template>
    <div class="goodslist">
        <!-- 头部 -->
        <mt-header fixed title="商品列表">
            <a href="javascript:;" slot="left" @click="back">
                <mt-button icon="back">返回</mt-button>
            </a>
        </mt-header>
        <!-- 商品列表 -->
        <div class="goodsList">
            <!--下拉刷新容器-->
            <div id="pullrefresh" class="mui-content mui-scroll-wrapper">
                <div class="mui-scroll">
                    <!--数据列表 @touchstart="goGoodsDetail(goods.id)" -->
                     <ul class="tui-table-view">
                        <li class="tui-table-view-cell" v-for="(goods,index) in goodsList" :data-id="goods.id" v-touch="{'goDetail':goGoodsDetail}">
                            <a href="javascript:;">
                                <img class="tui-media-object" :src="goods.img_url">
                                <div class="tui-media-body">
                                    {{goods.title.substr(0,25) + '...'}}
                                </div>
                                <div class="tui-media-price">
                                    <p>
                                        <span class="tui-sell-price">￥{{goods.sell_price}}</span>
                                        <span class="tui-market-price">￥{{goods.market_price}}</span>
                                    </p>
                                    <p class="tui-num">
                                        <span>热卖中</span>
                                        <span class="tui-num-text">剩<i>{{goods.stock_quantity}}</i>件</span>
                                    </p>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

        </div>

        <!-- 商品详情容器 -->
        <transition name="goodslide">
            <router-view></router-view>
        </transition>
    </div>
</template>
<script type="text/javascript">
     import {getGoodsList} from 'api/index'
     import mui from 'mui'
     export default{
        data(){
            return {
                goodsList:[],
                pageIndex:1
            }
        },
        mounted(){
            this.fetchGoodsList();
        },
        created(){

        },
        directives:{
            touch : {
                inserted(el,binding){
                    let id = el.dataset.id;
                    let Touch = {};
                    el.addEventListener('touchstart',(ev)=>{
                        //console.log(ev);
                        Touch.pageX = ev.changedTouches[0].pageX;
                        Touch.pageY = ev.changedTouches[0].pageY;
                    });
                    el.addEventListener('touchend',(ev)=>{
                        let x = ev.changedTouches[0].pageX;
                        let y = ev.changedTouches[0].pageY;
                        /*console.log('按下记录的x值：=================='+Touch.pageX);
                        console.log('按下记录的y值：=================='+Touch.pageY);

                        console.log('抬起的x值：=================='+x);
                        console.log('抬起的y值：=================='+y);*/
                        if(Touch.pageX == x && Touch.pageY == y){
                            binding.value.goDetail(id);
                        }

                    });
                },
                update (el,binding){
                    let id = el.dataset.id;
                    let Touch = {};
                    el.addEventListener('touchstart',(ev)=>{
                        //console.log(ev);
                        Touch.pageX = ev.changedTouches[0].pageX;
                        Touch.pageY = ev.changedTouches[0].pageY;
                    });
                    el.addEventListener('touchend',(ev)=>{
                        let x = ev.changedTouches[0].pageX;
                        let y = ev.changedTouches[0].pageY;
                        /*console.log('按下记录的x值：=================='+Touch.pageX);
                        console.log('按下记录的y值：=================='+Touch.pageY);

                        console.log('抬起的x值：=================='+x);
                        console.log('抬起的y值：=================='+y);*/
                        if(Touch.pageX == x && Touch.pageY == y){
                            binding.value.goDetail(id);
                        }

                    });
                }
            }
        },
        methods:{
            back(){
                this.$router.back();
            },
            fetchGoodsList(){

                const pullrefreshDom = mui('#pullrefresh');
                const that = this;
                this.goodsList = [];
                this.pageIndex = 0;
                pullrefreshDom.pullRefresh({
                    up: {
                        contentrefresh: '正在加载...',
                        callback: function () {
                            that.pageIndex++;
                            getGoodsList(that.pageIndex).then((res)=>{
                                let ret = that.goodsList;
                                if(res.message.length){
                                    pullrefreshDom.pullRefresh().endPullupToRefresh(false);
                                    if(ret.length){
                                      that.goodsList = ret.concat(res.message);
                                   }else{
                                      that.goodsList = res.message
                                   }
                                }else{
                                    pullrefreshDom.pullRefresh().endPullupToRefresh(true);
                                    return;
                                }
                            });
                        }
                    }
                });

                mui.ready(function () {
                    pullrefreshDom.pullRefresh().pullupLoading();
                    pullrefreshDom.pullRefresh().refresh(true);
                });

            },
            goGoodsDetail(id){
                this.$router.push({
                    name:'goodsDetail',
                    params:{
                        goodsid:id
                    }
                });
            }

        }
     }
</script>
<style type="text/css" lang="less">
    .goodslist{
        padding-top:40px;
        .goodsList{
            background:#fff;
            padding-top:10px;
            position: fixed;
            left: 0;
            top: 50px;
            bottom: 0;
            width: 100%;
            background:#fff;
            .tui-table-view{
                overflow: hidden;
                padding: 0 0 7px 7px;
                .tui-table-view-cell{
                    float: left;
                    width: 48%;
                    margin-right: 2%;
                    margin-bottom:10px;
                    box-sizing:border-box;
                    padding: 5px;
                    box-shadow: 0px 0px 3px 0px #555;
                    border-radius:8px;
                    background:#fff;
                    a{
                        display: block;
                        width: 100%;
                        .tui-media-object{
                            width: 100%;
                            height: 160px;
                            vertical-align:top;
                            border:none;
                        }
                        .tui-media-body{
                            padding: 5px 2px 2px 2px;
                            font-size:13px;
                        }
                        .tui-media-price{
                            margin-top:5px;
                            background:#efeff4;
                            padding: 5px 2px;
                            .tui-sell-price{
                                font-weight:bold;
                                color:red;
                                font-size:16px;
                            }
                            .tui-market-price{
                                font-size:14px;
                                color:#999;
                                text-decoration: line-through;
                                margin-left:10px;
                            }
                            .tui-num{
                                margin-top:20px;
                                margin-bottom:0;
                                .tui-num-text{
                                    float: right;
                                    color:#999;
                                    i{
                                        color:#111;
                                        font-size:15px;
                                        margin: 0 2px;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    .goodslide-enter-active,.goodslide-leave-active{
        transition:0.7s;
    }
    .goodslide-enter,.goodslide-leave-to{
        transform: translate3d(100%,0,0);
    }
</style>