import {createWebHistory, createRouter} from "vue-router";
import routes from "./routes.js";

const router = createRouter({
    history: createWebHistory(),
    routes,
    mode: "history",
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition;
      } else {
        return {x: 0, y: 0}
      }
    }
  }
)

export default router;