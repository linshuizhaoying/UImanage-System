var Ui = require('./uiModel.js')

/**
 * [addUi func]
 * 添加用户
 * 获取表单传来的参数
 * 返回 status 状态 message 信息
 */
exports.addUi = function ( req, res, next ){
  //console.log(req)
  var ui = new Ui({
      title:    req.body.title,
      desc:req.body.desc,
      htmlcode:req.body.htmlcode,
      csscode:req.body.csscode,
      jscode:req.body.jscode,
      type:req.body.type,
      desc:req.body.desc,
      project_id:    req.body.project_id,
      link:req.body.link,
      created_time: Date.now()
  })
  console.log(Ui)
  /* 判断项目是否存在 */
  Ui.findOne({title:Ui.title,project_id:Ui.project_id},function(err,result){
     if(result != null){
        res.send({  status: 'error', message:"UI名称不能重复"  });
     }else{
        ui.save(function(err) {
          if(err) {
            console.log('Error while saving Ui: ' + err);
            res.send({  status: 'error', message:error  });
            return;
          } else {
            console.log("Ui created");
            res.send({ status: 'ok', message:"ok" });
            return 
          }
        });
     }
  })
};
/**
 * [getUis func]
 * 需要对应用户的权限
 * 获取用户所有信息列表
 * 接受用户ID
 * 直接返回 用户项目列表
 */
exports.getUis = function ( req, res, next ){
  console.log(req.params.project_id)
  Ui.find({project_id:req.params.id}, function(err, Uis) {
    if (err) {
      res.json({message: err});
    } else {
      console.log(Uis)
      res.json({Uis: Uis});
    }
  });
};

/**
 * [getUi func]
 * 需要对应用户的权限
 * 获取指定用户信息列表
 * 接受用户ID
 * 直接返回 用户项目列表
 */
exports.getUi = function ( req, res, next ){
  Ui.findById(req.params.id, function(err, ui) {
    if (err) {
      res.json({message: err});
    } else {
      res.json({ui: ui});
    }
  });
};
/**
 * [deleteUi func]
 * 删除指定项目
 * 接受url传来的id参数
 * 返回 status 状态 message 信息
 */
exports.deleteUi = function ( req, res, next ){
  Ui.remove({"_id":req.params.id}, function(err, Ui) {
    if (err) {
      res.send({  status: 'error', message:"删除错误！"  });
    } else {
      res.send({ status: 'ok', message:"ok" });
    }
  });
};
/**
 * [UiUpdate func]
 * 用户信息更新
 * 接受表单提交的参数
 * 返回 status 状态 message 信息
 */
exports.updateUi = function ( req, res, next ){
  Ui.findById(req.body.Uiid,function(err,result){
     if(err){
        console.log(err)
        res.send({  status: 'error', message:"更新出错!"  });
     }else{
      console.log(result)
        result.title = req.body.title;
        result.desc = req.body.desc;
        result.htmlcode = req.body.htmlcode;
        result.csscode = req.body.csscode;
        result.jscode = req.body.jscode;
        result.link = req.body.link;
        result.save(function(err) {
        if (err) {
          console.log('更新失败');
        }
          res.send({ status: 'ok', message:"更新成功" });
        });
        
     }
  })

};

