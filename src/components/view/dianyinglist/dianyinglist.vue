<template>
     <div class="d1">
         <ul v-for="(elem,i) of list" :key="i">
             <li>
                 <img :src="elem.images.small">
             </li>
             <li class="ul">
                 <p>{{elem.title}}</p>
                 <p>评分:{{elem.rating.average}}</p>
                 <p>
                     主演:
                     <span v-for="(elem,i) of elem.casts" :key="i">{{elem.name}},</span>
                 </p>
                 <p>上映日期:{{elem.mainland_pubdate}}</p>
                 <van-button class="btn2" type="" :data-id="elem.id" @click="title" size="large">查看详情</van-button>
             </li>
         </ul>
         <van-button v-show="this.list.length>0" class="btn" type="info" size="large" @click="add()">加载更多</van-button>
      </div>
</template>
<script>
import { Indicator } from 'mint-ui';
export default {
   data(){
       return{
        list:[],
        start:-10
        
       }
   },
   created(){
       this.movielist();
   },
   methods:{
        add(){
            this.movielist() 
       },
       movielist(){
           //加载提示
       Indicator.open({
       text: '加载中...',
       spinnerType: 'fading-circle'
      });
            var start=this.start+=10
            var url =`http://api.douban.com/v2/movie/in_theaters?apikey=0df993c66c0c636e29ecbb5344252a4a`
                url+=`&start=${start}&count=10`;
              this.$http.jsonp(url, {},{ 
                headers: {},
                emulateJSON: true }).then((response) => {
                var result=response.body.subjects
                  result=this.list.concat(result);
                   this.list=result
                  Indicator.close();
                  if(start>40){
                     this.$toast("没有更多的了"); 
                  }
             });
       },
       /*  */
       title(e){
           /* data-id传参 */
           var cb= e.target.dataset.id;
            this.$router.push(`/home/dianyinglist/movietitle/${cb}`)
       }
   } 
}
</script>
<style scoped>
img{
    margin-top: 20px;
      height:250px;
        box-shadow: 0 0 6px #999;
        margin-left:10px;
        width: 177px;
}
ul{
    width:100%;
    height:290px;
    display: flex;
}
ul>li{
    width:196px;
}
.d1{
    margin-top: 10px;
}
.btn{
    margin-bottom: 50px;
    width: 100%;
}
p{
    text-align: center
}
ul>li p:nth-child(1){
    margin-top: 10px;
    font-size: 25px;
    font-weight: 1000;
    color:black;
    overflow: hidden;
    height: 37px;
    white-space: nowrap;
        text-overflow: ellipsis;
        line-height:34px;
}
ul>li p:nth-child(2){
    margin-top: 20px;
    font-size: 20px;
    font-weight: 1000;
    color:rgb(135, 143, 26);
    overflow: hidden;
}
ul>li p:nth-child(3){
    height: 27px;
}
ul>li label{
    overflow: hidden;
    font-size: 10px;
    text-align: center;
}
.btn2{
    margin-top:34px;
}
.ul{
    height: 250px;
    overflow: hidden;
    margin-top: 20px;
    width:45vw;
}
</style>