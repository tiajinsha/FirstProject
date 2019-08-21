<template>
<div>
    <div class="parsent" :style="{backgroundImage:`url(${list.images.small})`}" >
    </div>
    <div class="item">
        <div>
            <span @click="add">
                <img :src=list.images.small alt="">
            </span>
            <span>
                    <p>{{list.original_title}}</p>
                    <p>{{this.list.aka[0]}}{{this.list.year}} </p>
                    <p>语言:{{list.languages[0]}}/{{list.countries[0]}}/{{list.genres[0]}}/{{list.genres[1]}}/{{list.genres[2]}}/{{list.pubdates[0]}}/{{list.durations[0]}}</p>
                    <van-button btn="btn1" size="small" plain  @click="icon(1)"  :icon=btn1icon >按钮</van-button>
                    <van-button size="small" plain  @click="icon(2)" :icon="btn2icon" >按钮</van-button>
                    <!--   <button>想看</button>
                    <button>看过</button> -->
            </span>
        </div>
        <div>
            <p>豆瓣评分:</p>
            <span>
                <strong>{{list.rating.average}}</strong>
                <p>评论数:{{list.comments_count}}</p>
            </span>
        </div>
        <div>

        </div>
    </div>
    <div class="box">
        <div class="box1">
            剧情简介
            <p>
               {{list.summary}}
            </p>
        </div>
        <div  class="start">
            演职员
            <ul class="people">
                <li>
                    <img :src=list.directors[0].avatars.large alt="">
                    <div>
                        <span>{{list.directors[0].name}}</span>
                        <p>导演</p>
                    </div>
                </li>

                <li v-for="(elem,i) of list.casts" :key="i">
                    <img :src=elem.avatars.large alt="">
                    <div>
                        <span>{{elem.name}}</span>
                        <p>演员</p>
                    </div>
                </li>
            </ul>
        </div>
        <!-- =============================================== -->
        <div class="score">
             <div class="start">
            预告片
            <ul class="video">
                <li class="awd" v-for="(elem,i) of list.trailers" :key="i" @click="title(elem.resource_url)">
                    <img :src=elem.medium  alt="">
                    <div class="asd">
                        <span>预告片{{++i}}</span>
                    </div>
                        <i class="videoicon"><van-icon name="play-circle-o" /></i>
                </li>
            </ul>
        </div>
        </div>
        <div class="popular">
            <span><h4>热门评论</h4></span>
            <div v-for="(elem,i) of list.popular_comments" :key="i" class="popular_list">
                <div >
                    <div :style="{backgroundImage:`url(${elem.author.avatar})`}">
                    </div>
                    <div>
                        {{elem.author.name}}<br>
                        {{elem.created_at}}
                    </div>
                </div>
                <div>
                   {{elem.content}}
                </div>
            </div>
             <div class="popular">
            <div v-for="(elem,i) of loadTitle" :key="i" class="popular_list">
                <div >
                    <div :style="{backgroundImage:`url(${elem.author.avatar})`}">
                    </div>
                    <div>
                        {{elem.author.name}}<br>
                        {{elem.title}}
                    </div>
                </div>
                <div>
                   {{elem.summary}}
                </div>
            </div>
        </div>
                <div @click="loadMore" class="loadMore" style="text-align:center">查看全部评论>></div>
        </div>
    </div>
    <van-rate readonly v-model="value" :count="10" /> 
