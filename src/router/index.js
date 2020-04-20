import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/views/Index'
import IndexMobile from '@/views/mobile/Index'
import Login from '@/views/Login'
import LoginMobile from '@/views/mobile/Login'
import Register from '@/views/Register'
import RegisterMobile from '@/views/mobile/Register'
import Confirm from '@/views/Confirm'
import ConfirmMobile from '@/views/mobile/Confirm'
import Person from '@/views/Person'
import PersonMobile from '@/views/mobile/Person'
import ForgotPassword from '@/views/ForgotPassword'
import ForgotPasswordMobile from '@/views/mobile/ForgotPassword'
import SetPassword from '@/views/SetPassword'
import SetPasswordMobile from '@/views/mobile/SetPassword'



Vue.use(VueRouter)

const routes = [
  {
      path:'/index',
      component:Index
  },
  {
    path:'/mobile/index',
    component:IndexMobile
  },
  {
      path:'/login',
      component:Login
  },
  {
    path:'/mobile/login',
    component:LoginMobile
  },
  {
    path:'/register',
    component:Register
  },
  {
    path:'/mobile/register',
    component:RegisterMobile
  },
  {
    path:'/confirm/:code',
    component:Confirm,
    props:true
  },
  {
    path:'/mobile/confirm/:code',
    component:ConfirmMobile,
    props:true
  },
  {
    path:'/set_password/:code',
    component:SetPassword,
    props:true
  },
  {
    path:'/mobile/set_password/:code',
    component:SetPasswordMobile,
    props:true
  },
  {
    path:'/person',
    component:Person
  },
  {
    path:'/mobile/person',
    component:PersonMobile
  },
  {
    path:'/forgot-password',
    component:ForgotPassword
  },
  {
    path:'/mobile/forgot-password',
    component:ForgotPasswordMobile
  },
  {
      path:'',
      component:Index
  },
  {
      path:'*',
      component:Index
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
