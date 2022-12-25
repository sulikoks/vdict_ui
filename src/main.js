import { createApp } from "vue";
import App from "./App.vue";

import "./core/service-worker";
import vuetify from "./core/vuetify";
import loader from "./core/loader";

createApp(App)
  .use(vuetify)
  .mount("#app")
  .$nextTick()
  .then(() => {
    console.log("Hello");
    loader.hide();
  });
