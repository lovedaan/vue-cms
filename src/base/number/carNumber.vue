<template>
    <div class="number-wrap">
        <div class="number_left" @click="substrict">-</div>
        <div class="number_txt">
            <input v-model="newCount" class="inputVal" type="text" readonly="true" />
        </div>
        <div class="number_right" @click="add">+</div>
    </div>
</template>
<script type="text/javascript">

    export default{
        props:{
            count :{
                type:Number,
                default:1
            },
            id:{
                default:''
            }
        },
        data(){
            return {
                newCount : 1
            }
        },
        mounted(){

            this.newCount = this.count;
        },
        methods:{
            add(){
                this.newCount++;
            },
            substrict(){

                if(this.newCount == 1){
                    return;
                }

                this.newCount--;
            },
            notifycount(val){
                let obj = {
                    count:val,
                    id:this.id
                }
                this.$emit('changeCount',obj);
            }

        },
        watch:{
            count(val){
                this.newCount = val;
            },
            newCount(val){
                this.notifycount(val);
            }
        }
    }
</script>
<style type="text/css" scoped lang="less">
    .number-wrap{
        width: 130px;
        height: 35px;
        display: flex;
        border: 1px solid #888;
        & > div{
            flex:1;
            text-align: center;
            line-height: 33px;
            font-size:18px;
            padding:0 5px;
        }
        .number_txt{
            flex:2;
            padding:0;
            .inputVal{
                outline: none;
                text-align:left;
                height: 34px;
                padding: 0 0 0 10px;
                border: none;
                margin: 0;
                border-left: 1px solid #888;
                border-right: 1px solid #888;
                background:none;
            }
        }
    }
</style>