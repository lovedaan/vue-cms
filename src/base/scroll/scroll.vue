<template>
    <div class="scrollWrap" ref="scrollBox">
        <div class="scroll-box">
            <slot></slot>
        </div>
    </div>
</template>
<script type="text/javascript">
     import BScroll from 'better-scroll'
     export default{
        props:{
            data:{
                type:Array,
                default:[]
            }
        },
        data(){
            return{

            }
        },
        mounted(){
            setTimeout(()=>{
                this.initScroll();
            },50);
        },
        methods:{
            initScroll(){
                console.log(this.$refs.scrollBox);
                this.scroll = new BScroll(this.$refs.scrollBox,{
                    scrollX:false,
                    scrollY:true,
                    click:true,
                    probeType:2
                })
            },
            refresh(){
                this.scroll && this.scroll.refresh();
            }
        },
        watch:{
            data(){
                setTimeout(()=>{
                    this.refresh();
                },50);
            }
        }
     }
</script>
<style type="text/css">

</style>