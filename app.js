var express=require("express");
var app=express();
var main=require("./controller/main");

var session = require('express-session');

var Class=require("./controller/class.js");
var shoplist=require("./controller/shoplist.js");

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/menu');


app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}))
app.use(express.static("static"));

app.use(express.static("updata"));


app.set("view engine","ejs")
//显示组
app.all("/",main.showindex)//显示首页

//显示类表
app.get("/class",Class.showshopclass);
app.post("/amendclass/:id",Class.amendClass);////修改
app.post("/updateClass/:id",Class.updateClass);//更改
app.post("/saveClass",Class.saveClass);//新增类
app.post("/delClass/:id",Class.delClass);//删除
app.get("/Allclass",Class.Allclass);//分页


//显示商品列表
app.get("/shoplist",shoplist.showshoplist);
app.post("/delshoplist/:id",shoplist.delshoplist);//删除
app.post("/amendlist/:id",shoplist.amendshoplist);////修改
app.post("/updateshoplist/:id",shoplist.updateshoplist);//更改
app.get("/Allshop",shoplist.Allshop);//分页
app.post("/getcont/:id",shoplist.getcont);


app.get("/addshop",main.showaddshop)//显示商品添加页
app.all("/addshops",main.addshops)//显示商品添加页


app.all("/getdata",main.getdata)//得到所有数据

app.all("/checkname",main.checkname)//检查菜名





app.listen(3001)