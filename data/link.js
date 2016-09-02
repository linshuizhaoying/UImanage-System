var mongoose = require("mongoose"); //引用mongoose
// 连接字符串格式为mongodb://主机/数据库名
mongoose.connect('mongodb://localhost/uimanage');
// Schema —— 一种以文件形式存储的数据库模型骨架，
// 无法直接通往数据库端，也就是说它不具备对数据库的操作能力，
// 仅仅只是数据库模型在程序片段中的一种表现，可以说是数据属性模型(传统意义的表结构)，
// 又或着是“集合”的模型骨架。



// /**
//  * [查找所有用户]
//  * return allusers
//  */
// //返回只包含一个键值name、age的所有记录
// UserModel.find({},{name:1, age:1}，function(err,docs){
//    //docs 查询结果集
// })
//  /**
//   * [查找指定用户]
//   * return user || null
//   */
// UserModel.find({ "username": 'linshui' }, function (error, docs) {
//   if(error){
//     console.log("error :" + error);
//   }else{
//     console.log(docs); //docs: age为28的所有文档
//   }
// }); 
// //添加管理员
// UserModel.create([
//                   { username:"linshuizhaoying",password:'test', age:20,email:'4799109@qq.com',invitedcode_id:'2333', avatar:'img/2.png',limit:'admin'},
//                  ], function(error,docs) {
//     if(error) {
//         console.log(error);
//     } else {
//         console.log('save ok');
//     }
// });
//  /**
//   * [添加用户]
//   * return success || error
//   */
// UserModel.create({ username:"linshui", age:22,}, function(error,doc){

// });

// // var conditions = {name : 'test_update'};
 
// // var update = {$set : { age : 16 }};
//  /**
//   * [更新用户数据]
//   * return success || error
//   */
// UserModel.update(conditions, update, function(error){
//     if(error) {
//         console.log(error);
//     } else {
//         console.log('Update success!');
//     }
// });

// // var conditions = { name: 'tom' };
//   /**
//   * [删除用户]
//   * return success || error
//   */
// UserModel.remove(conditions, function(error){
//     if(error) {
//         console.log(error);
//     } else {
//         console.log('Delete success!');
//     }
// });
