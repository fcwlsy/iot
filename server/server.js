//设置
var express=require('express');
var app=express();
var mongoose=require('mongoose');
var morgan=require('morgan');
var bodyParser=require('body-parser');
var methodOverride=require('method-override');
var cors=require('cors');
var sd=require('silly-datetime');
var path=require('path');
//配置
mongoose.connect('mongodb://localhost/iot');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type:'application/vnd.api+json'}));
app.use(methodOverride());
app.use(cors());
app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin,X-Requested-Width,Content-Type,Accept");
    next();
});
app.use(express.static(path.join(__dirname + '/', 'public'))); //配置使用./public目录
app.set('views',path.join(__dirname + '/','views')); //配置使用./views目录
app.set('view engine','jade');
app.get('/',function(req,res){  //访问“/”API节点时，渲染出index.html页面,用来显示曲线
    'use strict';
    res.render('index',{
    title:'Home'
  });
});
//模型
var sensorSchema=new mongoose.Schema({
   temperature:Number,
   date:String,
   time:String    
});
var ledSchema=new mongoose.Schema({
    status:{type:Boolean,default:false}
});
var sensorModel=mongoose.model('sensor',sensorSchema);
var ledModel=mongoose.model('led',ledSchema);
//路由
app.get('/sensor',function(req,res){//从数据库中获取传感器数据
    sensorModel.find(function(err,data){
        if (err)
            res.send(err);
        res.json(data);
    });
});
app.post('/sensor',function(req,res){//获得新的传感器数据，存入数据库中
   var cdate=sd.format(new Date(),'YYYY-MM-DD');
   var ctime=sd.format(new Date(),'HH:mm'); 
   sensorModel.create({
			    temperature:req.body.temperature,
			    date:cdate,
			    time:ctime
            },function(err,state){
            if (err)
                res.send(err);
            sensorModel.find(function(err,data){
				if (err){
					res.send(err);
				}
				res.json(data);
			});
    });
});
app.get('/led',function(req,res){//从数据库中获取led灯的状态
    ledModel.find(function(err,data){
        if (err)
            res.send(err);
        res.json(data);
    });
});
app.put('/led',function(req,res){//更新Led灯的状态
    ledModel.update({},{$set:{status:req.body.status}},{upsert:true},function(err,result){
       if(err){
         res.send(err);
       }else{
         ledModel.find(function(err,data){
            if (err){
              res.send(err);
            }
            res.json(data);
         });
       }
 });
});
//监听
app.listen(3000);
