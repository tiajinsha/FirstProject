<template>
    <div>
         <div class="login_container">
            <mt-field label="用户名" :placeholder="unameholder" v-model="uname"></mt-field>
            <mt-field label="密码" type="password" :placeholder="upwdholder" v-model="upwd"></mt-field>
            <mt-field label="确认密码" type="password" :placeholder="upwdholder" v-model="yupwd"></mt-field>
            <label for="">
            上传头像
           <input type="file" @change="getFile($event)">
            </label>
            <mt-button size="large" type="primary" @click="login">注册</mt-button>
        </div>   
    </div>
</template>
<script>
export default {
    data(){
        return{
               uname:"tom",
                upwd:"123",
                yupwd:"123",
                unameholder:"请输入3-11位用户名",
                upwdholder:"请输入3-11位密码",
                file:"",
                data:""
        }
    },methods:{
         getFile(event) {
            this.file = event.target.files[0];
          },

         login(){
            var yupwd=this.yupwd
            var reg=/^\w{3,11}$/i
            var i=reg.test(this.uname);
            var u=reg.test(this.upwd);
            if(i!=true||u!=true){  
                this.$toast("用户名或者密码不正确"); 
                return; 
            }
            else if(this.file.length==0){
                this.$toast("请上传头像")
            }
            else if(this.upwd!=yupwd){
                this.$toast("两次密码不一样")
            }
            else{
            let formData = new FormData();
            formData.append('file', this.file);
            let config = {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }/* ============================================ */
            var url=`${this.DATA.login}upload`
            this.$http.post(url,formData,config).then(function(res){
                console.log(res)
             if(res.body.code==1){
              this.data=res.body.data
              this.insert()
              }else{
                  alert("头像格式不正确")
              }
            })
         }},
        insert(){
                var url="insert";
                console.log(this.data)
                var obj={uname:this.uname,upwd:this.upwd,data:this.data};
                this.axios.get(url,{params:obj}).then(result=>{
                if(result.data.code==1){
                   this.$messagebox("提示","注册成功")
                    this.$router.push("/home/login")
                }else{
                   this.$messagebox("提示","用户名已存在")
                }
            })
        }
        }
    }
</script>
<style scoped>
.mint-cell-wrapper{
 background:#f7f7f7 !important;
}
.login_container{
    margin-top: 20px;
}
</style>

