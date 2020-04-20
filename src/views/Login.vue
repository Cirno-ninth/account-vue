<template>
    <div class='loginClass'>
        <el-form ref="form" :rules='rules' :model="form" label-width="80px">
            <div v-if='this.loginName'>
              <el-form-item label="用户名" prop='name'>
                  <el-input v-model="form.name" key='name'></el-input>
              </el-form-item>
            </div>
            <div v-else>
              <el-form-item label="邮箱" prop='email'>
                <el-input v-model='form.email' key='email'></el-input>
              </el-form-item>
            </div>
            <el-form-item label="密码" prop='password'>
                <el-input v-model='form.password' show-password ></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit('form')" :disabled='this.$store.state.is_login' v-loading.fullscreen.lock='fullscreenLoading'>登入</el-button>
                <el-button type='primary' @click='switchLoginType(loginName)' :disabled="this.$store.state.is_login">{{loginType}}</el-button>
                <el-button @click='cancel()'>取消</el-button>
                <el-link type="info" id='register' href='/#/register'>没有账号？注册一个</el-link>
                <p><el-link type="info" href='/#/forgot-password'>找回密码</el-link></p>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
// import axios from 'axios'
  export default {
    data() {
      return {
        form: {
          name:'',
          password:'',
          email:''
        },
        rules:{
          name:[
            {required:true,message:'请输入用户名！',trigger:'change'}
          ],
          email:[
            {type:'email',required:true,message:'请输入正确的邮箱地址！',trigger:'change'}
          ],
          password:[
            {required:true,message:'请输入密码',trigger:'change'}
          ]
        },
        fullscreenLoading: false,
        loginName:true,
        loginType:'邮箱登录'
      }
    },
    methods: {
      switchLoginType(type){
        this.loginName = !this.loginName
        if(type){
          this.loginType='用户名登录'
        }else{
          this.loginType='邮箱登录'
        }
      },
      onSubmit(form) {
        this.$refs[form].validate((valid)=>{
          if(valid){
            let loginInfo = null
            if(this.loginName){
              loginInfo = {'username':this.$refs.form.model.name,'password':this.$refs.form.model.password}
              this.$store.dispatch('getUserAction',loginInfo);
            }else{
              let email = encodeURIComponent(this.$refs.form.model.email)
              loginInfo = {'email':email,'password':this.$refs.form.model.password}
              this.$store.dispatch('getEUserAction',loginInfo)
            }
            this.fullscreenLoading = true;
                setTimeout(() => {
                this.fullscreenLoading = false;
                if(this.$store.state.isLogin){
                  this.$message({
                    message: '欢迎回来,'+this.$store.state.username,
                    type: 'success'
                  })
                  this.$router.push('/index')
                }else{
                  this.$message.error( this.$store.state.message);
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
#register{
  margin-left:10px; 
}
</style>
