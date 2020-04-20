import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin:false,
    username:'',
    userid:'',
    csrf_token:'',
    message:''
    // user:[]
  },
  mutations: {
    // userMutation(state,data){
    //     state.user = data;
    //     state.isLogin=true
    // },
    getUserMutation(state,data){
      state.message = data;
      if(data.userid){
        state.isLogin=true
        state.userid = data.userid;
        state.username = data.username;
      }
    },
    getCsrftokenMutation(state,data){
      state.csrf_token=data
    },
    logoutMutation(state){
      state.isLogin=false;
      state.username='';
      state.userid=''
    }
  },
  actions: {
    setPasswordAction({commit,state},loginInfo){
      let userinfo='csrfmiddlewaretoken='+state.csrf_token+'&password1='+loginInfo.password1+'&password2='+loginInfo.password2+'&code='+loginInfo.code
      axios.post(
        `http://localhost:8000/login/set_password/`,
        userinfo,
        {headers:{'X-CSRFToken':this.csrf_token}}
      ).then(res=>{
        commit('getUserMutation',res.data)
      })
    },
    confirmForgotCodeAction({commit},code){
      axios({
        url:'http://localhost:8000/login/forgot_password/?code='+code
      }).then(res=>{
        commit('getUserMutation',res.data)
      })
    },
    forgotPasswordAction({commit,state},loginInfo){
      let userinfo='csrfmiddlewaretoken='+state.csrf_token+'&email='+loginInfo.email
      axios.post(
        `http://localhost:8000/login/forgot_password/`,
        userinfo,
        {headers:{'X-CSRFToken':this.csrf_token}}
      ).then(res=>{
        commit('getUserMutation',res.data)
      })
    },
    confirmAction({commit},code){
      axios({
        url:'http://localhost:8000/login/confirm/?code='+code
      }).then(res=>{
        commit('getUserMutation',res.data)
      })
    },
    registerAction({commit,state},loginInfo){
      let userinfo='csrfmiddlewaretoken='+state.csrf_token+'&username='+loginInfo.username+'&password1='+loginInfo.password1+'&password2='+loginInfo.password2+'&email='+loginInfo.email
      // commit('getUserMutation',userinfo)
      axios.post(
        `http://localhost:8000/login/register/`,
        userinfo,
        {
          headers:{'X-CSRFToken':this.csrf_token}
        }
      ).then(res=>{
        commit('getUserMutation',res.data)
      })
    },
    getUserAction({commit,state},loginInfo){
      let userinfo = 'csrfmiddlewaretoken='+state.csrf_token+'&username='+loginInfo.username+'&password='+loginInfo.password
      // commit('getUserMutation',userinfo)
        axios.post(
            `http://localhost:8000/login/login/`,
            userinfo,
            {
                headers:{'X-CSRFToken':this.csrf_token}
            }
        ).then(res=>{
            // console.log(res)
            commit('getUserMutation',res.data)
        })
    },
    getEUserAction({commit,state},loginInfo){
      let userinfo='csrfmiddlewaretoken='+state.csrf_token+'&email='+loginInfo.email+'&password='+loginInfo.password
      axios.post(
        `http://localhost:8000/login/email_login/`,
        userinfo,
        {
          headers:{'X-CSRFToken':this.csrf_token}
        }
      ).then(res=>{
        commit('getUserMutation',res.data)
      })
    },
    getCsrftokenAction({commit}){
      axios({
        url:'http://localhost:8000/get_token/'
        }).then(res=>{
        commit('getCsrftokenMutation',res.data)
    })
    }
    // getUserAction({commit},userinfo){
    //     axios.post(
    //         `http://localhost:8000/login/login`,
    //         userinfo
    //     ).then(res=>{
    //         commit('userMutation',res)
    //     })
    //     // commit('userMutation',userinfo)
    // }
  },
  modules: {
  }
})
