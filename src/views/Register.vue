<template>
    <div class='loginClass'>
        <el-form ref="form" :rules='rules' :model="form" label-width="80px">
            <div>
              <el-form-item label="用户名" prop='name'>
                  <el-input v-model="form.name" ></el-input>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="邮箱" prop='email'>
                <el-input v-model='form.email' ></el-input>
              </el-form-item>
            </div>
            <el-form-item label="密码" prop='password'>
                <el-input v-model='form.password' show-password ></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop='password1'>
                <el-input v-model='form.password1' show-password ></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit('form')" :disabled='this.$store.state.is_login' v-loading.fullscreen.lock='fullscreenLoading'>注册</el-button>
                <el-button @click='cancel()'>取消</el-button>
                <el-link type="info" id='toLogin' href='/#/login'>已有账号？去登录</el-link>
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
          password1:'',
          email:''
        },
        rules:{
          name:[
            {required:true,message:'请输入用户名！',trigger:'blur'}
          ],
          email:[
            {type:'email',required:true,message:'请输入正确的邮箱地址！',trigger:'blur'}
          ],
          password:[
            {required:true,message:'请输入密码',trigger:'change'}
          ],
          password1:[
              {required:true,message:'请再输入一遍密码！',trigger:'change'}
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
            let loginInfo = {'username':this.$refs.form.model.name,'email':email,'password1':this.$refs.form.model.password,'password2':this.$refs.form.model.password1}
            this.$store.dispatch('registerAction',loginInfo)
            this.fullscreenLoading = true;
                setTimeout(() => {
                this.fullscreenLoading = false;
                if(this.$store.state.message==='ok'){
                  this.$message({
                    message: '注册成功，请前往邮箱确认！',
                    type: 'success'
                  })
                  this.$router.push('/login')
                }else{
                  this.$message.error( this.$store.state.message);
                //   console.log(this.$store.state.message)
                }
                }, 1000);
          }
        })
        
      },
      cancel(){
          this.$router.go(-1)
        // console.log(this.$store.state.message)
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
#toLogin{
    margin-left:10px;
}
</style>
