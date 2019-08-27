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
            <span class="mui-tab-label">说说</span>
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
   /*    var db = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);
        db.transaction(function (tx) {
   tx.executeSql('SELECT * FROM LOGS', [], function (tx, results) {
      console.log(results)
   }, null);
}); */
       this.flag=this.$route.path==="/home" ? true :false;
      },methods:{
            onClickLeft() {
               if(this.$route.path==="/member"||this.$route.path==="/search"||this.$route.path==="/shopcar"){
                this.$router.push("/home")
               }else{
                this.$router.go(-1)
               }
        },
        onClickRight() {
              alert()
        }
    },
    mounted(){

  /*   var db = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);
    db.transaction(function (tx) {
   tx.executeSql('CREATE TABLE IF NOT EXISTS LOGS (id unique, log)');
   tx.executeSql('INSERT INTO LOGS (id, log) VALUES (1, "啊是有点尬防守他的依然有我回到家擦口水")');
   tx.executeSql('INSERT INTO LOGS (id, log) VALUES (2, "www.runoob.com")');
}); */
    },
    watch:{
         '$route.path':function(newVal){
            if(newVal==='/home'){
                this.flag=true;
            }else{
              this.flag=false
            }
        },
         $route(to){
          if(to.path==='/home'){
            this.awd="首页"
          }else if(to.path==="/member"){
            this.awd="说说"
          }else if(to.path==='/shopcar'){
            this.awd="购物车"
          }else if(to.path==="/search"){
            this.awd="我的"
          }else if(to.path==='/home/login'){
            this.awd="登陆"    
          }else if(to.path==='/home/login/insert'){
            this.awd="注册"  
          }else if(to.path==='/home/newslist'){
            this.awd="新闻"
          }else if(to.path==='/home/newslist/titlelist'){
            this.awd="新闻"
          }else if(to.path==='/home/dianyinglist'){
            this.awd="电影"
          }else if(to.path==='/home/dianyinglist/movietitle'){
            this.awd="电影"
          }else if(to.path==='/home/video'){
            this.awd="视频"
          }else if(to.path==='/home/fenxiang'){
            this.awd="分享"
          }else{
            this.awd="详情"
          }
        }  
    },
 }
 </script>
<style>
body{
  background:#efeff4;
}
   #app{
     padding-top:30px;
     padding-bottom: 0;
     /* overflow-x: hidden; */
   }
   img{
     font-size: 20px;
   }/* 专场动画哈哈哈哈哈哈哈哈哈哈哈哈 */
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
