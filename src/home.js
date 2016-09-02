
import Vue from 'vue'
import App from './App'
import Router from 'vue-router'
import home from './view/home'
// install router
Vue.use(Router)

// routing
var router = new Router()

router.map({
  '/': {
    component: home
  }
})

router.beforeEach(function () {
  window.scrollTo(0, 0)
})

router.redirect({
  '*': '/'
})

router.start(App, '#home')

