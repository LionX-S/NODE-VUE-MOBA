module.exports=app=>{
  const express=require('express')
  const router=express();
  const mysql=require('../../plugins/db');
  //文章列表接口
  router.get('/articles/list',async (req,res)=>{
    await mysql().query('select * from articles',(err,result)=>{
      res.send({
        result
      })
    })
  });
  //英雄列表接口
  router.get('/heroes/list',async (req,res)=>{
    await mysql().query('select id,name,avtar,categoryId from heros',(err,result)=>{
      res.send({
        result
      })
    })
  });
  //英雄详情接口
  router.get('/hero/:id',async (req,res)=>{
    await mysql().query(`select * from heros where id=${req.params.id}`,(err,result)=>{
      if (err){
        res.status(500).send({
          message:'位置错误'
        })
      }
      res.send({
        code:200,
        result:result[0]
      })
    })
  })
  //文章详情接口
  router.get('/articles/:id',async (req,res)=>{
    await mysql().query(`select * from articles where id=${req.params.id}`,(err,result)=>{
      if (err){
        res.send({
          message:'请求失败'
        })
      }
      res.send({
        code:200,
        result
      })
    })
  })
  app.use('/web/api',router)
}