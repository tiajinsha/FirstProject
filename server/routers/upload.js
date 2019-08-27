const express=require('express')
const router =express.Router()
var fs = require('fs');
var multer  = require('multer');

//========================================单图上传
var createFolder = function(folder){
    try{
        fs.accessSync(folder); 
    }catch(e){
        fs.mkdirSync(folder);
    }  
};
// 保存路劲
var uploadFolder = './upload/';
createFolder(uploadFolder);
var storage = multer.diskStorage({
	  destination: function (req, file, cb) {
        cb(null, uploadFolder);    // 保存的路径，备注：需要自己创建
    },
    filename: function (req, file, cb) {
        // 将保存文件名设置为 字段名 + 时间戳
        cb(null,file.originalname);  
    }
});
var upload = multer({ storage: storage })
//var upload = multer({ dest: 'upload/' });
router.post("/upload",upload.single('file'),(req,res,next)=>{
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
router.get('/form', function(req, res, next){
  var form = fs.readFileSync('./form.html', {encoding: 'utf8'});
  res.send(form);
  console.log(123)
});
//=====================多图上传============================================================
var fengxiang = './fenxiang/';
createFolder(fengxiang);
var storage = multer.diskStorage({
	  destination: function (req, file, cb) {
        cb(null, fengxiang);    // 保存的路径，备注：需要自己创建
    },
    filename: function (req, file, cb) {
        // 将保存文件名设置为 字段名 + 时间戳
        cb(null,file.originalname);  
    }
});
var upload = multer({ storage: storage })
router.post("/upload-multi",upload.array('file'),(req,res,next)=>{
    var data=[]
    if(req.files.length<1){
        console.log("没有图片")
    }
    req.files.forEach(ele=>{
        data.push(ele.originalname)
    })
    var result={code:1}
    result.data=data
    res.send(data)
})
module.exports=router;