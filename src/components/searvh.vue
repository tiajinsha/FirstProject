<template>
    <div>
        <mt-popup
         v-model="popupVisible"
         position="top">
           注销成功
        </mt-popup>
        <div class="item" ></div>
        <div class="link">
            <h3>个人主页</h3>
            <div class="background" v-if="this.$store.state.login==1" :style="{backgroundImage:`url(${this.DATA.login}${src})`}"></div>
            <div class="background"  v-else-if="this.$store.state.login==0"></div>
            <van-button plain  icon="photo-o" type="primary" @click=wadc()>头像</van-button>
            <van-button @click="loginUp" plain icon="friends-o" type="info">注销</van-button>
        </div>
    </div>
    
</template>
<script>
import { Popup } from 'mint-ui';
import { ImagePreview } from 'vant';
import { setInterval } from 'timers';
export default {
  data() {
    return {
        src:"",
        uname:"",
        id:"",
        a:"",
        popupVisible:false
    }
  }
  ,created(){
     setTimeout(() => {
         this.login() 
     },1000);
  },methods:{
      loginUp(){
          if(this.$store.state.login==0){
             this.$toast("请登录")
          }else{
              this.popupVisible=true
              var url="loginUp"
           this.axios.get(url).then(result=>{
             this.$router.push("/home")
             this.$store.commit("loginUp")
           })
          }
      },
      wadc(){
           if(this.$store.state.login==0){
                 this.$toast("请登录")
               }else{
                   ImagePreview([
/*                     `http://127.0.0.1:3000/${this.src}`
 */                    `${this.DATA.login}${this.src}`
               ]);
           }
      },
      login(){
           var url="loginMsg"
        this.axios.get(url).then(result=>{
           if(result.data.code==1){
           this.id=result.data.data[0].id
           this.src=result.data.data[0].img_url
           this.uname=result.data.data[0].uname
           }
        console.log(result)
       })
      }
  }
}/* destroy()  */
</script>
<style>
body{
    font-family: Helvetica Neue,Helvetica,STHeiTi,Arial,sans-serif;
}
.item{
    width:100%;
    height: 300px;
    border: 1px solid red;
    padding-top: 30px; 
    text-align: center;
    color: red;
    font-weight: 700;
    background-image: url('../assets/3 - 副本.jpg');
    opacity: 0.9;
    filter: blur(30px);
}
.link{
      position: relative;
      text-align: center;
      width:100vw;
      margin-top: -80vw;
}
.link h3{
     margin-top:15%;
}
.background{
    width: 150px;
    height: 150px;
    border-radius: 50%;
    border: 2px solid white;
    margin:15% auto;
    background-image: url('../assets/3 - 副本.jpg');
    background-size:cover;
}
.mint-popup-top{
    width: 100% !important;
    background-color: rgba(0,0,0,0.7)!important;
    height:50px !important;
    text-align: center!important;
    backface-visibility:hidden!important;
    color:#fff !important;
    line-height: 50px!important;
}
</style>   