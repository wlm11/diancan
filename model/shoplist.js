var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/menu');
var Schema = mongoose.Schema;
var crypto = require("crypto");
var dbsc = new Schema({
    class:    String,
    shop:  String,
    image:  String,
    content:  String,
    states:  String,
    quality:  String,
    hot:  String,
    money:   Number,
});

dbsc.statics.findcont=function (tj, callback) {
    dbs.find(tj,function(err,data){
        callback(data);
    })
}


dbsc.statics.addshopdb=function(data,callback){
    dbs.create(data,function(err,data){
        if(err){
            callback(-1)
        }else{
            callback(1)
        }
    })
}

//更新数据
dbsc.statics.updatecont=function(tj,set,callback){
    dbs.update(tj,set,function(err,data){
        callback(data);
    })
}
//删除数据
dbsc.statics.deletecont=function(tj,callback){
    dbs.remove(tj,function(data){
        callback(data);
    })
}

//获取所有的数据
dbsc.statics.getdatas=function(callback){
    dbs.find({},function(err,data){
        if(err){
            callback(-1)
        }else{
            callback(data)
        }
    })
}

dbsc.statics.checknames=function(name,callback){
    dbs.find({"shop":name},function(err,data){
        if(err){
            callback(-2)
        }else{
            if(data!=''){
                callback(-1)
            }else{
                callback(1)
            }
        }
    })
}
var dbs = mongoose.model('menushop', dbsc);

module.exports=dbs;