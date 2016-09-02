var express = require('express');
var router = express.Router();
var userController = require('../data/userController.js');
var projectController = require('../data/projectController.js');
var uiController = require('../data/uiController.js');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'UI管理系统' });
});
/* GET users listing. */
router.get('/login', function(req, res, next) {
  res.render('login', { title: '登录' });

});
router.get('/home', function(req, res, next) {
  res.render('home', { title: '用户管理' });
});
router.get('/debug', function(req, res, next) {
  res.render('debug', { title: '动态调试' });
});
router.get('/admin', function(req, res, next) {
	  console.log(req.session)

		if(req.session.user == 'admin'){
	    res.render('admin', { title: '后台管理' });
		}else{
			res.redirect('/login');
		}
});
//用户路由
router.post('/addUser', userController.addUser);
router.post('/userLogin', userController.userLogin);
router.get('/getUsers', userController.getUsers);
router.get('/getCurrentUser', userController.getCurrentUser);
router.get('/getCurrentUserId', userController.getCurrentUserId);
router.get('/getUser/:id', userController.getUser);
router.get('/deleteUser/:id', userController.deleteUser);
router.post('/userUpdate', userController.userUpdate);
// router.post('/addUser', function(req, res) {
//   userController.addUser(req, res);
// });
router.get('/logout', function(req, res, next) {
    req.session.destroy(function(err){
        if(err){
            console.log(err);
        } else {
        		res.send({ status: 'ok', message:"退出成功" });
        }
    });
});
//项目路由
router.post('/addProject', projectController.addProject);
router.get('/getProjects/:id', projectController.getProjects);
router.get('/deleteProject/:id', projectController.deleteProject);
router.post('/updateProject', projectController.updateProject);
//UI路由
router.post('/addUi', uiController.addUi);
router.get('/getUis/:id', uiController.getUis);
router.get('/getUi/:id', uiController.getUi);
router.get('/deleteUi/:id', uiController.deleteUi);
router.post('/updateUi', uiController.updateUi);

module.exports = router;
