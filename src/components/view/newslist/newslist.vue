<template>
    <div class="newlist">
        <van-tabs v-model="active" animated swipeable=true sticky=true> 
        <van-tab    title="智能">
            <div  v-infinite-scroll="loadMore" infinite-scroll-distance="20"  class="newsList" >
           <span  v-for="(elem,i) of list" :key="i">
              <div class="nav" @click="title(elem.url)">
                 <div>
	                <img class="myimg" :src="elem.picUrl" />
                 </div>
                <div>
                    <p>{{elem.title}}</p>
                    <p>时间：{{elem.ctime}}</p>
                </div>
              </div>
           </span>
            </div>
        </van-tab>
        <van-tab   title="IT资讯">
              <div  v-infinite-scroll="firstload" infinite-scroll-distance="20"  class="newsList" >
           <span    v-for="(elem,i) of caijin" :key="i">
              <div class="nav"  @click="title(elem.url)" >
                 <div>
	                <img class="myimg" :src="elem.picUrl" />
                 </div>
                <div>
                    <p>{{elem.title}}</p>
                    <p>时间：{{elem.ctime}}</p>
                </div>
              </div>
           </span>
            </div>
        </van-tab>
        <van-tab   title="汽车">
             <div  v-infinite-scroll="rend" infinite-scroll-distance="20"  class="newsList" >
           <span   v-for="(elem,i) of cartNew" :key="i">
              <div class="nav"  @click="title(elem.url)">
                 <div>
	                <img class="myimg" :src="elem.picUrl" />
                 </div>
                <div>
                    <p>{{elem.title}}</p>
                    <p>时间：{{elem.ctime}}</p>
                </div>
              </div>
           </span>
            </div>
        </van-tab>
        <van-tab   title="国际">
              <div  v-infinite-scroll="send" infinite-scroll-distance="20"  class="newsList" >
           <span   v-for="(elem,i) of newinterlist" :key="i">
              <div class="nav"  @click="title(elem.url)">
                 <div>
	                <img class="myimg" :src="elem.picUrl" />
                 </div>
                <div>
                    <p>{{elem.title}}</p>
                    <p>时间：{{elem.ctime}}</p>
                </div>
              </div>
           </span>
            </div>
        </van-tab>
        </van-tabs>
    </div>
</template>
<script>
import { Indicator } from 'mint-ui';
export default {
    data(){
         return{
             list:[],
             active:0,
            currentPage:1,
            ds:0,
            caijin:[],
            caijinlist:0,
            cartNew:[],
            cartList:0,
            intershow:"",
            newinter:0,
            newinterlist:[],
            titlex:""
         }
    },
    created(){
    }
    ,methods:{
        add(a){
            console.log(a)
        },
        /* ============游戏=================== */
             loadMore(){
                 Indicator.open();
                 this.show=true
             this.ds++
                 var url=`${this.DATA.Gameurl}${this.ds}`
             this.$http.get(url).then(result => {
                 if (result.body.code==200) {
                     // 如果没有失败，应该把数据保存到 data 上
                     var data=result.body.newslist
                     data=this.list.concat(data)
                     this.list=data
                     this.show=false
                     Indicator.close();
                }else {
                this.$toast("获取新闻列表失败！");
               }
             })

         },
         firstload(){
             Indicator.open();
              this.caijinlist++
                var url=`${this.DATA.Iturl}${this.caijinlist}`
                 this.$http.get(url).then(result => {
                 if (result.body.code==200) {
                     // 如果没有失败，应该把数据保存到 data 上
                     var data=result.body.newslist
                     data=this.caijin.concat(data)
                     this.caijin=data
                     Indicator.close();
                }else {
                this.$toast("获取新闻列表失败！");
                }
                 })
         },
         rend(){
             Indicator.open();
             this.cartList++
             var url=`${this.DATA.Carurl}${this.cartList}`
                 this.$http.get(url).then(result => {
                 if (result.body.code==200) {
                     // 如果没有失败，应该把数据保存到 data 上
                     var data=result.body.newslist
                     data=this.cartNew.concat(data)
                     this.cartNew=data
                     Indicator.close();
                }else {
                this.$toast("获取新闻列表失败！");
                }
                 })
         },
         send(){
             Indicator.open();
             this.newinter++
             var url=`${this.DATA.Guourl}${this.newinter}`
              this.$http.get(url).then(result => {
                 if (result.body.code==200) {
                     // 如果没有失败，应该把数据保存到 data 上
                     var data=result.body.newslist
                     data=this.newinterlist.concat(data)
                     this.newinterlist=data
                     Indicator.close();
                }else {
                this.$toast("获取新闻列表失败！");
                }
                 })
         },
         title(a){
             /* this.$router.push(`/home/newslist/titlelist/`) */
             console.log(a)
             this.$router.push({
                    path:'/home/newslist/titlelist',
                    query:{
                        tit:a
                    }
             })
         }
    }
}
</script>
<style  lang="scss" >
.newlist{
    *{
        padding:0;
        margin:0;
    }
    .nav{
        height: 120px;
        border-bottom: 1px solid #ccc;
        display: flex;
        align-content: center;
        justify-content: center;
      	align-items: center;
        div:nth-child(1){
            width:180px;

        }
        div:nth-child(2){
            width: 48%;
            height: 100px;
                p:nth-child(1){
        width:100%;
        height:66px;
        padding-left:10px;
       /*  text-indent:20px; */
       overflow: hidden;
       color: black;
       font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
       font-size: 15px;
                }
                p:nth-child(2){
                    text-align: center;
                }
        }
    }
    img{
        width:180px;
        height: 108px;
        border:3px solid #ccc;
    }
    .van-tabs__line{
        z-index:0 !important;
        margin-bottom: 0 !important;
        background: black;
    }
}
.newsList {
        max-height:100vh;
        overflow-y: auto;
        width:100%;
}
.loding{
    text-align: center;
    margin-bottom:10px !important;
}
.van-tabs__nav{
      background-color: #f2f2f2 !important;
}
</style>
