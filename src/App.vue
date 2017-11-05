<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'app',
  mounted(){
    this.$router.push('/home');
  }
}
</script>

<style>

</style>
