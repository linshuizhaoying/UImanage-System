var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/uimanage', function(req, res, next) {
  res.render('uimanage', { title: 'UI管理系统' });
});

module.exports = router;
