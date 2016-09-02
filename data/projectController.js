var Project = require('./projectModel.js')

/**
 * [addProject func]
 * 添加用户
 * 获取表单传来的参数
 * 返回 status 状态 message 信息
 */
exports.addProject = function ( req, res, next ){
  //console.log(req)
  var project = new Project({
      projectname:    req.body.projectname,
      desc:req.body.desc,
      state:0,//默认进行时
      user_id:    req.body.user_id,
      created_time: Date.now()
  })
  console.log(Project)
  /* 判断项目是否存在 */
  Project.findOne({projectname:project.projectname,user_id:project.user_id},function(err,result){
     if(result != null){
        res.send({  status: 'error', message:"项目已存在"  });
     }else{
        project.save(function(err) {
          if(err) {
            console.log('Error while saving Project: ' + err);
            res.send({  status: 'error', message:error  });
            return;
          } else {
            console.log("Project created");
            res.send({ status: 'ok', message:"ok" });
            return 
          }
        });
     }
  })
};
/**
 * [getProjects func]
 * 需要对应用户的权限
 * 获取用户所有信息列表
 * 接受用户ID
 * 直接返回 用户项目列表
 */
exports.getProjects = function ( req, res, next ){
  console.log(req.params.user_id)
  Project.find({user_id:req.params.id}, function(err, Projects) {
    if (err) {
      res.json({message: err});
    } else {
      console.log(Projects)
      res.json({Projects: Projects});
    }
  });
};

/**
 * [deleteProject func]
 * 删除指定项目
 * 接受url传来的id参数
 * 返回 status 状态 message 信息
 */
exports.deleteProject = function ( req, res, next ){
  Project.remove({"_id":req.params.id}, function(err, Project) {
    if (err) {
      res.send({  status: 'error', message:"删除错误！"  });
    } else {
      res.send({ status: 'ok', message:"ok" });
    }
  });
};
/**
 * [ProjectUpdate func]
 * 用户信息更新
 * 接受表单提交的参数
 * 返回 status 状态 message 信息
 */
exports.updateProject = function ( req, res, next ){
  Project.findById(req.body.projectid,function(err,result){
     if(err){
        console.log(err)
        res.send({  status: 'error', message:"更新出错!"  });
     }else{
      console.log(result)
        result.projectname = req.body.projectname;
        result.desc = req.body.desc;
        result.state = req.body.state;
        result.save(function(err) {
        if (err) {
          console.log('更新失败');
        }
          res.send({ status: 'ok', message:"更新成功" });
        });
        
     }
  })

};

