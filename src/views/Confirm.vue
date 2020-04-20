<template>
    <div>
        <div v-show='success'>
            <el-alert
                :title='message'
                type="success"
                center
                show-icon>
            </el-alert>
            <el-link type="info" href='/#/login'>{{time}}秒后自动跳转，若未跳转请点击这里</el-link>
        </div>
        <div v-show='fail'>
            <el-alert
                :title="message"
                type="error"
                center
                show-icon>
            </el-alert>
        </div>
    </div>
</template>
<script>
export default {
    props:['code'],
    data(){
        return{
            success:false,
            fail:false,
            message:'',
            time:3
        }
    },
    mounted(){
        this.$store.dispatch('confirmAction',this.code)
        setTimeout(()=>{
            if(this.$store.state.message==='ok'){
                // console.log('ok')
                this.success=true;
                this.fail=false;
                this.message = '确认成功，请前往登录！'
                setInterval(() => {
                    this.getTime()
                }, 1000);
            }else{
                // console.log(this.$store.state.message)
                this.fail=true;
                this.message = this.$store.state.message
            }
        },1000)
    },
    methods:{
        getTime(){
            if(this.time>0){
                this.time--
            }else{
                clearInterval();
                this.$router.push('/login')
            }
        }
    }
}
</script>
