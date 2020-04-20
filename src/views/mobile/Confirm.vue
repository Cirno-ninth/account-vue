<template>
    <div>
        <mt-spinner type="snake" color="#26a2ff"></mt-spinner>
        <router-link to='/login' v-show='success'>{{time}}秒后自动跳转，若未跳转请点击这里</router-link>
    </div>
</template>
<script>
import { Toast } from 'mint-ui';
export default {
    props:['code'],
    data(){
        return{
            message:'',
            time:3,
            success:false
        }
    },
    mounted(){
        this.$store.dispatch('confirmAction',this.code)
        setTimeout(()=>{
            if(this.$store.state.message==='ok'){
                // console.log('ok')
                this.success=true;
                Toast({message:'确认成功，请前往登录'});
                setInterval(() => {
                    this.getTime()
                }, 1000);
            }else{
                // console.log(this.$store.state.message)
                    Toast({message:this.$store.state.message})
            }
        },1000)
    },
    methods:{
        getTime(){
            if(this.time>0){
                this.time--
            }else{
                this.$router.push('/mobile/login')
                clearInterval();
            }
        }
    }
}
</script>
