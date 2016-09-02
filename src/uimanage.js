import Vue from 'vue'
import App from './App'
import Router from 'vue-router'
import uiManage from './view/uiManage'
// install router
Vue.use(Router)

// routing
var router = new Router()

router.map({
  '/': {
    component: uiManage
  }
})

router.beforeEach(function () {
  window.scrollTo(0, 0)
})

router.redirect({
  '*': '/'
})

router.start(App, '#app')
