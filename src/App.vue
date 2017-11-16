<template>
  <div id="app">
      <!-- 头部 -->
      <mt-header fixed :title="getHeaderTitle">
          <a href="javascript:;" slot="left" @click="back" v-if="isShow">
                <mt-button icon="back">返回</mt-button>
            </a>
      </mt-header>
      <router-view></router-view>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: 'app',
  data(){
    return {
        isShow:false
    }
  },
  computed:{
    ...mapGetters(['getHeaderTitle'])
  },
  mounted(){
    this.$router.push('/home');
  },
  methods:{
    back(){
        this.$router.back();
    }
  },
  watch:{
    $route(to){
        //console.log(to);
        if(to.path == '/home'){
            this.isShow = false;
        }else{
            this.isShow = true;
        }
    }
  }
}
</script>

<style>
    #app{
        padding-top:40px;
    }
</style>
