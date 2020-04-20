<template>
    <div>
        <div id='header'>
            <mt-header fixed title="CirnoVip" >
                <mt-button icon="back" slot='left' @click='$router.go(-1)'></mt-button>
            </mt-header>
        </div>
        <div class="body">
            <div v-if='type'>
                <mt-field label="用户名" placeholder="请输入用户名" v-model="username" class='input' :state='state1' @input='checkV("username")'></mt-field>
            </div>
            <div v-else>
                <mt-field label="邮箱" placeholder="请输入邮箱" type="email" v-model="email" class='input' :state='state1' @input='checkV("email")'></mt-field>
            </div>
            <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password" class="input" :state='state2' @input='checkV()'></mt-field>
            <mt-button type="primary" size='large' class='button' @click='onSubmit()'>登录</mt-button>
            <mt-button type="primary" class="button1" @click='switchType()'>{{message}}</mt-button>
            <mt-button type="default" class="button2" @click='toRouter("/mobile/forgot-password")'>忘记密码？</mt-button>
            <mt-button type="default" class="button3" @click='toRouter("/mobile/register")'>还没有账号？</mt-button>
        </div>
    </div>
</template>

<script>
import { Indicator,Toast } from 'mint-ui'
export default {
    data(){
        return{
            username:'',
            email:'',
            password:'',
            state1:null,
            state2:null,
            type:true,
            message:'切换邮箱登录'
        }
    },
    methods:{
        checkV(type){
            if(type=='username'){
                this.username? this.state1='success': this.state1='error'
            }else if(type=='email'){
                let reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
                reg.test(this.email)?this.state1='success':this.state1='error'
                // console.log(reg.test(this.email))
            }else{
                this.password?this.state2='success': this.state2='error'
            }
        },
        switchType(){
            if(this.type){
                this.message='切换用户名登录'
            }else{
                this.message='切换邮箱登录'
            }
            this.type = !this.type
        },
        onSubmit(){
            if(!(this.state1=='success'&&this.state2=='success')){
                Toast({
                    message: '请检查填写的内容',
                    duration: 5000
                });
                return
            }
            Indicator.open();
            if(this.type){
                // console.log(this.username)
                let loginInfo = {'username':this.username,'password':this.password}
                this.$store.dispatch('getUserAction',loginInfo);
            }else{
                // console.log(this.email)
                let email = encodeURIComponent(this.email)
                let loginInfo = {'email':email,'password':this.password}
                this.$store.dispatch('getEUserAction',loginInfo)
            }
            setTimeout(()=>{
                Indicator.close();
                if(this.$store.state.isLogin){
                    Toast({message: '操作成功'});
                    this.$router.push('/mobile/index')
                }else{
                    Toast({message: this.$store.state.message});
                }
            },1000)
        },
        toRouter(route){
            this.$router.push(route)
        }
    },
    mounted(){
      if(this.$store.state.isLogin){
        this.$router.push('/mobile/index')
      }else{
        this.$store.dispatch('getCsrftokenAction')
      }
    }
}
</script>

<style lang="scss" scoped>
*{
    box-sizing: border-box;
}
#header{
    display:block;
}
.body{
    margin-top:5rem;
    text-align: center;
    .input{
        margin-top:1rem;
    }
    .button{
        margin-top:3rem
    }
    .button1{
        float:left;
        left:1rem;
        top:1rem;
    }
    .button2{
        float:right;
        right:1rem;
        top:1rem;
    }
    .button3{
        margin-top:1rem;
    }
}
</style>
