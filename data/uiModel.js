var mongoose = require("mongoose"); //引用mongoose
// // 连接字符串格式为mongodb://主机/数据库名
// mongoose.connect('mongodb://localhost/uimanage');

// //定义Uis
var UiSchema = new mongoose.Schema({
      title : { type:String },
      desc : { type:String },
      type : { type:String }, //btn panel form nav list other component plugin
      htmlcode:{type:String},
      csscode:{type:String},
      jscode:{type:String},
      desc: { type:String },
      project_id: { type:String },
      link:{ type:String },//用来保存高级UI的外链地址
      created_time : { type:Date, default:Date.now }
});

var Ui = mongoose.model('Ui', UiSchema);
//倒出模型
module.exports = Ui

