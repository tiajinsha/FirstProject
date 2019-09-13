<template>
    <div>
      <div class="box" v-for="(elem,i) of list" :key="i">
               <img v-for="(item,i) of elem" :key="i" :src="src+item" alt="">
               
          <!--     <span>
                <div></div>
                <div>
                  <p>分享者：tom</p>
                  <p>发布时间：2019-7-25  4：30：55</p>
                  <p>内容：大赛等活动的哈萨克等哈加快速度过快暗杀计划的金卡说的大撒大撒度过快暗杀计划的金卡说的大撒大撒度过快暗杀计划的金卡说的大撒大撒大大哇塞的大撒大撒大大我打算大苏打大大话金卡金卡外部端口</p>
                </div>
              </span> -->
      </div>
      <van-button text="加载更多"  plain size="large" :loading=false type="danger" loading-text="加载中..." />
    </div>
</template>

<script>
import { Lazyload } from 'mint-ui';
  export default{
    data(){
      return {
          list:[],
          src:""
      }
    },created(){

      this.src=this.DATA.login
        if(this.list.length<1){
          this.loadfile()
        }
    },methods:{
        loadfile(){
          var url=`common/fenxiang`
          this.axios.get(url).then(result=>{
            var a=[];
            var b=[]
            result.data.result.forEach((element,x) => {
                       a.push(element)
                    }
                 )
                 for(var i=0;i<a.length;i++){
                   b[i]=[a[i].img_url0,a[i].img_url1,a[i].img_url2,a[i].img_url3,
                   a[i].img_url4,a[i].img_url5,a[i].img_url6,a[i].img_url7,a[i].img_url8]
                 }
                 for(var a=0;a<b.length;a++){
                      for(var c=0;c<b[a].length;c++){
                          if(b[a][c]==null||typeof(b[a][c])=="undefined"){
                            b[a].splice(c)
                          }
                      }
                 }
                 this.list=b
                 this.$store.commit("img",b)
                 console.log(this.list)
             }
          )
       }
  },
    mounted(){
      if(this.$store.state.img.length>0){
          this.list=this.$store.state.img
        }
    }
  }
</script>
<style lang="scss" scoped>
  .box{
    width:95%;
    margin:10px auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    img[lazy="loading"]{
        width: 40px;
        height: 300px;
        margin: auto;
    }
    img{
      width: 49%;
      display:block;
      height: 100%;
      margin-top: 10px;
      box-shadow: 0 0 6px #999;
    }
    span{
      margin-top: 10px;
      width: 100%;
      height:100px;
       box-shadow: 0 0 6px #999;
      display: flex;
      justify-content: space-between;
      align-items: center;
      div:nth-child(1){
        margin-left: 4px;
        border-radius: 50%;
         width: 70px;
          height:70px;
          background-image: url('../assets/3 - 副本.jpg');
           background-size:cover;
            box-shadow: 0 0 6px #999;
      }
       div:nth-child(2){
          width: 70%;
          height:100px;
          p{
            margin-bottom:0px;
            overflow:hidden;
            text-overflow:ellipsis;
            white-space:nowrap;
          }
       }
    }
  }
</style>
