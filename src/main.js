import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "@/store";
import AOS from 'aos'
import 'aos/dist/aos.css'

AOS.init({
    once: true,
});

createApp(App).use(store).use(router).mount("#app");
