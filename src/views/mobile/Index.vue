<template>
    <div>
        <div v-if='this.$store.state.isLogin'>
            <mt-header fixed title="CirnoVip">
                <mt-button slot='right' @click='logout()'>登出</mt-button>
            </mt-header>
        </div>
        <div v-else>
            <mt-header fixed title="CirnoVip">
                <router-link to='/mobile/login' slot="right" >
                    <mt-button>登录</mt-button>
                </router-link>
            </mt-header>
        </div>
        <div class="body">
            <p v-if='this.$store.state.isLogin'>欢迎回来，{{this.$store.state.username}}</p>
            <p v-else>这里是一个首页</p>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.body{
    margin-top:50px;
}
</style>

<script>
import { Indicator,Toast } from 'mint-ui'
export default {
    methods:{
        logout(){
            this.$store.commit('logoutMutation');
            Indicator.open();
            setTimeout(()=>{
                Indicator.close();
                if(this.$store.state.isLogin){
                    Toast({message: '发生错误'});
                }else{
                    Toast({message: '已登出'});
                }
            },1000)
        }
    }
}
</script>
