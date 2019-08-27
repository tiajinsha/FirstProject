//1:引入第三方模块
const express = require("express");
const cors = require("cors");
const iconv=require('iconv-lite');
const session = require("express-session");
const uplogin = require('./routers/login')
const upfile= require('./routers/upload')
const common= require('./routers/common')

 //2.2:跨域ip
 var server = express();
 server.use(cors({origin:["http://192.168.0.103:8081","http://192.168.0.103:8080","http://127.0.0.1","http://127.0.0.1:8080","http://106.12.179.113","http://192.168.0.103"],credentials:true}))
 //2.3:session
 server.use(session({
   secret:"128位字符串",
   resave:true,
   saveUninitialized:true
 }))
 //资源托管
 server.use(express.static("public"))
 server.use(express.static("upload"))
 server.use(express.static("fenxiang"))
 //端口监听
 server.listen(3000,()=>{
 console.log(3000)});
 //路由挂载
 server.use("/login",uplogin);
 server.use("/fenxiang",upfile); 
 server.use("/common",common);