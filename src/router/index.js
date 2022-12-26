import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import SearchWord from "../views/SearchWord.vue";
import Page404 from "../views/Page404.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { name: "Home", path: "/", component: Home },
    { name: "About", path: "/about", component: About },
    { name: "SearchWord", path: "/search-word", component: SearchWord },
    { name: "Page404", path: "/:pathMatch(.*)*", component: Page404 },
  ],
});

export default router;
