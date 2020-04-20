<template>
    <div>
        <div id='header'>
            <mt-header fixed title="CirnoVip"></mt-header>
        </div>
        <div class="body">
            <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password1" class="input" :state='state1' @input='checkV("password1")'></mt-field>
            <mt-field label="确认密码" placeholder="请输入密码" type="password" v-model="password2" class="input" :state='state2' @input='checkV("password2")'></mt-field>
            <mt-button type="primary" size='large' class='button' @click='onSubmit()' :disabled='confirmed'>确认</mt-button>
        </div>
    </div>
</template>

<script>
import { Indicator,Toast } from 'mint-ui'
export default {
    props:['code'],
    data(){
        return{
            password1:'',
            password2:'',
            state1:null,
            state2:null,
            confirmed:true
        }
    },
    methods:{
        checkV(type){
            if(type=='password1'){
                this.password1?this.state1='success':this.state1='error'
            }else{
                this.password2?this.state2='success':this.state2='error'
            }
        },
        onSubmit(){
            let loginInfo = {'password1':this.password1,'password2':this.password2,code:this.code}
            this.$store.dispatch('setPasswordAction',loginInfo)
            Indicator.open();
                setTimeout(() => {
                Indicator.close();
                if(this.$store.state.message==='ok'){
                    Toast({message:'修改成功，请前往登录'})
                    this.$router.push('/mobile/login')
                }else{
                  Toast({message:this.$store.state.message})
                //   console.log(this.$store.state.message)
                }
                }, 1000);
        }
    },
    mounted(){
        // console.log(this.code)
      if(this.$store.state.isLogin){
        this.$router.push('/mobile/index')
        // console.log(this.$store.state.isLogin)
      }else{
        this.$store.dispatch('getCsrftokenAction')
        this.$store.dispatch('confirmForgotCodeAction',this.code)
        setTimeout(() => {
            // console.log(this.$store.state.message)
            if(this.$store.state.message!=='ok'){
                Toast({message:this.$store.state.message})
            }else{
                this.confirmed=false
            }
        }, 1000);
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
}
</style>
