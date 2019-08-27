const express=require('express')
const router =express.Router()
const pool=require("../pool");

/* 用户登录 */
router.get("/login",(req,res)=>{
    //1:参数
    var uname = req.query.uname;
    var upwd = req.query.upwd;
    //1.1:正则表达式验证用户名或密码
    //2:sql
  var sql = "SELECT id,img_url FROM ";
  sql +=" xz_login WHERE uname = ?";
  sql +=" AND upwd = md5(?)";
    //3:json
    if(uname==null&&upwd==null){
      console.log("null") 
    }else{
    pool.query(sql,[uname,upwd],(err,result)=>{
        if(err)throw err;
        if(result.length==0){
           res.send({code:-1,msg:"用户名或密码有误"});
        }else{
           //??缺少一步
           //将当前的用户的uid保存到session对象
          //result=[{id:1}]
          req.session.uid=result[0].id;
          var obj={code:1,msg:"登录成功"}
          obj.data=result
          res.send(obj);
        }
    })
      }
  })
/* 用户注销 */
  router.get("/loginUp",(req,res)=>{
    req.session.destroy()
    console.log("注销成功")
    res.send({code:1,data:"注销成功"})
  })
/* 用户注册 */
  router.get("/insert",(req,res)=>{
	var uname=req.query.uname
	var img_url=req.query.data
	var upwd=req.query.upwd
    console.log(img_url)
   /* var sql="INSERT INTO xz_login set ?" */
   //var data={uname:uname,upwd:upwd}
   //var sql="insert into xz_login set ?"
   var sql=`insert into xz_login(uname,upwd,img_url) values('${uname}',md5('${upwd}'),'${img_url}')`
 		pool.query(sql,(err,result)=>{
      if(err) throw err;
      console.log(result)
		  imgname=uname
      res.send({code:1,data:"成功"})
    })
})
/* 登录信息 */
router.get("/loginMsg",(req,res)=>{
    /*  1.-参数 */
    var uid=req.session.uid;
    console.log(uid)
     if(!uid){
       console.log(uid)
       res.send({code:-1,msg:"请登录"});
       return;
     } 
     /* 2. */
     var sql ="select id,img_url,uname from xz_login where id= ?"
     pool.query(sql,[uid],(err,result)=>{
       if(err)throw err;
       res.send({code:1,data:result})
     })
   })
/* 抛出 */
  module.exports=router;