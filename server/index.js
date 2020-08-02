const express=require('express');
// const bodyParser=require('body-parser');
const app=express();
//全局加一个变量 用于token解密与加密
app.set('secret','hkdfh74khdf');
app.use(require('cors')());
// app.use(bodyParser.urlencoded({extended:true}));
//写这个后就可以直接使用req.body
app.use(express.json());
// 静态文件托管
app.use('/admin',express.static(__dirname+'/admin'));
app.use('/',express.static(__dirname+'/web'));
//开放静态文件 可以访问图片
app.use('/uploads',express.static(__dirname+'/uploads'));
//默认去找index.js
require('./routes/admin')(app);
require('./routes/web')(app);


app.listen(3000,()=>{
  console.log('http://localhost:3000');
})