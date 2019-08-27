const express=require('express')
const router =express.Router()
const   http=require('http');
const pool=require('../pool.js')
//跨域
router.get("/bing",(req,res)=>{
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
          // console.log(buf.toString()) 
          console.log(a)
      })
    })
  })
//===================分享=========================
router.get("/title",(req,res)=>{
	var data=req.query.data
    var title=req.query.title
    if(data&&title){
        var sql="insert into xz_fenxiang set ?"
        var num={title:title,img_url0:data[0],img_url1:data[1],img_url2:data[2],img_url3:data[3],img_url4:data[4],img_url5:data[5],img_url6:data[6],img_url7:data[7],img_url8:data[8]}
        pool.query(sql,[num],(err,result)=>{
           if(err)throw err;
           console.log(result)
           res.send({code:1,msg:"上传成功"})
        }) 
    }else{
        if(!data){
            console.log("没有图片")
        }else if(!title){
            console.log('没有文字')
        }
           res.send({code:0,msg:"上传失败"})
    }
})

router.get("/fenxiang",(req,res)=>{
  var sql ="select * from xz_fenxiang"
  pool.query(sql,(err,result)=>{
    if(err)throw err;
    console.log(result)
    res.send({code:1,result})
  })
})
  module.exports=router;


