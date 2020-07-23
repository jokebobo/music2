// 开启服务器
const express = require('express');
const app = express();
//引入跨域插件
const cors = require('cors');
const bodyParser = require('body-parser');

const musiclist = require('./router/music');
//app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
//设置跨域请求?
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});
app.use((req, res, next) => {
  res.header('access-control-allow-origin', 'http://localhost:8000', 'http://127.0.0.1:8080', 'http://zt.house365.com')

  res.header('Access-Control-Allow-Credentials', true);//

  next();
})

//跨域访问数据cors设置 
app.use(cors({
  origin: ['http://localhost:8000', 'http://127.0.0.1:8080', 'http://zt.house365.com'],//允许这个域的访问
  methods: ['GET', 'POST'],
  alloweHeaders: ['Conten-Type', 'Authorization']//只允许带这两种请求头的访问
}))

app.get('/test', function (req, res) {
  res.send("返回数据233");
})
app.get('/music', async function (req, res) {
  console.log("获取传递参数", req.query);
  let { pagesize, pagenum } = req.query;
  // 将字符串参数转为数字
  pagesize = parseInt(pagesize);
  pagenum = parseInt(pagenum);
  if (req.query.id) {
    // 如果存在id 则返回对应数据
    console.log("当前是查询模式");
    res.send(await musiclist.find().where({ id: req.query.id }));
  }
  if (req.query.all) {
    // 不存在返回所有数据
    console.log("当前是分页模式");
    console.log("返回当前数据为=》", await musiclist.find().limit(pagesize).skip(pagenum * pagesize));
    res.send(await musiclist.find().limit(pagesize).skip(pagenum * pagesize));
  }

})
app.post('/test1', function (req, res) {
  console.log("获取参数", req.body);
  res.send(req.body);
})


// 监听服务端口
app.listen('2500', function () {
  console.log("server start!");
})