<template>
    <div class='headerClass'>
        <el-link type="primary" :underline="false" @click='toRouter("/index")'>CirnoVip</el-link>
        <div v-if='this.$store.state.isLogin'>
            <div class='hello'>
                欢迎，<span @click='toRouter("/person")'>{{username}}</span>
            </div>
            <el-button type="info" round class='button' @click='logout()'>登出</el-button>
        </div>
        <div v-else>
            <div class='hello'>请登录</div>
            <el-button type="primary" round class='button' @click='toRouter("/login")' v-loading.fullscreen.lock='fullscreenLoading'>登入</el-button>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    data(){
        return{
            fullscreenLoading:false
        }
    },
    computed:{
        ...mapState(['username'])
    },
    methods:{
        toRouter(link){
            this.$router.push(link);
            this.fullscreenLoading = true;
            setTimeout(() => {
            this.fullscreenLoading = false;
            }, 1000);
        },
        logout(){
            this.$store.commit('logoutMutation');
            setTimeout(()=>{
                if(this.$store.state.isLogin){
                    this.$message.error('发生错误')
                }else{
                    this.$message({
                        message:'登出成功'
                    })
                }
            },500)
        }
    }
}
</script>

<style lang="scss" scoped>
.headerClass{
    height:50px;
    line-height:50px;
    overflow: hidden;
    position: relative;
    .hello{
        position:absolute;
        right:120px;
        top:8px;
        span:hover{
            cursor:pointer;
            color:#409EFF;
        }
    }
    .button{
        position:absolute;
        right:0px;
        top:10px;
    }
}
</style>
