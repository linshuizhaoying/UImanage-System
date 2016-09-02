var User = require('./userModel.js')
var md5 = require('md5');

/**
 * [addUser func]
 * 添加用户
 * 获取表单传来的参数
 * 返回 status 状态 message 信息
 */
exports.addUser = function ( req, res, next ){
  //console.log(req)
  var user = new User({
      username:    req.body.username,
      password:    md5(req.body.password),
      email :    req.body.email,
      invitedcode:    req.body.invitedcode,
      created_time: Date.now(),
      limit: "user",
      avatar: "./img/1.png"

  })
  console.log(user)
  /* 判断用户是否存在 */
  User.findOne({username:user.username},function(err,result){
     if(result != null){
        res.send({  status: 'error', message:"用户已存在"  });
     }else{
        user.save(function(err) {
          if(err) {
            console.log('Error while saving User: ' + err);
            res.send({  status: 'error', message:error  });
            return;
          } else {
            console.log("User created");
            res.send({ status: 'ok', message:"ok" });
            return 
          }
        });
     }
  })
};
/**
 * [getUsers func]
 * 需要管理员权限
 * 后台获取用户所有信息列表
 * 无接受参数
 * 直接返回 用户列表
 */
exports.getUsers = function ( req, res, next ){
  User.find({}, function(err, users) {
    if (err) {
      res.json({message: err});
    } else {
      res.json({users: users});
    }
  });
};
/**
 * [getUsers func]
 * 需要管理员权限
 * 获取指定用户所有信息
 * 接受url传来的id参数
 * 直接返回 用户信息
 */
exports.getUser = function ( req, res, next ){
  User.findById(req.params.id, function(err, user) {
    if (err) {
      res.json({message: err});
    } else {
      res.json({user: user});
    }
  });
};
/**
 * [getCurrentUser func]
 * 获取当前用户名
 * 直接返回 用户信息
 */
exports.getCurrentUser = function ( req, res, next ){
  if(req.session.user){
    res.send({ status: 'ok', message:req.session.user });
  }else{
     res.send({ status: 'error', message:"还未登录！" });
  }
  
};

/**
 * [getCurrentUserId func]
 * 获取当前用户ID
 * 直接返回 用户信息
 */
exports.getCurrentUserId = function ( req, res, next ){
  User.findOne({username:req.session.user},function(err,result){
     if(result != null){
        res.send({ status: 'ok', message:result._id });
     }else{
        res.send({  status: 'error', message:"用户不存在!"  });
     }
  })
};

/**
 * [deleteUser func]
 * 需要管理员权限
 * 后台删除指定用户
 * 接受url传来的id参数
 * 返回 status 状态 message 信息
 */
exports.deleteUser = function ( req, res, next ){
  User.remove({"_id":req.params.id}, function(err, user) {
    if (err) {
      res.send({  status: 'error', message:"没有权限!"  });
    } else {
      res.send({ status: 'ok', message:"ok" });
    }
  });
};
/**
 * [deleteUser func]
 * 用户登录
 * 接受表单提交的参数
 * 返回 status 状态 message 信息
 */
exports.userLogin = function ( req, res, next ){
  var user = new User({
      username:    req.body.username,
      password:    md5(req.body.password)
  })
  User.findOne({username:user.username,password:user.password},function(err,result){
     if(result != null){
        console.log(req.session + "354")
        req.session.user = result.username;
        console.log(req.session)

        
        // /* 判断用户是否为管理员 */
        // User.findOne({username:result.username},function(err,result){
        //    if(result != null){
        //       if (result.limit == "admin"){
        //         req.session.admin = 1;
        //       }else{
        //         req.session.admin = 0;
        //       }
        //    }
        //    console.log(req.session)
        // })
        res.send({ status: 'ok', message:"ok" });
     }else{
        res.send({  status: 'error', message:"登录出错!"  });
     }
  })

};
/**
 * [userUpdate func]
 * 用户信息更新
 * 接受表单提交的参数
 * 返回 status 状态 message 信息
 */
exports.userUpdate = function ( req, res, next ){
  User.findById(req.body.id,function(err,result){
     if(err){
        console.log(err)
        res.send({  status: 'error', message:"更新出错!"  });
     }else{
        result.username = req.body.username;
        result.email = req.body.email;
        result.limit = req.body.limit;
        result.avatar = req.body.avatar;
        result.invitedcode = req.body.invitedcode;
        if(result.password != req.body.password){
          result.password = md5(req.body.password)
        }else{
          result.password = req.body.password;
        }
        result.save(function(err) {
        if (err) {
          console.log('保存失败');
        }
          res.send({ status: 'ok', message:"更新成功" });
        });
        
     }
  })

};

/**
 * [checkAdmin func]
 * 判断用户是否为管理员
 * 接受传来的参数
 * 返回 true 或者 false
 */
exports.checkAdmin = function ( username ){

  /* 判断用户是否存在 */
  User.findOne({username:user.username},function(err,result){
     if(result != null){
        if (result.limit == "admin"){
          return true
        }else{
          return false
        }
     }
  })
};
  