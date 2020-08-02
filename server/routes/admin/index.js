//管理后台路由

module.exports = app => {
  const express = require('express');
  const mysql = require('../../plugins/db');
  const bcryptjs = require('bcryptjs');
  const jwt = require('jsonwebtoken');
  //这个不成功
  // const assert = require('http-assert');
  const multer = require('multer');
  const upload = multer({
    dest: __dirname + '../../../uploads'
  })
  const router = express.Router({
    //表示合并url参数
    mergeParams: true
  });
  //登录授权中间件
  const auth = async (req, res, next) => {
    const token = String(req.headers.authorization || '').split(' ').pop();
    if (!token) {
      res.status(401).send({
        message: '无效token，请登录'
      })
    }
    const {id} = jwt.verify(token, app.get('secret'));
    if (!id) {
      res.status(404).send({
        message: '无效用户，请登录'
      })
    }
    await mysql().query(`select * from admin_users where id=${id}`, (err, result) => {
      if (err) {
        res.status(404).send({
          message: '错误，稍后再试'
        })
      }
      if (result[0]) {
        next();
      }
    })
  }
  //新增接口
  router.post('/', async (req, res) => {
    let arr = [];
    let values = [];
    let sql = '';
    for (let key in req.body) {
      arr.push(key);
      //根据接受到的参数判断是不是密码，修改那里同理
      if (key === 'password') {
        //加密密码
        req.body[key] = bcryptjs.hashSync(req.body[key], 10)
      }
      values.push(req.body[key]);
    }

    values.forEach((i) => {
      sql += "'" + i + "',"
    })
    sql = sql.slice(0, sql.length - 1);
    await mysql().query(`insert into ${req.TabelName} (${arr.toString()}) values (${sql})`, (err, result) => {
      if (err) {
        if (req.TabelName == 'admin_users') {
          res.status(422).send({
            message: '新增失败,用户名已存在或稍后再试',
          })
        }
        res.send({
          code: 400,
          message: '新增失败',
          err,
        })
      } else {
        res.send({
          code: 200,
          message: '新增成功'
        })
      }
    })
  });
  //获取列表
  router.get('/', async (req, res) => {
    await mysql().query(`select * from ${req.TabelName} limit 10`, (err, result) => {
      if (err) {
        res.send({
          code: 400,
          message: '查询失败',
          err,
        })
      } else {
        res.send({
          code: 200,
          message: '查询成功',
          result
        })
      }
    })
  });
  //编辑路由
  router.get('/:id', async (req, res) => {
    let sql = ``;
    if (req.TabelName === 'admin_users') {
      sql = `select id,username from ${req.TabelName} where id=${req.params.id}`;
    } else {
      sql = `select * from ${req.TabelName} where id=${req.params.id}`;
    }
    await mysql().query(sql, (err, result) => {
      if (err) {
        res.send({
          code: 400,
          message: '查询失败',
          err,
        })
      } else {
        res.send({
          code: 200,
          message: '查询成功',
          result
        })
      }
    })
  });
  //修改路由
  router.put('/:id', async (req, res) => {
    let arr = [];
    let values = [];
    let sql = '';
    //这里因为编辑是从列表转过来id查的后台的所有数据(包括id)，所以req.body中多了一个id属性，做删除，便于拼接sql语句
    delete req.body.id;
    for (let key in req.body) {
      arr.push(key);
      if (key === 'password') {
        //加密密码
        req.body[key] = bcryptjs.hashSync(req.body[key], 10)
      }
      values.push(req.body[key]);
    }
    arr.forEach((i, index) => {
      sql += i + "='" + values[index] + "',"
    })
    sql = sql.slice(0, sql.length - 1);
    await mysql().query(`update ${req.TabelName} set ${sql} where id=${req.params.id}`, (err, result) => {
      if (err) {
        res.send({
          code: 400,
          message: '查询失败',
          err,
        })
      } else {
        res.send({
          code: 200,
          message: '查询成功',
          result
        })
      }
    })
  });
  //删除路由
  router.delete('/:id', async (req, res) => {
    await mysql().query(`delete from ${req.TabelName} where id=${req.params.id}`, (err) => {
      if (err) {
        res.send({
          code: 400,
          message: '删除失败',
          err,
        })
      } else {
        res.send({
          code: 200,
          message: '删除成功',
        })
      }
    })
  });

  //匹配以/admin/api开头的路由,设置为动态路由，这样写成通用curd接口
  app.use('/admin/api/rest/:resource',auth, (req, res, next) => {
    //将获取到的url参数加到tablename上，这样每个路由都可以通过req.TabelName获取
    req.TabelName = req.params.resource;
    next();
  }, router);
  //引入multer 处理文件 处理图片
  app.post('/admin/api/upload',auth, upload.single('file'), async (req, res) => {
    //拼接图片url路径，加到返回的数据上因为nodejs访问必须通过http
    req.file.url = `http://localhost:3000/uploads/${req.file.filename}`;
    res.send(req.file);
  });
  //登录接口
  app.post('/admin/api/login', async (req, res) => {
    const {username, password} = req.body;
    await mysql().query(`select * from admin_users where username='${username}'`, (err, result) => {
      if (err) {
        res.send({
          code: 400,
          message: '服务器异常',
          err
        })
      }
      // assert(result[0], 422, {message: '用户不存在'});
      if (result[0]) {
        //密码比较
        const isvaild = bcryptjs.compareSync(password, result[0].password);
        if (!isvaild) {
          res.status(422).send({
            message: '密码错误'
          })
        } else {
          //登录成功发送token
          const token = jwt.sign({
            id: result[0].id
          }, app.get('secret'));
          res.send(token);
        }
      } else {
        res.status(422).send({
          message: '用户不存在'
        })
      }
    })
  });
  // app.use(async (err, req, res, next) => {
  //   res.status(err.status).send({
  //     message: err.message
  //   });
  // });
  mysql().end();
}