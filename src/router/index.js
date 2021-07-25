import { createRouter, createWebHashHistory } from "vue-router";
import { cross } from "@/utils/crossStage/index";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "index",
      component: () => import("@/views/index/index"),
    },
    {
      path: "/game",
      name: "game",
      component: () => import("@/views/game/index"),
    },
    {
      path: "/loading",
      name: "loading",
      component: () => import("@/views/loading/index"),
    },
    {
      path: "/animation",
      name: "animation",
      component: () => import("@/views/animation/index"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (from.name) {
    cross.in(() => {
      next();
      cross.out();
    });
  } else {
    next();
  }
});

export default router;
