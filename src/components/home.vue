<template>
    <div class="d1">
        <div @click="alert">
        <mt-swipe :auto="4000" >
<!--         <mt-swipe-item v-for="(elem,i) of list"  :key="i"><img :src="`https://cn.bing.com/`+elem.url"></mt-swipe-item>
 -->         
        <mt-swipe-item><img src="../assets/img/downloa12d.jpg" alt=""></mt-swipe-item>
        <mt-swipe-item ><img src="../assets/img/download.jpg" alt=""></mt-swipe-item>
        <mt-swipe-item><img src="../assets/img/download1.jpg" alt=""></mt-swipe-item>
        <mt-swipe-item><img src="../assets/img/ShastaVideo_ZH-CN10595902413_1920x1080.jpg" alt=""></mt-swipe-item>
        </mt-swipe>
        </div>
          <ul class="mui-table-view mui-grid-view mui-grid-9">
              <li class="mui-table-view-cell  mui-media mui-col-xs-4  mui-col-sm-4"><router-link  to="/home/newslist">
                  <img src="../assets/quanbuxinwen.svg" alt="">
              <div class="mui-media-body">新闻资讯</div></router-link></li>
              <li class="mui-table-view-cell  mui-media mui-col-xs-4  mui-col-sm-4"><router-link  to="/home/fenxiang">
                  <img src="../assets/fenxiang.svg" alt="">
              <div class="mui-media-body">分享</div></router-link></li>
              <li class="mui-table-view-cell  mui-media mui-col-xs-4  mui-col-sm-4"><router-link  to="">
                  <img src="../assets/shangpin.svg" alt="">
               <div class="mui-media-body">购物</div></router-link></li>
              <li class="mui-table-view-cell  mui-media mui-col-xs-4  mui-col-sm-4"><router-link  to="">
                 <img src="../assets/lianxi.svg" alt="">
              <div class="mui-media-body">联系我们</div></router-link></li>
              <li class="mui-table-view-cell  mui-media mui-col-xs-4  mui-col-sm-4"><router-link  to="/home/login">
                  <img src="../assets/denglu.svg" alt="">
              <div class="mui-media-body">登陆</div></router-link></li>
              <li class="mui-table-view-cell  mui-media mui-col-xs-4  mui-col-sm-4"><router-link to="/home/dianyinglist">
                   <img src="../assets/dianying.svg" alt=""> 
                <div class="mui-media-body">豆瓣电影</div></router-link></li>
            </ul>
    </div>
</template>
<script>
import { ImagePreview } from 'vant';
export default {
    data(){
        return{
          list:[]
        }
    },
    created(){
         /* this.getlunbotu();  */
    },
    methods:{
        alert(){
                ImagePreview([
                     `${this.DATA.login}img/downloa12d.jpg`,
                     `${this.DATA.login}img/download.jpg`,
                     `${this.DATA.login}img/download1.jpg`,
                     `${this.DATA.login}img/ShastaVideo_ZH-CN10595902413_1920x1080.jpg`
                  
               ]);
        },
     /*     getlunbotu(){
             this.$http.get('http://127.0.0.1:3000/bing').then((response) => {
          this.movie = response.data;
          console.log(this.movie);
      }); 
      
        }  */
           /*    getlunbotu(){
          var url="bing"
          var num1="http://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=3&mkt=zh-CN"
          var obj={num1:num1}
          this.axios.get(url,{params:obj}).then(result=>{
               this.list=result.data.data.images
            console.log(typeof(result))
            console.log(result)
          })
         } */
        
    }
}
</script>
<style lang="scss" scoped>
    .mint-swipe{
        height:190px;
        .mint-swipe-item{
              img{
                width:100%;
              }
        }
    }  
    .d1{
        height:460px;
        margin-top: 10px;
    }
    body{
        background:#f2f2f2;
    }
</style>
