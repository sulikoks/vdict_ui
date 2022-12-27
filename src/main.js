import { createApp } from "vue";
import App from "./App.vue";
import "./css/index.scss";

import router from "./router";
import vuetify from "./core/vuetify";
import loader from "./core/loader";
import kvstorage from "./core/kvstorage";

kvstorage.checkStorage();

createApp(App)
  .use(router)
  .use(vuetify)
  .mount("#app")
  .$nextTick()
  .then(() => {
    console.log("Hello! App is loaded");
    loader.hide();
  });
