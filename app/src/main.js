import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import VueMoment from "vue-moment";
import moment from "moment";
import VueScrollTo from "vue-scrollto";

require("moment/locale/fr");

Vue.use(VueScrollTo)

Vue.use(VueMoment, {
  moment,
});
Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

//vérifie le statut de connexion avant de rediriger vers une route
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requireAdmin)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.

    if (!store.getters.isAdmin) {
      next({
        path: "/",
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.requireAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.getters.loggedIn) {
      next({
        path: "/login",
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.requireNew)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (store.getters.loggedIn) {
      next({
        path: "/",
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next(); // make sure to always call next()!
  }
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
