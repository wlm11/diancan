var model=require("../model/shoplist.js")
var formidable=require("formidable")
var url=require("url")
var fs=require("fs")
var Class=require("../model/class.js")

exports.showindex=function(req,res){
    res.render("index")

}
exports.showaddshop=function(req,res){
    Class.findcont({},function(data){
        res.render("addshop",{"result":data});
    })

}
exports.addshops=function(req,res){
    var form = new formidable.IncomingForm();
    form.uploadDir = "./updata";
    form.parse(req, function(err, fields, files) {
        var t=parseInt(Math.random()*1000)
        var path=files.image.path
        fs.rename(path,"./updata/"+t+".jpg",function(err){
            if(err){
                console.log("图片上传失败")
            }else{
                var image="image"
                fields[image]=t
                model.addshopdb(fields,function(data){
                    res.redirect("/")
                })
            }
        })
    });
}

exports.getdata=function(req,res){
    model.getdatas(function(data){
        res.jsonp(data)
    })
}



exports.checkname=fun=function(req,res){
    var name=url.parse(req.url,true).query.name

    model.checknames(name,function(data){
        res.json(data)
    })
}