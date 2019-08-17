<template>
    <div class="titlelist">
            <p class="px">{{list.title}}</p>
            <p class="py">{{list.ctime}}</p>
        <div v-html="list.content" class="titlelist"> 
        </div>   
    </div>
</template>
<script>
export default {
    data(){
        return{
            list:[]
        }
    },methods:{
    },created(){
        var tits=this.$route.query.tit;
        var url=`${this.DATA.Titleurl}${tits}`
             this.$http.get(url).then(result => {
               this.list=result.body.newslist[0]
             })}
}
</script>
<style  lang="scss">
.titlelist{
    img{
        text-align: center;
        width: 354px;
    }
    .titlelist{
        margin:0 auto;
        width:350px;
          p{
              font-size: 15px;
              color: black;
    }
    }
  .titlelist>p:last-child{
      display: none;
  }
   .titlelist>p:first-child{
      display: none;
  }
  .px{
      font-size: 20px;
      width: 300px;
      margin-left: 20px;
      margin:0 auto;
      text-align: center;
      color: black;
      font-weight: 600;
      margin-top: 10px;
  }
  .py{
      margin-left: 250px;
  }
}
</style>
