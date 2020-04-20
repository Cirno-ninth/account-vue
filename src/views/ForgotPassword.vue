<template>
    <div class='loginClass'>
            <el-alert
                :title="message"
                type="success"
                center
                show-icon
                v-show='success'>
            </el-alert>
            <el-alert
                :title="message"
                type="error"
                center
                show-icon
                v-show='fail'>
            </el-alert>
        <el-form ref="form" :rules='rules' :model="form" label-width="80px">
            <div>
              <el-form-item label="邮箱" prop='email'>
                <el-input v-model='form.email'></el-input>
              </el-form-item>
            </div>
            <el-form-item>
                <el-button type="primary" @click="onSubmit('form')" :disabled='this.$store.state.is_login' v-loading.fullscreen.lock='fullscreenLoading'>重置密码</el-button>
                <el-button @click='cancel()'>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
// import axios from 'axios'
  export default {
    data() {
      return {
        message:'',
        success:'',
        fail:'',
        form: {
          email:''
        },
        rules:{
          email:[
            {type:'email',required:true,message:'请输入正确的邮箱地址！',trigger:'blur'}
          ]
        },
        fullscreenLoading: false
      }
    },
    methods: {
      onSubmit(form) {
        this.$refs[form].validate((valid)=>{
          if(valid){
              let email = encodeURIComponent(this.$refs.form.model.email)
              let loginInfo = {'email':email}
              this.$store.dispatch('forgotPasswordAction',loginInfo);
              setTimeout(() => {
                  if(this.$store.state.message==='ok'){
                      this.success=true
                      this.message='重置成功，请前往邮箱确认！'
                  }else{
                      this.fail=true
                      this.message=this.$store.state.message
                  }
                  
              }, 1000);
          }
        })
        
      },
      cancel(){
          this.$router.go(-1)
        // console.log(this.$store.state.isLogin)
      }
    },
    mounted(){
      // console.log(this.$store.state.isLogin);
      if(this.$store.state.isLogin){
        this.$router.push('/index')
        // console.log(this.$store.state.isLogin)
      }else{
        this.$store.dispatch('getCsrftokenAction')
        // axios({
        //         url:'http://localhost:8000/get_token/'
        //         }).then(res=>{
        //         // console.log(res.data)
        //         this.csrf_token=res.data;
        //     })
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
