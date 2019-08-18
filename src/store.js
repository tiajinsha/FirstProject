import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'

Vue.use(VueResource) 

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      login:0,
      showTabar:false,
      loadMore:[],
      firstload:[],
      rend:[],
      send:[],
      count:0
    },
  mutations: {
    /* 登录判定 */
    increment(state){
      state.login=1;
    },
    loginUp(state){
      state.login=0;
    },
    /* bar隐藏 */
    bar(state){
      state.showTabar=true
    },
    /* 新闻缓存 */
    loadMore(state,data){
      state.loadMore=data
      /* tablebar定位 */
        state.count=0
    },
    firstload(state,data){
        state.firstload=data
        state.count=1
    },
    rend(state,data){
        state.rend=data
        state.count=2
    },
    send(state,data){
        state.send=data
        state.count=3
    }
  },
  actions: {

  }
})
/* state:{cartCount:0}
  mutations:{
     increment(state){
       state.cartCount++;
     }
  },
  getters:{
     getCartCount(state){
       return state.cartCount;
     }
   }
  this.$store.commit("increment");
  App.vue  {{$store.getters. getCartCount}} */