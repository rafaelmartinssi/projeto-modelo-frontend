// Composables
import { createRouter, createWebHistory } from "vue-router";
import BaseLayout from "@/layouts/BaseLayout.vue";
import { login, callback, logout, isAuthenticated } from "./guards";
import AppRouterWrapper from "@/components/AppRouterWrapper.vue";

const routes = [
  {
    path: "/:pathMatch(.*)*",
    redirect: { name: "index" },
  },
  {
    path: "/index",
    name: "index",
    component: () => import("@/layouts/IndexLayout.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: AppRouterWrapper,
    beforeEnter: login,
  },
  {
    path: "/logout",
    name: "logout",
    component: AppRouterWrapper,
    beforeEnter: logout,
  },
  {
    path: "/callback",
    component: AppRouterWrapper,
    beforeEnter: callback,
  },
  {
    path: "/",
    component: BaseLayout,
    beforeEnter: isAuthenticated,
    children: [
      {
        path: "",
        name: "home",
        component: () => import("@/views/Home.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
