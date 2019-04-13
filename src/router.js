import Vue from "vue";
import Router from "vue-router";
import Home from "./views/index.vue";
Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "index",
      component: Home
    },
    {
      path: "/trending",
      name: "trending",
      component: () => import("./views/trending.vue")
    },
    {
      path: "/popular",
      name: "popular",
      component: () => import("./views/popular.vue")
    },
    {
      path: "/movie/:id",
      name: "movie",
      props: true,
      component: () => import("./views/movie.vue")
    },
    {
      path: "/casts/:castId",
      name: "casts",
      props: true,
      component: () => import("./views/casts.vue")
    },
    {
      path: "/search/:searchEntry",
      name: "search",
      props: true,
      component: () => import("./views/search.vue")
    }
  ]
});
