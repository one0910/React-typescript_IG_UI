var express = require('express');
var app = express();
var engine = require('ejs-locals');
var bodyParser = require('body-parser');
var admin = require("firebase-admin");
const cors = require('cors');
var serviceAccount = require("./fir-test-7b098-firebase-adminsdk-6kx4f-f3cc33f41c.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fir-test-7b098-default-rtdb.asia-southeast1.firebasedatabase.app"
});

app.use(cors({
   origin:"*",
   methods:['GET','POST','PATCH','DELETE','PUT'],
 }))

var fireData = admin.database();
// console.log(fireData);

app.engine('ejs',engine);
// app.set('views','./views');
// app.set('view engine','ejs');
//增加靜態檔案的路徑
app.use(express.static(__dirname +'/frontend'))
// app.use(express.static('build'))

// 增加 body 解析
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))

//路由
app.get('/',function(req,res){
   res.render('index');
})

app.get('/petlist',function (req,res) {
   // res.header("Access-Control-Allow-Origin","*")
   fireData.ref('petData').once("value",(snapshot)=>{
     res.send(snapshot.val())
   })
})

app.get('/posts',function (req,res) {
  // res.header("Access-Control-Allow-Origin","*")
  fireData.ref('IGposts').once("value",(snapshot)=>{
    res.send(snapshot.val())
  })
})

app.get('/stories',function (req,res) {
  // res.header("Access-Control-Allow-Origin","*")
  fireData.ref('IGstories').once("value",(snapshot)=>{
    res.send(snapshot.val())
  })
})

// 監聽 port
var port = process.env.PORT || 8080;
app.listen(port);