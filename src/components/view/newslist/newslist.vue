<template>
    <div class="newlist">
        <van-tabs v-model="active" animated>
        <van-tab    title="互联网">
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
            <van-loading  v-show="this.show==true" size="24px" class="loding">加载中...</van-loading>
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
            <van-loading  v-show="this.caijinshow==true" size="24px" class="loding">加载中...</van-loading>
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
            <van-loading  v-show="this.cartShow==true" size="24px" class="loding">加载中...</van-loading>
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
            <van-loading  v-show="this.intershow==true" size="24px" class="loding">加载中...</van-loading>
        </van-tab>
        </van-tabs>
      
    </div>
</template>
<script>
export default {
    data(){
         return{
             list:[],
             active:0,
            currentPage:1,
            ds:0,
            show:"",
            caijin:[],
            caijinshow:"",
            caijinlist:0,
            cartNew:[],
            cartList:0,
            cartShow:"",
            intershow:"",
            newinter:0,
            newinterlist:[],
            titlex:""
         }
    }
    ,methods:{
        add(a){
            console.log(a)
        },
        /* ============互联网=================== */
             loadMore(){
                 this.show=true
             this.ds++
                 var url=`http://api.tianapi.com/mobile/?key=d171ec3c4755783de7dc5b00fed440ee&num=10&page=${this.ds}`
             this.$http.get(url).then(result => {
                 if (result.body.code==200) {
                     // 如果没有失败，应该把数据保存到 data 上
                     var data=result.body.newslist
                     data=this.list.concat(data)
                     this.list=data
                     this.show=false
                }else {
                this.$toast("获取新闻列表失败！");
               }
             })

         },
         firstload(){
              this.caijinshow=true
              this.caijinlist++
                var url=`http://api.tianapi.com/it/?key=d171ec3c4755783de7dc5b00fed440ee&num=10&page=${this.caijinlist}`
                 this.$http.get(url).then(result => {
                 if (result.body.code==200) {
                     // 如果没有失败，应该把数据保存到 data 上
                     var data=result.body.newslist
                     data=this.caijin.concat(data)
                     this.caijin=data
                     this.caijinshow=false
                }else {
                this.$toast("获取新闻列表失败！");
                }
                 })
         },
         rend(){
               this.cartShow=true
             this.cartList++
             var url=`http://api.tianapi.com/auto/?key=d171ec3c4755783de7dc5b00fed440ee&num=10&page=${this.cartList}`
                 this.$http.get(url).then(result => {
                 if (result.body.code==200) {
                     // 如果没有失败，应该把数据保存到 data 上
                     var data=result.body.newslist
                     data=this.cartNew.concat(data)
                     this.cartNew=data
                     this.cartShow=false
                }else {
                this.$toast("获取新闻列表失败！");
                }
                 })
         },
         send(){
             this.intershow=true;
             this.newinter++
             var url=`http://api.tianapi.com/world/?key=d171ec3c4755783de7dc5b00fed440ee&num=10&page=${this.newinter}`
              this.$http.get(url).then(result => {
                 if (result.body.code==200) {
                     // 如果没有失败，应该把数据保存到 data 上
                     var data=result.body.newslist
                     data=this.newinterlist.concat(data)
                     this.newinterlist=data
                     this.intershow=false
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
<style  lang="scss">
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
    }
}
.newsList {
        max-height:82vh;
        overflow-y: auto;
}
.loding{
    text-align: center;
    margin-bottom:10px !important;
}
</style>
