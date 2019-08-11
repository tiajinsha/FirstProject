<template>
  <div id="app">
       <mt-header fixed :title="awd" >
         <p  class="p1" @click="onClickLeft()" slot="left" v-show="flag==false">
              <mt-button icon="back">返回</mt-button>
         </p>
         <mt-button icon="more" slot="right"></mt-button>
       </mt-header>
      <transition >
       <router-view class="app"></router-view>
      </transition>
        <nav class="mui-bar mui-bar-tab" v-show="flag==true">    
            <router-link class="mui-tab-item" to="/home">
            <span class="mui-icon mui-icon-home"></span>
           <span class="mui-tab-label">首页</span>
            </router-link>
              <router-link class="mui-tab-item  " to="/member">
           <span class="mui-icon mui-icon-pengyouquan"></span>
          <span class="mui-tab-label">会员</span>
            </router-link>
              <router-link class="mui-tab-item " to="/shopcar">
          <span class="mui-icon mui-icon-extra  mui-icon-extra-cart  "><span class="mui-badge">9</span></span>
          <span class="mui-tab-label">购物车</span>
            </router-link>
              <router-link class="mui-tab-item " to="/search">
            <span class="mui-icon mui-icon-contact "></span>
           <span class="mui-tab-label" v-show="this.$store.state.login==1">我的</span>
            <span class="mui-tab-label" v-show="this.$store.state.login==0">未登录</span>
            </router-link>
        </nav> 
  </div>
</template>
 <script>
 export default {
    data() {
      return  {
        selected:"",
        title:"",
        awd:"欢迎",
        x:"dsad",
        flag:false,
        showBar:false
      }
    },created(){
       this.flag=this.$route.path==="/home" ? true :false;
      },methods:{
            onClickLeft() {
               this.$router.go(-1)
        },
        onClickRight() {
              alert()
        }
    },
    watch:{
        '$route.path':function(newVal){
            if(newVal==='/home'){
                this.flag=true;
            }else{
              this.flag=false
            }
        }
    }
 }
 </script>
 
<style>
body{
  background:#efeff4;
}
   #app{
     padding-top:40px;
     padding-bottom: 50px;
     /* overflow-x: hidden; */
   }
   img{
     font-size: 20px;
   }
   .v-enter{
     opacity: 0;
     transform: translateX(100%);
   }
      .v-leave-to{
     opacity: 0;
     transform: translateX(-100%);
     position: absolute;
   }
   .v-enter-active, 
   .v-leave-active{
     transition: all 0.5s ease;
   }
   .mui-bar{
     box-shadow: 0 0 0 !important;
   }
   .p1{
     margin-bottom:0 !important;
   }
   .mint-header{
     background: #f2f2f2 !important;
   }
  .mint-button{
    color: black !important;
  }
  .mint-header-title{
    color: black !important;
  }
</style>
