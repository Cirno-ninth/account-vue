<template>
    <div>
        <div id='header'>
            <mt-header fixed title="CirnoVip" >
                <mt-button icon="back" slot='left' @click='$router.go(-1)'></mt-button>
            </mt-header>
        </div>
        <div class="body">
            <mt-field label="邮箱" placeholder="请输入邮箱" type="email" v-model="email" class='input' :state='state1' @input='checkV()'></mt-field>
            <mt-button type="primary" size='large' class='button' @click='onSubmit()'>确认</mt-button>
        </div>
    </div>
</template>

<script>
import { Indicator,Toast } from 'mint-ui'
export default {
    data(){
        return{
            email:'',
            state1:null
        }
    },
    methods:{
        checkV(){
            let reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
            reg.test(this.email)?this.state1='success':this.state1='error'
        },
        onSubmit(){
            if(this.state1!='success'){
                Toast({
                    message: '请检查填写的内容',
                    duration: 5000
                });
                return
            }
            Indicator.open();
            let email = encodeURIComponent(this.email)
            let loginInfo = {'email':email}
            this.$store.dispatch('forgotPasswordAction',loginInfo);
            setTimeout(()=>{
                Indicator.close();
                if(this.$store.state.message==='ok'){
                    Toast({message: '操作成功'});
                    this.$router.push('/mobile/index')
                }else{
                    Toast({message: this.$store.state.message});
                }
            },1000)
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
