//1:引入第三方模块
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const session = require("express-session");
var   http=require('http');
const iconv=require('iconv-lite');
var fs = require('fs');
var multer  = require('multer');
//2:配置第三方模块
 //2.1:配置连接池
 var pool = mysql.createPool({
   host:"127.0.0.1",
   user:"root",
   password:"",
   port:3306,
   database:"xz",
   connectionLimit:15
 })
 //2.2:跨域
 var server = express();
 server.use(cors({
   origin:["http://127.0.0.1:8080",
   "http://192.168.0.103:8080"],
   credentials:true
 }))
 //2.3:session
 server.use(session({
   secret:"128位字符串",
   resave:true,
   saveUninitialized:true
 }))
 server.use(express.static("public"))
 server.use(express.static("upload"))
 server.listen(3000,()=>{
   console.log(3000)});
   var imgname=""
//3:完成第一个功能用户登录
/* ====================================登录======================================= */
server.get("/login",(req,res)=>{
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
/* ==================================注销======================================== */
server.get("/loginUp",(req,res)=>{
  req.session.destroy()
  console.log("注销成功")
  res.send({code:1,data:"注销成功"})
})
//=================================注册==========================================
server.get("/insert",(req,res)=>{
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
//===================================跨域代理========================================
server.get("/bing",(req,res)=>{
  var page=req.query.page;
  var count=req.query.count;
  var serurl=req.query.serurl;
  var obj={code:1,msg:"success"}
  var url="http://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1"
  http.get(url,function(result){
    result.on("data",function(buf){
      var str=(buf.toString())
      var a=JSON.parse(str)
        //console.log(result)
        /* console.log(buf.toString()) */
        console.log(a)
    })
  })
})
/* ====================================图片上传======================================== */
var createFolder = function(folder){
    try{
        fs.accessSync(folder); 
    }catch(e){
        fs.mkdirSync(folder);
    }  
};

var uploadFolder = './upload/';

createFolder(uploadFolder);
var storage = multer.diskStorage({
	  destination: function (req, file, cb) {
        cb(null, uploadFolder);    // 保存的路径，备注：需要自己创建
    },
    filename: function (req, file, cb) {
        // 将保存文件名设置为 字段名 + 时间戳，比如 logo-1478521468943
        cb(null,file.originalname);  
    }
});
var upload = multer({ storage: storage })
//var upload = multer({ dest: 'upload/' });
server.post("/upload",upload.single('file'),(req,res,next)=>{
  var file = req.file;
  console.log('文件类型：%s', file.mimetype);
  console.log('原始文件名：%s', file.originalname);
  console.log('文件大小：%s', file.size);
  console.log('文件保存路径：%s', file.path);
		var obj={code:1,msg:"success"}
		obj.data=file.originalname
        res.send(obj);
		console.log(obj)
})
server.get('/form', function(req, res, next){
  var form = fs.readFileSync('./form.html', {encoding: 'utf8'});
  res.send(form);
  console.log(123)
});



/* =======================================商品首页============================================ */
//商品的分页显示
/* ==========================================登陆状态======================================= */
server.get("/loginMsg",(req,res)=>{
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
 
 /* 删除购物车中的商品 */
 server.get("/delete",(req,res)=>{
   var id =req.query.id;
 
   var sql="delete from xz_cart where id=?"
   pool.query(sql,[id],(err,result)=>{
     if(err)throw err;
     if(result.affectedRows>0){
       res.send({code:1,msg:'delete suc'});
     }else{
       res.send({code:-1,msg:'成功'})
     }
   })
 })
 
/* =========================================================================================== */
server.get("/product",(req,res)=>{
   //-参数
   var pno = req.query.pno;
   var ps = req.query.pageSize;
   // -设置默认值
   if(!pno&&pno==0){pno=1}
   if(!ps){ps=4}
   //-创建第一条 sql语句 当前页
   var obj = {code:1,msg:"查询成功"};
   var sql = "SELECT lid,price,title,img_url FROM xz_laptop LIMIT ?,?";
   var off = (pno-1)*ps;
   ps = parseInt(ps);
   pool.query(sql,[off,ps],(err,result)=>{
       if(err)throw err;
       obj.data = result;
       var sql ="SELECT count(*) AS c FROM xz_laptop";
       pool.query(sql,(err,result)=>{
       if(err)throw err;
       var pc = Math.ceil(result[0].c/ps);
       console.log(result)
       obj.pc = pc;
       res.send(obj);
       console.log(obj)
       })
   });
});  
/* 5.查询指定用户的购物车列表 */
server.get("/cart",(req,res)=>{
 /*  1.-参数 */
  var uid=req.session.uid;
  if(!uid){
    console.log(uid)
    res.send({code:-1,msg:"请登录"});
    return;
  } 
  /* 2. */
  var sql ="select id,img_url,title,price,count from xz_cart where uid= ?"
  pool.query(sql,[uid],(err,result)=>{
    if(err)throw err;
    res.send({code:1,data:result})
  })
})

/* 删除购物车中的商品 */
server.get("/delete",(req,res)=>{
  var id =req.query.id;

  var sql="delete from xz_cart where id=?"
  pool.query(sql,[id],(err,result)=>{
    if(err)throw err;
    if(result.affectedRows>0){
      res.send({code:1,msg:'delete suc'});
    }else{
      res.send({code:-1,msg:'成功'})
    }
  })
})

/* ============= */

server.get("/delAll",(req,res)=>{
  //1:参数 1,2,3
  var ids = req.query.ids;
  //2:sql
  var sql = `DELETE FROM xz_cart WHERE id IN (${ids})`;
  //3:json
  pool.query(sql,(err,result)=>{
    if(err)throw err;
    if(result.affectedRows>0){
      res.send({code:1,msg:"删除成功"});
    }else{
      res.send({code:-1,msg:"删除失败"});
    }
  })
});