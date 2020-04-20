<template>
    <div>
        <div id='header'>
            <mt-header fixed title="CirnoVip" >
                <mt-button icon="back" slot='left' @click='$router.go(-1)'></mt-button>
            </mt-header>
        </div>
        <div class="body">
            <mt-field label="用户名" placeholder="请输入用户名" v-model="username" class='input' :state='state[0]' @input='checkV("username")'></mt-field>
            <mt-field label="邮箱" placeholder="请输入邮箱" type="email" v-model="email" class='input' :state='state[1]' @input='checkV("email")'></mt-field>
            <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password1" class="input" :state='state[2]' @input='checkV("password1")'></mt-field>
            <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password2" class="input" :state='state[3]' @input='checkV()'></mt-field>
            <mt-button type="primary" size='large' class='button' @click='onSubmit()'>注册</mt-button>
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
            password1:'',
            password2:'',
            state:[]
        }
    },
    methods:{
        checkV(type){
            if(type=='username'){
                this.username? this.state[0]='success': this.state[0]='error'
            }else if(type=='email'){
                let reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
                reg.test(this.email)?this.state[1]='success':this.state[1]='error'
                // console.log(reg.test(this.email))
            }else if(type=='password1'){
                this.password1?this.state[2]='success': this.state[2]='error'
            }else{
                this.password2?this.state[3]='success':this.state[3]='error'
            }
        },
        onSubmit(){
            if(this.checkState()===false){
                Toast({
                    message: '请检查填写的内容',
                    duration: 5000
                });
                return
            }
            Indicator.open();
            let email = encodeURIComponent(this.email)
            let loginInfo = {'username':this.username,'email':email,'password1':this.password1,'password2':this.password2}
            this.$store.dispatch('registerAction',loginInfo)
            setTimeout(()=>{
                Indicator.close();
                if(this.$store.state.message==='ok'){
                    Toast({message: '注册成功，请查看邮箱！'});
                    this.$router.push('/mobile/login')
                }else{
                    Toast({message: this.$store.state.message});
                }
            },1000)
        },
        checkState(){
            for(let i=0;i<4;i++){
                if(this.state[i]!='success'){
                    return false;
                }
            }
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
}
</style>

