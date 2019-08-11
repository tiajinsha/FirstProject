<template>
    <div>
         <div class="login_container">
            <mt-field label="用户名" :placeholder="unameholder" v-model="uname"></mt-field>
            <mt-field label="密码" type="password" :placeholder="upwdholder" v-model="upwd"></mt-field>
            <mt-field label="确认密码" type="password" :placeholder="upwdholder" v-model="yupwd"></mt-field>
            <mt-button size="large" type="primary" @click="login">注册</mt-button>
        </div>   
    </div>
</template>
<script>
export default {
    data(){
        return{
               uname:"",
                upwd:"",
                yupwd:"",
                unameholder:"请输入3-11位用户名",
                upwdholder:"请输入3-11位密码"
        }
    },methods:{
        login(){
            var uname=this.uname;
            var upwd=this.upwd;
            var yupwd=this.yupwd
            var reg=/^\w{3,11}$/i
            var i=reg.test(uname);
            var u=reg.test(upwd);
            console.log(upwd,yupwd)
            if(i!=true||u!=true){  
                this.$toast("用户名或者密码不正确"); 
                return; 
            }
            else if(upwd!=yupwd){
                this.$toast("两次密码不一样")
            }
            else{
                var url="insert";
                var obj={uname,upwd};
                this.axios.get(url,{params:obj}).then(result=>{
                if(result.data.code==1){
                   this.$messagebox("提示","注册成功")
                    this.$router.push("/search")
                }else{
                   this.$messagebox("提示","用户名已存在")
                }
            })
        }
        }
    }
}
</script>
<style scoped>
.mint-cell-wrapper{
 background:#f7f7f7 !important;
}
login_container{
    margin-top: 40px;
}
</style>