</div>
</template>
<script>
import { ImagePreview } from 'vant';
export default {
data(){
    return{
        btn1icon:"star-o",
        btn2icon:"medel-o",
        list:[],
        value:"",
        image:[],
        loadTitle:[],
        src:""

    }
},
props:["lid"],
created(){
    
      this.movietitle()
      console.log(Math.floor(this.list.rating.average))
},
methods:{
    loadMore(){
        if(this.loadTitle.length<1){
       for(var elem of this.list.popular_reviews){
           this.loadTitle.push(elem)
           console.log(this.loadTitle)
       }
        }else{
            this.$toast("没有了")
        }

},
    icon(x){
        if(x==1){
            if(this.btn1icon=="star-o"){
                this.btn1icon="star"
            }else{
                 this.btn1icon="star-o"
                 location.href="http://106.12.179.113"
            }   
        }else{
            if(this.btn2icon=="medel-o"){
                this.btn2icon="medel"
            }else{
                 this.btn2icon="medel-o"
                  location.href="http://106.12.179.113:3001"
            }   
        }
},
    title(i){
        /* this.$router.push(`/home/video`) */
        /* 路由传参 */
         this.$router.push({
                    path:'/home/video',
                    query:{
                        tit:i
                    }
             })
    },
    /* 图片详情 */
    add(){
        for(var elem of this.list.photos){
           this.image.push(elem.image)
        }
        ImagePreview(this.image);
    },
    movietitle(){
                var url=`http://api.douban.com/v2/movie/subject/${this.lid}?apikey=0df993c66c0c636e29ecbb5344252a4a`
               this.$http.jsonp(url, {},{ 
                headers: {},
                emulateJSON: true }).then((response) =>{
                   var result=response.body
                   this.list=result
                   console.log(result)
                   this.value=Math.floor(response.body.rating.average)
             });  
    }
}
}
</script>
<style scoped lang="scss">
.popular{
    .loadMore{
        height: 40px;
        margin-bottom: 25px;
        margin-top:10px;
        border-bottom: 1px solid;
    }
    span h4{
        text-align: center;
        padding-bottom: 5px;
    }
    h4{
    border-bottom: 1px solid;

    }
    width: 94%;
    margin:0 auto;
    .popular_list{
        width: 100%;
        border-bottom: 1px solid;
        div:nth-child(1){
            display: flex;
            width:100%;
            height: 50px;
            div:nth-child(1){
                width: 50px;
                border-radius: 50%;
                margin-top:5px;
                /* 图片 */
            }
            div:nth-child(2){
                line-height:25px;
                margin-left: 5px;
                font-weight: 600;
                
            }
        }
        div:nth-child(2){
                  width:100%;
            text-indent: 20px;
            font-size: 15px;
            margin-bottom: 10px;
            padding-top: 10px;
            font-family: "微软雅黑";
        }
    }
}
.awd{
    position: relative;
}
.videoicon{
    position: absolute;
    top: 29%;
    color: white;
    font-size: 50px;
    left: 47%;

}
.van-button--small{
    margin-left: 10px;
}
span strong{
    color: yellow;
}
video{
    width: 100%;
}
/* *{
     overflow: hidden;
     font-family: Helvetica Neue,Helvetica,Roboto,Arial,sans-serif;
} */
.parsent{

    position: absolute;
    width:100%;
    height: 325px;
    padding-top: 30px; 
    background-image: url('../../../assets/3 - 副本.jpg');
    opacity: 0.9;
    filter: blur(30px);
}
.item{
       left:5%;
       position: absolute;
       width: 90%;
       display:inline-block;
       height: 300px;
       text-align: center;
       div:nth-child(1){
           width: 100%;
           height: 140px;
           margin: 20px auto;
           display: flex;
           span{
               display: inline-block;
           }
           span:nth-child(1){
               width:30%;
               height:140px;
               img{
                   width: 100px;
                   height: 140px;
                   margin-left:-15px;
               }
           }
            span:nth-child(2){
                width:70%;
               height:140px;
               p:nth-child(1){
                   font-size: 23px;
                   color: #fff;
                   text-align: left;
                   margin-bottom: 0;
               }
               p:nth-child(2){
                   font-size: 15px;
                   color: #fff;
                   text-align: left;
                   margin-bottom: 0;
               }
               p:nth-child(3){
                   color:rgba(255,255,255,0.7);
                   font-size: 11px;
                   text-align: left;
                   height: 38px; 
               }
               button{
                   width: 40%;
               }
           }
       }
       div:nth-child(2){
            width: 100%;
           height: 70px;
           margin: 0 auto;
           text-align: left;
           p:nth-child(1){
               text-align: left;
               color: #fff;
           }
           span{
               margin-left: 20px;
               color: #fff;
               font-size: 30px;
           }
           p:nth-child(2){
             margin-left: 40%; 
             color:rgba(255,255,255,0.7);
           }
       }
     /*   div:nth-child(3){
            width: 100%;
           height: 50px;
           border: 1px solid;
           margin: 10px auto;
       } */
   } 
   .van-rate{
       position: absolute;
       top: 234px;
       left:110px;
   }
   .van-rate__icon{
       font-size: 20px;
   }
   .box{
       width:100%;
       height: 440px;
       position: absolute;
       top:300px;
       .box1{
           width:100%;
           /* height: 300px; */
           position: static;
           text-align: center;
           p{
                  font-size: 15px;
                  color: #191919; 
                  line-height: 22px;
                  word-wrap: break-word;
                  width:95%;
                  margin:0 auto;
           }
       }
       .start{
           height: 230px;
           width:100%;
           font-weight: 500;
           text-align: center;
            .video{
                    white-space: nowrap;
                    overflow-x: auto;
                    list-style: none;
                    margin-top: 10px;
               li{      
                    margin-right: 10px;
                       display: inline-block;
                       vertical-align: top;
                           text-align: center;
                               width:340px;
                               margin-left: 10px;
                               height:250px;
                               img{
                                   height: 200px;
                               }
                    span{
                        display: inline-block;
                        font-size: 15px;
                        overflow: hidden;
                    }
               }
               
           }
           .people{
                    white-space: nowrap;
                    overflow-x: auto;
                    list-style: none;
                    margin-top: 10px;
               li{      
                    margin-right: 10px;
                       display: inline-block;
                       vertical-align: top;
                           text-align: center;
                               width:100px;
                               margin-left: 10px;
                               height:210px;
                               img{
                                width:100px;
                               }
                    span{
                        display: inline-block;
                        font-size: 15px;
                    }
               }
               
           }
       }
   }
   .score{
       width:100%;
       height: 280px;
       margin-top: 10px;
   }
</style>

/* .item{
       width: 80%;
       height: 325px;
       margin: 0 auto;
       border: 1px solid red;
       div:nth-child(1){
           width: 80%;
           height: 50px;
           border: 1px solid;
       }
       div:nth-child(2){}
       div:nth-child(3){}
   } */