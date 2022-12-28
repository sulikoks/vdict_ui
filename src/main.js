import { createApp } from "vue";
import App from "./App.vue";
import "./css/index.scss";

import router from "./router";
import vuetify from "./core/vuetify";
import { UILoader, KVStorage } from "./services";

KVStorage.init();

createApp(App)
  .use(router)
  .use(vuetify)
  .mount("#app")
  .$nextTick()
  .then(() => {
    console.log("Hello! App is loaded");
    UILoader.hide();
  });
