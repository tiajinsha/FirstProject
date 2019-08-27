<template>
    <div class="newlist">
        <van-tabs v-model="active" animated swipeable sticky> 
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
                     this.$store.commit("loadMore",this.list)
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
                     this.$store.commit("firstload",this.caijin)
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
                     this.$store.commit("rend",this.cartNew)
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
                     /* vuex缓存 */
                     this.$store.commit("send",this.newinterlist)
                     Indicator.close();
                }else {
                this.$toast("获取新闻列表失败！");
                }
                 })
         },
         title(a){
             /* this.$router.push(`/home/newslist/titlelist/`) */
             /* 路由传参 */
             this.$router.push({
                    path:'/home/newslist/titlelist',
                    query:{
                        tit:a
                    }
             })
         }
    },
    mounted(){
        /* 获取tablebar状态 */
        this.active=this.$store.state.count
        /* 新闻缓存 */
        if(this.$store.state.loadMore.length>0){
                this.list=this.$store.state.loadMore
        }
        if(this.$store.state.firstload.length>0){
             this.caijin=this.$store.state.firstload
        }
        if(this.$store.state.rend.length>0){
             this.cartNew=this.$store.state.rend
        }
        if(this.$store.state.send.length>0){
             this.newinterlist=this.$store.state.send
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
       box-shadow: 0 0 1px #999;
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
        box-shadow: 0 0 6px #999;
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
