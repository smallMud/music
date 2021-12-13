import Vue from 'vue'
import VueRouter from 'vue-router'
const Recommend = (resolve) => {
  import("../views/Recommend").then((module) => {
    resolve(module);
  });
}
const Detail = (resolve) => {
  import('../views/Detail').then((module) => {
    resolve(module)
  })
}
const Rank = (resolve) => {
  import("../views/Rank").then((module) => {
    resolve(module);
  });
}
const Search = (resolve) => {
  import("../views/Search").then((module) => {
    resolve(module);
  });
}
const Singer = (resolve) => {
  import("../views/Singer").then((module) => {
    resolve(module);
  });
}
const Account = (resolve) => {
  import("../views/Account").then((module) => {
    resolve(module);
  });
}

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/recommend' },
  { path: '/recommend',
    component: Recommend,
  },
  { path: '/rank', component: Rank },
  { path: '/recommend/detail/:id/:type',
       component: Detail},
  { path: '/search', component: Search },
  { path: '/singer', component: Singer,},
  { path: '/account', component: Account },
]

const router = new VueRouter({
  routes
})

export default router
