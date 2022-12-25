import { registerSW } from "virtual:pwa-register";

registerSW({
  onOfflineReady() {
    console.log("onOfflineReady");
  },
});
