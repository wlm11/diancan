var shoplist=require("../model/shoplist.js");
var Class=require("../model/class")
var formidable=require("formidable");
var url=require("url");

exports.showshoplist=function(req,res){
    shoplist.findcont({},function(data){
        Class.findcont({},function(result){
            res.render("shoplist",{"result":data,"data":result});
        })
        // console.log(data);

    })

}

//显示所有的数据
exports.showdata=function(req,res){
    Class.getall(function(data){
        res.json({"result":data});
    })
}

//新增类
exports.saveClass=function(req,res){
    //新建类
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        Class.findcont({"class":fields.class},function(data){
            console.log(data);
            if(data.length!=0){
                res.json({"result":0})
            }else{
                Class.addclass({"class":fields.class,"state":"0"},function(err,data){
                    if(err){
                        res.json({"result":-1});
                        return;
                    }
                    res.json({"result":1})
                })
            }
        })


    });
}
//删除类
exports.delshoplist=function(req,res){
    //删除
    var id=req.params.id;
    console.log(id);
    shoplist.deletecont({"_id":id},function(data){
        res.json({"result":1})
    })
}
//修改
exports.amendshoplist=function(req,res){
    //修改客户
    var id=req.params.id;
    // console.log(id);
    shoplist.findcont({"_id":id},function(data){
        // console.log(data);
        res.json({"result":data})
    })

}
//更新
exports.updateshoplist=function(req,res){
    //修改完点击提交
    var id=req.params.id;
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        console.log(fields);
        shoplist.updatecont({"_id":id},{$set:fields},function(data){
            res.json({"result":1});
        })
    });
}

exports.Allshop=function(req,res){
    var page = url.parse(req.url,true).query.page - 1 || 0;
    var pagesize = 2;

    shoplist.count({},function(err,count){
        shoplist.find({}).limit(pagesize).skip(pagesize * page).exec(function(err,results){
            // console.log(results);
            res.json({
                "pageAmount" : Math.ceil(count / pagesize),
                "results" : results
            });
        });
    });
}


exports.getcont=function(req,res){
    var cont=req.params.id;
    shoplist.findcont({"class":cont},function(data){
        res.json({"result":data});
    })
}