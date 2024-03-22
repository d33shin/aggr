import Vue from 'vue'
import Router from 'vue-router'
import NotFound from './views/NotFound.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    // ...other routes
    { path: '*', component: NotFound }
  ]
})
