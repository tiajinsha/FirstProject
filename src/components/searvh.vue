<template>
    <div class="login">  
        <div v-show="this.$store.state.login==1">wellcome {{unames}}
        <img class="img" :src="`http://106.12.179.113:3000/${this.data}`" alt="">
        </div>
         <div class="login_container" v-show="this.$store.state.login==0">
            <mt-field label="用户名" :placeholder="unameholder" v-model="uname"></mt-field>
            <mt-field label="密码" type="password" :placeholder="upwdholder" v-model="upwd"></mt-field>
            <mt-button size="large" type="danger" @click="login">登录</mt-button>
            <p>
            <a @click="insert">没有账号/注册</a>
            </p>
        </div>  
   </div>
</template>
<script>
export default {
    data(){
        return {
                uname:"tom",
                upwd:"123",
                unameholder:"请输入用户名",
                upwdholder:"请输入密码",
                unames:"",
                data:""
        }   
    },methods:{
        insert(){
            this.$router.push("/search/insert")
        },
        login(){
            /* 获得用户名密码 */
           var uname=this.uname;
           var upwd=this.upwd;
            /* 创建一个震泽表达式 */
            var reg=/^\w{3,11}$/i
            var i=reg.test(uname);
            var u=reg.test(upwd);
            if(i!=true||u!=true){  
                this.$toast("用户名或者密码不正确"); 
                return; 
            }
            else{

            }    
                /* 字母数字下划线3到12位 */

                /* 验证用户密码 */
                /* 发送ajax请求 */
                var url="login";
                var obj={uname,upwd};
                this.axios.get(url,{params:obj}).then(result=>{
                    console.log(result.data.data[0].img_url)
                if(result.data.code==1){
                    this.data=result.data.data[0].img_url
                    this.unames=result.config.params.uname
                   /*  location.href="http://127.0.0.1:8080/#/cart" */
                   this.$messagebox("提示","成功")
                 /*   this.$router.push("/") */
                    this.$store.commit("increment")

                }else{
                   this.$messagebox("提示","用户名或者密码有误")
                }
            })
        }
    },
    created(){
        
    }
}
</script>
<style lang=scss>
body{
    background: #f2f2f2 !important;
}
.login{
    width:100vw;
    height:50vh;
    background: #f2f2f2 !important;
    margin-top: 30px;
    .img{
        width: 100%;
    }

  .login_container{
    padding-top:40px;

}
.my_button{
    border:1px solid red !important;
}
.login{
    width:100vw;
    height:50vh;
}
button{
    width: 50vw;
    margin: 0 auto;
    margin-bottom: 10px;
}

p{
    text-align: center;
}
.login_container{
    background: #f2f2f2 !important;
}
.mint-cell-wrapper{
    background: #f2f2f2 !important;
}
}
</style>