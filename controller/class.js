var Class=require("../model/class.js");
var formidable=require("formidable");
var url=require("url");

exports.showshopclass=function(req,res){
    Class.findcont({},function(data){
        res.render("class",{"result":data})
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
exports.delClass=function(req,res){
    //删除
    var id=req.params.id;

    Class.deletecont({"_id":id},function(data){
        res.json({"result":1})
    })
}
//修改
exports.amendClass=function(req,res){
    //修改客户
    var id=req.params.id;
    // console.log(id);
    Class.findcont({"_id":id},function(data){
        res.json({"result":data})
    })

}
//更新
exports.updateClass=function(req,res){
    //修改完点击提交
    var id=req.params.id;
    console.log(id);
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        Class.updatecont({"_id":id},{$set:fields},function(data){
            res.json({"result":1});
        })
    });
}

exports.Allclass=function(req,res){
    var page = url.parse(req.url,true).query.page - 1 || 0;
    var pagesize = 2;

    Class.count({},function(err,count){
        Class.find({}).limit(pagesize).skip(pagesize * page).exec(function(err,results){
            // console.log(results);
            res.json({
                "pageAmount" : Math.ceil(count / pagesize),
                "results" : results
            });
        });
    });
}