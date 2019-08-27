<template>
  <div class="newproduct"> 
      <div class="fenxiang">
        <div>
            <textarea v-model="dbs" rows="6" cols="30" placeholder="分享此刻所想！" >
            </textarea>
        </div>
      </div>
      <div class="box">
      <van-uploader v-model="fileList" multiple  :max-count="9"/> 
      </div>
      <div class="buttonbox">
        <van-progress :show-pivot="false" :percentage="currentRate" />
      <button  @click="upload()">发布</button>
      </div>
  </div>
</template>
<script>
import { Popup } from 'vant';
export default {
  data(){
    return{
      fileList: [],
      dbs:"",
      currentRate:0,
      data:[]
    }
  }
  ,methods:{
    upload(){
        if(this.dbs&&this.fileList.length>0){
            this.insert()
        }else{
          this.$toast("请输入文字和图片")
        }
    },
    login(){
      var obj={data:this.data,title:this.dbs}
        var url=`${this.DATA.login}common/title`
        this.axios.get(url,{params:obj}).then((res)=>{
              console.log(res)
              if(res.data.code==1){
                  this.$toast("上传成功")
                  this.currentRate=0
                  this.dbs=""
                  this.fileList=[]
              }
        }) },   
    /* 多图上传 */
    insert(){
    var formData = new FormData()
    this.fileList.forEach(ele=>{
      formData.append('file',ele.file)
    })
    let config = {
       headers: {
         'Content-Type': 'multipart/form-data'
       },
        onUploadProgress: progressEvent => {
            this.currentRate = Number(progressEvent.loaded / progressEvent.total * 100 | 0)
        }
     }
     var url=`${this.DATA.login}fenxiang/upload-multi`
     this.axios.post(url,formData,config).then((res)=>{
       console.log(res)
       if(res.status==200){
           res.data.forEach((elem)=>{
               this.data.push(elem)
             }) 
            this.login()
         }
     })
    }},
}
</script>
<style scoped>
  .fenxiang{
    height: 150px;
    width: 95%;
    margin:  0 auto;
    margin-top: 30px;
  }
  .box{
  width: 95%;
  margin: 0 auto;
  }
  button{
    width: 95%;
    margin: 0 auto;
    display: inline-block;
    margin-top: 10px;
  }
  .buttonbox{
     width:100%;
      margin: 0 auto;
      text-align: center;
  }
  .van-progress{
    width:95%;
    margin: 0 auto;
  }
</style>