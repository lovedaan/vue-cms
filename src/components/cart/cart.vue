<template>
    <div class="cart">
        <div v-if="carList.length">
            <div class="cartWrap">
                <div :data-index="index" class="cartItem" v-for="(car,index) in carList">
                    <mt-switch  @change.native="toChangeOff(index,car.id)" v-model="value[index]" class="switch"></mt-switch>
                    <img :src="car.thumb_path" class="img" alt="" />
                    <div class="cartInfo">
                        <h4>{{car.title}}</h4>
                        <ul class="infoList">
                            <li><span class="sell_price">￥{{car.sell_price}}</span></li>
                            <li :data-count="car.cou"><numberView :id="car.id" :count="car.cou" @changecount="carNumberCount"></numberView></li>
                            <li><a href="javascript:;" class="deleteBtn">删除</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="totalmsg">
                <div class="msgleft">
                    <h4>总计(不含运费)</h4>
                    <p>已购买{{sumAll}}件商品，总计￥{{settment}}元</p>
                </div>
                <mt-button class="tui-btn" type="danger">去结算</mt-button>
            </div>
            <h4>{{value}}</h4>
        </div>
        <h6 class="nodatacar" v-else>购物车空空的，快去选购吧</h6>
    </div>
</template>
<script type="text/javascript">
    import numberView from 'base/number/carNumber'
    import {getShopcarList} from 'api/index'
    import storage from 'util/storage'
    import {mapMutations} from 'vuex'
     export default{
        components:{
            numberView
        },
        data(){
            return {
               value:[],
               ids : [],
               carList:[],
               sumCount:0,
               storageData:[],
               sumAll : 0
            }
        },
       computed:{
          settment(){
            let trueArr = this.value.filter(v=>v===true);
            this.sumAll = trueArr.length;
            return this.getAcountTotal();
          }
       },
        mounted(){
            let storages = storage('count') ? JSON.parse(storage('count')) : [];
            if(!storages.length){
                return;
            }

            let ret = [];
            for(let i = 0; i<storages.length;i++){
                ret.push(storages[i].id);
            }
            this.ids = ret;

            this.storageData = storages;

            this.fetchCarData();
        },
        methods:{
            getAcountTotal(){
              let acountTotal = 0;
              let storages = storage('count') ? JSON.parse(storage('count')) : [];
              this.value.forEach((item,index)=>{
                if(item == true){
                  acountTotal += storages[index].count * this.carList[index].sell_price;
                }
              });

              return acountTotal;
            },
            fetchCarData(){
                this.carList = [];
                getShopcarList(this.ids).then(res=>{
                    //console.log(res);
                    if(res.message.length){

                        let ret = this.storageData;
                        for(let i = 0; i<ret.length;i++){
                            res.message[i].cou = ret[i].count;
                            this.value.push(false);
                        }
                        this.carList = res.message;

                    }
                });
            },
            toChangeOff(index,id){

            },
            carNumberCount(val){
                this.addCountToCart(val);
                this.getAcountTotal();
            },
            ...mapMutations({
                addCountToCart:'CHANGECARCOUNT'
            })
        },
        watch : {
            storageData(val){
                console.log(val);
            }
        }
     }
</script>
<style type="text/css" lang="less">
    .cart{
        width: 100%;
        height: 100%;
        padding: 5px;
        box-sizing:border-box;
        .nodatacar{
            text-align: center;
            padding-top:200px;
            font-size: 20px;
        }
        .cartWrap{
            border: 1px solid #ccc;
            border-radius:8px;
            .cartItem{
                border-bottom: 1px solid #ccc;
                padding:10px 5px;
                height:102px;
                display: flex;
                &:last-child{
                    border-bottom: none;
                }
                .switch{
                    flex: 0 0 52px;
                }
                .img{
                    flex: 0 0 75px;
                    width: 75px;
                    height: 75px;
                    margin: 0 5px;
                }
                .cartInfo{
                    flex:1;
                    padding:5px;
                    overflow: hidden;
                    h4{
                        width:100%;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        padding:0px 0 10px;
                        color:#1798f9;
                    }
                    .infoList{
                        display: flex;
                        -webkit-justify-content:space-between;
                        justify-content:space-between;
                        & > li{
                            font-size:14px;
                            line-height: 35px;
                            .number-wrap{
                                width: 110px;
                            }
                            .sell_price{
                                color:red;
                            }
                            .deleteBtn{
                                color:#1798f9;
                            }
                        }
                    }
                }
            }
        }
        .totalmsg{
            margin: 10px 0;
            padding:20px;
            background: #ccc;
            display: flex;
            -webkit-justify-content:space-between;
            justify-content:space-between;
            .msgleft{
                h4{
                    margin-bottom: 10px;
                    font-size: 20px;
                }
                p{
                    color:#000;
                    font-size: 16px;
                }
            }
            .tui-btn{
                margin-top:10px;
            }

        }
    }
</style>
