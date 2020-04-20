<template>
  <div id="app">
    <router-view v-if='mobile'></router-view>
    <el-container v-else>
      <el-header class='header'><headerBar></headerBar></el-header>
      <el-main><router-view></router-view></el-main>
    </el-container>
  </div>
</template>

<script>
import headerBar from '@/components/headerBar'

export default {
  data(){
    return{
      mobile:false
    }
  },
  components:{
    headerBar
  },
  mounted(){
    let width=document.documentElement.clientWidth
    let height=document.documentElement.clientHeight
    if(width<height){
      // console.log('mobile')
      this.mobile=true
      this.$router.push('/mobile/index')
    }else{
      this.mobile=false
      this.$router.push('/index')
    }
  }
}
</script>

<style lang="scss" scoped>
.header{
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  height: 50px;
  line-height: 50px;
}
</style>
