import Vue from "vue";
import VueRouter from "vue-router";
import HomePage from "../views/HomePage.vue";
import PageNotFound from "../views/PageNotFound.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "HomePage",
    component: HomePage,
  },
  {
    path: "/create",
    name: "Create New Tournament",
    component: () => import("../views/CreateTournamentPage.vue"),
  },
  {
    path: "/verify/",
    name: "Verify new tournament",
    component: () => import("../views/VerifyPage.vue"),
  },
  {
    path: "/verify/:id",
    name: "Verify specific tournament",
    props: true,
    component: () => import("../views/VerifySpecificPage.vue"),
  },
  {
    path: "/*",
    name: "PageNotFound",
    component: PageNotFound,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
