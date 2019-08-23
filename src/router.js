import Vue from 'vue'
import Router from 'vue-router'
import home from './components/home'
import member from './components/member'
import shopcar from './components/shopcar'
import search from './components/searvh'
import homenewslist from './components/view/newslist/newslist'
import hometitlelit from './components/view/newslist/titlelist'
import homedianyinglist from './components/view/dianyinglist/dianyinglist'
import movietitle from './components/view/dianyinglist/movietitle'
import insert from './components/view/login/insert'
import login from "./components/view/login/login";
import video from "./components/view/dianyinglist/video/video"
import fenxiang from "./components/view/fenxiang/fenxiang"
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/home'
    },
    {
      path: '/home',
      component:home
    },
    {
      path: '/member',
      component:member
    },
    {
      path: '/shopcar',
      component:shopcar
    },
    {
      path: '/search',
      component:search
    },
    /* =========登陆=========== */
    {
      path: '/home/login',
      component:login
    },
    {
      path: '/home/login/insert',
      component:insert
    },
    /* ===========分享============== */
    {
      path: '/home/fenxiang',
      component:fenxiang
    },
    /* ==========新闻=========== */
    {
      path:'/home/newslist',
      component:homenewslist
    },
    {
      path:'/home/newslist/titlelist',
      component:hometitlelit,
    },
    /* ==============电影============== */
    {
      path:'/home/dianyinglist',
      component:homedianyinglist
    },
    {
      path:'/home/dianyinglist/movietitle/:lid',
      component:movietitle,
      props:true
    },
    {
      path:'/home/video',
      component:video,
    }
 
  ],
  linkActiveClass:'mui-active'
})