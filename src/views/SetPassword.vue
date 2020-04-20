<template>
    <div class='loginClass'>
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
        <el-form ref="form" :rules='rules' :model="form" label-width="80px">
            <el-form-item label="密码" prop='password'>
                <el-input v-model='form.password' show-password ></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop='password1'>
                <el-input v-model='form.password1' show-password ></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit('form')" :disabled='confirmed' v-loading.fullscreen.lock='fullscreenLoading'>确认</el-button>
                <el-button @click='cancel()'>取消</el-button>
                
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
// import axios from 'axios'
  export default {
      props:['code'],
    data() {
      return {
        form: {
          password:'',
          password1:''
        },
        rules:{
          password:[
            {required:true,message:'请输入密码',trigger:'change'}
          ],
          password1:[
              {required:true,message:'请再输入一遍密码！',trigger:'change'}
          ]
        },
        fullscreenLoading: false,
        confirmed:true,
        success:false,
        fail:false,
        time:3,
        message:''
      }
    },
    methods: {
      onSubmit(form) {
        this.$refs[form].validate((valid)=>{
          if(valid){
            let loginInfo = {'password1':this.$refs.form.model.password,'password2':this.$refs.form.model.password1,code:this.code}
            this.$store.dispatch('setPasswordAction',loginInfo)
            this.fullscreenLoading = true;
                setTimeout(() => {
                this.fullscreenLoading = false;
                if(this.$store.state.message==='ok'){
                    this.success=true;
                    this.fail=false;
                    this.message = '修改成功，请前往登录！'
                    setInterval(() => {
                        this.getTime()
                    }, 1000);
                }else{
                  this.message=this.$store.state.message;
                  this.fail=true
                //   console.log(this.$store.state.message)
                }
                }, 1000);
          }
        })
        
      },
      cancel(){
          this.$router.go(-1)
        // console.log(this.$store.state.message)
      },
      getTime(){
            if(this.time>0){
                this.time--
            }else{
                clearInterval();
                this.$router.push('/login')
            }
        }
    },
    mounted(){
      // console.log(this.$store.state.isLogin);
    //   console.log(this.code)
      if(this.$store.state.isLogin){
        this.$router.push('/index')
        // console.log(this.$store.state.isLogin)
      }else{
        this.$store.dispatch('getCsrftokenAction')
        this.$store.dispatch('confirmForgotCodeAction',this.code)
        setTimeout(() => {
            // console.log(this.$store.state.message)
            if(this.$store.state.message!=='ok'){
                this.message=this.$store.state.message;
                this.fail=true
            }else{
                this.confirmed=false
            }
        }, 1000);
      }
    }
  }
</script>

<style lang="scss" scoped>
.loginClass{
    width:30%;
    margin-left:35%;
    margin-top:50px;
}
</style>
