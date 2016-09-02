
import Vue from 'vue'
import App from './App'
import Router from 'vue-router'
import debug from './view/debug'
// install router
Vue.use(Router)

// routing
var router = new Router()

router.map({
  '/': {
    component: debug
  }
})

router.beforeEach(function () {
  window.scrollTo(0, 0)
})

router.redirect({
  '*': '/'
})

router.start(App, '#debug')
